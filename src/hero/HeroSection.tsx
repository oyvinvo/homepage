import React from 'react';
import { ArrowRight, Briefcase, FileText, Mail, ShieldCheck } from 'lucide-react';
import { usePortfolioStore } from '../shared/store';
import { HeroNetwork3D } from '../effects/HeroNetwork3D';
import { AmbientSpotlight } from '../effects/AmbientSpotlight';
import { useCardTilt } from '../effects/useCardTilt';

export const HeroSection: React.FC = () => {
  const { setIsCvDrawerOpen, setActiveSection } = usePortfolioStore();

  const metrics = [
    { value: '15+ Years', label: 'Architectural Leadership', detail: 'Distributed systems & modern web' },
    { value: '11,000+ Rules', label: 'Automated Rule Engine', detail: 'Statens vegvesen Regelforvaltning' },
    { value: '100k+ Approvals/Yr', label: 'National Modernization', detail: 'Autosys KSAK digital approvals' },
    { value: '10M+ Artifacts', label: 'Digital Cultural Heritage', detail: 'Preserved & accessed via KulturIT' },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setActiveSection(targetId);
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      const navOffset = 70;
      const elementPosition = targetEl.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      targetEl.classList.remove('target-glow');
      void targetEl.offsetWidth;
      targetEl.classList.add('target-glow');
      window.history.pushState(null, '', `#${targetId}`);
    }
  };

  const {
    cardRef: portraitRef,
    style: portraitTiltStyle,
    handleMouseMove: handlePortraitMouseMove,
    handleMouseLeave: handlePortraitMouseLeave,
  } = useCardTilt({
    maxTilt: 6,
    scale: 1.015,
  });

  return (
    <section
      id="hero"
      className="relative pt-12 pb-20 md:pt-20 md:pb-28 border-b border-sky-300/80 dark:border-sky-900/60 bg-gradient-to-b from-sky-100/90 via-sky-50/60 to-blue-100/70 dark:from-[#091e3d] dark:via-[#0d2a54] dark:to-[#061429] transition-colors duration-200 overflow-hidden"
    >
      {/* Ambient Interactive Spotlight & 3D Distributed Network Constellation */}
      <HeroNetwork3D />
      <AmbientSpotlight />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Main Bio / Headline Column */}
          <div className="lg:col-span-8 space-y-6">
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

            {/* Quick CTA Actions */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                onClick={(e) => handleScrollTo(e, 'projects')}
                className="min-h-[44px] inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-all shadow-md shadow-cyan-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 active:scale-[0.98]"
              >
                <span>View Architecture Case Studies</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>

              <a
                href="#experience"
                onClick={(e) => handleScrollTo(e, 'experience')}
                className="min-h-[44px] inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-medium text-slate-800 bg-white hover:bg-slate-100 border border-slate-300 dark:text-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-slate-700/80 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 active:scale-[0.98] shadow-sm"
              >
                <Briefcase className="w-4 h-4 text-slate-500 dark:text-slate-400" aria-hidden="true" />
                <span>Career Milestones</span>
              </a>

              <button
                type="button"
                onClick={() => setIsCvDrawerOpen(true)}
                className="min-h-[44px] inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-medium text-slate-800 bg-white hover:bg-slate-100 border border-slate-300 dark:text-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-slate-700/80 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 active:scale-[0.98] shadow-sm"
              >
                <FileText className="w-4 h-4 text-cyan-600 dark:text-cyan-400" aria-hidden="true" />
                <span>Full CV / Print View</span>
              </button>

              <a
                href="#contact"
                onClick={(e) => handleScrollTo(e, 'contact')}
                className="min-h-[44px] inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
              >
                <Mail className="w-4 h-4 text-slate-500 dark:text-slate-400" aria-hidden="true" />
                <span>Contact</span>
              </a>
            </div>
          </div>

          {/* Profile Portrait Card Column */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div className="relative group w-64 sm:w-72 lg:w-full max-w-[280px]">
              {/* Ambient colorful background glow */}
              <div
                className="absolute -inset-1.5 rounded-3xl bg-gradient-to-tr from-cyan-400/30 via-sky-400/20 to-amber-400/30 dark:from-cyan-500/20 dark:via-sky-500/10 dark:to-amber-500/20 blur-md opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                aria-hidden="true"
              />

              <div
                ref={portraitRef}
                style={portraitTiltStyle}
                onMouseMove={handlePortraitMouseMove}
                onMouseLeave={handlePortraitMouseLeave}
                className="relative rounded-2xl bg-white/95 dark:bg-slate-900/90 border border-sky-200/90 dark:border-slate-700/80 p-3 shadow-xl dark:shadow-2xl backdrop-blur-sm"
              >
                <picture>
                  <source
                    type="image/webp"
                    srcSet={`${import.meta.env.BASE_URL}images/oyvind-volden.webp 1x, ${import.meta.env.BASE_URL}images/oyvind-volden-800.webp 2x`}
                  />
                  <img
                    src={`${import.meta.env.BASE_URL}images/oyvind-volden.jpg`}
                    alt="Portrait of Øyvind Volden"
                    width={400}
                    height={400}
                    loading="eager"
                    decoding="async"
                    className="w-full aspect-square object-cover rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm"
                  />
                </picture>

                <div className="mt-3 px-1.5 pb-0.5 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">Øyvind Volden</div>
                    <div className="text-slate-500 dark:text-slate-400 text-[11px]">Lillehammer, Norway</div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700/60 text-emerald-800 dark:text-emerald-300 text-[11px] font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" aria-hidden="true" />
                    Full-time @ KulturIT
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Core Verified Metrics Grid */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-10 border-t border-sky-200/70 dark:border-slate-800/80">
          {metrics.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-white/80 dark:bg-slate-900/50 border border-sky-200/70 dark:border-slate-800/70 shadow-sm"
            >
              <div className="text-2xl sm:text-3xl font-bold text-slate-950 dark:text-white tracking-tight">
                {item.value}
              </div>
              <div className="mt-1 text-sm font-semibold text-cyan-700 dark:text-cyan-400">
                {item.label}
              </div>
              <div className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                {item.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
