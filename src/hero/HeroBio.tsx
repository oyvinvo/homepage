import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const HeroBio: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Leadership Status Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-100/90 dark:bg-cyan-950/70 border border-cyan-300 dark:border-cyan-800/60 text-cyan-900 dark:text-cyan-300 text-xs font-semibold shadow-sm">
        <ShieldCheck className="w-3.5 h-3.5 text-cyan-700 dark:text-cyan-400" aria-hidden="true" />
        <span>Head of Architect Group • KulturIT AS (2018–Present)</span>
      </div>

      {/* Executive Headline & Bio */}
      <div className="space-y-4">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-950 dark:text-white leading-[1.12]">
          Architecting Resilient Distributed Systems & Leading Engineering Guilds.
        </h1>
        <p className="text-lg sm:text-xl text-slate-700 dark:text-slate-300 font-normal leading-relaxed">
          I am <span className="text-slate-950 dark:text-white font-semibold">Øyvind Volden</span>, a System Architect, Tech Lead, and engineering leader based in Lillehammer, Norway. Since 2018, I have led the architecture group and core platforms at KulturIT, engineering high-availability Python and React/TypeScript architectures that safeguard over 10 million digital cultural heritage records.
        </p>
        <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          With an academic foundation in computer science from <span className="text-slate-900 dark:text-slate-200 font-medium">Universitetet i Oslo (UiO)</span> and 15+ years of experience across national transport systems (Statens vegvesen Autosys & Regelforvaltning), enterprise archives (NOARK 5), and multi-tenant SaaS, I specialize in Domain-Driven Design (DDD), Architecture Decision Records (ADRs), and microservices. I am passionate about <span className="text-slate-900 dark:text-white font-semibold">clean code and readability</span>—believing software should be written with clarity and simplicity so that it is effortless to read, review, and evolve.
        </p>
      </div>
    </div>
  );
};
