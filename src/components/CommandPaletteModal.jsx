import React, { useState, useEffect } from 'react';
import { 
  Search, Layout, Printer, Sparkles, Sliders, ShieldCheck, 
  RotateCcw, Download, Upload, Eye, FileText, RectangleHorizontal, 
  Check, ArrowRight, Command
} from 'lucide-react';
import { TEMPLATES_CATALOG } from '../data/defaultData';

export default function CommandPaletteModal({
  isOpen,
  onClose,
  activeMode,
  setActiveMode,
  selectedTemplate,
  setSelectedTemplate,
  onOpenTemplatesModal,
  onOpenATSModal,
  onOpenCoverLetter,
  orientation,
  setOrientation,
  onPrint,
  onExportJSON
}) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (isOpen) setQuery('');
  }, [isOpen]);

  if (!isOpen) return null;

  const actions = [
    {
      id: 'print',
      label: 'Print / Export Resume to PDF',
      shortcut: '⌘P',
      icon: <Printer className="w-4 h-4 text-blue-400" />,
      run: () => { onClose(); onPrint(); }
    },
    {
      id: 'cover-letter',
      label: 'Open AI Matching Cover Letter Generator',
      shortcut: '⌘L',
      icon: <FileText className="w-4 h-4 text-purple-400" />,
      run: () => { onClose(); onOpenCoverLetter(); }
    },
    {
      id: 'ats-audit',
      label: 'Run Real-Time ATS Compatibility Audit',
      shortcut: '⌘J',
      icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />,
      run: () => { onClose(); onOpenATSModal(); }
    },
    {
      id: 'design-gallery',
      label: 'Browse All 22 Resume Layouts in Design Gallery',
      shortcut: '⌘K',
      icon: <Layout className="w-4 h-4 text-indigo-400" />,
      run: () => { onClose(); onOpenTemplatesModal(); }
    },
    {
      id: 'toggle-landscape',
      label: `Switch Orientation to ${orientation === 'portrait' ? 'Landscape (11x8.5 Widescreen Slide)' : 'Portrait (Standard Vertical)'}`,
      shortcut: '⌘O',
      icon: <RectangleHorizontal className="w-4 h-4 text-amber-400" />,
      run: () => { 
        setOrientation(orientation === 'portrait' ? 'landscape' : 'portrait'); 
        onClose(); 
      }
    },
    {
      id: 'mode-interview',
      label: 'Switch to AI Career Interview Mode',
      shortcut: '⌘I',
      icon: <Sparkles className="w-4 h-4 text-cyan-400" />,
      run: () => { setActiveMode('interview'); onClose(); }
    },
    {
      id: 'mode-editor',
      label: 'Switch to Visual Studio Form Editor',
      shortcut: '⌘E',
      icon: <Sliders className="w-4 h-4 text-pink-400" />,
      run: () => { setActiveMode('editor'); onClose(); }
    },
    {
      id: 'export-json',
      label: 'Export Complete Resume Backup (JSON)',
      shortcut: '⌘S',
      icon: <Download className="w-4 h-4 text-slate-400" />,
      run: () => { onExportJSON(); onClose(); }
    }
  ];

  // Also include 22 templates in command search
  const templateActions = TEMPLATES_CATALOG.map(t => ({
    id: `template-${t.id}`,
    label: `Apply Layout: ${t.name}`,
    category: `Architecture • ${t.category.toUpperCase()}`,
    icon: <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: t.accentColor }} />,
    run: () => {
      setSelectedTemplate(t.id);
      if (t.id === 'landscape-executive-slide') setOrientation('landscape');
      onClose();
    }
  }));

  const allItems = [...actions, ...templateActions];

  const filtered = allItems.filter(item => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return item.label.toLowerCase().includes(q) || item.category?.toLowerCase().includes(q);
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700/80 w-full max-w-2xl rounded-2xl shadow-2xl relative text-slate-100 overflow-hidden flex flex-col">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-800 bg-slate-850">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search 22 architectures..."
            className="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none"
          />
          <kbd className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] font-mono text-slate-400">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-400">
              No matching commands or layouts found.
            </div>
          ) : (
            filtered.map((item) => (
              <button
                key={item.id}
                onClick={item.run}
                className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-800/80 flex items-center justify-between group transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-lg bg-slate-800 text-slate-300 group-hover:text-white transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-200 group-hover:text-white transition-colors block">
                      {item.label}
                    </span>
                    {item.category && (
                      <span className="text-[10px] text-slate-400 block">{item.category}</span>
                    )}
                  </div>
                </div>

                {item.shortcut ? (
                  <kbd className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] font-mono text-slate-400">
                    {item.shortcut}
                  </kbd>
                ) : (
                  <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-300 transition-colors" />
                )}
              </button>
            ))
          )}
        </div>

        {/* Bottom Helper Bar */}
        <div className="px-4 py-2 bg-slate-950 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
          <span>Tip: Press ⌘K anywhere to open this menu</span>
          <div className="flex items-center gap-2">
            <span>Navigation: ↑↓</span>
            <span>•</span>
            <span>Select: ↵</span>
          </div>
        </div>
      </div>
    </div>
  );
}
