import React from 'react';
import { Mail, Phone, MapPin, Globe, ExternalLink, Sparkles, Award } from 'lucide-react';
import { Linkedin } from '../Icons';

export default function CreativeStudioTemplate({ data, theme, font }) {
  const { personal, summary, experience, education, skills, projects, certifications, languages, photo, showPhoto, photoShape } = data;

  const getPhotoShapeClass = () => {
    if (photoShape === 'circle') return 'rounded-full';
    if (photoShape === 'rounded') return 'rounded-2xl';
    return 'rounded-md';
  };

  return (
    <div 
      className="w-full bg-white text-slate-800 leading-normal flex flex-col md:flex-row min-h-[900px]"
      style={{ fontFamily: font.fontFamily || "'Poppins', sans-serif" }}
    >
      {/* Sidebar (Left Column) */}
      <aside 
        className="w-full md:w-5/12 p-6 sm:p-7 text-white flex flex-col justify-between shrink-0"
        style={{ backgroundColor: theme.primary }}
      >
        <div>
          {/* Photo */}
          {showPhoto && photo && (
            <div className="flex justify-center md:justify-start mb-5">
              <img 
                src={photo} 
                alt={personal.fullName} 
                className={`w-28 h-28 object-cover border-4 border-white/20 shadow-lg ${getPhotoShapeClass()}`}
              />
            </div>
          )}

          {/* Personal Identity on mobile / sidebar */}
          <div className="mb-6">
            <h1 className="text-2xl font-black tracking-tight leading-tight">
              {personal.fullName || 'Creative Name'}
            </h1>
            <p className="text-sm font-medium text-white/80 mt-1 uppercase tracking-wider">
              {personal.title || 'Creative Specialist'}
            </p>
          </div>

          {/* Contact Details */}
          <div className="space-y-2.5 text-xs text-white/90 border-t border-white/15 pt-4 mb-6">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/70">
              Contact & Social
            </h3>
            {personal.email && (
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 shrink-0 opacity-80" />
                <a href={`mailto:${personal.email}`} className="truncate hover:underline">{personal.email}</a>
              </div>
            )}
            {personal.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 shrink-0 opacity-80" />
                <span>{personal.phone}</span>
              </div>
            )}
            {personal.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 shrink-0 opacity-80" />
                <span>{personal.location}</span>
              </div>
            )}
            {personal.website && (
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 shrink-0 opacity-80" />
                <a href={personal.website.startsWith('http') ? personal.website : `https://${personal.website}`} target="_blank" rel="noreferrer" className="truncate hover:underline">
                  {personal.website.replace(/^https?:\/\/(www\.)?/, '')}
                </a>
              </div>
            )}
            {personal.linkedin && (
              <div className="flex items-center gap-2">
                <Linkedin className="w-3.5 h-3.5 shrink-0 opacity-80" />
                <a href={personal.linkedin.startsWith('http') ? personal.linkedin : `https://${personal.linkedin}`} target="_blank" rel="noreferrer" className="truncate hover:underline">
                  {personal.linkedin.replace(/^https?:\/\/(www\.)?/, '')}
                </a>
              </div>
            )}
          </div>

          {/* Skills Badges */}
          {skills && skills.length > 0 && (
            <div className="border-t border-white/15 pt-4 mb-6">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/70 mb-3">
                Skills & Toolkit
              </h3>
              <div className="space-y-3">
                {skills.map((s, idx) => (
                  <div key={idx}>
                    <p className="text-[11px] font-bold text-white/95 mb-1.5">{s.category}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {(Array.isArray(s.items) ? s.items : [s.items]).map((item, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-white/15 text-white backdrop-blur-sm">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages && languages.length > 0 && (
            <div className="border-t border-white/15 pt-4">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/70 mb-2">
                Languages
              </h3>
              <ul className="space-y-1 text-xs">
                {languages.map((l, i) => (
                  <li key={i} className="flex justify-between text-white/90">
                    <span>{l.language}</span>
                    <span className="text-white/70 text-[10px]">{l.proficiency}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Certifications footer */}
        {certifications && certifications.length > 0 && (
          <div className="border-t border-white/15 pt-4 mt-6">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/70 mb-1.5">
              Certifications
            </h3>
            <div className="space-y-1 text-[11px] text-white/90">
              {certifications.map((c) => (
                <div key={c.id}>
                  <p className="font-semibold">{c.name}</p>
                  <p className="text-[10px] text-white/70">{c.issuer} {c.year ? `(${c.year})` : ''}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* Main Content (Right Column) */}
      <main className="flex-1 p-6 sm:p-8 bg-slate-50/50">
        {/* Profile / Summary */}
        {summary && (
          <section className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4" style={{ color: theme.primary }} />
              <h2 className="text-xs font-bold uppercase tracking-widest" style={{ color: theme.primary }}>
                About Me & Creative Vision
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {summary}
            </p>
          </section>
        )}

        {/* Experience Timeline */}
        {experience && experience.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: theme.primary }}>
              Experience
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id} className="relative pl-4 border-l-2" style={{ borderColor: theme.border }}>
                  <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full" style={{ backgroundColor: theme.primary }}></div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between font-bold text-slate-900 text-xs sm:text-sm">
                    <span className="text-slate-900">{exp.title}</span>
                    <span className="text-[11px] text-slate-500 font-normal">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="text-xs font-medium text-slate-600 mb-1.5">
                    {exp.company} {exp.location ? `• ${exp.location}` : ''}
                  </div>
                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-slate-700">
                      {exp.highlights.filter(Boolean).map((bullet, idx) => (
                        <li key={idx} className="leading-snug">{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Featured Projects */}
        {projects && projects.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: theme.primary }}>
              Featured Projects & Portfolio
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {projects.map((proj) => (
                <div key={proj.id} className="p-3 bg-white rounded-lg border border-slate-200/80 shadow-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-900 text-xs sm:text-sm">{proj.name}</span>
                    {proj.link && (
                      <a 
                        href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-[11px] flex items-center gap-1 hover:underline"
                        style={{ color: theme.primary }}
                      >
                        <span>View</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    )}
                  </div>
                  {proj.tech && (
                    <div className="text-[10px] font-medium text-slate-500 mb-1">
                      {proj.tech}
                    </div>
                  )}
                  {proj.description && (
                    <p className="text-xs text-slate-600 leading-snug">{proj.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: theme.primary }}>
              Education
            </h2>
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id} className="text-xs">
                  <div className="font-bold text-slate-900">{edu.degree}</div>
                  <div className="text-slate-600 text-[11px]">{edu.school} • {edu.gradYear}</div>
                  {edu.details && <div className="text-slate-500 text-[10px] mt-0.5">{edu.details}</div>}
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
