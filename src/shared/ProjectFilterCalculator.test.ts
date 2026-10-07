import { describe, it, expect } from 'vitest';
import { ProjectFilterCalculator } from './ProjectFilterCalculator';
import { ProjectCaseStudy } from './types';
import { projectsCatalog } from '../projects/projectsCatalog';

const mockProjects: ProjectCaseStudy[] = [
  {
    id: 'kulturit-core',
    title: 'KulturIT Microservices Architecture',
    client: 'KulturIT',
    period: '2018–Present',
    category: 'distributed',
    summary: 'Cloud-native platform modernization and microservices architecture.',
    challenge: 'Monolithic data model needed decoupling across museum ecosystems.',
    architectureSolution: 'Event-driven domain services with Python, React, and custom PostgreSQL Queue.',
    metrics: [{ label: 'Artifacts', value: '10M+' }],
    techStack: ['Python', 'FastAPI', 'React', 'PostgreSQL Queue', 'PostgreSQL'],
  },
  {
    id: 'autosys-ksak',
    title: 'Autosys KSAK Vehicle Approvals',
    client: 'Statens vegvesen',
    period: '2016–2018',
    category: 'modernization',
    summary: 'National individual vehicle approvals core system.',
    challenge: 'Paper-intensive inspection processes causing regulatory bottlenecks.',
    architectureSolution: 'High-availability Spring Boot backend with React and Oracle DB.',
    metrics: [{ label: 'Approvals/Yr', value: '100k+' }],
    techStack: ['Java', 'Spring Boot', 'React', 'Oracle'],
  },
  {
    id: 'regelforvaltning',
    title: 'Statens vegvesen Regelforvaltning Engine',
    client: 'Statens vegvesen',
    period: '2014–2016',
    category: 'event-driven',
    summary: 'Regulatory decision engine executing complex Norwegian road and vehicle rules.',
    challenge: '11,000 conflicting vehicle regulations with manual human checks.',
    architectureSolution: 'High-speed rule engine with React, Flux, and Java 8 stream processing.',
    metrics: [{ label: 'Rules Managed', value: '11,000+' }],
    techStack: ['React', 'Flux', 'Java 8', 'REST'],
  },
];

