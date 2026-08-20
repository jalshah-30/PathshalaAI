import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  XCircle,
  Play,
  RotateCcw,
  X,
  Shield,
  Layers,
  Cpu,
  HelpCircle,
  Clock
} from 'lucide-react';
import { TestSuiteSummary, TestResultItem } from '../types';

interface TestRunnerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TestRunnerModal: React.FC<TestRunnerModalProps> = ({ isOpen, onClose }) => {
  const [testSummary, setTestSummary] = useState<TestSuiteSummary | null>(null);
  const [running, setRunning] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const executeTests = async () => {
    setRunning(true);
    try {
      const res = await fetch('/api/tests/run');
      const json: TestSuiteSummary = await res.json();
      setTestSummary(json);
    } catch (err) {
      console.error('Failed to run tests:', err);
    } finally {
      setRunning(false);
    }
  };

  useEffect(() => {
    if (isOpen && !testSummary) {
      executeTests();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const categories = ['all', 'Authentication', 'Authorization', 'Tools', 'Memory', 'Clarification', 'Security'];

  const filteredResults =
    selectedCategory === 'all'
      ? testSummary?.results || []
      : (testSummary?.results || []).filter((r) => r.category === selectedCategory);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Automated Verification Test Suite
              </h2>
              <p className="text-xs text-slate-500">
                End-to-end unit and security assertions for AI Orchestrator, RBAC, Memory, and Tools
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={executeTests}
              disabled={running}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition shadow-xs disabled:opacity-50"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{running ? 'Running Tests...' : 'Re-Run All Tests'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Status Banner */}
        {testSummary && (
          <div
            className={`px-6 py-3 border-b flex flex-wrap items-center justify-between gap-3 ${
              testSummary.allPassed
                ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                : 'bg-rose-50 text-rose-900 border-rose-200'
            }`}
          >
            <div className="flex items-center space-x-2">
              {testSummary.allPassed ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-600" />
              )}
              <span className="font-bold text-sm">
                {testSummary.allPassed
                  ? `All ${testSummary.total} Test Assertions Passed Successfully`
                  : `${testSummary.failed} Test(s) Failed out of ${testSummary.total}`}
              </span>
            </div>
            <div className="text-xs font-medium flex items-center space-x-4">
              <span>Passed: <strong className="text-emerald-700">{testSummary.passed}</strong></span>
              <span>Failed: <strong className="text-rose-700">{testSummary.failed}</strong></span>
              <span>Duration: <strong>{testSummary.durationMs}ms</strong></span>
            </div>
          </div>
        )}

        {/* Category Filter Pills */}
        <div className="px-6 py-2 bg-white border-b border-slate-200 flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize transition ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Test Result Rows */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-50/50 space-y-3">
          {running ? (
            <div className="py-16 text-center text-slate-500 text-sm flex flex-col items-center justify-center space-y-2">
              <RotateCcw className="w-6 h-6 animate-spin text-indigo-600" />
              <span>Executing test assertions against backend engine...</span>
            </div>
          ) : (
            filteredResults.map((test) => (
              <div
                key={test.id}
                className={`p-4 rounded-xl border bg-white transition shadow-2xs ${
                  test.passed ? 'border-slate-200' : 'border-rose-300 bg-rose-50/30'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start space-x-3">
                    <div className="mt-0.5">
                      {test.passed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-600" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-[10px] px-1.5 py-0.5 rounded-sm bg-slate-100 text-slate-600 font-bold">
                          {test.id}
                        </span>
                        <h4 className="font-bold text-xs text-slate-900">{test.name}</h4>
                        <span className="text-[10px] text-slate-400 uppercase font-semibold">
                          • {test.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">{test.description}</p>
                    </div>
                  </div>

                  <span className="text-[10px] text-slate-400 font-mono flex items-center space-x-1 shrink-0">
                    <Clock className="w-3 h-3" />
                    <span>{test.durationMs}ms</span>
                  </span>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono">
                  <div className="bg-slate-50 p-2 rounded-md border border-slate-100">
                    <span className="text-slate-400 text-[10px] uppercase block">Expected:</span>
                    <span className="text-slate-700 font-medium">{test.expected}</span>
                  </div>
                  <div className={`p-2 rounded-md border ${test.passed ? 'bg-emerald-50/50 border-emerald-100 text-emerald-800' : 'bg-rose-50 border-rose-200 text-rose-800'}`}>
                    <span className="text-slate-400 text-[10px] uppercase block">Actual:</span>
                    <span className="font-medium">{test.actual}</span>
                  </div>
                </div>

                {test.error && (
                  <div className="mt-2 text-xs text-rose-600 bg-rose-50 p-2 rounded-md font-medium">
                    Error: {test.error}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
