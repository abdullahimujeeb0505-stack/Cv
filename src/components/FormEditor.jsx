import React, { useState } from 'react';
import { 
  User, Briefcase, GraduationCap, Wrench, FolderGit2, 
  Globe, Award, ChevronDown, ChevronUp, Plus, Trash2, 
  Upload, Sparkles, MoveUp, MoveDown, Camera
} from 'lucide-react';

export default function FormEditor({ resumeData, setResumeData }) {
  const [openSections, setOpenSections] = useState({
    pfp: true,
    personal: true,
    summary: false,
    experience: false,
    skills: false,
    education: false,
    projects: false,
    extras: false
  });

  const toggleSection = (key) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const updatePersonal = (field, val) => {
    setResumeData(prev => ({
      ...prev,
      personal: { ...prev.personal, [field]: val }
    }));
  };

  const handlePhotoUpload = (e) => {
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

  // Experience handlers
  const addExperience = () => {
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
    setResumeData(prev => ({ ...prev, experience: [newItem, ...(prev.experience || [])] }));
  };

  const updateExp = (id, field, val) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(e => e.id === id ? { ...e, [field]: val } : e)
    }));
  };

  const deleteExp = (id) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(e => e.id !== id)
    }));
  };

  const addBullet = (expId) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(e => e.id === expId ? { ...e, highlights: [...(e.highlights || []), ''] } : e)
    }));
  };

  const updateBullet = (expId, bIdx, val) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(e => {
        if (e.id === expId) {
          const h = [...(e.highlights || [])];
          h[bIdx] = val;
          return { ...e, highlights: h };
        }
        return e;
      })
    }));
  };

  const removeBullet = (expId, bIdx) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(e => {
        if (e.id === expId) {
          return { ...e, highlights: e.highlights.filter((_, i) => i !== bIdx) };
        }
        return e;
      })
    }));
  };

  return (
    <div className="space-y-4">
      {/* 1. Profile Picture & Framing */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden shadow-sm">
        <button
          onClick={() => toggleSection('pfp')}
          className="w-full flex items-center justify-between p-4 bg-slate-850 hover:bg-slate-800/80 transition-colors text-left"
        >
          <div className="flex items-center gap-2.5">
            <Camera className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-bold text-white">Profile Picture & Headshot</span>
          </div>
          {openSections.pfp ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {openSections.pfp && (
          <div className="p-4 border-t border-slate-800 space-y-4">
            <div className="flex items-center gap-4">
              {resumeData.photo ? (
                <img
                  src={resumeData.photo}
                  alt="Avatar"
                  className={`w-16 h-16 object-cover border-2 border-blue-500 shadow ${
                    resumeData.photoShape === 'circle' ? 'rounded-full' : resumeData.photoShape === 'rounded' ? 'rounded-xl' : 'rounded-none'
                  }`}
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-500 text-xs">
                  No Pic
                </div>
              )}

              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold cursor-pointer">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Headshot</span>
                    <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                  </label>
                  {resumeData.photo && (
                    <button
                      onClick={() => setResumeData(prev => ({ ...prev, photo: '', showPhoto: false }))}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-800 text-red-400 hover:bg-slate-700 text-xs font-medium"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={resumeData.showPhoto || false}
                    onChange={(e) => setResumeData(prev => ({ ...prev, showPhoto: e.target.checked }))}
                    className="rounded bg-slate-800 border-slate-700 text-blue-600 focus:ring-blue-500"
                  />
                  <span>Show photo on resume</span>
                </label>
              </div>
            </div>

            {resumeData.showPhoto && (
              <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
                <span className="text-xs text-slate-400 font-medium">Framing Shape:</span>
                {['circle', 'rounded', 'square'].map(shape => (
                  <button
                    key={shape}
                    onClick={() => setResumeData(prev => ({ ...prev, photoShape: shape }))}
                    className={`px-2.5 py-1 rounded text-xs capitalize ${
                      resumeData.photoShape === shape ? 'bg-blue-600 text-white font-semibold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {shape}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* 2. Personal Contact Info */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden shadow-sm">
        <button
          onClick={() => toggleSection('personal')}
          className="w-full flex items-center justify-between p-4 bg-slate-850 hover:bg-slate-800/80 transition-colors text-left"
        >
          <div className="flex items-center gap-2.5">
            <User className="w-4 h-4 text-indigo-400" />
            <span className="text-sm font-bold text-white">Contact & Identity</span>
          </div>
          {openSections.personal ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {openSections.personal && (
          <div className="p-4 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block text-slate-400 mb-1 font-medium">Full Name</label>
              <input
                type="text"
                value={resumeData.personal.fullName || ''}
                onChange={(e) => updatePersonal('fullName', e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">Professional Title</label>
              <input
                type="text"
                value={resumeData.personal.title || ''}
                onChange={(e) => updatePersonal('title', e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">Email Address</label>
              <input
                type="email"
                value={resumeData.personal.email || ''}
                onChange={(e) => updatePersonal('email', e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">Phone</label>
              <input
                type="text"
                value={resumeData.personal.phone || ''}
                onChange={(e) => updatePersonal('phone', e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">Location</label>
              <input
                type="text"
                value={resumeData.personal.location || ''}
                onChange={(e) => updatePersonal('location', e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">LinkedIn</label>
              <input
                type="text"
                value={resumeData.personal.linkedin || ''}
                onChange={(e) => updatePersonal('linkedin', e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">GitHub / Portfolio</label>
              <input
                type="text"
                value={resumeData.personal.github || ''}
                onChange={(e) => updatePersonal('github', e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">Personal Website</label>
              <input
                type="text"
                value={resumeData.personal.website || ''}
                onChange={(e) => updatePersonal('website', e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        )}
      </div>

      {/* 3. Professional Summary */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden shadow-sm">
        <button
          onClick={() => toggleSection('summary')}
          className="w-full flex items-center justify-between p-4 bg-slate-850 hover:bg-slate-800/80 transition-colors text-left"
        >
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-bold text-white">Summary & Value Proposition</span>
          </div>
          {openSections.summary ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {openSections.summary && (
          <div className="p-4 border-t border-slate-800">
            <textarea
              rows={4}
              value={resumeData.summary || ''}
              onChange={(e) => setResumeData(prev => ({ ...prev, summary: e.target.value }))}
              placeholder="Concise elevator pitch highlighting key impact..."
              className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500 leading-relaxed"
            />
          </div>
        )}
      </div>

      {/* 4. Experience */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden shadow-sm">
        <button
          onClick={() => toggleSection('experience')}
          className="w-full flex items-center justify-between p-4 bg-slate-850 hover:bg-slate-800/80 transition-colors text-left"
        >
          <div className="flex items-center gap-2.5">
            <Briefcase className="w-4 h-4 text-teal-400" />
            <span className="text-sm font-bold text-white">Work Experience ({(resumeData.experience || []).length})</span>
          </div>
          {openSections.experience ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {openSections.experience && (
          <div className="p-4 border-t border-slate-800 space-y-4">
            <div className="flex justify-end">
              <button
                onClick={addExperience}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Position</span>
              </button>
            </div>

            {(resumeData.experience || []).map((exp, idx) => (
              <div key={exp.id} className="p-3.5 rounded-lg bg-slate-800 border border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-400">Position #{idx + 1}</span>
                  <button
                    onClick={() => deleteExp(exp.id)}
                    className="text-xs text-red-400 hover:text-red-300"
                  >
                    Delete
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <input
                    type="text"
                    value={exp.title}
                    onChange={(e) => updateExp(exp.id, 'title', e.target.value)}
                    placeholder="Title"
                    className="p-2 rounded bg-slate-900 border border-slate-700 text-white"
                  />
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => updateExp(exp.id, 'company', e.target.value)}
                    placeholder="Company"
                    className="p-2 rounded bg-slate-900 border border-slate-700 text-white"
                  />
                  <input
                    type="text"
                    value={exp.startDate}
                    onChange={(e) => updateExp(exp.id, 'startDate', e.target.value)}
                    placeholder="Start (YYYY-MM)"
                    className="p-2 rounded bg-slate-900 border border-slate-700 text-white"
                  />
                  <input
                    type="text"
                    value={exp.endDate}
                    onChange={(e) => updateExp(exp.id, 'endDate', e.target.value)}
                    placeholder="End (or Present)"
                    className="p-2 rounded bg-slate-900 border border-slate-700 text-white"
                  />
                </div>

                {/* Bullets */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between items-center text-[11px] text-slate-400">
                    <span>Accomplishment Bullets:</span>
                    <button
                      onClick={() => addBullet(exp.id)}
                      className="text-blue-400 hover:underline"
                    >
                      + Add Bullet
                    </button>
                  </div>
                  {(exp.highlights || []).map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-center gap-1.5">
                      <input
                        type="text"
                        value={bullet}
                        onChange={(e) => updateBullet(exp.id, bIdx, e.target.value)}
                        placeholder="Bullet metric..."
                        className="flex-1 p-1.5 rounded bg-slate-900 border border-slate-700 text-xs text-white"
                      />
                      <button
                        onClick={() => removeBullet(exp.id, bIdx)}
                        className="text-slate-500 hover:text-red-400 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 5. Skills */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden shadow-sm">
        <button
          onClick={() => toggleSection('skills')}
          className="w-full flex items-center justify-between p-4 bg-slate-850 hover:bg-slate-800/80 transition-colors text-left"
        >
          <div className="flex items-center gap-2.5">
            <Wrench className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-bold text-white">Skills & Toolkit</span>
          </div>
          {openSections.skills ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {openSections.skills && (
          <div className="p-4 border-t border-slate-800 space-y-3">
            {(resumeData.skills || []).map((cat, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-slate-800 border border-slate-700 space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <input
                    type="text"
                    value={cat.category}
                    onChange={(e) => {
                      const s = [...resumeData.skills];
                      s[idx].category = e.target.value;
                      setResumeData(prev => ({ ...prev, skills: s }));
                    }}
                    placeholder="Category"
                    className="font-bold text-white bg-transparent border-b border-slate-700 pb-0.5 focus:outline-none"
                  />
                  <button
                    onClick={() => {
                      const s = resumeData.skills.filter((_, i) => i !== idx);
                      setResumeData(prev => ({ ...prev, skills: s }));
                    }}
                    className="text-red-400 hover:text-red-300"
                  >
                    Delete
                  </button>
                </div>
                <input
                  type="text"
                  value={Array.isArray(cat.items) ? cat.items.join(', ') : cat.items}
                  onChange={(e) => {
                    const s = [...resumeData.skills];
                    s[idx].items = e.target.value.split(',').map(item => item.trim()).filter(Boolean);
                    setResumeData(prev => ({ ...prev, skills: s }));
                  }}
                  placeholder="Items comma-separated (e.g. React, TypeScript, Go)"
                  className="w-full p-2 rounded bg-slate-900 border border-slate-700 text-slate-200"
                />
              </div>
            ))}
            <button
              onClick={() => {
                setResumeData(prev => ({
                  ...prev,
                  skills: [...(prev.skills || []), { category: 'New Category', items: ['Skill 1', 'Skill 2'] }]
                }));
              }}
              className="text-xs text-blue-400 hover:underline flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Category</span>
            </button>
          </div>
        )}
      </div>

      {/* 6. Education */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden shadow-sm">
        <button
          onClick={() => toggleSection('education')}
          className="w-full flex items-center justify-between p-4 bg-slate-850 hover:bg-slate-800/80 transition-colors text-left"
        >
          <div className="flex items-center gap-2.5">
            <GraduationCap className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-bold text-white">Education & Academics</span>
          </div>
          {openSections.education ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {openSections.education && (
          <div className="p-4 border-t border-slate-800 space-y-3">
            {(resumeData.education || []).map((edu, idx) => (
              <div key={edu.id} className="p-3 rounded-lg bg-slate-800 border border-slate-700 space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-blue-400">Degree #{idx + 1}</span>
                  <button
                    onClick={() => setResumeData(prev => ({ ...prev, education: prev.education.filter(e => e.id !== edu.id) }))}
                    className="text-red-400 hover:text-red-300"
                  >
                    Delete
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => {
                      const ed = resumeData.education.map(item => item.id === edu.id ? { ...item, degree: e.target.value } : item);
                      setResumeData(prev => ({ ...prev, education: ed }));
                    }}
                    placeholder="Degree"
                    className="p-1.5 rounded bg-slate-900 border border-slate-700 text-white"
                  />
                  <input
                    type="text"
                    value={edu.school}
                    onChange={(e) => {
                      const ed = resumeData.education.map(item => item.id === edu.id ? { ...item, school: e.target.value } : item);
                      setResumeData(prev => ({ ...prev, education: ed }));
                    }}
                    placeholder="School / University"
                    className="p-1.5 rounded bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
                <input
                  type="text"
                  value={edu.gradYear}
                  onChange={(e) => {
                    const ed = resumeData.education.map(item => item.id === edu.id ? { ...item, gradYear: e.target.value } : item);
                    setResumeData(prev => ({ ...prev, education: ed }));
                  }}
                  placeholder="Graduation Year"
                  className="w-full p-1.5 rounded bg-slate-900 border border-slate-700 text-white"
                />
              </div>
            ))}
            <button
              onClick={() => {
                setResumeData(prev => ({
                  ...prev,
                  education: [...(prev.education || []), { id: `edu-${Date.now()}`, degree: '', school: '', gradYear: '' }]
                }));
              }}
              className="text-xs text-blue-400 hover:underline flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Degree</span>
            </button>
          </div>
        )}
      </div>

      {/* 7. Projects */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden shadow-sm">
        <button
          onClick={() => toggleSection('projects')}
          className="w-full flex items-center justify-between p-4 bg-slate-850 hover:bg-slate-800/80 transition-colors text-left"
        >
          <div className="flex items-center gap-2.5">
            <FolderGit2 className="w-4 h-4 text-pink-400" />
            <span className="text-sm font-bold text-white">Projects & Portfolio</span>
          </div>
          {openSections.projects ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {openSections.projects && (
          <div className="p-4 border-t border-slate-800 space-y-3">
            {(resumeData.projects || []).map((proj) => (
              <div key={proj.id} className="p-3 rounded-lg bg-slate-800 border border-slate-700 space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <input
                    type="text"
                    value={proj.name}
                    onChange={(e) => {
                      const p = resumeData.projects.map(item => item.id === proj.id ? { ...item, name: e.target.value } : item);
                      setResumeData(prev => ({ ...prev, projects: p }));
                    }}
                    placeholder="Project Name"
                    className="font-bold text-white bg-transparent border-b border-slate-700 pb-0.5 focus:outline-none flex-1"
                  />
                  <button
                    onClick={() => setResumeData(prev => ({ ...prev, projects: prev.projects.filter(p => p.id !== proj.id) }))}
                    className="text-red-400 hover:text-red-300 ml-2"
                  >
                    Delete
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={proj.link}
                    onChange={(e) => {
                      const p = resumeData.projects.map(item => item.id === proj.id ? { ...item, link: e.target.value } : item);
                      setResumeData(prev => ({ ...prev, projects: p }));
                    }}
                    placeholder="URL / GitHub"
                    className="p-1.5 rounded bg-slate-900 border border-slate-700 text-white"
                  />
                  <input
                    type="text"
                    value={proj.tech}
                    onChange={(e) => {
                      const p = resumeData.projects.map(item => item.id === proj.id ? { ...item, tech: e.target.value } : item);
                      setResumeData(prev => ({ ...prev, projects: p }));
                    }}
                    placeholder="Tech Stack"
                    className="p-1.5 rounded bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
                <textarea
                  rows={2}
                  value={proj.description}
                  onChange={(e) => {
                    const p = resumeData.projects.map(item => item.id === proj.id ? { ...item, description: e.target.value } : item);
                    setResumeData(prev => ({ ...prev, projects: p }));
                  }}
                  placeholder="Short impact description"
                  className="w-full p-2 rounded bg-slate-900 border border-slate-700 text-white"
                />
              </div>
            ))}
            <button
              onClick={() => {
                setResumeData(prev => ({
                  ...prev,
                  projects: [...(prev.projects || []), { id: `proj-${Date.now()}`, name: '', link: '', tech: '', description: '' }]
                }));
              }}
              className="text-xs text-blue-400 hover:underline flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Project</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
