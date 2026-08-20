import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Calendar, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  BookOpen, 
  Sparkles, 
  MessageSquare, 
  TrendingUp, 
  Award, 
  FileText,
  Flame,
  TrendingDown,
  CheckCircle2,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { AuthUser } from '../../../types';
import { getTranslations } from '../../../i18n/localization';
import { StudentProfileHeader } from '../../../components/ui/StudentProfileHeader';
import { HeroVoiceBanner } from '../../../components/ui/HeroVoiceBanner';
import { MetricCard } from '../../../components/ui/MetricCard';
import { AttendanceChart } from '../../../components/ui/AttendanceChart';
import { PathshalaAiInsights } from '../../../components/ui/PathshalaAiInsights';
import { EarlyWarningRadar } from '../../../components/ui/EarlyWarningRadar';
import { CopilotActionCards } from '../../../components/ui/CopilotActionCards';
import { GamificationBadges } from '../../../components/ui/GamificationBadges';
import { DashboardSkeleton } from '../../../components/ui/SkeletonLoader';
import { BlackboardCanvas } from '../../../components/classroom/BlackboardCanvas';
import { RuledNotebook } from '../../../components/classroom/RuledNotebook';
import { CampusNoticeBoard } from '../../../components/ui/CampusNoticeBoard';
import { SchoolTimetableCard } from '../../../components/ui/SchoolTimetableCard';
import { HomeworkWorksheetCard } from '../../../components/ui/HomeworkWorksheetCard';

interface StudentPortalProps {
  currentUser: AuthUser | null;
  availableUsers?: AuthUser[];
  onSwitchUser?: (userId: string) => void;
  onAskAi: (prompt: string) => void;
  onOpenAiAssistant: () => void;
  onOpenVoiceStage?: () => void;
  isDarkMode?: boolean;
  selectedLanguage?: string;
}

