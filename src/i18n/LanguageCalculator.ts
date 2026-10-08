import { Language, LanguageMeta } from './types';

export class LanguageCalculator {
  /**
   * Resolves the initial language from persisted localStorage,
   * falling through to browser preferences and defaulting to 'no'.
   */
  public static resolveInitialLanguage(
    savedValue?: string | null,
    browserLanguages?: string[] | string | null,
    defaultLanguage: Language = 'no'
  ): Language {
    if (savedValue === 'no' || savedValue === 'en') {
      return savedValue;
    }

    if (browserLanguages) {
      const candidates = Array.isArray(browserLanguages) ? browserLanguages : [browserLanguages];
      for (const raw of candidates) {
        if (!raw || typeof raw !== 'string') continue;
        const normalized = raw.trim().toLowerCase();

        // Check for Norwegian Bokmål / Nynorsk / generic Norwegian
        if (
          normalized.startsWith('nb') ||
          normalized.startsWith('nn') ||
          normalized.startsWith('no')
        ) {
          return 'no';
        }

        // Check for English
        if (normalized.startsWith('en')) {
          return 'en';
        }
      }
    }

    return defaultLanguage;
  }

  /**
   * Toggles between 'no' and 'en'. Involution invariant: toggle(toggle(x)) === x.
   */
  public static toggle(current: Language): Language {
    return current === 'no' ? 'en' : 'no';
  }

  /**
   * Returns human-readable and accessible metadata for a language code.
   */
  public static getLanguageMeta(lang: Language): LanguageMeta {
    if (lang === 'en') {
      return {
        code: 'en',
        label: 'EN',
        name: 'English',
        ariaLabel: 'English',
        htmlLang: 'en',
      };
    }

    return {
      code: 'no',
      label: 'NO',
      name: 'Norsk',
      ariaLabel: 'Norsk bokmål',
      htmlLang: 'no',
    };
  }

  /**
   * Generates the action-oriented ARIA label indicating what happens upon clicking the toggle.
   */
  public static formatSwitchAriaLabel(current: Language): string {
    return current === 'no' ? 'Bytt språk til engelsk' : 'Switch language to Norwegian';
  }

  /**
   * Returns standard BCP-47 html lang attribute value.
   */
  public static getHtmlLang(lang: Language): string {
    return lang === 'en' ? 'en' : 'no';
  }
}
