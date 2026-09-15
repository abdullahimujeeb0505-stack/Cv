import React, { useState } from 'react';
import { 
  X, Sparkles, Target, CheckCircle2, AlertCircle, 
  ArrowRight, Plus, Copy, Check, FileSearch, RefreshCw 
} from 'lucide-react';

export default function JobMatcherModal({ isOpen, onClose, resumeData, setResumeData, onShowToast }) {
  const [jobDescription, setJobDescription] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [addedSkills, setAddedSkills] = useState([]);

  if (!isOpen) return null;

  // Extract all text from user's current resume
  const getResumeText = () => {
    const parts = [
      resumeData.personal?.title || '',
      resumeData.summary || '',
      ...(resumeData.experience?.flatMap(e => [e.title, e.company, ...(e.highlights || [])]) || []),
      ...(resumeData.skills?.flatMap(s => [s.category, ...(s.items || [])]) || []),
      ...(resumeData.projects?.flatMap(p => [p.name, p.tech, p.description]) || []),
      ...(resumeData.certifications?.map(c => c.name) || []),
      ...(resumeData.education?.map(e => `${e.degree} ${e.school}`) || [])
    ];
    return parts.join(' ').toLowerCase();
  };

  // Analyze Job Description against Resume
  const handleAnalyze = () => {
    if (!jobDescription.trim()) return;
    setIsAnalyzing(true);

    setTimeout(() => {
      const resumeText = getResumeText();
      const jd = jobDescription.toLowerCase();

      // Common industry keywords library to test against JD
      const keywordBank = [
        // Tech & Engineering
        'react', 'typescript', 'javascript', 'python', 'go', 'golang', 'node.js', 'next.js',
        'aws', 'cloud', 'docker', 'kubernetes', 'ci/cd', 'kafka', 'graphql', 'sql', 'postgresql',
        'redis', 'microservices', 'distributed systems', 'rest api', 'system design', 'tdd',
        'agile', 'scrum', 'git', 'terraform', 'linux', 'data pipelines', 'etl',
        // Management & Executive
        'cross-functional', 'stakeholder management', 'p&l', 'budget', 'roadmap', 'strategy',
        'leadership', 'mentorship', 'kpi', 'okr', 'scaling', 'operations', 'compliance',
        'optimization', 'performance', 'hiring', 'revenue growth', 'governance',
        // Marketing & Product
        'seo', 'analytics', 'conversion rate', 'growth', 'user research', 'a/b testing',
        'campaign', 'funnel', 'retention', 'brand', 'content strategy', 'wireframing',
        // Healthcare & Science
        'clinical', 'patient care', 'compliance', 'hipaa', 'research', 'board certified',
        'protocols', 'quality assurance', 'laboratory', 'documentation'
      ];

      // Find keywords mentioned in JD
      const jdKeywords = keywordBank.filter(kw => {
        const regex = new RegExp(`\\b${kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
        return regex.test(jd);
      });

      // Split into matched and missing
      const matched = [];
      const missing = [];

      jdKeywords.forEach(kw => {
        if (resumeText.includes(kw)) {
          matched.push(kw);
        } else {
          missing.push(kw);
        }
      });

      const totalFoundInJD = jdKeywords.length || 1;
      const score = Math.min(98, Math.max(35, Math.round((matched.length / totalFoundInJD) * 100)));

      setAnalysis({
        score,
        matched,
        missing: missing.slice(0, 12),
        totalJDKeywords: jdKeywords.length,
        jdWordCount: jobDescription.split(/\s+/).filter(Boolean).length
      });
      setIsAnalyzing(false);
    }, 600);
  };

  // Quick 1-click Add missing skill into resume skills
  const handleAddSkill = (skill) => {
    if (addedSkills.includes(skill)) return;

    setResumeData(prev => {
      const existingSkills = prev.skills ? [...prev.skills] : [];
      if (existingSkills.length === 0) {
        existingSkills.push({ category: 'Key Qualifications', items: [skill] });
      } else {
        // Add to the first skill group or create a Target Skills category
        const first = { ...existingSkills[0] };
        first.items = [...(first.items || []), skill];
        existingSkills[0] = first;
      }
      return { ...prev, skills: existingSkills };
    });

    setAddedSkills(prev => [...prev, skill]);
    if (onShowToast) {
      onShowToast(`Added "${skill}" to your resume skills!`);
    }
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
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/20">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-black text-white tracking-tight">AI Job Description Matcher</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                ATS Scanner
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Paste the job posting to calculate match percentage and pinpoint missing ATS keywords
            </p>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
          {/* Textarea Input */}
          <div>
            <label className="text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
              <span>Paste Job Description (LinkedIn, Indeed, Company Careers):</span>
              {jobDescription && (
                <span className="text-[11px] text-slate-500 font-normal">
                  {jobDescription.split(/\s+/).filter(Boolean).length} words
                </span>
              )}
            </label>
            <textarea
              rows={5}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="e.g. We are looking for a Senior Software Engineer with deep expertise in React, TypeScript, Go, and AWS microservices. Experience scaling distributed systems and CI/CD pipelines..."
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          {/* Action Button */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                setJobDescription(`We are seeking an exceptional Senior Lead to architect distributed cloud systems, lead agile microservices development in React and Go, optimize AWS Lambda infrastructure, and mentor high-performing engineering teams.`);
              }}
              className="text-[11px] text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Load sample Tech JD</span>
            </button>

            <button
              onClick={handleAnalyze}
              disabled={!jobDescription.trim() || isAnalyzing}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition-all shadow-md ${
                !jobDescription.trim() || isAnalyzing
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-500/20'
              }`}
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Scanning ATS Filters...</span>
                </>
              ) : (
                <>
                  <FileSearch className="w-4 h-4" />
                  <span>Run Match Analysis</span>
                </>
              )}
            </button>
          </div>

          {/* Analysis Results */}
          {analysis && (
            <div className="space-y-4 pt-3 border-t border-slate-800 animate-fadeIn">
              {/* Score Card */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-700 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    ATS Keyword Match
                  </span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-3xl font-black text-white">{analysis.score}%</span>
                    <span className={`text-xs font-bold ${
                      analysis.score >= 75 ? 'text-emerald-400' : analysis.score >= 55 ? 'text-amber-400' : 'text-rose-400'
                    }`}>
                      {analysis.score >= 75 ? 'Strong Match' : analysis.score >= 55 ? 'Moderate Match' : 'High Keyword Gap'}
                    </span>
                  </div>
                </div>

                <div className="text-right text-xs text-slate-400">
                  <div><strong>{analysis.matched.length}</strong> Matched keywords</div>
                  <div className="text-amber-400"><strong>{analysis.missing.length}</strong> Missing keywords</div>
                </div>
              </div>

              {/* Missing Keywords (Opportunity to improve) */}
              {analysis.missing.length > 0 && (
                <div className="bg-amber-950/20 border border-amber-500/30 rounded-xl p-3.5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>Missing High-Frequency Keywords (Click to add):</span>
                    </span>
                    <span className="text-[10px] text-amber-400/80">1-click adds to resume</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {analysis.missing.map((kw, i) => {
                      const isAdded = addedSkills.includes(kw);
                      return (
                        <button
                          key={i}
                          onClick={() => handleAddSkill(kw)}
                          disabled={isAdded}
                          className={`text-xs px-2.5 py-1 rounded-lg border flex items-center gap-1 transition-all ${
                            isAdded
                              ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40 cursor-default'
                              : 'bg-slate-900 text-amber-200 border-amber-500/40 hover:bg-amber-500/20 hover:border-amber-400'
                          }`}
                        >
                          {isAdded ? <Check className="w-3 h-3 text-emerald-400" /> : <Plus className="w-3 h-3 text-amber-400" />}
                          <span className="capitalize">{kw}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Matched Keywords */}
              {analysis.matched.length > 0 && (
                <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-3.5">
                  <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5 mb-2">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Already on Your Resume:</span>
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {analysis.matched.map((kw, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-0.5 rounded-md bg-emerald-900/40 text-emerald-300 border border-emerald-500/30 capitalize font-medium"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
