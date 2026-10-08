import React from 'react';
import { Briefcase } from 'lucide-react';
import { experienceCatalog } from './experienceCatalog';
import { usePortfolioStore } from '../shared/store';
import { ExperienceMilestoneCard } from './ExperienceMilestoneCard';
import { ExperienceEducationCard } from './ExperienceEducationCard';
import { useTranslation } from '../i18n/useTranslation';

export const ExperienceSection: React.FC = () => {
  const { expandedMilestoneId, setExpandedMilestoneId } = usePortfolioStore();
  const { t } = useTranslation();

  const toggleMilestone = (id: string) => {
    setExpandedMilestoneId(expandedMilestoneId === id ? null : id);
  };

  return (
    <section
      id="experience"
      className="py-20 border-b border-violet-300/80 dark:border-purple-900/60 bg-gradient-to-b from-violet-100/90 via-purple-50/70 to-indigo-100/80 dark:from-[#231240] dark:via-[#311859] dark:to-[#170b2b] transition-colors duration-200"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-violet-700 dark:text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <Briefcase className="w-4 h-4" aria-hidden="true" />
          <span>{t.experience.sectionBadge}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-950 dark:text-white tracking-tight">
          {t.experience.title}
        </h2>
        <p className="mt-3 text-base sm:text-lg text-slate-700 dark:text-slate-300 max-w-3xl leading-relaxed">
          {t.experience.subtitle}
        </p>

        {/* Milestones List */}
        <div className="mt-12 space-y-6">
          {experienceCatalog.map((milestone) => (
            <ExperienceMilestoneCard
              key={milestone.id}
              milestone={milestone}
              isExpanded={expandedMilestoneId === milestone.id}
              onToggle={() => toggleMilestone(milestone.id)}
            />
          ))}
        </div>

        {/* Academic Foundation: Universitetet i Oslo (UiO) */}
        <ExperienceEducationCard />
      </div>
    </section>
  );
};
