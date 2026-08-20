import React from 'react';
import { 
  GraduationCap, 
  Users, 
  Building2, 
  UserCheck, 
  Bot, 
  FolderTree, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { AuthUser } from '../types';
import { getTranslations } from '../i18n/localization';

export type EcosystemTab = 
  | '01-student-portal'
  | '02-parent-portal'
  | '03-management-portal'
  | '04-staff-portal'
  | '05-xyz-ai';

interface EcosystemNavigatorProps {
  activeTab: EcosystemTab;
  onSelectTab: (tab: EcosystemTab) => void;
  currentUser?: AuthUser | null;
  isDarkMode?: boolean;
  selectedLanguage?: string;
}

export function EcosystemNavigator({ 
  activeTab, 
  onSelectTab, 
  currentUser,
  isDarkMode = false,
  selectedLanguage = 'English'
}: EcosystemNavigatorProps) {
  const t = getTranslations(selectedLanguage);

  const repositories = [
    {
      id: '01-student-portal' as EcosystemTab,
      repNumber: '01',
      name: t.tabStudent,
      portal: 'student-portal',
      icon: GraduationCap,
      color: 'blue',
      activeColor: 'bg-indigo-600 text-white border-indigo-700 shadow-sm',
      badge: t.roleStudent
    },
    {
      id: '02-parent-portal' as EcosystemTab,
      repNumber: '02',
      name: t.tabParent,
      portal: 'parent-portal',
      icon: Users,
      color: 'teal',
      activeColor: 'bg-teal-600 text-white border-teal-700 shadow-sm',
      badge: t.roleParent
    },
    {
      id: '03-management-portal' as EcosystemTab,
      repNumber: '03',
      name: t.tabPrincipal,
      portal: 'management-portal',
      icon: Building2,
      color: 'purple',
      activeColor: 'bg-purple-600 text-white border-purple-700 shadow-sm',
      badge: t.rolePrincipal
    },
    {
      id: '04-staff-portal' as EcosystemTab,
      repNumber: '04',
      name: t.tabFaculty,
      portal: 'staff-portal',
      icon: UserCheck,
      color: 'emerald',
      activeColor: 'bg-emerald-600 text-white border-emerald-700 shadow-sm',
      badge: t.roleFaculty
    },
    {
      id: '05-xyz-ai' as EcosystemTab,
      repNumber: '05',
      name: t.tabCopilot,
      portal: 'pathshala-ai (Voice & Chat)',
      icon: Bot,
      color: 'indigo',
      activeColor: 'bg-slate-900 text-white border-slate-950 shadow-sm dark:bg-indigo-600 dark:border-indigo-500',
      badge: 'AI Orchestrator'
    }
  ];

  return (
    <div className={`rounded-2xl p-4 border transition-all shadow-xs mb-2 ${
      isDarkMode ? 'bg-slate-900/90 border-slate-800/80 text-slate-100' : 'bg-white border-slate-200/90 text-slate-900'
    }`}>
      {/* Ecosystem Architecture Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-200/60 dark:border-slate-800">
        <div className="flex items-center space-x-2.5">
          <div className="p-1.5 bg-indigo-600 text-white rounded-lg shadow-2xs">
            <FolderTree className="w-4 h-4" />
          </div>
          <div>
            <h2 className={`text-sm font-bold tracking-tight flex items-center gap-1.5 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              <span>{t.ecosystemTitle}</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                isDarkMode ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' : 'bg-indigo-50 text-indigo-700 border-indigo-200'
              }`}>
                {t.ecosystemRepositories}
              </span>
            </h2>
            <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              {t.ecosystemSubtitle}
            </p>
          </div>
        </div>

        <div className="text-xs text-slate-400 font-mono hidden md:block">
          {t.ecosystemInteractive}
        </div>
      </div>

      {/* Navigation Tabs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
        {repositories.map((repo) => {
          const Icon = repo.icon;
          const isActive = activeTab === repo.id;

          return (
            <button
              key={repo.id}
              onClick={() => onSelectTab(repo.id)}
              className={`p-3 rounded-xl border text-left transition relative flex flex-col justify-between cursor-pointer ${
                isActive
                  ? repo.activeColor
                  : isDarkMode
                  ? 'bg-slate-950/60 hover:bg-slate-800 text-slate-300 border-slate-800'
                  : 'bg-slate-50 hover:bg-slate-100/80 text-slate-700 border-slate-200'
              }`}
            >
              <div className="flex items-start justify-between">
                <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : isDarkMode
                    ? 'bg-slate-800 text-slate-400'
                    : 'bg-slate-200/70 text-slate-600'
                }`}>
                  {repo.repNumber}
                </span>
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              </div>

              <div className="mt-2">
                <div className="font-bold text-xs leading-snug">{repo.name}</div>
                <div className="mt-1 flex items-center justify-between">
                  <span className={`text-[10px] font-mono ${
                    isActive
                      ? 'text-white/80'
                      : isDarkMode
                      ? 'text-slate-400'
                      : 'text-slate-500'
                  }`}>
                    {repo.badge}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
