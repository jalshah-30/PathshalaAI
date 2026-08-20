import React, { useEffect, useState } from 'react';
import { AuthUser, RiskAlert } from '../../types';
import { fetchAtRiskStudents, executeToolDirectly } from '../../services/api';
import {
  GraduationCap,
  AlertTriangle,
  CheckCircle2,
  PhoneCall,
  Sparkles,
  UserCheck,
  UserX,
  Clock,
  Send,
  Calendar
} from 'lucide-react';

interface TeacherCopilotProps {
  user: AuthUser;
  onSendPrompt: (prompt: string) => void;
  onRequestParentCall: (studentName: string) => void;
}

export const TeacherCopilot: React.FC<TeacherCopilotProps> = ({
  user,
  onSendPrompt,
  onRequestParentCall
}) => {
  const [atRiskAlerts, setAtRiskAlerts] = useState<RiskAlert[]>([]);
  const [loading, setLoading] = useState(true);

  // Fast Attendance Marking Form State
  const [markStudentId, setMarkStudentId] = useState('S001');
  const [markStatus, setMarkStatus] = useState<'present' | 'absent' | 'late' | 'excused'>('present');
  const [markRemarks, setMarkRemarks] = useState('');
  const [markSuccessMsg, setMarkSuccessMsg] = useState<string | null>(null);
  const [markingInProgress, setMarkingInProgress] = useState(false);

  useEffect(() => {
    let isMounted = true;
    fetchAtRiskStudents(user.assignedClass)
      .then((res) => {
        if (isMounted && res) {
          setAtRiskAlerts(res.alerts || []);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [user.assignedClass]);

  const handleMarkAttendance = async (e: React.FormEvent) => {
    e.preventDefault();
    setMarkingInProgress(true);
    setMarkSuccessMsg(null);

    try {
      const today = new Date().toISOString().split('T')[0];
      const res = await executeToolDirectly('mark_attendance', {
        teacher_id: user.associatedId,
        student_id: markStudentId,
        date: today,
        status: markStatus,
        remarks: markRemarks || `Marked by ${user.name}`
      });

      if (res.success) {
        setMarkSuccessMsg(`Marked ${res.data?.student_name || markStudentId} as ${markStatus.toUpperCase()} (${res.data?.updated_percentage}% new rate)`);
        setMarkRemarks('');
        // Refresh at-risk list
        fetchAtRiskStudents(user.assignedClass).then((r) => r && setAtRiskAlerts(r.alerts || []));
      } else {
        setMarkSuccessMsg(`Error: ${res.error || 'Failed to mark attendance'}`);
      }
    } catch (err: any) {
      setMarkSuccessMsg(`Error: ${err.message}`);
    } finally {
      setMarkingInProgress(false);
    }
  };

  const highRiskCount = atRiskAlerts.filter((a) => a.risk_level === 'HIGH').length;

  return (
    <div id="teacher-copilot-card" className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 text-slate-100 flex flex-col gap-4">
      {/* Header Banner */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <GraduationCap className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white tracking-wide">Faculty Classroom Copilot</h2>
            <p className="text-xs text-slate-400">Assigned: {user.assignedClass || 'Class 10-A'} | Early Intervention Feed</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {highRiskCount > 0 ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-300 border border-rose-500/30">
              <AlertTriangle className="w-3.5 h-3.5" /> {highRiskCount} High Risk Flagged
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-emerald-500/10 text-emerald-300">
              Class Attendance Stable
            </span>
          )}
        </div>
      </div>

      {/* Early Warning Alert Feed */}
      <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-3">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
          <span className="font-semibold text-slate-300 flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" /> AI Early Warning System ({user.assignedClass || 'Class 10-A'})
          </span>
          <button
            onClick={() => onSendPrompt('Who is at risk of falling below 75% attendance in my class?')}
            className="text-[11px] text-emerald-400 hover:text-emerald-300 font-medium"
          >
            Explain in Chat &rarr;
          </button>
        </div>

        {(!atRiskAlerts || atRiskAlerts.length === 0) ? (
          <div className="text-xs text-slate-500 py-2 text-center">No students currently flagged at risk.</div>
        ) : (
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {(atRiskAlerts || []).map((alert) => (
              <div
                key={alert.alert_id || alert.student_id}
                className={`p-2.5 rounded-lg border flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs ${
                  alert.risk_level === 'HIGH'
                    ? 'bg-rose-950/20 border-rose-900/50 text-rose-200'
                    : 'bg-amber-950/20 border-amber-900/50 text-amber-200'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white">{alert.student_name}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 font-mono text-slate-300">
                      {alert.student_id}
                    </span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                        alert.risk_level === 'HIGH'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {alert.risk_level} RISK ({alert.current_attendance_percentage ?? alert.current_attendance ?? 72}%)
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    {(alert.reasons && alert.reasons.length > 0) ? alert.reasons.join(' • ') : (alert.reason || 'Flagged by predictive attendance monitor')}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => onRequestParentCall(alert.student_name)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
                  >
                    <PhoneCall className="w-3 h-3 text-blue-400" /> Parent Call
                  </button>
                  <button
                    onClick={() => onSendPrompt(`Check attendance trend for ${alert.student_name}`)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-medium bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 transition"
                  >
                    <Sparkles className="w-3 h-3" /> Trend
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Interactive Quick Attendance Marking Bar */}
      <div className="bg-slate-950/40 border border-slate-800/80 rounded-lg p-3">
        <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">
          Fast Attendance Marking Terminal
        </span>
        <form onSubmit={handleMarkAttendance} className="grid grid-cols-1 sm:grid-cols-4 gap-2">
          <div>
            <label className="text-[11px] text-slate-400 block mb-1">Student</label>
            <select
              value={markStudentId}
              onChange={(e) => setMarkStudentId(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="S001">Aarav Patel (S001)</option>
              <option value="S002">Rahul Sharma (S002)</option>
              <option value="S003">Priya Mehta (S003)</option>
              <option value="S004">Karan Singh (S004 - Low)</option>
              <option value="S005">Rohan Verma (S005 - Low)</option>
              <option value="S006">Ananya Iyer (S006)</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] text-slate-400 block mb-1">Status</label>
            <select
              value={markStatus}
              onChange={(e) => setMarkStatus(e.target.value as any)}
              className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="present">Present</option>
              <option value="absent">Absent</option>
              <option value="late">Late</option>
              <option value="excused">Excused</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] text-slate-400 block mb-1">Remark (Optional)</label>
            <input
              type="text"
              placeholder="e.g. Verified by teacher"
              value={markRemarks}
              onChange={(e) => setMarkRemarks(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex items-end">
            <button
              id="btn-teacher-submit-mark"
              type="submit"
              disabled={markingInProgress}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs py-1.5 px-3 rounded flex items-center justify-center gap-1.5 transition disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              {markingInProgress ? 'Marking...' : 'Update Record'}
            </button>
          </div>
        </form>

        {markSuccessMsg && (
          <div className="mt-2 text-xs text-emerald-300 bg-emerald-950/40 border border-emerald-800/60 rounded px-2.5 py-1 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            {markSuccessMsg}
          </div>
        )}
      </div>

      {/* Quick Copilot Inquiries */}
      <div className="flex flex-wrap gap-2">
        <button
          id="action-teacher-class-summary"
          onClick={() => onSendPrompt('Show me class attendance summary for Class 10-A')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
        >
          <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
          Class 10-A Roster Summary
        </button>
        <button
          id="action-teacher-at-risk"
          onClick={() => onSendPrompt('Which students are flagged at risk in Class 10-A?')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
        >
          <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
          Early Warning Analysis
        </button>
      </div>
    </div>
  );
};
