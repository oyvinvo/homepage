import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTranslation } from '../i18n/useTranslation';

interface NavbarThemeToggleProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const NavbarThemeToggle: React.FC<NavbarThemeToggleProps> = ({
  theme,
  onToggleTheme,
}) => {
  const { t } = useTranslation();

  return (
    <button
      type="button"
      onClick={onToggleTheme}
      className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-800 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 border border-slate-300/80 dark:text-amber-300 dark:bg-slate-800 dark:hover:bg-slate-700 dark:border-slate-700 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 active:scale-95 shadow-sm"
      aria-label={theme === 'dark' ? t.nav.themeDarkTitle : t.nav.themeLightTitle}
      title={theme === 'dark' ? t.nav.themeDarkTitle : t.nav.themeLightTitle}
    >
      {theme === 'dark' ? (
        <>
          <Sun className="w-4 h-4 text-amber-400" aria-hidden="true" />
          <span className="hidden sm:inline font-mono">{t.nav.themeDark}</span>
        </>
      ) : (
        <>
          <Moon className="w-4 h-4 text-indigo-600" aria-hidden="true" />
          <span className="hidden sm:inline font-mono text-indigo-700 font-semibold">{t.nav.themeLight}</span>
        </>
      )}
    </button>
  );
};
