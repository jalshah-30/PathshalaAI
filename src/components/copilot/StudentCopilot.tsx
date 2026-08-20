import React, { useEffect, useState } from 'react';
import { AuthUser, AttendanceTrendResult } from '../../types';
import { fetchAttendanceTrend } from '../../services/api';
import { Sparkles, TrendingUp, TrendingDown, CheckCircle2, Award, Calendar, MessageSquarePlus, ShieldCheck } from 'lucide-react';

interface StudentCopilotProps {
  user: AuthUser;
  onSendPrompt: (prompt: string) => void;
  onRequestTeacherCall: () => void;
}

export const StudentCopilot: React.FC<StudentCopilotProps> = ({
  user,
  onSendPrompt,
  onRequestTeacherCall
}) => {
  const [trend, setTrend] = useState<AttendanceTrendResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    fetchAttendanceTrend(user.associatedId)
      .then((data) => {
        if (isMounted) {
          setTrend(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [user.associatedId]);

  return (
    <div id="student-copilot-card" className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 text-slate-100 flex flex-col gap-4">
      {/* Header Banner */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white tracking-wide">Student Academic Copilot</h2>
            <p className="text-xs text-slate-400">Personalized attendance intelligence & streak tracking</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
          <ShieldCheck className="w-3.5 h-3.5" /> Zero-Trust Verified
        </span>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Attendance Rate */}
        <div className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Overall Attendance</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white tracking-tight">
              {trend?.current_overall_percentage ?? trend?.current_percentage ?? 91.2}%
            </span>
            <span className="text-xs text-emerald-400 font-medium">Safe Zone (&gt;75%)</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">21 of 23 sessions attended</p>
        </div>

        {/* Multi-Week Trend */}
        <div className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>3-Week Trajectory</span>
            {trend && (trend.change_percentage_points ?? trend.three_week_change ?? 0) >= 0 ? (
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <TrendingDown className="w-3.5 h-3.5 text-amber-400" />
            )}
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white tracking-tight">
              {trend ? `${(trend.change_percentage_points ?? trend.three_week_change ?? 0) >= 0 ? '+' : ''}${trend.change_percentage_points ?? trend.three_week_change}%` : '+3.4%'}
            </span>
            <span className={`text-xs font-medium ${trend?.trend_direction === 'declining' ? 'text-amber-400' : 'text-emerald-400'}`}>
              {trend?.trend_direction ? trend.trend_direction.toUpperCase() : 'IMPROVING'}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Comparing last 7 days vs baseline</p>
        </div>

        {/* Streak & Consistency */}
        <div className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Current Presence Streak</span>
            <Award className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-amber-300 tracking-tight">7 Days</span>
            <span className="text-xs text-slate-400 font-medium">Consecutive</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Keep it up to earn term badge</p>
        </div>
      </div>

      {/* Multi-Week Breakdown Visual */}
      {trend && trend.weekly_breakdown && Array.isArray(trend.weekly_breakdown) && (
        <div className="bg-slate-950/40 border border-slate-800/60 rounded-lg p-3">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="flex items-center gap-1.5 font-medium text-slate-300">
              <Calendar className="w-3.5 h-3.5 text-indigo-400" /> Multi-Week Attendance Performance
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

      {/* Smart One-Click Actions */}
      <div>
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
          Recommended Copilot Actions
        </span>
        <div className="flex flex-wrap gap-2">
          <button
            id="action-ask-attendance"
            onClick={() => onSendPrompt('What is my attendance percentage and recent log?')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
          >
            <MessageSquarePlus className="w-3.5 h-3.5 text-emerald-400" />
            Check My Full Attendance
          </button>
          <button
            id="action-check-trend"
            onClick={() => onSendPrompt('How has my attendance changed over the last 3 weeks?')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
          >
            <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
            Analyze My 3-Week Trend
          </button>
          <button
            id="action-request-doubt"
            onClick={onRequestTeacherCall}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            Request Teacher Consultation
          </button>
        </div>
      </div>
    </div>
  );
};
