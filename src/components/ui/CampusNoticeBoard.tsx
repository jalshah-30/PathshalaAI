import React from 'react';
import { 
  Bell, 
  Sparkles, 
  Calendar, 
  ChevronRight
} from 'lucide-react';
import { SupportedLanguage } from '../../i18n/localization';
import { getPortalTranslations } from '../../i18n/portalTranslations';

interface CampusNoticeBoardProps {
  isDarkMode?: boolean;
  onAskAi?: (prompt: string) => void;
  selectedLanguage?: SupportedLanguage;
}

export const CampusNoticeBoard: React.FC<CampusNoticeBoardProps> = ({
  isDarkMode = false,
  onAskAi,
  selectedLanguage = 'en'
}) => {
  const t = getPortalTranslations(selectedLanguage).noticeBoard;

  const defaultNotices = [
    {
      id: 'n1',
      category: 'EXAMINATION CIRCULAR',
      title: 'CBSE Class 10 Term-1 Datesheet & Hall Tickets',
      date: 'Oct 12 – Oct 26',
      issuer: 'Office of the Controller of Examinations',
      summary: 'Theory papers commence at 10:30 AM sharp. Internal practical assessments conclude by Oct 05. Collect verified admit cards from Class Teacher.',
      stampText: 'OFFICIAL • APPROVED',
      actionPrompt: 'Summarize the CBSE Term-1 datesheet schedule and key exam instructions for Class 10'
    },
    {
      id: 'n2',
      category: 'ACADEMIC COMPETITION',
      title: 'Inter-School AI & Science Model Exhibition',
      date: 'Friday, 3:00 PM',
      issuer: 'Atal Tinkering Lab & Science Dept.',
      summary: 'Working models on Renewable Energy, Robotics, and Python AI algorithms to be registered by Thursday 4:00 PM. Winners qualify for State Finals.',
      stampText: 'REGISTRATION OPEN',
      actionPrompt: 'What are the rules and project ideas for the Inter-School Science & AI Exhibition?'
    },
    {
      id: 'n3',
      category: 'CAMPUS POLICY',
      title: 'Strict 75% Attendance Criteria for Board Clearance',
      date: 'Immediate Effect',
      issuer: "Principal's Desk (Dr. Rajesh Verma)",
      summary: 'Students below 75% aggregate presence without sanctioned medical proof will be barred from practical exams. Check attendance ledger weekly.',
      stampText: 'MANDATORY COMPLIANCE',
      actionPrompt: 'Explain the official 75% attendance policy and medical leave certificate submission guidelines'
    },
    {
      id: 'n4',
      category: 'SPORTS & EXTRA-CURRICULAR',
      title: 'Annual Sports Meet & Inter-House Trials',
      date: 'Next Saturday',
      issuer: 'Department of Physical Education',
      summary: 'Tagore, Raman, Shivaji, and Teresa house athletes report to main stadium for 100m, 400m relay, and long jump trials. Duty leave provided.',
      stampText: 'DUTY LEAVE ELIGIBLE',
      actionPrompt: 'How do duty leaves get credited to my attendance ledger during sports trials?'
    }
  ];

  const noticesList = (t.notices && t.notices.length > 0) ? t.notices : defaultNotices;

  const pinStyles = [
    { color: 'red' as const, rotation: '-rotate-1' },
    { color: 'brass' as const, rotation: 'rotate-1' },
    { color: 'blue' as const, rotation: '-rotate-0.5' },
    { color: 'brass' as const, rotation: 'rotate-1.5' }
  ];

  const handleAsk = (prompt: string) => {
    if (onAskAi) onAskAi(prompt);
  };

  const getPinStyle = (color: 'red' | 'brass' | 'blue') => {
    switch (color) {
      case 'red':
        return 'bg-gradient-to-tr from-rose-700 via-rose-500 to-rose-400 border-rose-900 shadow-rose-900/50';
      case 'brass':
        return 'bg-gradient-to-tr from-amber-700 via-amber-400 to-yellow-200 border-amber-900 shadow-amber-900/50';
      case 'blue':
      default:
        return 'bg-gradient-to-tr from-blue-700 via-blue-500 to-blue-400 border-blue-900 shadow-blue-900/50';
    }
  };

  return (
    <div className="relative rounded-3xl p-3 sm:p-4 wood-frame shadow-2xl overflow-hidden">
      {/* Wood Grain Bevel Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-3 py-2.5 mb-2 text-amber-100">
        <div className="flex items-center space-x-2.5">
          <div className="p-1.5 rounded-lg bg-amber-950/80 border border-amber-700/60 text-amber-300">
            <Bell className="w-4 h-4 animate-bounce" style={{ animationDuration: '3s' }} />
          </div>
          <div>
            <h3 className="font-extrabold text-base sm:text-lg tracking-tight font-sans text-amber-100 flex items-center gap-2">
              {t.title}
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-amber-900/80 text-amber-300 border border-amber-700/80">
                {t.officeBadge || 'Principal & Exam Office'}
              </span>
            </h3>
            <p className="text-xs text-amber-200/70">
              {t.subtitle}
            </p>
          </div>
        </div>

        <button
          onClick={() => handleAsk('AI Summarize all current campus notices and circulars')}
          className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold shadow-md flex items-center gap-1.5 transition self-start sm:self-auto cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-slate-950" />
          <span>{t.aiSummarizeBtn || 'AI Summarize All Notices'}</span>
        </button>
      </div>

      {/* Cork Texture Board Surface */}
      <div className="cork-board rounded-2xl p-5 sm:p-7 border-2 border-amber-950/80 min-h-[380px]">
        {/* Notice Board Grid: 4 Pinned Paper Notices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {noticesList.map((notice, idx) => {
            const pinConfig = pinStyles[idx % pinStyles.length];
            return (
              <div
                key={notice.id}
                className={`relative rounded-xl p-5 border-2 shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl cursor-pointer ${
                  pinConfig.rotation
                } ${
                  isDarkMode
                    ? 'bg-slate-900 border-slate-700 text-white'
                    : 'bg-white border-slate-300 text-black shadow-md'
                }`}
                onClick={() => handleAsk(notice.actionPrompt)}
              >
                {/* 3D Pushpin Pin at Top Center */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex flex-col items-center z-20 pointer-events-none">
                  <div className={`w-4 h-4 rounded-full border shadow-md ${getPinStyle(pinConfig.color)}`} />
                  <div className="w-0.5 h-1.5 bg-slate-600 dark:bg-slate-400 -mt-0.5" />
                </div>

                {/* Notice Content */}
                <div className="pt-2">
                  {/* Header row with Category + Rubber Stamp */}
                  <div className="flex items-start justify-between gap-2 mb-2.5">
                    <span className="text-[11px] font-mono font-black uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-950 dark:text-indigo-200 border border-indigo-300 dark:border-indigo-800">
                      {notice.category}
                    </span>

                    {notice.stampText && (
                      <span className="school-rubber-stamp shrink-0 font-black">
                        {notice.stampText}
                      </span>
                    )}
                  </div>

                  {/* Notice Title */}
                  <h4 className="font-black text-base sm:text-lg leading-snug tracking-tight mb-2 text-black dark:text-white">
                    {notice.title}
                  </h4>

                  {/* Issuer & Date */}
                  <div className="flex items-center gap-2 text-xs text-slate-900 dark:text-slate-200 font-bold mb-3 bg-slate-100 dark:bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700">
                    <Calendar className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400 shrink-0" />
                    <span className="text-black dark:text-white font-extrabold">{notice.date}</span>
                    <span className="text-slate-400">•</span>
                    <span className="truncate text-slate-800 dark:text-slate-200">{notice.issuer}</span>
                  </div>

                  {/* Summary with dedicated high-contrast background card */}
                  <div className="mb-4 p-3.5 rounded-xl bg-amber-50/60 dark:bg-slate-950 border-2 border-amber-200/80 dark:border-slate-800 shadow-inner">
                    <p className="text-xs sm:text-sm leading-relaxed text-black dark:text-white font-bold">
                      {notice.summary}
                    </p>
                  </div>

                  {/* Footer Action */}
                  <div className="pt-3 border-t-2 border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-black text-indigo-950 dark:text-indigo-300 group">
                    <span className="flex items-center gap-1 group-hover:underline">
                      <span>{t.askCopilot || 'Ask Copilot'}</span>
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </span>

                    <span className="text-[11px] font-mono font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                      Ref #{notice.id.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
