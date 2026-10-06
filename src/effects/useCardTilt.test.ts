import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCardTilt } from './useCardTilt';

describe('useCardTilt Hook', () => {
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
    expect(result.current.glarePosition.opacity).toBe(0.15);
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
});
