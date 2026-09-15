import React, { useState } from 'react';
import { 
  X, Sparkles, Wand2, Copy, Check, ArrowRight, 
  TrendingUp, Award, Zap, Layers, RefreshCw 
} from 'lucide-react';

export default function BulletPolishModal({ isOpen, onClose, resumeData, setResumeData, onShowToast }) {
  const [inputBullet, setInputBullet] = useState('');
  const [selectedRoleIndex, setSelectedRoleIndex] = useState(0);
  const [results, setResults] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);

  if (!isOpen) return null;

  // Generate 3 high-converting variations
  const handleEnhance = () => {
    if (!inputBullet.trim()) return;

    const base = inputBullet.trim().replace(/^[-*•]\s*/, '');

    // Sample dynamic transformations
    const v1 = `Spearheaded ${base.toLowerCase()}, improving operational throughput by 38% and reducing critical system turnaround from 48h to 90m.`;
    const v2 = `Architected end-to-end framework for ${base.toLowerCase()}; mentored 5 cross-functional contributors and aligned roadmap deliverables with quarterly OKRs.`;
    const v3 = `Engineered automated, resilient pipeline for ${base.toLowerCase()}, eliminating 99.4% of manual errors while saving an estimated $65,000 in annual infrastructure overhead.`;

    setResults([
      {
        formula: 'Google XYZ Formula (Metric-Driven)',
        icon: <TrendingUp className="w-3.5 h-3.5 text-blue-400" />,
        text: v1,
        color: 'border-blue-500/40 bg-blue-950/20 text-blue-100'
      },
      {
        formula: 'Executive Leadership & Strategy',
        icon: <Award className="w-3.5 h-3.5 text-purple-400" />,
        text: v2,
        color: 'border-purple-500/40 bg-purple-950/20 text-purple-100'
      },
      {
        formula: 'High-Impact Engineering & Cost Optimization',
        icon: <Zap className="w-3.5 h-3.5 text-emerald-400" />,
        text: v3,
        color: 'border-emerald-500/40 bg-emerald-950/20 text-emerald-100'
      }
    ]);
  };

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
    if (onShowToast) onShowToast('Copied polished bullet to clipboard!');
  };

  const handleApplyToRole = (text) => {
    if (!resumeData.experience?.length) return;
    setResumeData(prev => {
      const exp = [...prev.experience];
      if (exp[selectedRoleIndex]) {
        exp[selectedRoleIndex] = {
          ...exp[selectedRoleIndex],
          highlights: [...(exp[selectedRoleIndex].highlights || []), text]
        };
      }
      return { ...prev, experience: exp };
    });
    if (onShowToast) onShowToast(`Added to "${resumeData.experience[selectedRoleIndex]?.title || 'Role'}"!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700/80 w-full max-w-2xl rounded-2xl p-5 sm:p-7 shadow-2xl relative text-slate-100 max-h-[92vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/20">
            <Wand2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-black text-white tracking-tight">AI Bullet Point Polisher</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Action Verb Engine
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Transform passive descriptions into high-converting, quantifiable accomplishment statements
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
          {/* Preset Picker if user has experience */}
          {resumeData.experience?.length > 0 && (
            <div>
              <label className="text-[11px] font-semibold text-slate-400 mb-1 block">
                Quick pick from current experience highlights:
              </label>
              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                {resumeData.experience.flatMap((exp, rIdx) => 
                  (exp.highlights || []).filter(Boolean).map((h, hIdx) => (
                    <button
                      key={`${rIdx}-${hIdx}`}
                      onClick={() => {
                        setInputBullet(h);
                        setSelectedRoleIndex(rIdx);
                      }}
                      className="text-[11px] text-left px-2.5 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 truncate max-w-[280px]"
                      title={h}
                    >
                      {h}
                    </button>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Text Input */}
          <div>
            <label className="text-xs font-semibold text-slate-300 mb-1.5 block">
              Draft accomplishment or task to upgrade:
            </label>
            <textarea
              rows={3}
              value={inputBullet}
              onChange={(e) => setInputBullet(e.target.value)}
              placeholder="e.g. Worked on migrating the database and helped the front end team build pages..."
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            />
          </div>

          {/* Power Verbs Quick Chips */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] text-slate-500 font-semibold">Suggested Power Verbs:</span>
            {['Architected', 'Spearheaded', 'Optimized', 'Orchestrated', 'Scaled', 'Automated'].map(verb => (
              <button
                key={verb}
                onClick={() => setInputBullet(prev => `${verb} ${prev.replace(/^(I |We |Worked on |Helped )/i, '')}`)}
                className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 hover:text-purple-300 hover:bg-slate-700 border border-slate-700 transition-colors"
              >
                +{verb}
              </button>
            ))}
          </div>

          {/* Enhance Button */}
          <div className="flex justify-end">
            <button
              onClick={handleEnhance}
              disabled={!inputBullet.trim()}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition-all shadow-md ${
                !inputBullet.trim()
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-purple-500/20'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Generate 3 Polished Variations</span>
            </button>
          </div>

          {/* Results */}
          {results && (
            <div className="space-y-3 pt-3 border-t border-slate-800 animate-fadeIn">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Recommended Upgrades:
              </span>

              {results.map((res, idx) => (
                <div key={idx} className={`p-3.5 rounded-xl border ${res.color} flex flex-col justify-between gap-3`}>
                  <div>
                    <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider mb-1.5">
                      {res.icon}
                      <span>{res.formula}</span>
                    </div>
                    <p className="text-xs leading-relaxed font-medium">{res.text}</p>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/10">
                    <button
                      onClick={() => handleCopy(res.text, idx)}
                      className="px-2.5 py-1 rounded-lg bg-black/30 hover:bg-black/50 text-[11px] text-slate-200 transition-colors flex items-center gap-1"
                    >
                      {copiedIndex === idx ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedIndex === idx ? 'Copied' : 'Copy'}</span>
                    </button>

                    {resumeData.experience?.length > 0 && (
                      <button
                        onClick={() => handleApplyToRole(res.text)}
                        className="px-3 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-[11px] text-white font-bold transition-colors flex items-center gap-1"
                      >
                        <span>Apply to {resumeData.experience[selectedRoleIndex]?.company || 'Role'}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
