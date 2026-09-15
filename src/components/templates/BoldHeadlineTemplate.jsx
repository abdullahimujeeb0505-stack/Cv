import React from 'react';
import { Mail, Phone, MapPin, Globe, ExternalLink, Target, Sparkles, Award } from 'lucide-react';
import { Linkedin } from '../Icons';

export default function BoldHeadlineTemplate({ data, theme, font, orientation = 'portrait' }) {
  const { personal, summary, experience, education, skills, projects, certifications, languages, photo, showPhoto, photoShape } = data;
  const isLandscape = orientation === 'landscape';

  const getPhotoShapeClass = () => {
    if (photoShape === 'circle') return 'rounded-full';
    if (photoShape === 'rounded') return 'rounded-2xl';
    return 'rounded-md';
  };

  return (
    <div 
      className="w-full bg-white text-slate-800 leading-relaxed"
      style={{ fontFamily: font.fontFamily || "'Poppins', sans-serif" }}
    >
      {/* Bold Full-Width Banner */}
      <div 
        className="p-8 sm:p-10 text-white shadow-md"
        style={{ backgroundColor: theme.primary }}
      >
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
          <div className="flex items-center gap-5 text-center sm:text-left">
            {showPhoto && photo && (
              <img 
                src={photo} 
                alt={personal.fullName} 
                className={`w-24 h-24 object-cover border-4 border-white/20 shadow-xl shrink-0 ${getPhotoShapeClass()}`}
              />
            )}
            <div>
              <span className="text-[10px] uppercase font-black tracking-widest px-2.5 py-1 rounded bg-black/20 text-white/90">
                Career Portfolio
              </span>
              <h1 className="text-3xl sm:text-4xl font-black mt-2 tracking-tight uppercase leading-tight">
                {personal.fullName || 'Leader Full Name'}
              </h1>
              <p className="text-base font-semibold text-white/90 mt-1">
                {personal.title || 'Chief Marketing Officer & Growth Strategist'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-4 gap-y-1.5 text-xs text-white/90 font-medium">
            {personal.email && (
              <span className="flex items-center gap-1.5 bg-black/15 px-3 py-1 rounded-lg">
                <Mail className="w-3.5 h-3.5" />
                <a href={`mailto:${personal.email}`} className="hover:underline">{personal.email}</a>
              </span>
            )}
            {personal.phone && (
              <span className="flex items-center gap-1.5 bg-black/15 px-3 py-1 rounded-lg">
                <Phone className="w-3.5 h-3.5" />
                <span>{personal.phone}</span>
              </span>
            )}
            {personal.location && (
              <span className="flex items-center gap-1.5 bg-black/15 px-3 py-1 rounded-lg">
                <MapPin className="w-3.5 h-3.5" />
                <span>{personal.location}</span>
              </span>
            )}
          </div>
        </div>

        {/* Highlight Executive Value Statement */}
        {summary && (
          <div className="mt-5 pt-4 border-t border-white/20">
            <p className="text-xs sm:text-sm text-white/95 leading-relaxed font-normal">
              {summary}
            </p>
          </div>
        )}
      </div>

      {/* Main Body */}
      <div className={`p-8 sm:p-10 grid ${isLandscape ? 'grid-cols-12 gap-8' : 'grid-cols-1 md:grid-cols-12 gap-6'}`}>
        {/* Left Column (8 cols) */}
        <div className={isLandscape ? 'col-span-8 space-y-6' : 'md:col-span-8 space-y-6'}>
          {experience && experience.length > 0 && (
            <section>
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b-2 pb-1.5 mb-4 flex items-center gap-2" style={{ borderColor: theme.primary }}>
                <Target className="w-4 h-4" style={{ color: theme.primary }} />
                <span>Leadership & Career Milestones</span>
              </h2>

              <div className="space-y-5">
                {experience.map((exp) => (
                  <div key={exp.id} className="text-xs">
                    <div className="flex justify-between items-baseline flex-wrap">
                      <span className="font-bold text-sm text-slate-950">{exp.title}</span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <div className="text-xs font-bold mt-0.5 mb-2" style={{ color: theme.primary }}>
                      {exp.company} {exp.location && `• ${exp.location}`}
                    </div>

                    {exp.highlights && exp.highlights.length > 0 && (
                      <ul className="space-y-1.5 text-xs text-slate-700">
                        {exp.highlights.filter(Boolean).map((h, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-indigo-600 font-bold">▪</span>
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

          {projects && projects.length > 0 && (
            <section>
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b-2 pb-1.5 mb-3 flex items-center gap-2" style={{ borderColor: theme.primary }}>
                <Sparkles className="w-4 h-4" style={{ color: theme.primary }} />
                <span>Key Campaigns & Deliverables</span>
              </h2>
              <div className="space-y-3">
                {projects.map((p) => (
                  <div key={p.id} className="p-3 rounded-xl border border-slate-200 bg-slate-50/50">
                    <div className="font-bold text-xs text-slate-900">{p.name}</div>
                    {p.tech && <div className="text-[10px] text-blue-600 font-medium mt-0.5">{p.tech}</div>}
                    <p className="text-[11.5px] text-slate-600 mt-1">{p.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column (4 cols) */}
        <div className={isLandscape ? 'col-span-4 space-y-6' : 'md:col-span-4 space-y-6'}>
          {skills && skills.length > 0 && (
            <section className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-3">Core Competencies</h3>
              <div className="space-y-3 text-xs">
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

          {certifications && certifications.length > 0 && (
            <section className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-2">Certifications</h3>
              <div className="space-y-1.5 text-xs">
                {certifications.map(c => (
                  <div key={c.id} className="text-[11px]">
                    <div className="font-semibold text-slate-800">{c.name}</div>
                    <div className="text-slate-500 text-[10px]">{c.issuer}</div>
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
