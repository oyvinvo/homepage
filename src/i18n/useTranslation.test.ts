import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTranslation } from './useTranslation';
import { usePortfolioStore } from '../shared/store';

describe('useTranslation Hook', () => {
  beforeEach(() => {
    act(() => {
      usePortfolioStore.setState({ language: 'no' });
    });
  });

  it('returns Norwegian dictionary when language is "no"', () => {
    const { result } = renderHook(() => useTranslation());
    expect(result.current.language).toBe('no');
    expect(result.current.t.nav.projects).toBe('Prosjekter');
    expect(result.current.t.hero.roleBadge).toContain('Sjefsarkitekt');
    expect(result.current.t.hero.viewProjects).toBe('Se prosjekter');
  });

  it('reactively switches to English dictionary when language updates to "en"', () => {
    const { result } = renderHook(() => useTranslation());

    act(() => {
      result.current.setLanguage('en');
    });

    expect(result.current.language).toBe('en');
    expect(result.current.t.nav.projects).toBe('Projects');
    expect(result.current.t.hero.viewProjects).toBe('View Projects');
  });

  it('toggles language back and forth via toggleLanguage', () => {
    const { result } = renderHook(() => useTranslation());
    expect(result.current.language).toBe('no');

    act(() => {
      result.current.toggleLanguage();
    });
    expect(result.current.language).toBe('en');
    expect(result.current.t.nav.experience).toBe('Experience');

    act(() => {
      result.current.toggleLanguage();
    });
    expect(result.current.language).toBe('no');
    expect(result.current.t.nav.experience).toBe('Erfaring');
  });
});
