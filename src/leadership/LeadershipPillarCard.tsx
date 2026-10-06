import React from 'react';
import { LucideIcon } from 'lucide-react';
import { useCardTilt } from '../effects/useCardTilt';

interface LeadershipPillarCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  accent: string;
}

export const LeadershipPillarCard: React.FC<LeadershipPillarCardProps> = ({
  icon: Icon,
  title,
  description,
  accent,
}) => {
  const { cardRef, style, glarePosition, handleMouseMove, handleMouseLeave } = useCardTilt({
    maxTilt: 4,
    scale: 1.012,
  });

  return (
    <div
      ref={cardRef}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative p-6 sm:p-8 rounded-xl bg-white/90 dark:bg-slate-900/60 border border-teal-200/70 dark:border-slate-800 hover:border-teal-400 dark:hover:border-teal-700/60 transition-colors shadow-sm overflow-hidden"
    >
      {/* Specular glare overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(350px circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(45, 212, 191, 0.12), transparent 70%)`,
        }}
      />

      <div className="relative z-10">
        <div className={`w-12 h-12 rounded-lg border flex items-center justify-center mb-5 ${accent}`}>
          <Icon className="w-6 h-6" aria-hidden="true" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">{title}</h3>
        <p className="mt-2.5 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};
