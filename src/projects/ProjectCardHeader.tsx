import React from 'react';
import { ExternalLink } from 'lucide-react';
import { ProjectLink } from '../shared/types';
import { useTranslation } from '../i18n/useTranslation';

interface ProjectCardHeaderProps {
  client: string;
  period: string;
  title: string;
  links?: ProjectLink[];
}

export const ProjectCardHeader: React.FC<ProjectCardHeaderProps> = ({
  client,
  period,
  title,
  links,
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-start justify-between gap-3">
      <div className="space-y-1">
        <span className="text-xs font-semibold text-blue-700 dark:text-cyan-400 uppercase tracking-wider">
          {client} • {period}
        </span>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-950 dark:text-white tracking-tight">
          {title}
        </h3>
      </div>
      {links && links.length > 0 && (
        <a
          href={links[0].url}
          target="_blank"
          rel="noopener noreferrer"
          className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2 rounded-md text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
          aria-label={t.projects.externalLinkAriaLabel.replace('{title}', title)}
        >
          <ExternalLink className="w-4 h-4" aria-hidden="true" />
        </a>
      )}
    </div>
  );
};
