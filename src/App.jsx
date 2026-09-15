import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import InterviewWizard from './components/InterviewWizard';
import FormEditor from './components/FormEditor';
import ResumePreview from './components/ResumePreview';
import Footer from './components/Footer';
import ATSScoreModal from './components/ATSScoreModal';
import TemplateCatalogModal from './components/TemplateCatalogModal';
import CoverLetterModal from './components/CoverLetterModal';
import CommandPaletteModal from './components/CommandPaletteModal';
import { SAMPLE_PROFILES, TEMPLATES_CATALOG } from './data/defaultData';
import { Eye, EyeOff, Sparkles, Sliders, CheckCircle, Command } from 'lucide-react';

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

  const [activeMode, setActiveMode] = useState('interview'); // 'interview' | 'editor'
  const [showLivePreviewInInterview, setShowLivePreviewInInterview] = useState(true);

  // Modals
  const [isTemplatesModalOpen, setIsTemplatesModalOpen] = useState(false);
  const [isATSModalOpen, setIsATSModalOpen] = useState(false);
  const [isCoverLetterOpen, setIsCoverLetterOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
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
      // Command / Ctrl + K -> Open Command Palette
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
      // Command / Ctrl + J -> Open ATS Modal
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'j') {
        e.preventDefault();
        setIsATSModalOpen(prev => !prev);
      }
      // Command / Ctrl + L -> Open Cover Letter
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'l') {
        e.preventDefault();
        setIsCoverLetterOpen(prev => !prev);
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

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-semibold animate-bounce border border-white/20">
          <CheckCircle className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation Header */}
      <Navbar
        activeMode={activeMode}
        setActiveMode={setActiveMode}
        selectedTemplate={selectedTemplate}
        setSelectedTemplate={setSelectedTemplate}
        onOpenTemplatesModal={() => setIsTemplatesModalOpen(true)}
        onOpenATSModal={() => setIsATSModalOpen(true)}
        onOpenCoverLetter={() => setIsCoverLetterOpen(true)}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onLoadSample={handleLoadSample}
        onResetData={handleReset}
        onExportJSON={handleExportJSON}
        onImportJSON={handleImportJSON}
        resumeData={resumeData}
      />

      {/* Main Content Area with Ambient Lighting */}
      <main className="flex-1 max-w-[1680px] w-full mx-auto p-3 sm:p-6 ambient-glow">
        {/* INTERVIEW MODE */}
        {activeMode === 'interview' ? (
          <div className="space-y-6">
            {/* Top Interview Banner & Live Preview Toggle */}
            <div className="no-print flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900/70 backdrop-blur-xl border border-white/10 rounded-2xl p-3.5 px-5 shadow-lg">
              <div className="flex items-center gap-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-semibold text-slate-200">
                  Interactive AI Career Consultant Active — responses dynamically generate ATS architecture
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsCommandPaletteOpen(true)}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 transition-colors border border-slate-700"
                >
                  <Command className="w-3.5 h-3.5 text-blue-400" />
                  <span>Command Center</span>
                  <kbd className="text-[10px] text-slate-400 font-mono">⌘K</kbd>
                </button>

                <button
                  onClick={() => setShowLivePreviewInInterview(!showLivePreviewInInterview)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 transition-colors border border-slate-700"
                >
                  {showLivePreviewInInterview ? (
                    <>
                      <EyeOff className="w-3.5 h-3.5 text-blue-400" />
                      <span>Hide Side Canvas</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-3.5 h-3.5 text-blue-400" />
                      <span>Show Live Canvas</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Split view or Centered view */}
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
                <div className="xl:col-span-6 2xl:col-span-7 sticky top-16 h-[calc(100vh-100px)] flex flex-col">
                  <ResumePreview
                    resumeData={resumeData}
                    selectedTemplate={selectedTemplate}
                    setSelectedTemplate={setSelectedTemplate}
                    themeColor={themeColor}
                    setThemeColor={setThemeColor}
                    fontOption={fontOption}
                    setFontOption={setFontOption}
                    paperSize={paperSize}
                    setPaperSize={setPaperSize}
                    orientation={orientation}
                    setOrientation={setOrientation}
                    onOpenTemplatesModal={() => setIsTemplatesModalOpen(true)}
                    onOpenCoverLetter={() => setIsCoverLetterOpen(true)}
                  />
                </div>
              )}
            </div>
          </div>
        ) : (
          /* VISUAL STUDIO MODE (Split Left Form, Right Live Canvas) */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Form Editor */}
            <div className="lg:col-span-5 xl:col-span-4 h-[calc(100vh-100px)] overflow-y-auto pr-1 pb-10">
              <div className="mb-4 flex items-center justify-between bg-slate-900/60 backdrop-blur-md p-3 rounded-2xl border border-white/10">
                <div>
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-blue-400" />
                    <span>Visual Studio Editor</span>
                  </h2>
                  <p className="text-xs text-slate-400">Directly modify any section or add custom bullet points</p>
                </div>
                <button
                  onClick={() => setActiveMode('interview')}
                  className="text-xs text-blue-400 hover:text-blue-300 font-semibold px-2.5 py-1 rounded-lg bg-blue-950/40 border border-blue-500/30"
                >
                  &larr; Interview
                </button>
              </div>

              <FormEditor
                resumeData={resumeData}
                setResumeData={setResumeData}
              />
            </div>

            {/* Right Column: Live Resume Canvas */}
            <div className="lg:col-span-7 xl:col-span-8 sticky top-16 h-[calc(100vh-100px)] flex flex-col">
              <ResumePreview
                resumeData={resumeData}
                selectedTemplate={selectedTemplate}
                setSelectedTemplate={setSelectedTemplate}
                themeColor={themeColor}
                setThemeColor={setThemeColor}
                fontOption={fontOption}
                setFontOption={setFontOption}
                paperSize={paperSize}
                setPaperSize={setPaperSize}
                orientation={orientation}
                setOrientation={setOrientation}
                onOpenTemplatesModal={() => setIsTemplatesModalOpen(true)}
                onOpenCoverLetter={() => setIsCoverLetterOpen(true)}
              />
            </div>
          </div>
        )}
      </main>

      {/* Standard Application Footer */}
      <Footer />

      {/* ATS Compatibility Modal */}
      <ATSScoreModal
        isOpen={isATSModalOpen}
        onClose={() => setIsATSModalOpen(false)}
        resumeData={resumeData}
      />

      {/* Template Catalog Modal */}
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

      {/* AI Matching Cover Letter Modal */}
      <CoverLetterModal
        isOpen={isCoverLetterOpen}
        onClose={() => setIsCoverLetterOpen(false)}
        resumeData={resumeData}
        themeColor={themeColor}
      />

      {/* Modern Command Palette Modal (⌘K) */}
      <CommandPaletteModal
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        activeMode={activeMode}
        setActiveMode={setActiveMode}
        selectedTemplate={selectedTemplate}
        setSelectedTemplate={setSelectedTemplate}
        onOpenTemplatesModal={() => { setIsCommandPaletteOpen(false); setIsTemplatesModalOpen(true); }}
        onOpenATSModal={() => { setIsCommandPaletteOpen(false); setIsATSModalOpen(true); }}
        onOpenCoverLetter={() => { setIsCommandPaletteOpen(false); setIsCoverLetterOpen(true); }}
        orientation={orientation}
        setOrientation={setOrientation}
        onPrint={handlePrint}
        onExportJSON={handleExportJSON}
      />
    </div>
  );
}
