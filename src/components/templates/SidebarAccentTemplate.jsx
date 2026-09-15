import React from 'react';
import { Mail, Phone, MapPin, Globe, ExternalLink, Briefcase, GraduationCap, Award, Layers } from 'lucide-react';
import { Linkedin, Github } from '../Icons';

export default function SidebarAccentTemplate({ data, theme, font, orientation = 'portrait' }) {
  const { personal, summary, experience, education, skills, projects, certifications, languages, photo, showPhoto, photoShape } = data;
  const isLandscape = orientation === 'landscape';

  const getPhotoShapeClass = () => {
    if (photoShape === 'circle') return 'rounded-full';
    if (photoShape === 'rounded') return 'rounded-2xl';
    return 'rounded-none';
  };

  return (
    <div 
      className="w-full bg-white text-slate-800 leading-normal flex flex-col md:flex-row min-h-[950px]"
      style={{ fontFamily: font.fontFamily || "'Inter', sans-serif" }}
    >
      {/* Slim Colored Sidebar */}
      <aside 
        className={`${isLandscape ? 'w-full md:w-3/12' : 'w-full md:w-4/12'} p-6 sm:p-7 text-white flex flex-col justify-between shrink-0 shadow-lg`}
        style={{ backgroundColor: theme.primary }}
      >
        <div className="space-y-6">
          {/* Photo & Identity */}
          <div>
            {showPhoto && photo && (
              <div className="flex justify-center md:justify-start mb-4">
                <img 
                  src={photo} 
                  alt={personal.fullName} 
                  className={`w-24 h-24 object-cover border-4 border-white/20 shadow-md ${getPhotoShapeClass()}`}
                />
              </div>
            )}
            <h1 className="text-2xl font-black uppercase tracking-tight text-white leading-tight">
              {personal.fullName || 'Candidate Name'}
            </h1>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/80 mt-1">
              {personal.title || 'Professional Title'}
            </p>
          </div>

          {/* Contact Details */}
          <div className="space-y-2.5 text-xs text-white/90 border-t border-white/20 pt-4">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-white/70">Contact Info</h3>
            {personal.email && (
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 shrink-0" />
                <a href={`mailto:${personal.email}`} className="truncate hover:underline">{personal.email}</a>
              </div>
            )}
            {personal.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 shrink-0" />
                <span>{personal.phone}</span>
              </div>
            )}
            {personal.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span>{personal.location}</span>
              </div>
            )}
            {personal.linkedin && (
              <div className="flex items-center gap-2">
                <Linkedin className="w-3.5 h-3.5 shrink-0" />
                <a href={personal.linkedin.startsWith('http') ? personal.linkedin : `https://${personal.linkedin}`} target="_blank" rel="noreferrer" className="truncate hover:underline">LinkedIn</a>
              </div>
            )}
          </div>

          {/* Core Skills */}
          {skills && skills.length > 0 && (
            <div className="border-t border-white/20 pt-4 space-y-3">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-white/70">Expertise</h3>
              {skills.map((cat, idx) => (
                <div key={idx}>
                  <div className="text-[11px] font-bold text-white/90 mb-1">{cat.category}</div>
                  <div className="flex flex-wrap gap-1">
                    {cat.items && cat.items.map((it, iIdx) => (
                      <span key={iIdx} className="text-[10px] bg-black/20 px-2 py-0.5 rounded font-medium">
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Education in Sidebar */}
          {education && education.length > 0 && (
            <div className="border-t border-white/20 pt-4 space-y-2">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-white/70">Education</h3>
              {education.map(e => (
                <div key={e.id} className="text-xs">
                  <div className="font-bold text-white">{e.degree}</div>
                  <div className="text-[11px] text-white/80">{e.school} • {e.gradYear}</div>
                </div>
              ))}
            </div>
          )}

          {/* Languages */}
          {languages && languages.length > 0 && (
            <div className="border-t border-white/20 pt-4">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-white/70 mb-1">Languages</h3>
              <div className="space-y-1 text-xs text-white/80">
                {languages.map((l, i) => (
                  <div key={i} className="flex justify-between">
                    <span>{l.language}</span>
                    <span className="text-[10px]">{l.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-9 space-y-6">
        {/* Summary */}
        {summary && (
          <section className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-800 mb-1 flex items-center gap-1.5" style={{ color: theme.primary }}>
              Executive Profile
            </h2>
            <p className="text-xs text-slate-700 leading-relaxed font-normal">
              {summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <section>
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b pb-1.5 mb-4 flex items-center gap-1.5" style={{ borderColor: theme.primary }}>
              <Briefcase className="w-4 h-4" style={{ color: theme.primary }} />
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
                  <div className="text-xs font-semibold mb-1.5" style={{ color: theme.primary }}>
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

        {/* Projects */}
        {projects && projects.length > 0 && (
          <section>
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b pb-1.5 mb-3 flex items-center gap-1.5" style={{ borderColor: theme.primary }}>
              <Layers className="w-4 h-4" style={{ color: theme.primary }} />
              <span>Key Projects & Portfolios</span>
            </h2>

            <div className={`grid ${isLandscape ? 'grid-cols-2 gap-3' : 'grid-cols-1 sm:grid-cols-2 gap-3'}`}>
              {projects.map(p => (
                <div key={p.id} className="p-3 rounded-xl border border-slate-200 bg-white shadow-2xs">
                  <div className="font-bold text-xs text-slate-900">{p.name}</div>
                  {p.tech && <div className="text-[10px] text-blue-600 font-mono mt-0.5">{p.tech}</div>}
                  <p className="text-[11.5px] text-slate-600 mt-1">{p.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {certifications && certifications.length > 0 && (
          <section>
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b pb-1.5 mb-2.5 flex items-center gap-1.5" style={{ borderColor: theme.primary }}>
              <Award className="w-4 h-4" style={{ color: theme.primary }} />
              <span>Certifications</span>
            </h2>
            <div className="flex flex-wrap gap-3 text-xs">
              {certifications.map(c => (
                <div key={c.id} className="p-2 rounded bg-slate-50 border border-slate-200 flex-1 min-w-[200px]">
                  <div className="font-bold text-slate-900">{c.name}</div>
                  <div className="text-[10px] text-slate-500">{c.issuer} • {c.year}</div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
