import React, { useEffect, useRef } from 'react';
import { Download, Printer, X } from 'lucide-react';
import { usePortfolioStore } from '../shared/store';
import { experienceCatalog } from '../experience/experienceCatalog';
import { skillsCatalog } from '../skills/skillsCatalog';
import { projectsCatalog } from '../projects/projectsCatalog';

export const CVManifestDrawer: React.FC = () => {
  const { isCvDrawerOpen, setIsCvDrawerOpen } = usePortfolioStore();
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  // Store previously focused element and focus close button when modal opens
  useEffect(() => {
    if (isCvDrawerOpen) {
      previouslyFocusedRef.current = document.activeElement as HTMLElement;
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      if (previouslyFocusedRef.current && typeof previouslyFocusedRef.current.focus === 'function') {
        previouslyFocusedRef.current.focus();
      }
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isCvDrawerOpen]);

  // Handle Escape key and focus trap cycling
  useEffect(() => {
    if (!isCvDrawerOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setIsCvDrawerOpen(false);
        return;
      }

      if (e.key === 'Tab' && drawerRef.current) {
        const focusableElements = drawerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const focusable = Array.from(focusableElements).filter(
          (el) => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden')
        );

        if (focusable.length === 0) return;

        const firstElement = focusable[0];
        const lastElement = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCvDrawerOpen, setIsCvDrawerOpen]);

  if (!isCvDrawerOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-sm print:p-0 print:bg-white print:static"
      role="dialog"
      aria-modal="true"
      aria-labelledby="manifest-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setIsCvDrawerOpen(false);
        }
      }}
    >
      <div
        ref={drawerRef}
        className="w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl bg-slate-900 border border-slate-800 text-slate-200 shadow-2xl p-6 sm:p-10 space-y-8 print:border-none print:shadow-none print:max-h-none print:p-0 print:bg-white print:text-black print:overflow-visible"
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-6 print:border-black">
          <div className="flex items-start gap-4">
            <picture className="shrink-0">
              <source type="image/webp" srcSet={`${import.meta.env.BASE_URL}images/oyvind-volden-192.webp`} />
              <img
                src={`${import.meta.env.BASE_URL}images/oyvind-volden.jpg`}
                alt="Øyvind Volden"
                width={64}
                height={64}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover border border-slate-700/80 shadow-md print:border-black print:w-14 print:h-14"
              />
            </picture>
            <div>
              <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider print:text-slate-600">
                Curriculum Vitae • Executive Summary
              </span>
              <h2 id="manifest-title" className="text-2xl sm:text-3xl font-bold text-white print:text-black mt-1">
                Øyvind Volden
              </h2>
              <div className="text-sm sm:text-base text-slate-300 print:text-slate-700 font-medium mt-0.5">
                Lead Architect & Tech Lead • Head of Architect Group at KulturIT
              </div>
              <div className="text-xs text-slate-400 print:text-slate-600 mt-1">
                Lillehammer, Norway • oyvind.volden+homepage@gmail.com • linkedin.com/in/oyvindvolden
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 print:hidden">
            <button
              type="button"
              onClick={handlePrint}
              className="min-h-[44px] inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Print or Save as PDF"
            >
              <Printer className="w-4 h-4" aria-hidden="true" />
              <span>Print / PDF</span>
            </button>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setIsCvDrawerOpen(false)}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              aria-label="Close CV Manifest Drawer"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Executive Profile Statement */}
        <section className="space-y-2">
          <h3 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider print:text-slate-800">
            Executive Profile
          </h3>
          <p className="text-sm text-slate-300 print:text-slate-800 leading-relaxed">
            System Architect and engineering leader with 15+ years of production experience in mission-critical distributed systems, automated rule engines, and cloud modernizations. For the past two years, serving as Head of the Architect Group at KulturIT, governing architecture strategy, ADR processes, Domain-Driven Design (DDD), and scalable microservices across the Nordic cultural heritage domain.
          </p>
        </section>

        {/* Career Experience */}
        <section className="space-y-6">
          <h3 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider print:text-slate-800 border-b border-slate-800/80 pb-2 print:border-black">
            Professional Experience
          </h3>
          <div className="space-y-6">
            {experienceCatalog.map((exp) => (
              <div key={exp.id} className="space-y-2 print-avoid-break">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                  <div>
                    <span className="font-bold text-base text-white print:text-black">{exp.role}</span>
                    <span className="text-cyan-400 print:text-slate-700 font-semibold text-sm"> — {exp.company}</span>
                  </div>
                  <span className="text-xs text-slate-400 print:text-slate-600 font-mono">{exp.period}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 print:text-slate-800 leading-relaxed">
                  {exp.summary}
                </p>
                <ul className="list-disc list-outside ml-4 text-xs text-slate-300 print:text-slate-700 space-y-1">
                  {exp.architectureHighlights.map((hl, i) => (
                    <li key={i}>{hl}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-1 pt-1 print:hidden">
                  {exp.technologies.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded text-[11px] bg-slate-800 text-slate-300 border border-slate-700">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Key Architectural Case Studies */}
        <section className="space-y-4">
          <h3 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider print:text-slate-800 border-b border-slate-800/80 pb-2 print:border-black">
            Key Architectural Case Studies
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {projectsCatalog.map((proj) => (
              <div key={proj.id} className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800/80 print:border-none print:p-0 space-y-1.5 print:break-inside-avoid print-avoid-break">
                <div className="flex items-baseline justify-between gap-1">
                  <span className="font-bold text-xs text-white print:text-black">{proj.title}</span>
                  <span className="text-[11px] text-slate-400 print:text-slate-600 font-mono">{proj.period}</span>
                </div>
                <div className="text-[11px] text-cyan-400 print:text-slate-700 font-medium">{proj.client}</div>
                <p className="text-xs text-slate-300 print:text-slate-700 leading-relaxed">{proj.summary}</p>
                <div className="text-[11px] text-slate-400 print:text-slate-600 pt-1">
                  <span className="font-semibold text-slate-300 print:text-slate-800">Stack: </span>
                  {proj.techStack.join(', ')}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Competencies */}
        <section className="space-y-4">
          <h3 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider print:text-slate-800 border-b border-slate-800/80 pb-2 print:border-black">
            Core Competencies & Stack
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {skillsCatalog.map((grp) => (
              <div key={grp.id} className="space-y-1.5">
                <h4 className="text-xs font-bold text-white print:text-black">{grp.title}</h4>
                <p className="text-xs text-slate-300 print:text-slate-700">
                  {grp.skills.map((s) => s.name).join(', ')}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Education & Academic Foundation */}
        <section className="space-y-3 print:break-inside-avoid print-avoid-break">
          <h3 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider print:text-slate-800 border-b border-slate-800/80 pb-2 print:border-black">
            Education & Academic Foundation
          </h3>
          <div className="space-y-1">
            <div className="flex items-baseline justify-between gap-1">
              <span className="font-bold text-sm text-white print:text-black">
                Universitetet i Oslo (UiO)
              </span>
              <span className="text-xs text-slate-400 print:text-slate-600 font-mono">
                2004–2008
              </span>
            </div>
            <div className="text-xs text-cyan-400 print:text-slate-700 font-medium">
              Institutt for informatikk (IFI) • Oslo, Norway
            </div>
            <p className="text-xs text-slate-300 print:text-slate-700 leading-relaxed">
              Bachelor's Degree & Graduate Coursework (Hovedfagskurs) in Informatics. Rigorous training in software architecture, distributed systems, algorithms, and database systems.
            </p>
          </div>
        </section>

        {/* Modal Footer */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-800 print:border-black text-xs text-slate-400 print:text-slate-600">
          <span>Øyvind Volden • Curriculum Vitae</span>
          <button
            type="button"
            onClick={handlePrint}
            className="min-h-[44px] inline-flex items-center gap-1.5 px-3 py-2 text-cyan-400 hover:text-cyan-300 font-semibold print:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-md"
          >
            <Download className="w-4 h-4" aria-hidden="true" />
            <span>Save as PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};
