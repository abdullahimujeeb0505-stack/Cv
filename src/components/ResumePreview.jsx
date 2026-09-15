import React, { useRef, useState } from 'react';
import { 
  Printer, Download, ZoomIn, ZoomOut, Maximize2, 
  Palette, Type, FileText, Check, Copy
} from 'lucide-react';
import ModernATSTemplate from './templates/ModernATSTemplate';
import ExecutiveIvyTemplate from './templates/ExecutiveIvyTemplate';
import CreativeStudioTemplate from './templates/CreativeStudioTemplate';
import MinimalistNordicTemplate from './templates/MinimalistNordicTemplate';
import TechTerminalTemplate from './templates/TechTerminalTemplate';
import InternationalEuropassTemplate from './templates/InternationalEuropassTemplate';
import { COLOR_THEMES, FONT_OPTIONS } from '../data/defaultData';

export default function ResumePreview({
  resumeData,
  selectedTemplate,
  themeColor,
  setThemeColor,
  fontOption,
  setFontOption,
  paperSize,
  setPaperSize
}) {
  const [zoomLevel, setZoomLevel] = useState(85);
  const [copied, setCopied] = useState(false);
  const printRef = useRef(null);

  const currentTheme = COLOR_THEMES.find(t => t.id === themeColor) || COLOR_THEMES[0];
  const currentFont = FONT_OPTIONS.find(f => f.id === fontOption) || FONT_OPTIONS[0];

  const handlePrint = () => {
    window.print();
  };

  const copyMarkdown = () => {
    const p = resumeData.personal || {};
    let text = `# ${p.fullName || 'Full Name'}\n**${p.title || ''}**\n\n`;
    text += `Email: ${p.email || ''} | Phone: ${p.phone || ''} | Location: ${p.location || ''}\n\n`;
    if (resumeData.summary) text += `## Summary\n${resumeData.summary}\n\n`;
    if (resumeData.experience?.length) {
      text += `## Experience\n`;
      resumeData.experience.forEach(exp => {
        text += `### ${exp.title} - ${exp.company} (${exp.startDate} - ${exp.current ? 'Present' : exp.endDate})\n`;
        exp.highlights?.forEach(h => {
          if (h) text += `- ${h}\n`;
        });
        text += '\n';
      });
    }
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderTemplate = () => {
    const props = { data: resumeData, theme: currentTheme, font: currentFont };
    switch (selectedTemplate) {
      case 'modern-ats':
        return <ModernATSTemplate {...props} />;
      case 'executive-ivy':
        return <ExecutiveIvyTemplate {...props} />;
      case 'creative-studio':
        return <CreativeStudioTemplate {...props} />;
      case 'minimalist-nordic':
        return <MinimalistNordicTemplate {...props} />;
      case 'tech-terminal':
        return <TechTerminalTemplate {...props} />;
      case 'international-europass':
        return <InternationalEuropassTemplate {...props} />;
      default:
        return <ModernATSTemplate {...props} />;
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Top Controls Toolbar (Hidden when printing) */}
      <div className="no-print bg-slate-800/90 backdrop-blur-md border border-slate-700/80 rounded-xl p-3 mb-4 flex flex-wrap items-center justify-between gap-3 shadow-md">
        {/* Left: Styling Controls (Colors & Fonts) */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Color palette */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
              <Palette className="w-3.5 h-3.5 text-blue-400" />
              Theme:
            </span>
            <div className="flex items-center gap-1">
              {COLOR_THEMES.map(theme => (
                <button
                  key={theme.id}
                  onClick={() => setThemeColor(theme.id)}
                  title={theme.name}
                  className={`w-5 h-5 rounded-full border-2 transition-transform ${
                    themeColor === theme.id ? 'scale-115 border-white ring-2 ring-blue-500/50' : 'border-transparent opacity-80 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: theme.primary }}
                />
              ))}
            </div>
          </div>

          <div className="h-4 w-px bg-slate-700 hidden sm:block"></div>

          {/* Typography */}
          <div className="flex items-center gap-1.5">
            <Type className="w-3.5 h-3.5 text-indigo-400" />
            <select
              value={fontOption}
              onChange={(e) => setFontOption(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg px-2 py-1 focus:outline-none focus:border-blue-500"
            >
              {FONT_OPTIONS.map(f => (
                <option key={f.id} value={f.id}>{f.name}</option>
              ))}
            </select>
          </div>

          <div className="h-4 w-px bg-slate-700 hidden sm:block"></div>

          {/* Paper format */}
          <div className="flex items-center gap-1 text-xs">
            <span className="text-[11px] text-slate-400">Paper:</span>
            {['letter', 'a4'].map(size => (
              <button
                key={size}
                onClick={() => setPaperSize(size)}
                className={`px-2 py-0.5 rounded text-[11px] uppercase font-bold transition-colors ${
                  paperSize === size ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Zoom & Export Actions */}
        <div className="flex items-center gap-2">
          {/* Zoom buttons */}
          <div className="flex items-center bg-slate-900 rounded-lg p-0.5 border border-slate-700">
            <button
              onClick={() => setZoomLevel(prev => Math.max(50, prev - 10))}
              className="p-1 text-slate-400 hover:text-white transition-colors"
              title="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-mono px-1.5 text-slate-300 min-w-[38px] text-center">
              {zoomLevel}%
            </span>
            <button
              onClick={() => setZoomLevel(prev => Math.min(130, prev + 10))}
              className="p-1 text-slate-400 hover:text-white transition-colors"
              title="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoomLevel(85)}
              className="p-1 text-slate-400 hover:text-white border-l border-slate-800 ml-0.5"
              title="Reset Zoom (85%)"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Markdown Copy */}
          <button
            onClick={copyMarkdown}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-700 border border-slate-700 text-xs text-slate-200 transition-colors"
            title="Copy Text/Markdown"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy'}</span>
          </button>

          {/* Print / Save PDF Button */}
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / PDF</span>
          </button>
        </div>
      </div>

      {/* Live Resume Canvas Area */}
      <div className="flex-1 overflow-auto bg-slate-950/80 rounded-2xl p-4 sm:p-8 flex justify-center items-start border border-slate-800/80">
        <div 
          className="transition-transform duration-200 origin-top flex justify-center w-full"
          style={{ transform: `scale(${zoomLevel / 100})` }}
        >
          {/* Printable Resume Container */}
          <div 
            ref={printRef}
            id="printable-resume"
            className="resume-paper bg-white text-slate-900 shadow-2xl rounded-sm transition-all duration-150 overflow-hidden"
            style={{
              width: paperSize === 'a4' ? '210mm' : '8.5in',
              minHeight: paperSize === 'a4' ? '297mm' : '11in',
              maxWidth: '100%'
            }}
          >
            {renderTemplate()}
          </div>
        </div>
      </div>
    </div>
  );
}
