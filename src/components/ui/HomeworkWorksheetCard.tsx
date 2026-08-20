import React, { useState } from 'react';
import { 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Sparkles, 
  UploadCloud, 
  Download, 
  Check, 
  ChevronRight,
  HelpCircle,
  Tag
} from 'lucide-react';
import { AnimatedPen } from '../classroom/AnimatedPen';

interface HomeworkWorksheetCardProps {
  isDarkMode?: boolean;
  onAskAi?: (prompt: string) => void;
}

interface Worksheet {
  id: string;
  subject: string;
  title: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded';
  teacher: string;
  grade?: string;
  score?: string;
  teacherRemark?: string;
  questionsCount: number;
}

const WORKSHEETS: Worksheet[] = [
  {
    id: 'ws-math-4',
    subject: 'Mathematics',
    title: 'Worksheet 4.2: Roots of Quadratic Equations by Factorization',
    dueDate: 'Tomorrow, 08:30 AM',
    status: 'pending',
    teacher: 'Mrs. Sunita Rao',
    questionsCount: 10
  },
  {
    id: 'ws-phy-optics',
    subject: 'Physics',
    title: 'Lab Worksheet #3: Spherical Mirrors & Ray Diagrams for Concave Mirrors',
    dueDate: 'Submitted Yesterday',
    status: 'graded',
    teacher: 'Mr. Arvind Saxena',
    grade: 'A+',
    score: '19 / 20',
    teacherRemark: 'Excellent precision on focal point tangents! Well done Rahul.',
    questionsCount: 6
  },
  {
    id: 'ws-eng-essay',
    subject: 'English',
    title: 'Essay Writing: Critical Analysis of Portia’s Speech in Merchant of Venice',
    dueDate: 'Friday, 11:30 AM',
    status: 'pending',
    teacher: "Ms. Clara D'Souza",
    questionsCount: 1
  },
  {
    id: 'ws-cs-python',
    subject: 'Computer Science',
    title: 'Practical Sheet: Python Loop Structures & Fibonacci Generator',
    dueDate: 'Next Monday',
    status: 'submitted',
    teacher: 'Mr. David Miller',
    questionsCount: 4
  }
];

export const HomeworkWorksheetCard: React.FC<HomeworkWorksheetCardProps> = ({
  isDarkMode = false,
  onAskAi
}) => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'graded'>('all');

  const handleAsk = (prompt: string) => {
    if (onAskAi) onAskAi(prompt);
  };

  const filtered = WORKSHEETS.filter((ws) => {
    if (filter === 'pending') return ws.status === 'pending';
    if (filter === 'graded') return ws.status === 'graded';
    return true;
  });

  return (
    <div
      className={`rounded-3xl p-5 sm:p-7 border shadow-lg transition-all ${
        isDarkMode
          ? 'bg-slate-900/90 border-slate-800/80 text-slate-100'
          : 'bg-white border-slate-200/90 text-slate-900 shadow-xs'
      }`}
    >
      {/* Card Header with Worksheet Icon & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-5 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-rose-500 to-rose-400 text-white shadow-md">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-base sm:text-lg tracking-tight">
                Homework & Assignment Worksheets
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-700">
                Term 1 Portfolio
              </span>
            </div>
            <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Teacher-assigned problem sheets with rubric evaluation and marks
            </p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-800 self-start sm:self-auto">
          {(['all', 'pending', 'graded'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1 rounded-lg text-xs font-bold capitalize transition cursor-pointer ${
                filter === tab
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {tab === 'all' ? 'All Worksheets' : tab}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of School Worksheet Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((ws) => {
          const isPending = ws.status === 'pending';
          const isGraded = ws.status === 'graded';

          return (
            <div
              key={ws.id}
              className={`rounded-2xl p-5 border worksheet-grid transition-all duration-200 relative flex flex-col justify-between hover:shadow-md ${
                isDarkMode
                  ? 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                  : 'bg-white border-slate-200/90 hover:border-slate-300 shadow-2xs'
              }`}
            >
              <div>
                {/* Subject & Status Tag */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                    {ws.subject} • {ws.questionsCount} Questions
                  </span>

                  {isPending ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>Due {ws.dueDate}</span>
                    </span>
                  ) : isGraded ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Graded • {ws.score}</span>
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-800">
                      Submitted
                    </span>
                  )}
                </div>

                {/* Worksheet Title */}
                <h4 className="font-extrabold text-sm sm:text-base leading-snug tracking-tight mb-2 text-slate-950 dark:text-white">
                  {ws.title}
                </h4>

                {/* Teacher Info */}
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Assigned by: <strong className="text-slate-700 dark:text-slate-300">{ws.teacher}</strong>
                </p>

                {/* Teacher Correction Stamp / Remark in handwriting font */}
                {ws.teacherRemark && (
                  <div className="mt-3 p-2.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 font-handwriting text-base text-emerald-900 dark:text-emerald-300 relative">
                    <div className="flex items-center gap-1.5 font-bold text-xs text-emerald-700 dark:text-emerald-400 mb-0.5">
                      <AnimatedPen size="sm" isWriting={false} />
                      <span>Teacher's Feedback & Verified Stamp:</span>
                    </div>
                    <p className="leading-snug">"{ws.teacherRemark}"</p>
                  </div>
                )}
              </div>

              {/* Bottom Actions */}
              <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between gap-2">
                <button
                  onClick={() => handleAsk(`Help me solve and understand the questions in: ${ws.title}`)}
                  className="px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950 hover:bg-indigo-100 text-indigo-700 dark:text-indigo-300 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer border border-indigo-200 dark:border-indigo-800"
                >
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Solve with Copilot</span>
                </button>

                <span className="text-[11px] font-mono text-slate-400">
                  {ws.id}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
