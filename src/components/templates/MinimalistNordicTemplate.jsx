import React from 'react';
import { Mail, Phone, MapPin, Globe, ExternalLink } from 'lucide-react';
import { Linkedin } from '../Icons';

export default function MinimalistNordicTemplate({ data, theme, font }) {
  const { personal, summary, experience, education, skills, projects, certifications, languages, photo, showPhoto, photoShape } = data;

  const getPhotoShapeClass = () => {
    if (photoShape === 'circle') return 'rounded-full';
    if (photoShape === 'rounded') return 'rounded-xl';
    return 'rounded-none';
  };

  return (
    <div 
      className="w-full bg-white text-slate-800 p-8 sm:p-12 leading-relaxed"
      style={{ fontFamily: font.fontFamily || "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* Header */}
      <header className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-100 mb-6">
        <div className="text-center sm:text-left">
          <h1 className="text-3xl font-light tracking-tight text-slate-900">
            {personal.fullName || 'Your Name'}
          </h1>
          <p className="text-sm font-medium tracking-wide mt-1" style={{ color: theme.primary }}>
            {personal.title || 'Specialist / Associate'}
          </p>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-3 text-xs text-slate-500">
            {personal.email && (
              <a href={`mailto:${personal.email}`} className="hover:text-slate-900 transition-colors">
                {personal.email}
              </a>
            )}
            {personal.phone && <span>• {personal.phone}</span>}
            {personal.location && <span>• {personal.location}</span>}
            {personal.linkedin && (
              <span>• <a href={personal.linkedin.startsWith('http') ? personal.linkedin : `https://${personal.linkedin}`} target="_blank" rel="noreferrer" className="hover:underline">{personal.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</a></span>
            )}
            {personal.website && (
              <span>• <a href={personal.website.startsWith('http') ? personal.website : `https://${personal.website}`} target="_blank" rel="noreferrer" className="hover:underline">{personal.website.replace(/^https?:\/\/(www\.)?/, '')}</a></span>
            )}
          </div>
        </div>

        {showPhoto && photo && (
          <div className="shrink-0">
            <img 
              src={photo} 
              alt={personal.fullName} 
              className={`w-20 h-20 object-cover shadow-xs border border-slate-200 ${getPhotoShapeClass()}`}
            />
          </div>
        )}
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-6">
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
            {summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
            Experience
          </h2>
          <div className="space-y-4">
            {experience.map((item) => (
              <div key={item.id} className="text-xs sm:text-sm">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                  <span className="font-semibold text-slate-900">{item.title}</span>
                  <span className="text-xs text-slate-400">
                    {item.startDate} – {item.current ? 'Present' : item.endDate}
                  </span>
                </div>
                <div className="text-xs text-slate-500 mb-1.5" style={{ color: theme.primary }}>
                  {item.company} {item.location ? `— ${item.location}` : ''}
                </div>
                {item.highlights && item.highlights.length > 0 && (
                  <ul className="space-y-1 text-xs text-slate-600">
                    {item.highlights.filter(Boolean).map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-slate-300 mt-1 font-bold">•</span>
                        <span className="flex-1 leading-snug">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
            Education
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id} className="text-xs">
                <div className="flex justify-between font-semibold text-slate-900">
                  <span>{edu.degree}</span>
                  <span className="text-slate-400 font-normal">{edu.gradYear}</span>
                </div>
                <div className="text-slate-500">{edu.school} {edu.location ? `• ${edu.location}` : ''}</div>
                {edu.gpa && <div className="text-slate-400 text-[11px] mt-0.5">GPA: {edu.gpa}</div>}
                {edu.details && <p className="text-slate-500 text-[11px] mt-0.5">{edu.details}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
            Projects
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {projects.map((p) => (
              <div key={p.id} className="p-3 rounded border border-slate-100 bg-slate-50/50 text-xs">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="font-semibold text-slate-900">{p.name}</span>
                  {p.link && (
                    <a href={p.link.startsWith('http') ? p.link : `https://${p.link}`} target="_blank" rel="noreferrer" className="text-[11px] hover:underline" style={{ color: theme.primary }}>
                      Link
                    </a>
                  )}
                </div>
                {p.tech && <div className="text-[10px] text-slate-400 mb-1">{p.tech}</div>}
                {p.description && <p className="text-slate-600 text-[11px] leading-snug">{p.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">
            Skills
          </h2>
          <div className="space-y-1.5 text-xs">
            {skills.map((s, idx) => (
              <div key={idx} className="flex flex-wrap items-baseline gap-2">
                <span className="font-medium text-slate-700 w-28">{s.category}:</span>
                <span className="text-slate-500 flex-1">
                  {Array.isArray(s.items) ? s.items.join(', ') : s.items}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Footer Info (Certs & Languages) */}
      {((certifications && certifications.length > 0) || (languages && languages.length > 0)) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100 text-xs">
          {certifications && certifications.length > 0 && (
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1.5">Certificates</h2>
              <ul className="space-y-1 text-slate-600 text-[11px]">
                {certifications.map(c => (
                  <li key={c.id}>• {c.name} ({c.issuer})</li>
                ))}
              </ul>
            </div>
          )}
          {languages && languages.length > 0 && (
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1.5">Languages</h2>
              <ul className="space-y-1 text-slate-600 text-[11px]">
                {languages.map((l, i) => (
                  <li key={i}>• {l.language} — {l.proficiency}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
