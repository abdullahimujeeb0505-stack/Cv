import React from 'react';
import { Mail, Phone, MapPin, Globe, ExternalLink, Calendar, Milestone, Compass } from 'lucide-react';
import { Linkedin } from '../Icons';

export default function TimelineJourneyTemplate({ data, theme, font, orientation = 'portrait' }) {
  const { personal, summary, experience, education, skills, projects, certifications, languages, photo, showPhoto, photoShape } = data;
  const isLandscape = orientation === 'landscape';

  const getPhotoShapeClass = () => {
    if (photoShape === 'circle') return 'rounded-full';
    if (photoShape === 'rounded') return 'rounded-2xl';
    return 'rounded-none';
  };

  return (
    <div 
      className="w-full bg-white text-slate-800 p-8 sm:p-11 leading-relaxed"
      style={{ fontFamily: font.fontFamily || "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* Header */}
      <header className="border-b pb-6 mb-6 flex flex-col sm:flex-row items-center justify-between gap-5" style={{ borderColor: theme.border }}>
        <div className="flex items-center gap-4 text-center sm:text-left">
          {showPhoto && photo && (
            <img 
              src={photo} 
              alt={personal.fullName} 
              className={`w-20 h-20 object-cover border-2 shadow-sm ${getPhotoShapeClass()}`}
              style={{ borderColor: theme.primary }}
            />
          )}
          <div>
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <Compass className="w-4 h-4" style={{ color: theme.primary }} />
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Career Trajectory</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight mt-0.5">
              {personal.fullName || 'Candidate Full Name'}
            </h1>
            <p className="text-sm font-semibold mt-0.5" style={{ color: theme.primary }}>
              {personal.title || 'Senior Career Specialist'}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-4 gap-y-1.5 text-xs text-slate-600 font-medium">
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
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-6 bg-slate-50 p-4 rounded-xl border border-slate-200">
          <p className="text-xs text-slate-700 leading-relaxed font-normal">
            {summary}
          </p>
        </section>
      )}

      {/* Main Grid */}
      <div className={`grid ${isLandscape ? 'grid-cols-12 gap-8' : 'grid-cols-1 md:grid-cols-12 gap-6'}`}>
        {/* Left Column: Visual Career Timeline (8 cols) */}
        <div className={isLandscape ? 'col-span-8' : 'md:col-span-8'}>
          {experience && experience.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4 flex items-center gap-2">
                <Milestone className="w-4 h-4" style={{ color: theme.primary }} />
                <span>Career Milestones & Chronology</span>
              </h2>

              <div className="relative border-l-2 ml-3 pl-6 space-y-6" style={{ borderColor: theme.primary }}>
                {experience.map((exp, idx) => (
                  <div key={exp.id} className="relative group">
                    {/* Circle Node */}
                    <div 
                      className="absolute -left-[31px] top-0 w-3.5 h-3.5 rounded-full border-2 border-white shadow-sm flex items-center justify-center"
                      style={{ backgroundColor: theme.primary }}
                    ></div>

                    <div className="flex justify-between items-baseline flex-wrap">
                      <span className="font-bold text-sm text-slate-950">{exp.title}</span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                        {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>

                    <div className="text-xs font-semibold mt-0.5 mb-2" style={{ color: theme.primary }}>
                      {exp.company} {exp.location && `• ${exp.location}`}
                    </div>

                    {exp.highlights && exp.highlights.length > 0 && (
                      <ul className="space-y-1 text-xs text-slate-700">
                        {exp.highlights.filter(Boolean).map((h, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-slate-400">•</span>
                            <span className="leading-snug">{h}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Project Timeline Milestones */}
          {projects && projects.length > 0 && (
            <section className="mt-6">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b pb-1.5 mb-3">
                Key Initiatives
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {projects.map(p => (
                  <div key={p.id} className="p-3 rounded-xl border border-slate-200 bg-white shadow-2xs">
                    <div className="font-bold text-xs text-slate-900">{p.name}</div>
                    {p.tech && <div className="text-[10px] text-blue-600 font-mono mt-0.5">{p.tech}</div>}
                    <p className="text-[11px] text-slate-600 mt-1">{p.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column: Skills, Education, Certifications (4 cols) */}
        <div className={isLandscape ? 'col-span-4 space-y-5' : 'md:col-span-4 space-y-5'}>
          {skills && skills.length > 0 && (
            <section className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2.5">Competencies</h3>
              <div className="space-y-2.5 text-xs">
                {skills.map((s, idx) => (
                  <div key={idx}>
                    <div className="font-bold text-slate-800 text-[11px] mb-1">{s.category}</div>
                    <div className="flex flex-wrap gap-1">
                      {s.items.map((it, iIdx) => (
                        <span key={iIdx} className="text-[10.5px] px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700">
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
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">Education Journey</h3>
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

          {certifications && certifications.length > 0 && (
            <section className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">Accreditations</h3>
              <div className="space-y-1 text-xs">
                {certifications.map(c => (
                  <div key={c.id} className="text-[11px]">
                    <div className="font-semibold text-slate-800">{c.name}</div>
                    <div className="text-slate-500 text-[10px]">{c.issuer} • {c.year}</div>
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
