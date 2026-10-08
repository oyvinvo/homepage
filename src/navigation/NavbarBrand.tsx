import React from 'react';
import { useTranslation } from '../i18n/useTranslation';

interface NavbarBrandProps {
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

export const NavbarBrand: React.FC<NavbarBrandProps> = ({ onNavClick }) => {
  const { t } = useTranslation();

  return (
    <a
      href="#hero"
      onClick={(e) => onNavClick(e, '#hero')}
      className="flex items-center gap-2.5 text-slate-900 dark:text-white font-semibold tracking-tight hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-sm"
    >
      <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-cyan-500/20">
        ØV
      </span>
      <div className="flex flex-col">
        <span className="text-base leading-tight">Øyvind Volden</span>
        <span className="text-xs text-slate-500 dark:text-slate-400 font-normal">{t.nav.brandRole}</span>
      </div>
    </a>
  );
};
