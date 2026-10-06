import React from 'react';

interface MetricItem {
  value: string;
  label: string;
  detail: string;
}

const HERO_METRICS: MetricItem[] = [
  { value: '15+ Years', label: 'Architectural Leadership', detail: 'Distributed systems & modern web' },
  { value: '11,000+ Rules', label: 'Automated Rule Engine', detail: 'Statens vegvesen Regelforvaltning' },
  { value: '100k+ Approvals/Yr', label: 'National Modernization', detail: 'Autosys KSAK digital approvals' },
  { value: '10M+ Artifacts', label: 'Digital Cultural Heritage', detail: 'Preserved & accessed via KulturIT' },
];

export const HeroMetricsGrid: React.FC = () => {
  return (
    <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-10 border-t border-sky-200/70 dark:border-slate-800/80">
      {HERO_METRICS.map((item, idx) => (
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
