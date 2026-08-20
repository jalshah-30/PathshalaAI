import React, { useState, useRef, useEffect } from 'react';
import { 
  GraduationCap, 
  Users, 
  ChevronDown, 
  Check, 
  Search, 
  Sparkles, 
  ShieldCheck,
  Building,
  UserCheck,
  QrCode,
  CreditCard,
  School,
  Award,
  Crown,
  Briefcase
} from 'lucide-react';
import { AuthUser, UserRole } from '../../types';
import { getTranslations } from '../../i18n/localization';

interface StudentProfileHeaderProps {
  currentUser: AuthUser | null;
  availableUsers: AuthUser[];
  onSwitchUser: (userId: string) => void;
  isDarkMode?: boolean;
  selectedLanguage?: string;
}

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

export const StudentProfileHeader: React.FC<StudentProfileHeaderProps> = ({
  currentUser,
  availableUsers = [],
  onSwitchUser,
  isDarkMode = false,
  selectedLanguage = 'English'
}) => {
  const t = getTranslations(selectedLanguage);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | UserRole>('all');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Combine and deduplicate availableUsers with DEFAULT_DEMO_USERS
  const allUsersMap = new Map<string, AuthUser>();
  DEFAULT_DEMO_USERS.forEach((u) => allUsersMap.set(u.userId, u));
  availableUsers.forEach((u) => allUsersMap.set(u.userId, u));
  const effectiveUsers = Array.from(allUsersMap.values());

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredUsers = effectiveUsers.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.assignedClass && u.assignedClass.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;

    return matchesSearch && matchesRole;
  });

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

  const getRoleBadgeStyle = (role?: UserRole) => {
    switch (role) {
      case 'student':
        return isDarkMode 
          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' 
          : 'bg-emerald-100 text-emerald-900 border-emerald-300 font-bold';
      case 'parent':
        return isDarkMode 
          ? 'bg-teal-500/20 text-teal-300 border-teal-500/30' 
          : 'bg-teal-100 text-teal-900 border-teal-300 font-bold';
      case 'teacher':
        return isDarkMode 
          ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' 
          : 'bg-amber-100 text-amber-900 border-amber-300 font-bold';
      case 'principal':
        return isDarkMode 
          ? 'bg-purple-500/20 text-purple-300 border-purple-500/30' 
          : 'bg-purple-100 text-purple-900 border-purple-300 font-bold';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const Icon = getRoleIcon(currentUser?.role);

  return (
    <div className="relative pt-2 overflow-visible">
      {/* Top Lanyard Clip slot */}
      <div className="flex justify-center -mb-2 relative z-20 pointer-events-none">
        <div className="w-14 h-4 rounded-t-md bg-gradient-to-r from-slate-400 via-slate-200 to-slate-400 dark:from-slate-700 dark:via-slate-500 dark:to-slate-700 flex items-center justify-center shadow-xs">
          <div className="w-8 h-1.5 rounded-full bg-slate-800 dark:bg-slate-950 shadow-inner" />
        </div>
      </div>

      {/* Main Student Smart ID Card Container with overflow-visible to prevent clipping */}
      <div
        className={`rounded-3xl p-5 sm:p-6 border-2 transition-all relative overflow-visible shadow-lg ${
          isDarkMode
            ? 'bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-slate-700/80 text-slate-100'
            : 'bg-gradient-to-b from-white via-slate-50/80 to-amber-50/30 border-slate-300/90 text-slate-900'
        }`}
      >
        {/* Subtle Watermark School Seal Background (Contained in its own clipped layer) */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
          <div className="absolute right-4 -bottom-6 opacity-5 dark:opacity-10">
            <School className="w-48 h-48" />
          </div>
        </div>

        {/* Card Header: School Name & Session */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-200 dark:border-slate-800 relative z-10">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-lg bg-indigo-900 dark:bg-indigo-700 text-white flex items-center justify-center font-black text-[10px] shadow-xs">
              PS
            </div>
            <div>
              <h4 className="text-xs font-black tracking-wider uppercase text-indigo-950 dark:text-indigo-200">
                {t.appSubtitle}
              </h4>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                {t.cbseAffiliation}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-700">
              {t.campusSmartId}
            </span>
          </div>
        </div>

        {/* Card Body: Student Photo + Metadata + RFID + Persona Switcher */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative z-20">
          {/* Left: Student Photo Avatar + Specs */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            {/* Student ID Photo Box */}
            <div className="relative shrink-0 self-start sm:self-auto">
              <div className={`w-20 h-24 rounded-2xl flex flex-col items-center justify-center font-bold text-lg shadow-md border-2 ${
                isDarkMode
                  ? 'bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 text-indigo-200 border-indigo-500/40'
                  : 'bg-gradient-to-br from-indigo-50 via-white to-blue-50 text-indigo-800 border-indigo-300'
              }`}>
                <div className="w-12 h-12 rounded-xl bg-indigo-600/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-1">
                  <Icon className="w-7 h-7" />
                </div>
                <span className="text-[10px] uppercase font-mono tracking-wider font-bold">
                  {currentUser?.role === 'principal' ? t.rolePrincipal : currentUser?.role === 'teacher' ? t.roleFaculty : currentUser?.role === 'parent' ? t.roleParent : t.roleStudent}
                </span>
              </div>

              <div className="absolute -bottom-2 -right-2 bg-emerald-600 text-white rounded-full p-1 shadow-md border-2 border-white dark:border-slate-900" title={t.verifiedBiometric}>
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Student Core Credentials */}
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-2">
                  <span>{currentUser?.name || 'Rahul Sharma'}</span>
                </h3>
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase border tracking-wider ${getRoleBadgeStyle(currentUser?.role)}`}>
                  {currentUser?.role === 'principal' ? t.principalRole : currentUser?.role === 'teacher' ? t.facultyMember : currentUser?.role === 'parent' ? t.registeredParent : t.activeStudent}
                </span>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                ID: <strong className="text-slate-800 dark:text-slate-200">{currentUser?.associatedId || currentUser?.userId || 'STU-101'}</strong> • {t.rollNo}: <strong className="text-slate-800 dark:text-slate-200">101</strong> • {t.className}: <strong className="text-indigo-600 dark:text-indigo-400 font-bold">{currentUser?.assignedClass || 'Class 10-A'}</strong>
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
                <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                  <span className="text-slate-400 font-medium">{t.house}:</span>
                  <span className="font-bold text-amber-600 dark:text-amber-400">{t.houseName}</span>
                </div>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                  <span className="text-slate-400 font-medium">{t.bloodGroup}:</span>
                  <span className="font-bold text-rose-600 dark:text-rose-400">{t.bloodGroupVal}</span>
                </div>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                  <span className="text-slate-400 font-medium">{t.emergencyContact}:</span>
                  <span className="font-mono font-semibold">+91 98765 43210</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Gold Holographic RFID Chip + Barcode + Switch User */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-3 shrink-0">
            {/* Holographic Chip & Barcode Strip */}
            <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-950/80 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-inner">
              {/* Gold Smart RFID Chip */}
              <div className="w-9 h-7 rounded-sm rfid-chip flex flex-col justify-around p-0.5" title={t.verifiedBiometric}>
                <div className="border-b border-amber-900/40 w-full" />
                <div className="border-b border-amber-900/40 w-full" />
              </div>

              {/* Faux Barcode & ID text */}
              <div className="flex flex-col items-start">
                <div className="flex space-x-0.5 h-4 items-end opacity-80">
                  {[2, 1, 3, 1, 2, 4, 1, 3, 2, 1, 2, 3, 1, 4, 2].map((w, i) => (
                    <span
                      key={i}
                      className="bg-slate-900 dark:bg-slate-200"
                      style={{ width: `${w}px`, height: '100%' }}
                    />
                  ))}
                </div>
                <span className="font-mono text-[9px] text-slate-500 font-bold">
                  {currentUser?.associatedId || currentUser?.userId || 'STU-101-2025'}
                </span>
              </div>
            </div>

            {/* Profile Persona Switcher Dropdown */}
            <div className="relative w-full sm:w-auto" ref={dropdownRef}>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold border flex items-center justify-between gap-3 transition-all shadow-md cursor-pointer ${
                  isDarkMode
                    ? 'bg-slate-900 hover:bg-slate-800 border-indigo-500/50 text-slate-100 ring-2 ring-indigo-500/20'
                    : 'bg-indigo-50 hover:bg-indigo-100/80 border-indigo-300 text-indigo-950 font-black shadow-indigo-100'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                  <span className="whitespace-nowrap">{t.switchRole} ({effectiveUsers.length})</span>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Searchable & Categorized Role Dropdown Menu */}
              {isOpen && (
                <div 
                  className={`absolute right-0 top-full mt-2 w-80 sm:w-96 rounded-2xl border-2 shadow-2xl z-50 p-3 flex flex-col gap-2 ${
                    isDarkMode
                      ? 'bg-slate-900 border-slate-700 text-slate-100 shadow-black/80'
                      : 'bg-white border-slate-300 text-slate-900 shadow-2xl'
                  }`}
                  style={{ maxHeight: '480px' }}
                >
                  {/* Dropdown Header */}
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-1.5 text-xs font-bold">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                      <span>{t.availableRoles}</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold">
                      {effectiveUsers.length} {t.personasReady}
                    </span>
                  </div>

                  {/* Search input */}
                  <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs ${
                    isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <Search className="w-4 h-4 text-slate-400 shrink-0" />
                    <input
                      type="text"
                      placeholder={t.searchPlaceholder}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-transparent border-none outline-hidden text-xs w-full placeholder:text-slate-400 font-medium"
                      autoFocus
                    />
                  </div>

                  {/* Role Category Filter Tabs */}
                  <div className="flex items-center gap-1 overflow-x-auto pb-1 text-[11px] font-bold">
                    <button
                      onClick={() => setRoleFilter('all')}
                      className={`px-2.5 py-1 rounded-lg border transition whitespace-nowrap cursor-pointer ${
                        roleFilter === 'all'
                          ? 'bg-indigo-600 text-white border-indigo-700'
                          : isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
                      }`}
                    >
                      {t.allFilter} ({effectiveUsers.length})
                    </button>
                    <button
                      onClick={() => setRoleFilter('student')}
                      className={`px-2.5 py-1 rounded-lg border transition whitespace-nowrap cursor-pointer ${
                        roleFilter === 'student'
                          ? 'bg-emerald-600 text-white border-emerald-700'
                          : isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
                      }`}
                    >
                      🎓 {t.roleStudent}
                    </button>
                    <button
                      onClick={() => setRoleFilter('parent')}
                      className={`px-2.5 py-1 rounded-lg border transition whitespace-nowrap cursor-pointer ${
                        roleFilter === 'parent'
                          ? 'bg-teal-600 text-white border-teal-700'
                          : isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
                      }`}
                    >
                      👨‍👩‍👧 {t.roleParent}
                    </button>
                    <button
                      onClick={() => setRoleFilter('teacher')}
                      className={`px-2.5 py-1 rounded-lg border transition whitespace-nowrap cursor-pointer ${
                        roleFilter === 'teacher'
                          ? 'bg-amber-600 text-white border-amber-700'
                          : isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
                      }`}
                    >
                      👩‍🏫 {t.roleFaculty}
                    </button>
                    <button
                      onClick={() => setRoleFilter('principal')}
                      className={`px-2.5 py-1 rounded-lg border transition whitespace-nowrap cursor-pointer ${
                        roleFilter === 'principal'
                          ? 'bg-purple-600 text-white border-purple-700'
                          : isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
                      }`}
                    >
                      🏛️ {t.rolePrincipal}
                    </button>
                  </div>

                  {/* List of Personas with Smooth Scroll */}
                  <div className="overflow-y-auto max-h-72 space-y-1.5 pr-1">
                    {filteredUsers.length === 0 ? (
                      <div className="py-6 text-center text-xs text-slate-400">
                        No persona matching "{searchQuery}"
                      </div>
                    ) : (
                      filteredUsers.map((user) => {
                        const isSelected = currentUser?.userId === user.userId;
                        const UserIcon = getRoleIcon(user.role);
                        const badgeStyle = getRoleBadgeStyle(user.role);

                        return (
                          <button
                            key={user.userId}
                            onClick={() => {
                              onSwitchUser(user.userId);
                              setIsOpen(false);
                            }}
                            className={`w-full p-2.5 rounded-xl flex items-center justify-between text-left transition cursor-pointer border ${
                              isSelected
                                ? isDarkMode
                                  ? 'bg-indigo-900/40 text-indigo-100 border-indigo-500 ring-1 ring-indigo-500'
                                  : 'bg-indigo-50 text-indigo-950 border-indigo-300 ring-1 ring-indigo-300 font-bold'
                                : isDarkMode
                                  ? 'bg-slate-950/40 hover:bg-slate-800 text-slate-200 border-slate-800/80'
                                  : 'bg-slate-50/70 hover:bg-slate-100 text-slate-800 border-slate-200'
                            }`}
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold border shadow-xs ${
                                isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-white border-slate-300 text-slate-800'
                              }`}>
                                <UserIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                              </div>
                              <div className="min-w-0">
                                <div className="flex items-center gap-1.5">
                                  <p className="text-xs font-bold truncate text-slate-900 dark:text-slate-100">{user.name}</p>
                                  <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono font-bold border ${badgeStyle}`}>
                                    {user.role.toUpperCase()}
                                  </span>
                                </div>
                                <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                                  {user.assignedClass ? `Assigned: ${user.assignedClass}` : user.childrenIds ? `Parent of: Rahul & Rohan` : user.role === 'principal' ? 'Head of School' : 'Class 10-A Student'} • {user.email}
                                </p>
                              </div>
                            </div>

                            {isSelected ? (
                              <div className="p-1 rounded-full bg-indigo-600 text-white shrink-0 ml-2 shadow-xs">
                                <Check className="w-3.5 h-3.5" />
                              </div>
                            ) : (
                              <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold shrink-0 ml-2 opacity-0 group-hover:opacity-100">
                                Select
                              </span>
                            )}
                          </button>
                        );
                      })
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
