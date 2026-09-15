import React from 'react';
import { Mail, Phone, MapPin, Globe, ExternalLink, Briefcase, GraduationCap, Code, Award, Layers } from 'lucide-react';
import { Linkedin, Github } from '../Icons';

export default function CompactOnePageTemplate({ data, theme, font, orientation = 'portrait' }) {
  const { personal, summary, experience, education, skills, projects, certifications, languages, photo, showPhoto, photoShape } = data;
  const isLandscape = orientation === 'landscape';

  const getPhotoShapeClass = () => {
    if (photoShape === 'circle') return 'rounded-full';
    if (photoShape === 'rounded') return 'rounded-md';
    return 'rounded-none';
  };

  return (
    <div 
      className="w-full bg-white text-slate-900 p-6 sm:p-7 text-[13px] leading-snug"
      style={{ fontFamily: font.fontFamily || "'Inter', sans-serif" }}
    >
      {/* Header */}
      <header className="border-b-2 pb-3 mb-3.5 flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderColor: theme.primary }}>
        <div className="flex items-center gap-3">
          {showPhoto && photo && (
            <img 
              src={photo} 
              alt={personal.fullName} 
              className={`w-14 h-14 object-cover border ${getPhotoShapeClass()}`}
              style={{ borderColor: theme.primary }}
            />
          )}
          <div>
            <h1 className="text-2xl font-black uppercase tracking-tight text-slate-950">
              {personal.fullName || 'Candidate Name'}
            </h1>
            <p className="text-xs font-bold uppercase tracking-wider" style={{ color: theme.primary }}>
              {personal.title || 'Technical Specialist'}
            </p>
          </div>
        </div>

        {/* Compact Contact Matrix */}
        <div className="flex flex-wrap items-center justify-end gap-x-3 gap-y-1 text-[11px] text-slate-600 font-medium">
          {personal.email && (
            <span className="flex items-center gap-1">
              <Mail className="w-3 h-3" style={{ color: theme.primary }} />
              <a href={`mailto:${personal.email}`} className="hover:underline">{personal.email}</a>
            </span>
          )}
          {personal.phone && (
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3" style={{ color: theme.primary }} />
              <span>{personal.phone}</span>
            </span>
          )}
          {personal.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" style={{ color: theme.primary }} />
              <span>{personal.location}</span>
            </span>
          )}
          {personal.linkedin && (
            <span className="flex items-center gap-1">
              <Linkedin className="w-3 h-3" style={{ color: theme.primary }} />
              <a href={personal.linkedin.startsWith('http') ? personal.linkedin : `https://${personal.linkedin}`} target="_blank" rel="noreferrer" className="hover:underline">
                {personal.linkedin.replace(/^https?:\/\/(www\.)?/, '')}
              </a>
            </span>
          )}
          {personal.github && (
            <span className="flex items-center gap-1">
              <Github className="w-3 h-3" style={{ color: theme.primary }} />
              <a href={personal.github.startsWith('http') ? personal.github : `https://${personal.github}`} target="_blank" rel="noreferrer" className="hover:underline">
                {personal.github.replace(/^https?:\/\/(www\.)?/, '')}
              </a>
            </span>
          )}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-3 bg-slate-50 p-2.5 rounded border border-slate-200/80">
          <p className="text-[12px] text-slate-700 leading-relaxed font-normal">
            {summary}
          </p>
        </section>
      )}

      {/* Body: Responsive based on Orientation */}
      <div className={`grid ${isLandscape ? 'grid-cols-12 gap-5' : 'grid-cols-1 md:grid-cols-12 gap-4'}`}>
        {/* Left Column (Experience) */}
        <div className={isLandscape ? 'col-span-7 space-y-3' : 'md:col-span-7 space-y-3'}>
          {/* Work Experience */}
          {experience && experience.length > 0 && (
            <section>
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b pb-1 mb-2 flex items-center gap-1.5" style={{ borderColor: theme.primary }}>
                <Briefcase className="w-3.5 h-3.5" style={{ color: theme.primary }} />
                <span>Experience</span>
              </h2>

              <div className="space-y-2.5">
                {experience.map((exp) => (
                  <div key={exp.id} className="text-[12px]">
                    <div className="flex items-baseline justify-between">
                      <span className="font-bold text-slate-950">{exp.title}</span>
                      <span className="text-[11px] font-semibold text-slate-500 whitespace-nowrap">
                        {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between text-slate-600 font-medium text-[11px] mb-1">
                      <span style={{ color: theme.primary }}>{exp.company}</span>
                      {exp.location && <span>{exp.location}</span>}
                    </div>

                    {exp.highlights && exp.highlights.length > 0 && (
                      <ul className="list-disc list-inside space-y-0.5 text-slate-700 text-[11.5px] leading-snug">
                        {exp.highlights.filter(Boolean).map((h, idx) => (
                          <li key={idx} className="pl-0.5">{h}</li>
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
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b pb-1 mb-2 flex items-center gap-1.5" style={{ borderColor: theme.primary }}>
                <Code className="w-3.5 h-3.5" style={{ color: theme.primary }} />
                <span>Key Projects</span>
              </h2>

              <div className="space-y-2">
                {projects.map((proj) => (
                  <div key={proj.id} className="text-[12px]">
                    <div className="flex items-baseline justify-between">
                      <span className="font-bold text-slate-900">{proj.name}</span>
                      {proj.tech && <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded font-mono">{proj.tech}</span>}
                    </div>
                    <p className="text-[11.5px] text-slate-600">{proj.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column (Skills, Education, Certs) */}
        <div className={isLandscape ? 'col-span-5 space-y-3' : 'md:col-span-5 space-y-3'}>
          {/* Skills Grid */}
          {skills && skills.length > 0 && (
            <section>
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b pb-1 mb-2 flex items-center gap-1.5" style={{ borderColor: theme.primary }}>
                <Layers className="w-3.5 h-3.5" style={{ color: theme.primary }} />
                <span>Skills & Competencies</span>
              </h2>

              <div className="space-y-1.5">
                {skills.map((group, idx) => (
                  <div key={idx} className="text-[11.5px]">
                    <span className="font-bold text-slate-800 block text-[11px]">{group.category}:</span>
                    <div className="flex flex-wrap gap-1 mt-0.5">
                      {group.items && group.items.map((skill, sIdx) => (
                        <span key={sIdx} className="bg-slate-100 border border-slate-200/70 text-slate-700 text-[10.5px] px-1.5 py-0.2 rounded">
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
            <section>
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b pb-1 mb-2 flex items-center gap-1.5" style={{ borderColor: theme.primary }}>
                <GraduationCap className="w-3.5 h-3.5" style={{ color: theme.primary }} />
                <span>Education</span>
              </h2>

              <div className="space-y-2">
                {education.map((edu) => (
                  <div key={edu.id} className="text-[11.5px]">
                    <div className="font-bold text-slate-900">{edu.degree}</div>
                    <div className="flex justify-between text-slate-600 text-[11px]">
                      <span>{edu.school}</span>
                      <span>{edu.gradYear}</span>
                    </div>
                    {edu.gpa && <div className="text-[10px] text-slate-500">GPA: {edu.gpa}</div>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certifications && certifications.length > 0 && (
            <section>
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b pb-1 mb-2 flex items-center gap-1.5" style={{ borderColor: theme.primary }}>
                <Award className="w-3.5 h-3.5" style={{ color: theme.primary }} />
                <span>Certifications</span>
              </h2>

              <div className="space-y-1 text-[11px]">
                {certifications.map((cert) => (
                  <div key={cert.id} className="flex justify-between">
                    <span className="font-semibold text-slate-800">{cert.name}</span>
                    <span className="text-slate-500">{cert.year}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {languages && languages.length > 0 && (
            <section className="pt-1">
              <h3 className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">Languages</h3>
              <div className="flex flex-wrap gap-2 text-[11px] text-slate-600">
                {languages.map((l, i) => (
                  <span key={i}><strong className="text-slate-800">{l.language}</strong> ({l.proficiency})</span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
