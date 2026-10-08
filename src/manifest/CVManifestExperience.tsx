import React from 'react';
import { experienceCatalog } from '../experience/experienceCatalog';
import { useTranslation } from '../i18n/useTranslation';

const MILESTONE_KEY_MAP: Record<string, string> = {
  'kulturit': 'kulturit',
  'volden': 'volden',
  'autosys-ksak': 'autosys',
  'autosys': 'autosys',
  'regelforvaltning': 'regelforvaltning',
  'ciber-cloud': 'ciber',
  'ciber': 'ciber',
  'noark-documentum': 'noark5',
  'noark5': 'noark5',
  'mohive-saas': 'mohive',
  'mohive': 'mohive',
};

export const CVManifestExperience: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="space-y-6">
      <h3 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider print:text-slate-800 border-b border-slate-800/80 pb-2 print:border-black">
        {t.manifest.sections.careerChronology}
      </h3>
      <div className="space-y-6">
        {experienceCatalog.map((exp) => {
          const lookupKey = MILESTONE_KEY_MAP[exp.id] || exp.id;
          const localized = t.experience.milestones[exp.id] || t.experience.milestones[lookupKey];
          const role = localized?.role ?? exp.role;
          const company = localized?.organization ?? exp.company;
          const period = localized?.period ?? exp.period;
          const summary = localized?.summary ?? exp.summary;
          const highlights = localized?.highlights ?? exp.architectureHighlights;

          return (
            <div key={exp.id} className="space-y-2 print-avoid-break">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                <div>
                  <span className="font-bold text-base text-white print:text-black">{role}</span>
                  <span className="text-cyan-400 print:text-slate-700 font-semibold text-sm"> — {company}</span>
                </div>
                <span className="text-xs text-slate-400 print:text-slate-600 font-mono">{period}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 print:text-slate-800 leading-relaxed">
                {summary}
              </p>
              <ul className="list-disc list-outside ml-4 text-xs text-slate-300 print:text-slate-700 space-y-1">
                {highlights.map((hl, i) => (
                  <li key={i}>{hl}</li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-1 pt-1 print:hidden">
                {exp.technologies.map((tech) => (
                  <span key={tech} className="px-2 py-0.5 rounded text-[11px] bg-slate-800 text-slate-300 border border-slate-700">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
