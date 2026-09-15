import React from 'react';
import { Terminal, Globe, Mail, Phone, MapPin, ExternalLink, Code } from 'lucide-react';
import { Linkedin, Github } from '../Icons';

export default function TechTerminalTemplate({ data, theme, font }) {
  const { personal, summary, experience, education, skills, projects, certifications, languages, photo, showPhoto, photoShape } = data;

  const getPhotoShapeClass = () => {
    if (photoShape === 'circle') return 'rounded-full';
    if (photoShape === 'rounded') return 'rounded-lg';
    return 'rounded-none';
  };

  return (
    <div 
      className="w-full bg-white text-slate-800 p-8 sm:p-10 leading-normal"
      style={{ fontFamily: font.fontFamily || "'JetBrains Mono', monospace" }}
    >
      {/* Top Banner Bar */}
      <div className="flex items-center justify-between pb-3 mb-5 border-b-2" style={{ borderColor: theme.primary }}>
        <div className="flex items-center gap-2">
          <Terminal className="w-5 h-5" style={{ color: theme.primary }} />
          <span className="text-xs font-mono font-semibold tracking-wider text-slate-500 uppercase">
            ~/developer-profile/resume.json
          </span>
        </div>
        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600">
          status: active
        </span>
      </div>

      {/* Header Info */}
      <header className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-mono text-slate-950">
            {personal.fullName || 'Dev Name'}
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm font-semibold font-mono" style={{ color: theme.primary }}>
              &gt; {personal.title || 'Full Stack Engineer'}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 font-mono text-xs text-slate-600">
            {personal.email && (
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <a href={`mailto:${personal.email}`} className="hover:underline">{personal.email}</a>
              </span>
            )}
            {personal.location && (
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{personal.location}</span>
              </span>
            )}
            {personal.github && (
              <span className="flex items-center gap-1.5">
                <Github className="w-3.5 h-3.5 text-slate-400" />
                <a href={personal.github.startsWith('http') ? personal.github : `https://${personal.github}`} target="_blank" rel="noreferrer" className="hover:underline">
                  {personal.github.replace(/^https?:\/\/(www\.)?/, '')}
                </a>
              </span>
            )}
            {personal.linkedin && (
              <span className="flex items-center gap-1.5">
                <Linkedin className="w-3.5 h-3.5 text-slate-400" />
                <a href={personal.linkedin.startsWith('http') ? personal.linkedin : `https://${personal.linkedin}`} target="_blank" rel="noreferrer" className="hover:underline">
                  {personal.linkedin.replace(/^https?:\/\/(www\.)?/, '')}
                </a>
              </span>
            )}
            {personal.website && (
              <span className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-slate-400" />
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
              className={`w-20 h-20 object-cover border-2 shadow-xs ${getPhotoShapeClass()}`}
              style={{ borderColor: theme.primary }}
            />
          </div>
        )}
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-5 p-3 rounded-md bg-slate-50 border border-slate-200">
          <div className="text-[11px] font-mono text-slate-400 mb-1">// overview</div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
            {summary}
          </p>
        </section>
      )}

      {/* Skills Matrix */}
      {skills && skills.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider mb-2 flex items-center gap-2" style={{ color: theme.primary }}>
            <span>// skills_matrix</span>
            <div className="flex-1 h-px bg-slate-200"></div>
          </h2>
          <div className="space-y-1.5 text-xs font-mono">
            {skills.map((cat, idx) => (
              <div key={idx} className="flex flex-wrap items-baseline gap-1.5">
                <span className="font-bold text-slate-900 min-w-[130px]">{cat.category}:</span>
                <div className="flex flex-wrap gap-1 flex-1">
                  {(Array.isArray(cat.items) ? cat.items : [cat.items]).map((skill, sIdx) => (
                    <span key={sIdx} className="px-2 py-0.5 rounded text-[11px] bg-slate-100 text-slate-800 border border-slate-200">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider mb-2.5 flex items-center gap-2" style={{ color: theme.primary }}>
            <span>// employment_history</span>
            <div className="flex-1 h-px bg-slate-200"></div>
          </h2>
          <div className="space-y-4">
            {experience.map((item) => (
              <div key={item.id} className="text-xs">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between font-mono font-bold text-slate-900">
                  <div className="text-sm">
                    <span>{item.title}</span>
                    <span className="text-slate-400 font-normal"> @ </span>
                    <span style={{ color: theme.primary }}>{item.company}</span>
                  </div>
                  <span className="text-xs text-slate-500 font-normal">
                    [{item.startDate} &rarr; {item.current ? 'current' : item.endDate}]
                  </span>
                </div>
                {item.highlights && item.highlights.length > 0 && (
                  <ul className="mt-1.5 space-y-1 font-sans text-xs text-slate-700">
                    {item.highlights.filter(Boolean).map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="font-mono text-slate-400">&gt;</span>
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

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider mb-2.5 flex items-center gap-2" style={{ color: theme.primary }}>
            <span>// projects_and_open_source</span>
            <div className="flex-1 h-px bg-slate-200"></div>
          </h2>
          <div className="space-y-3">
            {projects.map((proj) => (
              <div key={proj.id} className="p-2.5 rounded bg-slate-50/80 border border-slate-200 text-xs">
                <div className="flex items-baseline justify-between font-mono">
                  <div className="flex items-baseline gap-2">
                    <span className="font-bold text-slate-900">{proj.name}</span>
                    {proj.tech && <span className="text-slate-500 text-[10px]">[{proj.tech}]</span>}
                  </div>
                  {proj.link && (
                    <a href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} target="_blank" rel="noreferrer" className="text-[11px] flex items-center gap-1 hover:underline" style={{ color: theme.primary }}>
                      <span>deploy</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  )}
                </div>
                {proj.description && (
                  <p className="mt-1 text-slate-600 font-sans leading-snug">{proj.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education & Certs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {education && education.length > 0 && (
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider mb-2" style={{ color: theme.primary }}>
              // education
            </h2>
            <div className="space-y-2 text-xs">
              {education.map((edu) => (
                <div key={edu.id} className="font-sans">
                  <div className="font-bold text-slate-900">{edu.degree}</div>
                  <div className="text-slate-600 text-[11px] font-mono">{edu.school} • {edu.gradYear}</div>
                  {edu.details && <div className="text-slate-500 text-[11px] mt-0.5">{edu.details}</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {certifications && certifications.length > 0 && (
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider mb-2" style={{ color: theme.primary }}>
              // certifications
            </h2>
            <div className="space-y-1.5 text-xs font-sans">
              {certifications.map((c) => (
                <div key={c.id} className="flex justify-between items-baseline">
                  <span className="font-medium text-slate-800">{c.name}</span>
                  <span className="font-mono text-[10px] text-slate-500">{c.year}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
