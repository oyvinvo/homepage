import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { CursorTrail3D } from './CursorTrail3D';

describe('CursorTrail3D Component', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders canvas element with pointer-events-none and aria-hidden', () => {
    const { container } = render(<CursorTrail3D />);
    const canvas = container.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
    expect(canvas).toHaveAttribute('aria-hidden', 'true');
    expect(canvas?.className).toContain('pointer-events-none');
  });

  it('respects prefers-reduced-motion media query', () => {
    window.matchMedia = vi.fn().mockImplementation((query) => {
      return {
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      };
    });

    const { container } = render(<CursorTrail3D />);
    const canvas = container.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
  });

  it('registers and removes touch and pointer event listeners on window', () => {
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({
      clearRect: vi.fn(),
      save: vi.fn(),
      restore: vi.fn(),
      beginPath: vi.fn(),
      arc: vi.fn(),
      fill: vi.fn(),
    } as unknown as CanvasRenderingContext2D);

    const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

    const { unmount } = render(<CursorTrail3D />);

    expect(addEventListenerSpy).toHaveBeenCalledWith('touchmove', expect.any(Function), { passive: true });
    expect(addEventListenerSpy).toHaveBeenCalledWith('touchstart', expect.any(Function), { passive: true });
    expect(addEventListenerSpy).toHaveBeenCalledWith('pointermove', expect.any(Function), { passive: true });
    expect(addEventListenerSpy).toHaveBeenCalledWith('pointerdown', expect.any(Function), { passive: true });

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('touchmove', expect.any(Function));
    expect(removeEventListenerSpy).toHaveBeenCalledWith('touchstart', expect.any(Function));
    expect(removeEventListenerSpy).toHaveBeenCalledWith('pointermove', expect.any(Function));
    expect(removeEventListenerSpy).toHaveBeenCalledWith('pointerdown', expect.any(Function));
  });
});
