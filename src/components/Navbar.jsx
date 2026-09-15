import React, { useState } from 'react';
import { 
  FileText, Sparkles, Sliders, ShieldCheck, Download, 
  Upload, RotateCcw, Layout, Check, ChevronDown, UserCheck,
  Command, Mail, CheckCircle2
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
  onOpenCoverLetter,
  onOpenCommandPalette,
  onLoadSample,
  onResetData,
  onExportJSON,
  onImportJSON,
  resumeData
}) {
  const [samplesOpen, setSamplesOpen] = useState(false);
  const currentTemplateObj = TEMPLATES_CATALOG.find(t => t.id === selectedTemplate) || TEMPLATES_CATALOG[0];
  const atsAnalysis = calculateATSScore(resumeData);

  // Calculate profile completeness
  const calculateCompleteness = () => {
    let completed = 0;
    let total = 6;
    if (resumeData.personal?.fullName && resumeData.personal?.email) completed++;
    if (resumeData.summary && resumeData.summary.length > 30) completed++;
    if (resumeData.experience && resumeData.experience.length > 0) completed++;
    if (resumeData.skills && resumeData.skills.length > 0) completed++;
    if (resumeData.education && resumeData.education.length > 0) completed++;
    if (resumeData.projects?.length > 0 || resumeData.certifications?.length > 0) completed++;
    return Math.round((completed / total) * 100);
  };

  const completeness = calculateCompleteness();

  return (
    <header className="no-print bg-slate-900/80 backdrop-blur-xl border-b border-white/10 sticky top-0 z-40 px-3 sm:px-6 py-2.5 transition-all shadow-lg shadow-black/20">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Brand Logo & Interactive Command Trigger */}
        <div className="flex items-center gap-3">
          <div className="relative group cursor-pointer" onClick={() => setActiveMode('interview')}>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-white border border-white/10">
              <FileText className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-white text-base sm:text-lg tracking-tight">
                Universal<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Resume</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider bg-blue-500/15 text-blue-300 border border-blue-500/30 hidden sm:inline-flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
                <span>22 Layouts</span>
              </span>
            </div>
            <p className="text-[10px] text-slate-400 hidden lg:block">Universal Format Determination & Career Interview</p>
          </div>

          {/* Quick Command Bar Trigger */}
          <button
            onClick={onOpenCommandPalette}
            className="hidden xl:flex items-center gap-2 px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-300 hover:text-white text-xs transition-colors shadow-2xs ml-2"
            title="Press ⌘K to open Command Menu"
          >
            <Command className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-[11px] text-slate-400">Search actions...</span>
            <kbd className="text-[10px] font-mono px-1.5 py-0.2 bg-slate-900 rounded border border-slate-700 text-slate-400">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Center: Mode Switcher (Interview vs Visual Studio) */}
        <div className="flex items-center bg-slate-800/90 p-1 rounded-xl border border-white/10 shadow-inner">
          <button
            onClick={() => setActiveMode('interview')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeMode === 'interview'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-300" />
            <span>AI Interview</span>
          </button>

          <button
            onClick={() => setActiveMode('editor')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeMode === 'editor'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Sliders className="w-3.5 h-3.5 text-indigo-300" />
            <span>Visual Studio</span>
          </button>
        </div>

        {/* Right Actions: Design Gallery, Cover Letter, Samples, ATS Score */}
        <div className="flex items-center gap-2">
          {/* Design Gallery Modal Trigger */}
          <button
            onClick={onOpenTemplatesModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-blue-500/50 text-xs font-medium transition-all shadow-2xs group"
            title="Browse all 22 layouts in Design Gallery"
          >
            <Layout className="w-3.5 h-3.5 text-blue-400 group-hover:scale-110 transition-transform" />
            <span className="hidden md:inline text-slate-400">Format:</span>
            <span className="font-semibold text-white max-w-[110px] truncate">{currentTemplateObj.name.split('/')[0]}</span>
          </button>

          {/* AI Cover Letter Generator */}
          <button
            onClick={onOpenCoverLetter}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-950/40 hover:bg-purple-900/50 text-purple-300 border border-purple-500/40 text-xs font-semibold transition-all shadow-2xs"
            title="Generate matching cover letter"
          >
            <Mail className="w-3.5 h-3.5 text-purple-400" />
            <span>Cover Letter</span>
          </button>

          {/* Sample Presets Dropdown */}
          <div className="relative">
            <button
              onClick={() => setSamplesOpen(!samplesOpen)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-medium transition-colors"
            >
              <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Samples</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {samplesOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl py-1 z-50 text-xs animate-fadeIn">
                <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                  Load Pre-filled Presets
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
                    <span>{sample.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ATS Score Checker Pill */}
          <button
            onClick={onOpenATSModal}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
              atsAnalysis.score >= 80 
                ? 'bg-emerald-950/50 text-emerald-300 border-emerald-500/40 hover:bg-emerald-900/50 shadow-sm shadow-emerald-500/10' 
                : 'bg-amber-950/50 text-amber-300 border-amber-500/40 hover:bg-amber-900/50 shadow-sm shadow-amber-500/10'
            }`}
            title="Click to view full ATS score breakdown"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>ATS {atsAnalysis.score}%</span>
          </button>

          {/* Export / Import Menu Button */}
          <div className="hidden lg:flex items-center gap-1 border-l border-slate-800 pl-2">
            <button
              onClick={onExportJSON}
              className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              title="Backup Resume to JSON"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
            <label
              className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Import JSON Resume"
            >
              <Upload className="w-3.5 h-3.5" />
              <input type="file" accept=".json" onChange={onImportJSON} className="hidden" />
            </label>
            <button
              onClick={onResetData}
              className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-red-400 transition-colors"
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
