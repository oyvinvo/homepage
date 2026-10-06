import React from 'react';
import { Calendar, GraduationCap } from 'lucide-react';

const CS_COURSEWORK = [
  'Informatics (IFI)',
  'Distributed Systems',
  'Algorithms & Data Structures',
  'Database Systems',
  'Object-Oriented Design',
  'Software Architecture',
];

export const ExperienceEducationCard: React.FC = () => {
  return (
    <div className="mt-10 p-6 sm:p-8 rounded-xl bg-white/95 dark:bg-slate-900/60 border border-violet-300/80 dark:border-slate-800/80 shadow-md">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-violet-100 dark:bg-cyan-950/70 border border-violet-300 dark:border-cyan-800/60 flex items-center justify-center text-violet-700 dark:text-cyan-400 shrink-0 mt-0.5">
            <GraduationCap className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <span className="text-xs font-semibold text-violet-700 dark:text-cyan-400 uppercase tracking-wider">
              Academic Foundation & Computer Science
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-950 dark:text-white tracking-tight mt-0.5">
              Universitetet i Oslo (UiO)
            </h3>
            <div className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-200 mt-0.5">
              Bachelor's Degree & Graduate Coursework (Hovedfagskurs) in Informatics
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Institutt for informatikk (IFI) • Oslo, Norway
            </div>
          </div>
        </div>

        <div className="text-xs font-medium text-slate-500 dark:text-slate-400 sm:text-right shrink-0">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-100 text-violet-800 dark:bg-slate-800/80 dark:text-cyan-300 border border-violet-200 dark:border-slate-700/60">
            <Calendar className="w-3.5 h-3.5 text-violet-600 dark:text-cyan-400" aria-hidden="true" />
            <span>2004–2008</span>
          </span>
        </div>
      </div>

      <p className="mt-4 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
        Formative university education at Norway's premier computer science faculty (IFI), focusing on object-oriented software engineering, distributed algorithms, relational databases, data structures, and computer architecture.
      </p>

      <div className="mt-5 flex flex-wrap gap-1.5 pt-4 border-t border-violet-100 dark:border-slate-800/60">
        {CS_COURSEWORK.map((course) => (
          <span
            key={course}
            className="px-2.5 py-1 rounded-md text-xs font-medium bg-violet-100/70 text-violet-900 border border-violet-200/80 dark:bg-slate-800/70 dark:text-slate-300 dark:border-slate-700/60"
          >
            {course}
          </span>
        ))}
      </div>
    </div>
  );
};
