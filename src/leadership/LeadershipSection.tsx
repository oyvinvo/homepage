import React from 'react';
import { Code2, Compass, GitBranch, Layers, Network, Users } from 'lucide-react';
import { LeadershipPillarCard } from './LeadershipPillarCard';
import { useTranslation } from '../i18n/useTranslation';

export const LeadershipSection: React.FC = () => {
  const { t } = useTranslation();

  const pillars = [
    {
      icon: Code2,
      title: t.leadership.pillars.cleanCode.title,
      description: t.leadership.pillars.cleanCode.description,
      accent: 'text-rose-600 border-rose-200 bg-rose-50 dark:text-rose-400 dark:border-rose-800/40 dark:bg-rose-950/20',
    },
    {
      icon: Layers,
      title: t.leadership.pillars.domainDriven.title,
      description: t.leadership.pillars.domainDriven.description,
      accent: 'text-cyan-700 border-cyan-200 bg-cyan-50 dark:text-cyan-400 dark:border-cyan-800/40 dark:bg-cyan-950/20',
    },
    {
      icon: GitBranch,
      title: t.leadership.pillars.adrGovernance.title,
      description: t.leadership.pillars.adrGovernance.description,
      accent: 'text-amber-700 border-amber-200 bg-amber-50 dark:text-amber-400 dark:border-amber-800/40 dark:bg-amber-950/20',
    },
    {
      icon: Network,
      title: t.leadership.pillars.eventDriven.title,
      description: t.leadership.pillars.eventDriven.description,
      accent: 'text-emerald-700 border-emerald-200 bg-emerald-50 dark:text-emerald-400 dark:border-emerald-800/40 dark:bg-emerald-950/20',
    },
    {
      icon: Users,
      title: t.leadership.pillars.mentorship.title,
      description: t.leadership.pillars.mentorship.description,
      accent: 'text-blue-700 border-blue-200 bg-blue-50 dark:text-blue-400 dark:border-blue-800/40 dark:bg-blue-950/20',
    },
    {
      icon: Compass,
      title: t.leadership.pillars.simplicity.title,
      description: t.leadership.pillars.simplicity.description,
      accent: 'text-indigo-700 border-indigo-200 bg-indigo-50 dark:text-indigo-400 dark:border-indigo-800/40 dark:bg-indigo-950/20',
    },
  ];

  return (
    <section
      id="leadership"
      className="py-20 border-b border-teal-300/80 dark:border-teal-900/60 bg-gradient-to-b from-teal-100/90 via-emerald-50/70 to-cyan-100/80 dark:from-[#082e2c] dark:via-[#0c403d] dark:to-[#05201f] transition-colors duration-200"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-teal-700 dark:text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <Compass className="w-4 h-4" aria-hidden="true" />
          <span>{t.leadership.sectionBadge}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-950 dark:text-white tracking-tight">
          {t.leadership.title}
        </h2>
        <p className="mt-3 text-base sm:text-lg text-slate-700 dark:text-slate-300 max-w-3xl leading-relaxed">
          {t.leadership.subtitle}
        </p>

        {/* 6 Pillars Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((pillar, idx) => (
            <LeadershipPillarCard
              key={idx}
              icon={pillar.icon}
              title={pillar.title}
              description={pillar.description}
              accent={pillar.accent}
            />
          ))}
        </div>

        {/* Leadership Quote Banner */}
        <div className="mt-12 p-6 rounded-xl bg-white/95 dark:bg-slate-900/80 border border-teal-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
          <div className="space-y-1">
            <div className="text-sm font-bold text-slate-900 dark:text-white">&ldquo;{t.leadership.quote.text}&rdquo;</div>
            <div className="text-xs text-slate-600 dark:text-slate-400">— {t.leadership.quote.author}, {t.leadership.quote.role}</div>
          </div>
          <a
            href="#contact"
            className="min-h-[44px] inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-md transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 shadow-sm"
          >
            <span>{t.nav.contact}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
