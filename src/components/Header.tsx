import React, { useState, useEffect, useRef } from 'react';
import {
  GraduationCap,
  Globe,
  Sun,
  Moon,
  ShieldCheck,
  ChevronDown,
  Bell,
  Clock,
  School,
  Users,
  UserCheck,
  Building,
  Check,
  Sparkles
} from 'lucide-react';
import { AuthUser, RoleDefinition, UserRole } from '../types';
import { NotificationCenter } from './ui/NotificationCenter';
import { DeveloperSystemMenu } from './ui/DeveloperSystemMenu';
import { AnimatedPen } from './classroom/AnimatedPen';
import { SUPPORTED_LANGUAGES, getTranslations } from '../i18n/localization';

const DEFAULT_DEMO_USERS: AuthUser[] = [
  {
    userId: 'user-student-1',
    role: 'student',
    name: 'Rahul Sharma',
    email: 'rahul.sharma@school.edu',
    associatedId: 'S101'
  },
  {
    userId: 'user-parent-1',
    role: 'parent',
    name: 'Ramesh Sharma',
    email: 'ramesh.sharma@gmail.com',
    associatedId: 'P101',
    childrenIds: ['S101', 'S105']
  },
  {
    userId: 'user-parent-2',
    role: 'parent',
    name: 'Sunita Patel',
    email: 'sunita.patel@gmail.com',
    associatedId: 'P102',
    childrenIds: ['S102']
  },
  {
    userId: 'user-teacher-1',
    role: 'teacher',
    name: 'Meera Sen',
    email: 'meera.sen@school.edu',
    associatedId: 'T201',
    assignedClass: 'Class 10-A'
  },
  {
    userId: 'user-principal-1',
    role: 'principal',
    name: 'Dr. Ananya Iyer',
    email: 'principal@school.edu',
    associatedId: 'PR301'
  }
];

