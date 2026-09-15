import React from 'react';
import { Mail, Phone, MapPin, Globe, ExternalLink } from 'lucide-react';
import { Linkedin } from '../Icons';

export default function SwissInternationalTemplate({ data, theme, font, orientation = 'portrait' }) {
  const { personal, summary, experience, education, skills, projects, certifications, languages, photo, showPhoto, photoShape } = data;
  const isLandscape = orientation === 'landscape';

  const getPhotoShapeClass = () => {
    if (photoShape === 'circle') return 'rounded-full';
    if (photoShape === 'rounded') return 'rounded-xl';
    return 'rounded-none';
  };

  return (
    <div 
      className="w-full bg-white text-slate-900 p-8 sm:p-12 leading-relaxed"
      style={{ fontFamily: font.fontFamily || "'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}
    >
      {/* Swiss Header Grid */}
      <header className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-8 border-b-2 border-black mb-8 items-end">
        <div className="md:col-span-8 flex items-end gap-5">
          {showPhoto && photo && (
            <img 
              src={photo} 
              alt={personal.fullName} 
              className={`w-20 h-20 object-cover border-2 border-black ${getPhotoShapeClass()}`}
            />
          )}
          <div>
            <div className="text-[10px] font-mono tracking-widest uppercase text-slate-500 mb-1">
              Typographic Curriculum / 2026
            </div>
            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter text-black leading-none">
              {personal.fullName || 'Candidate Name'}
            </h1>
            <p className="text-sm font-semibold uppercase tracking-wider text-slate-700 mt-2">
              {personal.title || 'Information Architect & Design Director'}
            </p>
          </div>
        </div>

        <div className="md:col-span-4 text-xs font-mono space-y-1 text-slate-600">
          {personal.email && (
            <div><a href={`mailto:${personal.email}`} className="hover:text-black hover:underline">{personal.email}</a></div>
          )}
          {personal.phone && <div>{personal.phone}</div>}
          {personal.location && <div>{personal.location}</div>}
          {personal.linkedin && <div><a href={personal.linkedin.startsWith('http') ? personal.linkedin : `https://${personal.linkedin}`} target="_blank" rel="noreferrer" className="hover:text-black hover:underline">LinkedIn</a></div>}
        </div>
      </header>

      {/* Summary with Swiss Index */}
      {summary && (
        <section className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8 pb-6 border-b border-slate-200">
          <div className="md:col-span-3 font-mono text-xs font-black uppercase tracking-wider text-slate-400">
            [01] Profile
          </div>
          <div className="md:col-span-9 text-xs sm:text-sm text-slate-800 leading-relaxed font-normal">
            {summary}
          </div>
        </section>
      )}

      {/* Main Experience Grid with Index */}
      {experience && experience.length > 0 && (
        <section className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8 pb-6 border-b border-slate-200">
          <div className="md:col-span-3 font-mono text-xs font-black uppercase tracking-wider text-slate-400">
            [02] Experience
          </div>
          <div className="md:col-span-9 space-y-5">
            {experience.map((exp) => (
              <div key={exp.id} className="text-xs">
                <div className="flex justify-between items-baseline flex-wrap">
                  <span className="font-bold text-sm text-black uppercase">{exp.title}</span>
                  <span className="font-mono text-[11px] text-slate-500">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <div className="font-semibold text-slate-600 text-xs mb-1.5">{exp.company} {exp.location && `/ ${exp.location}`}</div>

                {exp.highlights && exp.highlights.length > 0 && (
                  <ul className="space-y-1 text-slate-700 text-xs">
                    {exp.highlights.filter(Boolean).map((h, i) => (
                      <li key={i} className="pl-3 relative before:content-['—'] before:absolute before:left-0 before:text-slate-400 leading-relaxed">
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

      {/* Skills Grid with Index */}
      {skills && skills.length > 0 && (
        <section className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8 pb-6 border-b border-slate-200">
          <div className="md:col-span-3 font-mono text-xs font-black uppercase tracking-wider text-slate-400">
            [03] System
          </div>
          <div className="md:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {skills.map((s, idx) => (
              <div key={idx}>
                <div className="font-bold uppercase tracking-wider text-[11px] text-black mb-1">{s.category}</div>
                <div className="text-slate-600 text-xs leading-relaxed">{s.items.join(', ')}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education with Index */}
      {education && education.length > 0 && (
        <section className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
          <div className="md:col-span-3 font-mono text-xs font-black uppercase tracking-wider text-slate-400">
            [04] Education
          </div>
          <div className="md:col-span-9 space-y-2 text-xs">
            {education.map(e => (
              <div key={e.id} className="flex justify-between items-baseline">
                <div>
                  <span className="font-bold text-black uppercase">{e.degree}</span>
                  <div className="text-slate-600">{e.school}</div>
                </div>
                <span className="font-mono text-slate-500 text-[11px]">{e.gradYear}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
