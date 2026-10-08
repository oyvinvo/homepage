import React from 'react';
import { useTranslation } from '../i18n/useTranslation';

export const CVManifestEducation: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="space-y-3 print:break-inside-avoid print-avoid-break">
      <h3 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider print:text-slate-800 border-b border-slate-800/80 pb-2 print:border-black">
        {t.manifest.sections.academicFoundation}
      </h3>
      <div className="space-y-1">
        <div className="flex items-baseline justify-between gap-1">
          <span className="font-bold text-sm text-white print:text-black">
            {t.manifest.educationSchool}
          </span>
          <span className="text-xs text-slate-400 print:text-slate-600 font-mono">
            {t.manifest.educationPeriod}
          </span>
        </div>
        <div className="text-xs text-cyan-400 print:text-slate-700 font-medium">
          {t.manifest.educationDegree}
        </div>
        <p className="text-xs text-slate-300 print:text-slate-700 leading-relaxed">
          {t.manifest.educationDescription}
        </p>
      </div>
    </section>
  );
};
