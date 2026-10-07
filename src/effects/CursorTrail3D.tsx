import React, { useEffect, useRef } from 'react';
import { CursorTrailCalculator, Particle3D } from './CursorTrailCalculator';
import { usePortfolioStore } from '../shared/store';

const PALETTE_DARK = ['#38bdf8', '#22d3ee', '#818cf8'];
const PALETTE_LIGHT = ['#0284c7', '#0ea5e9', '#6366f1'];

export const CursorTrail3D: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const theme = usePortfolioStore((state) => state.theme);

  useEffect(() => {
    // Vestibular accessibility: disable if user prefers reduced motion
    if (typeof window === 'undefined' || !window.matchMedia) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)')?.matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles: Particle3D[] = [];

    let lastSpawnX = -1000;
    let lastSpawnY = -1000;
    let isLoopRunning = false;
    let animFrameId: number;

    const palette = theme === 'dark' ? PALETTE_DARK : PALETTE_LIGHT;
    const getRandomColor = () => palette[Math.floor(Math.random() * palette.length)];

    const startLoopIfNeeded = () => {
      if (!isLoopRunning) {
        isLoopRunning = true;
        animFrameId = requestAnimationFrame(render);
      }
    };

    const handleMove = (clientX: number, clientY: number) => {
      const dist = Math.hypot(clientX - lastSpawnX, clientY - lastSpawnY);
      // Delicate, sparse spawn: 1 subtle micro-spark every 16px of travel
      if (dist > 16) {
        particles.push(
          CursorTrailCalculator.createParticle(
            clientX + (Math.random() - 0.5) * 4,
            clientY + (Math.random() - 0.5) * 4,
            getRandomColor(),
            false
          )
        );
        lastSpawnX = clientX;
        lastSpawnY = clientY;
        startLoopIfNeeded();
      }
    };

    const handleDown = (clientX: number, clientY: number) => {
      // Subtle 3-spark micro-accent on tap or click
      for (let i = 0; i < 3; i++) {
        particles.push(
          CursorTrailCalculator.createParticle(
            clientX + (Math.random() - 0.5) * 6,
            clientY + (Math.random() - 0.5) * 6,
            getRandomColor(),
            true
          )
        );
      }
      startLoopIfNeeded();
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      handleMove(e.clientX, e.clientY);
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      handleDown(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleDown(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      ctx.save();
      ctx.globalCompositeOperation = theme === 'dark' ? 'lighter' : 'source-over';

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        const isAlive = CursorTrailCalculator.updateParticle(p, 0.92);
        if (!isAlive) {
          particles.splice(i, 1);
          continue;
        }

        const centerProj = CursorTrailCalculator.project3D(p, 500, width / 2, height / 2);
        const radius = Math.max(0.7, p.size * 0.7 * centerProj.scale);

        // 1. Soft subtle outer glow aura
        ctx.beginPath();
        ctx.arc(centerProj.x, centerProj.y, radius * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha * 0.18;
        ctx.fill();

        // 2. Crisp tiny micro-spark core
        ctx.beginPath();
        ctx.arc(centerProj.x, centerProj.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = theme === 'dark' ? '#ffffff' : p.color;
        ctx.globalAlpha = p.alpha * 0.65;
        ctx.fill();
      }

      ctx.restore();

      // Automatically sleep when all micro-sparks fade out (zero CPU/GPU usage when idle)
      if (particles.length === 0) {
        isLoopRunning = false;
        ctx.clearRect(0, 0, width, height);
      } else {
        animFrameId = requestAnimationFrame(render);
      }
    };

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchStart);
      if (animFrameId) {
        cancelAnimationFrame(animFrameId);
      }
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 w-full h-full"
    />
  );
};
