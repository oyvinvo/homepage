import React from 'react';
import { useTranslation } from './useTranslation';
import { LanguageCalculator } from './LanguageCalculator';

interface LanguageToggleProps {
  className?: string;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ className = '' }) => {
  const { language, toggleLanguage } = useTranslation();
  const ariaLabel = LanguageCalculator.formatSwitchAriaLabel(language);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      toggleLanguage();
    }
  };

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      onKeyDown={handleKeyDown}
      aria-label={ariaLabel}
      title={ariaLabel}
      className={`inline-flex items-center p-1 rounded-lg border text-xs font-semibold tracking-wider transition-colors min-w-[44px] min-h-[44px] justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 bg-slate-100/90 dark:bg-slate-800/90 border-slate-300 dark:border-slate-700 select-none ${className}`}
    >
      <span
        aria-hidden="true"
        className={`px-2 py-1 rounded transition-colors ${
          language === 'no'
            ? 'bg-sky-700 text-white shadow-sm dark:bg-sky-400 dark:text-slate-950 font-bold'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
        }`}
      >
        NO
      </span>
      <span
        aria-hidden="true"
        className={`px-2 py-1 rounded transition-colors ${
          language === 'en'
            ? 'bg-sky-700 text-white shadow-sm dark:bg-sky-400 dark:text-slate-950 font-bold'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
        }`}
      >
        EN
      </span>
    </button>
  );
};
