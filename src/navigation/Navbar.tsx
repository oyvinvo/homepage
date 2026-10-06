import React, { useState } from 'react';
import { FileText, Menu, Moon, Sun, X } from 'lucide-react';
import { usePortfolioStore } from '../shared/store';

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { activeSection, setActiveSection, setIsCvDrawerOpen, theme, toggleTheme } = usePortfolioStore();

  const navLinks = [
    { label: 'Leadership', href: '#leadership' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ];

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
      {/* Skip Navigation Link for Screen Readers & Keyboard Users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-cyan-500 focus:text-slate-950 focus:font-semibold focus:rounded-md focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-white"
      >
        Skip to main content
      </a>

      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/85 dark:bg-slate-950/85 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo / Identity */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center gap-2.5 text-slate-900 dark:text-white font-semibold tracking-tight hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-sm"
          >
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-cyan-500/20">
              ØV
            </span>
            <div className="flex flex-col">
              <span className="text-base leading-tight">Øyvind Volden</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-normal">Lead Architect</span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-3.5 py-2 text-sm font-medium rounded-md transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 active:scale-95 ${
                    isActive
                      ? 'text-cyan-700 bg-cyan-50 font-semibold dark:text-cyan-400 dark:bg-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-900/60'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Action Buttons: Theme Toggle & CV Manifest */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-800 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 border border-slate-300/80 dark:text-amber-300 dark:bg-slate-800 dark:hover:bg-slate-700 dark:border-slate-700 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 active:scale-95 shadow-sm"
              aria-label={theme === 'dark' ? 'Switch to colorful light theme' : 'Switch to rich dark theme'}
              title={theme === 'dark' ? 'Switch to colorful light theme' : 'Switch to rich dark theme'}
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" aria-hidden="true" />
                  <span className="hidden sm:inline font-mono">Dark</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-indigo-600" aria-hidden="true" />
                  <span className="hidden sm:inline font-mono text-indigo-700 font-semibold">Light</span>
                </>
              )}
            </button>

            {/* Desktop CV Manifest CTA */}
            <div className="hidden sm:flex items-center">
              <button
                type="button"
                onClick={() => setIsCvDrawerOpen(true)}
                className="inline-flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-md text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300/80 dark:text-white dark:bg-slate-800 dark:hover:bg-slate-700 dark:border-slate-700 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 active:scale-[0.98] shadow-sm"
                aria-label="View Full CV / Resume"
              >
                <FileText className="w-4 h-4 text-cyan-600 dark:text-cyan-400" aria-hidden="true" />
                <span>Full CV / Print</span>
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div id="mobile-menu" className="md:hidden border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 px-4 pt-2 pb-4 space-y-1 shadow-lg">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="min-h-[44px] flex items-center px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-slate-950 hover:bg-slate-100 dark:text-slate-200 dark:hover:text-white dark:hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsCvDrawerOpen(true);
                }}
                className="w-full min-h-[44px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-300 dark:text-white dark:bg-slate-800 dark:hover:bg-slate-700 dark:border-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                <FileText className="w-4 h-4 text-cyan-600 dark:text-cyan-400" aria-hidden="true" />
                <span>Full CV / Print</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
