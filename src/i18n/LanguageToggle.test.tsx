import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { LanguageToggle } from './LanguageToggle';
import { usePortfolioStore } from '../shared/store';

describe('LanguageToggle Component', () => {
  beforeEach(() => {
    act(() => {
      usePortfolioStore.setState({ language: 'no' });
    });
  });

  it('renders with accessible aria-label to switch to English when Norwegian is active', () => {
    render(<LanguageToggle />);
    const button = screen.getByRole('button', { name: /bytt språk til engelsk/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('NO');
    expect(button).toHaveTextContent('EN');
  });

  it('toggles language to "en" on click and updates aria-label', () => {
    render(<LanguageToggle />);
    const button = screen.getByRole('button', { name: /bytt språk til engelsk/i });

    act(() => {
      fireEvent.click(button);
    });

    expect(usePortfolioStore.getState().language).toBe('en');
    expect(screen.getByRole('button', { name: /switch language to norwegian/i })).toBeInTheDocument();
  });

  it('supports keyboard activation via Enter and Space keys', () => {
    render(<LanguageToggle />);
    const button = screen.getByRole('button', { name: /bytt språk til engelsk/i });

    act(() => {
      fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' });
    });
    expect(usePortfolioStore.getState().language).toBe('en');

    act(() => {
      fireEvent.keyDown(button, { key: ' ', code: 'Space' });
    });
    expect(usePortfolioStore.getState().language).toBe('no');
  });
});
