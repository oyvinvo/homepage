import React from 'react';
import { useTranslation } from '../i18n/useTranslation';

export const HeroMetricsGrid: React.FC = () => {
  const { t } = useTranslation();

  const metrics = [
    t.hero.metrics.experience,
    t.hero.metrics.rules,
    t.hero.metrics.approvals,
    t.hero.metrics.heritage,
  ];

  return (
    <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-10 border-t border-sky-200/70 dark:border-slate-800/80">
      {metrics.map((item, idx) => (
        <div
          key={idx}
          className="p-4 rounded-xl bg-white/80 dark:bg-slate-900/50 border border-sky-200/70 dark:border-slate-800/70 shadow-sm"
        >
          <div className="text-2xl sm:text-3xl font-bold text-slate-950 dark:text-white tracking-tight">
            {item.value}
          </div>
          <div className="mt-1 text-sm font-semibold text-cyan-700 dark:text-cyan-400">
            {item.label}
          </div>
          <div className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            {item.detail}
          </div>
        </div>
      ))}
    </div>
  );
};
