import React from 'react';
import { useCardTilt } from '../effects/useCardTilt';

export const HeroPortraitCard: React.FC = () => {
  const {
    cardRef: portraitRef,
    style: portraitTiltStyle,
    handleMouseMove: handlePortraitMouseMove,
    handleMouseLeave: handlePortraitMouseLeave,
    handleTouchStart: handlePortraitTouchStart,
    handleTouchMove: handlePortraitTouchMove,
    handleTouchEnd: handlePortraitTouchEnd,
  } = useCardTilt({
    maxTilt: 6,
    scale: 1.015,
  });

  return (
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
        onTouchStart={handlePortraitTouchStart}
        onTouchMove={handlePortraitTouchMove}
        onTouchEnd={handlePortraitTouchEnd}
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
  );
};
