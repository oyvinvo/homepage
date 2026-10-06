import React from 'react';
import { Code2, Compass, GitBranch, Layers, Network, Users } from 'lucide-react';
import { LeadershipPillarCard } from './LeadershipPillarCard';

export const LeadershipSection: React.FC = () => {
  const pillars = [
    {
      icon: Code2,
      title: 'Clean Code & Readability First',
      description:
        'Code is communication between human engineers. I am passionate about writing clean, expressive, and easily readable code—prioritizing small single-purpose functions, self-documenting naming, and zero bloat so codebases are effortless to read, review, and maintain.',
      accent: 'text-rose-600 border-rose-200 bg-rose-50 dark:text-rose-400 dark:border-rose-800/40 dark:bg-rose-950/20',
    },
    {
      icon: Layers,
      title: 'Domain-Driven Design (DDD)',
      description:
        'Decomposing complex business domains into clear bounded contexts and ubiquitous language. Isolating domain entities from technical infrastructure to ensure long-term evolutionary maintainability.',
      accent: 'text-cyan-700 border-cyan-200 bg-cyan-50 dark:text-cyan-400 dark:border-cyan-800/40 dark:bg-cyan-950/20',
    },
    {
      icon: GitBranch,
      title: 'ADR Governance & RFC Workflows',
      description:
        'Standardizing architectural decision-making via version-controlled Architecture Decision Records (ADRs). Fostering transparent design tradeoffs, collaborative RFC reviews, and peer consensus.',
      accent: 'text-amber-700 border-amber-200 bg-amber-50 dark:text-amber-400 dark:border-amber-800/40 dark:bg-amber-950/20',
    },
    {
      icon: Network,
      title: 'Event-Driven Distributed Systems',
      description:
        'Architecting resilient asynchronous event streaming with custom transactional PostgreSQL message queues and decoupled worker meshes. Ensuring eventual consistency, ACID transaction safety, and sub-50ms query performance.',
      accent: 'text-emerald-700 border-emerald-200 bg-emerald-50 dark:text-emerald-400 dark:border-emerald-800/40 dark:bg-emerald-950/20',
    },
    {
      icon: Users,
      title: 'Architect Guild & Technical Mentorship',
      description:
        'Leading the cross-functional architect group for the past two years. Guiding senior and staff engineers, establishing company-wide standards, and bridging executive strategy with everyday engineering execution.',
      accent: 'text-blue-700 border-blue-200 bg-blue-50 dark:text-blue-400 dark:border-blue-800/40 dark:bg-blue-950/20',
    },
    {
      icon: Compass,
      title: 'Pragmatic Engineering & Simplicity (KISS)',
      description:
        'Favoring straightforward, maintainable solutions over speculative complexity. Eliminating dead code, unnecessary technical layers, and bloated brokers in favor of clean architectures that solve real domain problems.',
      accent: 'text-indigo-700 border-indigo-200 bg-indigo-50 dark:text-indigo-400 dark:border-indigo-800/40 dark:bg-indigo-950/20',
    },
  ];

  return (
    <section
      id="leadership"
      className="py-20 border-b border-teal-300/80 dark:border-teal-900/60 bg-gradient-to-b from-teal-100/90 via-emerald-50/70 to-cyan-100/80 dark:from-[#082e2c] dark:via-[#0c403d] dark:to-[#05201f] transition-colors duration-200"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-teal-700 dark:text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <Compass className="w-4 h-4" aria-hidden="true" />
          <span>Strategic Practice</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-950 dark:text-white tracking-tight">
          Architectural Leadership & Engineering Philosophy
        </h2>
        <p className="mt-3 text-base sm:text-lg text-slate-700 dark:text-slate-300 max-w-3xl leading-relaxed">
          Great architecture is pragmatic, team-empowering, and rooted in clean, readable code. As Head of the Architect Group at KulturIT, I focus on core foundational principles that keep systems resilient, codebases effortless to read and maintain, and engineering teams aligned.
        </p>

        {/* 6 Pillars Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((pillar, idx) => (
            <LeadershipPillarCard
              key={idx}
              icon={pillar.icon}
              title={pillar.title}
              description={pillar.description}
              accent={pillar.accent}
            />
          ))}
        </div>

        {/* Leadership Quote Banner */}
        <div className="mt-12 p-6 rounded-xl bg-white/95 dark:bg-slate-900/80 border border-teal-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
          <div className="space-y-1">
            <div className="text-sm font-bold text-slate-900 dark:text-white">Passionate about clean architecture and domain-driven design?</div>
            <div className="text-xs text-slate-600 dark:text-slate-400">Always glad to exchange insights on technical governance, ADRs, and systems engineering.</div>
          </div>
          <a
            href="#contact"
            className="min-h-[44px] inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-md transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 shadow-sm"
          >
            <span>Connect & Exchange</span>
          </a>
        </div>
      </div>
    </section>
  );
};
