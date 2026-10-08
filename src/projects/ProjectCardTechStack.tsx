import React from 'react';
import { ExternalLink } from 'lucide-react';
import { ProjectLink } from '../shared/types';
import { useTranslation } from '../i18n/useTranslation';

interface ProjectCardTechStackProps {
  techStack: string[];
  links?: ProjectLink[];
}

export const ProjectCardTechStack: React.FC<ProjectCardTechStackProps> = ({
  techStack,
  links,
}) => {
  const { t } = useTranslation();

  return (
    <div className="relative z-10 mt-6 pt-4 border-t border-blue-100 dark:border-slate-800/80">
      <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
        {t.projects.labels.techStack}:
      </div>
      <div className="flex flex-wrap gap-1.5">
        {techStack.map((tech, idx) => (
          <span
            key={idx}
            className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-blue-100/90 text-blue-900 border border-blue-200/90 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700/60"
          >
            {t.projects.techTags?.[tech] ?? tech}
          </span>
        ))}
      </div>

      {links && links.length > 0 && (
        <div className="mt-4 pt-3 border-t border-blue-100/70 dark:border-slate-800/60 flex flex-wrap items-center gap-2">
          {links.map((link, idx) => (
            <a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[36px] inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold text-cyan-800 bg-cyan-100 hover:bg-cyan-200 dark:text-cyan-300 dark:bg-cyan-950/70 dark:hover:bg-cyan-900/80 border border-cyan-300/80 dark:border-cyan-800/60 transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
            >
              <span>{t.projects.links?.[link.label] ?? link.label}</span>
              <ExternalLink className="w-3.5 h-3.5 text-cyan-700 dark:text-cyan-400" aria-hidden="true" />
            </a>
          ))}
        </div>
      )}
    </div>
  );
};
