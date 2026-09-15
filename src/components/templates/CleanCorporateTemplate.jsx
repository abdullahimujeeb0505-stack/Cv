import React from 'react';
import { Mail, Phone, MapPin, Globe, ExternalLink, Building2, GraduationCap, CheckCircle } from 'lucide-react';
import { Linkedin } from '../Icons';

export default function CleanCorporateTemplate({ data, theme, font, orientation = 'portrait' }) {
  const { personal, summary, experience, education, skills, projects, certifications, languages, photo, showPhoto, photoShape } = data;
  const isLandscape = orientation === 'landscape';

  const getPhotoShapeClass = () => {
    if (photoShape === 'circle') return 'rounded-full';
    if (photoShape === 'rounded') return 'rounded-xl';
    return 'rounded-none';
  };

  return (
    <div 
      className="w-full bg-white text-slate-900 p-8 sm:p-11 leading-relaxed"
      style={{ fontFamily: font.fontFamily || "'Inter', sans-serif" }}
    >
      {/* Top Corporate Header */}
      <header className="border-b-4 pb-5 mb-5" style={{ borderColor: theme.primary }}>
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4">
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
              <h1 className="text-3xl font-black uppercase tracking-tight text-slate-950">
                {personal.fullName || 'Corporate Executive'}
              </h1>
              <p className="text-sm font-bold uppercase tracking-wider mt-0.5" style={{ color: theme.primary }}>
                {personal.title || 'Senior Director of Operations & Enterprise Systems'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-4 gap-y-1.5 text-xs text-slate-600 font-semibold">
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
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-5 bg-slate-50 p-3.5 rounded-lg border border-slate-200">
          <h2 className="text-[11px] font-black uppercase tracking-wider text-slate-800 mb-1" style={{ color: theme.primary }}>
            Executive Overview
          </h2>
          <p className="text-xs text-slate-700 leading-relaxed font-normal">
            {summary}
          </p>
        </section>
      )}

      {/* Main Grid */}
      <div className={`grid ${isLandscape ? 'grid-cols-12 gap-7' : 'grid-cols-1 md:grid-cols-12 gap-6'}`}>
        {/* Left Column: Experience (8 cols) */}
        <div className={isLandscape ? 'col-span-8 space-y-5' : 'md:col-span-8 space-y-5'}>
          {experience && experience.length > 0 && (
            <section>
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b-2 pb-1 mb-3 flex items-center gap-2" style={{ borderColor: theme.primary }}>
                <Building2 className="w-4 h-4" style={{ color: theme.primary }} />
                <span>Professional Experience</span>
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
                    <div className="text-xs font-semibold mb-1" style={{ color: theme.primary }}>
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

          {projects && projects.length > 0 && (
            <section>
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b-2 pb-1 mb-3 flex items-center gap-2" style={{ borderColor: theme.primary }}>
                <CheckCircle className="w-4 h-4" style={{ color: theme.primary }} />
                <span>Key Enterprise Programs & Deliverables</span>
              </h2>

              <div className="space-y-2.5">
                {projects.map(p => (
                  <div key={p.id} className="text-xs">
                    <div className="font-bold text-slate-900">{p.name}</div>
                    {p.tech && <div className="text-[10px] text-slate-500">{p.tech}</div>}
                    <p className="text-[11.5px] text-slate-600 mt-0.5">{p.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column: Skills & Education (4 cols) */}
        <div className={isLandscape ? 'col-span-4 space-y-5' : 'md:col-span-4 space-y-5'}>
          {skills && skills.length > 0 && (
            <section className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-2.5">Core Competencies</h3>
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
            <section className="bg-slate-50 p-4 rounded-lg border border-slate-200">
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
            <section className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-2">Certifications</h3>
              <div className="space-y-1.5 text-xs">
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
