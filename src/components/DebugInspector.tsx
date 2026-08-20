import React from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  Cpu,
  Layers,
  Clock,
  CheckCircle,
  XCircle,
  Database,
  ArrowRight
} from 'lucide-react';
import { DebugTrace, ActiveContext } from '../types';

interface DebugInspectorProps {
  trace: DebugTrace | null;
  activeContext: ActiveContext | null;
  onClose?: () => void;
}

export const DebugInspector: React.FC<DebugInspectorProps> = ({
  trace,
  activeContext,
  onClose
}) => {
  return (
    <div className="bg-slate-900 text-slate-100 rounded-xl border border-slate-800 p-4 shadow-lg text-xs font-mono">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
        <div className="flex items-center space-x-2">
          <Cpu className="w-4 h-4 text-indigo-400" />
          <span className="font-semibold text-sm tracking-wide text-white">
            Architecture Execution Trace
          </span>
        </div>
        <div className="flex items-center space-x-2">
          {trace?.modelUsed && (
            <span className="bg-indigo-950/80 text-indigo-300 border border-indigo-700/50 px-2 py-0.5 rounded text-[10px] font-medium">
              {trace.modelUsed}
            </span>
          )}
          {trace && (
            <span className="flex items-center space-x-1 text-slate-400">
              <Clock className="w-3 h-3" />
              <span>{trace.latencyMs || 0}ms</span>
            </span>
          )}
          {onClose && (
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white px-1.5 py-0.5 rounded-sm hover:bg-slate-800"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {!trace ? (
        <div className="text-slate-400 py-6 text-center italic">
          No interaction trace recorded yet. Send a message or trigger a quick prompt to inspect execution steps.
        </div>
      ) : (
        <div className="space-y-3">
          {/* Grid of Key Metadata */}
          <div className="grid grid-cols-2 gap-2">
            {/* Authenticated Role */}
            <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700/60">
              <div className="text-[10px] uppercase font-semibold text-slate-400 mb-1">
                1. Authenticated Role
              </div>
              <div className="font-bold text-indigo-300 capitalize text-sm">
                {trace.role}
              </div>
            </div>

            {/* Detected Intent */}
            <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700/60">
              <div className="text-[10px] uppercase font-semibold text-slate-400 mb-1">
                2. Intent Detected
              </div>
              <div className="font-bold text-amber-300 truncate text-sm">
                {trace.intent}
              </div>
            </div>
          </div>

          {/* Extracted & Resolved Entities */}
          <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700/60">
            <div className="flex items-center justify-between text-[10px] uppercase font-semibold text-slate-400 mb-1.5">
              <span>3. Extracted Entities</span>
              {trace.resolvedFromMemory && (
                <span className="text-emerald-400 font-medium lowercase">
                  ✓ memory resolved
                </span>
              )}
            </div>
            <div className="bg-slate-950/70 p-2 rounded-sm text-slate-300 overflow-x-auto text-[11px]">
              {Object.keys(trace.entities || {}).length > 0 ? (
                <pre>{JSON.stringify(trace.entities, null, 2)}</pre>
              ) : (
                <span className="text-slate-500 italic">None required / General query</span>
              )}
            </div>
          </div>

          {/* Authorization Check */}
          <div
            className={`p-2.5 rounded-lg border ${
              trace.authorized
                ? 'bg-emerald-950/30 border-emerald-800/60'
                : 'bg-rose-950/40 border-rose-800/60'
            }`}
          >
            <div className="flex items-center justify-between text-[10px] uppercase font-semibold mb-1">
              <span className="text-slate-400">4. Application Authorization</span>
              {trace.authorized ? (
                <span className="flex items-center space-x-1 text-emerald-400 font-bold">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>AUTHORIZED</span>
                </span>
              ) : (
                <span className="flex items-center space-x-1 text-rose-400 font-bold">
                  <XCircle className="w-3.5 h-3.5" />
                  <span>DENIED</span>
                </span>
              )}
            </div>
            {trace.authReason && (
              <p className="text-[11px] text-rose-300 mt-1 leading-relaxed">
                {trace.authReason}
              </p>
            )}
          </div>

          {/* Selected Tool & Execution Result */}
          <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700/60">
            <div className="flex items-center justify-between text-[10px] uppercase font-semibold text-slate-400 mb-1.5">
              <span className="flex items-center space-x-1">
                <Database className="w-3 h-3 text-cyan-400" />
                <span>5. Tool Executed</span>
              </span>
              <span className="text-cyan-300 font-mono">{trace.tool}</span>
            </div>
            <div className="bg-slate-950/70 p-2 rounded-sm text-slate-300 max-h-36 overflow-y-auto text-[11px]">
              {trace.rawResult ? (
                <pre>{JSON.stringify(trace.rawResult, null, 2)}</pre>
              ) : (
                <span className="text-slate-500 italic">No tool execution payload</span>
              )}
            </div>
          </div>

          {/* Active Context / Conversation Memory */}
          {activeContext && (
            <div className="bg-slate-800/40 p-2 rounded-lg border border-slate-700/40 text-[11px] text-slate-400 flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="font-semibold text-slate-300">Active Memory:</span>
              {activeContext.currentStudentName && (
                <span>Student: <strong className="text-white">{activeContext.currentStudentName}</strong></span>
              )}
              {activeContext.currentClass && (
                <span>Class: <strong className="text-white">{activeContext.currentClass}</strong></span>
              )}
              <span>Messages: <strong className="text-white">{activeContext.messageCount}</strong></span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
