import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  TrendingUp, 
  Users, 
  AlertOctagon, 
  CheckCircle, 
  Sparkles, 
  MessageSquare,
  BarChart3,
  Search,
  ArrowUpRight,
  ShieldAlert,
  ChevronRight,
  School
} from 'lucide-react';
import { AuthUser } from '../../../types';

interface ManagementPortalProps {
  currentUser: AuthUser | null;
  onAskAi: (prompt: string) => void;
  onOpenAiAssistant: () => void;
}

export function ManagementPortal({ currentUser, onAskAi, onOpenAiAssistant }: ManagementPortalProps) {
  const [erpData, setErpData] = useState<any>(null);
  const [searchFilter, setSearchFilter] = useState('');

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

  const allStudents = erpData?.students || [];
  const allTeachers = erpData?.teachers || [];
  const totalStudents = allStudents.length;
  
  const avgAttendance = totalStudents > 0
    ? Number((allStudents.reduce((acc: number, s: any) => acc + (s.attendance_percentage || 0), 0) / totalStudents).toFixed(1))
    : 84.6;

  const criticalStudents = allStudents.filter((s: any) => (s.attendance_percentage || 0) < 75);

  const classes = [
    { name: 'Class 10-A', students: 28, attendance: 88.5, teacher: 'Mrs. Sunita Rao' },
    { name: 'Class 10-B', students: 26, attendance: 71.2, teacher: 'Mr. Arvind Saxena', alert: true },
    { name: 'Class 9-A', students: 30, attendance: 92.4, teacher: 'Ms. Clara D\'Souza' },
    { name: 'Class 8-B', students: 25, attendance: 94.2, teacher: 'Mr. David Miller' }
  ];

  const quickPrompts = [
    'List all students across the school with attendance below 75%',
    'Which class has the lowest average attendance and why?',
    'Generate executive attendance report for school board',
    'Show pending parent call requests and escalation tickets'
  ];

  const filteredCritical = criticalStudents.filter((s: any) =>
    (s?.name || '').toLowerCase().includes(searchFilter.toLowerCase()) ||
    (s?.class_name || '').toLowerCase().includes(searchFilter.toLowerCase()) ||
    (s?.student_id || '').toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner / Management Executive Badge */}
      <div className="bg-gradient-to-r from-purple-800 via-violet-800 to-indigo-900 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur border border-white/20 flex items-center justify-center text-white shadow-inner">
              <Building2 className="w-9 h-9" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="bg-purple-500/40 text-purple-100 text-xs px-2.5 py-0.5 rounded-full font-semibold uppercase tracking-wider border border-purple-300/30">
                  03. Management Repository / management-portal
                </span>
                <span className="bg-amber-400/30 text-amber-200 text-xs px-2 py-0.5 rounded-full font-medium border border-amber-300/30">
                  Principal Executive Authority
                </span>
              </div>
              <h1 className="text-2xl font-bold mt-1 text-white tracking-tight">
                {currentUser?.name || 'Dr. Rajesh Verma (Principal)'}
              </h1>
              <p className="text-purple-100 text-sm flex items-center gap-3 mt-0.5">
                <span>Greenwood International School</span>
                <span>•</span>
                <span>Role: Management / Leadership</span>
                <span>•</span>
                <span>ERP Academic Year: 2026–2027</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onAskAi('Provide high-level attendance summary across all grades and classes')}
              className="bg-white/15 hover:bg-white/25 text-white border border-white/30 px-4 py-2.5 rounded-xl font-semibold text-sm transition flex items-center gap-2"
            >
              <BarChart3 className="w-4 h-4" />
              Generate Audit Report
            </button>
            <button
              onClick={onOpenAiAssistant}
              className="bg-white text-purple-900 hover:bg-purple-50 px-4 py-2.5 rounded-xl font-semibold text-sm shadow-md transition flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-purple-700" />
              Ask Pathshala AI
            </button>
          </div>
        </div>
      </div>

      {/* High-Level Executive Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Enrolled</span>
            <div className="p-2 rounded-lg bg-purple-100 text-purple-700">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline">
            <span className="text-3xl font-extrabold text-slate-900">{totalStudents || 120}</span>
            <span className="text-xs text-slate-500 ml-2">Students across 4 Divisions</span>
          </div>
          <p className="mt-3 text-xs text-slate-500 flex items-center gap-1">
            <School className="w-3.5 h-3.5 text-purple-600" />
            <span>Academic Capacity: 96%</span>
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">School Attendance Avg</span>
            <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-emerald-600">{avgAttendance}%</span>
            <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
              +1.4% MoM
            </span>
          </div>
          <div className="mt-3 w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${avgAttendance}%` }} />
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Critical At-Risk</span>
            <div className="p-2 rounded-lg bg-rose-100 text-rose-700">
              <AlertOctagon className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline">
            <span className="text-3xl font-extrabold text-rose-600">{criticalStudents.length || 1}</span>
            <span className="text-xs text-rose-600 font-semibold ml-2">&lt; 75% Attendance</span>
          </div>
          <p className="mt-3 text-xs text-slate-500">
            Immediate parent intervention required
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Teaching Staff</span>
            <div className="p-2 rounded-lg bg-blue-100 text-blue-700">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline">
            <span className="text-3xl font-extrabold text-slate-900">{allTeachers.length || 4}</span>
            <span className="text-xs text-slate-500 ml-2">Faculty Members</span>
          </div>
          <p className="mt-3 text-xs text-slate-500">
            100% Daily attendance logs submitted
          </p>
        </div>
      </div>

      {/* Class Comparison & Critical At-Risk Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Class-by-Class Attendance Distribution */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-purple-600" />
              <h3 className="font-bold text-slate-900 text-base">Class-by-Class Overview</h3>
            </div>
            <span className="text-xs text-slate-500">Term 1</span>
          </div>

          <div className="space-y-4">
            {classes.map((cls, idx) => {
              const isAlert = cls.attendance < 75;
              return (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center justify-between mb-1.5">
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">{cls.name}</h4>
                      <p className="text-xs text-slate-500">Teacher: {cls.teacher}</p>
                    </div>
                    <div className="text-right">
                      <span className={`text-sm font-bold ${isAlert ? 'text-rose-600' : 'text-slate-900'}`}>
                        {cls.attendance}%
                      </span>
                      <span className="block text-[11px] text-slate-400">{cls.students} students</span>
                    </div>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${isAlert ? 'bg-rose-500' : 'bg-purple-600'}`}
                      style={{ width: `${cls.attendance}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Critical Attendance Interventions Table */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div className="flex items-center space-x-2">
              <ShieldAlert className="w-5 h-5 text-rose-600" />
              <h3 className="font-bold text-slate-900 text-base">Students Requiring Intervention (&lt; 75%)</h3>
            </div>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Search student..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-purple-500 w-44"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
                <tr>
                  <th className="py-2.5 px-3 rounded-l-lg">Student</th>
                  <th className="py-2.5 px-3">Class</th>
                  <th className="py-2.5 px-3">Attendance</th>
                  <th className="py-2.5 px-3">Parent Link</th>
                  <th className="py-2.5 px-3 rounded-r-lg text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {(filteredCritical.length > 0 ? filteredCritical : criticalStudents).map((stu: any, idx: number) => (
                  <tr key={idx} className="hover:bg-rose-50/40 transition">
                    <td className="py-3 px-3 font-semibold text-slate-800">
                      <div>{stu.name}</div>
                      <div className="text-[11px] font-normal text-slate-400">ID: {stu.student_id}</div>
                    </td>
                    <td className="py-3 px-3 text-xs">{stu.class_name}</td>
                    <td className="py-3 px-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-rose-100 text-rose-800 border border-rose-200">
                        {stu.attendance_percentage}%
                      </span>
                    </td>
                    <td className="py-3 px-3 text-xs text-slate-500">ID: {stu.parent_id}</td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => onAskAi(`Why is ${stu.name} (${stu.student_id}) below 75% attendance?`)}
                        className="text-xs bg-purple-50 hover:bg-purple-100 text-purple-700 font-semibold px-2.5 py-1 rounded-lg border border-purple-200 transition"
                      >
                        Investigate
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Management AI Quick Actions Box */}
      <div className="bg-gradient-to-r from-purple-50 via-violet-50 to-slate-50 border border-purple-100 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <h3 className="font-bold text-slate-900 text-sm">Ask Pathshala AI (Management & Principal Prompts)</h3>
          </div>
          <span className="text-xs text-purple-600 font-medium">03. Management Repository / management-portal</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => onAskAi(prompt)}
              className="text-left text-xs bg-white hover:bg-purple-50/80 border border-slate-200 hover:border-purple-300 p-3 rounded-xl transition flex items-center justify-between group shadow-2xs"
            >
              <span className="text-slate-700 group-hover:text-purple-900 font-medium">{prompt}</span>
              <MessageSquare className="w-3.5 h-3.5 text-slate-400 group-hover:text-purple-600 shrink-0 ml-2" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
