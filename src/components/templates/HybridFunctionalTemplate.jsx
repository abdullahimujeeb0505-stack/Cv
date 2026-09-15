import React from 'react';
import { Mail, Phone, MapPin, Globe, ExternalLink, CheckCircle, Briefcase, GraduationCap } from 'lucide-react';
import { Linkedin } from '../Icons';

export default function HybridFunctionalTemplate({ data, theme, font, orientation = 'portrait' }) {
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
      style={{ fontFamily: font.fontFamily || "'Inter', sans-serif" }}
    >
      {/* Header */}
      <header className="border-b-2 pb-5 mb-5 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderColor: theme.primary }}>
        <div className="flex items-center gap-4 text-center sm:text-left">
          {showPhoto && photo && (
            <img 
              src={photo} 
              alt={personal.fullName} 
              className={`w-18 h-18 object-cover border-2 shadow-sm ${getPhotoShapeClass()}`}
              style={{ borderColor: theme.primary }}
            />
          )}
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 uppercase tracking-tight">
              {personal.fullName || 'Candidate Name'}
            </h1>
            <p className="text-sm font-semibold mt-0.5" style={{ color: theme.primary }}>
              {personal.title || 'Functional Consultant & Cross-Discipline Leader'}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-4 gap-y-1 text-xs text-slate-600 font-medium">
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
        <section className="mb-5 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
          <h2 className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: theme.primary }}>
            Career Capability Profile
          </h2>
          <p className="text-xs text-slate-700 leading-relaxed font-normal">
            {summary}
          </p>
        </section>
      )}

      {/* Functional Skill Domains (Highlights Grouped By Competency) */}
      <section className="mb-6">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b pb-1 mb-3" style={{ borderColor: theme.primary }}>
          Core Functional Competencies & Key Achievements
        </h2>

        <div className={`grid ${isLandscape ? 'grid-cols-2 gap-4' : 'grid-cols-1 md:grid-cols-2 gap-4'}`}>
          {skills && skills.map((cat, idx) => (
            <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-2xs">
              <h3 className="text-xs font-bold text-slate-900 mb-1.5 flex items-center gap-1.5" style={{ color: theme.primary }}>
                <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{cat.category}</span>
              </h3>
              <p className="text-[11.5px] text-slate-600 mb-2">
                <strong>Keywords:</strong> {cat.items.join(', ')}
              </p>
              {/* Derive bullet from highlights if available */}
              {experience?.[idx]?.highlights?.[0] && (
                <div className="text-xs text-slate-700 bg-slate-50 p-2 rounded border border-slate-100 italic">
                  "{experience[idx].highlights[0]}"
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Chronological Work History & Education Grid */}
      <div className={`grid ${isLandscape ? 'grid-cols-12 gap-6' : 'grid-cols-1 md:grid-cols-12 gap-6'}`}>
        {/* Work History (Condensed Chronology) */}
        <div className={isLandscape ? 'col-span-8' : 'md:col-span-8'}>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b pb-1 mb-3 flex items-center gap-1.5" style={{ borderColor: theme.primary }}>
            <Briefcase className="w-3.5 h-3.5" style={{ color: theme.primary }} />
            <span>Chronological Employment Record</span>
          </h2>

          <div className="space-y-3">
            {experience && experience.map((exp) => (
              <div key={exp.id} className="text-xs">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-slate-900">{exp.title}</span>
                  <span className="text-[11px] text-slate-500">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <div className="text-slate-600 text-[11px] font-medium">{exp.company} {exp.location && `• ${exp.location}`}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Education & Certs */}
        <div className={isLandscape ? 'col-span-4 space-y-4' : 'md:col-span-4 space-y-4'}>
          {education && education.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b pb-1 mb-2 flex items-center gap-1.5" style={{ borderColor: theme.primary }}>
                <GraduationCap className="w-3.5 h-3.5" style={{ color: theme.primary }} />
                <span>Education</span>
              </h2>
              <div className="space-y-2 text-xs">
                {education.map(e => (
                  <div key={e.id}>
                    <div className="font-bold text-slate-900">{e.degree}</div>
                    <div className="text-[11px] text-slate-600">{e.school} • {e.gradYear}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {certifications && certifications.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b pb-1 mb-2">Certifications</h3>
              <div className="space-y-1 text-xs">
                {certifications.map(c => (
                  <div key={c.id} className="text-[11px] text-slate-700">
                    <strong className="text-slate-900">{c.name}</strong> ({c.year})
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
