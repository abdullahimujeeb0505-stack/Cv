import React from 'react';
import { X, CheckCircle2, AlertTriangle, ShieldCheck, Sparkles, TrendingUp } from 'lucide-react';
import { calculateATSScore } from '../data/recommendationEngine';

export default function ATSScoreModal({ isOpen, onClose, resumeData }) {
  if (!isOpen) return null;

  const analysis = calculateATSScore(resumeData);

  const getScoreColor = (score) => {
    if (score >= 85) return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
    if (score >= 70) return 'text-blue-400 border-blue-500/30 bg-blue-500/10';
    return 'text-amber-400 border-amber-500/30 bg-amber-500/10';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-2xl p-6 shadow-2xl relative text-slate-100 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="p-2.5 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">ATS Compatibility Audit</h3>
            <p className="text-xs text-slate-400">Automated evaluation against corporate Applicant Tracking Systems</p>
          </div>
        </div>

        {/* Big Score Card */}
        <div className={`p-5 rounded-xl border flex items-center justify-between mb-5 ${getScoreColor(analysis.score)}`}>
          <div>
            <span className="text-xs uppercase font-bold tracking-wider opacity-80">ATS Score Rating</span>
            <div className="text-4xl font-extrabold mt-0.5">{analysis.score} <span className="text-lg font-normal opacity-70">/ 100</span></div>
            <div className="text-xs font-semibold mt-1">Status: {analysis.grade}</div>
          </div>
          <div className="text-right">
            {analysis.readyForApplication ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Recruiter Ready</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Needs Polish</span>
              </span>
            )}
          </div>
        </div>

        {/* Itemized Checks */}
        <div className="space-y-3 mb-5">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Evaluation Breakdown</h4>
          {analysis.checks.map((chk, i) => (
            <div key={i} className="p-3 rounded-lg bg-slate-800/80 border border-slate-700/80 flex items-start justify-between gap-3 text-xs">
              <div className="space-y-0.5 flex-1">
                <div className="flex items-center gap-2">
                  {chk.passed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                  )}
                  <span className="font-semibold text-white">{chk.title}</span>
                </div>
                <p className="text-slate-400 text-[11px] pl-6 leading-relaxed">{chk.detail}</p>
              </div>
              <span className="font-mono font-bold text-slate-300 shrink-0">{chk.score}</span>
            </div>
          ))}
        </div>

        {/* Pro Tip Callout */}
        <div className="p-3.5 rounded-xl bg-blue-950/40 border border-blue-800/40 text-xs text-slate-300 flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
          <p>
            <strong className="text-white">Pro Tip:</strong> Recruiters look for metrics. Bullets featuring percentages (e.g., +35%), monetary impact ($120K), or time reduction (from 4h to 10m) receive 4x more interview invitations.
          </p>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors"
          >
            Got it, continue editing
          </button>
        </div>
      </div>
    </div>
  );
}
