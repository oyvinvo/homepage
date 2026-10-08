import React from 'react';
import { useTranslation } from '../i18n/useTranslation';

interface NavbarNavLinksProps {
  activeSection: string;
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

export const NavbarNavLinks: React.FC<NavbarNavLinksProps> = ({
  activeSection,
  onNavClick,
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
    <nav className="hidden md:flex items-center gap-1" aria-label="Main Navigation">
      {navLinks.map((link) => {
        const isActive = activeSection === link.href.slice(1);
        return (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => onNavClick(e, link.href)}
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
  );
};
