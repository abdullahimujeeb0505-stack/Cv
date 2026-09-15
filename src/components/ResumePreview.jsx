import React, { useRef, useState } from 'react';
import { 
  Printer, Download, ZoomIn, ZoomOut, Maximize2, 
  Palette, Type, FileText, Check, Copy, Compass, 
  Square, RectangleHorizontal, Layout, Clock, FileCheck2,
  Sparkles, Share2, Eye
} from 'lucide-react';

// Import All 22 Universal Resume Templates
import ModernATSTemplate from './templates/ModernATSTemplate';
import ExecutiveIvyTemplate from './templates/ExecutiveIvyTemplate';
import CreativeStudioTemplate from './templates/CreativeStudioTemplate';
import MinimalistNordicTemplate from './templates/MinimalistNordicTemplate';
import TechTerminalTemplate from './templates/TechTerminalTemplate';
import InternationalEuropassTemplate from './templates/InternationalEuropassTemplate';
import CompactOnePageTemplate from './templates/CompactOnePageTemplate';
import StanfordAcademicTemplate from './templates/StanfordAcademicTemplate';
import InfographicMetricsTemplate from './templates/InfographicMetricsTemplate';
import ElegantVogueTemplate from './templates/ElegantVogueTemplate';
import SiliconStartupTemplate from './templates/SiliconStartupTemplate';
import MedicalClinicalTemplate from './templates/MedicalClinicalTemplate';
import LegalJurisTemplate from './templates/LegalJurisTemplate';
import HybridFunctionalTemplate from './templates/HybridFunctionalTemplate';
import DarkModeExecutiveTemplate from './templates/DarkModeExecutiveTemplate';
import BoldHeadlineTemplate from './templates/BoldHeadlineTemplate';
import SidebarAccentTemplate from './templates/SidebarAccentTemplate';
import TimelineJourneyTemplate from './templates/TimelineJourneyTemplate';
import GridPortfolioTemplate from './templates/GridPortfolioTemplate';
import CleanCorporateTemplate from './templates/CleanCorporateTemplate';
import SwissInternationalTemplate from './templates/SwissInternationalTemplate';
import LandscapeExecutiveSlideTemplate from './templates/LandscapeExecutiveSlideTemplate';

import { COLOR_THEMES, FONT_OPTIONS, TEMPLATES_CATALOG } from '../data/defaultData';

