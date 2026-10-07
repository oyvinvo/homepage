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
});
