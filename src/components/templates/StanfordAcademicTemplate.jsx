import React from 'react';
import { Mail, Phone, MapPin, Globe, ExternalLink, BookOpen, Award, GraduationCap } from 'lucide-react';
import { Linkedin } from '../Icons';

export default function StanfordAcademicTemplate({ data, theme, font, orientation = 'portrait' }) {
  const { personal, summary, experience, education, skills, projects, certifications, languages, photo, showPhoto } = data;
  const isLandscape = orientation === 'landscape';

  return (
    <div 
      className="w-full bg-white text-slate-900 p-8 sm:p-12 leading-relaxed"
      style={{ fontFamily: font.fontFamily || "'Merriweather', 'Times New Roman', serif" }}
    >
      {/* Header */}
      <header className="text-center pb-6 border-b-2 mb-6" style={{ borderColor: theme.primary }}>
        <h1 className="text-3xl font-serif font-bold text-slate-950 tracking-wide uppercase">
          {personal.fullName || 'Academic Full Name, Ph.D.'}
        </h1>
        <p className="text-base font-serif italic text-slate-700 mt-1">
          {personal.title || 'Professor of Science & Research Fellow'}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 mt-3 text-xs text-slate-600 font-sans">
          {personal.location && <span>{personal.location}</span>}
          {personal.email && <span>• <a href={`mailto:${personal.email}`} className="hover:underline">{personal.email}</a></span>}
          {personal.phone && <span>• {personal.phone}</span>}
          {personal.website && <span>• <a href={`https://${personal.website}`} target="_blank" rel="noreferrer" className="hover:underline">{personal.website}</a></span>}
          {personal.linkedin && <span>• <a href={personal.linkedin.startsWith('http') ? personal.linkedin : `https://${personal.linkedin}`} target="_blank" rel="noreferrer" className="hover:underline">LinkedIn</a></span>}
        </div>
      </header>

      {/* Research Statement / Summary */}
      {summary && (
        <section className="mb-6">
          <h2 className="text-xs font-sans font-bold uppercase tracking-widest text-slate-700 mb-2 border-b pb-1" style={{ borderColor: theme.border }}>
            Research Interests & Executive Profile
          </h2>
          <p className="text-xs leading-relaxed text-slate-800 font-serif">
            {summary}
          </p>
        </section>
      )}

      {/* Main Sections */}
      <div className={`space-y-6 ${isLandscape ? 'grid grid-cols-2 gap-8 space-y-0' : ''}`}>
        {/* Education (Prominent in Academic CV) */}
        {education && education.length > 0 && (
          <section>
            <h2 className="text-xs font-sans font-bold uppercase tracking-widest text-slate-700 mb-3 border-b pb-1" style={{ borderColor: theme.border }}>
              Academic Appointments & Education
            </h2>
            <div className="space-y-3 font-serif">
              {education.map((edu) => (
                <div key={edu.id} className="text-xs">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-950">{edu.degree}</span>
                    <span className="font-sans text-[11px] text-slate-600 font-medium">{edu.gradYear}</span>
                  </div>
                  <div className="text-slate-700 italic">{edu.school}, {edu.location}</div>
                  {edu.details && <p className="text-[11.5px] text-slate-600 mt-0.5">{edu.details}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience / Positions Held */}
        {experience && experience.length > 0 && (
          <section>
            <h2 className="text-xs font-sans font-bold uppercase tracking-widest text-slate-700 mb-3 border-b pb-1" style={{ borderColor: theme.border }}>
              Professional Experience & Research Posts
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id} className="text-xs">
                  <div className="flex justify-between items-baseline font-serif">
                    <span className="font-bold text-slate-950">{exp.title}</span>
                    <span className="font-sans text-[11px] text-slate-600 font-medium">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                  <div className="italic text-slate-700 mb-1">{exp.company}, {exp.location}</div>
                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul className="list-disc list-inside space-y-1 text-slate-700 text-[11.5px]">
                      {exp.highlights.filter(Boolean).map((h, idx) => (
                        <li key={idx} className="pl-1 leading-relaxed">{h}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Research Grants / Projects / Publications */}
        {projects && projects.length > 0 && (
          <section>
            <h2 className="text-xs font-sans font-bold uppercase tracking-widest text-slate-700 mb-3 border-b pb-1" style={{ borderColor: theme.border }}>
              Publications, Grants & Select Projects
            </h2>
            <div className="space-y-3">
              {projects.map((proj) => (
                <div key={proj.id} className="text-xs">
                  <div className="font-serif font-bold text-slate-900">{proj.name}</div>
                  {proj.tech && <div className="text-[11px] font-sans text-slate-500 italic mb-0.5">Methodology: {proj.tech}</div>}
                  <p className="text-slate-700 text-[11.5px] font-serif leading-relaxed">{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Honors, Certifications & Fellowships */}
        {((certifications && certifications.length > 0) || (skills && skills.length > 0)) && (
          <section>
            <h2 className="text-xs font-sans font-bold uppercase tracking-widest text-slate-700 mb-3 border-b pb-1" style={{ borderColor: theme.border }}>
              Fellowships, Certifications & Skills
            </h2>
            {certifications && certifications.length > 0 && (
              <div className="space-y-1 text-xs mb-3 font-serif">
                {certifications.map((c) => (
                  <div key={c.id} className="flex justify-between">
                    <span>• {c.name} ({c.issuer})</span>
                    <span className="font-sans text-slate-500">{c.year}</span>
                  </div>
                ))}
              </div>
            )}

            {skills && skills.length > 0 && (
              <div className="space-y-1 text-xs">
                {skills.map((s, idx) => (
                  <div key={idx} className="text-[11.5px]">
                    <strong className="text-slate-800 font-sans">{s.category}:</strong>{' '}
                    <span className="text-slate-700 font-serif">{s.items.join(', ')}</span>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
