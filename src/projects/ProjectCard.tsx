import React from 'react';
import { ProjectCaseStudy } from '../shared/types';
import { useCardTilt } from '../effects/useCardTilt';
import { ProjectCardHeader } from './ProjectCardHeader';
import { ProjectCardChallengeSolution } from './ProjectCardChallengeSolution';
import { ProjectCardMetrics } from './ProjectCardMetrics';
import { ProjectCardTechStack } from './ProjectCardTechStack';
import { useTranslation } from '../i18n/useTranslation';

const CASE_STUDY_KEY_MAP: Record<string, 'ekulturHandover' | 'virtueltMuseum' | 'ekulturCoreGateway' | 'ekulturAiVision' | 'autosysKsak' | 'regelforvaltningEngine' | 'bekymringsmestring'> = {
  'ekultur-handover': 'ekulturHandover',
  'virtuelt-museum': 'virtueltMuseum',
  'ekultur-core-gateway': 'ekulturCoreGateway',
  'ekultur-ai-vision': 'ekulturAiVision',
  'autosys-ksak': 'autosysKsak',
  'regelforvaltning-engine': 'regelforvaltningEngine',
  'bekymringsmestring': 'bekymringsmestring',
};

interface ProjectCardProps {
  project: ProjectCaseStudy;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { t } = useTranslation();
  const caseKey = CASE_STUDY_KEY_MAP[project.id];
  const localized = caseKey ? t.projects.caseStudies[caseKey] : undefined;

  const title = localized?.title ?? project.title;
  const client = localized?.client ?? project.client;
  const period = localized?.period ?? project.period;
  const summary = localized?.summary ?? project.summary;
  const challenge = localized?.challenge ?? project.challenge;
  const architectureSolution = localized?.architectureSolution ?? project.architectureSolution;
  const metrics = localized?.metrics ?? project.metrics;

  const {
    cardRef,
    style,
    glarePosition,
    handleMouseMove,
    handleMouseLeave,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  } = useCardTilt({
    maxTilt: 4,
    scale: 1.01,
  });

  return (
    <article
      ref={cardRef}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="group relative flex flex-col justify-between p-6 sm:p-8 rounded-xl bg-white/95 dark:bg-slate-900/50 border border-blue-200/70 dark:border-slate-800 hover:border-blue-400 dark:hover:border-cyan-700/60 transition-colors shadow-sm overflow-hidden"
    >
      {/* Specular glare overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-xl transition-opacity duration-300"
        style={{
          background: `radial-gradient(400px circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(56, 189, 248, 0.12), transparent 70%)`,
          opacity: glarePosition.opacity,
        }}
      />

      <div className="relative z-10">
        <ProjectCardHeader
          client={client}
          period={period}
          title={title}
          links={project.links}
        />

        <p className="mt-3.5 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          {summary}
        </p>

        <ProjectCardChallengeSolution
          challenge={challenge}
          architectureSolution={architectureSolution}
        />

        <ProjectCardMetrics metrics={metrics} />
      </div>

      <ProjectCardTechStack
        techStack={project.techStack}
        links={project.links}
      />
    </article>
  );
};
