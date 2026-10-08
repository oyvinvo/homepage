import React from 'react';
import { skillsCatalog } from '../skills/skillsCatalog';
import { useTranslation } from '../i18n/useTranslation';

export const CVManifestSkills: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="space-y-4">
      <h3 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider print:text-slate-800 border-b border-slate-800/80 pb-2 print:border-black">
        {t.manifest.sections.coreCompetencies}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {skillsCatalog.map((grp) => {
          const localized = t.skills.quadrants[grp.id as keyof typeof t.skills.quadrants];
          const title = localized?.title ?? grp.title;

          return (
            <div key={grp.id} className="space-y-1.5">
              <h4 className="text-xs font-bold text-white print:text-black">{title}</h4>
              <p className="text-xs text-slate-300 print:text-slate-700">
                {grp.skills.map((s) => t.skills.skillNames?.[s.name] ?? s.name).join(', ')}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
