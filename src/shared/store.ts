import { create } from 'zustand';
import { PortfolioState, ProjectCategory, ToastMessage } from './types';

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
  // Default to vibrant colorful light mode
  applyThemeToDom('light');
  return 'light';
};

const initialTheme = getInitialTheme();

export const usePortfolioStore = create<PortfolioState>((set, get) => ({
  theme: initialTheme,
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

  setActiveSection: (activeSection: string) => set({ activeSection }),
  setSelectedCategory: (selectedCategory: ProjectCategory) => set({ selectedCategory }),
  setSearchQuery: (searchQuery: string) => set({ searchQuery }),
  setIsCvDrawerOpen: (isCvDrawerOpen: boolean) => set({ isCvDrawerOpen }),
  setToast: (toast: ToastMessage | null) => set({ toast }),
  setExpandedMilestoneId: (expandedMilestoneId: string | null) => set({ expandedMilestoneId }),
}));
