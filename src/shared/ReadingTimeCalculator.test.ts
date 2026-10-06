import { describe, it, expect } from 'vitest';
import { ReadingTimeCalculator } from './ReadingTimeCalculator';

describe('ReadingTimeCalculator', () => {
  it('counts words accurately in standard text', () => {
    const text = 'Øyvind Volden is the Lead Architect and Head of Architect Group.';
    expect(ReadingTimeCalculator.countWords(text)).toBe(11);
  });

  it('handles empty string and whitespace-only text safely', () => {
    expect(ReadingTimeCalculator.countWords('')).toBe(0);
    expect(ReadingTimeCalculator.countWords('   \n\t  ')).toBe(0);
  });

  it('estimates reading time assuming 200 words per minute with minimum 1 min', () => {
    const shortText = 'Lead Architect at KulturIT.';
    expect(ReadingTimeCalculator.estimateReadingTimeMinutes(shortText)).toBe(1);

    // 400 words should be 2 minutes
    const twoHundredWords = Array(400).fill('architecture').join(' ');
    expect(ReadingTimeCalculator.estimateReadingTimeMinutes(twoHundredWords)).toBe(2);
  });

  it('handles consecutive whitespace characters without counting empty tokens', () => {
    expect(ReadingTimeCalculator.countWords('alpha    beta\n\n\tgamma')).toBe(3);
  });

  it('returns 0 minutes for empty or whitespace-only strings', () => {
    expect(ReadingTimeCalculator.estimateReadingTimeMinutes('')).toBe(0);
    expect(ReadingTimeCalculator.estimateReadingTimeMinutes('   \n  ')).toBe(0);
  });

  it('formats human-readable reading time label', () => {
    expect(ReadingTimeCalculator.formatReadingTime(50)).toBe('1 min read');
    expect(ReadingTimeCalculator.formatReadingTime(450)).toBe('3 min read');
  });
});
