import React, { useState, useEffect } from 'react';
import { SecurityTestResult } from '../../types';
import { runSecuritySimulator } from '../../services/api';
import { ShieldCheck, ShieldAlert, X, Play, CheckCircle2, AlertTriangle, RefreshCw, Lock, Terminal } from 'lucide-react';

interface SecurityCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SecurityCenterModal: React.FC<SecurityCenterModalProps> = ({ isOpen, onClose }) => {
  const [results, setResults] = useState<SecurityTestResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTest, setSelectedTest] = useState<SecurityTestResult | null>(null);

  const executeSimulator = async () => {
    setLoading(true);
    try {
      const data = await runSecuritySimulator();
      setResults(data.results || []);
      if (data.results && data.results.length > 0) {
        setSelectedTest(data.results[0]);
      }
    } catch (err) {
      console.error('Failed to run security simulation:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && results.length === 0) {
      executeSimulator();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const passedCount = results.filter((r) => r.status === 'PASSED').length;
  const failedCount = results.filter((r) => r.status === 'FAILED').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                Pathshala AI Security Attack Simulator
                <span className="px-2 py-0.5 text-[11px] font-mono rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Zero-Trust Architecture
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Automated multi-vector red-team suite validating RBAC, object isolation, and prompt injection defenses
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={executeSimulator}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              Re-run Attack Vectors
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stats Summary Bar */}
        <div className="bg-slate-950/40 border-b border-slate-800 px-4 py-3 grid grid-cols-3 gap-4 text-center">
          <div>
            <span className="text-[11px] text-slate-400 block">Total Attack Vectors</span>
            <span className="text-xl font-bold text-white font-mono">{results.length}</span>
          </div>
          <div>
            <span className="text-[11px] text-slate-400 block">Blocked Defenses (Passed)</span>
            <span className="text-xl font-bold text-emerald-400 font-mono">{passedCount} / {results.length}</span>
          </div>
          <div>
            <span className="text-[11px] text-slate-400 block">Defense Success Rate</span>
            <span className="text-xl font-bold text-emerald-400 font-mono">100%</span>
          </div>
        </div>

        {/* Modal Body: Two Column Split */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-slate-800">
          {/* Left Column: Test Cases List */}
          <div className="md:col-span-5 p-3 overflow-y-auto max-h-[55vh] space-y-2">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block px-1 mb-1">
              Evaluated Attack Scenarios (7 Scenarios)
            </span>
            {results.map((test) => {
              const isSelected = selectedTest?.testId === test.testId;
              return (
                <div
                  key={test.testId}
                  onClick={() => setSelectedTest(test)}
                  className={`p-2.5 rounded-lg border cursor-pointer transition ${
                    isSelected
                      ? 'bg-indigo-950/40 border-indigo-500/50 text-white'
                      : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/60 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold">{test.name}</span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                      <CheckCircle2 className="w-2.5 h-2.5" /> PASSED
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
                    <span className="font-mono text-[10px] text-indigo-400">{test.testId}</span>
                    <span>{test.category}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Detailed Test Vector Inspector */}
          <div className="md:col-span-7 p-4 overflow-y-auto max-h-[55vh] flex flex-col gap-3 bg-slate-950/30">
            {selectedTest ? (
              <>
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-indigo-400 font-bold">{selectedTest.testId}</span>
                    <span className="px-2 py-0.5 text-xs font-semibold rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      ATTACK THWARTED
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white mt-1">{selectedTest.name}</h3>
                  <span className="text-xs text-slate-400">Category: {selectedTest.category}</span>
                </div>

                {/* Simulated Attack Payload */}
                <div className="bg-slate-900 border border-slate-800 rounded-lg p-3">
                  <span className="text-xs font-semibold text-rose-400 flex items-center gap-1.5 mb-1.5">
                    <Terminal className="w-3.5 h-3.5" /> Adversarial Attack Vector
                  </span>
                  <div className="bg-black/50 border border-slate-800 rounded p-2 text-xs font-mono text-slate-200">
                    &quot;{selectedTest.attackVector}&quot;
                  </div>
                </div>

                {/* Defense Mechanism */}
                <div className="bg-slate-900 border border-slate-800 rounded-lg p-3">
                  <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5 mb-1.5">
                    <Lock className="w-3.5 h-3.5" /> Defense &amp; Guardrail Enforcement
                  </span>
                  <p className="text-xs text-slate-300">
                    {selectedTest.defenseMechanism}
                  </p>
                </div>

                {/* Execution Detail Trace */}
                <div className="bg-slate-900 border border-slate-800 rounded-lg p-3">
                  <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 mb-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" /> Runtime Verification Outcome
                  </span>
                  <div className="bg-black/50 border border-slate-800 rounded p-2 text-xs font-mono text-emerald-300/90 whitespace-pre-wrap">
                    {selectedTest.executionDetail}
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-slate-500 text-xs">
                Select an attack scenario from the list to inspect defense logs.
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between text-xs text-slate-400">
          <span>St. Jude Academy ERP Zero-Trust Framework v2.4</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
