import React from 'react';
import { FileText } from 'lucide-react';
import { ContactCard } from './ContactCard';
import { usePortfolioStore } from '../shared/store';
import { useTranslation } from '../i18n/useTranslation';

export const ContactCvCard: React.FC = () => {
  const { setIsCvDrawerOpen } = usePortfolioStore();
  const { t } = useTranslation();

  return (
    <ContactCard>
      <div className="space-y-2">
        <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800/60 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
          <FileText className="w-5 h-5" aria-hidden="true" />
        </div>
        <h3 className="text-lg font-bold text-slate-950 dark:text-white">{t.contact.cvCardTitle}</h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          {t.contact.cvCardDesc}
        </p>
      </div>

      <div className="pt-4 border-t border-rose-100 dark:border-slate-800/80">
        <button
          type="button"
          onClick={() => setIsCvDrawerOpen(true)}
          className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300/80 dark:text-white dark:bg-slate-800 dark:hover:bg-slate-700 dark:border-slate-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 shadow-sm active:scale-[0.98]"
        >
          <FileText className="w-4 h-4 text-cyan-600 dark:text-cyan-400" aria-hidden="true" />
          <span>{t.contact.openCvButton}</span>
        </button>
      </div>
    </ContactCard>
  );
};
