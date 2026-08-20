import React, { useState, useEffect, useRef } from 'react';
import { VisemeMouthShape } from '../../services/voiceService';
import { UserRole } from '../../types';
import { Sparkles, Mic, Volume2, ShieldCheck, Heart, BookOpen, GraduationCap, Award } from 'lucide-react';

export type AvatarState = 'idle' | 'listening' | 'thinking' | 'speaking';
export type AvatarEmotion = 'friendly' | 'caring' | 'professional' | 'executive' | 'happy' | 'surprised';

interface AiAvatarProps {
  role: UserRole;
  state: AvatarState;
  emotion?: AvatarEmotion;
  viseme?: VisemeMouthShape;
  amplitude?: number; // 0 to 1
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showDetailsBadge?: boolean;
  pulseAura?: boolean;
}

export const AiAvatar: React.FC<AiAvatarProps> = ({
  role,
  state,
  emotion,
  viseme = 'rest',
  amplitude = 0,
  size = 'lg',
  showDetailsBadge = true,
  pulseAura = true
}) => {
  // Eye blinking state
  const [isBlinking, setIsBlinking] = useState(false);
  const [gazeOffset, setGazeOffset] = useState({ x: 0, y: 0 });

  // Natural blinking interval
  useEffect(() => {
    let blinkTimeout: any;

    const triggerBlink = () => {
      setIsBlinking(true);
      setTimeout(() => {
        setIsBlinking(false);
        const nextInterval = 2500 + Math.random() * 3500;
        blinkTimeout = setTimeout(triggerBlink, nextInterval);
      }, 160);
    };

    blinkTimeout = setTimeout(triggerBlink, 3000);
    return () => clearTimeout(blinkTimeout);
  }, []);

  // Subtle gaze tracking shifts
  useEffect(() => {
    if (state === 'thinking') {
      setGazeOffset({ x: 3, y: -4 }); // Look up slightly when thinking
    } else if (state === 'listening') {
      setGazeOffset({ x: 0, y: 0 }); // Direct attentive eye contact
    } else {
      setGazeOffset({ x: 0, y: 0 });
    }
  }, [state]);

  // Persona configurations
  const personaTheme = {
    student: {
      title: 'Academic Assistant',
      desc: 'Friendly & Supportive',
      badgeColor: 'bg-emerald-500 text-white',
      auraGradient: 'from-emerald-400/30 via-teal-500/20 to-transparent',
      skinTone: '#fed7aa',
      hairColor: '#3b2f2f',
      shirtColor: '#0284c7',
      collarColor: '#38bdf8',
      glasses: false,
      accentIcon: GraduationCap
    },
    parent: {
      title: 'Parent Support Assistant',
      desc: 'Caring & Patient',
      badgeColor: 'bg-rose-500 text-white',
      auraGradient: 'from-rose-400/30 via-amber-500/20 to-transparent',
      skinTone: '#ffedd5',
      hairColor: '#451a03',
      shirtColor: '#e11d48',
      collarColor: '#fecdd3',
      glasses: false,
      accentIcon: Heart
    },
    teacher: {
      title: 'Teaching Assistant',
      desc: 'Professional & Efficient',
      badgeColor: 'bg-indigo-600 text-white',
      auraGradient: 'from-indigo-400/30 via-blue-500/20 to-transparent',
      skinTone: '#fde68a',
      hairColor: '#1e293b',
      shirtColor: '#4f46e5',
      collarColor: '#c7d2fe',
      glasses: true,
      accentIcon: BookOpen
    },
    principal: {
      title: 'Management Assistant',
      desc: 'Strategic & Executive',
      badgeColor: 'bg-amber-600 text-white',
      auraGradient: 'from-amber-400/30 via-indigo-500/20 to-transparent',
      skinTone: '#fed7aa',
      hairColor: '#334155',
      shirtColor: '#0f172a',
      collarColor: '#d97706',
      glasses: false,
      accentIcon: Award
    }
  }[role] || {
    title: 'Pathshala AI Assistant',
    desc: 'Intelligent Helper',
    badgeColor: 'bg-indigo-600 text-white',
    auraGradient: 'from-indigo-400/30 to-transparent',
    skinTone: '#fed7aa',
    hairColor: '#1e293b',
    shirtColor: '#4f46e5',
    collarColor: '#c7d2fe',
    glasses: false,
    accentIcon: Sparkles
  };

  // Dimensions by size
  const sizeMap = {
    sm: { box: 'w-16 h-16', scale: 'scale-50', svgSize: 64 },
    md: { box: 'w-24 h-24', scale: 'scale-75', svgSize: 96 },
    lg: { box: 'w-44 h-44 sm:w-52 sm:h-52', scale: 'scale-100', svgSize: 200 },
    xl: { box: 'w-60 h-60 sm:w-72 sm:h-72', scale: 'scale-125', svgSize: 280 }
  };

  const currentSize = sizeMap[size];

  // Dynamic mouth path rendering for Viseme Lip Sync
  const getMouthPath = () => {
    if (state !== 'speaking' || viseme === 'rest') {
      // Gentle restful or smiling curve
      return 'M 88 142 Q 100 149 112 142';
    }

    const openHeight = 4 + amplitude * 18;
    const openWidth = 18 + amplitude * 6;
    const startX = 100 - openWidth / 2;
    const endX = 100 + openWidth / 2;

    switch (viseme) {
      case 'aa':
      case 'oh':
        // Tall wide open (vowel sound)
        return `M ${startX} 139 Q 100 137 ${endX} 139 Q 100 ${139 + openHeight * 1.3} ${startX} 139 Z`;
      case 'ee':
      case 'ih':
        // Wide smiling mouth
        return `M ${startX - 3} 141 Q 100 138 ${endX + 3} 141 Q 100 ${141 + openHeight * 0.7} ${startX - 3} 141 Z`;
      case 'ou':
        // Small round pursed lips
        return `M 94 140 Q 100 137 106 140 Q 100 ${140 + openHeight * 1.1} 94 140 Z`;
      case 'smile':
        return 'M 86 140 Q 100 152 114 140';
      default:
        return `M ${startX} 140 Q 100 138 ${endX} 140 Q 100 ${140 + openHeight} ${startX} 140 Z`;
    }
  };

  // Eyebrow vertical shifts
  const getEyebrowOffset = () => {
    if (state === 'thinking') return -3;
    if (state === 'speaking') return -1 + Math.sin(Date.now() / 200) * 1.5;
    if (state === 'listening') return -2;
    return 0;
  };

  const eyebrowY = getEyebrowOffset();

  return (
    <div className="flex flex-col items-center justify-center relative select-none">
      {/* Dynamic Animated Halo Aura */}
      {pulseAura && (
        <div
          className={`absolute rounded-full pointer-events-none transition-all duration-700 blur-2xl ${
            state === 'listening'
              ? 'w-64 h-64 bg-emerald-500/25 animate-ping'
              : state === 'speaking'
              ? 'w-64 h-64 bg-indigo-500/30 animate-pulse'
              : state === 'thinking'
              ? 'w-60 h-60 bg-amber-500/20 animate-spin'
              : 'w-48 h-48 bg-indigo-500/10'
          }`}
        />
      )}

      {/* Floating Orbital Thinking Particles */}
      {state === 'thinking' && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none animate-spin [animation-duration:6s]">
          <div className="w-48 h-48 rounded-full border border-dashed border-indigo-400/40 flex items-start justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 shadow-md shadow-indigo-400/50 -mt-1.5" />
          </div>
        </div>
      )}

      {/* Main Avatar Container */}
      <div
        className={`${currentSize.box} relative rounded-full flex items-center justify-center transition-transform duration-300 ${
          state === 'speaking'
            ? 'scale-[1.02]'
            : state === 'listening'
            ? 'scale-[1.04]'
            : 'hover:scale-[1.01]'
        }`}
      >
        {/* Outer Glow Ring */}
        <div
          className={`absolute inset-0 rounded-full p-1 transition-all duration-500 shadow-xl ${
            state === 'listening'
              ? 'bg-gradient-to-tr from-emerald-500 via-teal-400 to-emerald-300 ring-4 ring-emerald-400/40'
              : state === 'speaking'
              ? 'bg-gradient-to-tr from-indigo-600 via-purple-500 to-pink-500 ring-4 ring-indigo-400/40'
              : state === 'thinking'
              ? 'bg-gradient-to-tr from-amber-500 via-yellow-400 to-orange-400 ring-4 ring-amber-400/40'
              : 'bg-gradient-to-tr from-slate-700 via-indigo-900 to-slate-800 ring-2 ring-indigo-500/20'
          }`}
        >
          <div className="w-full h-full rounded-full bg-gradient-to-b from-slate-900 to-slate-950 overflow-hidden flex items-center justify-center relative">
            {/* SVG Avatar Illustration Canvas */}
            <svg
              viewBox="0 0 200 200"
              className="w-full h-full drop-shadow-md"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Background gradient fill */}
              <defs>
                <linearGradient id="bgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#1e1b4b" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#0f172a" stopOpacity="1" />
                </linearGradient>
                <linearGradient id="hairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={personaTheme.hairColor} />
                  <stop offset="100%" stopColor="#0f172a" />
                </linearGradient>
                <linearGradient id="skinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={personaTheme.skinTone} />
                  <stop offset="100%" stopColor="#fbcfe8" />
                </linearGradient>
                <linearGradient id="suitGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={personaTheme.shirtColor} />
                  <stop offset="100%" stopColor="#1e293b" />
                </linearGradient>
              </defs>

              {/* Shoulders & Clothing */}
              <g className="transition-transform duration-300">
                {/* Body Base */}
                <path
                  d="M 30 200 C 30 160, 60 152, 100 152 C 140 152, 170 160, 170 200 Z"
                  fill="url(#suitGrad)"
                />
                {/* Collar / Tie */}
                <polygon
                  points="100,158 85,152 100,185 115,152"
                  fill={personaTheme.collarColor}
                  opacity="0.9"
                />
                {/* Neck */}
                <rect
                  x="86"
                  y="125"
                  width="28"
                  height="30"
                  rx="6"
                  fill="url(#skinGrad)"
                />
              </g>

              {/* Head & Face */}
              <g
                className={`transition-transform duration-500 ${
                  state === 'speaking'
                    ? 'animate-[bounce_2s_infinite]'
                    : state === 'listening'
                    ? 'origin-bottom rotate-1'
                    : ''
                }`}
              >
                {/* Ears */}
                <circle cx="56" cy="110" r="10" fill={personaTheme.skinTone} />
                <circle cx="144" cy="110" r="10" fill={personaTheme.skinTone} />

                {/* Head Shape */}
                <ellipse
                  cx="100"
                  cy="108"
                  rx="44"
                  ry="50"
                  fill="url(#skinGrad)"
                />

                {/* Cheeks Blush */}
                <ellipse cx="70" cy="120" rx="7" ry="4" fill="#f43f5e" opacity="0.25" />
                <ellipse cx="130" cy="120" rx="7" ry="4" fill="#f43f5e" opacity="0.25" />

                {/* Hair Style */}
                <path
                  d="M 54 100 C 50 65, 80 50, 100 50 C 120 50, 150 65, 146 100 C 140 85, 128 72, 100 72 C 72 72, 60 85, 54 100 Z"
                  fill="url(#hairGrad)"
                />

                {/* Eyebrows */}
                <g style={{ transform: `translateY(${eyebrowY}px)` }} className="transition-transform duration-150">
                  <path
                    d="M 68 88 Q 78 84 88 87"
                    stroke={personaTheme.hairColor}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <path
                    d="M 112 87 Q 122 84 132 88"
                    stroke={personaTheme.hairColor}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    fill="none"
                  />
                </g>

                {/* Eyes */}
                {isBlinking ? (
                  // Closed Eyes Blink Line
                  <g>
                    <path d="M 68 102 Q 78 106 88 102" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                    <path d="M 112 102 Q 122 106 132 102" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  </g>
                ) : (
                  // Open Eyes with Pupil tracking & Highlights
                  <g>
                    {/* Left Eye */}
                    <circle cx="78" cy="102" r="7.5" fill="#ffffff" />
                    <circle cx={78 + gazeOffset.x} cy={102 + gazeOffset.y} r="4.5" fill="#1e293b" />
                    <circle cx={76.5 + gazeOffset.x} cy={100.5 + gazeOffset.y} r="1.8" fill="#ffffff" />

                    {/* Right Eye */}
                    <circle cx="122" cy="102" r="7.5" fill="#ffffff" />
                    <circle cx={122 + gazeOffset.x} cy={102 + gazeOffset.y} r="4.5" fill="#1e293b" />
                    <circle cx={120.5 + gazeOffset.x} cy={100.5 + gazeOffset.y} r="1.8" fill="#ffffff" />
                  </g>
                )}

                {/* Professional Glasses for Teacher Persona */}
                {personaTheme.glasses && (
                  <g>
                    {/* Left Frame */}
                    <rect x="66" y="93" width="24" height="18" rx="4" fill="none" stroke="#e2e8f0" strokeWidth="2" />
                    {/* Right Frame */}
                    <rect x="110" y="93" width="24" height="18" rx="4" fill="none" stroke="#e2e8f0" strokeWidth="2" />
                    {/* Bridge */}
                    <line x1="90" y1="100" x2="110" y2="100" stroke="#e2e8f0" strokeWidth="2" />
                  </g>
                )}

                {/* Nose */}
                <path
                  d="M 100 110 Q 102 122 97 125"
                  stroke="#fb923c"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0.8"
                />

                {/* Dynamic Lip-Sync Mouth */}
                <path
                  d={getMouthPath()}
                  fill={viseme !== 'rest' && state === 'speaking' ? '#991b1b' : 'none'}
                  stroke="#be123c"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-all duration-75"
                />

                {/* Teeth visibility during wide open vowels */}
                {state === 'speaking' && (viseme === 'aa' || viseme === 'oh' || viseme === 'ee') && amplitude > 0.4 && (
                  <rect x="94" y="139" width="12" height="3" rx="1.5" fill="#ffffff" />
                )}
              </g>
            </svg>

            {/* Real-time State Badge / Pulsing Mic in Bottom Right */}
            <div className="absolute bottom-2 right-2">
              {state === 'listening' ? (
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg animate-bounce">
                  <Mic className="w-4 h-4" />
                </div>
              ) : state === 'speaking' ? (
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg animate-pulse">
                  <Volume2 className="w-4 h-4" />
                </div>
              ) : state === 'thinking' ? (
                <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-lg animate-spin">
                  <Sparkles className="w-4 h-4" />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {/* Details Badge Below Avatar */}
      {showDetailsBadge && (
        <div className="mt-3 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold shadow-xs bg-slate-900/80 backdrop-blur border border-slate-800 text-white">
            <personaTheme.accentIcon className="w-3.5 h-3.5 text-indigo-400" />
            <span>{personaTheme.title}</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1 font-medium">
            {state === 'listening'
              ? 'Listening to your voice...'
              : state === 'speaking'
              ? 'Speaking response...'
              : state === 'thinking'
              ? 'Consulting School ERP...'
              : personaTheme.desc}
          </p>
        </div>
      )}
    </div>
  );
};
