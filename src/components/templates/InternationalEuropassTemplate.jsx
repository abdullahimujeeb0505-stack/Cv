import React from 'react';
import { Mail, Phone, MapPin, Globe, CheckCircle2 } from 'lucide-react';
import { Linkedin } from '../Icons';

export default function InternationalEuropassTemplate({ data, theme, font, orientation = 'portrait' }) {
  const { personal, summary, experience, education, skills, projects, certifications, languages, photo, showPhoto, photoShape } = data;
  const isLandscape = orientation === 'landscape';

  const getPhotoShapeClass = () => {
    if (photoShape === 'circle') return 'rounded-full';
    if (photoShape === 'rounded') return 'rounded-xl';
    return 'rounded-sm';
  };

  return (
    <div 
      className="w-full bg-white text-slate-800 p-8 sm:p-10 leading-relaxed"
      style={{ fontFamily: font.fontFamily || "'Inter', sans-serif" }}
    >
      {/* Europass Header */}
      <header className="border-b-2 pb-6 mb-6" style={{ borderColor: theme.primary }}>
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {showPhoto && photo && (
            <div className="shrink-0">
              <img 
                src={photo} 
                alt={personal.fullName} 
                className={`w-28 h-28 object-cover border-2 shadow-sm ${getPhotoShapeClass()}`}
                style={{ borderColor: theme.primary }}
              />
            </div>
          )}

          <div className="flex-1 text-center sm:text-left">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Curriculum Vitae Europass
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-0.5">
              {personal.fullName || 'Full Name'}
            </h1>
            <p className="text-base font-semibold mt-1" style={{ color: theme.primary }}>
              {personal.title || 'International Project Manager'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 mt-3 text-xs text-slate-600">
              {personal.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5" style={{ color: theme.primary }} />
                  <a href={`mailto:${personal.email}`} className="hover:underline">{personal.email}</a>
                </div>
              )}
              {personal.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5" style={{ color: theme.primary }} />
                  <span>{personal.phone}</span>
                </div>
              )}
              {personal.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5" style={{ color: theme.primary }} />
                  <span>{personal.location}</span>
                </div>
              )}
              {personal.linkedin && (
                <div className="flex items-center gap-2">
                  <Linkedin className="w-3.5 h-3.5" style={{ color: theme.primary }} />
                  <a href={personal.linkedin.startsWith('http') ? personal.linkedin : `https://${personal.linkedin}`} target="_blank" rel="noreferrer" className="hover:underline">
                    {personal.linkedin.replace(/^https?:\/\/(www\.)?/, '')}
                  </a>
                </div>
              )}
              {personal.website && (
                <div className="flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5" style={{ color: theme.primary }} />
                  <a href={personal.website.startsWith('http') ? personal.website : `https://${personal.website}`} target="_blank" rel="noreferrer" className="hover:underline">
                    {personal.website.replace(/^https?:\/\/(www\.)?/, '')}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Profile Summary */}
      {summary && (
        <section className="mb-6 grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Work Profile
            </h2>
          </div>
          <div className="md:col-span-9">
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
              {summary}
            </p>
          </div>
        </section>
      )}

      {/* Work Experience */}
      {experience && experience.length > 0 && (
        <section className="mb-6 grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Work Experience
            </h2>
          </div>
          <div className="md:col-span-9 space-y-4">
            {experience.map((item) => (
              <div key={item.id} className="text-xs sm:text-sm">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between font-bold text-slate-900">
                  <span className="text-slate-950 font-semibold">{item.title}</span>
                  <span className="text-xs text-slate-500 font-normal">
                    {item.startDate} – {item.current ? 'Present' : item.endDate}
                  </span>
                </div>
                <div className="text-xs font-medium mt-0.5" style={{ color: theme.primary }}>
                  {item.company} {item.location ? `• ${item.location}` : ''}
                </div>
                {item.highlights && item.highlights.length > 0 && (
                  <ul className="mt-1.5 list-disc list-outside pl-4 space-y-1 text-xs text-slate-700">
                    {item.highlights.filter(Boolean).map((bullet, idx) => (
                      <li key={idx} className="leading-snug">{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education & Training */}
      {education && education.length > 0 && (
        <section className="mb-6 grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Education & Training
            </h2>
          </div>
          <div className="md:col-span-9 space-y-3">
            {education.map((edu) => (
              <div key={edu.id} className="text-xs">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>{edu.degree}</span>
                  <span className="text-slate-500 font-normal">{edu.gradYear}</span>
                </div>
                <div className="text-slate-600 font-medium">{edu.school} {edu.location ? `• ${edu.location}` : ''}</div>
                {edu.details && <p className="text-slate-500 text-[11px] mt-0.5">{edu.details}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Language Skills with CEFR */}
      {languages && languages.length > 0 && (
        <section className="mb-6 grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Mother Tongue & Languages
            </h2>
          </div>
          <div className="md:col-span-9">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {languages.map((l, idx) => (
                <div key={idx} className="p-2 rounded border border-slate-200 bg-slate-50/50 text-xs">
                  <div className="font-bold text-slate-900">{l.language}</div>
                  <div className="text-slate-500 text-[11px] mt-0.5">{l.proficiency}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Competencies */}
      {skills && skills.length > 0 && (
        <section className="mb-6 grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Personal & Technical Skills
            </h2>
          </div>
          <div className="md:col-span-9 space-y-2 text-xs">
            {skills.map((s, idx) => (
              <div key={idx}>
                <span className="font-bold text-slate-900">{s.category}: </span>
                <span className="text-slate-700">
                  {Array.isArray(s.items) ? s.items.join(', ') : s.items}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects and Certs */}
      {((projects && projects.length > 0) || (certifications && certifications.length > 0)) && (
        <section className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-2 border-t border-slate-100">
          <div className="md:col-span-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Additional Credentials
            </h2>
          </div>
          <div className="md:col-span-9 space-y-3 text-xs">
            {certifications && certifications.length > 0 && (
              <div>
                <span className="font-bold text-slate-800">Certifications: </span>
                <span className="text-slate-600">
                  {certifications.map(c => `${c.name} (${c.issuer}, ${c.year})`).join('; ')}
                </span>
              </div>
            )}
            {projects && projects.length > 0 && (
              <div>
                <span className="font-bold text-slate-800">Key Projects: </span>
                <span className="text-slate-600">
                  {projects.map(p => `${p.name} - ${p.description}`).join(' | ')}
                </span>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
