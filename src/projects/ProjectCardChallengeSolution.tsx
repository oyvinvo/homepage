import React from 'react';
import { useTranslation } from '../i18n/useTranslation';

interface ProjectCardChallengeSolutionProps {
  challenge: string;
  architectureSolution: string;
}

export const ProjectCardChallengeSolution: React.FC<ProjectCardChallengeSolutionProps> = ({
  challenge,
  architectureSolution,
}) => {
  const { t } = useTranslation();

  return (
    <div className="mt-5 space-y-3 pt-4 border-t border-blue-100 dark:border-slate-800/80">
      <div>
        <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">
          {t.projects.labels.challenge}:
        </span>
        <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {challenge}
        </p>
      </div>

      <div>
        <span className="text-xs font-bold text-blue-700 dark:text-cyan-400 uppercase tracking-wider block">
          {t.projects.labels.solution}:
        </span>
        <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {architectureSolution}
        </p>
      </div>
    </div>
  );
};