export function StudentPortal({ 
  currentUser, 
  availableUsers = [], 
  onSwitchUser = () => {}, 
  onAskAi, 
  onOpenAiAssistant,
  onOpenVoiceStage = () => {},
  isDarkMode = false,
  selectedLanguage = 'English'
}: StudentPortalProps) {
  const [erpData, setErpData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/erp/data')
      .then((res) => res.json())
      .then((data) => {
        setErpData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load ERP data:', err);
        setLoading(false);
      });
  }, []);

  const defaultStudent = {
    student_id: 'STU-101',
    name: currentUser?.name || 'Rahul Sharma',
    roll_number: 101,
    class_name: 'Class 10-A',
    attendance_percentage: 91.2,
    email: 'rahul.sharma@school.edu'
  };

  const t = getTranslations(selectedLanguage);

  const foundStudent = erpData?.students?.find(
    (s: any) => s?.student_id === currentUser?.associatedId || s?.student_id === currentUser?.userId || s?.student_id === 'STU-101'
  ) || erpData?.students?.[0];

  const currentStudent = foundStudent || defaultStudent;

  const studentRecords = erpData?.attendanceRecords?.filter(
    (rec: any) => rec?.student_id === currentStudent?.student_id
  ) || [];

  const percentage = currentStudent?.attendance_percentage ?? 91.2;
  const isHealthy = percentage >= 75;

  const subjects = [
    { name: 'Mathematics', teacher: 'Mrs. Sunita Rao', attendance: '92%', grade: 'A', status: 'Needs Quiz Prep' },
    { name: 'Physics & Chemistry', teacher: 'Mr. Arvind Saxena', attendance: '86%', grade: 'A-', status: '+12% Surge' },
    { name: 'English Literature', teacher: "Ms. Clara D'Souza", attendance: '94%', grade: 'A+', status: 'Exemplary' },
    { name: 'Computer Science', teacher: 'Mr. David Miller', attendance: '90%', grade: 'A', status: 'On Track' },
    { name: 'Social Studies', teacher: 'Mrs. Geeta Patel', attendance: '82%', grade: 'B+', status: 'Stable' }
  ];

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-6 px-4">
        <DashboardSkeleton isDarkMode={isDarkMode} />
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn max-w-7xl mx-auto pb-12">
      {/* 1. Student Identity Header */}
      <StudentProfileHeader
        currentUser={currentUser}
        availableUsers={availableUsers}
        onSwitchUser={onSwitchUser}
        isDarkMode={isDarkMode}
        selectedLanguage={selectedLanguage}
      />

      {/* 2. Hero Section: 2-Column Pitch & AI Voice Avatar Studio */}
      <HeroVoiceBanner
        userRole={currentUser?.role || 'student'}
        isDarkMode={isDarkMode}
        onOpenVoiceStage={onOpenVoiceStage}
        onOpenChat={onOpenAiAssistant}
        onSendVoiceQuery={onAskAi}
      />

      {/* 3. Official Campus Notice Board (Cork Board & Pinned Circulars) */}
      <CampusNoticeBoard
        isDarkMode={isDarkMode}
        onAskAi={onAskAi}
      />

      {/* 4. Daily Bell Schedule & Timetable (Periods & Room Locations) */}
      <SchoolTimetableCard
        isDarkMode={isDarkMode}
        onAskAi={onAskAi}
      />

      {/* 5. Interactive Pathshala Blackboard & Chalkboard Scribe Studio */}
      <BlackboardCanvas
        isDarkMode={isDarkMode}
        onAskAi={onAskAi}
      />

      {/* 6. Primary Dashboard: 3 Premium Academic KPI Cards */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className={`text-xs font-extrabold uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            {t.academicTelemetry}
          </h3>
          <span className="text-[11px] font-mono text-emerald-500 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {t.liveSync}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {/* KPI 1: Attendance */}
          <MetricCard
            id="metric-attendance"
            title={t.overallAttendance}
            value={`${percentage}%`}
            subtitle={t.sessions}
            type="progress"
            percentage={percentage}
            statusLabel={t.safeZone}
            statusVariant={isHealthy ? 'success' : 'warning'}
            explanation={t.safeZoneDesc}
            icon={CheckCircle2}
            isDarkMode={isDarkMode}
          />

          {/* KPI 2: 3-Week Trajectory */}
          <MetricCard
            id="metric-trajectory"
            title={t.trajectoryTitle}
            value="-20%"
            subtitle={t.recentShift}
            type="trend"
            changeValue="-20%"
            isPositive={false}
            statusLabel={t.decliningTrend}
            statusVariant="warning"
            explanation={t.trajectoryDesc}
            icon={TrendingDown}
            isDarkMode={isDarkMode}
          />

          {/* KPI 3: Presence Streak */}
          <MetricCard
            id="metric-streak"
            title={t.presenceStreak}
            value={`7 ${t.daysText}`}
            subtitle={t.consecutive}
            type="streak"
            streakDays={7}
            statusLabel={t.activeStreak}
            statusVariant="info"
            explanation={t.streakDesc}
            icon={Flame}
            isDarkMode={isDarkMode}
          />
        </div>
      </div>

      {/* 7. Homework & Assignment Worksheets Locker */}
      <HomeworkWorksheetCard
        isDarkMode={isDarkMode}
        onAskAi={onAskAi}
      />

      {/* 8. Smart Spiral Ruled Notebook with Animated Fountain Pen */}
      <RuledNotebook
        isDarkMode={isDarkMode}
        onAskAi={onAskAi}
      />

      {/* 6. Multi-Week Attendance Analytics Chart */}
      <AttendanceChart
        currentPercentage={percentage}
        changeValue="-20%"
        isDarkMode={isDarkMode}
        onAskAiRecommendation={() => onAskAi('How can I optimize my attendance to maintain 85% and avoid exam eligibility risk?')}
      />

      {/* 5. Dedicated Pathshala AI Insights Section */}
      <PathshalaAiInsights
        isDarkMode={isDarkMode}
        onExecuteAction={(prompt) => onAskAi(prompt)}
      />

      {/* 6. Early Warning Academic Radar */}
      <EarlyWarningRadar
        score={32}
        isDarkMode={isDarkMode}
        onMitigateRisk={() => onAskAi('Generate an automated risk mitigation plan to restore my attendance to 90%')}
        onRequestConsultation={() => onAskAi('I would like to request an academic consultation with my class teacher')}
      />

      {/* 7. Recommended Copilot Actions (6 Cards) */}
      <CopilotActionCards
        isDarkMode={isDarkMode}
        onSelectAction={(prompt) => onAskAi(prompt)}
      />

      {/* 8. Subtle Academic Gamification Badges */}
      <GamificationBadges
        streakDays={7}
        isDarkMode={isDarkMode}
      />

      {/* 9. Enrolled Subjects & Live Attendance Ledger */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Enrolled Courses */}
        <div className={`lg:col-span-6 rounded-2xl p-5 sm:p-6 border transition-all ${
          isDarkMode ? 'bg-slate-900/90 border-slate-800/80 text-slate-100' : 'bg-white border-slate-200/90 text-slate-900 shadow-xs'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2.5">
              <div className={`p-1.5 rounded-lg ${isDarkMode ? 'bg-indigo-500/20 text-indigo-400' : 'bg-indigo-50 text-indigo-600'}`}>
                <BookOpen className="w-4 h-4" />
              </div>
              <h3 className={`font-bold text-base tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Enrolled Courses & Grades
              </h3>
            </div>
            <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${
              isDarkMode ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-slate-100 text-slate-700 border-slate-200'
            }`}>
              Term 1
            </span>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {subjects.map((sub, idx) => (
              <div
                key={idx}
                className="py-3 px-2 rounded-xl flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/40 transition group cursor-pointer"
                onClick={() => onAskAi(`Analyze my performance and attendance in ${sub.name}`)}
              >
                <div>
                  <h4 className={`text-xs sm:text-sm font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                    {sub.name}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">{sub.teacher}</p>
                </div>

                <div className="flex items-center space-x-2 sm:space-x-3">
                  <span className={`text-xs font-bold font-mono px-2.5 py-1 rounded-lg border ${
                    isDarkMode ? 'bg-slate-800 text-indigo-300 border-slate-700' : 'bg-indigo-50 text-indigo-700 border-indigo-100'
                  }`}>
                    {sub.attendance}
                  </span>
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-md border ${
                    isDarkMode ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  }`}>
                    Grade {sub.grade}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Attendance Audit Records */}
        <div className={`lg:col-span-6 rounded-2xl p-5 sm:p-6 border transition-all ${
          isDarkMode ? 'bg-slate-900/90 border-slate-800/80 text-slate-100' : 'bg-white border-slate-200/90 text-slate-900 shadow-xs'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2.5">
              <div className={`p-1.5 rounded-lg ${isDarkMode ? 'bg-indigo-500/20 text-indigo-400' : 'bg-indigo-50 text-indigo-600'}`}>
                <Clock className="w-4 h-4" />
              </div>
              <h3 className={`font-bold text-base tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Recent Attendance Activity
              </h3>
            </div>
            <span className="text-[11px] font-mono text-slate-400">ERP Synced</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className={`uppercase font-bold text-[10px] tracking-wider ${
                isDarkMode ? 'bg-slate-950 text-slate-400' : 'bg-slate-50 text-slate-500'
              }`}>
                <tr>
                  <th className="py-2.5 px-3 rounded-l-lg">Date</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Marked By</th>
                  <th className="py-2.5 px-3 rounded-r-lg">Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {studentRecords.slice(0, 5).map((rec: any, idx: number) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition">
                    <td className={`py-2.5 px-3 font-semibold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                      {rec.date}
                    </td>
                    <td className="py-2.5 px-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold capitalize ${
                        rec.status === 'present'
                          ? isDarkMode ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-800'
                          : rec.status === 'absent'
                          ? isDarkMode ? 'bg-rose-500/20 text-rose-400' : 'bg-rose-100 text-rose-800'
                          : isDarkMode ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {rec.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-400">{rec.marked_by}</td>
                    <td className="py-2.5 px-3 text-slate-400 truncate max-w-[130px]">{rec.remarks || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
