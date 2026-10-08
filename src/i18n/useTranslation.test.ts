import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTranslation } from './useTranslation';
import { usePortfolioStore } from '../shared/store';

describe('useTranslation Hook', () => {
  beforeEach(() => {
    act(() => {
      usePortfolioStore.setState({ language: 'no' });
    });
  });

  it('returns Norwegian dictionary when language is "no"', () => {
    const { result } = renderHook(() => useTranslation());
    expect(result.current.language).toBe('no');
    expect(result.current.t.nav.projects).toBe('Prosjekter');
    expect(result.current.t.hero.roleBadge).toContain('Sjefsarkitekt');
    expect(result.current.t.hero.viewProjects).toBe('Se prosjekter');
  });

  it('reactively switches to English dictionary when language updates to "en"', () => {
    const { result } = renderHook(() => useTranslation());

    act(() => {
      result.current.setLanguage('en');
    });

    expect(result.current.language).toBe('en');
    expect(result.current.t.nav.projects).toBe('Projects');
    expect(result.current.t.hero.viewProjects).toBe('View Projects');
  });

  it('toggles language back and forth via toggleLanguage', () => {
    const { result } = renderHook(() => useTranslation());
    expect(result.current.language).toBe('no');

    act(() => {
      result.current.toggleLanguage();
    });
    expect(result.current.language).toBe('en');
    expect(result.current.t.nav.experience).toBe('Experience');

    act(() => {
      result.current.toggleLanguage();
    });
    expect(result.current.language).toBe('no');
    expect(result.current.t.nav.experience).toBe('Erfaring');
  });

  it('provides comprehensive Norwegian localizations for skills, footer, badges, and metadata', () => {
    const { result } = renderHook(() => useTranslation());
    expect(result.current.t.documentTitle).toContain('Sjefsarkitekt');
    expect(result.current.t.nav.brandRole).toBe('Sjefsarkitekt');
    expect(result.current.t.nav.skipToContent).toBe('Hopp til hovedinnhold');
    expect(result.current.t.nav.themeDark).toBe('Mørk');
    expect(result.current.t.nav.themeLight).toBe('Lys');
    expect(result.current.t.hero.experiencePeriod).toBe('KulturIT (2018 – nåværende)');
    expect(result.current.t.hero.portraitAlt).toBe('Portrett av Øyvind Volden');
    expect(result.current.t.skills.quadrants['architecture-governance'].title).toBe('Arkitektur & Metodikk');
    expect(result.current.t.skills.levels.core).toBe('Kjerne');
    expect(result.current.t.skills.skillNames?.['Clean Code & Software Readability']).toBe('Ren kode & lesbarhet');
    expect(result.current.t.experience.badges?.kulturit).toBe('Nåværende lederrolle');
    expect(result.current.t.experience.locations?.kulturit).toBe('Lillehammer, Norge');
    expect(result.current.t.projects.searchAriaLabel).toBe('Søk i arkitekturprosjekter');
    expect(result.current.t.projects.links?.['Live Platform']).toBe('Åpne løsning');
    expect(result.current.t.projects.techTags?.['3D Room Curation']).toBe('3D-romkuratering');
    expect(result.current.t.footer.copyright).toContain('Sjefsarkitekt');
    expect(result.current.t.footer.builtWith).toContain('Universelt utformet');
  });

  it('correctly maps and translates all Ciber and career milestones in both Norwegian and English', () => {
    const { result } = renderHook(() => useTranslation());

    // Norwegian verification
    const noMilestones = result.current.t.experience.milestones;
    expect(noMilestones['ciber-cloud']?.role).toBe('Seniorkonsulent & Teamleder (Cloud N5D)');
    expect(noMilestones['ciber']?.role).toBe('Seniorkonsulent & Teamleder (Cloud N5D)');
    expect(noMilestones['ciber-cloud']?.summary).toContain('personalansvar');
    expect(noMilestones['noark-documentum']?.role).toBe('Systemarkitekt & Seniorutvikler (NOARK 5 Documentum)');
    expect(noMilestones['noark5']?.role).toBe('Systemarkitekt & Seniorutvikler (NOARK 5 Documentum)');
    expect(noMilestones['autosys-ksak']?.role).toBe('Sjefsarkitekt & Teknisk Gruppeleder (Autosys KSAK)');
    expect(noMilestones['mohive-saas']?.role).toBe('Systemutvikler & Arkitekturansvarlig (e-Learning SaaS)');

    // English verification
    act(() => {
      result.current.setLanguage('en');
    });
    const enMilestones = result.current.t.experience.milestones;
    expect(enMilestones['ciber-cloud']?.role).toBe('Senior Consultant & Team Leader (Cloud N5D)');
    expect(enMilestones['ciber']?.role).toBe('Senior Consultant & Team Leader (Cloud N5D)');
    expect(enMilestones['ciber-cloud']?.summary).toContain('personnel responsibility');
    expect(enMilestones['noark-documentum']?.role).toBe('System Architect & Integration Engineer (NOARK 5 Documentum)');
    expect(enMilestones['autosys-ksak']?.role).toBe('Lead System Architect & Tech Lead (Autosys KSAK)');
    expect(enMilestones['mohive-saas']?.role).toBe('Software Engineer & Architecture Lead (e-Learning SaaS)');
  });
});