export default function ResumePreview({
  resumeData,
  selectedTemplate,
  themeColor,
  setThemeColor,
  fontOption,
  setFontOption,
  paperSize,
  setPaperSize,
  orientation = 'portrait',
  setOrientation
}) {
  const [zoomLevel, setZoomLevel] = useState(85);
  const [copied, setCopied] = useState(false);
  const printRef = useRef(null);

  const currentTheme = COLOR_THEMES.find(t => t.id === themeColor) || COLOR_THEMES[0];
  const currentFont = FONT_OPTIONS.find(f => f.id === fontOption) || FONT_OPTIONS[0];
  const currentTemplateObj = TEMPLATES_CATALOG.find(t => t.id === selectedTemplate) || TEMPLATES_CATALOG[0];

  const isLandscape = orientation === 'landscape';

  // Word count and reading time calculation
  const calculateWordCount = () => {
    const text = [
      resumeData.summary || '',
      ...(resumeData.experience?.flatMap(e => [e.title, e.company, ...(e.highlights || [])]) || []),
      ...(resumeData.projects?.flatMap(p => [p.name, p.description]) || [])
    ].join(' ');
    const count = text.split(/\s+/).filter(Boolean).length;
    return {
      words: count,
      readTimeSeconds: Math.max(5, Math.round(count / 3.5)) // avg 200 words/min = 3.3 words/sec
    };
  };

  const { words, readTimeSeconds } = calculateWordCount();

  const handlePrint = () => {
    const printStyle = document.createElement('style');
    printStyle.id = 'dynamic-print-page-style';
    printStyle.innerHTML = `@page { size: ${paperSize === 'a4' ? 'A4' : 'letter'} ${orientation}; margin: 8mm; }`;
    const old = document.getElementById('dynamic-print-page-style');
    if (old) old.remove();
    document.head.appendChild(printStyle);

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
    const props = { data: resumeData, theme: currentTheme, font: currentFont, orientation };
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
      case 'compact-one-page':
        return <CompactOnePageTemplate {...props} />;
      case 'stanford-academic':
        return <StanfordAcademicTemplate {...props} />;
      case 'infographic-metrics':
        return <InfographicMetricsTemplate {...props} />;
      case 'elegant-vogue':
        return <ElegantVogueTemplate {...props} />;
      case 'silicon-startup':
        return <SiliconStartupTemplate {...props} />;
      case 'medical-clinical':
        return <MedicalClinicalTemplate {...props} />;
      case 'legal-juris':
        return <LegalJurisTemplate {...props} />;
      case 'hybrid-functional':
        return <HybridFunctionalTemplate {...props} />;
      case 'dark-executive':
        return <DarkModeExecutiveTemplate {...props} />;
      case 'bold-headline':
        return <BoldHeadlineTemplate {...props} />;
      case 'sidebar-accent':
        return <SidebarAccentTemplate {...props} />;
      case 'timeline-journey':
        return <TimelineJourneyTemplate {...props} />;
      case 'grid-portfolio':
        return <GridPortfolioTemplate {...props} />;
      case 'clean-corporate':
        return <CleanCorporateTemplate {...props} />;
      case 'swiss-international':
        return <SwissInternationalTemplate {...props} />;
      case 'landscape-executive-slide':
        return <LandscapeExecutiveSlideTemplate {...props} />;
      default:
        return <ModernATSTemplate {...props} />;
    }
  };

  // Dimensions based on Paper Size & Orientation
  const paperWidth = paperSize === 'a4' 
    ? (isLandscape ? '297mm' : '210mm') 
    : (isLandscape ? '11in' : '8.5in');

  const paperMinHeight = paperSize === 'a4' 
    ? (isLandscape ? '210mm' : '297mm') 
    : (isLandscape ? '8.5in' : '11in');

  return (
    <div className="flex flex-col h-full space-y-3">
      {/* Top Controls Toolbar (Hidden when printing) */}
      <div className="no-print bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-2xl p-3 shadow-xl flex flex-wrap items-center justify-between gap-3">
        {/* Left: Styling Controls (Colors, Fonts, Orientation & Paper) */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Color palette */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
              <Palette className="w-3.5 h-3.5 text-blue-400" />
              <span>Theme:</span>
            </span>
            <div className="flex items-center gap-1.5 bg-slate-950/60 p-1 rounded-xl border border-slate-800">
              {COLOR_THEMES.map(theme => (
                <button
                  key={theme.id}
                  onClick={() => setThemeColor(theme.id)}
                  title={theme.name}
                  className={`w-4 h-4 rounded-full border transition-transform ${
                    themeColor === theme.id ? 'scale-125 border-white ring-2 ring-blue-500/60' : 'border-transparent opacity-70 hover:opacity-100 hover:scale-110'
                  }`}
                  style={{ backgroundColor: theme.primary }}
                />
              ))}
            </div>
          </div>

          <div className="h-4 w-px bg-slate-800 hidden sm:block"></div>

          {/* Typography */}
          <div className="flex items-center gap-1.5">
            <Type className="w-3.5 h-3.5 text-indigo-400" />
            <select
              value={fontOption}
              onChange={(e) => setFontOption(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl px-2.5 py-1 focus:outline-none focus:border-blue-500 font-medium"
            >
              {FONT_OPTIONS.map(f => (
                <option key={f.id} value={f.id}>{f.name}</option>
              ))}
            </select>
          </div>

          <div className="h-4 w-px bg-slate-800 hidden sm:block"></div>

          {/* Orientation Toggle: Portrait vs Landscape */}
          <div className="flex items-center gap-1 text-xs bg-slate-950/70 p-0.5 rounded-xl border border-slate-800">
            <button
              onClick={() => setOrientation && setOrientation('portrait')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                orientation === 'portrait'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Portrait Orientation (Standard Vertical)"
            >
              <FileText className="w-3 h-3" />
              <span>Portrait</span>
            </button>
            <button
              onClick={() => setOrientation && setOrientation('landscape')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                orientation === 'landscape'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Landscape Orientation (Widescreen 16:9 / 11x8.5 Slide)"
            >
              <RectangleHorizontal className="w-3.5 h-3.5" />
              <span>Landscape</span>
            </button>
          </div>

          <div className="h-4 w-px bg-slate-800 hidden sm:block"></div>

          {/* Paper format */}
          <div className="flex items-center gap-1 text-xs">
            <span className="text-[11px] text-slate-400 font-semibold">Paper:</span>
            {['letter', 'a4'].map(size => (
              <button
                key={size}
                onClick={() => setPaperSize(size)}
                className={`px-2 py-0.5 rounded-lg text-[10px] uppercase font-bold transition-colors ${
                  paperSize === size ? 'bg-slate-700 text-white border border-slate-600' : 'bg-slate-950 text-slate-400 hover:text-slate-200'
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
          <div className="flex items-center bg-slate-950 rounded-xl p-0.5 border border-slate-800">
            <button
              onClick={() => setZoomLevel(prev => Math.max(50, prev - 10))}
              className="p-1.5 text-slate-400 hover:text-white transition-colors"
              title="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-mono px-2 text-slate-300 min-w-[38px] text-center font-bold">
              {zoomLevel}%
            </span>
            <button
              onClick={() => setZoomLevel(prev => Math.min(130, prev + 10))}
              className="p-1.5 text-slate-400 hover:text-white transition-colors"
              title="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoomLevel(isLandscape ? 75 : 85)}
              className="p-1.5 text-slate-400 hover:text-white border-l border-slate-800 ml-0.5"
              title="Reset Zoom"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Markdown Copy */}
          <button
            onClick={copyMarkdown}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-200 transition-colors"
            title="Copy Text/Markdown"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy'}</span>
          </button>

          {/* Print / Save PDF Button */}
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-extrabold text-xs shadow-lg shadow-blue-500/25 transition-all hover:scale-102"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print PDF ({isLandscape ? 'Landscape' : 'Portrait'})</span>
          </button>
        </div>
      </div>

      {/* Mini Stats & Format Banner */}
      <div className="no-print flex items-center justify-between px-3 py-1.5 bg-slate-900/50 rounded-xl border border-slate-800/60 text-[11px] text-slate-400">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: currentTemplateObj.accentColor }}></span>
            <strong className="text-slate-200">{currentTemplateObj.name}</strong>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1 text-slate-300">
            <Clock className="w-3 h-3 text-blue-400" />
            <span>Recruiter Scan: ~{readTimeSeconds}s ({words} words)</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
            100% Client-Side Private
          </span>
        </div>
      </div>

      {/* Live Resume Canvas Area */}
      <div className="flex-1 overflow-auto bg-slate-950/90 rounded-2xl p-4 sm:p-8 flex justify-center items-start border border-slate-800/80 shadow-2xl relative">
        <div 
          className="transition-transform duration-200 origin-top flex justify-center w-full"
          style={{ transform: `scale(${zoomLevel / 100})` }}
        >
          {/* Printable Resume Container */}
          <div 
            ref={printRef}
            id="printable-resume"
            className="resume-paper bg-white text-slate-900 shadow-2xl rounded-sm transition-all duration-150 overflow-hidden ring-1 ring-slate-900/10"
            style={{
              width: paperWidth,
              minHeight: paperMinHeight,
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
