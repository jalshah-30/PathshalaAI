import React from 'react';
import { 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Flame, 
  TrendingDown, 
  BookOpen, 
  ArrowRight,
  ShieldAlert,
  GraduationCap
} from 'lucide-react';
import { AnimatedPen } from '../classroom/AnimatedPen';

interface InsightItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  explanation: string;
  severity: 'high' | 'medium' | 'positive' | 'milestone';
  severityLabel: string;
  recommendedAction: string;
  ctaText: string;
  ctaActionPrompt: string;
}

interface PathshalaAiInsightsProps {
  isDarkMode?: boolean;
  onExecuteAction: (prompt: string) => void;
}

export const PathshalaAiInsights: React.FC<PathshalaAiInsightsProps> = ({
  isDarkMode = false,
  onExecuteAction
}) => {
  const insights: InsightItem[] = [
    {
      id: 'att-decline',
      icon: TrendingDown,
      title: 'Attendance Declining',
      explanation: 'Your attendance dropped from 100% to 80% over the last two weeks (2 unexcused absences detected).',
      severity: 'high',
      severityLabel: 'Attention Needed',
      recommendedAction: 'Attend all scheduled classes this week to restore 85%+ trajectory.',
      ctaText: 'View Attendance Breakdown',
      ctaActionPrompt: 'Analyze why my attendance dropped from 100% to 80% in detail'
    },
    {
      id: 'math-focus',
      icon: BookOpen,
      title: 'Mathematics Needs Attention',
      explanation: 'Recent formative quiz in Quadratic Equations is 74%, below your 88% subject target.',
      severity: 'medium',
      severityLabel: 'Subject Focus',
      recommendedAction: 'Review formula revision sheets and complete practice test #3.',
      ctaText: 'Ask AI Math Tutor',
      ctaActionPrompt: 'Give me a 15-minute quick revision and practice quiz for Quadratic Equations'
    },
    {
      id: 'sci-improvement',
      icon: CheckCircle2,
      title: 'Science Performance Improving',
      explanation: 'Lab attendance and Physics assessment scores increased by +12% this month.',
      severity: 'positive',
      severityLabel: 'Positive Trajectory',
      recommendedAction: 'Maintain current practical notebook consistency.',
      ctaText: 'View Science Topics',
      ctaActionPrompt: 'Summarize my strengths and recent achievements in Science and Physics'
    },
    {
      id: 'streak-milestone',
      icon: Flame,
      title: '7-Day Attendance Streak',
      explanation: 'You have attended all morning and afternoon sessions consecutively for 7 school days.',
      severity: 'milestone',
      severityLabel: 'Term Milestone',
      recommendedAction: 'Complete 3 more days to unlock the Gold Consistency Badge.',
      ctaText: 'View Badges',
      ctaActionPrompt: 'What badges and academic milestones have I earned this term?'
    }
  ];

  const getSeverityBadge = (severity: InsightItem['severity'], label: string) => {
    switch (severity) {
      case 'high':
        return isDarkMode
          ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
          : 'bg-rose-50 text-rose-700 border-rose-200';
      case 'medium':
        return isDarkMode
          ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
          : 'bg-amber-50 text-amber-700 border-amber-200';
      case 'positive':
        return isDarkMode
          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
          : 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'milestone':
      default:
        return isDarkMode
          ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
          : 'bg-indigo-50 text-indigo-700 border-indigo-200';
    }
  };

  const getIconContainerStyle = (severity: InsightItem['severity']) => {
    switch (severity) {
      case 'high':
        return isDarkMode ? 'bg-rose-900/40 text-rose-400 border-rose-700/50' : 'bg-rose-50 text-rose-600 border-rose-100';
      case 'medium':
        return isDarkMode ? 'bg-amber-900/40 text-amber-400 border-amber-700/50' : 'bg-amber-50 text-amber-600 border-amber-100';
      case 'positive':
        return isDarkMode ? 'bg-emerald-900/40 text-emerald-400 border-emerald-700/50' : 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'milestone':
      default:
        return isDarkMode ? 'bg-indigo-900/40 text-indigo-400 border-indigo-700/50' : 'bg-indigo-50 text-indigo-600 border-indigo-100';
    }
  };

  return (
    <div
      className={`rounded-2xl p-5 sm:p-6 border transition-all ${
        isDarkMode
          ? 'bg-slate-900/90 border-slate-800/80 text-slate-100'
          : 'bg-white border-slate-200/90 text-slate-900 shadow-xs'
      }`}
    >
      {/* Section Header */}
      <div className="flex items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2.5">
          <div className={`p-2 rounded-xl flex items-center justify-center ${
            isDarkMode ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40' : 'bg-indigo-50 text-indigo-600 border border-indigo-100'
          }`}>
            <Sparkles className="w-4 h-4 text-indigo-500" />
          </div>
          <div>
            <h3 className={`font-bold text-base tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Pathshala AI Insights
            </h3>
            <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Real-time academic observations and automated copilot recommendations
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60">
            <AnimatedPen size="sm" isWriting={true} />
            <span className="text-[11px] font-handwriting text-amber-800 dark:text-amber-300 font-bold">
              AI Inscribed Notes
            </span>
          </div>

          <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border hidden sm:inline-flex items-center gap-1 ${
            isDarkMode ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-slate-100 text-slate-700 border-slate-200'
          }`}>
            <span>4 Active Insights</span>
          </span>
        </div>
      </div>

      {/* Grid of Insight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {insights.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className={`p-4 rounded-xl border transition-all duration-200 flex flex-col justify-between hover:shadow-md ${
                isDarkMode
                  ? 'bg-slate-950/60 border-slate-800/90 hover:border-slate-700'
                  : 'bg-slate-50/70 border-slate-200/80 hover:border-slate-300'
              }`}
            >
              <div>
                {/* Card Top Row */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 ${getIconContainerStyle(item.severity)}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className={`font-bold text-sm leading-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      {item.title}
                    </h4>
                  </div>

                  <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border shrink-0 ${getSeverityBadge(item.severity, item.severityLabel)}`}>
                    {item.severityLabel}
                  </span>
                </div>

                {/* Explanation */}
                <p className={`text-xs leading-relaxed mt-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  {item.explanation}
                </p>

                {/* Recommended Action */}
                <div className={`mt-3 p-2.5 rounded-lg border text-xs ${
                  isDarkMode
                    ? 'bg-slate-900/80 border-slate-800 text-slate-300'
                    : 'bg-white border-slate-200/60 text-slate-700 shadow-2xs'
                }`}>
                  <span className="font-semibold text-indigo-500 dark:text-indigo-400 block mb-0.5">
                    Recommended action:
                  </span>
                  <span>{item.recommendedAction}</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-4 pt-2 border-t border-slate-200/50 dark:border-slate-800/80 flex justify-end">
                <button
                  onClick={() => onExecuteAction(item.ctaActionPrompt)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    item.severity === 'high'
                      ? 'bg-rose-600 hover:bg-rose-700 text-white'
                      : isDarkMode
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  <span>{item.ctaText}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
