import React from 'react';
import { projectsCatalog } from '../projects/projectsCatalog';

export const CVManifestProjects: React.FC = () => {
  return (
    <section className="space-y-4">
      <h3 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider print:text-slate-800 border-b border-slate-800/80 pb-2 print:border-black">
        Key Architectural Case Studies
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {projectsCatalog.map((proj) => (
          <div
            key={proj.id}
            className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800/80 print:border-none print:p-0 space-y-1.5 print:break-inside-avoid print-avoid-break"
          >
            <div className="flex items-baseline justify-between gap-1">
              <span className="font-bold text-xs text-white print:text-black">{proj.title}</span>
              <span className="text-[11px] text-slate-400 print:text-slate-600 font-mono">{proj.period}</span>
            </div>
            <div className="text-[11px] text-cyan-400 print:text-slate-700 font-medium">{proj.client}</div>
            <p className="text-xs text-slate-300 print:text-slate-700 leading-relaxed">{proj.summary}</p>
            <div className="text-[11px] text-slate-400 print:text-slate-600 pt-1">
              <span className="font-semibold text-slate-300 print:text-slate-800">Stack: </span>
              {proj.techStack.join(', ')}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
