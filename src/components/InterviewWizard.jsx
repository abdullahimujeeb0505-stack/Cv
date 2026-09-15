import React, { useState } from 'react';
import { 
  Camera, Upload, User, Briefcase, GraduationCap, 
  Wrench, FolderGit2, Globe, Award, Sparkles, 
  CheckCircle2, ArrowRight, ArrowLeft, RefreshCw,
  Plus, Trash2, HelpCircle, AlertCircle, Eye, Lightbulb,
  FileCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { determineBestFormat } from '../data/recommendationEngine';
import { TEMPLATES_CATALOG, COLOR_THEMES } from '../data/defaultData';

const SAMPLE_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80'
];

const ACTION_VERBS = [
  'Spearheaded', 'Architected', 'Engineered', 'Optimized',
  'Accelerated', 'Delivered', 'Scaled', 'Negotiated',
  'Orchestrated', 'Automated', 'Revamped', 'Generated'
];

export default function InterviewWizard({
  resumeData,
  setResumeData,
  selectedTemplate,
  setSelectedTemplate,
  onComplete
}) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { id: 'welcome', label: 'Start Interview', icon: Sparkles },
    { id: 'pfp', label: 'Photo & Profile Picture', icon: Camera },
    { id: 'identity', label: 'Contact & Identity', icon: User },
    { id: 'archetype', label: 'Career Archetype & Matcher', icon: Briefcase },
    { id: 'summary', label: 'Executive Summary', icon: Lightbulb },
    { id: 'experience', label: 'Experience & Impact', icon: Briefcase },
    { id: 'skills', label: 'Skills & Toolkit', icon: Wrench },
    { id: 'education', label: 'Education & Academics', icon: GraduationCap },
    { id: 'projects', label: 'Projects & Highlights', icon: FolderGit2 },
    { id: 'credentials', label: 'Languages & Certs', icon: Globe },
    { id: 'finish', label: 'Suitability Report', icon: CheckCircle2 }
  ];

  // Helper updates
  const updatePersonal = (field, val) => {
    setResumeData(prev => ({
      ...prev,
      personal: { ...prev.personal, [field]: val }
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setResumeData(prev => ({
          ...prev,
          photo: reader.result,
          showPhoto: true
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const currentRecommendation = determineBestFormat({
    industry: resumeData.industry || 'tech',
    experienceLevel: resumeData.experienceLevel || 'mid',
    targetRegion: resumeData.targetRegion || 'us',
    showPhoto: resumeData.showPhoto,
    jobTitle: resumeData.personal?.title || ''
  });

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Quick summary generator helper
  const applySummaryTemplate = (type) => {
    const role = resumeData.personal.title || 'Professional Specialist';
    const name = resumeData.personal.fullName || 'Dedicated professional';
    let text = '';

    if (type === 'impact') {
      text = `Results-oriented ${role} with a proven track record of architecting scalable solutions, optimizing cross-functional workflows, and driving measurable operational efficiency. Passionate about leveraging data-driven strategies to solve complex challenges and deliver tangible business value.`;
    } else if (type === 'leadership') {
      text = `Empowering and strategic ${role} with extensive experience building high-performing teams, governing critical initiatives, and cultivating collaborative stakeholder relationships. Recognized for mentoring talent and executing multi-million dollar transformations.`;
    } else if (type === 'tech') {
      text = `Engineering-focused ${role} dedicated to designing resilient architectures, clean maintainable codebases, and high-throughput systems. Adept at rapid problem discovery, automated CI/CD workflows, and collaborating seamlessly with cross-functional product squads.`;
    } else if (type === 'student') {
      text = `Enthusiastic and detail-oriented ${role} with strong foundational coursework in analytical problem solving, modern technical tools, and collaborative project execution. Eager to contribute fresh perspectives, rapid adaptability, and diligence to a high-velocity team.`;
    }

    setResumeData(prev => ({ ...prev, summary: text }));
  };

  // Add empty experience
  const addExperienceItem = () => {
    const newItem = {
      id: `exp-${Date.now()}`,
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      highlights: ['']
    };
    setResumeData(prev => ({
      ...prev,
      experience: [newItem, ...(prev.experience || [])]
    }));
  };

  const removeExperienceItem = (id) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(e => e.id !== id)
    }));
  };

  const updateExperienceItem = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(e => e.id === id ? { ...e, [field]: value } : e)
    }));
  };

  const addHighlightBullet = (expId) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(e => {
        if (e.id === expId) {
          return { ...e, highlights: [...(e.highlights || []), ''] };
        }
        return e;
      })
    }));
  };

  const updateHighlightBullet = (expId, index, value) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(e => {
        if (e.id === expId) {
          const newHighlights = [...(e.highlights || [])];
          newHighlights[index] = value;
          return { ...e, highlights: newHighlights };
        }
        return e;
      })
    }));
  };

  const removeHighlightBullet = (expId, index) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(e => {
        if (e.id === expId) {
          const newHighlights = e.highlights.filter((_, i) => i !== index);
          return { ...e, highlights: newHighlights };
        }
        return e;
      })
    }));
  };

  // Celebration on finish step
  React.useEffect(() => {
    if (currentStep === steps.length - 1) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [currentStep, steps.length]);

  return (
    <div className="bg-slate-900 text-slate-100 rounded-2xl border border-slate-800 p-4 sm:p-8 shadow-xl max-w-4xl mx-auto">
      {/* Wizard Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
          <span className="font-semibold text-blue-400">
            Step {currentStep + 1} of {steps.length}: {steps[currentStep].label}
          </span>
          <span>{Math.round(((currentStep + 1) / steps.length) * 100)}% Complete</span>
        </div>
        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          ></div>
        </div>

        {/* Step indicator pills */}
        <div className="hidden sm:flex items-center justify-between mt-3 overflow-x-auto gap-1">
          {steps.map((st, i) => {
            const Icon = st.icon;
            const isCurrent = i === currentStep;
            const isCompleted = i < currentStep;
            return (
              <button
                key={st.id}
                onClick={() => setCurrentStep(i)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                  isCurrent 
                    ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' 
                    : isCompleted 
                    ? 'text-slate-400 hover:text-slate-200' 
                    : 'text-slate-600 hover:text-slate-500'
                }`}
              >
                <Icon className="w-3 h-3" />
                <span className="truncate max-w-[85px]">{st.label.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* STEP 0: Welcome */}
      {currentStep === 0 && (
        <div className="space-y-6 text-center py-6 sm:py-10">
          <div className="w-16 h-16 bg-blue-500/10 text-blue-400 rounded-2xl flex items-center justify-center mx-auto border border-blue-500/20 shadow-inner">
            <Sparkles className="w-8 h-8" />
          </div>

          <div className="max-w-xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Interactive Career & Resume Interview
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Welcome! I am your AI Career Consultant. I’ll guide you through a step-by-step interview—beginning right from your <strong className="text-blue-400">profile picture & visual presence</strong> down to your achievements, metrics, and skills.
            </p>
            <p className="text-xs sm:text-sm text-slate-400">
              Along the way, my algorithm continuously analyzes your industry, target role, and career seniority to determine the <strong className="text-slate-200">exact resume architecture and layout</strong> guaranteed to suit you best.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto pt-4 text-left">
            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
              <Camera className="w-5 h-5 text-blue-400 mb-2" />
              <h4 className="text-xs font-bold text-white mb-1">PFP & Global Etiquette</h4>
              <p className="text-[11px] text-slate-400">We explain regional photo guidelines (US/UK ATS bias-free vs EU/Design standard) so you never get screened out.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
              <Briefcase className="w-5 h-5 text-indigo-400 mb-2" />
              <h4 className="text-xs font-bold text-white mb-1">Dynamic Format Matching</h4>
              <p className="text-[11px] text-slate-400">Intelligent engine calculates whether Modern ATS, Executive Ivy, or Creative Studio fits your goals.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 mb-2" />
              <h4 className="text-xs font-bold text-white mb-1">XYZ Metric Assistance</h4>
              <p className="text-[11px] text-slate-400">Formulate high-converting bullet points using Google's XYZ accomplishment methodology.</p>
            </div>
          </div>

          <div className="pt-6">
            <button
              onClick={nextStep}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-500/25 transition-all text-sm group"
            >
              <span>Begin Interview: Step 1 (Profile Picture)</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 1: Profile Picture (PFP) */}
      {currentStep === 1 && (
        <div className="space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Phase 1: Visual Identity</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">Profile Picture (PFP) & Photo Etiquette</h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Let's begin with your photo. Different industries and countries follow distinct hiring standards.
            </p>
          </div>

          {/* Regional Guidelines Callout */}
          <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-800/40 flex items-start gap-3">
            <HelpCircle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-300 space-y-1">
              <span className="font-bold text-white">Global Photo Guidance:</span>
              <p>
                • <strong>USA, Canada, UK:</strong> Standard best practice is <span className="text-amber-300">NO PHOTO</span> to adhere to strict anti-bias hiring regulations and automated ATS parser compatibility.
              </p>
              <p>
                • <strong>Europe (Germany, France, etc.), Asia, Creative Roles:</strong> A clean, professional headshot is <span className="text-emerald-300">HIGHLY RECOMMENDED</span> and customary.
              </p>
            </div>
          </div>

          {/* Photo Management Interface */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Current photo preview */}
            <div className="md:col-span-4 flex flex-col items-center p-6 bg-slate-800/50 rounded-xl border border-slate-700/60 text-center">
              <div className="relative mb-4 group">
                {resumeData.photo ? (
                  <img 
                    src={resumeData.photo} 
                    alt="Profile Preview" 
                    className={`w-32 h-32 object-cover border-4 border-blue-500/40 shadow-xl ${
                      resumeData.photoShape === 'circle' ? 'rounded-full' : resumeData.photoShape === 'rounded' ? 'rounded-2xl' : 'rounded-none'
                    }`}
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-slate-700 flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-600">
                    <User className="w-10 h-10 opacity-60 mb-1" />
                    <span className="text-[11px]">No Photo</span>
                  </div>
                )}

                {resumeData.photo && (
                  <button
                    onClick={() => setResumeData(prev => ({ ...prev, photo: '', showPhoto: false }))}
                    className="absolute -top-1 -right-1 p-1 bg-red-600 text-white rounded-full hover:bg-red-500 shadow-md transition-colors"
                    title="Remove Photo"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Toggle show on resume */}
              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-300 select-none">
                <input 
                  type="checkbox"
                  checked={resumeData.showPhoto}
                  onChange={(e) => setResumeData(prev => ({ ...prev, showPhoto: e.target.checked }))}
                  className="rounded bg-slate-700 border-slate-600 text-blue-600 focus:ring-blue-500"
                />
                <span>Display photo on resume layout</span>
              </label>

              {/* Shape choices */}
              {resumeData.showPhoto && (
                <div className="flex items-center gap-1.5 mt-3 text-xs">
                  <span className="text-[11px] text-slate-400">Shape:</span>
                  {['circle', 'rounded', 'square'].map(shape => (
                    <button
                      key={shape}
                      onClick={() => setResumeData(prev => ({ ...prev, photoShape: shape }))}
                      className={`px-2 py-0.5 rounded text-[11px] capitalize transition-colors ${
                        resumeData.photoShape === shape ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      }`}
                    >
                      {shape}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Upload or Pick Avatar */}
            <div className="md:col-span-8 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-2">
                  Upload Your Own Headshot
                </label>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold cursor-pointer transition-colors shadow-sm">
                    <Upload className="w-4 h-4" />
                    <span>Choose Photo File</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleFileUpload} 
                      className="hidden" 
                    />
                  </label>
                  <span className="text-[11px] text-slate-400">PNG, JPG, or WebP up to 5MB</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-2">
                  Or pick a professional sample avatar:
                </label>
                <div className="flex flex-wrap items-center gap-3">
                  {SAMPLE_AVATARS.map((url, i) => (
                    <button
                      key={i}
                      onClick={() => setResumeData(prev => ({ ...prev, photo: url, showPhoto: true }))}
                      className={`relative rounded-full overflow-hidden border-2 transition-all p-0.5 ${
                        resumeData.photo === url ? 'border-blue-500 scale-105 shadow-md shadow-blue-500/30' : 'border-slate-700 hover:border-slate-500'
                      }`}
                    >
                      <img src={url} alt={`Avatar ${i}`} className="w-11 h-11 object-cover rounded-full" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 text-xs text-slate-400">
                <span className="text-blue-400 font-semibold">Tip:</span> If you are applying to US corporate roles, you can uncheck "Display photo on resume" anytime.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: Basic Contact & Identity */}
      {currentStep === 2 && (
        <div className="space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Phase 2: Contact Foundation</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">Identity & Contact Details</h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Ensure recruiters and ATS algorithms can reach you immediately with zero friction.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                Full Name <span className="text-red-400">*</span>
              </label>
              <input 
                type="text" 
                value={resumeData.personal.fullName || ''} 
                onChange={(e) => updatePersonal('fullName', e.target.value)}
                placeholder="e.g. Alex Rivera"
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                Target Role / Professional Title <span className="text-red-400">*</span>
              </label>
              <input 
                type="text" 
                value={resumeData.personal.title || ''} 
                onChange={(e) => updatePersonal('title', e.target.value)}
                placeholder="e.g. Senior Full-Stack Engineer"
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                Email Address <span className="text-red-400">*</span>
              </label>
              <input 
                type="email" 
                value={resumeData.personal.email || ''} 
                onChange={(e) => updatePersonal('email', e.target.value)}
                placeholder="e.g. alex.rivera@gmail.com"
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                Phone Number <span className="text-red-400">*</span>
              </label>
              <input 
                type="tel" 
                value={resumeData.personal.phone || ''} 
                onChange={(e) => updatePersonal('phone', e.target.value)}
                placeholder="e.g. +1 (555) 382-9012"
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                Location (City, Country / Remote)
              </label>
              <input 
                type="text" 
                value={resumeData.personal.location || ''} 
                onChange={(e) => updatePersonal('location', e.target.value)}
                placeholder="e.g. San Francisco, CA (Open to Remote)"
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                LinkedIn Profile URL
              </label>
              <input 
                type="text" 
                value={resumeData.personal.linkedin || ''} 
                onChange={(e) => updatePersonal('linkedin', e.target.value)}
                placeholder="e.g. linkedin.com/in/alex-rivera"
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                GitHub / Portfolio URL
              </label>
              <input 
                type="text" 
                value={resumeData.personal.github || ''} 
                onChange={(e) => updatePersonal('github', e.target.value)}
                placeholder="e.g. github.com/alexrivera"
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                Personal Website / Blog
              </label>
              <input 
                type="text" 
                value={resumeData.personal.website || ''} 
                onChange={(e) => updatePersonal('website', e.target.value)}
                placeholder="e.g. alexrivera.dev"
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: Career Archetype & Format Determination */}
      {currentStep === 3 && (
        <div className="space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Phase 3: The Format Determination Engine</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">Which Format Suits You Best?</h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Tell me about your career profile. Our algorithm matches your exact seniority and industry to the highest-converting resume template.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Industry Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-2">
                Target Industry / Discipline
              </label>
              <div className="space-y-2">
                {[
                  { id: 'tech', label: 'Tech, Software & Data' },
                  { id: 'executive', label: 'Finance, Consulting & Exec' },
                  { id: 'creative', label: 'Creative, Design & Media' },
                  { id: 'student', label: 'Student / Early Career / Switcher' },
                  { id: 'international', label: 'International / Multilingual' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setResumeData(prev => ({ ...prev, industry: item.id }));
                      const rec = determineBestFormat({
                        industry: item.id,
                        experienceLevel: resumeData.experienceLevel || 'mid',
                        targetRegion: resumeData.targetRegion || 'us',
                        showPhoto: resumeData.showPhoto,
                        jobTitle: resumeData.personal?.title || ''
                      });
                      setSelectedTemplate(rec.templateId);
                    }}
                    className={`w-full text-left p-2.5 rounded-lg text-xs font-medium border transition-all ${
                      resumeData.industry === item.id 
                        ? 'bg-blue-600 text-white border-blue-500 shadow-sm' 
                        : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Experience Level */}
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-2">
                Career Seniority Level
              </label>
              <div className="space-y-2">
                {[
                  { id: 'student', label: 'Student / Entry-Level (< 2 yrs)' },
                  { id: 'mid', label: 'Mid-Level Specialist (2–6 yrs)' },
                  { id: 'senior', label: 'Senior Specialist / Lead (6–10 yrs)' },
                  { id: 'executive', label: 'Director / VP / C-Suite (10+ yrs)' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setResumeData(prev => ({ ...prev, experienceLevel: item.id }));
                      const rec = determineBestFormat({
                        industry: resumeData.industry || 'tech',
                        experienceLevel: item.id,
                        targetRegion: resumeData.targetRegion || 'us',
                        showPhoto: resumeData.showPhoto,
                        jobTitle: resumeData.personal?.title || ''
                      });
                      setSelectedTemplate(rec.templateId);
                    }}
                    className={`w-full text-left p-2.5 rounded-lg text-xs font-medium border transition-all ${
                      resumeData.experienceLevel === item.id 
                        ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm' 
                        : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Target Region */}
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-2">
                Primary Target Job Market
              </label>
              <div className="space-y-2">
                {[
                  { id: 'us', label: 'USA & Canada (Strict ATS)' },
                  { id: 'eu', label: 'Europe & UK (Modern / Europass)' },
                  { id: 'global', label: 'Global Remote & Creative' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setResumeData(prev => ({ ...prev, targetRegion: item.id }));
                      const rec = determineBestFormat({
                        industry: resumeData.industry || 'tech',
                        experienceLevel: resumeData.experienceLevel || 'mid',
                        targetRegion: item.id,
                        showPhoto: resumeData.showPhoto,
                        jobTitle: resumeData.personal?.title || ''
                      });
                      setSelectedTemplate(rec.templateId);
                    }}
                    className={`w-full text-left p-2.5 rounded-lg text-xs font-medium border transition-all ${
                      resumeData.targetRegion === item.id 
                        ? 'bg-teal-600 text-white border-teal-500 shadow-sm' 
                        : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Determination Card */}
          <div className="p-5 rounded-xl bg-gradient-to-br from-slate-800 to-slate-850 border border-blue-500/30 shadow-lg">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-700">
              <div>
                <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Algorithm Match Result
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  Recommended Format: <span className="text-blue-400">{currentRecommendation.template.name}</span>
                </h3>
              </div>
              <div className="px-3 py-1.5 rounded-full bg-blue-500/20 text-blue-300 font-bold text-xs border border-blue-500/30">
                {currentRecommendation.confidence}% Match Confidence
              </div>
            </div>

            <div className="mt-3.5 text-xs text-slate-300 space-y-2">
              <p className="font-semibold text-slate-200">
                Why this format suits your profile:
              </p>
              <ul className="space-y-1.5 pl-4 list-disc text-slate-300">
                {currentRecommendation.reasons.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
              {currentRecommendation.photoAdvice && (
                <p className="text-[11px] text-amber-300/90 pt-1">
                  <strong>Photo Recommendation:</strong> {currentRecommendation.photoAdvice}
                </p>
              )}
            </div>

            {/* Template Selector Pill */}
            <div className="mt-4 pt-3 border-t border-slate-700/80 flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs text-slate-400">Selected architecture for your resume:</span>
              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={selectedTemplate}
                  onChange={(e) => setSelectedTemplate(e.target.value)}
                  className="bg-slate-800 border border-slate-600 text-slate-100 text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:border-blue-500 font-semibold shadow-sm"
                >
                  {TEMPLATES_CATALOG.map(tpl => (
                    <option key={tpl.id} value={tpl.id}>
                      {tpl.name} — {tpl.tagline.slice(0, 40)}...
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 4: Executive Summary */}
      {currentStep === 4 && (
        <div className="space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Phase 4: The Elevator Pitch</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">Professional Summary & Value Proposition</h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Recruiters scan a resume in 6 seconds. Your summary anchors their attention with your highest-impact achievements.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                <span>AI Tone Presets (Click to generate draft)</span>
              </label>
              <span className="text-[11px] text-slate-400">
                Word Count: {(resumeData.summary || '').split(/\s+/).filter(Boolean).length} words (Sweet spot: 35-70)
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => applySummaryTemplate('impact')}
                className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-200 transition-colors text-left"
              >
                <div className="font-bold text-blue-400">⚡ Impact-Driven</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Metrics, ROI & Scale</div>
              </button>

              <button
                onClick={() => applySummaryTemplate('leadership')}
                className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-200 transition-colors text-left"
              >
                <div className="font-bold text-indigo-400">🏛 Leadership & Exec</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Team & Governance</div>
              </button>

              <button
                onClick={() => applySummaryTemplate('tech')}
                className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-200 transition-colors text-left"
              >
                <div className="font-bold text-emerald-400">💻 Tech & Architect</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Systems & Engineering</div>
              </button>

              <button
                onClick={() => applySummaryTemplate('student')}
                className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-200 transition-colors text-left"
              >
                <div className="font-bold text-teal-400">🌱 Early Career</div>
                <div className="text-[10px] text-slate-400 mt-0.5">High Potential & Ambition</div>
              </button>
            </div>

            <textarea
              rows={5}
              value={resumeData.summary || ''}
              onChange={(e) => setResumeData(prev => ({ ...prev, summary: e.target.value }))}
              placeholder="e.g. Dynamic Software Engineer with 6+ years experience architecting resilient distributed systems..."
              className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 text-sm text-slate-100 focus:outline-none focus:border-blue-500 leading-relaxed transition-colors"
            />
          </div>
        </div>
      )}

      {/* STEP 5: Work Experience & XYZ Bullets */}
      {currentStep === 5 && (
        <div className="space-y-6">
          <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Phase 5: Employment & Impact</span>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">Work History & Accomplishments</h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Use Google's XYZ formula: <strong className="text-blue-400">Accomplished [X] as measured by [Y] by doing [Z]</strong>.
              </p>
            </div>
            <button
              onClick={addExperienceItem}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors shadow-sm self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Add Position</span>
            </button>
          </div>

          {/* Quick Action Verb helper bar */}
          <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
            <span className="text-[11px] font-bold text-slate-300 block mb-1.5">
              High-Impact Power Verbs:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {ACTION_VERBS.map(verb => (
                <span key={verb} className="text-[10px] px-2 py-0.5 rounded bg-slate-700/80 text-blue-300 font-mono">
                  {verb}
                </span>
              ))}
            </div>
          </div>

          {/* Experience List */}
          <div className="space-y-6">
            {(resumeData.experience || []).map((exp, expIdx) => (
              <div key={exp.id} className="p-4 sm:p-5 rounded-xl bg-slate-800/80 border border-slate-700 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                    Role #{expIdx + 1}
                  </span>
                  <button
                    onClick={() => removeExperienceItem(exp.id)}
                    className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Job Title</label>
                    <input 
                      type="text" 
                      value={exp.title || ''}
                      onChange={(e) => updateExperienceItem(exp.id, 'title', e.target.value)}
                      placeholder="e.g. Senior Software Engineer"
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Company / Organization</label>
                    <input 
                      type="text" 
                      value={exp.company || ''}
                      onChange={(e) => updateExperienceItem(exp.id, 'company', e.target.value)}
                      placeholder="e.g. Acme Corp"
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Location</label>
                    <input 
                      type="text" 
                      value={exp.location || ''}
                      onChange={(e) => updateExperienceItem(exp.id, 'location', e.target.value)}
                      placeholder="e.g. San Francisco, CA"
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Start Date</label>
                      <input 
                        type="text" 
                        value={exp.startDate || ''}
                        onChange={(e) => updateExperienceItem(exp.id, 'startDate', e.target.value)}
                        placeholder="e.g. 2021-03"
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">End Date</label>
                      <input 
                        type="text" 
                        value={exp.current ? 'Present' : exp.endDate || ''}
                        disabled={exp.current}
                        onChange={(e) => updateExperienceItem(exp.id, 'endDate', e.target.value)}
                        placeholder="e.g. 2023-10"
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500 disabled:opacity-50"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300 select-none">
                    <input 
                      type="checkbox"
                      checked={exp.current || false}
                      onChange={(e) => updateExperienceItem(exp.id, 'current', e.target.checked)}
                      className="rounded bg-slate-800 border-slate-600 text-blue-600 focus:ring-blue-500"
                    />
                    <span>I currently work here</span>
                  </label>
                </div>

                {/* Bullets */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-200">
                      Impact Bullets & Key Results:
                    </span>
                    <button
                      onClick={() => addHighlightBullet(exp.id)}
                      className="text-[11px] text-blue-400 hover:underline flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add Bullet</span>
                    </button>
                  </div>

                  {(exp.highlights || []).map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-2">
                      <span className="text-blue-400 mt-2 font-bold">•</span>
                      <textarea
                        rows={2}
                        value={bullet}
                        onChange={(e) => updateHighlightBullet(exp.id, bIdx, e.target.value)}
                        placeholder="e.g. Spearheaded migration of billing service to Go, reducing 99th-percentile response latency by 58%..."
                        className="flex-1 p-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                      />
                      <button
                        onClick={() => removeHighlightBullet(exp.id, bIdx)}
                        className="p-1 text-slate-500 hover:text-red-400 mt-2 transition-colors"
                        title="Delete bullet"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 6: Skills */}
      {currentStep === 6 && (
        <div className="space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Phase 6: Keyword Optimization</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">Core Skills & Technologies</h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              ATS screening systems scan your resume for keyword matches. Group skills into meaningful clusters.
            </p>
          </div>

          <div className="space-y-4">
            {(resumeData.skills || []).map((skillGroup, gIdx) => (
              <div key={gIdx} className="p-4 rounded-xl bg-slate-800 border border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <input
                    type="text"
                    value={skillGroup.category}
                    onChange={(e) => {
                      const newSkills = [...resumeData.skills];
                      newSkills[gIdx].category = e.target.value;
                      setResumeData(prev => ({ ...prev, skills: newSkills }));
                    }}
                    placeholder="Category (e.g. Languages, Cloud, Frameworks)"
                    className="bg-transparent font-bold text-white text-sm focus:outline-none border-b border-dashed border-slate-600 focus:border-blue-500 pb-0.5"
                  />
                  <button
                    onClick={() => {
                      const newSkills = resumeData.skills.filter((_, i) => i !== gIdx);
                      setResumeData(prev => ({ ...prev, skills: newSkills }));
                    }}
                    className="text-xs text-red-400 hover:text-red-300"
                  >
                    Delete Category
                  </button>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Skills (comma-separated):</label>
                  <input
                    type="text"
                    value={Array.isArray(skillGroup.items) ? skillGroup.items.join(', ') : skillGroup.items}
                    onChange={(e) => {
                      const newSkills = [...resumeData.skills];
                      newSkills[gIdx].items = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                      setResumeData(prev => ({ ...prev, skills: newSkills }));
                    }}
                    placeholder="React, TypeScript, Go, Node.js, PostgreSQL"
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            ))}

            <button
              onClick={() => {
                setResumeData(prev => ({
                  ...prev,
                  skills: [...(prev.skills || []), { category: 'Tools & Technologies', items: ['Docker', 'Git', 'Agile'] }]
                }));
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-blue-400 text-xs font-semibold border border-slate-700"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Skill Category</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 7: Education */}
      {currentStep === 7 && (
        <div className="space-y-6">
          <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Phase 7: Academic Background</span>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">Education & Degrees</h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                University degrees, certifications, coursework, or academic distinctions.
              </p>
            </div>
            <button
              onClick={() => {
                const newEdu = {
                  id: `edu-${Date.now()}`,
                  degree: '',
                  school: '',
                  location: '',
                  gradYear: '',
                  gpa: '',
                  details: ''
                };
                setResumeData(prev => ({
                  ...prev,
                  education: [...(prev.education || []), newEdu]
                }));
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Add Degree</span>
            </button>
          </div>

          <div className="space-y-4">
            {(resumeData.education || []).map((edu, eIdx) => (
              <div key={edu.id} className="p-4 rounded-xl bg-slate-800 border border-slate-700 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                  <span className="text-xs font-bold text-blue-400">Degree #{eIdx + 1}</span>
                  <button
                    onClick={() => {
                      setResumeData(prev => ({
                        ...prev,
                        education: prev.education.filter(e => e.id !== edu.id)
                      }));
                    }}
                    className="text-xs text-red-400 hover:text-red-300"
                  >
                    Remove
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Degree & Major</label>
                    <input 
                      type="text" 
                      value={edu.degree || ''}
                      onChange={(e) => {
                        const updated = resumeData.education.map(item => item.id === edu.id ? { ...item, degree: e.target.value } : item);
                        setResumeData(prev => ({ ...prev, education: updated }));
                      }}
                      placeholder="e.g. B.S. in Computer Science"
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">School / University</label>
                    <input 
                      type="text" 
                      value={edu.school || ''}
                      onChange={(e) => {
                        const updated = resumeData.education.map(item => item.id === edu.id ? { ...item, school: e.target.value } : item);
                        setResumeData(prev => ({ ...prev, education: updated }));
                      }}
                      placeholder="e.g. University of California, Berkeley"
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Graduation Year</label>
                    <input 
                      type="text" 
                      value={edu.gradYear || ''}
                      onChange={(e) => {
                        const updated = resumeData.education.map(item => item.id === edu.id ? { ...item, gradYear: e.target.value } : item);
                        setResumeData(prev => ({ ...prev, education: updated }));
                      }}
                      placeholder="e.g. 2022"
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">GPA / Honors (optional)</label>
                    <input 
                      type="text" 
                      value={edu.gpa || ''}
                      onChange={(e) => {
                        const updated = resumeData.education.map(item => item.id === edu.id ? { ...item, gpa: e.target.value } : item);
                        setResumeData(prev => ({ ...prev, education: updated }));
                      }}
                      placeholder="e.g. 3.8 / 4.0 (Magna Cum Laude)"
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Honors / Relevant Coursework</label>
                  <input 
                    type="text" 
                    value={edu.details || ''}
                    onChange={(e) => {
                      const updated = resumeData.education.map(item => item.id === edu.id ? { ...item, details: e.target.value } : item);
                      setResumeData(prev => ({ ...prev, education: updated }));
                    }}
                    placeholder="e.g. Dean's List, Distributed Systems, Algorithms, Machine Learning"
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 8: Projects */}
      {currentStep === 8 && (
        <div className="space-y-6">
          <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Phase 8: Practical Proof</span>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">Featured Projects & Portfolio</h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Showcase tangible products, open-source repositories, or business initiatives.
              </p>
            </div>
            <button
              onClick={() => {
                const newProj = {
                  id: `proj-${Date.now()}`,
                  name: '',
                  link: '',
                  tech: '',
                  description: ''
                };
                setResumeData(prev => ({
                  ...prev,
                  projects: [...(prev.projects || []), newProj]
                }));
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Add Project</span>
            </button>
          </div>

          <div className="space-y-4">
            {(resumeData.projects || []).map((proj, pIdx) => (
              <div key={proj.id} className="p-4 rounded-xl bg-slate-800 border border-slate-700 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                  <span className="text-xs font-bold text-blue-400">Project #{pIdx + 1}</span>
                  <button
                    onClick={() => {
                      setResumeData(prev => ({
                        ...prev,
                        projects: prev.projects.filter(p => p.id !== proj.id)
                      }));
                    }}
                    className="text-xs text-red-400 hover:text-red-300"
                  >
                    Remove
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Project Name</label>
                    <input 
                      type="text" 
                      value={proj.name || ''}
                      onChange={(e) => {
                        const updated = resumeData.projects.map(p => p.id === proj.id ? { ...p, name: e.target.value } : p);
                        setResumeData(prev => ({ ...prev, projects: updated }));
                      }}
                      placeholder="e.g. Distributed Task Scheduler"
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Live URL or GitHub Repo</label>
                    <input 
                      type="text" 
                      value={proj.link || ''}
                      onChange={(e) => {
                        const updated = resumeData.projects.map(p => p.id === proj.id ? { ...p, link: e.target.value } : p);
                        setResumeData(prev => ({ ...prev, projects: updated }));
                      }}
                      placeholder="e.g. github.com/user/project"
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Tech Stack / Tools Used</label>
                  <input 
                    type="text" 
                    value={proj.tech || ''}
                    onChange={(e) => {
                      const updated = resumeData.projects.map(p => p.id === proj.id ? { ...p, tech: e.target.value } : p);
                      setResumeData(prev => ({ ...prev, projects: updated }));
                    }}
                    placeholder="e.g. Next.js, Go, PostgreSQL, Redis, Docker"
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Impact / What it does</label>
                  <textarea 
                    rows={2}
                    value={proj.description || ''}
                    onChange={(e) => {
                      const updated = resumeData.projects.map(p => p.id === proj.id ? { ...p, description: e.target.value } : p);
                      setResumeData(prev => ({ ...prev, projects: updated }));
                    }}
                    placeholder="e.g. High-throughput distributed background scheduler handling 25,000+ jobs/second with raft consensus..."
                    className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 9: Certifications & Languages */}
      {currentStep === 9 && (
        <div className="space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Phase 9: Certifications & Languages</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">Credentials & Global Fluency</h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Industry certifications (AWS, PMP, CPA) and multilingual capabilities.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Certifications */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white uppercase tracking-wider">Certifications</span>
                <button
                  onClick={() => {
                    const newCert = { id: `cert-${Date.now()}`, name: '', issuer: '', year: '' };
                    setResumeData(prev => ({ ...prev, certifications: [...(prev.certifications || []), newCert] }));
                  }}
                  className="text-xs text-blue-400 hover:underline flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add</span>
                </button>
              </div>

              {(resumeData.certifications || []).map(cert => (
                <div key={cert.id} className="p-3 rounded-lg bg-slate-800 border border-slate-700 space-y-2">
                  <div className="flex justify-between items-center">
                    <input
                      type="text"
                      value={cert.name}
                      onChange={(e) => {
                        const updated = resumeData.certifications.map(c => c.id === cert.id ? { ...c, name: e.target.value } : c);
                        setResumeData(prev => ({ ...prev, certifications: updated }));
                      }}
                      placeholder="e.g. AWS Certified Solutions Architect"
                      className="bg-transparent text-xs font-semibold text-white focus:outline-none w-full"
                    />
                    <button
                      onClick={() => setResumeData(prev => ({ ...prev, certifications: prev.certifications.filter(c => c.id !== cert.id) }))}
                      className="text-red-400 hover:text-red-300 ml-2"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <input
                      type="text"
                      value={cert.issuer}
                      onChange={(e) => {
                        const updated = resumeData.certifications.map(c => c.id === cert.id ? { ...c, issuer: e.target.value } : c);
                        setResumeData(prev => ({ ...prev, certifications: updated }));
                      }}
                      placeholder="Issuer (e.g. Amazon)"
                      className="p-1.5 rounded bg-slate-900 border border-slate-700 text-[11px] text-slate-200"
                    />
                    <input
                      type="text"
                      value={cert.year}
                      onChange={(e) => {
                        const updated = resumeData.certifications.map(c => c.id === cert.id ? { ...c, year: e.target.value } : c);
                        setResumeData(prev => ({ ...prev, certifications: updated }));
                      }}
                      placeholder="Year (e.g. 2023)"
                      className="p-1.5 rounded bg-slate-900 border border-slate-700 text-[11px] text-slate-200"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Languages */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white uppercase tracking-wider">Languages</span>
                <button
                  onClick={() => {
                    const newLang = { language: '', proficiency: 'Fluent / Full Professional' };
                    setResumeData(prev => ({ ...prev, languages: [...(prev.languages || []), newLang] }));
                  }}
                  className="text-xs text-blue-400 hover:underline flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add</span>
                </button>
              </div>

              {(resumeData.languages || []).map((lang, lIdx) => (
                <div key={lIdx} className="p-3 rounded-lg bg-slate-800 border border-slate-700 flex items-center gap-2">
                  <input
                    type="text"
                    value={lang.language}
                    onChange={(e) => {
                      const updated = [...resumeData.languages];
                      updated[lIdx].language = e.target.value;
                      setResumeData(prev => ({ ...prev, languages: updated }));
                    }}
                    placeholder="e.g. English, French, Spanish"
                    className="flex-1 p-1.5 rounded bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none"
                  />
                  <input
                    type="text"
                    value={lang.proficiency}
                    onChange={(e) => {
                      const updated = [...resumeData.languages];
                      updated[lIdx].proficiency = e.target.value;
                      setResumeData(prev => ({ ...prev, languages: updated }));
                    }}
                    placeholder="e.g. Native or C1"
                    className="w-32 p-1.5 rounded bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none"
                  />
                  <button
                    onClick={() => {
                      const updated = resumeData.languages.filter((_, i) => i !== lIdx);
                      setResumeData(prev => ({ ...prev, languages: updated }));
                    }}
                    className="text-red-400 hover:text-red-300 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* STEP 10: Suitability Report & Complete */}
      {currentStep === 10 && (
        <div className="space-y-6 text-center py-6">
          <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto border border-emerald-500/20 shadow-inner">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Interview Complete! Your Resume Is Ready
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-xl mx-auto">
              We have compiled your data, calibrated your target keywords, and tailored the layout using the optimal format.
            </p>
          </div>

          {/* Architecture Summary */}
          <div className="p-5 rounded-xl bg-slate-800/80 border border-slate-700 max-w-xl mx-auto text-left space-y-3">
            <div className="flex justify-between items-center border-b border-slate-700 pb-2">
              <span className="text-xs font-semibold text-slate-400">Chosen Template Architecture:</span>
              <span className="text-xs font-bold text-blue-400">{currentRecommendation.template.name}</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-700 pb-2">
              <span className="text-xs font-semibold text-slate-400">Photo Display:</span>
              <span className="text-xs font-bold text-slate-200">
                {resumeData.showPhoto ? `Enabled (${resumeData.photoShape})` : 'Hidden (ATS Single-Column standard)'}
              </span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-700 pb-2">
              <span className="text-xs font-semibold text-slate-400">Recorded Positions:</span>
              <span className="text-xs font-bold text-slate-200">{(resumeData.experience || []).length} Roles</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-slate-400">Skill Categories:</span>
              <span className="text-xs font-bold text-slate-200">{(resumeData.skills || []).length} Categories</span>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onComplete}
              className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-blue-500/25 transition-all"
            >
              Open Full Studio & Live Preview
            </button>
            <button
              onClick={() => setCurrentStep(1)}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs border border-slate-700 transition-colors"
            >
              Review / Re-interview Answers
            </button>
          </div>
        </div>
      )}

      {/* Navigation Footer */}
      {currentStep > 0 && currentStep < steps.length - 1 && (
        <div className="flex items-center justify-between pt-6 border-t border-slate-800 mt-6">
          <button
            onClick={prevStep}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous</span>
          </button>

          <button
            onClick={nextStep}
            className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all group"
          >
            <span>Next: {steps[currentStep + 1]?.label.split(' ')[0]}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      )}
    </div>
  );
}
