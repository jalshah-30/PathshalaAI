import React, { useEffect, useState } from 'react';
import { AuthUser, AttendanceTrendResult } from '../../types';
import { fetchAttendanceTrend } from '../../services/api';
import { Sparkles, TrendingUp, TrendingDown, PhoneCall, ShieldAlert, Users, Calendar, AlertTriangle, MessageSquarePlus } from 'lucide-react';

interface ParentCopilotProps {
  user: AuthUser;
  onSendPrompt: (prompt: string) => void;
  onRequestTeacherCall: (childName?: string) => void;
}

export const ParentCopilot: React.FC<ParentCopilotProps> = ({
  user,
  onSendPrompt,
  onRequestTeacherCall
}) => {
  const [selectedChildId, setSelectedChildId] = useState<string>(user.childrenIds?.[0] || 'S002');
  const [trend, setTrend] = useState<AttendanceTrendResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    if (selectedChildId) {
      setLoading(true);
      fetchAttendanceTrend(selectedChildId)
        .then((data) => {
          if (isMounted) {
            setTrend(data);
            setLoading(false);
          }
        })
        .catch(() => {
          if (isMounted) setLoading(false);
        });
    }
    return () => {
      isMounted = false;
    };
  }, [selectedChildId]);

  const childName = trend?.student_name || 'Rahul Sharma';
  const isDeclining = trend?.trend_direction === 'declining' || (trend && trend.change_percentage_points < 0);

  return (
    <div id="parent-copilot-card" className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 text-slate-100 flex flex-col gap-4">
      {/* Header Banner */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white tracking-wide">Parent Guardian Copilot</h2>
            <p className="text-xs text-slate-400">Family attendance monitor & direct teacher connectivity</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-blue-500/10 text-blue-300 border border-blue-500/20">
            Family ID: {user.associatedId || 'P001'}
          </span>
        </div>
      </div>

      {/* Child Overview & Alert Banner if declining */}
      {isDeclining && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="flex-1 text-xs">
            <span className="font-semibold text-amber-300 block">Attendance Fluctuation Alert</span>
            <p className="text-amber-200/90 mt-0.5">
              {childName}&apos;s attendance decreased by {Math.abs(trend?.change_percentage_points || 8.3)}% over the past 2 weeks. Proactive coordination with the class teacher is recommended.
            </p>
            <div className="mt-2 flex gap-2">
              <button
                id="btn-parent-request-call-alert"
                onClick={() => onRequestTeacherCall(childName)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold bg-amber-500 text-slate-950 hover:bg-amber-400 transition"
              >
                <PhoneCall className="w-3.5 h-3.5" /> Request Teacher Callback
              </button>
              <button
                onClick={() => onSendPrompt(`Explain why ${childName}'s attendance dropped recently.`)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
              >
                <Sparkles className="w-3 h-3 text-amber-300" /> Ask Pathshala AI
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-3">
          <div className="text-xs text-slate-400">Current Attendance</div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">{trend?.current_overall_percentage ?? trend?.current_percentage ?? 91.2}%</span>
            <span className="text-xs text-emerald-400 font-medium">{trend?.class_name || 'Class 10-A'}</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Student: {childName}</p>
        </div>

        <div className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-3">
          <div className="text-xs text-slate-400">3-Week Change</div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">
              {trend ? `${(trend.change_percentage_points ?? trend.three_week_change ?? 0) >= 0 ? '+' : ''}${trend.change_percentage_points ?? trend.three_week_change}%` : '-8.3%'}
            </span>
            <span className={`text-xs font-medium ${isDeclining ? 'text-amber-400' : 'text-emerald-400'}`}>
              {trend?.trend_direction ? trend.trend_direction.toUpperCase() : 'DECLINING'}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">From baseline to last 7 days</p>
        </div>

        <div className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-3">
          <div className="text-xs text-slate-400">Teacher Consultation</div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-sm font-semibold text-slate-200">Mrs. Ananya Sen</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Class Teacher (Class 10-A)</p>
        </div>
      </div>

      {/* Multi-Week Breakdown Visual */}
      {trend && trend.weekly_breakdown && Array.isArray(trend.weekly_breakdown) && (
        <div className="bg-slate-950/40 border border-slate-800/60 rounded-lg p-3">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="flex items-center gap-1.5 font-medium text-slate-300">
              <Calendar className="w-3.5 h-3.5 text-blue-400" /> Multi-Week Attendance Trend
            </span>
            <span className="text-[11px] text-slate-500">{trend.summary}</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {trend.weekly_breakdown.map((w, idx) => (
              <div key={idx} className="bg-slate-900/90 border border-slate-800 rounded p-2 text-center">
                <span className="text-[11px] text-slate-400 block">{w.week}</span>
                <span className="text-sm font-semibold text-white mt-0.5 block">{w.percentage}%</span>
                <span className="text-[10px] text-slate-500 block">{w.days_present}/{w.days_total} days</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Smart Quick Actions */}
      <div>
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
          Parent Quick Inquiries
        </span>
        <div className="flex flex-wrap gap-2">
          <button
            id="action-parent-check-child"
            onClick={() => onSendPrompt(`What is ${childName}'s attendance percentage and recent log?`)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
          >
            <MessageSquarePlus className="w-3.5 h-3.5 text-blue-400" />
            Check {childName}&apos;s Attendance
          </button>
          <button
            id="action-parent-trend"
            onClick={() => onSendPrompt(`How has ${childName}'s attendance changed over the last 3 weeks?`)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
          >
            <TrendingDown className="w-3.5 h-3.5 text-amber-400" />
            Analyze 3-Week Trend
          </button>
          <button
            id="action-parent-request-call"
            onClick={() => onRequestTeacherCall(childName)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 transition"
          >
            <PhoneCall className="w-3.5 h-3.5 text-blue-400" />
            Request Teacher Consultation Call
          </button>
        </div>
      </div>
    </div>
  );
};
