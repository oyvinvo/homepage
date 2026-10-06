import React from 'react';

export const CVManifestEducation: React.FC = () => {
  return (
    <section className="space-y-3 print:break-inside-avoid print-avoid-break">
      <h3 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider print:text-slate-800 border-b border-slate-800/80 pb-2 print:border-black">
        Education & Academic Foundation
      </h3>
      <div className="space-y-1">
        <div className="flex items-baseline justify-between gap-1">
          <span className="font-bold text-sm text-white print:text-black">
            Universitetet i Oslo (UiO)
          </span>
          <span className="text-xs text-slate-400 print:text-slate-600 font-mono">
            2004–2008
          </span>
        </div>
        <div className="text-xs text-cyan-400 print:text-slate-700 font-medium">
          Institutt for informatikk (IFI) • Oslo, Norway
        </div>
        <p className="text-xs text-slate-300 print:text-slate-700 leading-relaxed">
          Bachelor's Degree & Graduate Coursework (Hovedfagskurs) in Informatics. Rigorous training in software architecture, distributed systems, algorithms, and database systems.
        </p>
      </div>
    </section>
  );
};
