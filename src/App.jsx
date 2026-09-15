import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import InterviewWizard from './components/InterviewWizard';
import FormEditor from './components/FormEditor';
import ResumePreview from './components/ResumePreview';
import Footer from './components/Footer';
import ATSScoreModal from './components/ATSScoreModal';
import TemplateCatalogModal from './components/TemplateCatalogModal';
import JobMatcherModal from './components/JobMatcherModal';
import BulletPolishModal from './components/BulletPolishModal';
import { SAMPLE_PROFILES, TEMPLATES_CATALOG } from './data/defaultData';
import { calculateATSScore } from './data/recommendationEngine';
import { 
  Eye, EyeOff, Sparkles, Sliders, CheckCircle, Target, 
  Wand2, Layout, Clock, FileCheck, Layers, ArrowUpRight,
  ShieldCheck, Zap
} from 'lucide-react';

const STORAGE_KEY = 'universal_resume_data_v1';
const TEMPLATE_KEY = 'universal_resume_template_v1';

export default function App() {
  // Initialize resume state from LocalStorage or default sample
  const [resumeData, setResumeData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load saved resume', e);
    }
    return SAMPLE_PROFILES.tech.data;
  });

  const [selectedTemplate, setSelectedTemplate] = useState(() => {
    try {
      const savedTpl = localStorage.getItem(TEMPLATE_KEY);
      if (savedTpl) return savedTpl;
    } catch (e) {}
    return 'modern-ats';
  });

  const [themeColor, setThemeColor] = useState('blue');
  const [fontOption, setFontOption] = useState('sans');
  const [paperSize, setPaperSize] = useState('letter');
  const [orientation, setOrientation] = useState(() => {
    try {
      const savedOr = localStorage.getItem('universal_resume_orientation_v1');
      if (savedOr) return savedOr;
    } catch (e) {}
    return 'portrait';
  });

  const [activeMode, setActiveMode] = useState('interview'); // 'interview' | 'editor' | 'canvas'
  const [showLivePreviewInInterview, setShowLivePreviewInInterview] = useState(true);

  // Modals
  const [isTemplatesModalOpen, setIsTemplatesModalOpen] = useState(false);
  const [isATSModalOpen, setIsATSModalOpen] = useState(false);
  const [isJobMatcherOpen, setIsJobMatcherOpen] = useState(false);
  const [isBulletPolisherOpen, setIsBulletPolisherOpen] = useState(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3200);
  };

  // Sync with LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(resumeData));
    } catch (e) {}
  }, [resumeData]);

  useEffect(() => {
    try {
      localStorage.setItem(TEMPLATE_KEY, selectedTemplate);
    } catch (e) {}
  }, [selectedTemplate]);

  useEffect(() => {
    try {
      localStorage.setItem('universal_resume_orientation_v1', orientation);
    } catch (e) {}
  }, [orientation]);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Check for Ctrl/Cmd modifier
      if (e.metaKey || e.ctrlKey) {
        if (e.key === 'k' || e.key === 'K') {
          e.preventDefault();
          setIsTemplatesModalOpen(prev => !prev);
        } else if (e.key === 'j' || e.key === 'J') {
          e.preventDefault();
          setIsJobMatcherOpen(prev => !prev);
        } else if (e.key === 'b' || e.key === 'B') {
          e.preventDefault();
          setIsBulletPolisherOpen(prev => !prev);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Load sample preset
  const handleLoadSample = (sampleData) => {
    setResumeData(sampleData);
    if (sampleData.recommendedTemplate) {
      setSelectedTemplate(sampleData.recommendedTemplate);
    }
    showToast(`Loaded "${sampleData.personal.title || 'Sample Profile'}"!`);
  };

  // Reset to blank template
  const handleReset = () => {
    if (window.confirm('Are you sure you want to start fresh with a blank resume?')) {
      const blank = {
        photo: '',
        showPhoto: false,
        photoShape: 'circle',
        personal: {
          fullName: '',
          title: '',
          email: '',
          phone: '',
          location: '',
          linkedin: '',
          github: '',
          website: ''
        },
        industry: 'tech',
        experienceLevel: 'mid',
        targetRegion: 'us',
        summary: '',
        experience: [
          {
            id: `exp-${Date.now()}`,
            title: '',
            company: '',
            location: '',
            startDate: '',
            endDate: '',
            current: true,
            highlights: ['']
          }
        ],
        education: [
          {
            id: `edu-${Date.now()}`,
            degree: '',
            school: '',
            location: '',
            gradYear: '',
            gpa: '',
            details: ''
          }
        ],
        skills: [
          { category: 'Core Competencies', items: [] }
        ],
        projects: [],
        certifications: [],
        languages: []
      };
      setResumeData(blank);
      showToast('Resume reset to blank!');
    }
  };

  // Export to JSON
  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(resumeData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `resume-${(resumeData.personal.fullName || 'export').toLowerCase().replace(/\s+/g, '-')}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Exported resume JSON backup!');
  };

  // Import from JSON
  const handleImportJSON = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target.result);
          if (parsed.personal) {
            setResumeData(parsed);
            if (parsed.recommendedTemplate) setSelectedTemplate(parsed.recommendedTemplate);
            showToast('Resume data imported successfully!');
          } else {
            alert('Invalid resume JSON format.');
          }
        } catch (err) {
          alert('Could not parse JSON file.');
        }
      };
      reader.readAsText(file);
    }
  };

  const currentTemplateObj = TEMPLATES_CATALOG.find(t => t.id === selectedTemplate) || TEMPLATES_CATALOG[0];
  const atsScore = calculateATSScore(resumeData).score;

  return (
    <div className="min-h-screen mesh-bg text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-2 text-xs font-bold animate-bounce ring-1 ring-white/20">
          <CheckCircle className="w-4 h-4 text-emerald-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Floating Glass Navigation Header */}
      <Navbar
        activeMode={activeMode}
        setActiveMode={setActiveMode}
        selectedTemplate={selectedTemplate}
        setSelectedTemplate={setSelectedTemplate}
        onOpenTemplatesModal={() => setIsTemplatesModalOpen(true)}
        onOpenATSModal={() => setIsATSModalOpen(true)}
        onOpenJobMatcher={() => setIsJobMatcherOpen(true)}
        onOpenBulletPolisher={() => setIsBulletPolisherOpen(true)}
        onLoadSample={handleLoadSample}
        onResetData={handleReset}
        onExportJSON={handleExportJSON}
        onImportJSON={handleImportJSON}
        resumeData={resumeData}
      />

      {/* Modern Top Quick Status & Actions Bar */}
      <div className="no-print max-w-[1700px] w-full mx-auto px-3 sm:px-6 pt-3">
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-2.5 px-4 flex flex-wrap items-center justify-between gap-3 shadow-sm">
          {/* Left: Active Architecture & Live Status */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsTemplatesModalOpen(true)}
              className="flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-950/80 hover:bg-slate-800 border border-slate-800 text-xs text-slate-200 transition-all group"
            >
              <span className="w-2 h-2 rounded-full shadow-sm" style={{ backgroundColor: currentTemplateObj.accentColor }}></span>
              <span className="font-bold text-white group-hover:text-blue-400 transition-colors">{currentTemplateObj.name}</span>
              <span className="text-[10px] text-slate-500 font-mono">({orientation.toUpperCase()})</span>
              <ArrowUpRight className="w-3 h-3 text-slate-500 group-hover:text-blue-400 transition-colors" />
            </button>

            <span className="h-4 w-px bg-slate-800 hidden sm:block"></span>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-slate-300 font-medium">ATS Score:</span>
              <span className={`font-black ${atsScore >= 80 ? 'text-emerald-400' : 'text-amber-400'}`}>{atsScore}%</span>
            </div>
          </div>

          {/* Right: Quick Launch AI Tools */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsJobMatcherOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/50 text-emerald-300 border border-emerald-500/30 text-xs font-bold transition-all shadow-sm"
              title="Compare with Target Job Description"
            >
              <Target className="w-3.5 h-3.5 text-emerald-400" />
              <span>Job Scanner</span>
            </button>

            <button
              onClick={() => setIsBulletPolisherOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-purple-950/40 hover:bg-purple-900/50 text-purple-300 border border-purple-500/30 text-xs font-bold transition-all shadow-sm"
              title="Enhance experience bullets with power action verbs"
            >
              <Wand2 className="w-3.5 h-3.5 text-purple-400" />
              <span>Bullet Polish</span>
            </button>

            {activeMode === 'interview' && (
              <button
                onClick={() => setShowLivePreviewInInterview(!showLivePreviewInInterview)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-950/80 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-medium transition-colors"
              >
                {showLivePreviewInInterview ? (
                  <>
                    <EyeOff className="w-3.5 h-3.5 text-blue-400" />
                    <span className="hidden sm:inline">Hide Preview</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-3.5 h-3.5 text-blue-400" />
                    <span className="hidden sm:inline">Split Preview</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Workspace Area */}
      <main className="flex-1 max-w-[1700px] w-full mx-auto p-3 sm:p-6">
        {/* MODE 1: INTERVIEW WIZARD */}
        {activeMode === 'interview' && (
          <div className="space-y-6">
            <div className={`grid grid-cols-1 ${showLivePreviewInInterview ? 'xl:grid-cols-12' : ''} gap-6 items-start`}>
              <div className={`${showLivePreviewInInterview ? 'xl:col-span-6 2xl:col-span-5' : 'max-w-4xl mx-auto w-full'}`}>
                <InterviewWizard
                  resumeData={resumeData}
                  setResumeData={setResumeData}
                  selectedTemplate={selectedTemplate}
                  setSelectedTemplate={setSelectedTemplate}
                  onComplete={() => setActiveMode('editor')}
                />
              </div>

              {showLivePreviewInInterview && (
                <div className="xl:col-span-6 2xl:col-span-7 sticky top-20 h-[calc(100vh-120px)] flex flex-col">
                  <ResumePreview
                    resumeData={resumeData}
                    selectedTemplate={selectedTemplate}
                    themeColor={themeColor}
                    setThemeColor={setThemeColor}
                    fontOption={fontOption}
                    setFontOption={setFontOption}
                    paperSize={paperSize}
                    setPaperSize={setPaperSize}
                    orientation={orientation}
                    setOrientation={setOrientation}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* MODE 2: VISUAL STUDIO EDITOR */}
        {activeMode === 'editor' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Form Editor */}
            <div className="lg:col-span-5 xl:col-span-4 h-[calc(100vh-120px)] overflow-y-auto pr-1 pb-10">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-extrabold text-white flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-blue-400" />
                    <span>Visual Studio Editor</span>
                  </h2>
                  <p className="text-xs text-slate-400">Directly modify any section or add custom bullet points</p>
                </div>
                <button
                  onClick={() => setActiveMode('interview')}
                  className="text-xs text-blue-400 hover:text-blue-300 font-bold"
                >
                  &larr; Interview Mode
                </button>
              </div>

              <FormEditor
                resumeData={resumeData}
                setResumeData={setResumeData}
              />
            </div>

            {/* Right Column: Live Resume Canvas */}
            <div className="lg:col-span-7 xl:col-span-8 sticky top-20 h-[calc(100vh-120px)] flex flex-col">
              <ResumePreview
                resumeData={resumeData}
                selectedTemplate={selectedTemplate}
                themeColor={themeColor}
                setThemeColor={setThemeColor}
                fontOption={fontOption}
                setFontOption={setFontOption}
                paperSize={paperSize}
                setPaperSize={setPaperSize}
                orientation={orientation}
                setOrientation={setOrientation}
              />
            </div>
          </div>
        )}

        {/* MODE 3: FULL ZEN CANVAS */}
        {activeMode === 'canvas' && (
          <div className="max-w-6xl mx-auto h-[calc(100vh-120px)] flex flex-col">
            <ResumePreview
              resumeData={resumeData}
              selectedTemplate={selectedTemplate}
              themeColor={themeColor}
              setThemeColor={setThemeColor}
              fontOption={fontOption}
              setFontOption={setFontOption}
              paperSize={paperSize}
              setPaperSize={setPaperSize}
              orientation={orientation}
              setOrientation={setOrientation}
            />
          </div>
        )}
      </main>

      {/* Standard Application Footer with Great_mujey attribution */}
      <Footer 
        onOpenTemplatesModal={() => setIsTemplatesModalOpen(true)}
        onOpenJobMatcher={() => setIsJobMatcherOpen(true)}
      />

      {/* ATS Compatibility Modal */}
      <ATSScoreModal
        isOpen={isATSModalOpen}
        onClose={() => setIsATSModalOpen(false)}
        resumeData={resumeData}
      />

      {/* Template Catalog Modal (Design Gallery 22) */}
      <TemplateCatalogModal
        isOpen={isTemplatesModalOpen}
        onClose={() => setIsTemplatesModalOpen(false)}
        selectedTemplate={selectedTemplate}
        onSelectTemplate={(tplId) => {
          setSelectedTemplate(tplId);
          if (tplId === 'landscape-executive-slide') {
            setOrientation('landscape');
          }
          showToast(`Switched format to "${TEMPLATES_CATALOG.find(t => t.id === tplId)?.name}"`);
        }}
      />

      {/* AI Job Description Matcher Modal */}
      <JobMatcherModal
        isOpen={isJobMatcherOpen}
        onClose={() => setIsJobMatcherOpen(false)}
        resumeData={resumeData}
        setResumeData={setResumeData}
        onShowToast={showToast}
      />

      {/* AI Bullet Point Polisher Modal */}
      <BulletPolishModal
        isOpen={isBulletPolisherOpen}
        onClose={() => setIsBulletPolisherOpen(false)}
        resumeData={resumeData}
        setResumeData={setResumeData}
        onShowToast={showToast}
      />
    </div>
  );
}
