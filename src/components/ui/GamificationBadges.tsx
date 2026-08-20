import React from 'react';
import { Flame, Award, Target, TrendingUp, Sparkles } from 'lucide-react';

interface GamificationBadgesProps {
  streakDays?: number;
  isDarkMode?: boolean;
}

export const GamificationBadges: React.FC<GamificationBadgesProps> = ({
  streakDays = 7,
  isDarkMode = false
}) => {
  const badges = [
    {
      id: 'streak',
      icon: Flame,
      title: '7-Day Streak',
      desc: 'Active Term Milestone',
      color: 'text-amber-500 bg-amber-500/10 border-amber-500/30'
    },
    {
      id: 'consistency',
      icon: Award,
      title: 'Consistency Champ',
      desc: '>85% Monthly Attendance',
      color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30'
    },
    {
      id: 'target',
      icon: Target,
      title: 'Term Goal: 90%',
      desc: 'On Track (91.2% Current)',
      color: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/30'
    },
    {
      id: 'growth',
      icon: TrendingUp,
      title: 'Science Star',
      desc: '+12% Lab Grade Surge',
      color: 'text-purple-500 bg-purple-500/10 border-purple-500/30'
    }
  ];

  return (
    <div
      className={`rounded-2xl p-4 sm:p-5 border transition-all ${
        isDarkMode
          ? 'bg-slate-900/90 border-slate-800/80 text-slate-100'
          : 'bg-white border-slate-200/90 text-slate-900 shadow-xs'
      }`}
    >
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Academic Milestones & Badges
          </h3>
        </div>
        <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
          Level 4 Scholar
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {badges.map((b) => {
          const Icon = b.icon;
          return (
            <div
              key={b.id}
              className={`p-3 rounded-xl border flex items-center gap-2.5 transition ${
                isDarkMode ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200/80'
              }`}
            >
              <div className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 ${b.color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-xs truncate leading-tight">{b.title}</h4>
                <p className="text-[10px] text-slate-400 truncate mt-0.5">{b.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
