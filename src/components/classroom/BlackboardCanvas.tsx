import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  RotateCcw, 
  Pencil, 
  Eraser, 
  BookOpen, 
  Layers, 
  Maximize2, 
  Minimize2,
  CheckCircle,
  HelpCircle,
  Lightbulb,
  Play,
  Pause
} from 'lucide-react';
import { SupportedLanguage } from '../../i18n/localization';
import { getPortalTranslations } from '../../i18n/portalTranslations';

interface BlackboardCanvasProps {
  isDarkMode?: boolean;
  onAskAi?: (prompt: string) => void;
  selectedLanguage?: SupportedLanguage;
}

export const BlackboardCanvas: React.FC<BlackboardCanvasProps> = ({
  isDarkMode = false,
  onAskAi,
  selectedLanguage = 'en'
}) => {
  const t = getPortalTranslations(selectedLanguage).blackboard;

  const defaultLessons = [
    {
      id: 'math',
      tabTitle: 'Maths',
      title: 'Quadratic Equations & Roots (Class 10)',
      subtitle: 'Standard Form: ax² + bx + c = 0 (a ≠ 0)',
      lines: [
        { text: 'Quadratic Formula: x = [-b ± √(b² - 4ac)] / 2a', color: 'chalk-yellow', indent: 0 },
        { text: 'Discriminant D = b² - 4ac', color: 'chalk-text', indent: 1 },
        { text: 'If D > 0 ➔ 2 Distinct Real Roots', color: 'chalk-cyan', indent: 1 },
        { text: 'If D = 0 ➔ 2 Equal Real Roots', color: 'chalk-pink', indent: 1 },
        { text: 'If D < 0 ➔ No Real Roots (Complex)', color: 'chalk-yellow', indent: 0 }
      ],
      doodle: 'triangle'
    },
    {
      id: 'physics',
      tabTitle: 'Physics',
      title: 'Optics: Concave Mirror Ray Tracing',
      subtitle: 'Mirror Formula: 1/f = 1/v + 1/u',
      lines: [
        { text: 'Object between C and F:', color: 'chalk-yellow', indent: 0 },
        { text: '• Ray 1: Parallel to Principal Axis ➔ passes through Focus (F)', color: 'chalk-cyan', indent: 1 },
        { text: '• Ray 2: Through Focus (F) ➔ emerges Parallel to Axis', color: 'chalk-text', indent: 1 },
        { text: 'Image Position: Beyond Center of Curvature (C)', color: 'chalk-text', indent: 1 },
        { text: 'Nature: Real, Inverted & Magnified (m > 1)', color: 'chalk-pink', indent: 0 }
      ],
      doodle: 'graph'
    },
    {
      id: 'attendance',
      tabTitle: 'CBSE AI',
      title: 'CBSE Attendance Compliance Metric',
      subtitle: 'Minimum Required Threshold: 75.0%',
      lines: [
        { text: 'Total Working Days: 23 | Present: 21 Days', color: 'chalk-cyan', indent: 0 },
        { text: 'Current Aggregate Attendance: 91.30%', color: 'chalk-yellow', indent: 1 },
        { text: 'Safety Buffer Margin: +16.30% above board minimum', color: 'chalk-text', indent: 1 },
        { text: 'Eligibility Status: HIGH DISTINCTION (Eligible for Board Exams)', color: 'chalk-pink', indent: 1 },
        { text: 'Risk Forecast: 0% risk of admit card withholding', color: 'chalk-yellow', indent: 0 }
      ],
      doodle: 'badge'
    },
    {
      id: 'sanskrit',
      tabTitle: 'Wisdom',
      title: 'Vedic Shloka & Wisdom: विद्या ददाति विनयं',
      subtitle: 'Ancient Educational Foundation',
      lines: [
        { text: 'विद्या ददाति विनयं विनयाद्याति पात्रताम् ।', color: 'chalk-yellow', indent: 0 },
        { text: 'पात्रत्वाद्धनमाप्नोति धनाद्धर्मं ततः सुखम् ॥', color: 'chalk-text', indent: 0 },
        { text: 'Knowledge bestows humility; from humility comes worthiness;', color: 'chalk-cyan', indent: 1 },
        { text: 'from worthiness comes prosperity, leading to righteousness and joy.', color: 'chalk-pink', indent: 1 }
      ],
      doodle: 'lotus'
    }
  ];

  const lessons = (t.lessons && t.lessons.length > 0) ? t.lessons : defaultLessons;

  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [displayedLineCount, setDisplayedLineCount] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isDrawingMode, setIsDrawingMode] = useState(false);
  const [selectedChalkColor, setSelectedChalkColor] = useState('#ffffff');
  const [isDusterWiping, setIsDusterWiping] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const currentLesson = lessons[activeLessonIndex] || defaultLessons[0];

  // Auto chalkboard writing animation loop
  useEffect(() => {
    if (!isPlaying || isDrawingMode) return;

    const timer = setInterval(() => {
      setDisplayedLineCount((prev) => {
        if (prev < currentLesson.lines.length) {
          return prev + 1;
        } else {
          return prev;
        }
      });
    }, 1400);

    return () => clearInterval(timer);
  }, [isPlaying, isDrawingMode, currentLesson]);

  // Handle lesson switch
  const handleSelectLesson = (idx: number) => {
    setIsDusterWiping(true);
    setTimeout(() => {
      setActiveLessonIndex(idx);
      setDisplayedLineCount(1);
      setIsDusterWiping(false);
    }, 400);
  };

  const handleAsk = (prompt: string) => {
    if (onAskAi) onAskAi(prompt);
  };

  // Canvas free-hand drawing logic for Slate Mode
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawingMode || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const x = (clientX - rect.left) * (canvas.width / rect.width);
    const y = (clientY - rect.top) * (canvas.height / rect.height);

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = selectedChalkColor;
    ctx.lineWidth = selectedChalkColor === 'erase' ? 24 : 3.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.shadowBlur = selectedChalkColor === 'erase' ? 0 : 3;
    ctx.shadowColor = selectedChalkColor === 'erase' ? 'transparent' : selectedChalkColor;
    ctx.globalCompositeOperation = selectedChalkColor === 'erase' ? 'destination-out' : 'source-over';

    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !isDrawingMode || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const x = (clientX - rect.left) * (canvas.width / rect.width);
    const y = (clientY - rect.top) * (canvas.height / rect.height);

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearDoodleCanvas = () => {
    setIsDusterWiping(true);
    setTimeout(() => {
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        }
      }
      setIsDusterWiping(false);
    }, 400);
  };

  return (
    <div className="relative rounded-3xl p-1 bg-gradient-to-b from-amber-800 via-amber-900 to-amber-950 shadow-xl border-4 border-amber-950/80 overflow-hidden">
      {/* Blackboard Wood Grain Texture Border */}
      <div className="relative rounded-[22px] bg-slate-950 overflow-hidden border-2 border-amber-800/40">
        {/* Top Blackboard Metal Clips & Title Bar */}
        <div className="bg-[#1c382b] px-4 sm:px-6 py-2.5 flex items-center justify-between border-b border-emerald-900/80 text-emerald-100">
          <div className="flex items-center space-x-3">
            <div className="flex space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-600/80 border border-amber-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 border border-emerald-300" />
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs sm:text-sm font-chalk font-bold tracking-wider text-emerald-200 uppercase">
                {t.title}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-700/60 text-emerald-300">
                {t.subtitle}
              </span>
            </div>
          </div>

          {/* Mode Switcher: Automated Lesson vs Interactive Slate */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsDrawingMode(!isDrawingMode)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                isDrawingMode
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/30'
                  : 'bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 border border-emerald-700/60'
              }`}
            >
              <Pencil className="w-3.5 h-3.5" />
              <span>{isDrawingMode ? (t.chalkDraw || 'Chalk Slate Mode') : (t.clearSlate || 'Interactive Slate')}</span>
            </button>

            {!isDrawingMode && (
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-1.5 rounded-lg bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 border border-emerald-700/60 cursor-pointer"
                title={isPlaying ? (t.pauseAnimation || 'Pause') : (t.playAnimation || 'Play')}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
            )}
          </div>
        </div>

        {/* Blackboard Main Writing Surface */}
        <div className="relative chalkboard-bg min-h-[300px] sm:min-h-[360px] p-6 sm:p-8 flex flex-col justify-between select-none">
          {/* Subtle Chalk Dust Ambient Floating Particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
            <div className="absolute top-1/4 left-1/6 w-1.5 h-1.5 rounded-full bg-white/30 animate-chalk-dust" />
            <div className="absolute top-2/3 left-3/4 w-1 h-1 rounded-full bg-yellow-200/40 animate-chalk-dust" style={{ animationDelay: '1.5s' }} />
            <div className="absolute top-1/2 left-1/3 w-2 h-2 rounded-full bg-cyan-200/30 animate-chalk-dust" style={{ animationDelay: '2.5s' }} />
            <div className="absolute top-1/6 right-1/4 w-1 h-1 rounded-full bg-pink-200/40 animate-chalk-dust" style={{ animationDelay: '0.8s' }} />
          </div>

          {/* Duster Wipe Animation Overlay */}
          {isDusterWiping && (
            <div className="absolute inset-0 bg-emerald-950/90 z-30 flex items-center justify-center animate-pulse transition-all">
              <div className="flex items-center gap-2 text-amber-200 font-chalk text-xl">
                <Eraser className="w-6 h-6 animate-bounce" />
                <span>{t.chalkErase || 'Erasing with Duster...'}</span>
              </div>
            </div>
          )}

          {/* MODE A: Automated Animated Chalk Lessons */}
          {!isDrawingMode ? (
            <div className="space-y-4 relative z-10">
              {/* Header Topic on Blackboard */}
              <div className="border-b border-emerald-800/60 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="font-chalk text-xl sm:text-2xl font-bold chalk-yellow tracking-wide">
                    {currentLesson.title}
                  </h3>
                  <p className="font-chalk text-xs sm:text-sm chalk-text opacity-75">
                    {currentLesson.subtitle}
                  </p>
                </div>

                {/* Subject Switcher Chalk Pills */}
                <div className="flex flex-wrap gap-1.5">
                  {lessons.map((lesson, idx) => (
                    <button
                      key={lesson.id}
                      onClick={() => handleSelectLesson(idx)}
                      className={`px-2.5 py-1 rounded-md text-xs font-chalk transition cursor-pointer ${
                        activeLessonIndex === idx
                          ? 'bg-emerald-700/80 text-yellow-200 border border-yellow-300/40 shadow-sm'
                          : 'bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-800/40'
                      }`}
                    >
                      {lesson.tabTitle || lesson.id.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Animated Lines Appearing with Chalk Scribe Motion */}
              <div className="space-y-3 pt-2 font-chalk text-base sm:text-lg">
                {currentLesson.lines.slice(0, displayedLineCount).map((line, idx) => (
                  <div
                    key={idx}
                    className={`flex items-start gap-2 transition-all duration-500 animate-fadeIn ${
                      line.indent === 1 ? 'ml-4 sm:ml-8' : ''
                    } ${line.color}`}
                  >
                    <span className="opacity-60 select-none">❯</span>
                    <span className="leading-relaxed drop-shadow-xs">{line.text}</span>
                    {idx === displayedLineCount - 1 && displayedLineCount < currentLesson.lines.length && (
                      <span className="inline-block w-2.5 h-5 bg-white/90 animate-pulse ml-1 align-middle rounded-xs" />
                    )}
                  </div>
                ))}
              </div>

              {/* Visual Math / Formula Geometry Doodle */}
              <div className="mt-4 pt-4 border-t border-emerald-900/50 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-chalk chalk-cyan">
                  <Sparkles className="w-4 h-4 text-yellow-300 animate-spin" style={{ animationDuration: '6s' }} />
                  <span>Interactive Blackboard Active</span>
                </div>

                <button
                  onClick={() => handleAsk(`Explain in detail the blackboard concept of: ${currentLesson.title}`)}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-800/70 hover:bg-emerald-700 text-yellow-200 text-xs font-chalk font-bold border border-yellow-400/30 flex items-center gap-1.5 transition shadow-sm cursor-pointer"
                >
                  <Lightbulb className="w-3.5 h-3.5 text-yellow-300" />
                  <span>{t.askExplain || 'Explain Step-by-Step with AI'}</span>
                </button>
              </div>
            </div>
          ) : (
            /* MODE B: Free-Hand Chalk Drawing Slate */
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-emerald-800/60 text-xs font-chalk">
                <span className="chalk-yellow">
                  Freehand Chalk Writing & Sketching Slate
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={clearDoodleCanvas}
                    className="px-2.5 py-1 rounded bg-rose-950/80 hover:bg-rose-900 text-rose-200 border border-rose-700/60 flex items-center gap-1 cursor-pointer"
                  >
                    <Eraser className="w-3 h-3" />
                    <span>{t.clearSlate || 'Wipe Slate'}</span>
                  </button>
                </div>
              </div>

              {/* Drawing Canvas */}
              <div className="relative flex-1 rounded-xl border border-emerald-800/40 overflow-hidden bg-black/20 touch-none">
                <canvas
                  ref={canvasRef}
                  width={800}
                  height={320}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  className="w-full h-[240px] sm:h-[280px] cursor-crosshair"
                />
              </div>
            </div>
          )}

          {/* Chalk Tray at the Bottom of Blackboard Frame */}
          <div className="mt-4 pt-3 border-t-2 border-amber-900/80 -mx-6 sm:-mx-8 -mb-6 sm:-mb-8 px-6 sm:px-8 py-3 bg-gradient-to-r from-amber-950 via-amber-900 to-amber-950 flex flex-wrap items-center justify-between gap-3 shadow-inner">
            {/* Wooden Duster / Eraser */}
            <div className="flex items-center gap-3">
              <div 
                onClick={clearDoodleCanvas}
                className="group flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-800/90 hover:bg-amber-700 border border-amber-600 text-amber-100 text-xs font-chalk cursor-pointer shadow-md transition active:scale-95"
                title="Click to wipe blackboard"
              >
                <div className="w-8 h-4 rounded-sm bg-gradient-to-r from-amber-950 to-amber-900 border border-amber-700 flex items-center justify-center">
                  <span className="w-6 h-1 bg-amber-400/40 rounded-full" />
                </div>
                <span className="font-bold">{t.chalkErase || 'Chalk Duster'}</span>
              </div>

              {/* Chalk Sticks Selector */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-chalk text-amber-200/80 hidden sm:inline">Chalk:</span>
                {[
                  { color: '#ffffff', name: 'White', bg: 'bg-white shadow-white/40' },
                  { color: '#fef08a', name: 'Yellow', bg: 'bg-yellow-200 shadow-yellow-200/40' },
                  { color: '#a5f3fc', name: 'Cyan', bg: 'bg-cyan-200 shadow-cyan-200/40' },
                  { color: '#fbcfe8', name: 'Pink', bg: 'bg-pink-200 shadow-pink-200/40' }
                ].map((chalk) => (
                  <button
                    key={chalk.color}
                    onClick={() => {
                      setSelectedChalkColor(chalk.color);
                      if (!isDrawingMode) setIsDrawingMode(true);
                    }}
                    className={`w-4 h-9 rounded-sm border transition-all cursor-pointer ${chalk.bg} ${
                      selectedChalkColor === chalk.color && isDrawingMode
                        ? '-translate-y-2 ring-2 ring-amber-300 shadow-lg'
                        : 'hover:-translate-y-1 opacity-90'
                    }`}
                    title={`${chalk.name} Chalk Stick`}
                  />
                ))}
              </div>
            </div>

            {/* Quick Action Prompt to AI */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-chalk text-amber-200 hidden md:inline">
                Blackboard AI:
              </span>
              <button
                onClick={() => handleAsk('Write a step-by-step blackboard explanation for Calculus derivatives with examples')}
                className="px-2.5 py-1 rounded bg-amber-900/60 hover:bg-amber-800 text-amber-200 text-xs font-chalk border border-amber-700/80 cursor-pointer"
              >
                Calculus Demo
              </button>
              <button
                onClick={() => handleAsk('Show a blackboard breakdown of the Chemical Equation for Photosynthesis')}
                className="px-2.5 py-1 rounded bg-amber-900/60 hover:bg-amber-800 text-amber-200 text-xs font-chalk border border-amber-700/80 cursor-pointer"
              >
                Chemistry Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
