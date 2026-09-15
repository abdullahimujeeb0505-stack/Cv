import React, { useState } from 'react';
import { 
  FileText, Sparkles, Sliders, ShieldCheck, Download, 
  Upload, RotateCcw, Layout, Check, ChevronDown, UserCheck
} from 'lucide-react';
import { SAMPLE_PROFILES, TEMPLATES_CATALOG } from '../data/defaultData';
import { calculateATSScore } from '../data/recommendationEngine';

export default function Navbar({
  activeMode,
  setActiveMode,
  selectedTemplate,
  setSelectedTemplate,
  onOpenTemplatesModal,
  onOpenATSModal,
  onLoadSample,
  onResetData,
  onExportJSON,
  onImportJSON,
  resumeData
}) {
  const [samplesOpen, setSamplesOpen] = useState(false);
  const currentTemplateObj = TEMPLATES_CATALOG.find(t => t.id === selectedTemplate) || TEMPLATES_CATALOG[0];
  const atsAnalysis = calculateATSScore(resumeData);

  return (
    <header className="no-print bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40 px-4 sm:px-6 py-2.5 transition-all">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Brand Logo & Tagline */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-white text-base sm:text-lg tracking-tight">
                Universal<span className="text-blue-400">Resume</span>
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-500/30">
                AI Matcher
              </span>
            </div>
            <p className="text-[10px] text-slate-400 hidden sm:block">Universal Format Determination & Career Interview</p>
          </div>
        </div>

        {/* Center: Mode Switcher (Interview vs Visual Editor) */}
        <div className="flex items-center bg-slate-800 p-1 rounded-xl border border-slate-700/80">
          <button
            onClick={() => setActiveMode('interview')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeMode === 'interview'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Interview Mode</span>
          </button>

          <button
            onClick={() => setActiveMode('editor')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeMode === 'editor'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Visual Studio</span>
          </button>
        </div>

        {/* Right Actions: Template Picker, Presets, ATS Score */}
        <div className="flex items-center gap-2">
          {/* Template Badge / Selector */}
          <button
            onClick={onOpenTemplatesModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition-colors"
            title="Choose or compare formats"
          >
            <Layout className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden md:inline text-slate-400">Format:</span>
            <span className="font-semibold text-white">{currentTemplateObj.name.split('/')[0]}</span>
          </button>

          {/* Sample Presets Dropdown */}
          <div className="relative">
            <button
              onClick={() => setSamplesOpen(!samplesOpen)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-medium transition-colors"
            >
              <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Samples</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {samplesOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-xl bg-slate-850 border border-slate-700 shadow-xl py-1 z-50 text-xs">
                <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-700/60">
                  Load Pre-filled Presets
                </div>
                {Object.values(SAMPLE_PROFILES).map((sample) => (
                  <button
                    key={sample.id}
                    onClick={() => {
                      onLoadSample(sample.data);
                      setSamplesOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-slate-200 hover:bg-slate-700 hover:text-white transition-colors flex items-center justify-between"
                  >
                    <span>{sample.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ATS Score Checker Pill */}
          <button
            onClick={onOpenATSModal}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
              atsAnalysis.score >= 80 
                ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/40 hover:bg-emerald-900/40' 
                : 'bg-amber-950/40 text-amber-300 border-amber-500/40 hover:bg-amber-900/40'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>ATS: {atsAnalysis.score}%</span>
          </button>

          {/* Export / Import Menu Button */}
          <div className="hidden lg:flex items-center gap-1">
            <button
              onClick={onExportJSON}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              title="Backup Resume to JSON"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
            <label
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Import JSON Resume"
            >
              <Upload className="w-3.5 h-3.5" />
              <input type="file" accept=".json" onChange={onImportJSON} className="hidden" />
            </label>
            <button
              onClick={onResetData}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-red-400 transition-colors"
              title="Reset to blank"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
