import React from 'react';
import { MessageSquare } from 'lucide-react';
import { AmbientSpotlight } from '../effects/AmbientSpotlight';
import { ContactEmailCard } from './ContactEmailCard';
import { ContactSocialCard } from './ContactSocialCard';
import { ContactCvCard } from './ContactCvCard';

export const ContactSection: React.FC = () => {
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
          <ContactEmailCard />
          <ContactSocialCard />
          <ContactCvCard />
        </div>
      </div>
    </section>
  );
};
