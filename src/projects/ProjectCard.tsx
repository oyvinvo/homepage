import React from 'react';
import { ExternalLink } from 'lucide-react';
import { ProjectCaseStudy } from '../shared/types';
import { useCardTilt } from '../effects/useCardTilt';

interface ProjectCardProps {
  project: ProjectCaseStudy;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { cardRef, style, glarePosition, handleMouseMove, handleMouseLeave } = useCardTilt({
    maxTilt: 4,
    scale: 1.01,
  });

  return (
    <article
      ref={cardRef}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative flex flex-col justify-between p-6 sm:p-8 rounded-xl bg-white/95 dark:bg-slate-900/50 border border-blue-200/70 dark:border-slate-800 hover:border-blue-400 dark:hover:border-cyan-700/60 transition-colors shadow-sm overflow-hidden"
    >
      {/* Specular glare overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(400px circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(56, 189, 248, 0.12), transparent 70%)`,
        }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-blue-700 dark:text-cyan-400 uppercase tracking-wider">
              {project.client} • {project.period}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-950 dark:text-white tracking-tight">
              {project.title}
            </h3>
          </div>
          {project.links && project.links.length > 0 && (
            <a
              href={project.links[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2 rounded-md text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
              aria-label={`${project.title} external link (opens in new window)`}
            >
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
            </a>
          )}
        </div>

        {/* Summary */}
        <p className="mt-3.5 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          {project.summary}
        </p>

        {/* Challenge & Architecture Solution */}
        <div className="mt-5 space-y-3 pt-4 border-t border-blue-100 dark:border-slate-800/80">
          <div>
            <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">
              Architectural Challenge:
            </span>
            <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {project.challenge}
            </p>
          </div>

          <div>
            <span className="text-xs font-bold text-blue-700 dark:text-cyan-400 uppercase tracking-wider block">
              Solution Architecture:
            </span>
            <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {project.architectureSolution}
            </p>
          </div>
        </div>

        {/* Metrics */}
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3 p-3 rounded-lg bg-blue-50/80 dark:bg-slate-950/70 border border-blue-200/70 dark:border-slate-800/70">
          {project.metrics.map((metric, idx) => (
            <div key={idx} className="space-y-0.5">
              <div className="text-base sm:text-lg font-bold text-slate-950 dark:text-white tracking-tight">
                {metric.value}
              </div>
              <div className="text-[11px] font-semibold text-blue-800 dark:text-cyan-300">
                {metric.label}
              </div>
              {metric.detail && (
                <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                  {metric.detail}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack Pills */}
      <div className="relative z-10 mt-6 pt-4 border-t border-blue-100 dark:border-slate-800/80">
        <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
          Key Technologies:
        </div>
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.map((tech, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-blue-100/90 text-blue-900 border border-blue-200/90 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700/60"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Project Links / Live Demos */}
        {project.links && project.links.length > 0 && (
          <div className="mt-4 pt-3 border-t border-blue-100/70 dark:border-slate-800/60 flex flex-wrap items-center gap-2">
            {project.links.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[36px] inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold text-cyan-800 bg-cyan-100 hover:bg-cyan-200 dark:text-cyan-300 dark:bg-cyan-950/70 dark:hover:bg-cyan-900/80 border border-cyan-300/80 dark:border-cyan-800/60 transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
              >
                <span>{link.label}</span>
                <ExternalLink className="w-3.5 h-3.5 text-cyan-700 dark:text-cyan-400" aria-hidden="true" />
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
};
