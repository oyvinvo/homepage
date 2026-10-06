import React from 'react';
import { usePortfolioStore } from '../shared/store';
import { useCvDrawerFocusTrap } from './useCvDrawerFocusTrap';
import { CVManifestHeader } from './CVManifestHeader';
import { CVManifestProfile } from './CVManifestProfile';
import { CVManifestExperience } from './CVManifestExperience';
import { CVManifestProjects } from './CVManifestProjects';
import { CVManifestSkills } from './CVManifestSkills';
import { CVManifestEducation } from './CVManifestEducation';
import { CVManifestFooter } from './CVManifestFooter';

export const CVManifestDrawer: React.FC = () => {
  const { isCvDrawerOpen, setIsCvDrawerOpen } = usePortfolioStore();
  const { drawerRef, closeButtonRef } = useCvDrawerFocusTrap({
    isOpen: isCvDrawerOpen,
    onClose: () => setIsCvDrawerOpen(false),
  });

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
        <CVManifestHeader
          closeButtonRef={closeButtonRef}
          onPrint={handlePrint}
          onClose={() => setIsCvDrawerOpen(false)}
        />
        <CVManifestProfile />
        <CVManifestExperience />
        <CVManifestProjects />
        <CVManifestSkills />
        <CVManifestEducation />
        <CVManifestFooter onPrint={handlePrint} />
      </div>
    </div>
  );
};
