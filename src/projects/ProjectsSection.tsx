import React from 'react';
import { Layers, Search } from 'lucide-react';
import { projectsCatalog } from './projectsCatalog';
import { ProjectCard } from './ProjectCard';
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

  const categories: Array<{ id: ProjectCategory; label: string }> = [
    { id: 'all', label: 'All Projects' },
    { id: 'distributed', label: 'Distributed Systems' },
    { id: 'event-driven', label: 'Event-Driven' },
    { id: 'modernization', label: 'Modernization' },
    { id: 'web', label: 'High-Scale Web' },
  ];

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
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Project Categories">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => handleCategoryClick(cat.id)}
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

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stack, client, metrics..."
              aria-label="Search architecture projects"
              className="w-full pl-9 pr-3 py-2 rounded-lg text-xs bg-white/95 dark:bg-slate-900 border border-blue-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors shadow-sm"
            />
          </div>
        </div>

        {/* Projects Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Empty Search Result Fallback */}
        {filteredProjects.length === 0 && (
          <div className="mt-12 text-center p-12 rounded-xl bg-slate-900/30 border border-dashed border-slate-800 space-y-3">
            <div className="text-base font-semibold text-slate-300">No matching case studies found</div>
            <p className="text-xs text-slate-400">
              Try adjusting your search query or reset the category filter to view all projects.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="min-h-[44px] inline-flex items-center px-4 py-2 rounded-md text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
