import React, { useState, useEffect } from 'react';
import { 
  Users, 
  PhoneCall, 
  Calendar, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Sparkles, 
  MessageSquare,
  ChevronRight,
  Send,
  Bell,
  CreditCard
} from 'lucide-react';
import { AuthUser } from '../../../types';

interface ParentPortalProps {
  currentUser: AuthUser | null;
  onAskAi: (prompt: string) => void;
  onOpenAiAssistant: () => void;
}

export function ParentPortal({ currentUser, onAskAi, onOpenAiAssistant }: ParentPortalProps) {
  const [erpData, setErpData] = useState<any>(null);
  const [selectedStudentId, setSelectedStudentId] = useState<string>('STU-101');
  const [showCallModal, setShowCallModal] = useState(false);
  const [callReason, setCallReason] = useState('');
  const [callSuccess, setCallSuccess] = useState(false);

  useEffect(() => {
    fetch('/api/erp/data')
      .then((res) => res.json())
      .then((data) => {
        setErpData(data);
      })
      .catch((err) => {
        console.error('Failed to load ERP data:', err);
      });
  }, []);

  // Parent's linked children (default Priya Sharma linked to STU-101 Rahul Sharma and STU-103 Ananya Sharma)
  const defaultChildren = [
    { student_id: 'STU-101', name: 'Rahul Sharma', class_name: 'Class 10-A', attendance_percentage: 88.5, roll_number: 101 },
    { student_id: 'STU-103', name: 'Ananya Sharma', class_name: 'Class 8-B', attendance_percentage: 94.2, roll_number: 103 }
  ];

  const filteredChildren = erpData?.students?.filter(
    (s: any) => s.parent_id === 'PAR-501' || s.student_id === 'STU-101' || s.student_id === 'STU-103'
  );

  const children = (filteredChildren && filteredChildren.length > 0) ? filteredChildren : defaultChildren;

  const currentChild = children.find((c: any) => c?.student_id === selectedStudentId) || children[0] || defaultChildren[0];

  const childRecords = erpData?.attendanceRecords?.filter(
    (rec: any) => rec.student_id === currentChild?.student_id
  ) || [];

  const percentage = currentChild?.attendance_percentage ?? 88.5;
  const isHealthy = percentage >= 75;

  const childName = currentChild?.name || 'Child';

  const handleScheduleCall = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!callReason.trim()) return;

    onAskAi(`Schedule a call with ${childName}'s class teacher regarding: ${callReason}`);
    setCallSuccess(true);
    setTimeout(() => {
      setShowCallModal(false);
      setCallSuccess(false);
      setCallReason('');
    }, 2000);
  };

  const quickPrompts = [
    `Why was ${childName} marked absent on recent dates?`,
    `Schedule a phone call with ${childName}'s class teacher`,
    `What is ${childName}'s overall attendance percentage?`,
    `Send leave application for ${childName} for tomorrow`
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner / Parent Hub */}
      <div className="bg-gradient-to-r from-teal-700 via-emerald-700 to-emerald-800 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur border border-white/20 flex items-center justify-center text-white shadow-inner">
              <Users className="w-9 h-9" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="bg-teal-500/40 text-teal-100 text-xs px-2.5 py-0.5 rounded-full font-semibold uppercase tracking-wider border border-teal-300/30">
                  02. Parent Repository / parent-portal
                </span>
                <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full font-medium">
                  Family Portal
                </span>
              </div>
              <h1 className="text-2xl font-bold mt-1 text-white tracking-tight">{currentUser?.name || 'Mrs. Priya Sharma'}</h1>
              <p className="text-teal-100 text-sm flex items-center gap-3 mt-0.5">
                <span>Parent ID: {currentUser?.userId || 'PAR-501'}</span>
                <span>•</span>
                <span>Active Wards: {children.length}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowCallModal(true)}
              className="bg-white/15 hover:bg-white/25 text-white border border-white/30 px-4 py-2.5 rounded-xl font-semibold text-sm transition flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              Request Teacher Call
            </button>
            <button
              onClick={onOpenAiAssistant}
              className="bg-white text-emerald-800 hover:bg-emerald-50 px-4 py-2.5 rounded-xl font-semibold text-sm shadow-md transition flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-emerald-600" />
              Ask Pathshala AI
            </button>
          </div>
        </div>
      </div>

      {/* Ward Selector Tabs */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-1">
            Select Student / Ward
          </span>
          <div className="flex flex-wrap gap-2">
            {children.map((child: any) => {
              const isSelected = child.student_id === currentChild?.student_id;
              return (
                <button
                  key={child.student_id}
                  onClick={() => setSelectedStudentId(child.student_id)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition flex items-center gap-2 border ${
                    isSelected
                      ? 'bg-teal-600 text-white border-teal-700 shadow-sm'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  <span>{child.name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    isSelected ? 'bg-teal-800/60 text-teal-100' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {child.class_name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
          <Bell className="w-4 h-4 text-amber-500 shrink-0" />
          <span>Real-time SMS and AI WhatsApp notifications active for linked mobile (+91 98765-43210).</span>
        </div>
      </div>

      {/* Selected Child Attendance Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Attendance Rate</span>
            <div className={`p-2 rounded-lg ${isHealthy ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className={`text-3xl font-extrabold ${isHealthy ? 'text-emerald-600' : 'text-amber-600'}`}>
              {percentage}%
            </span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isHealthy ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
              {isHealthy ? 'Good Attendance' : 'Action Required'}
            </span>
          </div>
          <div className="mt-3 w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full ${isHealthy ? 'bg-emerald-500' : 'bg-amber-500'}`} 
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Working Days</span>
            <div className="p-2 rounded-lg bg-teal-100 text-teal-700">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold text-slate-900">{childRecords.length || 30}</span>
            <span className="text-xs text-slate-500 ml-2">Total Session Days</span>
          </div>
          <p className="mt-3 text-xs text-slate-500">
            Attended: {childRecords.filter((r: any) => r.status === 'present').length || 26} days
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Days Absent</span>
            <div className="p-2 rounded-lg bg-rose-100 text-rose-700">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold text-rose-600">
              {childRecords.filter((r: any) => r.status === 'absent').length || 3}
            </span>
            <span className="text-xs text-slate-500 ml-2">Days Missed</span>
          </div>
          <p className="mt-3 text-xs text-slate-500">
            Late: {childRecords.filter((r: any) => r.status === 'late').length || 1} day
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Fee Status</span>
            <div className="p-2 rounded-lg bg-indigo-100 text-indigo-700">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold text-emerald-600 flex items-center gap-1.5">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
              Paid (Q1/Q2)
            </span>
          </div>
          <p className="mt-3 text-xs text-slate-500">
            Next due: Oct 15, 2026
          </p>
        </div>
      </div>

      {/* Attendance Log for Selected Ward */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-slate-900 text-base">{childName}&apos;s Daily Attendance Record</h3>
            <p className="text-xs text-slate-500">Class: {currentChild?.class_name || 'Class 10-A'} • Roll: {currentChild?.roll_number || '101'}</p>
          </div>
          <button 
            onClick={() => onAskAi(`Generate an attendance summary for ${childName}`)}
            className="text-xs bg-teal-50 text-teal-700 hover:bg-teal-100 font-semibold px-3 py-1.5 rounded-lg border border-teal-200 transition"
          >
            Export Attendance Report
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
              <tr>
                <th className="py-2.5 px-3 rounded-l-lg">Date</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Marked By</th>
                <th className="py-2.5 px-3 rounded-r-lg">Teacher Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {childRecords.slice(0, 6).map((rec: any, idx: number) => (
                <tr key={idx} className="hover:bg-slate-50/60 transition">
                  <td className="py-2.5 px-3 font-medium text-slate-800">{rec.date}</td>
                  <td className="py-2.5 px-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold capitalize ${
                      rec.status === 'present'
                        ? 'bg-emerald-100 text-emerald-800'
                        : rec.status === 'absent'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {rec.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-xs text-slate-500">{rec.marked_by}</td>
                  <td className="py-2.5 px-3 text-xs text-slate-500">{rec.remarks || 'Regular class attendance'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Parent AI Quick Actions Box */}
      <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-slate-50 border border-teal-100 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-teal-600" />
            <h3 className="font-bold text-slate-900 text-sm">Ask Pathshala AI (Parent Assistant Prompts)</h3>
          </div>
          <span className="text-xs text-teal-600 font-medium">02. Parent Repository / parent-portal</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => onAskAi(prompt)}
              className="text-left text-xs bg-white hover:bg-teal-50/80 border border-slate-200 hover:border-teal-300 p-3 rounded-xl transition flex items-center justify-between group shadow-2xs"
            >
              <span className="text-slate-700 group-hover:text-teal-900 font-medium">{prompt}</span>
              <MessageSquare className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-600 shrink-0 ml-2" />
            </button>
          ))}
        </div>
      </div>

      {/* Schedule Call Modal */}
      {showCallModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <PhoneCall className="w-5 h-5 text-teal-600" />
              Request Teacher Call / Meeting
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Connect with Mrs. Sunita Rao (Class Teacher of {childName}, {currentChild?.class_name || 'Class 10-A'}).
            </p>

            {callSuccess ? (
              <div className="mt-4 p-4 bg-emerald-50 text-emerald-800 rounded-xl text-center text-sm font-semibold flex flex-col items-center gap-2">
                <CheckCircle className="w-8 h-8 text-emerald-600" />
                Call request submitted to Pathshala AI & Teacher Queue!
              </div>
            ) : (
              <form onSubmit={handleScheduleCall} className="mt-4 space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Reason for discussion
                  </label>
                  <textarea
                    value={callReason}
                    onChange={(e) => setCallReason(e.target.value)}
                    rows={3}
                    placeholder="E.g., Discuss recent absences, upcoming science project, or academic performance..."
                    className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowCallModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-teal-600 hover:bg-teal-700 text-white shadow-sm flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Submit Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
