import React from 'react';
import { Mail, Phone, MapPin, Globe, ExternalLink, TrendingUp, Award, Zap, CheckCircle2, BarChart3 } from 'lucide-react';
import { Linkedin, Github } from '../Icons';

export default function InfographicMetricsTemplate({ data, theme, font, orientation = 'portrait' }) {
  const { personal, summary, experience, education, skills, projects, certifications, languages, photo, showPhoto, photoShape } = data;
  const isLandscape = orientation === 'landscape';

  const getPhotoShapeClass = () => {
    if (photoShape === 'circle') return 'rounded-full';
    if (photoShape === 'rounded') return 'rounded-2xl';
    return 'rounded-md';
  };

  // Extract key metrics from experience highlights
  const metrics = [
    { label: 'Proven Experience', value: `${experience?.length || 2}+ Roles`, icon: <Zap className="w-4 h-4" /> },
    { label: 'Core Skills', value: `${skills?.reduce((acc, g) => acc + (g.items?.length || 0), 0) || 12}+ Tools`, icon: <BarChart3 className="w-4 h-4" /> },
    { label: 'Key Deliverables', value: `${projects?.length || 2}+ Projects`, icon: <TrendingUp className="w-4 h-4" /> },
    { label: 'Certifications', value: `${certifications?.length || 1}+ Accreditations`, icon: <Award className="w-4 h-4" /> },
  ];

  return (
    <div 
      className="w-full bg-white text-slate-800 p-7 sm:p-9 leading-relaxed"
      style={{ fontFamily: font.fontFamily || "'Poppins', sans-serif" }}
    >
      {/* Top Hero Banner */}
      <div 
        className="rounded-2xl p-6 sm:p-7 text-white mb-6 shadow-md relative overflow-hidden"
        style={{ backgroundColor: theme.primary }}
      >
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-5 relative z-10">
          <div className="flex items-center gap-4 text-center sm:text-left">
            {showPhoto && photo && (
              <img 
                src={photo} 
                alt={personal.fullName} 
                className={`w-20 h-20 object-cover border-4 border-white/30 shadow-lg ${getPhotoShapeClass()}`}
              />
            )}
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-white/20 text-white/90">
                Performance Portfolio
              </span>
              <h1 className="text-2xl sm:text-3xl font-black mt-1 tracking-tight">
                {personal.fullName || 'Candidate Name'}
              </h1>
              <p className="text-sm font-semibold text-white/90 mt-0.5">
                {personal.title || 'Senior Growth Specialist'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-4 gap-y-1.5 text-xs text-white/90 font-medium">
            {personal.email && (
              <span className="flex items-center gap-1.5 bg-black/15 px-2.5 py-1 rounded-lg">
                <Mail className="w-3.5 h-3.5" />
                <a href={`mailto:${personal.email}`} className="hover:underline">{personal.email}</a>
              </span>
            )}
            {personal.phone && (
              <span className="flex items-center gap-1.5 bg-black/15 px-2.5 py-1 rounded-lg">
                <Phone className="w-3.5 h-3.5" />
                <span>{personal.phone}</span>
              </span>
            )}
            {personal.location && (
              <span className="flex items-center gap-1.5 bg-black/15 px-2.5 py-1 rounded-lg">
                <MapPin className="w-3.5 h-3.5" />
                <span>{personal.location}</span>
              </span>
            )}
          </div>
        </div>

        {/* Infographic KPI Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-white/20">
          {metrics.map((m, idx) => (
            <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-xl p-2.5 text-center border border-white/10">
              <div className="text-white/80 flex justify-center mb-1">{m.icon}</div>
              <div className="text-base font-extrabold text-white">{m.value}</div>
              <div className="text-[10px] font-semibold text-white/70 uppercase tracking-wider">{m.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="mb-6 bg-slate-50 border-l-4 rounded-r-xl p-4 shadow-sm" style={{ borderColor: theme.primary }}>
          <h3 className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: theme.primary }}>
            Executive Impact Profile
          </h3>
          <p className="text-xs text-slate-700 leading-relaxed font-normal">{summary}</p>
        </div>
      )}

      {/* Two Column Content */}
      <div className={`grid ${isLandscape ? 'grid-cols-12 gap-7' : 'grid-cols-1 md:grid-cols-12 gap-6'}`}>
        {/* Left Column - Work Experience */}
        <div className={isLandscape ? 'col-span-8 space-y-5' : 'md:col-span-8 space-y-5'}>
          {experience && experience.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b pb-1.5 mb-3 flex items-center gap-2" style={{ borderColor: theme.primary }}>
                <TrendingUp className="w-4 h-4" style={{ color: theme.primary }} />
                <span>Track Record & Experience</span>
              </h2>

              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id} className="relative pl-4 border-l-2" style={{ borderColor: theme.border }}>
                    <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full" style={{ backgroundColor: theme.primary }}></div>
                    <div className="flex justify-between items-baseline flex-wrap">
                      <h4 className="font-bold text-sm text-slate-900">{exp.title}</h4>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                        {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <div className="text-xs font-semibold mt-0.5" style={{ color: theme.primary }}>
                      {exp.company} {exp.location && `• ${exp.location}`}
                    </div>

                    {exp.highlights && exp.highlights.length > 0 && (
                      <ul className="mt-2 space-y-1.5 text-xs text-slate-600">
                        {exp.highlights.filter(Boolean).map((h, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
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

          {/* Key Projects */}
          {projects && projects.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b pb-1.5 mb-3 flex items-center gap-2" style={{ borderColor: theme.primary }}>
                <Zap className="w-4 h-4" style={{ color: theme.primary }} />
                <span>High-Impact Projects</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {projects.map((proj) => (
                  <div key={proj.id} className="p-3 rounded-xl border border-slate-200/90 bg-white shadow-sm">
                    <div className="font-bold text-xs text-slate-900">{proj.name}</div>
                    {proj.tech && <div className="text-[10px] text-blue-600 font-mono mt-0.5">{proj.tech}</div>}
                    <p className="text-[11px] text-slate-600 mt-1">{proj.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column - Skills & Education */}
        <div className={isLandscape ? 'col-span-4 space-y-5' : 'md:col-span-4 space-y-5'}>
          {/* Skills Breakdown */}
          {skills && skills.length > 0 && (
            <section className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-1.5">
                <BarChart3 className="w-3.5 h-3.5" style={{ color: theme.primary }} />
                <span>Skill Mastery</span>
              </h3>
              <div className="space-y-3">
                {skills.map((group, idx) => (
                  <div key={idx}>
                    <span className="text-[11px] font-bold text-slate-700 block mb-1">{group.category}</span>
                    <div className="flex flex-wrap gap-1.5">
                      {group.items && group.items.map((skill, sIdx) => (
                        <span 
                          key={sIdx} 
                          className="text-[10.5px] font-semibold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 shadow-2xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education && education.length > 0 && (
            <section className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">Education</h3>
              <div className="space-y-2">
                {education.map((edu) => (
                  <div key={edu.id} className="text-xs">
                    <div className="font-bold text-slate-900">{edu.degree}</div>
                    <div className="text-[11px] text-slate-600">{edu.school} • {edu.gradYear}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certifications && certifications.length > 0 && (
            <section className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">Certifications</h3>
              <div className="space-y-1.5 text-xs">
                {certifications.map((c) => (
                  <div key={c.id} className="flex justify-between items-center text-[11px]">
                    <span className="font-semibold text-slate-800">{c.name}</span>
                    <span className="text-slate-500 text-[10px]">{c.year}</span>
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
