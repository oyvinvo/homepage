import React from 'react';
import { useTranslation } from '../i18n/useTranslation';

export const CVManifestProfile: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="space-y-2">
      <h3 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider print:text-slate-800">
        {t.manifest.sections.profileSummary}
      </h3>
      {t.manifest.profileText.map((p, idx) => (
        <p key={idx} className="text-sm text-slate-300 print:text-slate-800 leading-relaxed">
          {p}
        </p>
      ))}
    </section>
  );
};
