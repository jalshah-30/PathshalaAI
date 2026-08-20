import React, { useState } from 'react';
import { Calendar, TrendingDown, TrendingUp, Sparkles, ArrowRight, Info } from 'lucide-react';

interface AttendanceChartProps {
  currentPercentage?: number;
  changeValue?: number | string;
  isDarkMode?: boolean;
  onAskAiRecommendation?: () => void;
}

export const AttendanceChart: React.FC<AttendanceChartProps> = ({
  currentPercentage = 80,
  changeValue = -20,
  isDarkMode = false,
  onAskAiRecommendation
}) => {
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly' | 'semester'>('weekly');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Data series based on timeframe
  const weeklyData = [
    { label: 'Week 1', rate: 100, present: 5, total: 5, status: 'Full Attendance' },
    { label: 'Week 2', rate: 95, present: 5, total: 5, status: '1 Late Arrival' },
    { label: 'Week 3', rate: 85, present: 4, total: 5, status: '1 Unexcused Absence' },
    { label: 'Week 4', rate: 80, present: 4, total: 5, status: '1 Illness Absence' }
  ];

  const monthlyData = [
    { label: 'Aug', rate: 96, present: 22, total: 23, status: 'Exemplary' },
    { label: 'Sep', rate: 92, present: 20, total: 22, status: 'Good' },
    { label: 'Oct', rate: 88, present: 19, total: 21, status: 'Stable' },
    { label: 'Nov', rate: 80, present: 16, total: 20, status: 'Decline Flagged' }
  ];

  const semesterData = [
    { label: 'Term 1 Baseline', rate: 94, present: 88, total: 94, status: 'Distinction' },
    { label: 'Mid-Term Current', rate: 84, present: 74, total: 88, status: 'Attention Required' }
  ];

  const data = timeframe === 'weekly' ? weeklyData : timeframe === 'monthly' ? monthlyData : semesterData;

  const maxRate = 100;
  const minRequired = 75;

  return (
    <div
      className={`rounded-2xl p-5 sm:p-6 border transition-all ${
        isDarkMode
          ? 'bg-slate-900/90 border-slate-800/80 text-slate-100'
          : 'bg-white border-slate-200/90 text-slate-900 shadow-xs'
      }`}
    >
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-lg ${isDarkMode ? 'bg-indigo-500/20 text-indigo-400' : 'bg-indigo-50 text-indigo-600'}`}>
              <Calendar className="w-4 h-4" />
            </div>
            <h3 className={`font-bold text-base tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Multi-Week Attendance Analytics
            </h3>
          </div>
          <p className={`text-xs mt-0.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Track session consistency, verify minimum 75% CBSE threshold, and view AI predictive trends
          </p>
        </div>

        {/* Timeframe Switcher */}
        <div className={`flex items-center p-1 rounded-xl border self-start sm:self-auto ${
          isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-100/90 border-slate-200'
        }`}>
          {(['weekly', 'monthly', 'semester'] as const).map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg capitalize transition ${
                timeframe === tf
                  ? isDarkMode
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white text-slate-900 shadow-xs border border-slate-200/50'
                  : isDarkMode
                  ? 'text-slate-400 hover:text-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Visualizer */}
      <div className="relative pt-4 pb-2">
        {/* Minimum Threshold Reference Line */}
        <div className="absolute left-0 right-0 top-1/4 border-b border-dashed border-rose-400/50 flex items-center justify-end pr-2 z-0">
          <span className="text-[10px] font-mono text-rose-500 bg-rose-500/10 px-1.5 py-0.5 rounded -translate-y-3">
            75% Mandatory Board Minimum
          </span>
        </div>

        {/* Bar & Point Grid */}
        <div className="grid grid-cols-4 gap-3 sm:gap-6 items-end h-44 relative z-10 pt-4 px-2">
          {data.map((item, idx) => {
            const heightPercent = (item.rate / maxRate) * 100;
            const isHovered = hoveredIndex === idx;
            const isAboveReq = item.rate >= minRequired;

            return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="flex flex-col items-center h-full justify-end group cursor-pointer"
              >
                {/* Rate Value on top of bar */}
                <span
                  className={`text-xs font-bold font-mono transition-transform duration-200 ${
                    isHovered ? 'scale-110 text-indigo-400' : isDarkMode ? 'text-slate-300' : 'text-slate-700'
                  }`}
                >
                  {item.rate}%
                </span>

                {/* Bar */}
                <div className="w-full max-w-[48px] bg-slate-100 dark:bg-slate-800 rounded-t-xl h-full flex items-end p-1 mt-1.5 overflow-hidden">
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className={`w-full rounded-t-lg transition-all duration-500 ${
                      item.rate >= 90
                        ? 'bg-gradient-to-t from-emerald-600 to-emerald-400'
                        : item.rate >= 75
                        ? 'bg-gradient-to-t from-indigo-600 to-indigo-400'
                        : 'bg-gradient-to-t from-rose-600 to-rose-400'
                    } ${isHovered ? 'opacity-100 shadow-lg' : 'opacity-90'}`}
                  />
                </div>

                {/* X-axis label */}
                <span className={`text-[11px] font-medium mt-2 text-center line-clamp-1 ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  {item.label}
                </span>
                <span className={`text-[10px] ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                  {item.present}/{item.total}d
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI-Generated Predictive Insight Box */}
      <div className={`mt-5 p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
        isDarkMode
          ? 'bg-indigo-950/40 border-indigo-800/60 text-slate-200'
          : 'bg-indigo-50/70 border-indigo-100 text-slate-800'
      }`}>
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-indigo-600 text-white shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-xs uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Pathshala AI Analytical Insight
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                Action Required
              </span>
            </div>
            <p className="text-xs sm:text-sm mt-1 leading-relaxed">
              Your attendance has decreased by <strong className="text-amber-500 dark:text-amber-400">20%</strong> over the last 3 weeks.
              Pathshala AI recommends maintaining at least <strong>85% attendance</strong> during the next 2 weeks to preserve your exam eligibility buffer.
            </p>
          </div>
        </div>

        {onAskAiRecommendation && (
          <button
            onClick={onAskAiRecommendation}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white transition flex items-center gap-1.5 shrink-0 shadow-xs hover:shadow-md"
          >
            <span>Ask Copilot For Plan</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
