import React from 'react';
import { FileText, Menu, X } from 'lucide-react';
import { useTranslation } from '../i18n/useTranslation';
import { LanguageToggle } from '../i18n/LanguageToggle';

interface NavbarMobileMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
  onOpenCv: () => void;
}

export const NavbarMobileMenu: React.FC<NavbarMobileMenuProps> = ({
  isOpen,
  onToggle,
  onNavClick,
  onOpenCv,
}) => {
  const { t } = useTranslation();

  const navLinks = [
    { label: t.nav.leadership, href: '#leadership' },
    { label: t.nav.experience, href: '#experience' },
    { label: t.nav.projects, href: '#projects' },
    { label: t.nav.skills, href: '#skills' },
    { label: t.nav.contact, href: '#contact' },
  ];

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        type="button"
        onClick={onToggle}
        className="md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-label={isOpen ? t.nav.closeMenu : t.nav.toggleMenu}
      >
        {isOpen ? (
          <X className="w-6 h-6" aria-hidden="true" />
        ) : (
          <Menu className="w-6 h-6" aria-hidden="true" />
        )}
      </button>

      {/* Mobile Navigation Dropdown */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="absolute top-16 left-0 w-full md:hidden border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 px-4 pt-2 pb-4 space-y-2 shadow-lg"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => onNavClick(e, link.href)}
              className="min-h-[44px] flex items-center px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-slate-950 hover:bg-slate-100 dark:text-slate-200 dark:hover:text-white dark:hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              {link.label}
            </a>
          ))}

          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
            <div className="flex items-center justify-between py-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {t.nav.languageLabel}
              </span>
              <LanguageToggle />
            </div>

            <button
              type="button"
              onClick={onOpenCv}
              className="w-full min-h-[44px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-300 dark:text-white dark:bg-slate-800 dark:hover:bg-slate-700 dark:border-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <FileText className="w-4 h-4 text-cyan-600 dark:text-cyan-400" aria-hidden="true" />
              <span>{t.nav.openCv}</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
