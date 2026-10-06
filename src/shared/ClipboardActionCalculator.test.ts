import { describe, it, expect } from 'vitest';
import { ClipboardActionCalculator } from './ClipboardActionCalculator';

describe('ClipboardActionCalculator', () => {
  it('sanitizes and formats valid email address', () => {
    const email = '  oyvind.volden+homepage@gmail.com  ';
    const result = ClipboardActionCalculator.sanitizeEmail(email);
    expect(result).toBe('oyvind.volden+homepage@gmail.com');
  });

  it('generates toast feedback object on successful copy', () => {
    const toast = ClipboardActionCalculator.createSuccessToast('oyvind.volden+homepage@gmail.com');
    expect(toast.type).toBe('success');
    expect(toast.message).toContain('oyvind.volden+homepage@gmail.com');
    expect(toast.message).toContain('Copied');
    expect(toast.id).toBeTruthy();
  });

  it('generates toast feedback object on failure with fallback guidance', () => {
    const toast = ClipboardActionCalculator.createFailureToast('oyvind.volden+homepage@gmail.com');
    expect(toast.type).toBe('error');
    expect(toast.message).toContain('Please manually copy: oyvind.volden+homepage@gmail.com');
    expect(toast.id).toBeTruthy();
  });

  it('creates mailto URI with encoded subject and body', () => {
    const mailto = ClipboardActionCalculator.buildMailtoUri(
      'oyvind.volden+homepage@gmail.com',
      'Architect Inquiry: Executive Role',
      'Hello Øyvind,'
    );
    expect(mailto).toBe(
      'mailto:oyvind.volden+homepage@gmail.com?subject=Architect%20Inquiry%3A%20Executive%20Role&body=Hello%20%C3%98yvind%2C'
    );

    // Bare mailto without optional params
    expect(ClipboardActionCalculator.buildMailtoUri('oyvind.volden+homepage@gmail.com')).toBe(
      'mailto:oyvind.volden+homepage@gmail.com'
    );

    // Only subject
    expect(
      ClipboardActionCalculator.buildMailtoUri('oyvind.volden+homepage@gmail.com', 'Quick Chat')
    ).toBe('mailto:oyvind.volden+homepage@gmail.com?subject=Quick%20Chat');

    // Only body
    expect(
      ClipboardActionCalculator.buildMailtoUri('oyvind.volden+homepage@gmail.com', undefined, 'Hello World')
    ).toBe('mailto:oyvind.volden+homepage@gmail.com?body=Hello%20World');
  });
});
