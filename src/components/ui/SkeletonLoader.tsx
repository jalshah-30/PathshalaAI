import React from 'react';

interface SkeletonProps {
  className?: string;
  isDarkMode?: boolean;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = 'h-4 w-full', isDarkMode = false }) => {
  return (
    <div
      className={`animate-pulse rounded-lg ${
        isDarkMode ? 'bg-slate-800' : 'bg-slate-200'
      } ${className}`}
    />
  );
};

export const DashboardSkeleton: React.FC<{ isDarkMode?: boolean }> = ({ isDarkMode = false }) => {
  return (
    <div className="space-y-6">
      {/* Profile Skeleton */}
      <div className={`p-5 rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
        <div className="flex items-center gap-4">
          <Skeleton className="w-14 h-14 rounded-2xl shrink-0" isDarkMode={isDarkMode} />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-5 w-48" isDarkMode={isDarkMode} />
            <Skeleton className="h-3.5 w-64" isDarkMode={isDarkMode} />
          </div>
        </div>
      </div>

      {/* KPI Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className={`p-5 rounded-2xl border space-y-3 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <Skeleton className="h-4 w-24" isDarkMode={isDarkMode} />
            <Skeleton className="h-8 w-32" isDarkMode={isDarkMode} />
            <Skeleton className="h-3 w-full" isDarkMode={isDarkMode} />
          </div>
        ))}
      </div>

      {/* Chart Skeleton */}
      <div className={`p-6 rounded-2xl border space-y-4 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
        <Skeleton className="h-5 w-56" isDarkMode={isDarkMode} />
        <Skeleton className="h-48 w-full" isDarkMode={isDarkMode} />
      </div>
    </div>
  );
};
