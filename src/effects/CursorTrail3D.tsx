import React, { useEffect, useRef } from 'react';
import { CursorTrailCalculator, Particle3D, Point3D } from './CursorTrailCalculator';
import { usePortfolioStore } from '../shared/store';

interface TrailPoint {
  x: number;
  y: number;
  z: number;
  time: number;
}

const PALETTE_DARK = ['#22d3ee', '#38bdf8', '#818cf8', '#f59e0b'];
const PALETTE_LIGHT = ['#0284c7', '#2563eb', '#6366f1', '#d97706'];

export const CursorTrail3D: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const theme = usePortfolioStore((state) => state.theme);

  useEffect(() => {
    // Vestibular accessibility: disable if user prefers reduced motion
    if (typeof window === 'undefined' || !window.matchMedia) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // Disable on touch-only devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

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
    const trailPoints: TrailPoint[] = [];
    const MAX_TRAIL_POINTS = 14;

    let mouseX = -1000;
    let mouseY = -1000;
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

    const handlePointerMove = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      trailPoints.unshift({
        x: mouseX,
        y: mouseY,
        z: Math.sin(Date.now() * 0.005) * 20,
        time: Date.now(),
      });
      if (trailPoints.length > MAX_TRAIL_POINTS) {
        trailPoints.pop();
      }

      const dist = Math.hypot(mouseX - lastSpawnX, mouseY - lastSpawnY);
      if (dist > 8) {
        const count = Math.min(3, Math.floor(dist / 12) + 1);
        for (let i = 0; i < count; i++) {
          particles.push(
            CursorTrailCalculator.createParticle(
              mouseX + (Math.random() - 0.5) * 6,
              mouseY + (Math.random() - 0.5) * 6,
              getRandomColor(),
              false
            )
          );
        }
        lastSpawnX = mouseX;
        lastSpawnY = mouseY;
      }

      startLoopIfNeeded();
    };

    const handlePointerDown = (e: PointerEvent) => {
      const clickX = e.clientX;
      const clickY = e.clientY;
      for (let i = 0; i < 12; i++) {
        particles.push(
          CursorTrailCalculator.createParticle(clickX, clickY, getRandomColor(), true)
        );
      }
      startLoopIfNeeded();
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });

    // 3D Diamond vertices (octahedron model in local space)
    const baseVertices: Point3D[] = [
      { x: 0, y: -1, z: 0 },
      { x: 1, y: 0, z: 0 },
      { x: 0, y: 1, z: 0 },
      { x: -1, y: 0, z: 0 },
      { x: 0, y: 0, z: 1 },
      { x: 0, y: 0, z: -1 },
    ];

    const faces = [
      [0, 1, 4],
      [1, 2, 4],
      [2, 3, 4],
      [3, 0, 4],
      [0, 1, 5],
      [1, 2, 5],
      [2, 3, 5],
      [3, 0, 5],
    ];

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw glowing 3D connected filament trail
      const now = Date.now();
      while (trailPoints.length > 0 && now - trailPoints[trailPoints.length - 1].time > 220) {
        trailPoints.pop();
      }

      if (trailPoints.length > 2) {
        ctx.save();
        ctx.globalCompositeOperation = theme === 'dark' ? 'lighter' : 'source-over';
        for (let i = 0; i < trailPoints.length - 1; i++) {
          const ptA = trailPoints[i];
          const ptB = trailPoints[i + 1];
          const progress = 1 - i / trailPoints.length;

          const projA = CursorTrailCalculator.project3D(ptA, 500, width / 2, height / 2);
          const projB = CursorTrailCalculator.project3D(ptB, 500, width / 2, height / 2);

          ctx.beginPath();
          ctx.moveTo(projA.x, projA.y);
          ctx.lineTo(projB.x, projB.y);
          ctx.strokeStyle = theme === 'dark' ? '#38bdf8' : '#0284c7';
          ctx.lineWidth = Math.max(0.5, 3.2 * progress * projA.scale);
          ctx.globalAlpha = progress * 0.45;
          ctx.lineCap = 'round';
          ctx.stroke();
        }
        ctx.restore();
      }

      // 2. Draw 3D tumbling particles
      ctx.save();
      ctx.globalCompositeOperation = theme === 'dark' ? 'lighter' : 'source-over';

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        const isAlive = CursorTrailCalculator.updateParticle(p, 0.94);
        if (!isAlive) {
          particles.splice(i, 1);
          continue;
        }

        const centerProj = CursorTrailCalculator.project3D(p, 450, width / 2, height / 2);

        // Project rotated 3D diamond vertices
        const projectedVertices = baseVertices.map((v) => {
          const scaled: Point3D = {
            x: v.x * p.size,
            y: v.y * p.size,
            z: v.z * p.size,
          };
          const rotated = CursorTrailCalculator.rotate3D(scaled, p.rotX, p.rotY, p.rotZ);
          return {
            x: centerProj.x + rotated.x * centerProj.scale,
            y: centerProj.y + rotated.y * centerProj.scale,
          };
        });

        // Draw diamond faces
        ctx.fillStyle = p.color;
        ctx.strokeStyle = theme === 'dark' ? '#ffffff' : '#0f172a';
        ctx.lineWidth = 0.5;

        for (const [v0, v1, v2] of faces) {
          ctx.globalAlpha = p.alpha * 0.35;
          ctx.beginPath();
          ctx.moveTo(projectedVertices[v0].x, projectedVertices[v0].y);
          ctx.lineTo(projectedVertices[v1].x, projectedVertices[v1].y);
          ctx.lineTo(projectedVertices[v2].x, projectedVertices[v2].y);
          ctx.closePath();
          ctx.fill();

          ctx.globalAlpha = p.alpha * 0.6;
          ctx.stroke();
        }

        // Draw luminous spark core
        ctx.globalAlpha = p.alpha * 0.85;
        ctx.beginPath();
        ctx.arc(centerProj.x, centerProj.y, Math.max(1, p.size * 0.25 * centerProj.scale), 0, Math.PI * 2);
        ctx.fillStyle = theme === 'dark' ? '#ffffff' : p.color;
        ctx.fill();
      }

      ctx.restore();

      // If all particles and trail points have faded out, sleep
      if (particles.length === 0 && trailPoints.length === 0) {
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
