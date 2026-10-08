import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { useTranslation } from '../i18n/useTranslation';

export const HeroBio: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      {/* Leadership Status Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-100/90 dark:bg-cyan-950/70 border border-cyan-300 dark:border-cyan-800/60 text-cyan-900 dark:text-cyan-300 text-xs font-semibold shadow-sm">
        <ShieldCheck className="w-3.5 h-3.5 text-cyan-700 dark:text-cyan-400" aria-hidden="true" />
        <span>{t.hero.roleBadge} • KulturIT (2018–Present)</span>
      </div>

      {/* Executive Headline & Bio */}
      <div className="space-y-4">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-950 dark:text-white leading-[1.12]">
          {t.hero.headlineRole}
        </h1>
        <p className="text-lg sm:text-xl text-slate-700 dark:text-slate-300 font-normal leading-relaxed">
          {t.hero.bio1}
        </p>
        <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          {t.hero.bio2}
        </p>
        <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          {t.hero.bio3}
        </p>
      </div>
    </div>
  );
};
