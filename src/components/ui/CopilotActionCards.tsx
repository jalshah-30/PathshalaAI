import React from 'react';
import { 
  BookOpen, 
  Search, 
  BarChart3, 
  Target, 
  FileText, 
  Bot, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface CopilotActionCardsProps {
  isDarkMode?: boolean;
  onSelectAction: (prompt: string) => void;
}

export const CopilotActionCards: React.FC<CopilotActionCardsProps> = ({
  isDarkMode = false,
  onSelectAction
}) => {
  const actions = [
    {
      id: 'study-plan',
      icon: BookOpen,
      title: 'Create Study Plan',
      desc: 'Build a personalized 7-day revision schedule based on your weak subjects and upcoming tests.',
      cta: 'Create Plan',
      prompt: 'Create a personalized 7-day study plan for me prioritizing Mathematics and Physics',
      badge: 'Personalized'
    },
    {
      id: 'weak-subjects',
      icon: Search,
      title: 'Explain My Weak Subjects',
      desc: 'Diagnose concept gaps from recent quizzes and provide step-by-step topic clarifications.',
      cta: 'Analyze Subjects',
      prompt: 'Which subjects and topics need my attention based on recent scores and attendance?',
      badge: 'Diagnostic'
    },
    {
      id: 'analyze-att',
      icon: BarChart3,
      title: 'Analyze My Attendance',
      desc: 'Inspect multi-week session patterns, calculate exam eligibility buffers, and spot anomalies.',
      cta: 'Review Attendance',
      prompt: 'Provide a detailed breakdown of my attendance trajectory and exam eligibility status',
      badge: 'Analytics'
    },
    {
      id: 'prep-exams',
      icon: Target,
      title: 'Prepare For Upcoming Exams',
      desc: 'Generate topic-wise summary flashcards, practice questions, and high-yield revision points.',
      cta: 'Start Prep',
      prompt: 'Help me prepare for my upcoming semester exams with key focus areas and sample questions',
      badge: 'Exam Ready'
    },
    {
      id: 'summarize-perf',
      icon: FileText,
      title: 'Summarize Recent Performance',
      desc: 'Get an executive report card of attendance, assignments, and grades to share with parents.',
      cta: 'Summarize',
      prompt: 'Generate an executive summary of my recent academic performance and attendance record',
      badge: 'Summary'
    },
    {
      id: 'ai-tutor',
      icon: Bot,
      title: 'Talk to My AI Tutor',
      desc: 'Launch a voice-enabled, interactive lesson to clarify tricky academic doubts one-on-one.',
      cta: 'Talk Now',
      prompt: 'I want to start a 1-on-1 tutoring session. What should we review today?',
      badge: 'Interactive'
    }
  ];

  return (
    <div
      className={`rounded-2xl p-5 sm:p-6 border transition-all ${
        isDarkMode
          ? 'bg-slate-900/90 border-slate-800/80 text-slate-100'
          : 'bg-white border-slate-200/90 text-slate-900 shadow-xs'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2.5">
          <div className={`p-2 rounded-xl flex items-center justify-center ${
            isDarkMode ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40' : 'bg-indigo-50 text-indigo-600 border border-indigo-100'
          }`}>
            <Sparkles className="w-4 h-4 text-indigo-500" />
          </div>
          <div>
            <h3 className={`font-bold text-base tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Recommended Copilot Actions
            </h3>
            <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              One-click academic assistance workflows configured for your profile
            </p>
          </div>
        </div>

        <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border hidden sm:inline-block ${
          isDarkMode ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-slate-100 text-slate-600 border-slate-200'
        }`}>
          Instant AI Triggers
        </span>
      </div>

      {/* 6 Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <button
              key={act.id}
              onClick={() => onSelectAction(act.prompt)}
              className={`p-4 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between group hover:shadow-md hover:-translate-y-0.5 cursor-pointer ${
                isDarkMode
                  ? 'bg-slate-950/60 border-slate-800/90 hover:border-indigo-500/50 hover:bg-slate-900/90'
                  : 'bg-slate-50/70 border-slate-200/80 hover:border-indigo-300 hover:bg-white'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                    isDarkMode
                      ? 'bg-indigo-950 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white'
                      : 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                    isDarkMode
                      ? 'bg-slate-800 text-slate-300 border-slate-700'
                      : 'bg-white text-slate-600 border-slate-200'
                  }`}>
                    {act.badge}
                  </span>
                </div>

                <h4 className={`font-bold text-sm leading-tight transition-colors ${
                  isDarkMode ? 'text-white group-hover:text-indigo-300' : 'text-slate-900 group-hover:text-indigo-600'
                }`}>
                  {act.title}
                </h4>

                <p className={`text-xs leading-relaxed mt-1.5 line-clamp-2 ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  {act.desc}
                </p>
              </div>

              <div className="mt-3.5 pt-2.5 border-t border-slate-200/40 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-indigo-600 dark:text-indigo-400 group-hover:underline">
                <span>{act.cta}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
