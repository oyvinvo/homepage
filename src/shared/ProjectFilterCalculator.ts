import { ProjectCaseStudy, ProjectCategory } from './types';

export class ProjectFilterCalculator {
  /**
   * Filters a list of projects by category and search query.
   */
  public static filter(
    projects: ProjectCaseStudy[],
    category: ProjectCategory,
    query: string
  ): ProjectCaseStudy[] {
    const trimmedQuery = query.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesCategory = category === 'all' || project.category === category;
      if (!matchesCategory) return false;

      if (!trimmedQuery) return true;

      const titleMatch = project.title.toLowerCase().includes(trimmedQuery);
      const clientMatch = project.client.toLowerCase().includes(trimmedQuery);
      const summaryMatch = project.summary.toLowerCase().includes(trimmedQuery);
      const challengeMatch = project.challenge.toLowerCase().includes(trimmedQuery);
      const solutionMatch = project.architectureSolution.toLowerCase().includes(trimmedQuery);
      const stackMatch = project.techStack.some((tech) => tech.toLowerCase().includes(trimmedQuery));
      const metricsMatch = project.metrics.some(
        (m) => m.label.toLowerCase().includes(trimmedQuery) || m.value.toLowerCase().includes(trimmedQuery)
      );

      return (
        titleMatch ||
        clientMatch ||
        summaryMatch ||
        challengeMatch ||
        solutionMatch ||
        stackMatch ||
        metricsMatch
      );
    });
  }

  /**
   * Calculates project tally grouped by each valid project category.
   */
  public static countByCategory(projects: ProjectCaseStudy[]): Record<ProjectCategory, number> {
    const counts: Record<ProjectCategory, number> = {
      all: projects.length,
      distributed: 0,
      'event-driven': 0,
      modernization: 0,
      web: 0,
    };

    for (const project of projects) {
      if (counts[project.category] !== undefined) {
        counts[project.category] += 1;
      }
    }

    return counts;
  }
}