interface HeaderProps {
  currentUser: AuthUser | null;
  roleDefinition: RoleDefinition | null;
  availableUsers: AuthUser[];
  onSwitchUser: (userId: string) => void;
  onClearSession: () => void;
  onOpenDatabase: () => void;
  onOpenTestRunner: () => void;
  onOpenSecurityCenter: () => void;
  onOpenAuditLogs: () => void;
  selectedLanguage: string;
  onSelectLanguage: (lang: string) => void;
  showDebug: boolean;
  onToggleDebug: () => void;
  isDarkMode?: boolean;
  onToggleTheme?: () => void;
  onSendPrompt?: (prompt: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  roleDefinition,
  availableUsers = [],
  onSwitchUser,
  onClearSession,
  onOpenDatabase,
  onOpenTestRunner,
  onOpenSecurityCenter,
  onOpenAuditLogs,
  selectedLanguage,
  onSelectLanguage,
  showDebug,
  onToggleDebug,
  isDarkMode = false,
  onToggleTheme,
  onSendPrompt
}) => {
  const [currentTime, setCurrentTime] = useState('09:42 AM');
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);
  const roleDropdownRef = useRef<HTMLDivElement>(null);

  // Combine and deduplicate users
  const userMap = new Map<string, AuthUser>();
  DEFAULT_DEMO_USERS.forEach((u) => userMap.set(u.userId, u));
  availableUsers.forEach((u) => userMap.set(u.userId, u));
  const effectiveUsers = Array.from(userMap.values());

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const timer = setInterval(updateTime, 30000);
    return () => clearInterval(timer);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (roleDropdownRef.current && !roleDropdownRef.current.contains(event.target as Node)) {
        setIsRoleMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getRoleIcon = (role?: UserRole) => {
    switch (role) {
      case 'student':
        return GraduationCap;
      case 'parent':
        return Users;
      case 'teacher':
        return UserCheck;
      case 'principal':
        return Building;
      default:
        return Users;
    }
  };

  const getRoleColorBadge = (role?: UserRole) => {
    switch (role) {
      case 'student':
        return isDarkMode ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-emerald-100 text-emerald-900 border-emerald-300 font-bold';
      case 'parent':
        return isDarkMode ? 'bg-teal-500/20 text-teal-300 border-teal-500/30' : 'bg-teal-100 text-teal-900 border-teal-300 font-bold';
      case 'teacher':
        return isDarkMode ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' : 'bg-amber-100 text-amber-900 border-amber-300 font-bold';
      case 'principal':
        return isDarkMode ? 'bg-purple-500/20 text-purple-300 border-purple-500/30' : 'bg-purple-100 text-purple-900 border-purple-300 font-bold';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const CurrentRoleIcon = getRoleIcon(currentUser?.role);

  const t = getTranslations(selectedLanguage);

  return (
    <header className={`sticky top-0 z-40 transition-colors border-b backdrop-blur-md ${
      isDarkMode
        ? 'bg-slate-950/90 border-slate-800/80 text-slate-100'
        : 'bg-[#faf8f5]/95 border-slate-200/90 text-slate-900 shadow-2xs'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5">
        <div className="flex items-center justify-between gap-3">
          {/* Logo & School Campus Identity */}
          <div className="flex items-center space-x-3">
            <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-tr from-slate-900 via-indigo-950 to-indigo-900 flex items-center justify-center text-white shadow-md border border-indigo-500/30 shrink-0">
              <School className="w-5 h-5 text-amber-300" />
              <div className="absolute -bottom-1 -right-1">
                <AnimatedPen size="sm" isWriting={true} className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className={`font-black text-base sm:text-lg tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>
                  {t.appTitle}
                </h1>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border flex items-center gap-1.5 ${
                  isDarkMode ? 'bg-amber-500/10 text-amber-300 border-amber-500/30' : 'bg-amber-50 text-amber-900 border-amber-200'
                }`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  <span>{t.campusBadge}</span>
                </span>
              </div>
              <p className={`text-[11px] hidden sm:block ${isDarkMode ? 'text-slate-400' : 'text-slate-600 font-medium'}`}>
                <span className="font-semibold text-indigo-600 dark:text-indigo-400">{t.appSubtitle}</span> • <em>"{t.motto}"</em>
              </p>
            </div>
          </div>

          {/* Campus Live Clock & Period Indicator (Center / Right on md screens) */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
            <Clock className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{currentTime}</span>
            <span className="text-slate-400">•</span>
            <span className="text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              {t.periodText}
            </span>
          </div>

          {/* Right Action Controls: Role Switcher, Language, Notification, Theme, Dev Tools */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Top Navigation Global Role Switcher */}
            <div className="relative" ref={roleDropdownRef}>
              <button
                onClick={() => setIsRoleMenuOpen(!isRoleMenuOpen)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border flex items-center gap-2 transition-all shadow-xs cursor-pointer ${
                  isDarkMode
                    ? 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-200'
                    : 'bg-white hover:bg-slate-50 border-slate-300 text-slate-900'
                }`}
                title={t.switchRole}
              >
                <div className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold border ${getRoleColorBadge(currentUser?.role)}`}>
                  <CurrentRoleIcon className="w-3.5 h-3.5" />
                </div>
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-xs font-black truncate max-w-[110px]">{currentUser?.name || 'Rahul Sharma'}</span>
                  <span className="text-[9px] uppercase font-mono tracking-wider font-bold text-indigo-600 dark:text-indigo-400">
                    {currentUser?.role === 'student' ? t.roleStudent : currentUser?.role === 'parent' ? t.roleParent : currentUser?.role === 'teacher' ? t.roleFaculty : t.rolePrincipal}
                  </span>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isRoleMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Role Dropdown */}
              {isRoleMenuOpen && (
                <div className={`absolute right-0 mt-2 w-72 sm:w-80 rounded-2xl border-2 shadow-2xl z-50 p-2.5 flex flex-col gap-1.5 ${
                  isDarkMode ? 'bg-slate-900 border-slate-700 text-slate-100 shadow-black/80' : 'bg-white border-slate-300 text-slate-900'
                }`}>
                  <div className="flex items-center justify-between pb-2 px-1 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-slate-100">
                      <Users className="w-3.5 h-3.5 text-indigo-600" />
                      <span>{t.switchRole}</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold">
                      {effectiveUsers.length} {t.personasReady}
                    </span>
                  </div>

                  <div className="max-h-64 overflow-y-auto space-y-1 pr-1">
                    {effectiveUsers.map((u) => {
                      const isSelected = currentUser?.userId === u.userId;
                      const RoleIcon = getRoleIcon(u.role);
                      const badgeClass = getRoleColorBadge(u.role);

                      return (
                        <button
                          key={u.userId}
                          onClick={() => {
                            onSwitchUser(u.userId);
                            setIsRoleMenuOpen(false);
                          }}
                          className={`w-full p-2 rounded-xl flex items-center justify-between text-left transition cursor-pointer border ${
                            isSelected
                              ? isDarkMode
                                ? 'bg-indigo-900/40 text-indigo-200 border-indigo-500/60 font-bold'
                                : 'bg-indigo-50 text-indigo-950 border-indigo-300 font-bold'
                              : isDarkMode
                                ? 'hover:bg-slate-800/80 text-slate-200 border-transparent'
                                : 'hover:bg-slate-100 text-slate-800 border-transparent'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                              isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-white border-slate-300 text-slate-700'
                            }`}>
                              <RoleIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs font-bold truncate text-slate-900 dark:text-slate-100">{u.name}</p>
                              <div className="flex items-center gap-1.5 mt-0.5">
                                <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono font-bold border ${badgeClass}`}>
                                  {u.role.toUpperCase()}
                                </span>
                                <span className="text-[10px] text-slate-400 truncate">
                                  {u.assignedClass ? u.assignedClass : u.childrenIds ? 'Parent' : u.role === 'principal' ? 'Admin' : 'Student'}
                                </span>
                              </div>
                            </div>
                          </div>

                          {isSelected && (
                            <Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 ml-2" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Language Selector */}
            <div className={`flex items-center rounded-xl p-1 border ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-2xs'
            }`}>
              <Globe className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 ml-1.5 mr-1 shrink-0" />
              <select
                id="language-select"
                value={selectedLanguage}
                onChange={(e) => onSelectLanguage(e.target.value)}
                className="bg-transparent text-xs font-semibold focus:outline-hidden py-0.5 pr-2 cursor-pointer max-w-[100px] sm:max-w-[130px] truncate"
                title="Select language"
              >
                {SUPPORTED_LANGUAGES.map((l) => (
                  <option key={l.code} value={l.name} className={isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>
                    {l.native} ({l.name})
                  </option>
                ))}
              </select>
            </div>

            {/* Notification Center */}
            <NotificationCenter
              isDarkMode={isDarkMode}
              onSelectActionPrompt={onSendPrompt}
            />

            {/* Dark / Light Theme Toggle */}
            {onToggleTheme && (
              <button
                onClick={onToggleTheme}
                title={isDarkMode ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
                className={`p-2 rounded-xl border transition-all flex items-center justify-center cursor-pointer ${
                  isDarkMode
                    ? 'bg-slate-900 border-slate-800 hover:bg-slate-800 text-amber-400'
                    : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700 shadow-2xs'
                }`}
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            )}

            {/* Developer & System Tools Dropdown */}
            <DeveloperSystemMenu
              isDarkMode={isDarkMode}
              showDebug={showDebug}
              onToggleDebug={onToggleDebug}
              onOpenSecurity={onOpenSecurityCenter}
              onOpenAudit={onOpenAuditLogs}
              onOpenDatabase={onOpenDatabase}
              onOpenTestSuite={onOpenTestRunner}
              onClearMemory={onClearSession}
            />
          </div>
        </div>
      </div>
    </header>
  );
};
