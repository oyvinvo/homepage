import React from 'react';
import { ArrowRight, Briefcase, FileText, Mail } from 'lucide-react';

interface HeroActionsProps {
  onScrollTo: (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => void;
  onOpenCv: () => void;
}

export const HeroActions: React.FC<HeroActionsProps> = ({ onScrollTo, onOpenCv }) => {
  return (
    <div className="pt-2 flex flex-wrap items-center gap-3">
      <a
        href="#projects"
        onClick={(e) => onScrollTo(e, 'projects')}
        className="min-h-[44px] inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-all shadow-md shadow-cyan-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 active:scale-[0.98]"
      >
        <span>View Architecture Case Studies</span>
        <ArrowRight className="w-4 h-4" aria-hidden="true" />
      </a>

      <a
        href="#experience"
        onClick={(e) => onScrollTo(e, 'experience')}
        className="min-h-[44px] inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-medium text-slate-800 bg-white hover:bg-slate-100 border border-slate-300 dark:text-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-slate-700/80 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 active:scale-[0.98] shadow-sm"
      >
        <Briefcase className="w-4 h-4 text-slate-500 dark:text-slate-400" aria-hidden="true" />
        <span>Career Milestones</span>
      </a>

      <button
        type="button"
        onClick={onOpenCv}
        className="min-h-[44px] inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-medium text-slate-800 bg-white hover:bg-slate-100 border border-slate-300 dark:text-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-slate-700/80 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 active:scale-[0.98] shadow-sm"
      >
        <FileText className="w-4 h-4 text-cyan-600 dark:text-cyan-400" aria-hidden="true" />
        <span>Full CV / Print View</span>
      </button>

      <a
        href="#contact"
        onClick={(e) => onScrollTo(e, 'contact')}
        className="min-h-[44px] inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
      >
        <Mail className="w-4 h-4 text-slate-500 dark:text-slate-400" aria-hidden="true" />
        <span>Contact</span>
      </a>
    </div>
  );
};
