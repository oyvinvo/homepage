import { describe, it, expect } from 'vitest';
import { CursorTrailCalculator } from './CursorTrailCalculator';

describe('CursorTrailCalculator', () => {
  describe('project3D', () => {
    it('uses default parameters (fov=400, centerX=0, centerY=0) when omitted', () => {
      const projected = CursorTrailCalculator.project3D({ x: 50, y: 80, z: 0 });
      expect(projected.scale).toBe(1.0);
      expect(projected.x).toBe(50);
      expect(projected.y).toBe(80);
    });

    it('projects point with zero Z to exact coordinates with scale 1.0', () => {
      const projected = CursorTrailCalculator.project3D({ x: 100, y: 200, z: 0 }, 400, 100, 200);
      expect(projected.scale).toBe(1.0);
      expect(projected.x).toBe(100);
      expect(projected.y).toBe(200);
    });

    it('scales down objects with positive Z (farther away into screen)', () => {
      const projected = CursorTrailCalculator.project3D({ x: 300, y: 400, z: 400 }, 400, 0, 0);
      expect(projected.scale).toBe(0.5);
      expect(projected.x).toBe(150);
      expect(projected.y).toBe(200);
    });

    it('scales up objects with negative Z (closer to viewer)', () => {
      const projected = CursorTrailCalculator.project3D({ x: 200, y: 100, z: -200 }, 400, 0, 0);
      expect(projected.scale).toBe(2.0);
      expect(projected.x).toBe(400);
      expect(projected.y).toBe(200);
    });

    it('safely clamps extreme negative Z values behind camera to avoid divide by zero', () => {
      const projected = CursorTrailCalculator.project3D({ x: 50, y: 50, z: -500 }, 400, 0, 0);
      // effectiveZ clamped to -fov + 10 = -390 -> scale = 400 / 10 = 40
      expect(projected.scale).toBe(40);
      expect(projected.x).toBe(50 * 40);
      expect(projected.y).toBe(50 * 40);
    });

    it('enforces a minimum scale of 0.01 for infinitely distant points', () => {
      const projected = CursorTrailCalculator.project3D({ x: 100, y: 100, z: 1000000 }, 400, 0, 0);
      expect(projected.scale).toBe(0.01);
    });

    it('calculates screen positions relative to custom center points', () => {
      const projected = CursorTrailCalculator.project3D({ x: 300, y: 300, z: 400 }, 400, 100, 100);
      // scale = 0.5; x = 100 + (300 - 100) * 0.5 = 200
      expect(projected.x).toBe(200);
      expect(projected.y).toBe(200);
    });
  });

  describe('3D Rotations', () => {
    it('rotates point around X axis with trigonometric precision', () => {
      const angle = Math.PI / 4;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const { y, z } = CursorTrailCalculator.rotateX(2, 3, angle);
      expect(y).toBeCloseTo(2 * cos - 3 * sin, 6);
      expect(z).toBeCloseTo(2 * sin + 3 * cos, 6);
    });

    it('rotates point around Y axis with trigonometric precision', () => {
      const angle = Math.PI / 4;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const { x, z } = CursorTrailCalculator.rotateY(2, 3, angle);
      expect(x).toBeCloseTo(2 * cos + 3 * sin, 6);
      expect(z).toBeCloseTo(-2 * sin + 3 * cos, 6);
    });

    it('rotates point around Z axis with trigonometric precision', () => {
      const angle = Math.PI / 4;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const { x, y } = CursorTrailCalculator.rotateZ(2, 3, angle);
      expect(x).toBeCloseTo(2 * cos - 3 * sin, 6);
      expect(y).toBeCloseTo(2 * sin + 3 * cos, 6);
    });

    it('rotates 90 degrees around X, Y, and Z correctly', () => {
      const rotX = CursorTrailCalculator.rotateX(1, 0, Math.PI / 2);
      expect(Math.abs(rotX.y)).toBeCloseTo(0, 5);
      expect(rotX.z).toBeCloseTo(1, 5);

      const rotY = CursorTrailCalculator.rotateY(1, 0, Math.PI / 2);
      expect(Math.abs(rotY.x)).toBeCloseTo(0, 5);
      expect(rotY.z).toBeCloseTo(-1, 5);

      const rotZ = CursorTrailCalculator.rotateZ(1, 0, Math.PI / 2);
      expect(Math.abs(rotZ.x)).toBeCloseTo(0, 5);
      expect(rotZ.y).toBeCloseTo(1, 5);
    });

    it('performs composite 3D rotation across all Euler axes', () => {
      const point = { x: 1, y: 2, z: 3 };
      const rotX = Math.PI / 6;
      const rotY = Math.PI / 4;
      const rotZ = Math.PI / 3;

      const rotated = CursorTrailCalculator.rotate3D(point, rotX, rotY, rotZ);

      // Verify chained rotation matches
      const step1 = CursorTrailCalculator.rotateX(point.y, point.z, rotX);
      const step2 = CursorTrailCalculator.rotateY(point.x, step1.z, rotY);
      const step3 = CursorTrailCalculator.rotateZ(step2.x, step1.y, rotZ);

      expect(rotated.x).toBeCloseTo(step3.x, 6);
      expect(rotated.y).toBeCloseTo(step3.y, 6);
      expect(rotated.z).toBeCloseTo(step2.z, 6);
    });
  });

  describe('createParticle & updateParticle lifecycle', () => {
    it('creates standard trail particle with valid bounds and types', () => {
      const p = CursorTrailCalculator.createParticle(250, 350, '#38bdf8', false);
      expect(p.id.startsWith('p-')).toBe(true);
      expect(p.x).toBe(250);
      expect(p.y).toBe(350);
      expect(p.z).toBeGreaterThanOrEqual(-20);
      expect(p.z).toBeLessThanOrEqual(20);
      expect(p.color).toBe('#38bdf8');
      expect(p.alpha).toBe(1);
      expect(p.size).toBeGreaterThanOrEqual(4);
      expect(p.size).toBeLessThanOrEqual(9);
      expect(p.life).toBeGreaterThanOrEqual(25);
      expect(p.life).toBeLessThanOrEqual(45);
      expect(p.maxLife).toBe(p.life);
    });

    it('creates burst particles with higher velocity and distinct size bounds', () => {
      const burst = CursorTrailCalculator.createParticle(100, 100, '#f59e0b', true);
      expect(burst.color).toBe('#f59e0b');
      expect(burst.size).toBeGreaterThanOrEqual(3);
      expect(burst.size).toBeLessThanOrEqual(7);
      expect(burst.life).toBeGreaterThanOrEqual(35);
      expect(burst.life).toBeLessThanOrEqual(60);
      expect(burst.maxLife).toBe(burst.life);
    });

    it('updates position, applies custom friction, rotates, and decreases alpha', () => {
      const p = CursorTrailCalculator.createParticle(100, 100, '#38bdf8', false);
      p.x = 100;
      p.y = 100;
      p.z = 10;
      p.vx = 10;
      p.vy = 5;
      p.vz = 4;
      p.rotX = 0;
      p.rotY = 0;
      p.rotZ = 0;
      p.vRotX = 0.05;
      p.vRotY = 0.03;
      p.vRotZ = 0.02;
      p.life = 10;
      p.maxLife = 20;

      const stillAlive = CursorTrailCalculator.updateParticle(p, 0.9);
      expect(stillAlive).toBe(true);
      expect(p.x).toBe(110);
      expect(p.y).toBe(105);
      expect(p.z).toBe(14);
      expect(p.vx).toBe(9);
      expect(p.vy).toBe(4.5);
      expect(p.vz).toBeCloseTo(3.6, 5);
      expect(p.rotX).toBeCloseTo(0.05, 5);
      expect(p.rotY).toBeCloseTo(0.03, 5);
      expect(p.rotZ).toBeCloseTo(0.02, 5);
      expect(p.life).toBe(9);
      expect(p.alpha).toBeCloseTo(9 / 20, 5);
    });

    it('uses default friction 0.94 when friction parameter is omitted', () => {
      const p = CursorTrailCalculator.createParticle(0, 0, '#fff');
      p.vx = 10;
      p.vy = 10;
      p.vz = 10;
      p.life = 10;
      p.maxLife = 10;

      CursorTrailCalculator.updateParticle(p);
      expect(p.vx).toBeCloseTo(10 * 0.94, 5);
      expect(p.vy).toBeCloseTo(10 * 0.94, 5);
      expect(p.vz).toBeCloseTo(10 * 0.94, 5);
    });

    it('returns false and resets alpha to 0 when life drops to 0 or below', () => {
      const p1 = CursorTrailCalculator.createParticle(100, 100, '#38bdf8', false);
      p1.life = 1;
      expect(CursorTrailCalculator.updateParticle(p1)).toBe(false);
      expect(p1.alpha).toBe(0);

      const p2 = CursorTrailCalculator.createParticle(100, 100, '#38bdf8', false);
      p2.life = 0;
      expect(CursorTrailCalculator.updateParticle(p2)).toBe(false);
      expect(p2.alpha).toBe(0);

      const p3 = CursorTrailCalculator.createParticle(100, 100, '#38bdf8', false);
      p3.life = -5;
      expect(CursorTrailCalculator.updateParticle(p3)).toBe(false);
      expect(p3.alpha).toBe(0);
    });
  });
});
