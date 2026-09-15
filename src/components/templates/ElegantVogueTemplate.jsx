import React from 'react';
import { Mail, Phone, MapPin, Globe, ExternalLink } from 'lucide-react';
import { Linkedin } from '../Icons';

export default function ElegantVogueTemplate({ data, theme, font, orientation = 'portrait' }) {
  const { personal, summary, experience, education, skills, projects, certifications, languages, photo, showPhoto, photoShape } = data;
  const isLandscape = orientation === 'landscape';

  const getPhotoShapeClass = () => {
    if (photoShape === 'circle') return 'rounded-full';
    if (photoShape === 'rounded') return 'rounded-2xl';
    return 'rounded-none';
  };

  return (
    <div 
      className="w-full bg-[#fdfdfc] text-slate-900 p-8 sm:p-12 leading-relaxed border-[12px] border-[#f4f4f2]"
      style={{ fontFamily: font.fontFamily || "'Cormorant Garamond', 'Didot', serif" }}
    >
      {/* Header */}
      <header className="text-center pb-8 border-b border-slate-300 mb-8">
        {showPhoto && photo && (
          <div className="flex justify-center mb-4">
            <img 
              src={photo} 
              alt={personal.fullName} 
              className={`w-24 h-24 object-cover grayscale contrast-125 border border-slate-400 ${getPhotoShapeClass()}`}
            />
          </div>
        )}

        <div className="text-[10px] tracking-[0.3em] font-sans uppercase text-slate-500 mb-2">Curriculum Vitae</div>
        <h1 className="text-3xl sm:text-4xl font-light tracking-[0.15em] uppercase text-slate-950 font-serif">
          {personal.fullName || 'Editorial Candidate'}
        </h1>
        <p className="text-sm font-sans tracking-[0.2em] uppercase mt-2 text-slate-600 font-medium">
          {personal.title || 'Creative Director & Brand Strategist'}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 mt-4 text-[11px] font-sans tracking-wider uppercase text-slate-500">
          {personal.location && <span>{personal.location}</span>}
          {personal.email && (
            <span>• <a href={`mailto:${personal.email}`} className="hover:text-black transition-colors">{personal.email}</a></span>
          )}
          {personal.phone && <span>• {personal.phone}</span>}
          {personal.website && (
            <span>• <a href={`https://${personal.website}`} target="_blank" rel="noreferrer" className="hover:text-black transition-colors">{personal.website}</a></span>
          )}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="max-w-2xl mx-auto text-center mb-8 pb-6 border-b border-slate-200">
          <p className="text-sm sm:text-base italic text-slate-700 leading-relaxed font-serif">
            "{summary}"
          </p>
        </section>
      )}

      {/* Main Grid */}
      <div className={`grid ${isLandscape ? 'grid-cols-2 gap-10' : 'grid-cols-1 md:grid-cols-12 gap-8'}`}>
        {/* Left (Experience & Projects) */}
        <div className={isLandscape ? 'space-y-7' : 'md:col-span-8 space-y-7'}>
          {experience && experience.length > 0 && (
            <section>
              <h2 className="text-xs font-sans tracking-[0.25em] uppercase font-bold text-slate-800 pb-2 mb-4 border-b border-slate-300">
                Professional Experience
              </h2>

              <div className="space-y-5">
                {experience.map((exp) => (
                  <div key={exp.id} className="text-xs">
                    <div className="flex justify-between items-baseline font-serif">
                      <span className="text-base font-semibold text-slate-950">{exp.title}</span>
                      <span className="font-sans text-[10px] tracking-widest text-slate-500 uppercase">{exp.startDate} — {exp.current ? 'Present' : exp.endDate}</span>
                    </div>
                    <div className="font-sans text-[11px] uppercase tracking-wider text-slate-600 mb-2 font-medium">
                      {exp.company} {exp.location && `• ${exp.location}`}
                    </div>
                    {exp.highlights && exp.highlights.length > 0 && (
                      <ul className="space-y-1 text-slate-700 text-xs font-serif leading-relaxed">
                        {exp.highlights.filter(Boolean).map((h, i) => (
                          <li key={i} className="pl-3 relative before:content-['—'] before:absolute before:left-0 before:text-slate-400">
                            {h}
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
              <h2 className="text-xs font-sans tracking-[0.25em] uppercase font-bold text-slate-800 pb-2 mb-4 border-b border-slate-300">
                Selected Works & Exhibitions
              </h2>
              <div className="space-y-3">
                {projects.map((p) => (
                  <div key={p.id} className="text-xs">
                    <div className="font-serif font-semibold text-slate-900 text-sm">{p.name}</div>
                    {p.tech && <div className="font-sans text-[10px] uppercase tracking-wider text-slate-500 mb-1">{p.tech}</div>}
                    <p className="font-serif text-slate-700 leading-relaxed">{p.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right (Education, Skills, Accreditations) */}
        <div className={isLandscape ? 'space-y-7' : 'md:col-span-4 space-y-7'}>
          {skills && skills.length > 0 && (
            <section>
              <h2 className="text-xs font-sans tracking-[0.25em] uppercase font-bold text-slate-800 pb-2 mb-4 border-b border-slate-300">
                Core Disciplines
              </h2>
              <div className="space-y-3 font-sans text-xs">
                {skills.map((s, i) => (
                  <div key={i}>
                    <div className="text-[11px] font-bold text-slate-800 uppercase tracking-wider mb-1">{s.category}</div>
                    <div className="text-slate-600 text-[11.5px] leading-relaxed font-serif italic">
                      {s.items.join(' • ')}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {education && education.length > 0 && (
            <section>
              <h2 className="text-xs font-sans tracking-[0.25em] uppercase font-bold text-slate-800 pb-2 mb-4 border-b border-slate-300">
                Education
              </h2>
              <div className="space-y-3 font-serif text-xs">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="font-semibold text-slate-900 text-sm">{edu.degree}</div>
                    <div className="font-sans text-[11px] text-slate-600 uppercase tracking-wider">{edu.school}</div>
                    <div className="font-sans text-[10px] text-slate-500">{edu.gradYear}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {certifications && certifications.length > 0 && (
            <section>
              <h2 className="text-xs font-sans tracking-[0.25em] uppercase font-bold text-slate-800 pb-2 mb-4 border-b border-slate-300">
                Distinctions
              </h2>
              <div className="space-y-2 font-serif text-xs">
                {certifications.map((c) => (
                  <div key={c.id}>
                    <div className="font-semibold text-slate-900">{c.name}</div>
                    <div className="font-sans text-[10px] text-slate-500 uppercase tracking-wider">{c.issuer} • {c.year}</div>
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
