import React, { useState, useRef, useEffect } from 'react';
import { 
  Bell, 
  Check, 
  Trash2, 
  TrendingDown, 
  BookOpen, 
  Target, 
  Sparkles, 
  CheckCircle2,
  Calendar,
  X
} from 'lucide-react';

export interface AppNotification {
  id: string;
  type: 'attendance' | 'assignment' | 'goal' | 'performance' | 'ai';
  title: string;
  message: string;
  timestamp: string;
  group: 'Today' | 'Yesterday' | 'Earlier';
  read: boolean;
  actionPrompt?: string;
}

interface NotificationCenterProps {
  isDarkMode?: boolean;
  onSelectActionPrompt?: (prompt: string) => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  isDarkMode = false,
  onSelectActionPrompt
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<AppNotification[]>([
    {
      id: 'n-1',
      type: 'attendance',
      title: 'Attendance Alert',
      message: 'Your 3-week attendance rate dipped to 80%. Consider maintaining 85%+ this week.',
      timestamp: '10 mins ago',
      group: 'Today',
      read: false,
      actionPrompt: 'Analyze my 3-week attendance trend'
    },
    {
      id: 'n-2',
      type: 'ai',
      title: 'AI Study Recommendation',
      message: 'New formula review cards ready for Quadratic Equations test.',
      timestamp: '2 hours ago',
      group: 'Today',
      read: false,
      actionPrompt: 'Give me practice questions on Quadratic Equations'
    },
    {
      id: 'n-3',
      type: 'goal',
      title: 'Milestone Unlocked 🔥',
      message: 'Congratulations! You achieved a 7-day consecutive attendance streak.',
      timestamp: 'Yesterday at 3:30 PM',
      group: 'Yesterday',
      read: true,
      actionPrompt: 'What badges and achievements have I unlocked?'
    },
    {
      id: 'n-4',
      type: 'performance',
      title: 'Science Lab Assessment',
      message: 'Physics lab score updated: 92/100 (+12% improvement).',
      timestamp: '2 days ago',
      group: 'Earlier',
      read: true,
      actionPrompt: 'Summarize my recent Science performance'
    }
  ]);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const handleMarkItemRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const getNotificationIcon = (type: AppNotification['type']) => {
    switch (type) {
      case 'attendance':
        return <TrendingDown className="w-4 h-4 text-amber-500" />;
      case 'assignment':
        return <BookOpen className="w-4 h-4 text-blue-500" />;
      case 'goal':
        return <Target className="w-4 h-4 text-emerald-500" />;
      case 'performance':
        return <CheckCircle2 className="w-4 h-4 text-purple-500" />;
      case 'ai':
      default:
        return <Sparkles className="w-4 h-4 text-indigo-500" />;
    }
  };

  const groups = ['Today', 'Yesterday', 'Earlier'] as const;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        title="Notifications"
        className={`relative p-2 rounded-xl border transition-all flex items-center justify-center ${
          isDarkMode
            ? 'bg-slate-900 border-slate-800 hover:bg-slate-800 text-slate-300'
            : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700 shadow-2xs'
        }`}
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div
          className={`absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl border shadow-2xl z-50 overflow-hidden flex flex-col ${
            isDarkMode ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          {/* Header */}
          <div className="p-3.5 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm">Notifications</h3>
              {unreadCount > 0 && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                  {unreadCount} new
                </span>
              )}
            </div>

            <div className="flex items-center gap-1">
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllRead}
                  className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline px-2 py-1"
                >
                  Mark read
                </button>
              )}
              <button
                onClick={handleClearAll}
                title="Clear all notifications"
                className="p-1 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* List Area */}
          <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60 p-1">
            {notifications.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-500">
                No notifications right now.
              </div>
            ) : (
              groups.map((group) => {
                const groupItems = notifications.filter((n) => n.group === group);
                if (groupItems.length === 0) return null;

                return (
                  <div key={group} className="p-1">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 py-1">
                      {group}
                    </div>
                    <div className="space-y-1">
                      {groupItems.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => handleMarkItemRead(item.id)}
                          className={`p-2.5 rounded-xl transition flex items-start gap-3 cursor-pointer ${
                            !item.read
                              ? isDarkMode
                                ? 'bg-indigo-950/30 hover:bg-indigo-950/50'
                                : 'bg-indigo-50/50 hover:bg-indigo-50/80'
                              : isDarkMode
                              ? 'hover:bg-slate-800/60'
                              : 'hover:bg-slate-50'
                          }`}
                        >
                          <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${
                            isDarkMode ? 'bg-slate-800' : 'bg-white shadow-2xs border border-slate-100'
                          }`}>
                            {getNotificationIcon(item.type)}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1">
                              <h4 className={`text-xs font-bold truncate ${
                                !item.read ? 'text-indigo-600 dark:text-indigo-400' : ''
                              }`}>
                                {item.title}
                              </h4>
                              <span className="text-[10px] text-slate-400 shrink-0">{item.timestamp}</span>
                            </div>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                              {item.message}
                            </p>

                            {item.actionPrompt && onSelectActionPrompt && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setIsOpen(false);
                                  onSelectActionPrompt(item.actionPrompt!);
                                }}
                                className="mt-1.5 inline-flex items-center text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline gap-1"
                              >
                                <span>Take Action</span>
                                <span>→</span>
                              </button>
                            )}
                          </div>

                          {!item.read && (
                            <span className="w-2 h-2 rounded-full bg-indigo-500 shrink-0 mt-1" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};
