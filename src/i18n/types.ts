export type Language = 'no' | 'en';

export interface LanguageMeta {
  code: Language;
  label: string;
  name: string;
  ariaLabel: string;
  htmlLang: string;
}

export interface NavigationTranslation {
  home: string;
  leadership: string;
  experience: string;
  projects: string;
  skills: string;
  contact: string;
  openCv: string;
  toggleMenu: string;
  closeMenu: string;
}

export interface MetricItemTranslation {
  value: string;
  label: string;
  detail: string;
}

export interface HeroTranslation {
  roleBadge: string;
  statusBadge: string;
  location: string;
  titleLead: string;
  titleName: string;
  headlineRole: string;
  bio1: string;
  bio2: string;
  bio3: string;
  viewProjects: string;
  experience: string;
  openCv: string;
  contact: string;
  metrics: {
    experience: MetricItemTranslation;
    rules: MetricItemTranslation;
    approvals: MetricItemTranslation;
    heritage: MetricItemTranslation;
  };
}

export interface PillarTranslation {
  title: string;
  description: string;
}

export interface LeadershipTranslation {
  sectionBadge: string;
  title: string;
  subtitle: string;
  pillars: {
    cleanCode: PillarTranslation;
    domainDriven: PillarTranslation;
    adrGovernance: PillarTranslation;
    eventDriven: PillarTranslation;
    mentorship: PillarTranslation;
    simplicity: PillarTranslation;
  };
  quote: {
    text: string;
    author: string;
    role: string;
  };
}

export interface MilestoneTranslation {
  id: string;
  role: string;
  organization: string;
  period: string;
  summary: string;
  highlights: string[];
}

export interface ExperienceTranslation {
  sectionBadge: string;
  title: string;
  subtitle: string;
  present: string;
  viewHighlights: string;
  hideHighlights: string;
  deliverablesLabel: string;
  milestones: {
    kulturit: MilestoneTranslation;
    volden: MilestoneTranslation;
    autosys: MilestoneTranslation;
    regelforvaltning: MilestoneTranslation;
    ciber: MilestoneTranslation;
    noark5: MilestoneTranslation;
    mohive: MilestoneTranslation;
  };
  education: {
    badge: string;
    degree: string;
    institution: string;
    subLocation: string;
    period: string;
    description: string;
    highlights: string[];
  };
}

export interface CaseStudyTranslation {
  id: string;
  title: string;
  client: string;
  period: string;
  summary: string;
  challenge: string;
  architectureSolution: string;
  metrics: Array<{ value: string; label: string }>;
}

export interface ProjectsTranslation {
  sectionBadge: string;
  title: string;
  subtitle: string;
  searchPlaceholder: string;
  categories: {
    all: string;
    distributed: string;
    modernization: string;
    web3d: string;
    eventDriven: string;
  };
  emptyTitle: string;
  emptyDesc: string;
  resetFilter: string;
  caseStudies: Record<string, CaseStudyTranslation>;
  labels: {
    challenge: string;
    solution: string;
    verifiedImpact: string;
    techStack: string;
    visitSystem: string;
    exploreCode: string;
  };
}

export interface SkillCategoryTranslation {
  title: string;
  description: string;
}

export interface SkillsTranslation {
  sectionBadge: string;
  title: string;
  subtitle: string;
  quadrants: {
    architecture: SkillCategoryTranslation;
    languages: SkillCategoryTranslation;
    cloud: SkillCategoryTranslation;
    data: SkillCategoryTranslation;
  };
  levels: {
    expert: string;
    advanced: string;
    proficient: string;
  };
}

export interface ContactTranslation {
  sectionBadge: string;
  title: string;
  subtitle: string;
  availabilityBadge: string;
  emailCardTitle: string;
  emailCardDesc: string;
  copyEmail: string;
  emailCopiedToast: string;
  copyFailedToast: string;
  cvCardTitle: string;
  cvCardDesc: string;
  openCvButton: string;
  socialCardTitle: string;
  socialCardDesc: string;
  connectLinkedIn: string;
  exploreGitHub: string;
}

export interface CvManifestTranslation {
  modalTitle: string;
  roleSubtitle: string;
  location: string;
  printCv: string;
  printAriaLabel: string;
  saveAsPdf: string;
  closeDrawer: string;
  sections: {
    profileSummary: string;
    careerChronology: string;
    flagshipProjects: string;
    coreCompetencies: string;
    academicFoundation: string;
  };
  profileText: string[];
  educationTitle: string;
  educationDegree: string;
  educationSchool: string;
  educationPeriod: string;
  educationDescription: string;
  printNotice: string;
}

export interface PortfolioContentDictionary {
  nav: NavigationTranslation;
  hero: HeroTranslation;
  leadership: LeadershipTranslation;
  experience: ExperienceTranslation;
  projects: ProjectsTranslation;
  skills: SkillsTranslation;
  contact: ContactTranslation;
  manifest: CvManifestTranslation;
}
