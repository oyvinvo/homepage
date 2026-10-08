import React from 'react';
import { Search } from 'lucide-react';
import { useTranslation } from '../i18n/useTranslation';

interface ProjectSearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const ProjectSearchBar: React.FC<ProjectSearchBarProps> = ({
  value,
  onChange,
}) => {
  const { t } = useTranslation();

  return (
    <div className="relative w-full md:w-72">
      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t.projects.searchPlaceholder}
        aria-label="Search architecture projects"
        className="w-full pl-9 pr-3 py-2 rounded-lg text-xs bg-white/95 dark:bg-slate-900 border border-blue-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors shadow-sm"
      />
    </div>
  );
};
