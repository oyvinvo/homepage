import { Language, PortfolioContentDictionary } from '../types';
import { noDictionary } from './no';
import { enDictionary } from './en';

export const DICTIONARIES: Record<Language, PortfolioContentDictionary> = {
  no: noDictionary,
  en: enDictionary,
};

export function getPortfolioContent(language: Language): PortfolioContentDictionary {
  return DICTIONARIES[language] || DICTIONARIES.no;
}

export { noDictionary, enDictionary };
