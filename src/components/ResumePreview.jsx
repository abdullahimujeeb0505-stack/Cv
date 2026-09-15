import React, { useRef, useState } from 'react';
import { 
  Printer, Download, ZoomIn, ZoomOut, Maximize2, 
  Palette, Type, FileText, Check, Copy, Compass, 
  Square, RectangleHorizontal, Layout, Sparkles, Mail,
  Monitor, Grid
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
  setSelectedTemplate,
  themeColor,
  setThemeColor,
  fontOption,
  setFontOption,
  paperSize,
  setPaperSize,
  orientation = 'portrait',
  setOrientation,
  onOpenTemplatesModal,
  onOpenCoverLetter
}) {
  const [zoomLevel, setZoomLevel] = useState(85);
  const [copied, setCopied] = useState(false);
  const [deskStyle, setDeskStyle] = useState('grid'); // 'grid' | 'slate' | 'oled'
  const printRef = useRef(null);

  const currentTheme = COLOR_THEMES.find(t => t.id === themeColor) || COLOR_THEMES[0];
  const currentFont = FONT_OPTIONS.find(f => f.id === fontOption) || FONT_OPTIONS[0];

  const isLandscape = orientation === 'landscape';

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

  // Fast switch list of popular templates
  const quickTemplates = [
    { id: 'modern-ats', name: 'ATS Pro' },
    { id: 'executive-ivy', name: 'Ivy Wall St' },
    { id: 'creative-studio', name: 'Creative' },
    { id: 'tech-terminal', name: 'Terminal' },
    { id: 'silicon-startup', name: 'Startup' },
    { id: 'compact-one-page', name: 'One-Page' },
    { id: 'infographic-metrics', name: 'Metrics' },
    { id: 'dark-executive', name: 'Dark Mode' },
    { id: 'landscape-executive-slide', name: 'Landscape Slide' }
  ];

  // Dimensions based on Paper Size & Orientation
  const paperWidth = paperSize === 'a4' 
    ? (isLandscape ? '297mm' : '210mm') 
    : (isLandscape ? '11in' : '8.5in');

  const paperMinHeight = paperSize === 'a4' 
    ? (isLandscape ? '210mm' : '297mm') 
    : (isLandscape ? '8.5in' : '11in');

  const getDeskBackgroundClass = () => {
    if (deskStyle === 'grid') return 'bg-slate-950 bg-grid-pattern';
    if (deskStyle === 'oled') return 'bg-black';
    return 'bg-slate-900';
  };

  return (
    <div className="flex flex-col h-full">
      {/* Quick Architecture Switcher Strip (Hidden when printing) */}
      <div className="no-print flex items-center justify-between gap-2 overflow-x-auto pb-2 mb-2 scrollbar-none">
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mr-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-blue-400" />
            Quick Switch:
          </span>
          {quickTemplates.map(t => {
            const isSelected = selectedTemplate === t.id;
            return (
              <button
                key={t.id}
                onClick={() => {
                  if (setSelectedTemplate) setSelectedTemplate(t.id);
                  if (t.id === 'landscape-executive-slide' && setOrientation) {
                    setOrientation('landscape');
                  }
                }}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20'
                    : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/60'
                }`}
              >
                {t.name}
              </button>
            );
          })}
          {onOpenTemplatesModal && (
            <button
              onClick={onOpenTemplatesModal}
              className="px-2 py-1 rounded-lg text-[11px] font-bold text-blue-400 hover:text-blue-300 hover:bg-blue-950/40 border border-blue-500/30 whitespace-nowrap transition-colors"
            >
              + All 22
            </button>
          )}
        </div>
      </div>

      {/* Main Controls Toolbar (Hidden when printing) */}
      <div className="no-print bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl p-3 mb-4 flex flex-wrap items-center justify-between gap-3 shadow-xl">
        {/* Left: Styling Controls (Colors, Fonts, Orientation & Paper) */}
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
                    themeColor === theme.id ? 'scale-115 border-white ring-2 ring-blue-500/50 shadow-md' : 'border-transparent opacity-80 hover:opacity-100'
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
              className="bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-lg px-2 py-1 focus:outline-none focus:border-blue-500"
            >
              {FONT_OPTIONS.map(f => (
                <option key={f.id} value={f.id}>{f.name}</option>
              ))}
            </select>
          </div>

          <div className="h-4 w-px bg-slate-700 hidden sm:block"></div>

          {/* Orientation Toggle: Portrait vs Landscape */}
          <div className="flex items-center gap-1 text-xs">
            <span className="text-[11px] text-slate-400">Layout:</span>
            <button
              onClick={() => setOrientation && setOrientation('portrait')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                orientation === 'portrait'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
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
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
              title="Landscape Orientation (Widescreen 11x8.5 Slide)"
            >
              <RectangleHorizontal className="w-3.5 h-3.5" />
              <span>Landscape</span>
            </button>
          </div>

          <div className="h-4 w-px bg-slate-700 hidden sm:block"></div>

          {/* Desk Canvas Lighting Toggle */}
          <div className="flex items-center gap-1 text-xs">
            <span className="text-[11px] text-slate-400">Desk:</span>
            <button
              onClick={() => setDeskStyle(deskStyle === 'grid' ? 'oled' : 'grid')}
              className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Toggle Desk Background (Grid vs Pitch Black)"
            >
              <Grid className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Right: Zoom & Export Actions */}
        <div className="flex items-center gap-2">
          {/* Zoom buttons */}
          <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700">
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
              onClick={() => setZoomLevel(isLandscape ? 75 : 85)}
              className="p-1 text-slate-400 hover:text-white border-l border-slate-700 ml-0.5"
              title="Reset Zoom"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Markdown Copy */}
          <button
            onClick={copyMarkdown}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs text-slate-200 transition-colors"
            title="Copy Text/Markdown"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy'}</span>
          </button>

          {/* Print / Save PDF Button */}
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-blue-500/25 transition-all active:scale-95"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / PDF ({isLandscape ? 'Landscape' : 'Portrait'})</span>
          </button>
        </div>
      </div>

      {/* Live Resume Canvas Area with Desk Backdrop */}
      <div className={`flex-1 overflow-auto rounded-2xl p-4 sm:p-8 flex justify-center items-start border border-slate-800/80 transition-colors duration-300 ${getDeskBackgroundClass()}`}>
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
