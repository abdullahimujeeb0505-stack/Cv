import React from 'react';
import { Mail, Phone, MapPin, Globe, ExternalLink } from 'lucide-react';
import { Linkedin, Github } from '../Icons';

export default function ModernATSTemplate({ data, theme, font, orientation = 'portrait' }) {
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
      style={{ fontFamily: font.fontFamily }}
    >
      {/* Header */}
      <header className="border-b-2 pb-5 mb-5" style={{ borderColor: theme.primary }}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-3xl font-extrabold tracking-tight uppercase" style={{ color: theme.primary }}>
              {personal.fullName || 'Your Full Name'}
            </h1>
            <p className="text-lg font-semibold mt-0.5 text-slate-700">
              {personal.title || 'Professional Title'}
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3 text-xs text-slate-600 font-medium">
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
              {personal.linkedin && (
                <span className="flex items-center gap-1.5">
                  <Linkedin className="w-3.5 h-3.5" style={{ color: theme.primary }} />
                  <a href={personal.linkedin.startsWith('http') ? personal.linkedin : `https://${personal.linkedin}`} target="_blank" rel="noreferrer" className="hover:underline">
                    {personal.linkedin.replace(/^https?:\/\/(www\.)?/, '')}
                  </a>
                </span>
              )}
              {personal.github && (
                <span className="flex items-center gap-1.5">
                  <Github className="w-3.5 h-3.5" style={{ color: theme.primary }} />
                  <a href={personal.github.startsWith('http') ? personal.github : `https://${personal.github}`} target="_blank" rel="noreferrer" className="hover:underline">
                    {personal.github.replace(/^https?:\/\/(www\.)?/, '')}
                  </a>
                </span>
              )}
              {personal.website && (
                <span className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5" style={{ color: theme.primary }} />
                  <a href={personal.website.startsWith('http') ? personal.website : `https://${personal.website}`} target="_blank" rel="noreferrer" className="hover:underline">
                    {personal.website.replace(/^https?:\/\/(www\.)?/, '')}
                  </a>
                </span>
              )}
            </div>
          </div>

          {showPhoto && photo && (
            <div className="shrink-0">
              <img 
                src={photo} 
                alt={personal.fullName} 
                className={`w-20 h-20 sm:w-24 sm:h-24 object-cover border-2 shadow-sm ${getPhotoShapeClass()}`}
                style={{ borderColor: theme.primary }}
              />
            </div>
          )}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2" style={{ color: theme.primary }}>
            <span>Professional Summary</span>
            <div className="flex-1 h-px bg-slate-200"></div>
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 leading-normal text-justify">
            {summary}
          </p>
        </section>
      )}

      {/* Main Grid: Responsive if Landscape */}
      <div className={isLandscape ? 'grid grid-cols-12 gap-7' : 'space-y-5'}>
        {/* Experience Column */}
        <div className={isLandscape ? 'col-span-7 space-y-5' : 'space-y-5'}>
          {experience && experience.length > 0 && (
            <section className="mb-5">
              <h2 className="text-xs font-bold uppercase tracking-wider mb-2.5 flex items-center gap-2" style={{ color: theme.primary }}>
                <span>Work Experience</span>
                <div className="flex-1 h-px bg-slate-200"></div>
              </h2>
              <div className="space-y-4">
                {experience.map((item) => (
                  <div key={item.id} className="text-xs sm:text-sm">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between font-semibold text-slate-900">
                      <div className="flex items-baseline gap-2">
                        <span className="text-sm font-bold text-slate-950">{item.title}</span>
                        <span className="text-slate-500 font-normal">|</span>
                        <span style={{ color: theme.primary }}>{item.company}</span>
                      </div>
                      <span className="text-xs text-slate-500 whitespace-nowrap">
                        {item.startDate} – {item.current ? 'Present' : item.endDate} {item.location ? `• ${item.location}` : ''}
                      </span>
                    </div>
                    {item.highlights && item.highlights.length > 0 && (
                      <ul className="mt-1.5 list-disc list-outside pl-4 space-y-1 text-xs text-slate-700">
                        {item.highlights.filter(Boolean).map((bullet, idx) => (
                          <li key={idx} className="leading-snug">
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

          {/* Projects if Landscape */}
          {isLandscape && projects && projects.length > 0 && (
            <section className="mb-5">
              <h2 className="text-xs font-bold uppercase tracking-wider mb-2.5 flex items-center gap-2" style={{ color: theme.primary }}>
                <span>Key Projects & Contributions</span>
                <div className="flex-1 h-px bg-slate-200"></div>
              </h2>
              <div className="space-y-3">
                {projects.map((proj) => (
                  <div key={proj.id} className="text-xs">
                    <div className="flex items-baseline justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="font-bold text-slate-900">{proj.name}</span>
                        {proj.tech && <span className="text-slate-500 font-mono text-[11px]">[{proj.tech}]</span>}
                      </div>
                      {proj.link && (
                        <a 
                          href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="text-[11px] flex items-center gap-1 hover:underline"
                          style={{ color: theme.primary }}
                        >
                          <span>Link</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </div>
                    {proj.description && (
                      <p className="text-slate-700 mt-0.5 leading-snug">{proj.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right / Secondary Column */}
        <div className={isLandscape ? 'col-span-5 space-y-5' : 'space-y-5'}>
          {/* Skills */}
          {skills && skills.length > 0 && (
            <section className="mb-5">
              <h2 className="text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2" style={{ color: theme.primary }}>
                <span>Core Skills & Technologies</span>
                <div className="flex-1 h-px bg-slate-200"></div>
              </h2>
              <div className="space-y-1.5 text-xs">
                {skills.map((group, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-baseline gap-x-2">
                    <span className="font-bold text-slate-900 min-w-[120px]">{group.category}:</span>
                    <span className="text-slate-700 flex-1">
                      {Array.isArray(group.items) ? group.items.join(' • ') : group.items}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects if Portrait */}
          {!isLandscape && projects && projects.length > 0 && (
            <section className="mb-5">
              <h2 className="text-xs font-bold uppercase tracking-wider mb-2.5 flex items-center gap-2" style={{ color: theme.primary }}>
                <span>Key Projects & Contributions</span>
                <div className="flex-1 h-px bg-slate-200"></div>
              </h2>
              <div className="space-y-3">
                {projects.map((proj) => (
                  <div key={proj.id} className="text-xs">
                    <div className="flex items-baseline justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="font-bold text-slate-900">{proj.name}</span>
                        {proj.tech && <span className="text-slate-500 font-mono text-[11px]">[{proj.tech}]</span>}
                      </div>
                      {proj.link && (
                        <a 
                          href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="text-[11px] flex items-center gap-1 hover:underline"
                          style={{ color: theme.primary }}
                        >
                          <span>Link</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </div>
                    {proj.description && (
                      <p className="text-slate-700 mt-0.5 leading-snug">{proj.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education && education.length > 0 && (
            <section className="mb-5">
              <h2 className="text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2" style={{ color: theme.primary }}>
                <span>Education</span>
                <div className="flex-1 h-px bg-slate-200"></div>
              </h2>
              <div className="space-y-2.5">
                {education.map((edu) => (
                  <div key={edu.id} className="text-xs">
                    <div className="flex flex-col sm:flex-row justify-between font-semibold">
                      <div>
                        <span className="text-slate-900 font-bold">{edu.degree}</span>
                        <span className="text-slate-500"> — {edu.school}</span>
                      </div>
                      <span className="text-slate-500 text-[11px]">
                        {edu.gradYear} {edu.location ? `| ${edu.location}` : ''}
                      </span>
                    </div>
                    {edu.gpa && <div className="text-slate-600 font-medium mt-0.5">GPA: {edu.gpa}</div>}
                    {edu.details && <p className="text-slate-600 mt-0.5 text-[11px] leading-snug">{edu.details}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications & Languages side-by-side */}
          {((certifications && certifications.length > 0) || (languages && languages.length > 0)) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {certifications && certifications.length > 0 && (
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2" style={{ color: theme.primary }}>
                    <span>Certifications</span>
                    <div className="flex-1 h-px bg-slate-200"></div>
                  </h2>
                  <ul className="space-y-1 text-xs text-slate-700">
                    {certifications.map((c) => (
                      <li key={c.id} className="flex justify-between">
                        <span className="font-semibold text-slate-900">{c.name}</span>
                        <span className="text-slate-500 text-[11px]">{c.issuer} {c.year ? `(${c.year})` : ''}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {languages && languages.length > 0 && (
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2" style={{ color: theme.primary }}>
                    <span>Languages</span>
                    <div className="flex-1 h-px bg-slate-200"></div>
                  </h2>
                  <ul className="space-y-1 text-xs text-slate-700">
                    {languages.map((l, idx) => (
                      <li key={idx} className="flex justify-between">
                        <span className="font-semibold text-slate-900">{l.language}</span>
                        <span className="text-slate-500 text-[11px]">{l.proficiency}</span>
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
