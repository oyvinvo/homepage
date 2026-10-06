import React from 'react';
import { experienceCatalog } from '../experience/experienceCatalog';

export const CVManifestExperience: React.FC = () => {
  return (
    <section className="space-y-6">
      <h3 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider print:text-slate-800 border-b border-slate-800/80 pb-2 print:border-black">
        Professional Experience
      </h3>
      <div className="space-y-6">
        {experienceCatalog.map((exp) => (
          <div key={exp.id} className="space-y-2 print-avoid-break">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
              <div>
                <span className="font-bold text-base text-white print:text-black">{exp.role}</span>
                <span className="text-cyan-400 print:text-slate-700 font-semibold text-sm"> — {exp.company}</span>
              </div>
              <span className="text-xs text-slate-400 print:text-slate-600 font-mono">{exp.period}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 print:text-slate-800 leading-relaxed">
              {exp.summary}
            </p>
            <ul className="list-disc list-outside ml-4 text-xs text-slate-300 print:text-slate-700 space-y-1">
              {exp.architectureHighlights.map((hl, i) => (
                <li key={i}>{hl}</li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-1 pt-1 print:hidden">
              {exp.technologies.map((t) => (
                <span key={t} className="px-2 py-0.5 rounded text-[11px] bg-slate-800 text-slate-300 border border-slate-700">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
