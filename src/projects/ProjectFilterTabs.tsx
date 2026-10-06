import React from 'react';
import { ProjectCategory } from '../shared/types';

export interface CategoryOption {
  id: ProjectCategory;
  label: string;
}

export const CATEGORIES: CategoryOption[] = [
  { id: 'all', label: 'All Projects' },
  { id: 'distributed', label: 'Distributed Systems' },
  { id: 'event-driven', label: 'Event-Driven' },
  { id: 'modernization', label: 'Modernization' },
  { id: 'web', label: 'High-Scale Web' },
];

interface ProjectFilterTabsProps {
  selectedCategory: ProjectCategory;
  counts: Record<ProjectCategory, number>;
  onSelectCategory: (category: ProjectCategory) => void;
}

export const ProjectFilterTabs: React.FC<ProjectFilterTabsProps> = ({
  selectedCategory,
  counts,
  onSelectCategory,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Project Categories">
      {CATEGORIES.map((cat) => {
        const isSelected = selectedCategory === cat.id;
        return (
          <button
            key={cat.id}
            type="button"
            role="tab"
            aria-selected={isSelected}
            onClick={() => onSelectCategory(cat.id)}
            className={`min-h-[44px] inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all duration-150 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 shadow-sm ${
              isSelected
                ? 'bg-cyan-400 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'bg-white/90 text-slate-700 hover:text-slate-950 hover:bg-white border border-blue-200/80 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800 dark:border-slate-800'
            }`}
          >
            <span>{cat.label}</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                isSelected
                  ? 'bg-cyan-600/30 text-slate-950 font-bold'
                  : 'bg-slate-200/80 text-slate-700 dark:bg-slate-800 dark:text-slate-400'
              }`}
            >
              {counts[cat.id]}
            </span>
          </button>
        );
      })}
    </div>
  );
};
