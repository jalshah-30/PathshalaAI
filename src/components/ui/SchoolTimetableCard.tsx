import React, { useState } from 'react';
import { 
  Clock, 
  Bell, 
  MapPin, 
  User, 
  Sparkles, 
  BookOpen, 
  ChevronRight, 
  CalendarDays,
  Coffee,
  CheckCircle2
} from 'lucide-react';
import { SupportedLanguage } from '../../i18n/localization';
import { getPortalTranslations } from '../../i18n/portalTranslations';

interface SchoolTimetableCardProps {
  isDarkMode?: boolean;
  onAskAi?: (prompt: string) => void;
  selectedLanguage?: SupportedLanguage;
}

export const SchoolTimetableCard: React.FC<SchoolTimetableCardProps> = ({
  isDarkMode = false,
  onAskAi,
  selectedLanguage = 'en'
}) => {
  const t = getPortalTranslations(selectedLanguage).timetable;
  const [selectedDay, setSelectedDay] = useState<'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri'>('Wed');

  const days: { key: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri'; label: string }[] = [
    { key: 'Mon', label: t.days?.Mon || 'Mon' },
    { key: 'Tue', label: t.days?.Tue || 'Tue' },
    { key: 'Wed', label: t.days?.Wed || 'Wed' },
    { key: 'Thu', label: t.days?.Thu || 'Thu' },
    { key: 'Fri', label: t.days?.Fri || 'Fri' }
  ];

  const periods = t.periods || [
    {
      id: 'p1',
      periodNum: 1,
      time: '08:30 – 09:15 AM',
      subject: 'Mathematics',
      room: 'Room 204',
      teacher: 'Mrs. Sunita Rao',
      status: 'completed' as const,
      notes: 'Covered: Quadratic Roots Exercise 4.2'
    },
    {
      id: 'p2',
      periodNum: 2,
      time: '09:20 – 10:05 AM',
      subject: 'Physics & Optics Lab',
      room: 'Science Block Lab 1',
      teacher: 'Mr. Arvind Saxena',
      status: 'current' as const,
      notes: 'Active: Concave Mirror Ray Diagrams'
    },
    {
      id: 'p3',
      periodNum: 3,
      time: '10:35 – 11:20 AM',
      subject: 'Computer Science',
      room: 'IT Lab 2',
      teacher: 'Mr. David Miller',
      status: 'upcoming' as const,
      notes: 'Topic: Python Functions & Arrays'
    },
    {
      id: 'p4',
      periodNum: 4,
      time: '11:25 – 12:10 PM',
      subject: 'English Literature',
      room: 'Room 108',
      teacher: "Ms. Clara D'Souza",
      status: 'upcoming' as const,
      notes: 'Chapter: The Merchant of Venice Act 3'
    },
    {
      id: 'p5',
      periodNum: 5,
      time: '12:15 – 01:00 PM',
      subject: 'Social Science & Civics',
      room: 'Room 204',
      teacher: 'Mrs. Geeta Patel',
      status: 'upcoming' as const,
      notes: 'Topic: Federalism in Indian Democracy'
    }
  ];

  const handleAsk = (prompt: string) => {
    if (onAskAi) onAskAi(prompt);
  };

  return (
    <div
      className={`rounded-3xl p-5 sm:p-7 border shadow-lg transition-all ${
        isDarkMode
          ? 'bg-slate-900/90 border-slate-800/80 text-slate-100'
          : 'bg-white border-slate-200/90 text-slate-900 shadow-xs'
      }`}
    >
      {/* Header with School Bell & Day Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-5 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-400 text-slate-950 shadow-md">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-base sm:text-lg tracking-tight">
                {t.title}
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950/80 text-indigo-800 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-700">
                {t.classBadge}
              </span>
            </div>
            <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              {t.subtitle}
            </p>
          </div>
        </div>

        {/* Days of Week Tab Bar */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-800 self-start sm:self-auto">
          {days.map((day) => (
            <button
              key={day.key}
              onClick={() => setSelectedDay(day.key)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                selectedDay === day.key
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {day.label}
            </button>
          ))}
        </div>
      </div>

      {/* Period Timeline List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {periods.map((period) => {
          const isCurrent = period.status === 'current';
          const isCompleted = period.status === 'completed';

          return (
            <div
              key={period.id}
              onClick={() => handleAsk(`What should I prepare for today's ${period.subject} class in ${period.room}?`)}
              className={`rounded-2xl p-4 border transition-all duration-200 relative overflow-hidden cursor-pointer flex flex-col justify-between ${
                isCurrent
                  ? isDarkMode
                    ? 'bg-indigo-950/60 border-indigo-500/80 shadow-md ring-2 ring-indigo-500/30'
                    : 'bg-indigo-50/80 border-indigo-300 shadow-md ring-2 ring-indigo-300/40'
                  : isCompleted
                    ? isDarkMode
                      ? 'bg-slate-950/40 border-slate-800/60 opacity-70'
                      : 'bg-slate-50/80 border-slate-200/60 opacity-80'
                    : isDarkMode
                      ? 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                      : 'bg-white border-slate-200/90 hover:border-slate-300 shadow-2xs'
              }`}
            >
              <div>
                {/* Period Number and Status Badge */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs font-mono border ${
                      isCurrent
                        ? 'bg-indigo-600 text-white border-indigo-700'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700'
                    }`}>
                      {typeof period.periodNum === 'number' ? `P${period.periodNum}` : period.periodNum}
                    </span>

                    <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 font-medium">
                      {period.time}
                    </span>
                  </div>

                  {isCurrent ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500 text-white flex items-center gap-1 shadow-xs animate-pulse">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                      {t.statusCurrent || 'Active Now'}
                    </span>
                  ) : isCompleted ? (
                    <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{t.statusCompleted || 'Completed'}</span>
                    </span>
                  ) : (
                    <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">
                      {t.statusUpcoming || 'Upcoming'}
                    </span>
                  )}
                </div>

                {/* Subject Name */}
                <h4 className={`font-black text-sm sm:text-base leading-snug tracking-tight mb-1 ${
                  isCurrent ? 'text-indigo-900 dark:text-indigo-200' : 'text-slate-900 dark:text-slate-100'
                }`}>
                  {period.subject}
                </h4>

                {/* Location & Teacher */}
                <div className="space-y-1 text-xs text-slate-500 dark:text-slate-400 pt-1">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-rose-500 shrink-0" />
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{period.room}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <User className="w-3 h-3 text-indigo-500 shrink-0" />
                    <span>{period.teacher}</span>
                  </div>
                </div>

                {/* Teacher Topic / Notes */}
                {period.notes && (
                  <p className="mt-2.5 text-[11px] font-handwriting text-slate-600 dark:text-slate-300 italic border-t border-slate-200/50 dark:border-slate-800/50 pt-1.5">
                    {period.notes}
                  </p>
                )}
              </div>

              {/* Bottom Quick Action */}
              <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] font-bold text-indigo-600 dark:text-indigo-400">
                <span>{t.askPeriodAi || 'Ask AI about this period'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
