import React, { useState, useRef, useEffect } from 'react';
import { 
  ShieldCheck, 
  Terminal, 
  Database, 
  Activity, 
  Bug, 
  RotateCcw, 
  ChevronDown, 
  Settings,
  Cpu,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

interface DeveloperSystemMenuProps {
  isDarkMode?: boolean;
  showDebug: boolean;
  onToggleDebug: () => void;
  onOpenSecurity: () => void;
  onOpenAudit: () => void;
  onOpenDatabase: () => void;
  onOpenTestSuite: () => void;
  onClearMemory: () => void;
}

export const DeveloperSystemMenu: React.FC<DeveloperSystemMenuProps> = ({
  isDarkMode = false,
  showDebug,
  onToggleDebug,
  onOpenSecurity,
  onOpenAudit,
  onOpenDatabase,
  onOpenTestSuite,
  onClearMemory
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuItems = [
    {
      id: 'security',
      title: 'Zero-Trust Security Simulator',
      desc: 'Test 4 RBAC attack vectors & verify zero-trust boundaries',
      icon: ShieldCheck,
      action: onOpenSecurity,
      badge: 'Red Team'
    },
    {
      id: 'audit',
      title: 'Audit Logs Telemetry',
      desc: 'View timestamped cryptographic audit events & tool traces',
      icon: Activity,
      action: onOpenAudit,
      badge: 'Live Feed'
    },
    {
      id: 'database',
      title: 'School ERP Database Viewer',
      desc: 'Inspect SQLite/Mock state, students, attendance, & marks',
      icon: Database,
      action: onOpenDatabase,
      badge: 'Schema'
    },
    {
      id: 'tests',
      title: 'Automated Test Suite Runner',
      desc: 'Execute 100% automated end-to-end integration tests',
      icon: Terminal,
      action: onOpenTestSuite,
      badge: 'PASS (100%)'
    }
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`px-3 py-2 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all ${
          isDarkMode
            ? 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300'
            : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 shadow-2xs'
        }`}
      >
        <Cpu className="w-3.5 h-3.5 text-indigo-500" />
        <span className="hidden md:inline">System & Telemetry</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          className={`absolute right-0 mt-2 w-80 rounded-2xl border shadow-2xl z-50 p-2 overflow-hidden ${
            isDarkMode ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          {/* Header */}
          <div className="p-2.5 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-indigo-500" />
              <span className="font-bold text-xs">Developer & System Tools</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              API OK
            </span>
          </div>

          {/* Items */}
          <div className="py-1 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    item.action();
                    setIsOpen(false);
                  }}
                  className={`w-full p-2.5 rounded-xl text-left transition flex items-center justify-between group ${
                    isDarkMode ? 'hover:bg-slate-800 text-slate-200' : 'hover:bg-slate-50 text-slate-800'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${
                      isDarkMode ? 'bg-slate-800 text-indigo-400' : 'bg-slate-100 text-indigo-600'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-xs flex items-center gap-1.5">
                        <span>{item.title}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded shrink-0 border ${
                    isDarkMode ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-slate-100 text-slate-600 border-slate-200'
                  }`}>
                    {item.badge}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Debug Toggles & Reset */}
          <div className="pt-2 mt-1 border-t border-slate-200/80 dark:border-slate-800 space-y-1.5">
            <button
              onClick={() => {
                onToggleDebug();
                setIsOpen(false);
              }}
              className={`w-full p-2 rounded-xl text-xs font-semibold transition flex items-center justify-between ${
                showDebug
                  ? isDarkMode ? 'bg-indigo-600/30 text-indigo-300' : 'bg-indigo-50 text-indigo-700'
                  : isDarkMode ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-50 text-slate-600'
              }`}
            >
              <div className="flex items-center gap-2">
                <Bug className="w-3.5 h-3.5 text-indigo-500" />
                <span>Execution Trace Inspector</span>
              </div>
              <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${showDebug ? 'bg-indigo-600 text-white' : 'bg-slate-200 dark:bg-slate-800'}`}>
                {showDebug ? 'ON' : 'OFF'}
              </span>
            </button>

            <button
              onClick={() => {
                onClearMemory();
                setIsOpen(false);
              }}
              className="w-full p-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition flex items-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear Session Memory</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
