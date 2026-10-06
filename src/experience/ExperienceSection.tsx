import React from 'react';
import { Briefcase, Calendar, ChevronDown, ChevronUp, GraduationCap, MapPin } from 'lucide-react';
import { experienceCatalog } from './experienceCatalog';
import { usePortfolioStore } from '../shared/store';

export const ExperienceSection: React.FC = () => {
  const { expandedMilestoneId, setExpandedMilestoneId } = usePortfolioStore();

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
          <span>Track Record</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-950 dark:text-white tracking-tight">
          Career Milestones & Architecture History
        </h2>
        <p className="mt-3 text-base sm:text-lg text-slate-700 dark:text-slate-300 max-w-3xl leading-relaxed">
          Over 15 years leading engineering teams, modernizing critical Norwegian transport infrastructure, and architecting national cultural heritage repositories.
        </p>

        {/* Milestones List */}
        <div className="mt-12 space-y-6">
          {experienceCatalog.map((milestone) => {
            const isExpanded = expandedMilestoneId === milestone.id;
            return (
              <article
                key={milestone.id}
                className="p-6 sm:p-8 rounded-xl bg-white/95 dark:bg-slate-900/50 border border-violet-200/70 dark:border-slate-800 hover:border-violet-300 dark:hover:border-slate-700 transition-all shadow-sm"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xl sm:text-2xl font-bold text-slate-950 dark:text-white tracking-tight">
                        {milestone.role}
                      </span>
                      {milestone.badge && (
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-violet-100 text-violet-800 border border-violet-300 dark:bg-cyan-950 dark:text-cyan-300 dark:border-cyan-800/60">
                          {milestone.badge}
                        </span>
                      )}
                    </div>

                    <div className="text-base font-bold text-violet-700 dark:text-cyan-400">
                      {milestone.company}
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" aria-hidden="true" />
                        {milestone.period}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" aria-hidden="true" />
                        {milestone.location}
                      </span>
                    </div>
                  </div>

                  {/* Expand / Details Toggle Button */}
                  <button
                    type="button"
                    onClick={() => toggleMilestone(milestone.id)}
                    className="self-start min-h-[44px] inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 dark:text-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 dark:hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 shadow-sm"
                    aria-expanded={isExpanded}
                    aria-controls={`details-${milestone.id}`}
                  >
                    <span>{isExpanded ? 'Hide Highlights' : 'View Highlights'}</span>
                    {isExpanded ? (
                      <ChevronUp className="w-3.5 h-3.5" aria-hidden="true" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
                    )}
                  </button>
                </div>

                {/* Summary Text */}
                <p className="mt-4 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                  {milestone.summary}
                </p>

                {/* Expandable Architecture Highlights */}
                {isExpanded && (
                  <div id={`details-${milestone.id}`} className="mt-5 pt-5 border-t border-violet-100 dark:border-slate-800/80 space-y-4">
                    <div>
                      <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                        Architectural Deliverables & Impact:
                      </h4>
                      <ul className="space-y-2 list-disc list-outside ml-4 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                        {milestone.architectureHighlights.map((highlight, idx) => (
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
          })}
        </div>

        {/* Academic Foundation: Universitetet i Oslo (UiO) */}
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
            {[
              'Informatics (IFI)',
              'Distributed Systems',
              'Algorithms & Data Structures',
              'Database Systems',
              'Object-Oriented Design',
              'Software Architecture',
            ].map((course) => (
              <span
                key={course}
                className="px-2.5 py-1 rounded-md text-xs font-medium bg-violet-100/70 text-violet-900 border border-violet-200/80 dark:bg-slate-800/70 dark:text-slate-300 dark:border-slate-700/60"
              >
                {course}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
