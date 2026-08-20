import React, { useState, useEffect } from 'react';
import { 
  UserCheck, 
  Check, 
  X, 
  Clock, 
  Sparkles, 
  MessageSquare,
  Search,
  Users,
  CheckCircle2,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { AuthUser } from '../../../types';

interface StaffPortalProps {
  currentUser: AuthUser | null;
  onAskAi: (prompt: string) => void;
  onOpenAiAssistant: () => void;
}

export function StaffPortal({ currentUser, onAskAi, onOpenAiAssistant }: StaffPortalProps) {
  const [erpData, setErpData] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [markingStatus, setMarkingStatus] = useState<Record<string, string>>({});
  const [todayDate] = useState(new Date().toISOString().split('T')[0]);
  const [saveFeedback, setSaveFeedback] = useState<string | null>(null);

  const fetchErp = () => {
    fetch('/api/erp/data')
      .then((res) => res.json())
      .then((data) => {
        setErpData(data);
      })
      .catch((err) => {
        console.error('Failed to load ERP data:', err);
      });
  };

  useEffect(() => {
    fetchErp();
  }, []);

  // Filter students for Teacher's assigned class (Class 10-A)
  const classStudents = erpData?.students?.filter(
    (s: any) => s.class_name === 'Class 10-A'
  ) || erpData?.students?.slice(0, 10) || [];

  const handleMarkStudent = async (studentId: string, studentName: string, status: 'present' | 'absent' | 'late') => {
    setMarkingStatus((prev) => ({ ...prev, [studentId]: status }));
    
    // Execute AI voice / tool command for attendance marking
    onAskAi(`Mark ${studentName} (${studentId}) as ${status} for today (${todayDate})`);

    setSaveFeedback(`Marked ${studentName} as ${status.toUpperCase()}`);
    setTimeout(() => setSaveFeedback(null), 3000);
  };

  const handleMarkAllPresent = () => {
    onAskAi(`Mark all students in Class 10-A present for today (${todayDate})`);
    const newStatuses: Record<string, string> = {};
    classStudents.forEach((s: any) => {
      newStatuses[s.student_id] = 'present';
    });
    setMarkingStatus(newStatuses);
    setSaveFeedback('Marked all students in Class 10-A as PRESENT for today');
    setTimeout(() => setSaveFeedback(null), 3000);
  };

  const filteredStudents = classStudents.filter((s: any) =>
    (s?.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (s?.student_id || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    String(s?.roll_number || '').includes(searchQuery)
  );

  const quickPrompts = [
    `Mark Rahul Sharma (Roll 101) as present for today (${todayDate})`,
    'Show attendance summary and absent list for Class 10-A',
    'Who in Class 10-A has attendance below 80%?',
    `Mark Priya absent and record remark "Medical leave requested by parent"`
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner / Teacher Control Center */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-cyan-900 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur border border-white/20 flex items-center justify-center text-white shadow-inner">
              <UserCheck className="w-9 h-9" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="bg-emerald-500/40 text-emerald-100 text-xs px-2.5 py-0.5 rounded-full font-semibold uppercase tracking-wider border border-emerald-300/30">
                  04. Staff Repository / staff-portal (Teacher)
                </span>
                <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full font-medium">
                  Class Teacher 10-A
                </span>
              </div>
              <h1 className="text-2xl font-bold mt-1 text-white tracking-tight">
                {currentUser?.name || 'Mrs. Sunita Rao'}
              </h1>
              <p className="text-emerald-100 text-sm flex items-center gap-3 mt-0.5">
                <span>Teacher ID: {currentUser?.userId || 'TEA-201'}</span>
                <span>•</span>
                <span>Department: Mathematics</span>
                <span>•</span>
                <span>Assigned Class: Class 10-A (28 Students)</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleMarkAllPresent}
              className="bg-white/15 hover:bg-white/25 text-white border border-white/30 px-4 py-2.5 rounded-xl font-semibold text-sm transition flex items-center gap-2 shadow-xs"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              Mark All Present
            </button>
            <button
              onClick={onOpenAiAssistant}
              className="bg-white text-emerald-900 hover:bg-emerald-50 px-4 py-2.5 rounded-xl font-semibold text-sm shadow-md transition flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-emerald-600" />
              Ask Pathshala AI
            </button>
          </div>
        </div>
      </div>

      {/* Action Notification Feedback */}
      {saveFeedback && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 px-4 py-3 rounded-xl text-sm font-medium flex items-center justify-between shadow-xs animate-fadeIn">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            {saveFeedback}
          </span>
          <span className="text-xs text-emerald-600">Saved to School ERP</span>
        </div>
      )}

      {/* Classroom Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Roster Size</span>
            <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline">
            <span className="text-3xl font-extrabold text-slate-900">{classStudents.length}</span>
            <span className="text-xs text-slate-500 ml-2">Enrolled in 10-A</span>
          </div>
          <p className="mt-3 text-xs text-slate-500">
            Assigned Room: Block B-204
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Class Average</span>
            <div className="p-2 rounded-lg bg-teal-100 text-teal-700">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-emerald-600">88.5%</span>
            <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
              Target: 85%+
            </span>
          </div>
          <div className="mt-3 w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: '88.5%' }} />
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Today&apos;s Session</span>
            <div className="p-2 rounded-lg bg-blue-100 text-blue-700">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline">
            <span className="text-xl font-bold text-slate-900">{todayDate}</span>
          </div>
          <p className="mt-3 text-xs text-emerald-600 font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Attendance register open</span>
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Call Inquiries</span>
            <div className="p-2 rounded-lg bg-amber-100 text-amber-700">
              <AlertCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline">
            <span className="text-3xl font-extrabold text-amber-600">2</span>
            <span className="text-xs text-slate-500 ml-2">Pending Parent Calls</span>
          </div>
          <p className="mt-3 text-xs text-slate-500">
            Pathshala AI queue synced
          </p>
        </div>
      </div>

      {/* Daily Class Attendance Roll Table */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Class 10-A Daily Roll Call & Attendance</h3>
            <p className="text-xs text-slate-500">Mark student status directly or use natural language via Pathshala AI</p>
          </div>
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Search by name or roll..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500 w-52"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
              <tr>
                <th className="py-2.5 px-3 rounded-l-lg">Roll #</th>
                <th className="py-2.5 px-3">Student Name</th>
                <th className="py-2.5 px-3">Overall %</th>
                <th className="py-2.5 px-3">Parent Link</th>
                <th className="py-2.5 px-3 rounded-r-lg text-right">Today&apos;s Status ({todayDate})</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredStudents.map((stu: any) => {
                const currentStatus = markingStatus[stu.student_id] || 'present';
                return (
                  <tr key={stu.student_id} className="hover:bg-slate-50/60 transition">
                    <td className="py-3 px-3 font-bold text-slate-900">#{stu.roll_number || '101'}</td>
                    <td className="py-3 px-3 font-semibold text-slate-800">
                      <div>{stu.name}</div>
                      <div className="text-[11px] font-normal text-slate-400">ID: {stu.student_id}</div>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${
                        (stu.attendance_percentage || 88) >= 75
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}>
                        {stu.attendance_percentage}%
                      </span>
                    </td>
                    <td className="py-3 px-3 text-xs text-slate-500">ID: {stu.parent_id}</td>
                    <td className="py-3 px-3 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => handleMarkStudent(stu.student_id, stu.name, 'present')}
                          className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition flex items-center gap-1 border ${
                            currentStatus === 'present'
                              ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                              : 'bg-slate-50 hover:bg-emerald-50 text-slate-700 border-slate-200'
                          }`}
                        >
                          <Check className="w-3 h-3" />
                          Present
                        </button>
                        <button
                          onClick={() => handleMarkStudent(stu.student_id, stu.name, 'absent')}
                          className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition flex items-center gap-1 border ${
                            currentStatus === 'absent'
                              ? 'bg-rose-600 text-white border-rose-700 shadow-xs'
                              : 'bg-slate-50 hover:bg-rose-50 text-slate-700 border-slate-200'
                          }`}
                        >
                          <X className="w-3 h-3" />
                          Absent
                        </button>
                        <button
                          onClick={() => handleMarkStudent(stu.student_id, stu.name, 'late')}
                          className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition flex items-center gap-1 border ${
                            currentStatus === 'late'
                              ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                              : 'bg-slate-50 hover:bg-amber-50 text-slate-700 border-slate-200'
                          }`}
                        >
                          <Clock className="w-3 h-3" />
                          Late
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Staff AI Quick Actions Box */}
      <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-slate-50 border border-emerald-100 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-slate-900 text-sm">Ask Pathshala AI (Staff & Teacher Prompts)</h3>
          </div>
          <span className="text-xs text-emerald-600 font-medium">04. Staff Repository / staff-portal</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => onAskAi(prompt)}
              className="text-left text-xs bg-white hover:bg-emerald-50/80 border border-slate-200 hover:border-emerald-300 p-3 rounded-xl transition flex items-center justify-between group shadow-2xs"
            >
              <span className="text-slate-700 group-hover:text-emerald-900 font-medium">{prompt}</span>
              <MessageSquare className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 shrink-0 ml-2" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
