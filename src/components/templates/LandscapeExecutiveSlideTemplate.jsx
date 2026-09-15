import React from 'react';
import { Mail, Phone, MapPin, Globe, ExternalLink, Award, CheckCircle2, TrendingUp, Layers, GraduationCap, LayoutDashboard } from 'lucide-react';
import { Linkedin, Github } from '../Icons';

export default function LandscapeExecutiveSlideTemplate({ data, theme, font, orientation = 'landscape' }) {
  const { personal, summary, experience, education, skills, projects, certifications, languages, photo, showPhoto, photoShape } = data;

  const getPhotoShapeClass = () => {
    if (photoShape === 'circle') return 'rounded-full';
    if (photoShape === 'rounded') return 'rounded-2xl';
    return 'rounded-lg';
  };

  return (
    <div 
      className="w-full bg-white text-slate-800 p-8 leading-normal min-h-[580px] flex flex-col justify-between"
      style={{ fontFamily: font.fontFamily || "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* Top Slide Header Bar */}
      <header className="border-b-2 pb-4 mb-5 flex items-center justify-between gap-4" style={{ borderColor: theme.primary }}>
        <div className="flex items-center gap-4">
          {showPhoto && photo && (
            <img 
              src={photo} 
              alt={personal.fullName} 
              className={`w-16 h-16 object-cover border-2 shadow-sm ${getPhotoShapeClass()}`}
              style={{ borderColor: theme.primary }}
            />
          )}
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-slate-100 text-slate-600 flex items-center gap-1">
                <LayoutDashboard className="w-3 h-3 text-blue-600" />
                <span>Executive Slide Briefing</span>
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-slate-950 mt-1">
              {personal.fullName || 'Executive Candidate'}
            </h1>
            <p className="text-xs sm:text-sm font-bold tracking-wide uppercase" style={{ color: theme.primary }}>
              {personal.title || 'Senior Vice President & Managing Director'}
            </p>
          </div>
        </div>

        {/* Contact Strip */}
        <div className="flex flex-wrap items-center justify-end gap-x-4 gap-y-1 text-xs text-slate-600 font-medium">
          {personal.email && (
            <span className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded border border-slate-200">
              <Mail className="w-3.5 h-3.5" style={{ color: theme.primary }} />
              <a href={`mailto:${personal.email}`} className="hover:underline">{personal.email}</a>
            </span>
          )}
          {personal.phone && (
            <span className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded border border-slate-200">
              <Phone className="w-3.5 h-3.5" style={{ color: theme.primary }} />
              <span>{personal.phone}</span>
            </span>
          )}
          {personal.location && (
            <span className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded border border-slate-200">
              <MapPin className="w-3.5 h-3.5" style={{ color: theme.primary }} />
              <span>{personal.location}</span>
            </span>
          )}
        </div>
      </header>

      {/* 3-Column Landscape Widescreen Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 flex-1 items-start">
        {/* Col 1: Summary & Strategic Competencies (3.5 cols) */}
        <div className="md:col-span-3 space-y-4">
          {/* Executive Summary */}
          {summary && (
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <h3 className="text-[11px] font-bold uppercase tracking-wider mb-1 flex items-center gap-1" style={{ color: theme.primary }}>
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Executive Profile</span>
              </h3>
              <p className="text-[11.5px] text-slate-700 leading-relaxed">{summary}</p>
            </div>
          )}

          {/* Competencies */}
          {skills && skills.length > 0 && (
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 mb-2 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5" style={{ color: theme.primary }} />
                <span>Core Competencies</span>
              </h3>
              <div className="space-y-2">
                {skills.map((s, idx) => (
                  <div key={idx}>
                    <div className="text-[10px] font-bold text-slate-600 uppercase">{s.category}</div>
                    <div className="flex flex-wrap gap-1 mt-0.5">
                      {s.items.map((it, iIdx) => (
                        <span key={iIdx} className="text-[10px] px-1.5 py-0.2 rounded bg-white border border-slate-200 text-slate-800">
                          {it}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Col 2: Career History & Milestones (5 cols) */}
        <div className="md:col-span-5 space-y-3.5">
          {experience && experience.length > 0 && (
            <div>
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 border-b pb-1 mb-2.5 flex items-center gap-1.5" style={{ borderColor: theme.primary }}>
                <CheckCircle2 className="w-3.5 h-3.5" style={{ color: theme.primary }} />
                <span>Career Track Record & P&L Leadership</span>
              </h3>

              <div className="space-y-3">
                {experience.map((exp) => (
                  <div key={exp.id} className="text-xs bg-white p-3 rounded-lg border border-slate-200/80 shadow-2xs">
                    <div className="flex justify-between items-baseline flex-wrap">
                      <span className="font-bold text-xs text-slate-950">{exp.title}</span>
                      <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded">
                        {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <div className="text-[11px] font-semibold text-slate-600 mb-1" style={{ color: theme.primary }}>
                      {exp.company} {exp.location && `• ${exp.location}`}
                    </div>

                    {exp.highlights && exp.highlights.length > 0 && (
                      <ul className="space-y-1 text-[11px] text-slate-700">
                        {exp.highlights.filter(Boolean).map((h, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-blue-500 shrink-0">›</span>
                            <span className="leading-snug">{h}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Col 3: Projects, Education & Certs (3.5 cols) */}
        <div className="md:col-span-4 space-y-3.5">
          {projects && projects.length > 0 && (
            <div>
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 border-b pb-1 mb-2.5 flex items-center gap-1.5" style={{ borderColor: theme.primary }}>
                <Award className="w-3.5 h-3.5" style={{ color: theme.primary }} />
                <span>Strategic Initiatives & Impact</span>
              </h3>

              <div className="space-y-2">
                {projects.map((p) => (
                  <div key={p.id} className="text-xs p-2.5 rounded-lg border border-slate-200 bg-white">
                    <div className="font-bold text-[11px] text-slate-900">{p.name}</div>
                    {p.tech && <div className="text-[10px] text-slate-500">{p.tech}</div>}
                    <p className="text-[10.5px] text-slate-600 mt-0.5 leading-snug">{p.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {education && education.length > 0 && (
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 mb-1.5 flex items-center gap-1">
                <GraduationCap className="w-3.5 h-3.5" style={{ color: theme.primary }} />
                <span>Education</span>
              </h3>
              <div className="space-y-1.5 text-xs">
                {education.map(e => (
                  <div key={e.id}>
                    <div className="font-bold text-[11px] text-slate-900">{e.degree}</div>
                    <div className="text-[10px] text-slate-600">{e.school} • {e.gradYear}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {certifications && certifications.length > 0 && (
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 mb-1 flex items-center gap-1">
                <Award className="w-3.5 h-3.5" style={{ color: theme.primary }} />
                <span>Accreditations</span>
              </h3>
              <div className="space-y-1 text-xs">
                {certifications.map(c => (
                  <div key={c.id} className="text-[10.5px] text-slate-700">
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
