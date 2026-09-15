import React from 'react';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { Linkedin } from '../Icons';

export default function ExecutiveIvyTemplate({ data, theme, font, orientation = 'portrait' }) {
  const { personal, summary, experience, education, skills, projects, certifications, languages, photo, showPhoto, photoShape } = data;
  const isLandscape = orientation === 'landscape';

  const getPhotoShapeClass = () => {
    if (photoShape === 'circle') return 'rounded-full';
    if (photoShape === 'rounded') return 'rounded-lg';
    return 'rounded-none';
  };

  return (
    <div 
      className="w-full bg-white text-slate-900 p-8 sm:p-11 leading-relaxed"
      style={{ fontFamily: font.fontFamily || "'Merriweather', serif" }}
    >
      {/* Header */}
      <header className="text-center border-b pb-5 mb-5" style={{ borderColor: theme.primary }}>
        {showPhoto && photo && (
          <div className="flex justify-center mb-3">
            <img 
              src={photo} 
              alt={personal.fullName} 
              className={`w-20 h-20 object-cover border-2 shadow-sm ${getPhotoShapeClass()}`}
              style={{ borderColor: theme.primary }}
            />
          </div>
        )}

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950 uppercase">
          {personal.fullName || 'Executive Full Name'}
        </h1>
        <p className="text-sm sm:text-base font-medium tracking-wide uppercase mt-1 text-slate-700" style={{ color: theme.primary }}>
          {personal.title || 'Senior Executive & Strategic Advisor'}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 mt-2.5 text-xs text-slate-600 font-sans">
          {personal.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-slate-500" />
              <span>{personal.location}</span>
            </span>
          )}
          {personal.phone && (
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3 text-slate-500" />
              <span>{personal.phone}</span>
            </span>
          )}
          {personal.email && (
            <span className="flex items-center gap-1">
              <Mail className="w-3 h-3 text-slate-500" />
              <a href={`mailto:${personal.email}`} className="hover:underline">{personal.email}</a>
            </span>
          )}
          {personal.linkedin && (
            <span className="flex items-center gap-1">
              <Linkedin className="w-3 h-3 text-slate-500" />
              <a href={personal.linkedin.startsWith('http') ? personal.linkedin : `https://${personal.linkedin}`} target="_blank" rel="noreferrer" className="hover:underline">
                {personal.linkedin.replace(/^https?:\/\/(www\.)?/, '')}
              </a>
            </span>
          )}
          {personal.website && (
            <span className="flex items-center gap-1">
              <Globe className="w-3 h-3 text-slate-500" />
              <a href={personal.website.startsWith('http') ? personal.website : `https://${personal.website}`} target="_blank" rel="noreferrer" className="hover:underline">
                {personal.website.replace(/^https?:\/\/(www\.)?/, '')}
              </a>
            </span>
          )}
        </div>
      </header>

      {/* Executive Summary */}
      {summary && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-center border-b pb-1 mb-2.5" style={{ borderColor: theme.border, color: theme.primary }}>
            Executive Profile
          </h2>
          <p className="text-xs sm:text-sm text-slate-800 leading-relaxed text-justify">
            {summary}
          </p>
        </section>
      )}

      {/* Main Sections: Responsive Grid if Landscape */}
      <div className={isLandscape ? 'grid grid-cols-2 gap-8' : 'space-y-5'}>
        {/* Executive Experience */}
        {experience && experience.length > 0 && (
          <section className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-widest text-center border-b pb-1 mb-3" style={{ borderColor: theme.border, color: theme.primary }}>
              Professional Leadership History
            </h2>
            <div className="space-y-4">
              {experience.map((item) => (
                <div key={item.id} className="text-xs sm:text-sm">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between font-bold text-slate-900">
                    <div className="text-sm text-slate-950 font-serif">
                      {item.company} <span className="font-normal text-slate-600 font-sans">| {item.location}</span>
                    </div>
                    <div className="text-xs text-slate-600 font-sans italic">
                      {item.startDate} – {item.current ? 'Present' : item.endDate}
                    </div>
                  </div>
                  <div className="font-semibold text-xs text-slate-800 italic mt-0.5" style={{ color: theme.secondary }}>
                    {item.title}
                  </div>
                  {item.highlights && item.highlights.length > 0 && (
                    <ul className="mt-1.5 list-disc list-outside pl-4 space-y-1 text-xs text-slate-700 leading-normal">
                      {item.highlights.filter(Boolean).map((bullet, idx) => (
                        <li key={idx}>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Right / Secondary Side */}
        <div className="space-y-5">
          {/* Core Competencies */}
          {skills && skills.length > 0 && (
            <section className="mb-5">
              <h2 className="text-xs font-bold uppercase tracking-widest text-center border-b pb-1 mb-2.5" style={{ borderColor: theme.border, color: theme.primary }}>
                Core Competencies & Governance
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs">
                {skills.map((group, idx) => (
                  <div key={idx} className="flex flex-col">
                    <span className="font-bold text-slate-900 border-b border-slate-100 pb-0.5 mb-1">{group.category}</span>
                    <span className="text-slate-700 font-sans text-[11px] leading-relaxed">
                      {Array.isArray(group.items) ? group.items.join(' • ') : group.items}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education & Credentials */}
          {education && education.length > 0 && (
            <section className="mb-5">
              <h2 className="text-xs font-bold uppercase tracking-widest text-center border-b pb-1 mb-2.5" style={{ borderColor: theme.border, color: theme.primary }}>
                Education & Executive Credentials
              </h2>
              <div className="space-y-2">
                {education.map((edu) => (
                  <div key={edu.id} className="text-xs">
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>{edu.school} — {edu.degree}</span>
                      <span className="font-sans text-slate-600 font-normal text-[11px]">{edu.gradYear}</span>
                    </div>
                    {edu.details && <p className="text-slate-600 italic text-[11px] mt-0.5">{edu.details}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications and Languages */}
          {((certifications && certifications.length > 0) || (languages && languages.length > 0)) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-1 text-xs">
              {certifications && certifications.length > 0 && (
                <div>
                  <h3 className="font-bold uppercase tracking-wider text-[11px] border-b pb-0.5 mb-1.5" style={{ color: theme.primary }}>
                    Certifications & Boards
                  </h3>
                  <ul className="space-y-1 text-slate-700 text-[11px]">
                    {certifications.map((c) => (
                      <li key={c.id} className="flex justify-between">
                        <span className="font-semibold text-slate-900">{c.name}</span>
                        <span className="text-slate-500">{c.year}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {languages && languages.length > 0 && (
                <div>
                  <h3 className="font-bold uppercase tracking-wider text-[11px] border-b pb-0.5 mb-1.5" style={{ color: theme.primary }}>
                    Languages
                  </h3>
                  <ul className="space-y-1 text-slate-700 text-[11px]">
                    {languages.map((l, idx) => (
                      <li key={idx} className="flex justify-between">
                        <span className="font-semibold text-slate-900">{l.language}</span>
                        <span className="text-slate-500">{l.proficiency}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
