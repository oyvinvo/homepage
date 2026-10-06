import { useState, useCallback, useRef } from 'react';

export interface CardTiltOptions {
  maxTilt?: number;
  perspective?: number;
  scale?: number;
}

export function useCardTilt(options: CardTiltOptions = {}) {
  const { maxTilt = 6, perspective = 1000, scale = 1.015 } = options;
  const [style, setStyle] = useState<React.CSSProperties>({
    transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
    transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
  });
  const [glarePosition, setGlarePosition] = useState<{ x: number; y: number; opacity: number }>({
    x: 50,
    y: 50,
    opacity: 0,
  });

  const cardRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      // Check reduced motion preference
      if (
        typeof window !== 'undefined' &&
        window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        return;
      }

      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;

      setStyle({
        transform: `perspective(${perspective}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`,
        transition: 'transform 0.1s ease-out',
        willChange: 'transform',
      });

      setGlarePosition({
        x: Math.round((x / rect.width) * 100),
        y: Math.round((y / rect.height) * 100),
        opacity: 0.15,
      });
    },
    [maxTilt, perspective, scale]
  );

  const handleMouseLeave = useCallback(() => {
    setStyle({
      transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
      transition: 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
    });
    setGlarePosition((prev) => ({ ...prev, opacity: 0 }));
  }, [perspective]);

  return {
    cardRef,
    style,
    glarePosition,
    handleMouseMove,
    handleMouseLeave,
  };
}
