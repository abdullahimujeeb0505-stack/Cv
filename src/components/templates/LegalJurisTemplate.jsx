import React from 'react';
import { Mail, Phone, MapPin, Scale, BookMarked, ShieldCheck } from 'lucide-react';
import { Linkedin } from '../Icons';

export default function LegalJurisTemplate({ data, theme, font, orientation = 'portrait' }) {
  const { personal, summary, experience, education, skills, projects, certifications, languages, photo, showPhoto } = data;
  const isLandscape = orientation === 'landscape';

  return (
    <div 
      className="w-full bg-white text-slate-900 p-8 sm:p-12 leading-relaxed"
      style={{ fontFamily: font.fontFamily || "'Merriweather', 'Garamond', serif" }}
    >
      {/* Header */}
      <header className="border-b-2 border-slate-900 pb-5 mb-5 text-center">
        <h1 className="text-2xl sm:text-3xl font-serif font-black uppercase tracking-wider text-slate-950">
          {personal.fullName || 'Attorney Full Name, Esq.'}
        </h1>
        <p className="text-xs sm:text-sm font-sans tracking-[0.18em] uppercase text-slate-700 mt-1 font-semibold">
          {personal.title || 'Partner • Corporate Litigation & Regulatory Compliance'}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 mt-3 font-sans text-xs text-slate-600">
          {personal.location && <span>{personal.location}</span>}
          {personal.email && (
            <span>• <a href={`mailto:${personal.email}`} className="hover:underline">{personal.email}</a></span>
          )}
          {personal.phone && <span>• {personal.phone}</span>}
          {personal.linkedin && (
            <span>• <a href={personal.linkedin.startsWith('http') ? personal.linkedin : `https://${personal.linkedin}`} target="_blank" rel="noreferrer" className="hover:underline">LinkedIn</a></span>
          )}
        </div>
      </header>

      {/* Bar Admissions / Licenses Strip */}
      {certifications && certifications.length > 0 && (
        <div className="mb-5 border border-slate-300 p-3 bg-slate-50 text-xs font-sans">
          <div className="font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5 mb-1 text-[11px]">
            <Scale className="w-3.5 h-3.5 text-slate-700" />
            <span>Bar Admissions & Professional Accreditations</span>
          </div>
          <div className="text-slate-700 flex flex-wrap gap-x-4">
            {certifications.map(c => (
              <span key={c.id}>• {c.name} ({c.issuer}, {c.year})</span>
            ))}
          </div>
        </div>
      )}

      {/* Legal Summary */}
      {summary && (
        <section className="mb-5 text-xs text-slate-800 leading-relaxed font-serif text-justify">
          <h2 className="font-sans text-[11px] font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 mb-2">
            Practice Overview
          </h2>
          <p>{summary}</p>
        </section>
      )}

      {/* Content Columns */}
      <div className={`space-y-5 ${isLandscape ? 'grid grid-cols-2 gap-8 space-y-0' : ''}`}>
        {/* Legal Experience */}
        {experience && experience.length > 0 && (
          <section>
            <h2 className="font-sans text-[11px] font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 mb-3">
              Legal Experience & Firm Appointments
            </h2>

            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id} className="text-xs">
                  <div className="flex justify-between items-baseline font-serif">
                    <span className="font-bold text-slate-950 text-sm">{exp.title}</span>
                    <span className="font-sans text-[11px] text-slate-600 font-medium">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                  <div className="font-sans text-xs text-slate-700 italic mb-1.5">{exp.company}, {exp.location}</div>

                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul className="list-disc list-inside space-y-1 text-slate-800 text-[11.5px] leading-relaxed">
                      {exp.highlights.filter(Boolean).map((h, i) => (
                        <li key={i} className="pl-0.5">{h}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education (JD, Law Review) */}
        {education && education.length > 0 && (
          <section>
            <h2 className="font-sans text-[11px] font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 mb-3">
              Legal Education & Honors
            </h2>
            <div className="space-y-3 text-xs">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-950 font-serif">{edu.degree}</span>
                    <span className="font-sans text-[11px] text-slate-600">{edu.gradYear}</span>
                  </div>
                  <div className="text-slate-700 italic">{edu.school}, {edu.location}</div>
                  {edu.details && <div className="text-[11px] text-slate-600 mt-0.5">{edu.details}</div>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Representative Matters / Cases */}
        {projects && projects.length > 0 && (
          <section>
            <h2 className="font-sans text-[11px] font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 mb-3">
              Representative Matters & Published Decisions
            </h2>
            <div className="space-y-2.5 text-xs">
              {projects.map((p) => (
                <div key={p.id}>
                  <div className="font-bold text-slate-900 font-serif">{p.name}</div>
                  {p.tech && <div className="font-sans text-[10px] text-slate-500 italic">{p.tech}</div>}
                  <p className="text-slate-700 text-[11.5px] mt-0.5">{p.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Practice Areas / Skills */}
        {skills && skills.length > 0 && (
          <section>
            <h2 className="font-sans text-[11px] font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 mb-2">
              Practice Areas & Jurisdictions
            </h2>
            <div className="space-y-1 text-xs">
              {skills.map((s, idx) => (
                <div key={idx} className="text-[11.5px]">
                  <strong className="font-sans text-slate-800">{s.category}:</strong>{' '}
                  <span className="text-slate-700 font-serif">{s.items.join(' • ')}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
