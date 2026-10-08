import React from 'react';
import { Download } from 'lucide-react';
import { useTranslation } from '../i18n/useTranslation';

interface CVManifestFooterProps {
  onPrint: () => void;
}

export const CVManifestFooter: React.FC<CVManifestFooterProps> = ({ onPrint }) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-between pt-6 border-t border-slate-800 print:border-black text-xs text-slate-400 print:text-slate-600">
      <span>Øyvind Volden • Curriculum Vitae</span>
      <button
        type="button"
        onClick={onPrint}
        className="min-h-[44px] inline-flex items-center gap-1.5 px-3 py-2 text-cyan-400 hover:text-cyan-300 font-semibold print:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-md"
      >
        <Download className="w-4 h-4" aria-hidden="true" />
        <span>{t.manifest.saveAsPdf}</span>
      </button>
    </div>
  );
};
