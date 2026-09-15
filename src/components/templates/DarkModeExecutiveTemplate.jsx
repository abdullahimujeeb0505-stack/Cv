import React from 'react';
import { Mail, Phone, MapPin, Globe, ExternalLink, Shield, Sparkles } from 'lucide-react';
import { Linkedin, Github } from '../Icons';

export default function DarkModeExecutiveTemplate({ data, theme, font, orientation = 'portrait' }) {
  const { personal, summary, experience, education, skills, projects, certifications, languages, photo, showPhoto, photoShape } = data;
  const isLandscape = orientation === 'landscape';

  const getPhotoShapeClass = () => {
    if (photoShape === 'circle') return 'rounded-full';
    if (photoShape === 'rounded') return 'rounded-2xl';
    return 'rounded-none';
  };

  return (
    <div 
      className="w-full bg-[#0f172a] text-slate-200 p-8 sm:p-10 leading-relaxed"
      style={{ fontFamily: font.fontFamily || "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* Header */}
      <header className="border-b border-slate-700/80 pb-6 mb-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-5">
          <div className="flex items-center gap-4 text-center sm:text-left">
            {showPhoto && photo && (
              <img 
                src={photo} 
                alt={personal.fullName} 
                className={`w-20 h-20 object-cover border-2 shadow-xl ${getPhotoShapeClass()}`}
                style={{ borderColor: theme.primary }}
              />
            )}
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {personal.fullName || 'Executive Name'}
                </h1>
                <Sparkles className="w-4 h-4 text-amber-400" />
              </div>
              <p className="text-sm font-semibold tracking-wide uppercase mt-1" style={{ color: theme.primary }}>
                {personal.title || 'Managing Partner & Technology Officer'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2 text-xs text-slate-300">
            {personal.email && (
              <span className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700/60">
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                <a href={`mailto:${personal.email}`} className="hover:text-white">{personal.email}</a>
              </span>
            )}
            {personal.phone && (
              <span className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700/60">
                <Phone className="w-3.5 h-3.5 text-blue-400" />
                <span>{personal.phone}</span>
              </span>
            )}
            {personal.location && (
              <span className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700/60">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                <span>{personal.location}</span>
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-6 bg-slate-800/50 p-4 rounded-xl border border-slate-700/60">
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            {summary}
          </p>
        </section>
      )}

      {/* Main Grid */}
      <div className={`grid ${isLandscape ? 'grid-cols-12 gap-6' : 'grid-cols-1 md:grid-cols-12 gap-6'}`}>
        {/* Left Column (8 cols) */}
        <div className={isLandscape ? 'col-span-8 space-y-6' : 'md:col-span-8 space-y-6'}>
          {experience && experience.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-white border-b border-slate-700/80 pb-2 mb-4 flex items-center gap-2">
                <Shield className="w-4 h-4" style={{ color: theme.primary }} />
                <span>Leadership Experience & Results</span>
              </h2>

              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id} className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/50 hover:border-slate-600 transition-colors">
                    <div className="flex justify-between items-baseline flex-wrap">
                      <span className="font-bold text-sm text-white">{exp.title}</span>
                      <span className="text-[11px] font-mono text-slate-400">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                    </div>
                    <div className="text-xs font-semibold mb-2" style={{ color: theme.primary }}>
                      {exp.company} {exp.location && `• ${exp.location}`}
                    </div>

                    {exp.highlights && exp.highlights.length > 0 && (
                      <ul className="space-y-1 text-xs text-slate-300">
                        {exp.highlights.filter(Boolean).map((h, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-blue-400 font-bold">›</span>
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

          {projects && projects.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-white border-b border-slate-700/80 pb-2 mb-3">
                Key Initiatives & Projects
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {projects.map((p) => (
                  <div key={p.id} className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/50">
                    <div className="font-bold text-xs text-white">{p.name}</div>
                    {p.tech && <div className="text-[10px] text-blue-400 font-mono mt-0.5">{p.tech}</div>}
                    <p className="text-[11px] text-slate-300 mt-1">{p.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column (4 cols) */}
        <div className={isLandscape ? 'col-span-4 space-y-6' : 'md:col-span-4 space-y-6'}>
          {skills && skills.length > 0 && (
            <section className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/50">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Core Expertise</h3>
              <div className="space-y-3">
                {skills.map((s, idx) => (
                  <div key={idx}>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">{s.category}</div>
                    <div className="flex flex-wrap gap-1">
                      {s.items.map((it, itIdx) => (
                        <span key={itIdx} className="text-[10.5px] px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-200">
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
            <section className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/50">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-2">Education</h3>
              <div className="space-y-2 text-xs">
                {education.map(e => (
                  <div key={e.id}>
                    <div className="font-bold text-white">{e.degree}</div>
                    <div className="text-slate-400 text-[11px]">{e.school} • {e.gradYear}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {certifications && certifications.length > 0 && (
            <section className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/50">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-2">Certifications</h3>
              <div className="space-y-1.5 text-xs">
                {certifications.map(c => (
                  <div key={c.id} className="text-[11px]">
                    <div className="font-semibold text-slate-200">{c.name}</div>
                    <div className="text-slate-400 text-[10px]">{c.issuer} • {c.year}</div>
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
