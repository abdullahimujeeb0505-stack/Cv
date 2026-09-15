import React from 'react';
import { Mail, Phone, MapPin, Globe, Activity, Award, Shield, Stethoscope, BookOpen } from 'lucide-react';
import { Linkedin } from '../Icons';

export default function MedicalClinicalTemplate({ data, theme, font, orientation = 'portrait' }) {
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
      <header className="border-b-2 pb-5 mb-5" style={{ borderColor: theme.primary }}>
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
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <Stethoscope className="w-5 h-5" style={{ color: theme.primary }} />
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
                  {personal.fullName || 'Clinical Practitioner, MD'}
                </h1>
              </div>
              <p className="text-sm font-semibold mt-0.5 text-slate-600">
                {personal.title || 'Board Certified Specialist & Clinical Director'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-4 gap-y-1.5 text-xs text-slate-600 font-medium">
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

      {/* Clinical Licensure & Certifications Strip */}
      {certifications && certifications.length > 0 && (
        <div className="mb-5 bg-blue-50/60 border border-blue-200/80 rounded-xl p-3">
          <div className="text-[11px] font-bold uppercase tracking-wider text-blue-900 mb-1 flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-blue-700" />
            <span>Licensure, Board Certifications & Accreditations</span>
          </div>
          <div className="flex flex-wrap gap-2 text-xs text-slate-700">
            {certifications.map((c) => (
              <span key={c.id} className="bg-white px-2.5 py-1 rounded-md border border-blue-200 font-medium">
                {c.name} {c.issuer && `(${c.issuer})`} • {c.year}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Summary */}
      {summary && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b pb-1 mb-2" style={{ borderColor: theme.primary }}>
            Clinical & Professional Profile
          </h2>
          <p className="text-xs text-slate-700 leading-relaxed font-normal">
            {summary}
          </p>
        </section>
      )}

      {/* Main Grid */}
      <div className={`grid ${isLandscape ? 'grid-cols-12 gap-6' : 'grid-cols-1 md:grid-cols-12 gap-6'}`}>
        {/* Experience & Clinical Appointments (8 cols) */}
        <div className={isLandscape ? 'col-span-8 space-y-5' : 'md:col-span-8 space-y-5'}>
          {experience && experience.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b pb-1 mb-3 flex items-center gap-1.5" style={{ borderColor: theme.primary }}>
                <Activity className="w-3.5 h-3.5" style={{ color: theme.primary }} />
                <span>Clinical Appointments & Hospital Experience</span>
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

          {/* Research & Publications */}
          {projects && projects.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b pb-1 mb-3 flex items-center gap-1.5" style={{ borderColor: theme.primary }}>
                <BookOpen className="w-3.5 h-3.5" style={{ color: theme.primary }} />
                <span>Clinical Trials, Research & Publications</span>
              </h2>
              <div className="space-y-2.5">
                {projects.map((p) => (
                  <div key={p.id} className="text-xs">
                    <div className="font-bold text-slate-900">{p.name}</div>
                    {p.tech && <div className="text-[11px] text-slate-500 italic">{p.tech}</div>}
                    <p className="text-slate-700 text-[11.5px] mt-0.5">{p.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column (Education, Skills, Affiliations) */}
        <div className={isLandscape ? 'col-span-4 space-y-5' : 'md:col-span-4 space-y-5'}>
          {/* Medical Education & Residencies */}
          {education && education.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b pb-1 mb-2.5" style={{ borderColor: theme.primary }}>
                Education & Fellowship
              </h2>
              <div className="space-y-3 text-xs">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="font-bold text-slate-900">{edu.degree}</div>
                    <div className="text-slate-600 text-[11px]">{edu.school}</div>
                    <div className="text-[10px] text-slate-500">{edu.gradYear} {edu.details && `• ${edu.details}`}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Clinical Competencies */}
          {skills && skills.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b pb-1 mb-2.5" style={{ borderColor: theme.primary }}>
                Clinical Competencies
              </h2>
              <div className="space-y-2.5 text-xs">
                {skills.map((s, idx) => (
                  <div key={idx}>
                    <div className="font-bold text-slate-800 text-[11px]">{s.category}</div>
                    <div className="text-slate-600 text-[11.5px] mt-0.5">
                      {s.items.join(', ')}
                    </div>
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
