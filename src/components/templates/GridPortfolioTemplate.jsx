import React from 'react';
import { Mail, Phone, MapPin, Globe, ExternalLink, Code2, FolderGit2, CheckCircle2 } from 'lucide-react';
import { Linkedin, Github } from '../Icons';

export default function GridPortfolioTemplate({ data, theme, font, orientation = 'portrait' }) {
  const { personal, summary, experience, education, skills, projects, certifications, languages, photo, showPhoto, photoShape } = data;
  const isLandscape = orientation === 'landscape';

  const getPhotoShapeClass = () => {
    if (photoShape === 'circle') return 'rounded-full';
    if (photoShape === 'rounded') return 'rounded-xl';
    return 'rounded-none';
  };

  return (
    <div 
      className="w-full bg-white text-slate-800 p-8 sm:p-10 leading-relaxed"
      style={{ fontFamily: font.fontFamily || "'Inter', sans-serif" }}
    >
      {/* Header */}
      <header className="border-b-2 pb-5 mb-5 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderColor: theme.primary }}>
        <div className="flex items-center gap-4 text-center sm:text-left">
          {showPhoto && photo && (
            <img 
              src={photo} 
              alt={personal.fullName} 
              className={`w-18 h-18 object-cover border-2 shadow-sm ${getPhotoShapeClass()}`}
              style={{ borderColor: theme.primary }}
            />
          )}
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-950 uppercase tracking-tight">
              {personal.fullName || 'Builder Name'}
            </h1>
            <p className="text-sm font-semibold mt-0.5" style={{ color: theme.primary }}>
              {personal.title || 'Product Architect & Creative Technologist'}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-4 gap-y-1 text-xs text-slate-600 font-medium">
          {personal.email && (
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" style={{ color: theme.primary }} />
              <a href={`mailto:${personal.email}`} className="hover:underline">{personal.email}</a>
            </span>
          )}
          {personal.phone && (
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" style={{ color: theme.primary }} />
              <span>{personal.phone}</span>
            </span>
          )}
          {personal.location && (
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" style={{ color: theme.primary }} />
              <span>{personal.location}</span>
            </span>
          )}
          {personal.github && (
            <span className="flex items-center gap-1.5">
              <Github className="w-3.5 h-3.5" style={{ color: theme.primary }} />
              <a href={personal.github.startsWith('http') ? personal.github : `https://${personal.github}`} target="_blank" rel="noreferrer" className="hover:underline">GitHub</a>
            </span>
          )}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-6 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
          <p className="text-xs text-slate-700 leading-relaxed font-normal">
            {summary}
          </p>
        </section>
      )}

      {/* FEATURED PROJECTS (TOP SECTION IN PORTFOLIO TEMPLATE) */}
      {projects && projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b pb-1 mb-3 flex items-center gap-2" style={{ borderColor: theme.primary }}>
            <FolderGit2 className="w-4 h-4" style={{ color: theme.primary }} />
            <span>Featured Project Architecture & Case Studies</span>
          </h2>

          <div className={`grid ${isLandscape ? 'grid-cols-3 gap-3.5' : 'grid-cols-1 sm:grid-cols-2 gap-3.5'}`}>
            {projects.map((p) => (
              <div key={p.id} className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-xs hover:border-slate-300 transition-colors flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900">{p.name}</span>
                    {p.link && (
                      <span className="text-[10px] text-blue-600 font-mono hover:underline flex items-center gap-0.5">
                        <span>Demo</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </span>
                    )}
                  </div>
                  {p.tech && (
                    <div className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-blue-50 text-blue-700 inline-block mt-1 mb-1.5">
                      {p.tech}
                    </div>
                  )}
                  <p className="text-[11.5px] text-slate-600 leading-snug">{p.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Two Column Grid for Experience and Skills */}
      <div className={`grid ${isLandscape ? 'grid-cols-12 gap-6' : 'grid-cols-1 md:grid-cols-12 gap-6'}`}>
        {/* Left Column: Work Experience (8 cols) */}
        <div className={isLandscape ? 'col-span-8 space-y-4' : 'md:col-span-8 space-y-4'}>
          {experience && experience.length > 0 && (
            <section>
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b pb-1 mb-3 flex items-center gap-2" style={{ borderColor: theme.primary }}>
                <Code2 className="w-4 h-4" style={{ color: theme.primary }} />
                <span>Work Experience</span>
              </h2>

              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id} className="text-xs">
                    <div className="flex justify-between items-baseline flex-wrap">
                      <span className="font-bold text-sm text-slate-950">{exp.title}</span>
                      <span className="text-[11px] font-semibold text-slate-500">
                        {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <div className="text-xs font-semibold mb-1" style={{ color: theme.primary }}>
                      {exp.company} {exp.location && `• ${exp.location}`}
                    </div>

                    {exp.highlights && exp.highlights.length > 0 && (
                      <ul className="list-disc list-inside space-y-1 text-slate-700 text-xs">
                        {exp.highlights.filter(Boolean).map((h, i) => (
                          <li key={i} className="pl-0.5 leading-relaxed">{h}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column: Skills & Education (4 cols) */}
        <div className={isLandscape ? 'col-span-4 space-y-4' : 'md:col-span-4 space-y-4'}>
          {skills && skills.length > 0 && (
            <section className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-2.5">Core Stack</h3>
              <div className="space-y-2.5 text-xs">
                {skills.map((s, idx) => (
                  <div key={idx}>
                    <div className="font-bold text-slate-800 text-[11px] mb-1">{s.category}</div>
                    <div className="flex flex-wrap gap-1">
                      {s.items.map((it, iIdx) => (
                        <span key={iIdx} className="text-[10.5px] px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700 font-mono">
                          {it}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {education && education.length > 0 && (
            <section className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-2">Education</h3>
              <div className="space-y-2 text-xs">
                {education.map(e => (
                  <div key={e.id}>
                    <div className="font-bold text-slate-900">{e.degree}</div>
                    <div className="text-[11px] text-slate-600">{e.school} • {e.gradYear}</div>
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
