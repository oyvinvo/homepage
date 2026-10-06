import React, { useState } from 'react';
import { Check, Copy, ExternalLink, FileText, Github, Linkedin, Mail, MessageSquare } from 'lucide-react';
import { ClipboardActionCalculator } from '../shared/ClipboardActionCalculator';
import { usePortfolioStore } from '../shared/store';
import { AmbientSpotlight } from '../effects/AmbientSpotlight';
import { ContactCard } from './ContactCard';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const { setToast, setIsCvDrawerOpen } = usePortfolioStore();

  const emailUser = 'oyvind.volden+homepage';
  const emailDomain = 'gmail.com';
  const emailAddress = `${emailUser}@${emailDomain}`;
  const obfuscatedDisplay = `${emailUser} [at] ${emailDomain}`;

  const handleCopyEmail = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(emailAddress);
        setCopied(true);
        setToast(ClipboardActionCalculator.createSuccessToast(emailAddress));
        setTimeout(() => setCopied(false), 2500);
      } else {
        throw new Error('Clipboard API unavailable');
      }
    } catch {
      setToast(ClipboardActionCalculator.createFailureToast(emailAddress));
    }
  };

  return (
    <section
      id="contact"
      className="relative py-20 border-b border-rose-300/80 dark:border-rose-900/60 bg-gradient-to-b from-rose-100/90 via-pink-50/60 to-red-100/70 dark:from-[#2d0e24] dark:via-[#3d1230] dark:to-[#1a0815] transition-colors duration-200 overflow-hidden"
    >
      <AmbientSpotlight />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-rose-800 dark:text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <MessageSquare className="w-4 h-4" aria-hidden="true" />
          <span>Get in Touch</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-950 dark:text-white tracking-tight">
          Connect & Exchange Ideas
        </h2>
        <p className="mt-3 text-base sm:text-lg text-slate-700 dark:text-slate-300 max-w-3xl leading-relaxed">
          I'm very happy leading architecture at KulturIT, but I'm always glad to connect with fellow architects, share experiences, or discuss distributed systems, DDD, and technical leadership.
        </p>

        {/* Contact Cards Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Direct Email & Obfuscated 1-Click Copy */}
          <ContactCard>
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-rose-100 dark:bg-cyan-950 border border-rose-200 dark:border-cyan-800/60 flex items-center justify-center text-rose-700 dark:text-cyan-400">
                <Mail className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold text-slate-950 dark:text-white">Direct Email</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                Drop me a line for tech discussions, architecture exchanges, or questions.
              </p>
              <div className="pt-2 font-mono text-xs text-rose-700 dark:text-cyan-300 select-all font-semibold">
                {obfuscatedDisplay}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                Scraper-protected • Click below to copy address
              </p>
            </div>

            <div className="pt-4 border-t border-rose-100 dark:border-slate-800/80">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 shadow-sm active:scale-[0.98]"
                aria-label={`Copy email address ${emailAddress} to clipboard`}
              >
                {copied ? <Check className="w-4 h-4" aria-hidden="true" /> : <Copy className="w-4 h-4" aria-hidden="true" />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Email Address'}</span>
              </button>
            </div>
          </ContactCard>

          {/* Card 2: Professional Networks */}
          <ContactCard>
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-950 border border-blue-200 dark:border-blue-800/60 flex items-center justify-center text-blue-700 dark:text-blue-400">
                <Linkedin className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold text-slate-950 dark:text-white">Professional Networks</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                Connect on LinkedIn or inspect open-source repositories and contributions on GitHub.
              </p>
            </div>

            <div className="pt-4 flex flex-col gap-2 border-t border-rose-100 dark:border-slate-800/80">
              <a
                href="https://www.linkedin.com/in/oyvindvolden"
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] inline-flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 dark:text-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
              >
                <span className="flex items-center gap-2">
                  <Linkedin className="w-4 h-4 text-cyan-600 dark:text-cyan-400" aria-hidden="true" />
                  <span>LinkedIn Profile</span>
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" aria-hidden="true" />
              </a>

              <a
                href="https://github.com/oyvinvo"
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] inline-flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 dark:text-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
              >
                <span className="flex items-center gap-2">
                  <Github className="w-4 h-4 text-slate-800 dark:text-cyan-400" aria-hidden="true" />
                  <span>GitHub (@oyvinvo)</span>
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" aria-hidden="true" />
              </a>
            </div>
          </ContactCard>

          {/* Card 3: Curriculum Vitae & Printable PDF */}
          <ContactCard>
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800/60 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
                <FileText className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold text-slate-950 dark:text-white">Full Curriculum Vitae</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                Comprehensive career history, client portfolio, education, and 1-click clean paper/PDF export.
              </p>
            </div>

            <div className="pt-4 border-t border-rose-100 dark:border-slate-800/80">
              <button
                type="button"
                onClick={() => setIsCvDrawerOpen(true)}
                className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300/80 dark:text-white dark:bg-slate-800 dark:hover:bg-slate-700 dark:border-slate-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 shadow-sm active:scale-[0.98]"
              >
                <FileText className="w-4 h-4 text-cyan-600 dark:text-cyan-400" aria-hidden="true" />
                <span>Open Full CV / Print View</span>
              </button>
            </div>
          </ContactCard>
        </div>
      </div>
    </section>
  );
};
