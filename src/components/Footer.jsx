import React from 'react';
import { 
  Heart, ShieldCheck, Sparkles, Code2, ExternalLink, 
  FileText, CheckCircle2, Command, Layers, Cpu, Compass
} from 'lucide-react';
import { TwitterX, Github } from './Icons';

export default function Footer({ onOpenTemplatesModal, onOpenJobMatcher }) {
  return (
    <footer className="no-print mt-12 border-t border-slate-800/80 bg-slate-950 text-slate-400 py-10 px-4 sm:px-8 relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-blue-600/10 via-purple-600/5 to-transparent blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        {/* Top Feature Highlights Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-8 border-b border-slate-800/80">
          <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 shrink-0">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <div className="text-white font-bold text-xs">22 Architectures</div>
              <div className="text-[11px] text-slate-500">Every industry covered</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shrink-0">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <div className="text-white font-bold text-xs">Dual Orientations</div>
              <div className="text-[11px] text-slate-500">Portrait & 16:9 Slides</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-white font-bold text-xs">100% Private</div>
              <div className="text-[11px] text-slate-500">Zero server data storage</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 shrink-0">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <div className="text-white font-bold text-xs">ATS Compatibility</div>
              <div className="text-[11px] text-slate-500">Instant score audit</div>
            </div>
          </div>
        </div>

        {/* Center Grid */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Brand Info */}
          <div className="flex flex-col sm:flex-row items-center gap-3.5 text-center sm:text-left">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-xl shadow-blue-500/25 ring-1 ring-white/20 shrink-0">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="font-black text-white text-lg tracking-tight">
                  Universal<span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Resume</span> AI
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/30 font-bold">
                  v2.0
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 max-w-md">
                The modern resume engine that interviews candidates and generates ATS-optimized resumes in real-time.
              </p>
            </div>
          </div>

          {/* Creator Spotlight: Great_mujey on X */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-xs text-slate-300 font-bold flex items-center justify-end gap-1.5">
                <span>Designed & Engineered by</span>
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
              </div>
              <div className="text-[11px] text-slate-500">Follow for updates & new architectures</div>
            </div>

            <a
              href="https://x.com/Great_mujey"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-slate-900 hover:bg-black text-white font-extrabold text-xs border border-slate-700/80 hover:border-slate-500 transition-all shadow-lg hover:shadow-blue-500/20 group hover:scale-102"
              title="Connect with Great_mujey on X"
            >
              <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center text-white border border-slate-700">
                <TwitterX className="w-3 h-3 text-white group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-left">
                <div className="text-white text-xs group-hover:text-blue-400 transition-colors flex items-center gap-1">
                  <span>Great_mujey</span>
                  <span className="text-[10px] text-blue-400 font-normal">on X</span>
                </div>
              </div>
              <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-white transition-colors ml-1" />
            </a>

            <a
              href="https://github.com/abdullahimujeeb0505-stack/Cv"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white font-bold text-xs border border-slate-800 transition-all"
            >
              <Github className="w-4 h-4 text-slate-400" />
              <span>GitHub</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Shortcuts */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} Universal Resume AI. Created with pride by{' '}
            <a
              href="https://x.com/Great_mujey"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-blue-400 font-bold underline underline-offset-2 transition-colors"
            >
              Great_mujey
            </a>. Free & Open-Source.
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1">
              <span className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] font-mono text-slate-300">Ctrl+P</span>
              <span>Print/PDF</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <span className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] font-mono text-slate-300">Ctrl+K</span>
              <span>22 Formats</span>
            </span>
            <span>•</span>
            <span className="text-emerald-400 font-semibold">100% In-Browser Privacy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
