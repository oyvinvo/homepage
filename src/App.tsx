import React, { useEffect } from 'react';
import { Navbar } from './navigation/Navbar';
import { HeroSection } from './hero/HeroSection';
import { LeadershipSection } from './leadership/LeadershipSection';
import { ExperienceSection } from './experience/ExperienceSection';
import { ProjectsSection } from './projects/ProjectsSection';
import { SkillsSection } from './skills/SkillsSection';
import { ContactSection } from './contact/ContactSection';
import { CVManifestDrawer } from './manifest/CVManifestDrawer';
import { ToastNotification } from './shared/ToastNotification';
import { CursorTrail3D } from './effects/CursorTrail3D';
import { usePortfolioStore } from './shared/store';

export const App: React.FC = () => {
  const { theme, setActiveSection, setIsCvDrawerOpen } = usePortfolioStore();

  // Sync theme with document.documentElement and color-scheme
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      if (theme === 'dark') {
        root.classList.add('dark');
        root.style.colorScheme = 'dark';
      } else {
        root.classList.remove('dark');
        root.style.colorScheme = 'light';
      }
    }
  }, [theme]);

  // Active section scroll tracking with bottom-of-page contact guarantee
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // 1. If user has scrolled near bottom of page (within 150px), activate contact
      if (scrollY + windowHeight >= documentHeight - 150) {
        setActiveSection('contact');
        return;
      }

      // 2. Otherwise inspect sections in reverse order
      const sectionIds = ['hero', 'leadership', 'experience', 'projects', 'skills', 'contact'];
      const navThreshold = 140;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= navThreshold) {
            setActiveSection(sectionIds[i]);
            return;
          }
        }
      }
      setActiveSection('hero');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setActiveSection]);

  // Global keyboard shortcut ('c' for CV)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement instanceof HTMLInputElement ||
        document.activeElement instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (e.key === 'c' || e.key === 'C') {
        e.preventDefault();
        setIsCvDrawerOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsCvDrawerOpen]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950 transition-colors duration-200">
      <Navbar />

      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        <HeroSection />
        <LeadershipSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>

      <footer className="py-12 border-t border-slate-200 dark:border-slate-900/80 bg-slate-100 dark:bg-[#040609] text-center text-xs text-slate-600 dark:text-slate-400 space-y-2 transition-colors">
        <div>
          © {new Date().getFullYear()} Øyvind Volden. Lead Architect & Head of Architect Group at KulturIT.
        </div>
        <div>
          Built with React 18, TypeScript, and modern web standards. Fully accessible • WCAG 2.1/2.2 AA.
        </div>
      </footer>

      {/* Global Modals & Notifications */}
      <CVManifestDrawer />
      <ToastNotification />

      {/* 3D Perspective Cursor Trail Effect */}
      <CursorTrail3D />
    </div>
  );
};

export default App;
