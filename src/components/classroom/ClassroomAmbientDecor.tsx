import React, { useState } from 'react';
import { 
  Send, 
  Sparkles, 
  Pencil, 
  Compass, 
  Award,
  BookOpen,
  Volume2,
  VolumeX,
  Smile
} from 'lucide-react';
import { AnimatedPen } from './AnimatedPen';

interface ClassroomAmbientDecorProps {
  onTriggerCheer?: () => void;
  onAskAi?: (prompt: string) => void;
  isDarkMode?: boolean;
}

export const ClassroomAmbientDecor: React.FC<ClassroomAmbientDecorProps> = ({
  onTriggerCheer = () => {},
  onAskAi,
  isDarkMode = false
}) => {
  const [planeFlying, setPlaneFlying] = useState(false);
  const [showCheer, setShowCheer] = useState(false);

  const handleAsk = (prompt: string) => {
    if (onAskAi) onAskAi(prompt);
  };

  const handleLaunchPaperPlane = () => {
    setPlaneFlying(true);
    setShowCheer(true);
    onTriggerCheer();
    setTimeout(() => {
      setPlaneFlying(false);
      setShowCheer(false);
    }, 4500);
  };

  return (
    <div className="relative pointer-events-none">
      {/* Dynamic Paper Plane flying across screen */}
      {planeFlying && (
        <div className="fixed top-24 left-0 z-50 animate-plane-fly pointer-events-none">
          <div className="flex items-center space-x-2">
            {/* Paper Plane SVG */}
            <svg viewBox="0 0 64 64" className="w-12 h-12 text-indigo-500 fill-indigo-400 drop-shadow-xl transform -rotate-12">
              <path d="M4 32 L60 4 L36 60 L28 36 Z" />
              <path d="M28 36 L60 4 L44 32 Z" fill="#818cf8" />
            </svg>
            {/* Wind trailing lines */}
            <div className="flex flex-col space-y-1 opacity-70">
              <span className="w-8 h-0.5 bg-indigo-400 rounded-full animate-pulse" />
              <span className="w-12 h-0.5 bg-indigo-300 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
              <span className="w-6 h-0.5 bg-indigo-200 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        </div>
      )}

      {/* Floating Interactive Quick Bar at Bottom Corner */}
      <div className="fixed bottom-6 left-6 z-40 pointer-events-auto hidden md:flex items-center gap-2">
        <div className={`p-1.5 px-3 rounded-2xl border shadow-xl backdrop-blur-md flex items-center gap-2.5 transition-all ${
          isDarkMode 
            ? 'bg-slate-900/90 border-slate-700/80 text-slate-100' 
            : 'bg-white/95 border-slate-200 text-slate-900 shadow-lg'
        }`}>
          {/* Animated Gold Nib Pen */}
          <div className="flex items-center gap-1.5 pr-2 border-r border-slate-200 dark:border-slate-800">
            <AnimatedPen size="sm" isWriting={true} />
            <span className="text-xs font-handwriting text-base font-bold text-amber-600 dark:text-amber-400">
              Pathshala Studio
            </span>
          </div>

          {/* Interactive Paper Plane Launcher Button */}
          <button
            onClick={handleLaunchPaperPlane}
            className="p-1.5 px-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 text-indigo-600 dark:text-indigo-300 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer border border-indigo-200 dark:border-indigo-800"
            title="Launch flying paper plane across screen!"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Throw Paper Plane</span>
          </button>

          {/* Quick Chalk Problem Solver */}
          <button
            onClick={() => handleAsk('Write a catchy blackboard problem and solve it step-by-step for Class 10 Math')}
            className="p-1.5 px-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer border border-emerald-200 dark:border-emerald-800"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            <span>Blackboard Quiz</span>
          </button>
        </div>
      </div>
    </div>
  );
};
