import React, { useState } from 'react';
import { 
  FileText, Sparkles, Sliders, ShieldCheck, Download, 
  Upload, RotateCcw, Layout, Check, ChevronDown, UserCheck,
  Target, Wand2, Maximize, Eye, Sparkle
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
  onOpenJobMatcher,
  onOpenBulletPolisher,
  onLoadSample,
  onResetData,
  onExportJSON,
  onImportJSON,
  resumeData
}) {
  const [samplesOpen, setSamplesOpen] = useState(false);
  const [aiMenuOpen, setAiMenuOpen] = useState(false);
  const currentTemplateObj = TEMPLATES_CATALOG.find(t => t.id === selectedTemplate) || TEMPLATES_CATALOG[0];
  const atsAnalysis = calculateATSScore(resumeData);

  return (
    <header className="no-print sticky top-0 z-40 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-6 py-2.5 transition-all shadow-lg shadow-black/20">
      <div className="max-w-[1700px] mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Brand Logo & Tagline */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/25 ring-1 ring-white/20 animate-pulse-subtle shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-white text-base sm:text-lg tracking-tight flex items-center gap-1">
                Universal<span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">Resume</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider bg-blue-500/10 text-blue-300 border border-blue-500/30 flex items-center gap-1">
                <Sparkle className="w-2.5 h-2.5 text-blue-400" />
                <span>AI v2.0</span>
              </span>
            </div>
            <p className="text-[10.5px] text-slate-400 hidden sm:block">
              22 Universal Architectures • Dual Orientation • ATS Score Auditor
            </p>
          </div>
        </div>

        {/* Center: Mode Switcher (Interview vs Studio vs Zen Canvas) */}
        <div className="flex items-center bg-slate-950/70 p-1 rounded-2xl border border-slate-800 shadow-inner">
          <button
            onClick={() => setActiveMode('interview')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeMode === 'interview'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>AI Interviewer</span>
          </button>

          <button
            onClick={() => setActiveMode('editor')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeMode === 'editor'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sliders className="w-3.5 h-3.5 text-indigo-400" />
            <span>Visual Studio</span>
          </button>

          <button
            onClick={() => setActiveMode('canvas')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeMode === 'canvas'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden md:inline">Full Canvas</span>
          </button>
        </div>

        {/* Right Actions: AI Tools, Template Gallery, ATS Score, Presets */}
        <div className="flex items-center gap-2">
          {/* AI Tools Quick Menu */}
          <div className="relative">
            <button
              onClick={() => setAiMenuOpen(!aiMenuOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-950/60 to-indigo-950/60 hover:from-purple-900/60 hover:to-indigo-900/60 text-purple-200 border border-purple-500/40 text-xs font-bold transition-all shadow-sm"
              title="AI Resume Intelligence Tools"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-spin-slow" />
              <span>AI Tools</span>
              <ChevronDown className="w-3 h-3 text-purple-400" />
            </button>

            {aiMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-2 z-50 text-xs space-y-1">
                <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                  AI Optimization Suite
                </div>
                <button
                  onClick={() => {
                    onOpenJobMatcher();
                    setAiMenuOpen(false);
                  }}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-slate-800 text-slate-200 hover:text-white transition-colors flex items-start gap-2.5 group"
                >
                  <Target className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <div>
                    <div className="font-bold text-white">Target Job Matcher</div>
                    <div className="text-[11px] text-slate-400">Scan JD against resume for keyword gaps</div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    onOpenBulletPolisher();
                    setAiMenuOpen(false);
                  }}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-slate-800 text-slate-200 hover:text-white transition-colors flex items-start gap-2.5 group"
                >
                  <Wand2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <div>
                    <div className="font-bold text-white">Bullet Point Polisher</div>
                    <div className="text-[11px] text-slate-400">Transform drafts using Google XYZ formula</div>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Design Gallery Badge Selector */}
          <button
            onClick={onOpenTemplatesModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 text-xs font-semibold transition-all hover:border-slate-500"
            title="Browse all 22 Universal Architectures"
          >
            <Layout className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden lg:inline text-slate-400">Format:</span>
            <span className="font-bold text-white truncate max-w-[110px]">{currentTemplateObj.name.split('/')[0]}</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-blue-500/20 text-blue-300 font-bold border border-blue-500/30">
              22
            </span>
          </button>

          {/* Sample Presets Dropdown */}
          <div className="relative">
            <button
              onClick={() => setSamplesOpen(!samplesOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-800 text-slate-300 border border-slate-700/80 text-xs font-semibold transition-colors"
            >
              <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Presets</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {samplesOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl py-1 z-50 text-xs">
                <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                  Pre-filled Industry Profiles
                </div>
                {Object.values(SAMPLE_PROFILES).map((sample) => (
                  <button
                    key={sample.id}
                    onClick={() => {
                      onLoadSample(sample.data);
                      setSamplesOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-slate-200 hover:bg-slate-800 hover:text-white transition-colors flex items-center justify-between"
                  >
                    <span className="font-medium">{sample.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ATS Score Checker Pill */}
          <button
            onClick={onOpenATSModal}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black border transition-all ${
              atsAnalysis.score >= 80 
                ? 'bg-emerald-950/50 text-emerald-300 border-emerald-500/40 hover:bg-emerald-900/60 shadow-sm shadow-emerald-500/10' 
                : 'bg-amber-950/50 text-amber-300 border-amber-500/40 hover:bg-amber-900/60 shadow-sm shadow-amber-500/10'
            }`}
            title="Open ATS Compatibility Auditor"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>ATS {atsAnalysis.score}%</span>
          </button>

          {/* Backup / Restore Menu */}
          <div className="hidden xl:flex items-center gap-1 pl-1 border-l border-slate-800">
            <button
              onClick={onExportJSON}
              className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              title="Backup Resume to JSON"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
            <label
              className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Import JSON Resume"
            >
              <Upload className="w-3.5 h-3.5" />
              <input type="file" accept=".json" onChange={onImportJSON} className="hidden" />
            </label>
            <button
              onClick={onResetData}
              className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-rose-400 transition-colors"
              title="Reset to blank resume"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
