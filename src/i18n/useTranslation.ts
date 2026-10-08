import { usePortfolioStore } from '../shared/store';
import { getPortfolioContent } from './dictionaries';
import { Language, PortfolioContentDictionary } from './types';

export interface UseTranslationResult {
  language: Language;
  t: PortfolioContentDictionary;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

export function useTranslation(): UseTranslationResult {
  const language = usePortfolioStore((state) => state.language);
  const setLanguage = usePortfolioStore((state) => state.setLanguage);
  const toggleLanguage = usePortfolioStore((state) => state.toggleLanguage);

  const t: PortfolioContentDictionary = getPortfolioContent(language);

  return {
    language,
    t,
    setLanguage,
    toggleLanguage,
  };
}
