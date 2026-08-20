import React, { useEffect, useState } from 'react';
import { AuthUser, ExplainWhyResult } from '../../types';
import { fetchExplainWhy } from '../../services/api';
import {
  Building2,
  PieChart,
  TrendingDown,
  AlertOctagon,
  Sparkles,
  Shield,
  FileSpreadsheet,
  CheckCircle2,
  Layers,
  ArrowDownRight
} from 'lucide-react';

interface PrincipalCopilotProps {
  user: AuthUser;
  onSendPrompt: (prompt: string) => void;
  onOpenSecurityCenter: () => void;
  onOpenAuditLogs: () => void;
}

export const PrincipalCopilot: React.FC<PrincipalCopilotProps> = ({
  user,
  onSendPrompt,
  onOpenSecurityCenter,
  onOpenAuditLogs
}) => {
  const [explainData, setExplainData] = useState<ExplainWhyResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    fetchExplainWhy()
      .then((data) => {
        if (isMounted) {
          setExplainData(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div id="principal-copilot-card" className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 text-slate-100 flex flex-col gap-4">
      {/* Header Banner */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Building2 className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white tracking-wide">Executive Management Copilot</h2>
            <p className="text-xs text-slate-400">School-wide ERP analytics, diagnostic reasoning & zero-trust governance</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenSecurityCenter}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 transition"
          >
            <Shield className="w-3.5 h-3.5" /> Security Simulator
          </button>
          <button
            onClick={onOpenAuditLogs}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
          >
            <Layers className="w-3.5 h-3.5" /> Audit Trail
          </button>
        </div>
      </div>

      {/* Executive Key Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <div className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-3">
          <div className="text-xs text-slate-400">Overall Attendance</div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">89.6%</span>
            <span className="text-xs text-emerald-400 font-medium">8 Classes</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">St. Jude Academy ERP</p>
        </div>

        <div className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-3">
          <div className="text-xs text-slate-400">Recent Decline</div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-amber-400">-6.5%</span>
            <span className="text-xs text-amber-400 font-medium">Past 14 Days</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">From 96.1% baseline</p>
        </div>

        <div className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-3">
          <div className="text-xs text-slate-400">Total Enrollment</div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">120</span>
            <span className="text-xs text-slate-400 font-medium">Students</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">18 Faculty Members</p>
        </div>

        <div className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-3">
          <div className="text-xs text-slate-400">At-Risk Alerts</div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-rose-400">2 Critical</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Attendance &lt; 75%</p>
        </div>
      </div>

      {/* "Explain Why" Diagnostic Breakdown */}
      {explainData && (
        <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-3">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2 border-b border-slate-800/60 pb-2">
            <span className="font-semibold text-slate-200 flex items-center gap-1.5">
              <PieChart className="w-3.5 h-3.5 text-amber-400" />
              AI &quot;Explain Why&quot; Diagnostic Engine: Mathematical Root Causes (-{explainData.total_decline_percentage_points ?? Math.abs(explainData.net_change ?? 6.5)} pts total drop)
            </span>
            <button
              onClick={() => onSendPrompt('Explain why attendance dropped 6.5% over the past two weeks in detail')}
              className="text-[11px] text-amber-400 hover:text-amber-300 font-medium"
            >
              Analyze in Chat &rarr;
            </button>
          </div>

          {(explainData.root_causes && explainData.root_causes.length > 0) ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 my-2">
              {explainData.root_causes.map((cause, idx) => (
                <div key={idx} className="bg-slate-900/90 border border-slate-800/90 rounded-lg p-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-200">{cause.factor}</span>
                    <span className="font-bold text-amber-400 font-mono">-{cause.impact_percentage_points}%</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">{cause.details}</div>
                  <div className="text-[10px] text-slate-500 mt-1.5 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                    {cause.affected_students_count} students affected ({cause.category})
                  </div>
                </div>
              ))}
            </div>
          ) : (explainData.key_factors && explainData.key_factors.length > 0) ? (
            <div className="space-y-1.5 my-2">
              {explainData.key_factors.map((factor, idx) => (
                <div key={idx} className="bg-slate-900/90 border border-slate-800/90 rounded-lg p-2 text-xs text-slate-300 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0"></span>
                  <span>{factor}</span>
                </div>
              ))}
            </div>
          ) : null}

          {/* Grade Level Impact Matrix */}
          {((explainData.grade_level_breakdown && explainData.grade_level_breakdown.length > 0) || (explainData.primary_contributing_classes && explainData.primary_contributing_classes.length > 0)) && (
            <div className="mt-3 pt-2 border-t border-slate-800/60">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                Grade-Level Variance Breakdown
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(explainData.grade_level_breakdown || (explainData.primary_contributing_classes || []).map(c => ({
                  class_name: c.class_name,
                  previous_rate: 93.5,
                  current_rate: c.attendance_percentage,
                  decline_points: c.decline_percentage
                }))).map((g, idx) => (
                  <div key={idx} className="bg-slate-900/60 border border-slate-800 rounded p-2 text-xs">
                    <div className="font-semibold text-slate-300">{g.class_name}</div>
                    <div className="flex items-center justify-between mt-1 text-[11px]">
                      <span className="text-slate-400">{g.previous_rate}% &rarr; {g.current_rate}%</span>
                      <span className="text-rose-400 font-medium">-{g.decline_points}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Quick Principal Queries */}
      <div className="flex flex-wrap gap-2">
        <button
          id="action-principal-school-summary"
          onClick={() => onSendPrompt('Give me the executive school-wide attendance report')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
        >
          <Building2 className="w-3.5 h-3.5 text-amber-400" />
          School-Wide Attendance Overview
        </button>
        <button
          id="action-principal-explain-why"
          onClick={() => onSendPrompt('Explain why attendance declined across classes this week')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
        >
          <PieChart className="w-3.5 h-3.5 text-amber-400" />
          Explain Why Diagnostic
        </button>
        <button
          id="action-principal-alerts"
          onClick={() => onSendPrompt('Show all at-risk students across the school')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
        >
          <AlertOctagon className="w-3.5 h-3.5 text-rose-400" />
          All School Risk Alerts
        </button>
      </div>
    </div>
  );
};
