import { describe, it, expect } from 'vitest';
import { LanguageCalculator } from './LanguageCalculator';
import { Language } from './types';

describe('LanguageCalculator', () => {
  describe('resolveInitialLanguage', () => {
    it('returns saved language if valid ("no" or "en")', () => {
      expect(LanguageCalculator.resolveInitialLanguage('no')).toBe('no');
      expect(LanguageCalculator.resolveInitialLanguage('en')).toBe('en');
    });

    it('falls through when saved value is corrupted, invalid or empty', () => {
      expect(LanguageCalculator.resolveInitialLanguage('invalid', 'en-US')).toBe('en');
      expect(LanguageCalculator.resolveInitialLanguage('', 'nb-NO')).toBe('no');
      expect(LanguageCalculator.resolveInitialLanguage(null, 'en-GB')).toBe('en');
      expect(LanguageCalculator.resolveInitialLanguage(undefined, 'nn-NO')).toBe('no');
    });

    it('resolves Norwegian from diverse browser locale tags (nb, nn, no)', () => {
      expect(LanguageCalculator.resolveInitialLanguage(null, 'nb-NO')).toBe('no');
      expect(LanguageCalculator.resolveInitialLanguage(null, 'nn-NO')).toBe('no');
      expect(LanguageCalculator.resolveInitialLanguage(null, 'no-NO')).toBe('no');
      expect(LanguageCalculator.resolveInitialLanguage(null, 'nb')).toBe('no');
      expect(LanguageCalculator.resolveInitialLanguage(null, 'nn')).toBe('no');
      expect(LanguageCalculator.resolveInitialLanguage(null, 'no')).toBe('no');
      expect(LanguageCalculator.resolveInitialLanguage(null, '  NB-no  ')).toBe('no');
    });

    it('resolves English from browser locale tags (en-US, en-GB, en)', () => {
      expect(LanguageCalculator.resolveInitialLanguage(null, 'en-US')).toBe('en');
      expect(LanguageCalculator.resolveInitialLanguage(null, 'en-GB')).toBe('en');
      expect(LanguageCalculator.resolveInitialLanguage(null, 'en')).toBe('en');
      expect(LanguageCalculator.resolveInitialLanguage(null, '  EN-ca ')).toBe('en');
    });

    it('handles array of browser languages by priority order', () => {
      expect(LanguageCalculator.resolveInitialLanguage(null, ['fr-FR', 'en-US', 'nb-NO'])).toBe('en');
      expect(LanguageCalculator.resolveInitialLanguage(null, ['de-DE', 'nn-NO', 'en-GB'])).toBe('no');
      expect(LanguageCalculator.resolveInitialLanguage(null, [null as unknown as string, undefined as unknown as string, 'en-GB'])).toBe('en');
    });

    it('distinguishes prefixes from suffixes (does not match when tag ends with locale prefix)', () => {
      expect(LanguageCalculator.resolveInitialLanguage(null, 'ca-fr-nb', 'en')).toBe('en');
      expect(LanguageCalculator.resolveInitialLanguage(null, 'ca-fr-nn', 'en')).toBe('en');
      expect(LanguageCalculator.resolveInitialLanguage(null, 'ca-fr-no', 'en')).toBe('en');
      expect(LanguageCalculator.resolveInitialLanguage(null, 'ca-fr-en', 'no')).toBe('no');
    });

    it('falls back to default language ("no") when browser locale is unsupported or missing', () => {
      expect(LanguageCalculator.resolveInitialLanguage(null, 'es-ES')).toBe('no');
      expect(LanguageCalculator.resolveInitialLanguage(null, null)).toBe('no');
      expect(LanguageCalculator.resolveInitialLanguage(null, [])).toBe('no');
      expect(LanguageCalculator.resolveInitialLanguage(null, '', 'en')).toBe('en');
    });
  });

  describe('toggle', () => {
    it('toggles "no" to "en" and "en" to "no"', () => {
      expect(LanguageCalculator.toggle('no')).toBe('en');
      expect(LanguageCalculator.toggle('en')).toBe('no');
    });

    it('satisfies involution invariant: toggle(toggle(l)) === l', () => {
      const languages: Language[] = ['no', 'en'];
      for (const lang of languages) {
        expect(LanguageCalculator.toggle(LanguageCalculator.toggle(lang))).toBe(lang);
      }
    });
  });

  describe('getLanguageMeta', () => {
    it('returns well-formed metadata for "no"', () => {
      const meta = LanguageCalculator.getLanguageMeta('no');
      expect(meta.code).toBe('no');
      expect(meta.label).toBe('NO');
      expect(meta.name).toBe('Norsk');
      expect(meta.ariaLabel).toBe('Norsk bokmål');
      expect(meta.htmlLang).toBe('no');
    });

    it('returns well-formed metadata for "en"', () => {
      const meta = LanguageCalculator.getLanguageMeta('en');
      expect(meta.code).toBe('en');
      expect(meta.label).toBe('EN');
      expect(meta.name).toBe('English');
      expect(meta.ariaLabel).toBe('English');
      expect(meta.htmlLang).toBe('en');
    });
  });

  describe('formatSwitchAriaLabel', () => {
    it('returns Norwegian cue when currently in Norwegian (to switch to English)', () => {
      expect(LanguageCalculator.formatSwitchAriaLabel('no')).toBe('Bytt språk til engelsk');
    });

    it('returns English cue when currently in English (to switch to Norwegian)', () => {
      expect(LanguageCalculator.formatSwitchAriaLabel('en')).toBe('Switch language to Norwegian');
    });
  });

  describe('getHtmlLang', () => {
    it('returns valid BCP-47 html lang attribute values', () => {
      expect(LanguageCalculator.getHtmlLang('no')).toBe('no');
      expect(LanguageCalculator.getHtmlLang('en')).toBe('en');
    });
  });
});
