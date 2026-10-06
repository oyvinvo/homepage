import React from 'react';
import { ExternalLink, Github, Linkedin } from 'lucide-react';
import { ContactCard } from './ContactCard';

export const ContactSocialCard: React.FC = () => {
  return (
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
  );
};
