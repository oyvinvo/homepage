import { useState, useCallback, useRef, useEffect } from 'react';

export interface CardTiltOptions {
  maxTilt?: number;
  perspective?: number;
  scale?: number;
  enableScrollTilt?: boolean;
}

export function useCardTilt(options: CardTiltOptions = {}) {
  const {
    maxTilt = 6,
    perspective = 1000,
    scale = 1.015,
    enableScrollTilt = true,
  } = options;

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
  const isInteractingRef = useRef<boolean>(false);

  // Check reduced motion safely
  const isReducedMotion = useCallback(() => {
    return Boolean(
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)')?.matches
    );
  }, []);

  const applyPointTilt = useCallback(
    (clientX: number, clientY: number) => {
      if (isReducedMotion()) return;

      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

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
        opacity: 1,
      });
    },
    [isReducedMotion, maxTilt, perspective, scale]
  );

  const resetToNeutral = useCallback(() => {
    setStyle({
      transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
      transition: 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
    });
    setGlarePosition((prev) => ({ ...prev, opacity: 0 }));
  }, [perspective]);

  // Scroll-based 3D tilt calculation (for touchscreens and scrolling over cards)
  const updateScrollTilt = useCallback(() => {
    if (isReducedMotion() || isInteractingRef.current) return;

    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const vh = window.innerHeight;
    if (!vh || rect.height === 0) return;

    // Check if card is visible in viewport buffer
    if (rect.bottom < -50 || rect.top > vh + 50) return;

    const cardCenterY = rect.top + rect.height / 2;
    const viewportCenterY = vh / 2;
    const normalizedOffset = Math.max(-1, Math.min(1, (cardCenterY - viewportCenterY) / (vh / 2)));

    // Tilt away when entering from bottom, tilt forward when exiting at top
    const rawTiltX = -normalizedOffset * (maxTilt * 0.7);
    const scrollTiltX = Math.abs(rawTiltX) < 0.0001 ? 0 : rawTiltX;
    const glareY = Math.round(50 - normalizedOffset * 35);
    const glareOpacity = Math.max(0, 1 - Math.abs(normalizedOffset) * 0.7);

    setStyle({
      transform: `perspective(${perspective}px) rotateX(${scrollTiltX.toFixed(2)}deg) rotateY(0deg) scale3d(1, 1, 1)`,
      transition: 'transform 0.15s ease-out',
      willChange: 'transform',
    });

    setGlarePosition({
      x: 50,
      y: glareY,
      opacity: Number(glareOpacity.toFixed(2)),
    });
  }, [isReducedMotion, maxTilt, perspective]);

  // Passive scroll listener for scroll-over 3D effect
  useEffect(() => {
    if (!enableScrollTilt || isReducedMotion()) return;

    let rafId: number | null = null;
    const handleScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          updateScrollTilt();
          rafId = null;
        });
      }
    };

    updateScrollTilt();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [enableScrollTilt, isReducedMotion, updateScrollTilt]);

  // Mouse Handlers
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      isInteractingRef.current = true;
      applyPointTilt(e.clientX, e.clientY);
    },
    [applyPointTilt]
  );

  const handleMouseLeave = useCallback(() => {
    isInteractingRef.current = false;
    resetToNeutral();
  }, [resetToNeutral]);

  // Touch Handlers
  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (e.touches.length > 0) {
        isInteractingRef.current = true;
        applyPointTilt(e.touches[0].clientX, e.touches[0].clientY);
      }
    },
    [applyPointTilt]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (e.touches.length > 0) {
        isInteractingRef.current = true;
        applyPointTilt(e.touches[0].clientX, e.touches[0].clientY);
      }
    },
    [applyPointTilt]
  );

  const handleTouchEnd = useCallback(() => {
    isInteractingRef.current = false;
    resetToNeutral();
  }, [resetToNeutral]);

  return {
    cardRef,
    style,
    glarePosition,
    handleMouseMove,
    handleMouseLeave,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    updateScrollTilt,
  };
}
