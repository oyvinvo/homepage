import React from 'react';
import { ProjectCaseStudy } from '../shared/types';
import { useCardTilt } from '../effects/useCardTilt';
import { ProjectCardHeader } from './ProjectCardHeader';
import { ProjectCardChallengeSolution } from './ProjectCardChallengeSolution';
import { ProjectCardMetrics } from './ProjectCardMetrics';
import { ProjectCardTechStack } from './ProjectCardTechStack';

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
        <ProjectCardHeader
          client={project.client}
          period={project.period}
          title={project.title}
          links={project.links}
        />

        <p className="mt-3.5 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          {project.summary}
        </p>

        <ProjectCardChallengeSolution
          challenge={project.challenge}
          architectureSolution={project.architectureSolution}
        />

        <ProjectCardMetrics metrics={project.metrics} />
      </div>

      <ProjectCardTechStack
        techStack={project.techStack}
        links={project.links}
      />
    </article>
  );
};
