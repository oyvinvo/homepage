import React from 'react';
import { SkillCategoryGroup } from '../shared/types';
import { useCardTilt } from '../effects/useCardTilt';
import { useTranslation } from '../i18n/useTranslation';

interface SkillQuadrantCardProps {
  group: SkillCategoryGroup;
}

export const SkillQuadrantCard: React.FC<SkillQuadrantCardProps> = ({ group }) => {
  const { t } = useTranslation();
  const localizedGroup = t.skills.quadrants[group.id as keyof typeof t.skills.quadrants];
  const title = localizedGroup?.title ?? group.title;
  const description = localizedGroup?.description ?? group.description;

  const formatLevel = (level: string) => {
    const lower = level.toLowerCase();
    if (lower.includes('core')) return t.skills.levels.core;
    if (lower.includes('expert')) return t.skills.levels.expert;
    if (lower.includes('advanc')) return t.skills.levels.advanced;
    if (lower.includes('profic')) return t.skills.levels.proficient;
    return level;
  };

  const {
    cardRef,
    style,
    glarePosition,
    handleMouseMove,
    handleMouseLeave,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  } = useCardTilt({
    maxTilt: 4,
    scale: 1.012,
  });

  return (
    <div
      ref={cardRef}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="group relative p-6 sm:p-8 rounded-xl bg-white/95 dark:bg-slate-900/50 border border-amber-200/70 dark:border-slate-800 hover:border-amber-300 dark:hover:border-amber-700/60 transition-colors shadow-sm flex flex-col justify-between overflow-hidden"
    >
      {/* Specular glare overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-xl transition-opacity duration-300"
        style={{
          background: `radial-gradient(350px circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(245, 158, 11, 0.12), transparent 70%)`,
          opacity: glarePosition.opacity,
        }}
      />

      <div className="relative z-10">
        <h3 className="text-xl font-bold text-slate-950 dark:text-white tracking-tight">{title}</h3>
        <p className="mt-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Skills Tags */}
      <div className="relative z-10 mt-6 flex flex-wrap gap-2 pt-4 border-t border-amber-100 dark:border-slate-800/60">
        {group.skills.map((skill, idx) => (
          <span
            key={idx}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              skill.highlight
                ? 'bg-amber-100 text-amber-950 border-amber-300 font-semibold dark:bg-cyan-950/70 dark:border-cyan-800/70 dark:text-cyan-200'
                : 'bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-800/80 dark:border-slate-700/60 dark:text-slate-300'
            }`}
          >
            <span>{t.skills.skillNames?.[skill.name] ?? skill.name}</span>
            {skill.level && (
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">
                ({formatLevel(skill.level)})
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
};
