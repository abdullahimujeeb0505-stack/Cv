import React, { useState } from 'react';
import { 
  X, Check, Sparkles, Layout, ExternalLink, Search, 
  ShieldCheck, RectangleHorizontal, Filter, Compass
} from 'lucide-react';
import { TEMPLATES_CATALOG } from '../data/defaultData';

export default function TemplateCatalogModal({ isOpen, onClose, selectedTemplate, onSelectTemplate }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  if (!isOpen) return null;

  const categories = [
    { id: 'all', label: 'All Architectures', count: TEMPLATES_CATALOG.length },
    { id: 'ats', label: 'ATS-Optimized', count: TEMPLATES_CATALOG.filter(t => t.category === 'ats').length },
    { id: 'executive', label: 'Executive & Board', count: TEMPLATES_CATALOG.filter(t => t.category === 'executive').length },
    { id: 'tech', label: 'Tech & Startups', count: TEMPLATES_CATALOG.filter(t => t.category === 'tech').length },
    { id: 'creative', label: 'Creative & Media', count: TEMPLATES_CATALOG.filter(t => t.category === 'creative').length },
    { id: 'specialized', label: 'Specialized (Medical/Law/EU)', count: TEMPLATES_CATALOG.filter(t => t.category === 'specialized').length },
    { id: 'academic', label: 'Academic & Research', count: TEMPLATES_CATALOG.filter(t => t.category === 'academic').length },
    { id: 'landscape', label: 'Landscape Slide Ready', count: TEMPLATES_CATALOG.filter(t => t.category === 'landscape' || t.supportsLandscape).length },
  ];

  const filteredTemplates = TEMPLATES_CATALOG.filter((tpl) => {
    // Category match
    if (activeCategory === 'landscape') {
      if (tpl.category !== 'landscape' && !tpl.supportsLandscape) return false;
    } else if (activeCategory !== 'all' && tpl.category !== activeCategory) {
      return false;
    }

    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = tpl.name.toLowerCase().includes(q);
      const matchTag = tpl.tagline?.toLowerCase().includes(q);
      const matchRec = tpl.recommendedFor?.toLowerCase().includes(q);
      const matchCat = tpl.category?.toLowerCase().includes(q);
      return matchName || matchTag || matchRec || matchCat;
    }

    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-6xl rounded-2xl p-5 sm:p-7 shadow-2xl relative text-slate-100 max-h-[92vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20">
              <Layout className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Resume Design Gallery
                </h3>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  22 Universal Layouts
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Every layout is calibrated for modern ATS compliance and dual orientation (Portrait & Landscape)
              </p>
            </div>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search layouts or industries..."
              className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Category Pills Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-3 border-b border-slate-800 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/60'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                activeCategory === cat.id ? 'bg-white/20 text-white' : 'bg-slate-700 text-slate-400'
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* 22 Templates Grid Area */}
        <div className="flex-1 overflow-y-auto pt-4 pr-1">
          {filteredTemplates.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-sm">
              No resume architectures match "{searchQuery}". Try a different keyword or category.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
              {filteredTemplates.map((tpl) => {
                const isSelected = selectedTemplate === tpl.id;
                return (
                  <div
                    key={tpl.id}
                    onClick={() => {
                      onSelectTemplate(tpl.id);
                      onClose();
                    }}
                    className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between group ${
                      isSelected
                        ? 'bg-blue-950/40 border-blue-500 ring-2 ring-blue-500/40 shadow-xl'
                        : 'bg-slate-800/50 border-slate-700/70 hover:border-slate-600 hover:bg-slate-800'
                    }`}
                  >
                    <div>
                      {/* Card Top Strip */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-extrabold text-sm text-white flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: tpl.accentColor }}></span>
                          <span className="group-hover:text-blue-300 transition-colors">{tpl.name}</span>
                        </span>

                        <div className="flex items-center gap-1">
                          {tpl.atsScoreGuarantee && (
                            <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30 flex items-center gap-0.5" title="ATS Compatibility Rating">
                              <ShieldCheck className="w-2.5 h-2.5" />
                              <span>{tpl.atsScoreGuarantee}</span>
                            </span>
                          )}
                          {isSelected && (
                            <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-bold border border-blue-500/30 flex items-center gap-1">
                              <Check className="w-3 h-3" />
                              <span>Active</span>
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Tagline */}
                      <p className="text-xs text-blue-300 font-medium mb-2 leading-snug">
                        {tpl.tagline}
                      </p>

                      {/* Recommended For */}
                      <p className="text-[11.5px] text-slate-400 mb-3 leading-snug">
                        <strong className="text-slate-300">Best for:</strong> {tpl.recommendedFor}
                      </p>

                      {/* Reasons bullets */}
                      {tpl.bestMatchCriteria?.reasons && (
                        <ul className="space-y-1 text-[11px] text-slate-400 border-t border-slate-700/60 pt-2 mb-3">
                          {tpl.bestMatchCriteria.reasons.slice(0, 2).map((r, i) => (
                            <li key={i} className="flex items-start gap-1.5 leading-snug">
                              <span className="text-blue-400 shrink-0">•</span>
                              <span>{r}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* Card Footer: Badges & Switch Button */}
                    <div className="pt-3 border-t border-slate-700/40 flex items-center justify-between gap-2 mt-auto">
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-700 font-medium uppercase tracking-wider">
                          {tpl.category}
                        </span>
                        {tpl.supportsLandscape && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-950/60 text-indigo-300 border border-indigo-700/40 font-medium flex items-center gap-1" title="Supports Landscape orientation">
                            <RectangleHorizontal className="w-3 h-3" />
                            <span className="hidden sm:inline">Landscape</span>
                          </span>
                        )}
                      </div>

                      <button
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                          isSelected
                            ? 'bg-blue-600 text-white shadow-sm'
                            : 'bg-slate-700 text-slate-200 group-hover:bg-blue-600 group-hover:text-white'
                        }`}
                      >
                        {isSelected ? 'Active Format' : 'Apply Layout'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
