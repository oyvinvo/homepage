import React from 'react';
import { useCardTilt } from '../effects/useCardTilt';

interface ContactCardProps {
  children: React.ReactNode;
  className?: string;
}

export const ContactCard: React.FC<ContactCardProps> = ({ children, className = '' }) => {
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
      className={`group relative p-6 rounded-xl bg-white/95 dark:bg-slate-900/60 border border-rose-200/70 dark:border-slate-800 hover:border-rose-400 dark:hover:border-rose-700/60 transition-colors shadow-sm flex flex-col justify-between overflow-hidden ${className}`}
    >
      {/* Specular glare overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-xl transition-opacity duration-300"
        style={{
          background: `radial-gradient(350px circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(244, 63, 94, 0.12), transparent 70%)`,
          opacity: glarePosition.opacity,
        }}
      />
      <div className="relative z-10 flex flex-col justify-between h-full space-y-4">
        {children}
      </div>
    </div>
  );
};
