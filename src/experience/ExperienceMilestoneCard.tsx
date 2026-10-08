import React from 'react';
import { Calendar, ChevronDown, ChevronUp, MapPin } from 'lucide-react';
import { ExperienceMilestone } from '../shared/types';
import { useTranslation } from '../i18n/useTranslation';

interface ExperienceMilestoneCardProps {
  milestone: ExperienceMilestone;
  isExpanded: boolean;
  onToggle: () => void;
}

export const ExperienceMilestoneCard: React.FC<ExperienceMilestoneCardProps> = ({
  milestone,
  isExpanded,
  onToggle,
}) => {
  const { t } = useTranslation();
  const localized = t.experience.milestones[milestone.id as keyof typeof t.experience.milestones];

  const role = localized?.role ?? milestone.role;
  const company = localized?.organization ?? milestone.company;
  const period = localized?.period ?? milestone.period;
  const summary = localized?.summary ?? milestone.summary;
  const highlights = localized?.highlights ?? milestone.architectureHighlights;
  const badge = t.experience.badges?.[milestone.id] ?? milestone.badge;
  const location = t.experience.locations?.[milestone.id] ?? milestone.location;

  return (
    <article className="p-6 sm:p-8 rounded-xl bg-white/95 dark:bg-slate-900/50 border border-violet-200/70 dark:border-slate-800 hover:border-violet-300 dark:hover:border-slate-700 transition-all shadow-sm">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="space-y-1.5 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xl sm:text-2xl font-bold text-slate-950 dark:text-white tracking-tight">
              {role}
            </span>
            {badge && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-violet-100 text-violet-800 border border-violet-300 dark:bg-cyan-950 dark:text-cyan-300 dark:border-cyan-800/60">
                {badge}
              </span>
            )}
          </div>

          <div className="text-base font-bold text-violet-700 dark:text-cyan-400">
            {company}
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" aria-hidden="true" />
              {period}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" aria-hidden="true" />
              {location}
            </span>
          </div>
        </div>

        {/* Expand / Details Toggle Button */}
        <button
          type="button"
          onClick={onToggle}
          className="self-start min-h-[44px] inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 dark:text-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 dark:hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 shadow-sm"
          aria-expanded={isExpanded}
          aria-controls={`details-${milestone.id}`}
        >
          <span>{isExpanded ? t.experience.hideHighlights : t.experience.viewHighlights}</span>
          {isExpanded ? (
            <ChevronUp className="w-3.5 h-3.5" aria-hidden="true" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Summary Text */}
      <p className="mt-4 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
        {summary}
      </p>

      {/* Expandable Architecture Highlights */}
      {isExpanded && (
        <div id={`details-${milestone.id}`} className="mt-5 pt-5 border-t border-violet-100 dark:border-slate-800/80 space-y-4">
          <div>
            <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              {t.experience.deliverablesLabel}
            </h4>
            <ul className="space-y-2 list-disc list-outside ml-4 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {highlights.map((highlight, idx) => (
                <li key={idx}>{highlight}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Technology Pills */}
      <div className="mt-5 flex flex-wrap gap-1.5 pt-4 border-t border-violet-100 dark:border-slate-800/50">
        {milestone.technologies.map((tech) => (
          <span
            key={tech}
            className="px-2.5 py-1 rounded-md text-xs font-medium bg-violet-100/70 text-violet-900 border border-violet-200/80 dark:bg-slate-800/70 dark:text-slate-300 dark:border-slate-700/60"
          >
            {tech}
          </span>
        ))}
      </div>
    </article>
  );
};
