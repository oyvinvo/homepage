import React from 'react';
import { Layers } from 'lucide-react';
import { projectsCatalog } from './projectsCatalog';
import { ProjectCard } from './ProjectCard';
import { ProjectFilterTabs } from './ProjectFilterTabs';
import { ProjectSearchBar } from './ProjectSearchBar';
import { ProjectEmptyState } from './ProjectEmptyState';
import { ProjectFilterCalculator } from '../shared/ProjectFilterCalculator';
import { ProjectCategory } from '../shared/types';
import { usePortfolioStore } from '../shared/store';

export const ProjectsSection: React.FC = () => {
  const { selectedCategory, setSelectedCategory, searchQuery, setSearchQuery } = usePortfolioStore();

  const filteredProjects = ProjectFilterCalculator.filter(
    projectsCatalog,
    selectedCategory,
    searchQuery
  );

  const counts = ProjectFilterCalculator.countByCategory(projectsCatalog);

  const handleCategoryClick = (catId: ProjectCategory) => {
    setSelectedCategory(catId);
    const sectionEl = document.getElementById('projects');
    if (sectionEl) {
      const rect = sectionEl.getBoundingClientRect();
      if (rect.top < 0 || rect.top > 250) {
        const navOffset = 70;
        const targetTop = rect.top + window.pageYOffset - navOffset;
        window.scrollTo({ top: targetTop, behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="projects"
      className="py-20 border-b border-blue-300/80 dark:border-blue-900/60 bg-gradient-to-b from-blue-100/90 via-sky-50/60 to-cyan-100/80 dark:from-[#0a275c] dark:via-[#0e357d] dark:to-[#071a3d] transition-colors duration-200"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-blue-700 dark:text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <Layers className="w-4 h-4" aria-hidden="true" />
          <span>Case Studies</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-950 dark:text-white tracking-tight">
          Featured Architecture Case Studies
        </h2>
        <p className="mt-3 text-base sm:text-lg text-slate-700 dark:text-slate-300 max-w-3xl leading-relaxed">
          Production case studies highlighting architectural solutions, technical tradeoffs, and verifiable business impact.
        </p>

        {/* Filters and Search Bar */}
        <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <ProjectFilterTabs
            selectedCategory={selectedCategory}
            counts={counts}
            onSelectCategory={handleCategoryClick}
          />

          <ProjectSearchBar
            value={searchQuery}
            onChange={setSearchQuery}
          />
        </div>

        {/* Projects Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Empty Search Result Fallback */}
        {filteredProjects.length === 0 && (
          <ProjectEmptyState
            onReset={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
          />
        )}
      </div>
    </section>
  );
};
