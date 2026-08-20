import React, { useState, useEffect } from 'react';
import {
  Database,
  Users,
  GraduationCap,
  Calendar,
  PhoneCall,
  BarChart3,
  RotateCcw,
  X,
  Search
} from 'lucide-react';

interface ErpDatabaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ErpDatabaseModal: React.FC<ErpDatabaseModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'students' | 'attendance' | 'callRequests' | 'analytics' | 'teachers'>('students');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [resetMessage, setResetMessage] = useState('');

  const fetchErpData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/erp/data');
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error('Failed to load ERP data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleResetDatabase = async () => {
    try {
      const res = await fetch('/api/erp/reset', { method: 'POST' });
      const json = await res.json();
      setResetMessage(json.message || 'Reset complete');
      fetchErpData();
      setTimeout(() => setResetMessage(''), 3000);
    } catch (err) {
      console.error('Failed to reset database:', err);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchErpData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                School ERP Database Ledger
              </h2>
              <p className="text-xs text-slate-500">
                Live transactional store for Students, Attendance, Faculty, and Call Requests
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleResetDatabase}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 transition"
              title="Reset all database tables to initial seed data"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Seed</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {resetMessage && (
          <div className="bg-emerald-50 text-emerald-800 px-6 py-2 text-xs font-medium border-b border-emerald-100 flex items-center justify-between">
            <span>✓ {resetMessage}</span>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 px-6 bg-white overflow-x-auto">
          <button
            onClick={() => setActiveTab('students')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition flex items-center space-x-1.5 ${
              activeTab === 'students'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Students ({data?.students?.length || 0})</span>
          </button>
          <button
            onClick={() => setActiveTab('attendance')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition flex items-center space-x-1.5 ${
              activeTab === 'attendance'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Attendance Log ({data?.recentAttendance?.length || 0})</span>
          </button>
          <button
            onClick={() => setActiveTab('teachers')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition flex items-center space-x-1.5 ${
              activeTab === 'teachers'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Faculty & Parents</span>
          </button>
          <button
            onClick={() => setActiveTab('callRequests')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition flex items-center space-x-1.5 ${
              activeTab === 'callRequests'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call Requests ({data?.callRequests?.length || 0})</span>
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition flex items-center space-x-1.5 ${
              activeTab === 'analytics'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>School Analytics</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-50/50">
          {loading ? (
            <div className="py-12 text-center text-slate-400 text-sm">Loading school database records...</div>
          ) : (
            <>
              {/* Search Bar for Students/Attendance */}
              {(activeTab === 'students' || activeTab === 'attendance') && (
                <div className="mb-4 relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search by student name, ID, or class..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              )}

              {/* Students Tab */}
              {activeTab === 'students' && (
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 text-slate-600 uppercase font-semibold text-[10px] border-b border-slate-200">
                      <tr>
                        <th className="py-3 px-4">Student ID</th>
                        <th className="py-3 px-4">Student Name</th>
                        <th className="py-3 px-4">Class</th>
                        <th className="py-3 px-4">Roll</th>
                        <th className="py-3 px-4">Parent ID</th>
                        <th className="py-3 px-4 text-right">Attendance %</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {data?.students
                        ?.filter(
                          (s: any) =>
                            s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            s.student_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            s.class_name.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map((s: any) => (
                          <tr key={s.student_id} className="hover:bg-slate-50">
                            <td className="py-2.5 px-4 font-mono font-medium text-slate-700">
                              {s.student_id}
                            </td>
                            <td className="py-2.5 px-4 font-semibold text-slate-900">
                              {s.name}
                            </td>
                            <td className="py-2.5 px-4 text-slate-600">{s.class_name}</td>
                            <td className="py-2.5 px-4 text-slate-600">#{s.roll_number || 'N/A'}</td>
                            <td className="py-2.5 px-4 font-mono text-slate-500">{s.parent_id}</td>
                            <td className="py-2.5 px-4 text-right">
                              <span
                                className={`font-bold px-2 py-0.5 rounded-full text-[11px] ${
                                  s.attendance_percentage >= 90
                                    ? 'bg-emerald-50 text-emerald-700'
                                    : s.attendance_percentage >= 80
                                    ? 'bg-amber-50 text-amber-700'
                                    : 'bg-rose-50 text-rose-700'
                                }`}
                              >
                                {s.attendance_percentage}%
                              </span>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Attendance Records Tab */}
              {activeTab === 'attendance' && (
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 text-slate-600 uppercase font-semibold text-[10px] border-b border-slate-200">
                      <tr>
                        <th className="py-3 px-4">Record ID</th>
                        <th className="py-3 px-4">Student</th>
                        <th className="py-3 px-4">Class</th>
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4">Marked By</th>
                        <th className="py-3 px-4">Remarks</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {data?.recentAttendance
                        ?.filter(
                          (r: any) =>
                            r.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            r.date.includes(searchTerm) ||
                            r.class_name.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map((r: any) => (
                          <tr key={r.attendance_id} className="hover:bg-slate-50">
                            <td className="py-2.5 px-4 font-mono text-slate-500">{r.attendance_id}</td>
                            <td className="py-2.5 px-4 font-semibold text-slate-900">
                              {r.student_name}
                            </td>
                            <td className="py-2.5 px-4 text-slate-600">{r.class_name}</td>
                            <td className="py-2.5 px-4 font-mono text-slate-600">{r.date}</td>
                            <td className="py-2.5 px-4">
                              <span
                                className={`px-2 py-0.5 rounded-md font-semibold text-[10px] uppercase ${
                                  r.status === 'present'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : r.status === 'absent'
                                    ? 'bg-rose-100 text-rose-800'
                                    : 'bg-amber-100 text-amber-800'
                                }`}
                              >
                                {r.status}
                              </span>
                            </td>
                            <td className="py-2.5 px-4 text-slate-600">{r.marked_by}</td>
                            <td className="py-2.5 px-4 text-slate-500 truncate max-w-xs">
                              {r.remarks || '—'}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Faculty & Parents Tab */}
              {activeTab === 'teachers' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Teachers */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200">
                    <h3 className="font-bold text-sm text-slate-900 mb-3 flex items-center space-x-2">
                      <Users className="w-4 h-4 text-indigo-600" />
                      <span>Faculty & Class Teachers</span>
                    </h3>
                    <div className="space-y-3">
                      {data?.teachers?.map((t: any) => (
                        <div key={t.teacher_id} className="p-3 bg-slate-50 rounded-lg border border-slate-200/80 text-xs">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-bold text-slate-900">{t.name}</div>
                              <div className="text-slate-500 font-mono text-[11px]">{t.teacher_id} • {t.email}</div>
                            </div>
                            <span className="bg-indigo-50 text-indigo-700 font-semibold px-2 py-0.5 rounded-sm">
                              {t.class_name}
                            </span>
                          </div>
                          <div className="mt-2 text-[11px] text-slate-600">
                            Subjects: {t.subjects?.join(', ')}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Parents */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200">
                    <h3 className="font-bold text-sm text-slate-900 mb-3 flex items-center space-x-2">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span>Registered Parents</span>
                    </h3>
                    <div className="space-y-3">
                      {data?.parents?.map((p: any) => (
                        <div key={p.parent_id} className="p-3 bg-slate-50 rounded-lg border border-slate-200/80 text-xs">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-bold text-slate-900">{p.name}</div>
                              <div className="text-slate-500 font-mono text-[11px]">{p.parent_id} • {p.phone}</div>
                            </div>
                          </div>
                          <div className="mt-2 text-[11px] text-slate-600 flex items-center space-x-1">
                            <span>Children IDs:</span>
                            <span className="font-mono text-slate-800 font-medium">[{p.children_ids?.join(', ')}]</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Call Requests Tab */}
              {activeTab === 'callRequests' && (
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 text-slate-600 uppercase font-semibold text-[10px] border-b border-slate-200">
                      <tr>
                        <th className="py-3 px-4">Ticket ID</th>
                        <th className="py-3 px-4">Requester</th>
                        <th className="py-3 px-4">Role</th>
                        <th className="py-3 px-4">Target Type</th>
                        <th className="py-3 px-4">Student</th>
                        <th className="py-3 px-4">Reason</th>
                        <th className="py-3 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {data?.callRequests?.map((c: any) => (
                        <tr key={c.request_id} className="hover:bg-slate-50">
                          <td className="py-2.5 px-4 font-mono font-medium text-indigo-600">
                            {c.request_id}
                          </td>
                          <td className="py-2.5 px-4 font-semibold text-slate-900">
                            {c.requester_name}
                          </td>
                          <td className="py-2.5 px-4 uppercase text-[10px] text-slate-600 font-medium">
                            {c.requester_role}
                          </td>
                          <td className="py-2.5 px-4 capitalize text-slate-700">
                            {c.target_type}
                          </td>
                          <td className="py-2.5 px-4 text-slate-700">{c.student_name || '—'}</td>
                          <td className="py-2.5 px-4 text-slate-600 max-w-sm">{c.reason}</td>
                          <td className="py-2.5 px-4">
                            <span className="px-2 py-0.5 rounded-full text-[10px] uppercase font-bold bg-amber-50 text-amber-700 border border-amber-200">
                              {c.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* School Analytics Tab */}
              {activeTab === 'analytics' && data?.analytics && (
                <div className="space-y-4">
                  {/* Summary Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-xl border border-slate-200">
                      <div className="text-slate-500 text-xs font-medium">Overall Attendance</div>
                      <div className="text-2xl font-black text-slate-900 mt-1">
                        {data.analytics.overall_attendance_percentage}%
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-200">
                      <div className="text-slate-500 text-xs font-medium">Total Enrolled Students</div>
                      <div className="text-2xl font-black text-slate-900 mt-1">
                        {data.analytics.total_students}
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-200">
                      <div className="text-slate-500 text-xs font-medium">Faculty Members</div>
                      <div className="text-2xl font-black text-slate-900 mt-1">
                        {data.analytics.total_teachers}
                      </div>
                    </div>
                  </div>

                  {/* Class Breakdown */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200">
                    <h4 className="font-bold text-xs uppercase text-slate-600 mb-3">Classroom Distribution</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                      {data.analytics.class_breakdown?.map((cb: any) => (
                        <div key={cb.class_name} className="p-3 bg-slate-50 rounded-lg border border-slate-200/80">
                          <div className="font-bold text-slate-900 text-sm">{cb.class_name}</div>
                          <div className="text-xs text-indigo-600 font-bold mt-1">
                            {cb.attendance_percentage}% avg
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            {cb.total_students} students
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
