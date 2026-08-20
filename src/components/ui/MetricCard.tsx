import React from 'react';
import { TrendingUp, TrendingDown, CheckCircle2, Flame, Award, HelpCircle } from 'lucide-react';

interface MetricCardProps {
  id?: string;
  title: string;
  value: string | number;
  subtitle?: string;
  type: 'progress' | 'trend' | 'streak';
  percentage?: number;
  changeValue?: number | string;
  isPositive?: boolean;
  statusLabel?: string;
  statusVariant?: 'success' | 'warning' | 'danger' | 'info';
  streakDays?: number;
  explanation: string;
  icon?: React.ComponentType<{ className?: string }>;
  isDarkMode?: boolean;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  id,
  title,
  value,
  subtitle,
  type,
  percentage = 90,
  changeValue = '-20%',
  isPositive = false,
  statusLabel,
  statusVariant = 'success',
  streakDays = 7,
  explanation,
  icon: Icon,
  isDarkMode = false
}) => {
  // Circular progress math
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (Math.min(Math.max(percentage, 0), 100) / 100) * circumference;

  const getStatusBadgeClasses = () => {
    switch (statusVariant) {
      case 'success':
        return isDarkMode
          ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
          : 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'warning':
        return isDarkMode
          ? 'bg-amber-500/15 text-amber-400 border-amber-500/30'
          : 'bg-amber-50 text-amber-700 border-amber-200';
      case 'danger':
        return isDarkMode
          ? 'bg-rose-500/15 text-rose-400 border-rose-500/30'
          : 'bg-rose-50 text-rose-700 border-rose-200';
      case 'info':
      default:
        return isDarkMode
          ? 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30'
          : 'bg-indigo-50 text-indigo-700 border-indigo-200';
    }
  };

  return (
    <div
      id={id}
      className={`relative rounded-2xl p-5 border transition-all duration-200 flex flex-col justify-between hover:shadow-md ${
        isDarkMode
          ? 'bg-slate-900/90 border-slate-800/80 hover:border-slate-700 text-slate-100 shadow-sm'
          : 'bg-white border-slate-200/90 hover:border-slate-300 text-slate-900 shadow-xs'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {Icon && (
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                isDarkMode ? 'bg-slate-800 text-indigo-400' : 'bg-indigo-50 text-indigo-600'
              }`}
            >
              <Icon className="w-4 h-4" />
            </div>
          )}
          <span className={`text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            {title}
          </span>
        </div>

        {statusLabel && (
          <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border flex items-center gap-1 ${getStatusBadgeClasses()}`}>
            {statusVariant === 'success' && <CheckCircle2 className="w-3 h-3" />}
            {statusVariant === 'warning' && <TrendingDown className="w-3 h-3" />}
            <span>{statusLabel}</span>
          </span>
        )}
      </div>

      {/* Main Content & Visual Indicator */}
      <div className="my-4 flex items-center justify-between">
        <div>
          <div className="flex items-baseline gap-2">
            <span className={`text-3xl font-extrabold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              {value}
            </span>
            {subtitle && (
              <span className={`text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                {subtitle}
              </span>
            )}
          </div>
        </div>

        {/* Dynamic Graphic based on Metric Type */}
        {type === 'progress' && (
          <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
            <svg className="w-14 h-14 -rotate-90" viewBox="0 0 60 60">
              <circle
                cx="30"
                cy="30"
                r={radius}
                className={isDarkMode ? 'stroke-slate-800' : 'stroke-slate-100'}
                strokeWidth="6"
                fill="none"
              />
              <circle
                cx="30"
                cy="30"
                r={radius}
                className={`transition-all duration-700 ${percentage >= 75 ? 'stroke-emerald-500' : 'stroke-amber-500'}`}
                strokeWidth="6"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            <span className={`absolute text-[11px] font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
              {percentage}%
            </span>
          </div>
        )}

        {type === 'trend' && (
          <div className="flex flex-col items-end shrink-0">
            <div
              className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg ${
                isPositive
                  ? isDarkMode ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-50 text-emerald-700'
                  : isDarkMode ? 'bg-rose-500/20 text-rose-400' : 'bg-rose-50 text-rose-700'
              }`}
            >
              {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
              <span>{changeValue}</span>
            </div>
            <span className={`text-[10px] mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              3-Week Sparkline
            </span>
          </div>
        )}

        {type === 'streak' && (
          <div className="flex items-center gap-1 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500">
              <Flame className="w-5 h-5 fill-amber-500/20" />
            </div>
          </div>
        )}
      </div>

      {/* Footer / Explanation */}
      <div className={`pt-2.5 border-t text-xs flex items-center justify-between ${
        isDarkMode ? 'border-slate-800/80 text-slate-400' : 'border-slate-100 text-slate-500'
      }`}>
        <p className="line-clamp-1">{explanation}</p>
      </div>
    </div>
  );
};