describe('ProjectFilterCalculator', () => {
  it('returns all projects when category is "all" and query is empty', () => {
    const result = ProjectFilterCalculator.filter(mockProjects, 'all', '');
    expect(result).toHaveLength(3);
    expect(result).toEqual(mockProjects);
  });

  it('filters projects by exact category', () => {
    const distributed = ProjectFilterCalculator.filter(mockProjects, 'distributed', '');
    expect(distributed).toHaveLength(1);
    expect(distributed[0].id).toBe('kulturit-core');

    const eventDriven = ProjectFilterCalculator.filter(mockProjects, 'event-driven', '');
    expect(eventDriven).toHaveLength(1);
    expect(eventDriven[0].id).toBe('regelforvaltning');

    const modernization = ProjectFilterCalculator.filter(mockProjects, 'modernization', '');
    expect(modernization).toHaveLength(1);
    expect(modernization[0].id).toBe('autosys-ksak');

    const web = ProjectFilterCalculator.filter(mockProjects, 'web', '');
    expect(web).toHaveLength(0);
  });

  it('filters projects by case-insensitive search query', () => {
    const searchPython = ProjectFilterCalculator.filter(mockProjects, 'all', 'python');
    expect(searchPython).toHaveLength(1);
    expect(searchPython[0].id).toBe('kulturit-core');

    const searchVegvesen = ProjectFilterCalculator.filter(mockProjects, 'all', 'VEGVESEN');
    expect(searchVegvesen).toHaveLength(2);

    const searchRule = ProjectFilterCalculator.filter(mockProjects, 'all', '11,000');
    expect(searchRule).toHaveLength(1);
    expect(searchRule[0].id).toBe('regelforvaltning');
  });

  it('combines category filter and search query with intersection semantics', () => {
    const matched = ProjectFilterCalculator.filter(mockProjects, 'modernization', 'Spring');
    expect(matched).toHaveLength(1);
    expect(matched[0].id).toBe('autosys-ksak');

    const unmatched = ProjectFilterCalculator.filter(mockProjects, 'distributed', 'Oracle');
    expect(unmatched).toHaveLength(0);
  });

  it('counts project instances per category accurately', () => {
    const counts = ProjectFilterCalculator.countByCategory(mockProjects);
    expect(counts['all']).toBe(3);
    expect(counts['distributed']).toBe(1);
    expect(counts['modernization']).toBe(1);
    expect(counts['event-driven']).toBe(1);
    expect(counts['web']).toBe(0);
  });

  it('matches searches specifically across challenge, solution, stack, and metrics fields', () => {
    // Challenge search
    const challengeHit = ProjectFilterCalculator.filter(mockProjects, 'all', 'monolithic');
    expect(challengeHit).toHaveLength(1);
    expect(challengeHit[0].id).toBe('kulturit-core');

    // Solution search
    const solutionHit = ProjectFilterCalculator.filter(mockProjects, 'all', 'high-availability');
    expect(solutionHit).toHaveLength(1);
    expect(solutionHit[0].id).toBe('autosys-ksak');

    // Tech stack search
    const stackHit = ProjectFilterCalculator.filter(mockProjects, 'all', 'postgresql queue');
    expect(stackHit).toHaveLength(1);
    expect(stackHit[0].id).toBe('kulturit-core');

    // Metric label search
    const metricLabelHit = ProjectFilterCalculator.filter(mockProjects, 'all', 'approvals/yr');
    expect(metricLabelHit).toHaveLength(1);
    expect(metricLabelHit[0].id).toBe('autosys-ksak');

    // Metric value search
    const metricValueHit = ProjectFilterCalculator.filter(mockProjects, 'all', '10m+');
    expect(metricValueHit).toHaveLength(1);
    expect(metricValueHit[0].id).toBe('kulturit-core');

    // Summary search
    const summaryHit = ProjectFilterCalculator.filter(mockProjects, 'all', 'decision engine');
    expect(summaryHit).toHaveLength(1);
    expect(summaryHit[0].id).toBe('regelforvaltning');
  });

  describe('projectsCatalog Production Invariants (Feature 007)', () => {
    it('contains exactly 12 production case studies with exact category distribution', () => {
      const counts = ProjectFilterCalculator.countByCategory(projectsCatalog);
      expect(counts['all']).toBe(12);
      expect(counts['distributed']).toBe(4);
      expect(counts['web']).toBe(5);
      expect(counts['event-driven']).toBe(2);
      expect(counts['modernization']).toBe(1);

      const allProjects = ProjectFilterCalculator.filter(projectsCatalog, 'all', '');
      expect(allProjects).toHaveLength(12);
    });

    it('finds projects by case-insensitive keyword searches for authentic eKultur & VM terms', () => {
      // Bekymringsmestring -> bekymringsmestring
      const bekymringMatches = ProjectFilterCalculator.filter(projectsCatalog, 'all', 'bekymringsmestring');
      expect(bekymringMatches.some((p) => p.id === 'bekymringsmestring')).toBe(true);

      const mindfulnessMatches = ProjectFilterCalculator.filter(projectsCatalog, 'all', 'mindfulness');
      expect(mindfulnessMatches.some((p) => p.id === 'bekymringsmestring')).toBe(true);

      // vm/3d -> vm-3d
      const vm3dMatches = ProjectFilterCalculator.filter(projectsCatalog, 'all', 'vm/3d');
      expect(vm3dMatches.some((p) => p.id === 'vm-3d')).toBe(true);

      // vm/360 -> vm-360
      const vm360Matches = ProjectFilterCalculator.filter(projectsCatalog, 'all', 'vm/360');
      expect(vm360Matches.some((p) => p.id === 'vm-360')).toBe(true);

      // vm/scrollytelling and vm/quiz -> vm-scrollytelling-quiz
      const scrollyMatches = ProjectFilterCalculator.filter(projectsCatalog, 'all', 'vm/scrollytelling');
      expect(scrollyMatches.some((p) => p.id === 'vm-scrollytelling-quiz')).toBe(true);

      const quizMatches = ProjectFilterCalculator.filter(projectsCatalog, 'all', 'vm/quiz');
      expect(quizMatches.some((p) => p.id === 'vm-scrollytelling-quiz')).toBe(true);

      // In-House Cookie Consent -> ekultur-cookie-consent
      const cookieMatches = ProjectFilterCalculator.filter(projectsCatalog, 'all', 'cookie-consent-api');
      expect(cookieMatches.some((p) => p.id === 'ekultur-cookie-consent')).toBe(true);

      const oneTrustMatches = ProjectFilterCalculator.filter(projectsCatalog, 'all', 'OneTrust');
      expect(oneTrustMatches.some((p) => p.id === 'ekultur-cookie-consent')).toBe(true);

      const cookiebotMatches = ProjectFilterCalculator.filter(projectsCatalog, 'all', 'Cookiebot');
      expect(cookiebotMatches.some((p) => p.id === 'ekultur-cookie-consent')).toBe(true);

      // Three.js and React Three Fiber -> vm-3d
      const threeMatches = ProjectFilterCalculator.filter(projectsCatalog, 'all', 'Three.js');
      expect(threeMatches.some((p) => p.id === 'vm-3d')).toBe(true);

      const r3fMatches = ProjectFilterCalculator.filter(projectsCatalog, 'all', 'React Three Fiber');
      expect(r3fMatches.some((p) => p.id === 'vm-3d')).toBe(true);

      // 3D Room Curation -> vm-3d
      const curationMatches = ProjectFilterCalculator.filter(projectsCatalog, 'all', '3D Room Curation');
      expect(curationMatches.some((p) => p.id === 'vm-3d')).toBe(true);

      // PostgreSQL Message Queue -> ekultur-core-apis & ekultur-ai-vision
      const queueMatches = ProjectFilterCalculator.filter(projectsCatalog, 'all', 'PostgreSQL Message Queue');
      expect(queueMatches.some((p) => p.id === 'ekultur-core-apis')).toBe(true);

      // Central SSO & OAuth2 -> ekultur-sso-auth
      const ssoMatches = ProjectFilterCalculator.filter(projectsCatalog, 'all', 'auths-backend');
      expect(ssoMatches.some((p) => p.id === 'ekultur-sso-auth')).toBe(true);

      const authzMatches = ProjectFilterCalculator.filter(projectsCatalog, 'all', 'authorization-api');
      expect(authzMatches.some((p) => p.id === 'ekultur-sso-auth')).toBe(true);

      const oauthMatches = ProjectFilterCalculator.filter(projectsCatalog, 'all', 'OAuth2');
      expect(oauthMatches.some((p) => p.id === 'ekultur-sso-auth')).toBe(true);

      // Microfrontends & Monorepo -> ekultur-mfe-monorepo & vm-scrollytelling-quiz
      const mfeMatches = ProjectFilterCalculator.filter(projectsCatalog, 'all', 'Microfrontends');
      expect(mfeMatches.length).toBeGreaterThanOrEqual(2);

      // E-ARK -> ekultur-handover
      const earkMatches = ProjectFilterCalculator.filter(projectsCatalog, 'all', 'E-ARK');
      expect(earkMatches.some((p) => p.id === 'ekultur-handover')).toBe(true);

      // Vision -> ekultur-ai-vision
      const visionMatches = ProjectFilterCalculator.filter(projectsCatalog, 'all', 'Vision');
      expect(visionMatches.some((p) => p.id === 'ekultur-ai-vision')).toBe(true);

      // FastAPI -> multiple services
      const fastapiMatches = ProjectFilterCalculator.filter(projectsCatalog, 'all', 'FastAPI');
      expect(fastapiMatches.length).toBeGreaterThanOrEqual(3);

      // Nasjonalbiblioteket -> ekultur-handover
      const nbMatches = ProjectFilterCalculator.filter(projectsCatalog, 'all', 'Nasjonalbiblioteket');
      expect(nbMatches.some((p) => p.id === 'ekultur-handover')).toBe(true);

      // 8192 -> vm-360 (dome resolution)
      const domeMatches = ProjectFilterCalculator.filter(projectsCatalog, 'all', '8192');
      expect(domeMatches.some((p) => p.id === 'vm-360')).toBe(true);
    });
  });
});


