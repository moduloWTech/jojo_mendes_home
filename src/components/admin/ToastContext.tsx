'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  toast: {
    success: (message: string) => void;
    error: (message: string) => void;
    info: (message: string) => void;
    warning: (message: string) => void;
  };
}

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (message: string, type: ToastType) => {
      const id = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
      setToasts((prev) => [...prev, { id, message, type }]);

      setTimeout(() => {
        removeToast(id);
      }, 4000);
    },
    [removeToast]
  );

  const toast = {
    success: (msg: string) => addToast(msg, 'success'),
    error: (msg: string) => addToast(msg, 'error'),
    info: (msg: string) => addToast(msg, 'info'),
    warning: (msg: string) => addToast(msg, 'warning'),
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}

      {/* Container fixo de toasts */}
      <div
        aria-live="polite"
        className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0"
      >
        {toasts.map((t) => {
          const isSuccess = t.type === 'success';
          const isError = t.type === 'error';
          const isWarning = t.type === 'warning';

          return (
            <div
              key={t.id}
              className={`pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-xl border shadow-[0_12px_40px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-3 ${
                isSuccess
                  ? 'bg-[#0E1712]/95 border-emerald-500/40 text-emerald-100'
                  : isError
                  ? 'bg-[#1C0D0F]/95 border-red-500/40 text-red-100'
                  : isWarning
                  ? 'bg-[#1A1508]/95 border-[#EFC16B]/40 text-[#EFC16B]'
                  : 'bg-[#121019]/95 border-white/20 text-white'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                {isSuccess && <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />}
                {isError && <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />}
                {isWarning && <AlertTriangle className="w-4 h-4 shrink-0 text-[#EFC16B]" />}
                {!isSuccess && !isError && !isWarning && <Info className="w-4 h-4 shrink-0 text-white/70" />}
                <p className="text-xs font-medium leading-relaxed truncate">{t.message}</p>
              </div>

              <button
                type="button"
                onClick={() => removeToast(t.id)}
                className="p-1 rounded-lg hover:bg-white/10 text-white/40 hover:text-white transition-colors"
                title="Fechar"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast deve ser usado dentro de um ToastProvider');
  }
  return context.toast;
}

