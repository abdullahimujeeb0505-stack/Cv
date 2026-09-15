import React from 'react';
import { Mail, Phone, MapPin, Globe, ExternalLink, Rocket, Code2, Zap, GitCommit, Check } from 'lucide-react';
import { Linkedin, Github } from '../Icons';

export default function SiliconStartupTemplate({ data, theme, font, orientation = 'portrait' }) {
  const { personal, summary, experience, education, skills, projects, certifications, languages, photo, showPhoto, photoShape } = data;
  const isLandscape = orientation === 'landscape';

  const getPhotoShapeClass = () => {
    if (photoShape === 'circle') return 'rounded-full';
    if (photoShape === 'rounded') return 'rounded-2xl';
    return 'rounded-lg';
  };

  return (
    <div 
      className="w-full bg-white text-slate-800 p-8 sm:p-10 leading-relaxed"
      style={{ fontFamily: font.fontFamily || "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* Header */}
      <header className="pb-5 mb-5 border-b border-slate-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {showPhoto && photo && (
              <img 
                src={photo} 
                alt={personal.fullName} 
                className={`w-16 h-16 object-cover border-2 shadow-sm ${getPhotoShapeClass()}`}
                style={{ borderColor: theme.primary }}
              />
            )}
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                  {personal.fullName || 'Builder Name'}
                </h1>
                <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Ready to Ship
                </span>
              </div>
              <p className="text-sm font-bold mt-0.5" style={{ color: theme.primary }}>
                {personal.title || 'Product Engineer & Founder'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            {personal.email && (
              <a href={`mailto:${personal.email}`} className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                <span>{personal.email}</span>
              </a>
            )}
            {personal.github && (
              <a href={personal.github.startsWith('http') ? personal.github : `https://${personal.github}`} target="_blank" rel="noreferrer" className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors flex items-center gap-1.5">
                <Github className="w-3.5 h-3.5 text-slate-500" />
                <span>GitHub</span>
              </a>
            )}
            {personal.location && (
              <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 font-medium flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                <span>{personal.location}</span>
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Summary / Mission */}
      {summary && (
        <div className="mb-5 bg-gradient-to-r from-slate-50 to-blue-50/30 p-3.5 rounded-xl border border-slate-200/80">
          <p className="text-xs text-slate-700 leading-relaxed font-medium">
            {summary}
          </p>
        </div>
      )}

      {/* Main Layout */}
      <div className={`grid ${isLandscape ? 'grid-cols-12 gap-6' : 'grid-cols-1 md:grid-cols-12 gap-6'}`}>
        {/* Experience & Projects (8 cols) */}
        <div className={isLandscape ? 'col-span-8 space-y-5' : 'md:col-span-8 space-y-5'}>
          {/* Work Experience */}
          {experience && experience.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-2">
                <Rocket className="w-4 h-4" style={{ color: theme.primary }} />
                <span>Work Experience & Impact</span>
              </h2>

              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id} className="p-3.5 rounded-xl bg-slate-50/60 border border-slate-200/70 hover:border-slate-300 transition-colors">
                    <div className="flex justify-between items-baseline flex-wrap">
                      <span className="font-bold text-sm text-slate-950">{exp.title}</span>
                      <span className="text-[11px] font-mono text-slate-500">
                        {exp.startDate} → {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <div className="text-xs font-semibold mb-2" style={{ color: theme.primary }}>
                      @{exp.company} {exp.location && `(${exp.location})`}
                    </div>

                    {exp.highlights && exp.highlights.length > 0 && (
                      <ul className="space-y-1 text-xs text-slate-600">
                        {exp.highlights.filter(Boolean).map((h, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-emerald-500 font-bold">›</span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Shipped Projects */}
          {projects && projects.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-2">
                <Code2 className="w-4 h-4" style={{ color: theme.primary }} />
                <span>Shipped Products & Open Source</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {projects.map((p) => (
                  <div key={p.id} className="p-3 rounded-xl border border-slate-200 bg-white shadow-2xs">
                    <div className="font-bold text-xs text-slate-900 flex items-center justify-between">
                      <span>{p.name}</span>
                      {p.link && <ExternalLink className="w-3 h-3 text-slate-400" />}
                    </div>
                    {p.tech && <div className="text-[10px] font-mono text-blue-600 mt-0.5">{p.tech}</div>}
                    <p className="text-[11px] text-slate-600 mt-1">{p.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column (Skills & Credentials) */}
        <div className={isLandscape ? 'col-span-4 space-y-5' : 'md:col-span-4 space-y-5'}>
          {/* Tech Stack Skills */}
          {skills && skills.length > 0 && (
            <section className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2.5 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" style={{ color: theme.primary }} />
                <span>Tech Stack</span>
              </h3>

              <div className="space-y-2.5">
                {skills.map((s, idx) => (
                  <div key={idx}>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">{s.category}</div>
                    <div className="flex flex-wrap gap-1">
                      {s.items && s.items.map((item, iIdx) => (
                        <span key={iIdx} className="text-[11px] px-2 py-0.5 rounded bg-white border border-slate-200 font-mono text-slate-800">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education && education.length > 0 && (
            <section className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">Education</h3>
              <div className="space-y-2 text-xs">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="font-bold text-slate-900">{edu.degree}</div>
                    <div className="text-slate-600 text-[11px]">{edu.school} ({edu.gradYear})</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certifications && certifications.length > 0 && (
            <section className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">Certifications</h3>
              <div className="space-y-1.5 text-xs">
                {certifications.map((c) => (
                  <div key={c.id} className="text-[11px]">
                    <div className="font-semibold text-slate-800">{c.name}</div>
                    <div className="text-slate-500 text-[10px]">{c.issuer}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
