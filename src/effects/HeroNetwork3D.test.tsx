import { describe, it, expect, vi } from 'vitest';
import { render, act } from '@testing-library/react';
import { HeroNetwork3D } from './HeroNetwork3D';
import { usePortfolioStore } from '../shared/store';

describe('HeroNetwork3D Component', () => {
  it('renders SVG constellation fallback in headless/non-WebGL environment', () => {
    let container!: HTMLElement;
    act(() => {
      const res = render(<HeroNetwork3D />);
      container = res.container;
    });
    // In JSDOM, getContext('webgl') returns null, so it falls back to HeroConstellationSvg
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(container.querySelector('canvas')).toBeNull();
  });

  it('renders correctly when theme switches between light and dark', () => {
    let container!: HTMLElement;
    let rerenderFn!: (ui: React.ReactElement) => void;

    act(() => {
      usePortfolioStore.setState({ theme: 'light' });
      const res = render(<HeroNetwork3D />);
      container = res.container;
      rerenderFn = res.rerender;
    });
    expect(container.querySelector('svg')).toBeInTheDocument();

    act(() => {
      usePortfolioStore.setState({ theme: 'dark' });
      rerenderFn(<HeroNetwork3D />);
    });
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('gracefully handles mock WebGL context if available', () => {
    const mockContext = {
      viewport: vi.fn(),
      clearColor: vi.fn(),
      clear: vi.fn(),
      enable: vi.fn(),
      disable: vi.fn(),
      createShader: vi.fn(),
      shaderSource: vi.fn(),
      compileShader: vi.fn(),
      getShaderParameter: vi.fn().mockReturnValue(true),
      createProgram: vi.fn(),
      attachShader: vi.fn(),
      linkProgram: vi.fn(),
      getProgramParameter: vi.fn().mockReturnValue(true),
      useProgram: vi.fn(),
      createBuffer: vi.fn(),
      bindBuffer: vi.fn(),
      bufferData: vi.fn(),
      getExtension: vi.fn().mockReturnValue(null),
    };

    const getContextSpy = vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockImplementation((contextId) => {
      if (contextId === 'webgl' || contextId === 'experimental-webgl') {
        return mockContext as unknown as WebGLRenderingContext;
      }
      return null;
    });

    // Mock WebGLRenderingContext global
    const originalWebGL = window.WebGLRenderingContext;
    // @ts-expect-error Mocking WebGL for unit test
    window.WebGLRenderingContext = vi.fn();

    const { container } = render(<HeroNetwork3D />);
    expect(container).toBeDefined();

    // Restore spies
    getContextSpy.mockRestore();
    window.WebGLRenderingContext = originalWebGL;
  });
});
