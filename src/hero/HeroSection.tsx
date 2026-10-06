import React from 'react';
import { usePortfolioStore } from '../shared/store';
import { HeroNetwork3D } from '../effects/HeroNetwork3D';
import { AmbientSpotlight } from '../effects/AmbientSpotlight';
import { HeroBio } from './HeroBio';
import { HeroActions } from './HeroActions';
import { HeroPortraitCard } from './HeroPortraitCard';
import { HeroMetricsGrid } from './HeroMetricsGrid';

export const HeroSection: React.FC = () => {
  const { setIsCvDrawerOpen, setActiveSection } = usePortfolioStore();

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

  return (
    <section
      id="hero"
      className="relative pt-12 pb-20 md:pt-20 md:pb-28 border-b border-sky-300/80 dark:border-sky-900/60 bg-gradient-to-b from-sky-100/90 via-sky-50/60 to-blue-100/70 dark:from-[#091e3d] dark:via-[#0d2a54] dark:to-[#061429] transition-colors duration-200 overflow-hidden"
    >
      <HeroNetwork3D />
      <AmbientSpotlight />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-8 space-y-6">
            <HeroBio />
            <HeroActions
              onScrollTo={handleScrollTo}
              onOpenCv={() => setIsCvDrawerOpen(true)}
            />
          </div>

          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <HeroPortraitCard />
          </div>
        </div>

        <HeroMetricsGrid />
      </div>
    </section>
  );
};
