import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  CheckSquare, 
  Square, 
  Plus, 
  Pin, 
  Bookmark, 
  Tag, 
  Clock,
  Layers,
  ChevronRight,
  HelpCircle,
  Share2
} from 'lucide-react';
import { AnimatedPen } from './AnimatedPen';
import { SupportedLanguage } from '../../i18n/localization';
import { getPortalTranslations } from '../../i18n/portalTranslations';

interface RuledNotebookProps {
  isDarkMode?: boolean;
  onAskAi?: (prompt: string) => void;
  selectedLanguage?: SupportedLanguage;
}

interface NoteEntry {
  id: string;
  title: string;
  category: string;
  date: string;
  bullets: string[];
  stickyTip?: string;
}

export const RuledNotebook: React.FC<RuledNotebookProps> = ({
  isDarkMode = false,
  onAskAi,
  selectedLanguage = 'en'
}) => {
  const t = getPortalTranslations(selectedLanguage).notebook;

  const defaultNotes: NoteEntry[] = [
    {
      id: '1',
      title: 'Chapter 4: Quadratic Equations & Roots',
      category: 'Mathematics',
      date: 'Today, 10:30 AM',
      bullets: [
        'Standard Form: ax² + bx + c = 0 (where a ≠ 0)',
        'Discriminant D = b² - 4ac determines nature of roots:',
        '  • If D > 0 ➔ 2 distinct real roots: x = (-b ± √D) / 2a',
        '  • If D = 0 ➔ 2 equal real roots: x = -b / 2a',
        '  • If D < 0 ➔ No real roots (Complex conjugate pair)',
        'CBSE Repeated Question: Word problems on train speeds & tap filling.'
      ],
      stickyTip: '★ Pro Tip: Always check if coefficient "a" can be simplified first!'
    },
    {
      id: '2',
      title: 'Light: Reflection & Spherical Mirrors',
      category: 'Physics',
      date: 'Yesterday',
      bullets: [
        'Mirror Formula: 1/f = 1/v + 1/u',
        'Magnification: m = -v/u = h₂/h₁',
        'Concave Mirror: Real, inverted (except when object is between P and F ➔ Virtual, erect).',
        'Convex Mirror: Always virtual, erect, and diminished (used in rear-view mirrors).'
      ],
      stickyTip: '★ Sign Convention: Distances measured in direction of incident ray are POSITIVE.'
    },
    {
      id: '3',
      title: 'CBSE 75% Attendance Golden Rulebook',
      category: 'Attendance Strategy',
      date: 'Term 1 Strategy',
      bullets: [
        'Current Attendance: 91.3% (Total 21 / 23 Days Marked)',
        'Remaining Term Target: Maintain minimum 80% for internal practicals waiver.',
        'Medical Leaves: Submit stamped doctor certificate within 48h of resuming.',
        'Action Point: Log weekly sync with Mrs. Rao to verify absence waivers.'
      ],
      stickyTip: '★ Buffer Alert: You have 4 safe absence credits remaining this quarter.'
    }
  ];

  const notesList: NoteEntry[] = (t.notes && t.notes.length > 0) ? t.notes : defaultNotes;

  const [activeNoteId, setActiveNoteId] = useState<string>(notesList[0]?.id || '1');
  const [isWritingWithPen, setIsWritingWithPen] = useState(false);
  const [newNoteText, setNewNoteText] = useState('');
  const [checkedTaskIds, setCheckedTaskIds] = useState<Record<string, boolean>>({
    t1: true,
    t4: true
  });

  const taskItems = t.tasks || [
    { id: 't1', text: 'Solve Exercise 4.2 Quadratic Equations (Q1 to Q10)' },
    { id: 't2', text: 'Draw Ray Diagrams for Concave Mirror in Physics Journal' },
    { id: 't3', text: 'Prepare Revision Flashcards for Chemistry Periodic Trends' },
    { id: 't4', text: 'Verify Attendance Ledger with Class Teacher Mrs. Rao' }
  ];

  const activeNote = notesList.find((n) => n.id === activeNoteId) || notesList[0] || defaultNotes[0];

  const handleAsk = (prompt: string) => {
    if (onAskAi) onAskAi(prompt);
  };

  const handleToggleTask = (id: string) => {
    setCheckedTaskIds((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleAddQuickNote = () => {
    if (!newNoteText.trim()) return;
    setIsWritingWithPen(true);
    setTimeout(() => {
      setIsWritingWithPen(false);
      setNewNoteText('');
    }, 800);
  };

  const completedCount = taskItems.filter((task) => checkedTaskIds[task.id]).length;

  return (
    <div className={`relative rounded-3xl p-5 sm:p-7 border shadow-xl transition-all ${
      isDarkMode 
        ? 'bg-slate-900 border-slate-700/80 text-slate-100' 
        : 'bg-white border-slate-300 text-slate-900'
    }`}>
      {/* Notebook Header Bar with Fountain Pen badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 shadow-md">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-base sm:text-lg tracking-tight font-handwriting text-2xl leading-none">
                {t.title}
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700">
                {t.studyJournal || 'Study Journal'}
              </span>
            </div>
            <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              {t.subtitle}
            </p>
          </div>
        </div>

        {/* Live Writing Pen Status */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60">
            <AnimatedPen isWriting={isWritingWithPen} size="sm" />
            <span className="text-xs font-handwriting text-amber-800 dark:text-amber-300 font-bold">
              {isWritingWithPen ? 'Ink Scribing...' : 'Pen Ready'}
            </span>
          </div>

          <button
            onClick={() => handleAsk(`Summarize and explain the study notes for ${activeNote.title}`)}
            className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm flex items-center gap-1.5 transition cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.explainWithAi || 'Explain with AI'}</span>
          </button>
        </div>
      </div>

      {/* Main Notebook Grid: Left Spiral Binder Paper + Right Interactive Sticky Homework */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: Spiral Bound Ruled Notebook Page (8 cols) */}
        <div className="lg:col-span-8 relative">
          {/* Spiral Ring Binder Edge (Left vertical decoration) */}
          <div className="absolute -left-3 sm:-left-4 top-4 bottom-4 w-6 flex flex-col justify-around z-20 pointer-events-none">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="flex items-center">
                {/* Paper hole */}
                <div className="w-2.5 h-2.5 rounded-full bg-slate-800/40 shadow-inner" />
                {/* Metal Silver Coil */}
                <div className="w-4 h-1.5 -ml-1 rounded-full bg-gradient-to-r from-slate-400 via-white to-slate-500 shadow-md transform -rotate-12" />
              </div>
            ))}
          </div>

          {/* Actual Ruled Paper Surface */}
          <div className="notebook-ruled-paper rounded-2xl p-6 sm:p-8 pl-12 sm:pl-16 border border-slate-300 dark:border-slate-700 shadow-md min-h-[380px] relative overflow-hidden">
            {/* Paper Corner Fold Bookmark */}
            <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-slate-300 dark:from-slate-700 to-transparent shadow-xs pointer-events-none" />

            {/* Note Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 mb-3">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-rose-500 dark:text-rose-400">
                  {activeNote.category} • {activeNote.date}
                </span>
                <h4 className="font-handwriting text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 leading-tight">
                  {activeNote.title}
                </h4>
              </div>

              {/* Note Selector Tabs */}
              <div className="flex gap-1.5 overflow-x-auto pb-1">
                {notesList.map((n, idx) => (
                  <button
                    key={n.id}
                    onClick={() => {
                      setIsWritingWithPen(true);
                      setActiveNoteId(n.id);
                      setTimeout(() => setIsWritingWithPen(false), 400);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-handwriting font-bold transition cursor-pointer ${
                      activeNoteId === n.id
                        ? 'bg-rose-500 text-white shadow-xs'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300'
                    }`}
                  >
                    Pg {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Ruled Lines Content with Animated Pen Scribing */}
            <div className="space-y-1 pt-1 font-handwriting text-lg sm:text-xl text-slate-800 dark:text-slate-200">
              {activeNote.bullets.map((bullet, idx) => (
                <p key={idx} className="leading-[28px] drop-shadow-xs">
                  {bullet}
                </p>
              ))}
            </div>

            {/* Yellow Sticky Note pinned with washi tape at bottom right */}
            {activeNote.stickyTip && (
              <div className="mt-6 p-3 rounded-lg bg-yellow-100 dark:bg-yellow-950/80 text-yellow-900 dark:text-yellow-200 border-l-4 border-yellow-400 shadow-md font-handwriting text-base sm:text-lg transform rotate-[-1deg] relative">
                {/* Washi Tape Strip */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-3.5 bg-rose-300/80 dark:bg-rose-500/50 rounded-xs shadow-xs" />
                <p>{activeNote.stickyTip}</p>
              </div>
            )}

            {/* Quick Scribe New Bullet to this Notebook */}
            <div className="mt-6 pt-4 border-t border-slate-300/80 dark:border-slate-700/80 flex items-center gap-2">
              <input
                type="text"
                value={newNoteText}
                onChange={(e) => setNewNoteText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddQuickNote()}
                placeholder={t.addNotePlaceholder || 'Write a quick study note...'}
                className="flex-1 px-3 py-1.5 rounded-lg bg-white/80 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700 text-sm font-handwriting text-base focus:outline-hidden focus:ring-2 focus:ring-rose-400"
              />
              <button
                onClick={handleAddQuickNote}
                className="px-3 py-1.5 rounded-lg bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold flex items-center gap-1 shadow-xs cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{t.aiScribeBtn || 'Add with Pen'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Homework Checklist & Sticky Pad (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Homework Checklist on Grid Paper */}
          <div className={`p-5 rounded-2xl border shadow-sm ${
            isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Bookmark className="w-4 h-4 text-amber-500" />
                <h4 className="font-bold text-sm tracking-tight font-handwriting text-xl">
                  {t.taskChecklist || 'Study Tasks & Checklist'}
                </h4>
              </div>
              <span className="text-[11px] font-mono text-emerald-500 font-bold">
                {completedCount}/{taskItems.length} Done
              </span>
            </div>

            <div className="space-y-2.5">
              {taskItems.map((task) => {
                const isDone = !!checkedTaskIds[task.id];
                return (
                  <div
                    key={task.id}
                    onClick={() => handleToggleTask(task.id)}
                    className={`p-2.5 rounded-xl border flex items-start gap-2.5 transition cursor-pointer select-none ${
                      isDone
                        ? isDarkMode 
                          ? 'bg-slate-900/60 border-slate-800 text-slate-500 line-through' 
                          : 'bg-emerald-50/60 border-emerald-200 text-slate-500 line-through'
                        : isDarkMode
                          ? 'bg-slate-900 border-slate-700/80 text-slate-200 hover:border-amber-500'
                          : 'bg-white border-slate-200 text-slate-800 hover:border-amber-400 shadow-2xs'
                    }`}
                  >
                    {isDone ? (
                      <CheckSquare className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    )}
                    <span className="text-xs font-handwriting text-base leading-snug">
                      {task.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Lavender Sticky Note: Teacher Advice */}
          <div className="p-4 rounded-2xl bg-purple-100 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 text-purple-950 dark:text-purple-200 shadow-md font-handwriting text-lg transform rotate-1">
            <div className="flex items-center gap-1.5 mb-1 font-bold text-purple-800 dark:text-purple-300">
              <Pin className="w-3.5 h-3.5" />
              <span>Teacher Pro-Tip</span>
            </div>
            <p className="text-sm sm:text-base leading-relaxed">
              Maintain consistent attendance of at least 80% to qualify for CBSE practical waivers and hall tickets without impediment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
