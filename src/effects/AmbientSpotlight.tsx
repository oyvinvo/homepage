import React, { useEffect, useRef } from 'react';

export interface AmbientSpotlightProps {
  className?: string;
}

export const AmbientSpotlight: React.FC<AmbientSpotlightProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Respect user's motion preference
    if (
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const parent = container.parentElement;
    if (!parent) return;

    let rafId: number | null = null;
    let targetX = 50;
    let targetY = 50;
    let currentX = 50;
    let currentY = 50;

    const updateGlow = () => {
      // Damped interpolation for smooth cinematic movement
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;

      container.style.setProperty('--mouse-x', `${currentX.toFixed(1)}%`);
      container.style.setProperty('--mouse-y', `${currentY.toFixed(1)}%`);

      if (Math.abs(targetX - currentX) > 0.1 || Math.abs(targetY - currentY) > 0.1) {
        rafId = requestAnimationFrame(updateGlow);
      } else {
        rafId = null;
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = parent.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      targetX = Math.max(0, Math.min(100, x));
      targetY = Math.max(0, Math.min(100, y));

      if (!rafId) {
        rafId = requestAnimationFrame(updateGlow);
      }
    };

    parent.addEventListener('pointermove', handlePointerMove, { passive: true });

    return () => {
      parent.removeEventListener('pointermove', handlePointerMove);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none overflow-hidden transition-opacity duration-700 ${className}`}
      style={
        {
          '--mouse-x': '50%',
          '--mouse-y': '30%',
          background: `
            radial-gradient(
              750px circle at var(--mouse-x, 50%) var(--mouse-y, 30%),
              rgba(14, 165, 233, 0.14) 0%,
              rgba(56, 189, 248, 0.06) 40%,
              transparent 70%
            )
          `,
        } as React.CSSProperties
      }
    />
  );
};
