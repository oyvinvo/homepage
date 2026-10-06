import React from 'react';
import { Printer, X } from 'lucide-react';

interface CVManifestHeaderProps {
  closeButtonRef: React.RefObject<HTMLButtonElement>;
  onPrint: () => void;
  onClose: () => void;
}

export const CVManifestHeader: React.FC<CVManifestHeaderProps> = ({
  closeButtonRef,
  onPrint,
  onClose,
}) => {
  return (
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
          onClick={onPrint}
          className="min-h-[44px] inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-label="Print or Save as PDF"
        >
          <Printer className="w-4 h-4" aria-hidden="true" />
          <span>Print / PDF</span>
        </button>

        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          aria-label="Close CV Manifest Drawer"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};
