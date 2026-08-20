import React, { useState, useEffect, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Terminal, CheckCircle2, Copy } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface ErrorState {
  hasError: boolean;
  error: Error | null;
  copied: boolean;
}

export function ErrorBoundary({ children }: Props) {
  const [errorState, setErrorState] = useState<ErrorState>({
    hasError: false,
    error: null,
    copied: false
  });

  useEffect(() => {
    const handleGlobalError = (event: ErrorEvent) => {
      console.error('[Caught Global Error]:', event.error || event.message);
      setErrorState({
        hasError: true,
        error: event.error || new Error(event.message || 'Unknown runtime error'),
        copied: false
      });
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('[Caught Unhandled Rejection]:', event.reason);
      setErrorState({
        hasError: true,
        error: event.reason instanceof Error ? event.reason : new Error(String(event.reason || 'Unhandled Promise Rejection')),
        copied: false
      });
    };

    window.addEventListener('error', handleGlobalError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleGlobalError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  const handleCopyError = () => {
    const text = `${errorState.error?.toString()}\n\nStack:\n${errorState.error?.stack || ''}`;
    navigator.clipboard.writeText(text);
    setErrorState((prev) => ({ ...prev, copied: true }));
    setTimeout(() => setErrorState((prev) => ({ ...prev, copied: false })), 2000);
  };

  if (errorState.hasError) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6 font-sans">
        <div className="max-w-2xl w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl space-y-6">
          <div className="flex items-center gap-3 text-amber-400">
            <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-100">Application Runtime Alert</h1>
              <p className="text-sm text-slate-400">Pathshala AI caught an unexpected client error</p>
            </div>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs text-rose-300 overflow-x-auto max-h-48">
            <p className="font-bold text-rose-400 mb-1">{errorState.error?.toString()}</p>
            <pre className="text-slate-500 whitespace-pre-wrap">{errorState.error?.stack}</pre>
          </div>

          <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 text-xs text-slate-300 space-y-2">
            <p className="font-semibold text-slate-200 flex items-center gap-1.5">
              <Terminal className="w-4 h-4 text-indigo-400" />
              How to run Pathshala AI on Localhost:
            </p>
            <ol className="list-decimal list-inside space-y-1 text-slate-400">
              <li>Open terminal in the project folder and run <code className="bg-slate-800 text-indigo-300 px-1.5 py-0.5 rounded">npm install</code></li>
              <li>Start the full-stack server with <code className="bg-slate-800 text-indigo-300 px-1.5 py-0.5 rounded">npm run dev</code></li>
              <li>Open <code className="bg-slate-800 text-indigo-300 px-1.5 py-0.5 rounded">http://localhost:3000</code> or <code className="bg-slate-800 text-indigo-300 px-1.5 py-0.5 rounded">http://127.0.0.1:3000</code></li>
            </ol>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => window.location.reload()}
              className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl transition-all cursor-pointer shadow-lg shadow-indigo-600/20"
            >
              <RefreshCw className="w-4 h-4" />
              Reload Page
            </button>

            <button
              onClick={handleCopyError}
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium rounded-xl border border-slate-700 transition-all cursor-pointer"
            >
              {errorState.copied ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Copied Details
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy Error Log
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
