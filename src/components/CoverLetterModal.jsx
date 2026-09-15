import React, { useState } from 'react';
import { X, Copy, Check, Printer, Sparkles, FileText, Send, Building2, UserCheck } from 'lucide-react';

export default function CoverLetterModal({ isOpen, onClose, resumeData, themeColor }) {
  if (!isOpen) return null;

  const personal = resumeData.personal || {};
  const [targetCompany, setTargetCompany] = useState('Acme Global Technologies');
  const [targetRole, setTargetRole] = useState(personal.title || 'Senior Specialist');
  const [copied, setCopied] = useState(false);

  // Generate personalized cover letter text
  const generateLetter = () => {
    const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    const topExp = resumeData.experience?.[0] || {};
    const topMetric = topExp.highlights?.[0] || 'leading cross-functional initiatives and driving technical excellence';

    return `${today}

Hiring Committee
${targetCompany}

Dear Hiring Team,

I am writing to express my enthusiastic interest in the ${targetRole} position at ${targetCompany}. With a demonstrated background as a ${personal.title || 'dedicated professional'} and a proven track record of quantifiable impact—most recently at ${topExp.company || 'my recent organization'}, where I focused on ${topMetric}—I am confident in my ability to immediately accelerate your team's objectives.

Throughout my career, I have specialized in bridging high-level strategic vision with rigorous execution. In my most recent role as ${topExp.title || personal.title || 'Lead'}, I spearheaded critical deliverables that enhanced operational velocity and operational resilience. The forward-thinking mission of ${targetCompany} resonates deeply with my professional values, particularly your focus on scalable quality and transformative user experiences.

Key contributions I look forward to bringing to ${targetCompany} include:
• Expertise across ${resumeData.skills?.[0]?.items?.slice(0, 4).join(', ') || 'core functional and technical competencies'}.
• Direct leadership in ${topExp.highlights?.[1] || 'scaling critical workflows and architecting sustainable solutions'}.
• A relentless dedication to cross-functional collaboration, mentorship, and high-standard engineering.

I welcome the opportunity to discuss how my experience, leadership philosophy, and passion for excellence align with ${targetCompany}'s upcoming roadmap. Thank you for your time, consideration, and leadership.

Warmest regards,

${personal.fullName || 'Candidate Name'}
${personal.email || ''} | ${personal.phone || ''}
${personal.location || ''}
${personal.linkedin ? `LinkedIn: ${personal.linkedin}` : ''}`;
  };

  const [letterContent, setLetterContent] = useState(generateLetter());

  const handleCopy = () => {
    navigator.clipboard.writeText(letterContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    const printWin = window.open('', '_blank');
    printWin.document.write(`
      <html>
        <head>
          <title>Cover Letter - ${personal.fullName || 'Candidate'}</title>
          <style>
            body { font-family: 'Merriweather', Georgia, serif; line-height: 1.7; padding: 40px; color: #1e293b; max-width: 800px; margin: 0 auto; white-space: pre-line; }
            h1 { font-size: 24px; margin-bottom: 4px; font-family: sans-serif; text-transform: uppercase; color: #0f172a; }
            .header-info { font-family: sans-serif; font-size: 13px; color: #64748b; margin-bottom: 24px; border-bottom: 2px solid #e2e8f0; padding-bottom: 12px; }
          </style>
        </head>
        <body>
          <h1>${personal.fullName || 'Candidate Name'}</h1>
          <div class="header-info">${personal.title || ''} • ${personal.email || ''} • ${personal.phone || ''} • ${personal.location || ''}</div>
          <div>${letterContent.replace(/\n/g, '<br/>')}</div>
        </body>
      </html>
    `);
    printWin.document.close();
    printWin.focus();
    setTimeout(() => {
      printWin.print();
    }, 250);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-3xl rounded-2xl p-6 shadow-2xl relative text-slate-100 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/20">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black text-white tracking-tight">AI Matching Cover Letter</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-bold uppercase">
                  Tailored
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Automatically tailored from your resume highlights & target company
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Inputs Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-4 border-b border-slate-800">
          <div>
            <label className="text-[11px] font-semibold text-slate-300 block mb-1">Target Company</label>
            <input
              type="text"
              value={targetCompany}
              onChange={(e) => {
                setTargetCompany(e.target.value);
              }}
              placeholder="e.g. Google, Stripe, McKinsey"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500"
            />
          </div>
          <div>
            <label className="text-[11px] font-semibold text-slate-300 block mb-1">Target Position</label>
            <input
              type="text"
              value={targetRole}
              onChange={(e) => {
                setTargetRole(e.target.value);
              }}
              placeholder="e.g. Senior Staff Engineer"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>

        {/* Letter Editor Canvas */}
        <div className="flex-1 overflow-y-auto py-4">
          <textarea
            value={letterContent}
            onChange={(e) => setLetterContent(e.target.value)}
            className="w-full h-80 bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs font-serif leading-relaxed text-slate-200 focus:outline-none focus:border-purple-500/50 resize-none font-mono"
          />
        </div>

        {/* Modal Actions */}
        <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => setLetterContent(generateLetter())}
            className="text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Regenerate from Resume</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors border border-slate-700"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Letter'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-purple-500/20 transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Print / PDF Letter</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
