import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { HeroConstellationSvg } from './HeroConstellationSvg';
import { usePortfolioStore } from '../shared/store';

const NODE_COUNT = 48;
const CONNECTION_DISTANCE = 3.6;

interface NodePoint {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
}

export const HeroNetwork3D: React.FC = () => {
  const [hasWebGL, setHasWebGL] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const theme = usePortfolioStore((state) => state.theme);

  useEffect(() => {
    // Detect WebGL support safely
    if (typeof window === 'undefined' || !window.WebGLRenderingContext) {
      setHasWebGL(false);
      return;
    }
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      setHasWebGL(Boolean(gl));
    } catch {
      setHasWebGL(false);
    }
  }, []);

  useEffect(() => {
    if (!hasWebGL || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;

    // Respect user reduced-motion preference
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Dimensions
    const width = container.clientWidth || 1200;
    const height = container.clientHeight || 600;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 14);

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'low-power',
      });
      renderer.setSize(width, height, false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    } catch {
      return;
    }

    // Colors and blending based on theme
    const isDark = theme === 'dark';
    const nodeColor = isDark ? 0x38bdf8 : 0x0284c7; // Sky-400 in dark, Sky-600 in light
    const lineColor = isDark ? 0x06b6d4 : 0x0284c7; // Cyan in dark, Sky-600 in light
    const lineOpacity = isDark ? 0.32 : 0.45;
    const lineBlending = isDark ? THREE.AdditiveBlending : THREE.NormalBlending;
    const pointBlending = isDark ? THREE.AdditiveBlending : THREE.NormalBlending;

    // Generate Nodes
    const nodes: NodePoint[] = [];
    const positions = new Float32Array(NODE_COUNT * 3);

    for (let i = 0; i < NODE_COUNT; i++) {
      const pos = new THREE.Vector3(
        (Math.random() - 0.5) * 18,
        (Math.random() - 0.5) * 9,
        (Math.random() - 0.5) * 6
      );
      const vel = new THREE.Vector3(
        (Math.random() - 0.5) * 0.008,
        (Math.random() - 0.5) * 0.008,
        (Math.random() - 0.5) * 0.004
      );

      nodes.push({ position: pos, velocity: vel });
      positions[i * 3] = pos.x;
      positions[i * 3 + 1] = pos.y;
      positions[i * 3 + 2] = pos.z;
    }

    // Node Points Mesh
    const pointsGeo = new THREE.BufferGeometry();
    pointsGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const pointsMat = new THREE.PointsMaterial({
      color: nodeColor,
      size: isDark ? 0.18 : 0.22,
      transparent: true,
      opacity: isDark ? 0.85 : 0.9,
      blending: pointBlending,
    });

    const pointsMesh = new THREE.Points(pointsGeo, pointsMat);
    scene.add(pointsMesh);

    // Connecting Lines Mesh
    const MAX_LINES = (NODE_COUNT * (NODE_COUNT - 1)) / 2;
    const linePositions = new Float32Array(MAX_LINES * 6);
    const lineColors = new Float32Array(MAX_LINES * 6);

    const linesGeo = new THREE.BufferGeometry();
    linesGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    linesGeo.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

    const linesMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: lineOpacity,
      blending: lineBlending,
    });

    const linesMesh = new THREE.LineSegments(linesGeo, linesMat);
    scene.add(linesMesh);

    // Mouse Interaction
    let targetX = 0;
    let targetY = 0;
    let animId: number | null = null;
    let isVisible = true;

    const handleMouseMove = (e: MouseEvent) => {
      const halfW = window.innerWidth / 2;
      const halfH = window.innerHeight / 2;
      targetX = ((e.clientX - halfW) / halfW) * 1.5;
      targetY = -((e.clientY - halfH) / halfH) * 0.8;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Window Resize
    const handleResize = () => {
      if (!container || !renderer) return;
      const newW = container.clientWidth || 1200;
      const newH = container.clientHeight || 600;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH, false);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Intersection Observer to pause when scrolled out of view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    // Animation Loop
    const lineRgb = new THREE.Color(lineColor);

    const animate = () => {
      if (isVisible && !prefersReducedMotion) {
        // Camera smooth parallax
        camera.position.x += (targetX - camera.position.x) * 0.05;
        camera.position.y += (targetY - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        // Update Node Positions
        const posAttr = pointsGeo.getAttribute('position') as THREE.BufferAttribute;
        let lineIdx = 0;

        for (let i = 0; i < NODE_COUNT; i++) {
          const node = nodes[i];
          node.position.add(node.velocity);

          // Boundary bouncing
          if (node.position.x < -9 || node.position.x > 9) node.velocity.x *= -1;
          if (node.position.y < -4.5 || node.position.y > 4.5) node.velocity.y *= -1;
          if (node.position.z < -4 || node.position.z > 3) node.velocity.z *= -1;

          posAttr.setXYZ(i, node.position.x, node.position.y, node.position.z);

          // Calculate connection lines to neighboring nodes
          for (let j = i + 1; j < NODE_COUNT; j++) {
            const other = nodes[j];
            const dist = node.position.distanceTo(other.position);

            if (dist < CONNECTION_DISTANCE) {
              const alpha = 1 - dist / CONNECTION_DISTANCE;

              // In dark mode: fade toward black (0,0,0) for additive glow
              // In light mode: fade toward white (1,1,1) for smooth fading against light background
              const r = isDark ? lineRgb.r * alpha : lineRgb.r * alpha + (1 - alpha);
              const g = isDark ? lineRgb.g * alpha : lineRgb.g * alpha + (1 - alpha);
              const b = isDark ? lineRgb.b * alpha : lineRgb.b * alpha + (1 - alpha);

              // Line start
              linePositions[lineIdx * 6] = node.position.x;
              linePositions[lineIdx * 6 + 1] = node.position.y;
              linePositions[lineIdx * 6 + 2] = node.position.z;
              lineColors[lineIdx * 6] = r;
              lineColors[lineIdx * 6 + 1] = g;
              lineColors[lineIdx * 6 + 2] = b;

              // Line end
              linePositions[lineIdx * 6 + 3] = other.position.x;
              linePositions[lineIdx * 6 + 4] = other.position.y;
              linePositions[lineIdx * 6 + 5] = other.position.z;
              lineColors[lineIdx * 6 + 3] = r;
              lineColors[lineIdx * 6 + 4] = g;
              lineColors[lineIdx * 6 + 5] = b;

              lineIdx++;
            }
          }
        }

        posAttr.needsUpdate = true;
        linesGeo.setDrawRange(0, lineIdx * 2);
        (linesGeo.getAttribute('position') as THREE.BufferAttribute).needsUpdate = true;
        (linesGeo.getAttribute('color') as THREE.BufferAttribute).needsUpdate = true;

        renderer?.render(scene, camera);
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();

      pointsGeo.dispose();
      pointsMat.dispose();
      linesGeo.dispose();
      linesMat.dispose();
      renderer?.dispose();
    };
  }, [hasWebGL, theme]);

  if (!hasWebGL) {
    return <HeroConstellationSvg />;
  }

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
