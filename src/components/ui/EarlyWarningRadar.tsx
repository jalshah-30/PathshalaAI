import React from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  TrendingDown, 
  CheckCircle2, 
  ArrowRight,
  Activity,
  Zap,
  Info
} from 'lucide-react';

interface EarlyWarningRadarProps {
  score?: number; // 0 to 100
  isDarkMode?: boolean;
  onMitigateRisk?: () => void;
  onRequestConsultation?: () => void;
}

export const EarlyWarningRadar: React.FC<EarlyWarningRadarProps> = ({
  score = 32,
  isDarkMode = false,
  onMitigateRisk,
  onRequestConsultation
}) => {
  // Score interpretation (0-39: Low Risk / Safe, 40-69: Medium Risk, 70-100: High Risk)
  const riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' = score >= 70 ? 'HIGH' : score >= 40 ? 'MEDIUM' : 'LOW';

  const riskFactors = [
    {
      category: 'Attendance Trajectory',
      value: 80,
      target: 85,
      status: 'Warning',
      impact: 'High',
      desc: '20% decline over past 3 weeks'
    },
    {
      category: 'Academic Performance',
      value: 88,
      target: 80,
      status: 'Healthy',
      impact: 'Low',
      desc: 'Consistent average in Science & English'
    },
    {
      category: 'Assignment Completion',
      value: 94,
      target: 85,
      status: 'Exemplary',
      impact: 'Minimal',
      desc: '16 of 17 submissions completed on time'
    },
    {
      category: 'Classroom Engagement',
      value: 85,
      target: 80,
      status: 'Healthy',
      impact: 'Low',
      desc: 'Active participation logged by teachers'
    },
    {
      category: 'Punctuality & Behavior',
      value: 92,
      target: 90,
      status: 'Exemplary',
      impact: 'Minimal',
      desc: '1 minor late arrival this month'
    }
  ];

  const getRiskTheme = () => {
    switch (riskLevel) {
      case 'HIGH':
        return {
          badge: isDarkMode ? 'bg-rose-500/20 text-rose-300 border-rose-500/40' : 'bg-rose-100 text-rose-800 border-rose-200',
          textColor: 'text-rose-500',
          barColor: 'bg-rose-500',
          label: 'HIGH RISK ALERT'
        };
      case 'MEDIUM':
        return {
          badge: isDarkMode ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'bg-amber-100 text-amber-800 border-amber-200',
          textColor: 'text-amber-500',
          barColor: 'bg-amber-500',
          label: 'MODERATE RISK'
        };
      case 'LOW':
      default:
        return {
          badge: isDarkMode ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' : 'bg-emerald-100 text-emerald-800 border-emerald-200',
          textColor: 'text-emerald-500',
          barColor: 'bg-emerald-500',
          label: 'LOW RISK (SAFE)'
        };
    }
  };

  const theme = getRiskTheme();

  return (
    <div
      className={`rounded-2xl p-5 sm:p-6 border transition-all ${
        isDarkMode
          ? 'bg-slate-900/90 border-slate-800/80 text-slate-100'
          : 'bg-white border-slate-200/90 text-slate-900 shadow-xs'
      }`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2.5">
          <div className={`p-2 rounded-xl flex items-center justify-center ${
            isDarkMode ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30' : 'bg-rose-50 text-rose-600 border border-rose-100'
          }`}>
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <h3 className={`font-bold text-base tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Early Warning Academic Radar
            </h3>
            <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Predictive 5-pillar risk evaluation powered by school ERP telemetry
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className={`text-xs font-bold px-3 py-1 rounded-full border flex items-center gap-1.5 ${theme.badge}`}>
            <Activity className="w-3.5 h-3.5" />
            <span>{theme.label}</span>
          </span>
        </div>
      </div>

      {/* Risk Gauge & Summary Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Risk Score Dial Card */}
        <div className={`lg:col-span-4 rounded-xl p-5 border text-center flex flex-col items-center justify-center ${
          isDarkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50/80 border-slate-200'
        }`}>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Composite Risk Index
          </span>
          <div className="my-2 flex items-baseline justify-center gap-1">
            <span className={`text-4xl font-black ${theme.textColor}`}>
              {score}
            </span>
            <span className="text-sm font-bold text-slate-400">/ 100</span>
          </div>

          <div className="w-full bg-slate-200 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden my-2">
            <div
              className={`h-full rounded-full transition-all duration-700 ${theme.barColor}`}
              style={{ width: `${score}%` }}
            />
          </div>

          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            Low (0-39) • Moderate (40-69) • High (70+)
          </p>
        </div>

        {/* Primary Diagnostic Finding */}
        <div className="lg:col-span-8 flex flex-col justify-between h-full">
          <div className={`p-4 rounded-xl border text-xs sm:text-sm leading-relaxed ${
            isDarkMode
              ? 'bg-amber-950/20 border-amber-800/40 text-amber-200'
              : 'bg-amber-50/60 border-amber-200 text-amber-900'
          }`}>
            <div className="flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
              <span>Primary Risk Driver Detected</span>
            </div>
            <p>
              Your <strong className="font-semibold underline decoration-amber-500">attendance trajectory</strong> is currently the primary factor increasing your academic risk index. Academic performance, assignments, and behavior remain safely in good standing.
            </p>
          </div>

          {/* Quick CTAs */}
          <div className="mt-3 flex flex-wrap gap-2">
            {onMitigateRisk && (
              <button
                onClick={onMitigateRisk}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white transition flex items-center gap-1.5 shadow-2xs"
              >
                <Zap className="w-3.5 h-3.5 text-amber-300" />
                <span>Auto-Mitigate with AI Plan</span>
              </button>
            )}
            {onRequestConsultation && (
              <button
                onClick={onRequestConsultation}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition flex items-center gap-1.5 ${
                  isDarkMode
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
                }`}
              >
                <span>Request Teacher Consultation</span>
                <ArrowRight className="w-3 h-3 text-slate-400" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 5-Pillar Breakdown Bars */}
      <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800/80">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-3">
          5-Pillar Telemetry Breakdown
        </span>

        <div className="space-y-3">
          {riskFactors.map((factor, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs ${
                isDarkMode ? 'bg-slate-950/40 border-slate-800/60' : 'bg-slate-50/50 border-slate-200/60'
              }`}
            >
              <div className="sm:w-1/3">
                <span className={`font-semibold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                  {factor.category}
                </span>
                <p className="text-[11px] text-slate-500">{factor.desc}</p>
              </div>

              <div className="sm:w-1/3 flex items-center gap-2">
                <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      factor.value >= 85
                        ? 'bg-emerald-500'
                        : factor.value >= 75
                        ? 'bg-indigo-500'
                        : 'bg-amber-500'
                    }`}
                    style={{ width: `${factor.value}%` }}
                  />
                </div>
                <span className="font-mono font-bold text-slate-700 dark:text-slate-300 w-9 text-right">
                  {factor.value}%
                </span>
              </div>

              <div className="sm:w-1/4 flex justify-end">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    factor.status === 'Exemplary'
                      ? isDarkMode ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-50 text-emerald-700'
                      : factor.status === 'Healthy'
                      ? isDarkMode ? 'bg-indigo-500/20 text-indigo-400' : 'bg-indigo-50 text-indigo-700'
                      : isDarkMode ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-50 text-amber-700'
                  }`}
                >
                  {factor.status} ({factor.impact} Risk Impact)
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
