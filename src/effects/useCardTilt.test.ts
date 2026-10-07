import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCardTilt } from './useCardTilt';

describe('useCardTilt Hook', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('initializes with default flat transform style', () => {
    const { result } = renderHook(() => useCardTilt());
    expect(result.current.style.transform).toBe('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    expect(result.current.glarePosition.opacity).toBe(0);
  });

  it('calculates 3D rotation on mouse move over element', () => {
    const { result } = renderHook(() => useCardTilt({ maxTilt: 10, scale: 1.05 }));

    const fakeDiv = document.createElement('div');
    vi.spyOn(fakeDiv, 'getBoundingClientRect').mockReturnValue({
      left: 100,
      top: 100,
      width: 200,
      height: 200,
      right: 300,
      bottom: 300,
      x: 100,
      y: 100,
      toJSON: () => {},
    });

    result.current.cardRef.current = fakeDiv;

    // Simulate mouse move at top-left corner
    act(() => {
      result.current.handleMouseMove({
        clientX: 150, // 50px from left (centerX is 100, offset is -50)
        clientY: 150, // 50px from top (centerY is 100, offset is -50)
      } as React.MouseEvent<HTMLDivElement>);
    });

    expect(result.current.style.transform).toContain('rotateX(');
    expect(result.current.style.transform).toContain('rotateY(');
    expect(result.current.style.transform).toContain('scale3d(1.05, 1.05, 1.05)');
    expect(result.current.glarePosition.opacity).toBe(1);
  });

  it('resets transform to neutral state on mouse leave', () => {
    const { result } = renderHook(() => useCardTilt({ perspective: 800 }));

    act(() => {
      result.current.handleMouseLeave();
    });

    expect(result.current.style.transform).toBe('perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    expect(result.current.glarePosition.opacity).toBe(0);
  });

  it('skips rotation if prefers-reduced-motion is active', () => {
    const matchMediaMock = vi.fn().mockImplementation((query) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
    window.matchMedia = matchMediaMock;

    const { result } = renderHook(() => useCardTilt());

    const fakeDiv = document.createElement('div');
    result.current.cardRef.current = fakeDiv;

    act(() => {
      result.current.handleMouseMove({
        clientX: 150,
        clientY: 150,
      } as React.MouseEvent<HTMLDivElement>);
    });

    // Remains at initial flat transform
    expect(result.current.style.transform).toBe('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  });

  it('calculates 3D rotation on touch start and touch move gestures', () => {
    const { result } = renderHook(() => useCardTilt({ maxTilt: 8, scale: 1.02 }));

    const fakeDiv = document.createElement('div');
    vi.spyOn(fakeDiv, 'getBoundingClientRect').mockReturnValue({
      left: 50,
      top: 50,
      width: 100,
      height: 100,
      right: 150,
      bottom: 150,
      x: 50,
      y: 50,
      toJSON: () => {},
    });

    result.current.cardRef.current = fakeDiv;

    // Simulate touch start
    act(() => {
      result.current.handleTouchStart({
        touches: [{ clientX: 75, clientY: 75 }],
      } as unknown as React.TouchEvent<HTMLDivElement>);
    });

    expect(result.current.style.transform).toContain('rotateX(');
    expect(result.current.style.transform).toContain('rotateY(');
    expect(result.current.glarePosition.opacity).toBe(1);

    // Simulate touch move
    act(() => {
      result.current.handleTouchMove({
        touches: [{ clientX: 90, clientY: 80 }],
      } as unknown as React.TouchEvent<HTMLDivElement>);
    });

    expect(result.current.style.transform).toContain('rotateX(');
    expect(result.current.glarePosition.opacity).toBe(1);

    // Simulate touch end (resets to neutral)
    act(() => {
      result.current.handleTouchEnd();
    });

    expect(result.current.style.transform).toBe('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    expect(result.current.glarePosition.opacity).toBe(0);
  });

  it('calculates scroll-based 3D tilt and specular glare when card scrolls in viewport', () => {
    const { result } = renderHook(() => useCardTilt({ maxTilt: 6, enableScrollTilt: true }));

    // Mock window innerHeight
    Object.defineProperty(window, 'innerHeight', { value: 800, writable: true });

    const fakeDiv = document.createElement('div');
    // Card placed below viewport center (e.g. entering from bottom)
    // top = 500, height = 200 -> cardCenterY = 600, viewportCenterY = 400
    // normalizedOffset = (600 - 400) / 400 = 0.5
    vi.spyOn(fakeDiv, 'getBoundingClientRect').mockReturnValue({
      left: 10,
      top: 500,
      width: 300,
      height: 200,
      right: 310,
      bottom: 700,
      x: 10,
      y: 500,
      toJSON: () => {},
    });

    result.current.cardRef.current = fakeDiv;

    act(() => {
      result.current.updateScrollTilt();
    });

    // scrollTiltX = -normalizedOffset * (maxTilt * 0.7) = -0.5 * 4.2 = -2.10deg
    expect(result.current.style.transform).toContain('rotateX(-2.10deg)');
    expect(result.current.style.transform).toContain('rotateY(0deg)');
    expect(result.current.glarePosition.x).toBe(50);
    // glareY = 50 - 0.5 * 35 = 33
    expect(result.current.glarePosition.y).toBe(33);
    expect(result.current.glarePosition.opacity).toBeGreaterThan(0);
  });

  it('levels out at viewport center during scroll', () => {
    const { result } = renderHook(() => useCardTilt({ maxTilt: 6 }));

    Object.defineProperty(window, 'innerHeight', { value: 800, writable: true });

    const fakeDiv = document.createElement('div');
    // Centered at viewport center: top = 300, height = 200 -> center = 400
    vi.spyOn(fakeDiv, 'getBoundingClientRect').mockReturnValue({
      left: 10,
      top: 300,
      width: 300,
      height: 200,
      right: 310,
      bottom: 500,
      x: 10,
      y: 300,
      toJSON: () => {},
    });

    result.current.cardRef.current = fakeDiv;

    act(() => {
      result.current.updateScrollTilt();
    });

    expect(result.current.style.transform).toContain('rotateX(0.00deg)');
    expect(result.current.glarePosition.y).toBe(50);
    expect(result.current.glarePosition.opacity).toBe(1);
  });

  it('skips scroll tilt calculation when card is completely out of viewport', () => {
    const { result } = renderHook(() => useCardTilt());

    Object.defineProperty(window, 'innerHeight', { value: 800, writable: true });

    const fakeDiv = document.createElement('div');
    // Completely below viewport
    vi.spyOn(fakeDiv, 'getBoundingClientRect').mockReturnValue({
      left: 10,
      top: 1200,
      width: 300,
      height: 200,
      right: 310,
      bottom: 1400,
      x: 10,
      y: 1200,
      toJSON: () => {},
    });

    result.current.cardRef.current = fakeDiv;

    act(() => {
      result.current.updateScrollTilt();
    });

    // Style remains flat initial state
    expect(result.current.style.transform).toBe('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  });
});
