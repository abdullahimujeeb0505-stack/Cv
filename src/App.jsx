import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import InterviewWizard from './components/InterviewWizard';
import FormEditor from './components/FormEditor';
import ResumePreview from './components/ResumePreview';
import Footer from './components/Footer';
import ATSScoreModal from './components/ATSScoreModal';
import TemplateCatalogModal from './components/TemplateCatalogModal';
import { SAMPLE_PROFILES, TEMPLATES_CATALOG } from './data/defaultData';
import { Eye, EyeOff, Sparkles, Sliders, CheckCircle } from 'lucide-react';

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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-blue-600 text-white px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-semibold animate-bounce">
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
        onLoadSample={handleLoadSample}
        onResetData={handleReset}
        onExportJSON={handleExportJSON}
        onImportJSON={handleImportJSON}
        resumeData={resumeData}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto p-3 sm:p-6">
        {/* INTERVIEW MODE */}
        {activeMode === 'interview' ? (
          <div className="space-y-6">
            {/* Top Interview Banner & Live Preview Toggle */}
            <div className="no-print flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900/60 border border-slate-800/80 rounded-xl p-3 px-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-xs font-semibold text-slate-300">
                  Interactive Interview Active — answers dynamically generate your resume
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowLivePreviewInInterview(!showLivePreviewInInterview)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 transition-colors"
                >
                  {showLivePreviewInInterview ? (
                    <>
                      <EyeOff className="w-3.5 h-3.5 text-blue-400" />
                      <span>Hide Side Preview</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-3.5 h-3.5 text-blue-400" />
                      <span>Show Live Side Preview</span>
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
        ) : (
          /* VISUAL STUDIO MODE (Split Left Form, Right Live Canvas) */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Form Editor */}
            <div className="lg:col-span-5 xl:col-span-4 h-[calc(100vh-100px)] overflow-y-auto pr-1 pb-10">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-blue-400" />
                    <span>Visual Studio Editor</span>
                  </h2>
                  <p className="text-xs text-slate-400">Directly modify any section or add custom bullet points</p>
                </div>
                <button
                  onClick={() => setActiveMode('interview')}
                  className="text-xs text-blue-400 hover:text-blue-300 font-semibold"
                >
                  &larr; Return to Interview
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
    </div>
  );
}
