import React from 'react';
import { useToast, ToastType } from '../../context/ToastContext';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';

const toastStyles: Record<ToastType, { bg: string; border: string; text: string; icon: React.ReactNode; progress: string }> = {
  success: {
    bg: 'bg-white',
    border: 'border-emerald-300',
    text: 'text-emerald-800',
    icon: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />,
    progress: 'bg-emerald-500',
  },
  warning: {
    bg: 'bg-white',
    border: 'border-amber-300',
    text: 'text-amber-800',
    icon: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />,
    progress: 'bg-amber-500',
  },
  error: {
    bg: 'bg-white',
    border: 'border-rose-300',
    text: 'text-rose-800',
    icon: <XCircle className="w-5 h-5 text-rose-600 shrink-0" />,
    progress: 'bg-rose-500',
  },
  info: {
    bg: 'bg-white',
    border: 'border-teal-300',
    text: 'text-teal-800',
    icon: <Info className="w-5 h-5 text-teal-600 shrink-0" />,
    progress: 'bg-teal-500',
  },
};

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none"
    >
      {toasts.map((toast) => {
        const style = toastStyles[toast.type];
        return (
          <div
            key={toast.id}
            role="alert"
            className={`pointer-events-auto relative overflow-hidden rounded-xl border ${style.border} ${style.bg} p-4 shadow-float animate-slide-down transition-all duration-200`}
          >
            <div className="flex items-start gap-3">
              {style.icon}
              <div className="flex-1 min-w-0 pr-2">
                <p className={`text-xs font-bold ${style.text}`}>{toast.title}</p>
                {toast.message && (
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">{toast.message}</p>
                )}
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-slate-400 hover:text-slate-700 p-0.5 rounded-md hover:bg-slate-100 transition-colors"
                aria-label="Dismiss notification"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            {/* Animated progress bar */}
            {toast.duration && toast.duration > 0 && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-100">
                <div
                  className={`h-full ${style.progress}`}
                  style={{
                    animation: `shrinkWidth ${toast.duration}ms linear forwards`,
                  }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
