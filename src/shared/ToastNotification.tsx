import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { usePortfolioStore } from './store';

export const ToastNotification: React.FC = () => {
  const { toast, setToast } = usePortfolioStore();

  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      setToast(null);
    }, 4000);

    return () => clearTimeout(timer);
  }, [toast, setToast]);

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-4 h-4 text-emerald-400" aria-hidden="true" />,
    error: <AlertCircle className="w-4 h-4 text-rose-400" aria-hidden="true" />,
    info: <Info className="w-4 h-4 text-cyan-400" aria-hidden="true" />,
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white shadow-2xl text-xs font-medium animate-in fade-in slide-in-from-bottom-2 duration-200"
    >
      {icons[toast.type]}
      <span>{toast.message}</span>
      <button
        type="button"
        onClick={() => setToast(null)}
        className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
        aria-label="Dismiss notification"
      >
        <X className="w-4 h-4" aria-hidden="true" />
      </button>
    </div>
  );
};
