import React, { useState } from 'react';
import { Check, Copy, Mail } from 'lucide-react';
import { ContactCard } from './ContactCard';
import { ClipboardActionCalculator } from '../shared/ClipboardActionCalculator';
import { usePortfolioStore } from '../shared/store';
import { useTranslation } from '../i18n/useTranslation';

export const ContactEmailCard: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const { setToast } = usePortfolioStore();
  const { t } = useTranslation();

  const emailUser = 'oyvind.volden+homepage';
  const emailDomain = 'gmail.com';
  const emailAddress = `${emailUser}@${emailDomain}`;
  const obfuscatedDisplay = `${emailUser} [at] ${emailDomain}`;

  const handleCopyEmail = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(emailAddress);
        setCopied(true);
        setToast(ClipboardActionCalculator.createSuccessToast(emailAddress, t.contact.emailCopiedToast));
        setTimeout(() => setCopied(false), 2500);
      } else {
        throw new Error('Clipboard API unavailable');
      }
    } catch {
      setToast(ClipboardActionCalculator.createFailureToast(emailAddress, t.contact.copyFailedToast));
    }
  };

  return (
    <ContactCard>
      <div className="space-y-2">
        <div className="w-10 h-10 rounded-lg bg-rose-100 dark:bg-cyan-950 border border-rose-200 dark:border-cyan-800/60 flex items-center justify-center text-rose-700 dark:text-cyan-400">
          <Mail className="w-5 h-5" aria-hidden="true" />
        </div>
        <h3 className="text-lg font-bold text-slate-950 dark:text-white">{t.contact.emailCardTitle}</h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          {t.contact.emailCardDesc}
        </p>
        <div className="pt-2 font-mono text-xs text-rose-700 dark:text-cyan-300 select-all font-semibold">
          {obfuscatedDisplay}
        </div>
      </div>

      <div className="pt-4 border-t border-rose-100 dark:border-slate-800/80">
        <button
          type="button"
          onClick={handleCopyEmail}
          className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 shadow-sm active:scale-[0.98]"
          aria-label={`${t.contact.copyEmail} (${emailAddress})`}
        >
          {copied ? <Check className="w-4 h-4" aria-hidden="true" /> : <Copy className="w-4 h-4" aria-hidden="true" />}
          <span>{copied ? t.contact.emailCopiedToast : t.contact.copyEmail}</span>
        </button>
      </div>
    </ContactCard>
  );
};
