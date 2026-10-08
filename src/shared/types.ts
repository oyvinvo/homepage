export type ProjectCategory = 'all' | 'distributed' | 'event-driven' | 'modernization' | 'web';

export interface CareerMilestone {
  id: string;
  period: string;
  role: string;
  company: string;
  location: string;
  badge?: string;
  summary: string;
  architectureHighlights: string[];
  technologies: string[];
}

export interface MetricItem {
  label: string;
  value: string;
  detail?: string;
}

export type ExperienceMilestone = CareerMilestone;
export type ProjectMetric = MetricItem;

export interface ProjectLink {
  label: string;
  url: string;
}

export interface ProjectCaseStudy {
  id: string;
  title: string;
  client: string;
  period: string;
  category: ProjectCategory;
  summary: string;
  challenge: string;
  architectureSolution: string;
  metrics: MetricItem[];
  techStack: string[];
  links?: ProjectLink[];
}

export interface SkillItem {
  name: string;
  level?: 'Core' | 'Advanced' | 'Practitioner';
  highlight?: boolean;
}

export interface SkillCategoryGroup {
  id: string;
  title: string;
  description: string;
  skills: SkillItem[];
}

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

import { Language } from '../i18n/types';

export interface PortfolioState {
  theme: 'light' | 'dark';
  language: Language;
  activeSection: string;
  selectedCategory: ProjectCategory;
  searchQuery: string;
  isCvDrawerOpen: boolean;
  toast: ToastMessage | null;
  expandedMilestoneId: string | null;
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  setActiveSection: (section: string) => void;
  setSelectedCategory: (category: ProjectCategory) => void;
  setSearchQuery: (query: string) => void;
  setIsCvDrawerOpen: (isOpen: boolean) => void;
  setToast: (toast: ToastMessage | null) => void;
  setExpandedMilestoneId: (id: string | null) => void;
}
