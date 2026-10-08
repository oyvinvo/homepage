import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import { usePortfolioStore } from '../shared/store';
import { useTranslation } from '../i18n/useTranslation';
import { LanguageToggle } from '../i18n/LanguageToggle';
import { NavbarBrand } from './NavbarBrand';
import { NavbarNavLinks } from './NavbarNavLinks';
import { NavbarThemeToggle } from './NavbarThemeToggle';
import { NavbarMobileMenu } from './NavbarMobileMenu';

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { activeSection, setActiveSection, setIsCvDrawerOpen, theme, toggleTheme } = usePortfolioStore();
  const { t } = useTranslation();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    setActiveSection(targetId);
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      const navOffset = 70;
      const elementPosition = targetEl.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      targetEl.classList.remove('target-glow');
      void targetEl.offsetWidth;
      targetEl.classList.add('target-glow');

      window.history.pushState(null, '', href);
    }
  };

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-cyan-500 focus:text-slate-950 focus:font-semibold focus:rounded-md focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-white"
      >
        {t.nav.skipToContent}
      </a>

      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/85 dark:bg-slate-950/85 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <NavbarBrand onNavClick={handleNavClick} />

          <NavbarNavLinks activeSection={activeSection} onNavClick={handleNavClick} />

          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageToggle className="hidden sm:inline-flex" />

            <NavbarThemeToggle theme={theme} onToggleTheme={toggleTheme} />

            <div className="hidden sm:flex items-center">
              <button
                type="button"
                onClick={() => setIsCvDrawerOpen(true)}
                className="inline-flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-md text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300/80 dark:text-white dark:bg-slate-800 dark:hover:bg-slate-700 dark:border-slate-700 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 active:scale-[0.98] shadow-sm"
                aria-label={t.nav.openCv}
              >
                <FileText className="w-4 h-4 text-cyan-600 dark:text-cyan-400" aria-hidden="true" />
                <span>{t.nav.openCv}</span>
              </button>
            </div>

            <NavbarMobileMenu
              isOpen={isMobileMenuOpen}
              onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              onNavClick={handleNavClick}
              onOpenCv={() => {
                setIsMobileMenuOpen(false);
                setIsCvDrawerOpen(true);
              }}
            />
          </div>
        </div>
      </header>
    </>
  );
};
