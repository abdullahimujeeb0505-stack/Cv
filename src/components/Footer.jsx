import React from 'react';
import { Heart, ShieldCheck, Sparkles, Code2, ExternalLink, FileText, CheckCircle2 } from 'lucide-react';
import { TwitterX, Github } from './Icons';

export default function Footer() {
  return (
    <footer className="no-print mt-auto border-t border-slate-800/80 bg-slate-900/95 backdrop-blur-md text-slate-400 py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Value Prop */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="font-extrabold text-white text-base tracking-tight">
                Universal<span className="text-blue-400">Resume</span> AI
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20 font-semibold">
                v2.0 • 22 Layouts
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Dual Orientation (Portrait & Landscape) • Client-Side Privacy • ATS Compatibility Engine
            </p>
          </div>
        </div>

        {/* Creator Highlight Badge: Great_mujey leading to X */}
        <div className="flex flex-col items-center md:items-end gap-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-300">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
            <span>by</span>
            <a
              href="https://x.com/Great_mujey"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-black text-white font-bold text-xs border border-slate-700 hover:border-slate-500 transition-all shadow-sm hover:shadow-blue-500/10 group"
              title="Connect with Great_mujey on X (formerly Twitter)"
            >
              <TwitterX className="w-3.5 h-3.5 text-white group-hover:scale-110 transition-transform" />
              <span className="text-white group-hover:text-blue-400 transition-colors">Great_mujey</span>
              <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-white transition-colors" />
            </a>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-500">
            <a
              href="https://github.com/abdullahimujeeb0505-stack/Cv"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub Repository</span>
            </a>
            <span>•</span>
            <span className="flex items-center gap-1 text-emerald-400 text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% Client-Side Privacy</span>
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Sub-bar */}
      <div className="max-w-7xl mx-auto mt-6 pt-4 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
        <div>
          © {new Date().getFullYear()} Universal Resume AI. Designed and engineered by{' '}
          <a
            href="https://x.com/Great_mujey"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-300 hover:text-blue-400 font-semibold underline underline-offset-2 transition-colors"
          >
            Great_mujey
          </a>.
        </div>
        <div className="flex items-center gap-4">
          <span>A4 & US Letter Compliant</span>
          <span>•</span>
          <span>Portrait & Landscape Slides</span>
          <span>•</span>
          <span>Zero Server Storage</span>
        </div>
      </div>
    </footer>
  );
}
