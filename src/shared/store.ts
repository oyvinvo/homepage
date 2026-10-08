import { create } from 'zustand';
import { PortfolioState, ProjectCategory, ToastMessage } from './types';
import { Language } from '../i18n/types';
import { LanguageCalculator } from '../i18n/LanguageCalculator';

const applyThemeToDom = (theme: 'light' | 'dark') => {
  if (typeof document !== 'undefined') {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
};

const getInitialTheme = (): 'light' | 'dark' => {
  try {
    if (
      typeof window !== 'undefined' &&
      typeof window.localStorage !== 'undefined' &&
      typeof window.localStorage.getItem === 'function'
    ) {
      const saved = window.localStorage.getItem('theme');
      if (saved === 'dark' || saved === 'light') {
        applyThemeToDom(saved);
        return saved;
      }
    }
  } catch {
    // Ignore restricted localStorage in sandboxed or testing environments
  }
  // Default to rich dark mode
  applyThemeToDom('dark');
  return 'dark';
};

const applyLanguageToDom = (language: Language) => {
  if (typeof document !== 'undefined') {
    document.documentElement.lang = LanguageCalculator.getHtmlLang(language);
  }
};

const getInitialLanguage = (): Language => {
  try {
    if (
      typeof window !== 'undefined' &&
      typeof window.localStorage !== 'undefined' &&
      typeof window.localStorage.getItem === 'function'
    ) {
      const saved = window.localStorage.getItem('portfolio-language');
      const browserLangs =
        typeof navigator !== 'undefined'
          ? (navigator.languages as string[]) || (navigator.language ? [navigator.language] : null)
          : null;
      const resolved = LanguageCalculator.resolveInitialLanguage(saved, browserLangs);
      applyLanguageToDom(resolved);
      return resolved;
    }
  } catch {
    // Ignore restricted environments
  }
  applyLanguageToDom('no');
  return 'no';
};

const initialTheme = getInitialTheme();
const initialLanguage = getInitialLanguage();

export const usePortfolioStore = create<PortfolioState>((set, get) => ({
  theme: initialTheme,
  language: initialLanguage,
  activeSection: 'hero',
  selectedCategory: 'all',
  searchQuery: '',
  isCvDrawerOpen: false,
  toast: null,
  expandedMilestoneId: null,

  setTheme: (theme: 'light' | 'dark') => {
    applyThemeToDom(theme);
    try {
      if (
        typeof window !== 'undefined' &&
        typeof window.localStorage !== 'undefined' &&
        typeof window.localStorage.setItem === 'function'
      ) {
        window.localStorage.setItem('theme', theme);
      }
    } catch {
      // Ignore in restricted environments
    }
    set({ theme });
  },

  toggleTheme: () => {
    const nextTheme = get().theme === 'dark' ? 'light' : 'dark';
    get().setTheme(nextTheme);
  },

  setLanguage: (language: Language) => {
    applyLanguageToDom(language);
    try {
      if (
        typeof window !== 'undefined' &&
        typeof window.localStorage !== 'undefined' &&
        typeof window.localStorage.setItem === 'function'
      ) {
        window.localStorage.setItem('portfolio-language', language);
      }
    } catch {
      // Ignore in restricted environments
    }
    set({ language });
  },

  toggleLanguage: () => {
    const nextLang = LanguageCalculator.toggle(get().language);
    get().setLanguage(nextLang);
  },

  setActiveSection: (activeSection: string) => set({ activeSection }),
  setSelectedCategory: (selectedCategory: ProjectCategory) => set({ selectedCategory }),
  setSearchQuery: (searchQuery: string) => set({ searchQuery }),
  setIsCvDrawerOpen: (isCvDrawerOpen: boolean) => set({ isCvDrawerOpen }),
  setToast: (toast: ToastMessage | null) => set({ toast }),
  setExpandedMilestoneId: (expandedMilestoneId: string | null) => set({ expandedMilestoneId }),
}));
