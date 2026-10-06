import React from 'react';
import { Cpu } from 'lucide-react';
import { skillsCatalog } from './skillsCatalog';
import { SkillQuadrantCard } from './SkillQuadrantCard';

export const SkillsSection: React.FC = () => {
  return (
    <section
      id="skills"
      className="py-20 border-b border-amber-300/80 dark:border-amber-900/60 bg-gradient-to-b from-amber-100/90 via-orange-50/60 to-yellow-100/70 dark:from-[#2e200a] dark:via-[#3d2a0d] dark:to-[#1c1306] transition-colors duration-200"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-amber-800 dark:text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <Cpu className="w-4 h-4" aria-hidden="true" />
          <span>Core Competencies</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-950 dark:text-white tracking-tight">
          Technology & Methodology Matrix
        </h2>
        <p className="mt-3 text-base sm:text-lg text-slate-700 dark:text-slate-300 max-w-3xl leading-relaxed">
          A balanced competency portfolio spanning system architecture, domain modeling, cloud orchestration, and high-performance frontend engineering.
        </p>

        {/* 4-Quadrant Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillsCatalog.map((group) => (
            <SkillQuadrantCard key={group.id} group={group} />
          ))}
        </div>
      </div>
    </section>
  );
};
