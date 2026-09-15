import React from 'react';
import { X, Check, Sparkles, Layout, ExternalLink } from 'lucide-react';
import { TEMPLATES_CATALOG } from '../data/defaultData';

export default function TemplateCatalogModal({ isOpen, onClose, selectedTemplate, onSelectTemplate }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-4xl rounded-2xl p-6 shadow-2xl relative text-slate-100 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
            <Layout className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Universal Resume Architectures</h3>
            <p className="text-xs text-slate-400">Select any layout tailored to your industry standards and ATS requirements</p>
          </div>
        </div>

        {/* 6 Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TEMPLATES_CATALOG.map((tpl) => {
            const isSelected = selectedTemplate === tpl.id;
            return (
              <div
                key={tpl.id}
                onClick={() => {
                  onSelectTemplate(tpl.id);
                  onClose();
                }}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-blue-950/40 border-blue-500 ring-2 ring-blue-500/30 shadow-lg'
                    : 'bg-slate-800/60 border-slate-700/80 hover:border-slate-600 hover:bg-slate-800'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm text-white flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: tpl.accentColor }}></span>
                      {tpl.name}
                    </span>
                    {isSelected && (
                      <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-bold border border-blue-500/30 flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        <span>Active</span>
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-blue-300 font-medium mb-2">{tpl.tagline}</p>
                  <p className="text-xs text-slate-400 mb-3"><strong className="text-slate-300">Recommended for:</strong> {tpl.recommendedFor}</p>

                  <ul className="space-y-1 text-[11px] text-slate-400 border-t border-slate-700/60 pt-2">
                    {tpl.bestMatchCriteria.reasons.map((r, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-blue-400">•</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-700/40 flex justify-end">
                  <button
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      isSelected
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-700 text-slate-200 hover:bg-slate-600'
                    }`}
                  >
                    {isSelected ? 'Currently Selected' : 'Switch to this Format'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
