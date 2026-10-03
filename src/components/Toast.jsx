import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Toast = () => {
  const { toast } = useApp();

  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in max-w-md">
      <div className={`flex items-center gap-3 p-4 rounded-xl shadow-2xl border ${
        isSuccess
          ? 'bg-slate-900 border-teal-500/40 text-white'
          : isError
          ? 'bg-rose-950 border-rose-500/40 text-rose-100'
          : 'bg-slate-900 border-slate-700 text-slate-100'
      }`}>
        {isSuccess && <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0" />}
        {isError && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />}
        {!isSuccess && !isError && <Info className="w-5 h-5 text-amber-400 shrink-0" />}
        
        <p className="text-sm font-medium pr-2">{toast.message}</p>
      </div>
    </div>
  );
};
