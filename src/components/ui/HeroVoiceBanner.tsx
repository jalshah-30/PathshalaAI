import React, { useState, useEffect } from 'react';
import { 
  Bot, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  ArrowRight, 
  MessageSquare, 
  ShieldCheck,
  Radio,
  AudioWaveform as WaveformIcon
} from 'lucide-react';
import { voiceService } from '../../services/voiceService';
import { UserRole } from '../../types';

interface HeroVoiceBannerProps {
  userRole?: UserRole;
  isDarkMode?: boolean;
  onOpenVoiceStage: () => void;
  onOpenChat: () => void;
  onSendVoiceQuery: (transcript: string) => void;
}

export const HeroVoiceBanner: React.FC<HeroVoiceBannerProps> = ({
  userRole = 'student',
  isDarkMode = false,
  onOpenVoiceStage,
  onOpenChat,
  onSendVoiceQuery
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(() => voiceService.isVoiceMuted());
  const [lastSpeech, setLastSpeech] = useState<string | null>(null);

  useEffect(() => {
    setIsMuted(voiceService.isVoiceMuted());
    const unsub = voiceService.onMuteChange((muted) => {
      setIsMuted(muted);
      if (muted) {
        setIsSpeaking(false);
      }
    });
    return unsub;
  }, []);

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    voiceService.setMuted(nextMuted);
  };

  const handleQuickVoiceQuery = (prompt: string) => {
    onSendVoiceQuery(prompt);
  };

  const handleToggleMic = () => {
    if (isListening) {
      voiceService.stopListening();
      setIsListening(false);
      return;
    }

    voiceService.stopSpeaking();
    setIsSpeaking(false);

    const started = voiceService.startListening({
      onResult: (transcript, isFinal) => {
        setLastSpeech(transcript);
        if (isFinal) {
          setIsListening(false);
          onSendVoiceQuery(transcript);
        }
      },
      onError: () => {
        setIsListening(false);
      },
      onEnd: () => {
        setIsListening(false);
      }
    });

    if (started) {
      setIsListening(true);
    }
  };

  return (
    <div
      className={`rounded-2xl p-6 sm:p-8 border relative overflow-hidden transition-all ${
        isDarkMode
          ? 'bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/70 border-slate-800 text-slate-100'
          : 'bg-gradient-to-br from-white via-indigo-50/30 to-blue-50/50 border-slate-200/90 text-slate-900 shadow-xs'
      }`}
    >
      {/* Background ambient decorative shapes */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Left Column: Heading, Pitch, Status, and CTA Buttons */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
              isDarkMode
                ? 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30'
                : 'bg-indigo-50 text-indigo-700 border-indigo-200'
            }`}>
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              <span>Next-Gen Academic Intelligence</span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{isListening ? 'Listening to voice...' : isSpeaking ? 'Pathshala AI Speaking...' : 'AI Online & Ready'}</span>
            </span>
          </div>

          <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}>
            Your Human-Like AI Academic Copilot
          </h1>

          <p className={`text-sm sm:text-base leading-relaxed max-w-xl ${
            isDarkMode ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Track your multi-week attendance trajectory, diagnose subject weak points, access zero-trust academic guidance, and talk to your personal AI voice tutor anytime.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onOpenVoiceStage}
              className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-bold text-sm shadow-md hover:shadow-indigo-500/25 transition flex items-center gap-2"
            >
              <Mic className="w-4 h-4" />
              <span>Talk to Pathshala AI</span>
            </button>

            <button
              onClick={onOpenChat}
              className={`px-5 py-3 rounded-xl font-bold text-sm border transition flex items-center gap-2 ${
                isDarkMode
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-100 border-slate-700'
                  : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300 shadow-2xs'
              }`}
            >
              <MessageSquare className="w-4 h-4 text-indigo-500" />
              <span>Open Interactive Chat</span>
            </button>

            {/* Direct Mic Push-to-Talk */}
            <button
              onClick={handleToggleMic}
              title={isListening ? 'Stop voice recording' : 'Direct Voice Input'}
              className={`p-3 rounded-xl border transition flex items-center justify-center cursor-pointer ${
                isListening
                  ? 'bg-rose-500 text-white border-rose-600 animate-pulse'
                  : isDarkMode
                  ? 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 border-slate-700'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200 shadow-2xs'
              }`}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            {/* Global Voice Mute/Unmute toggle */}
            <button
              onClick={handleToggleMute}
              title={!isMuted ? 'Voice Audio Output Active (Click to Mute)' : 'Voice Audio Output Muted (Click to Unmute)'}
              className={`p-3 rounded-xl border transition flex items-center justify-center cursor-pointer ${
                !isMuted
                  ? isDarkMode
                    ? 'bg-slate-800/80 hover:bg-slate-700 text-indigo-400 border-slate-700'
                    : 'bg-white hover:bg-slate-100 text-indigo-600 border-slate-200 shadow-2xs'
                  : 'bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 border-rose-500/40'
              }`}
            >
              {!isMuted ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>

          {/* Live Transcript Bubble if active */}
          {lastSpeech && (
            <div className={`p-2.5 rounded-lg border text-xs flex items-center gap-2 max-w-md ${
              isDarkMode ? 'bg-slate-950/80 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
            }`}>
              <span className="font-semibold text-indigo-500">Heard:</span>
              <span className="italic truncate">&quot;{lastSpeech}&quot;</span>
            </div>
          )}
        </div>

        {/* Right Column: AI Avatar Interactive Visualization */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <div className={`relative p-6 rounded-3xl border w-full max-w-sm flex flex-col items-center text-center shadow-lg transition-all ${
            isDarkMode
              ? 'bg-slate-950/80 border-slate-800'
              : 'bg-white/90 border-slate-200'
          }`}>
            {/* Animated Avatar Aura Circle */}
            <div className="relative mb-4">
              <div className={`absolute -inset-3 rounded-full blur-md transition-all duration-700 ${
                isListening
                  ? 'bg-rose-500/30 scale-110 animate-pulse'
                  : 'bg-indigo-500/20 scale-105'
              }`} />

              <div className={`w-24 h-24 rounded-full flex items-center justify-center border-2 transition-all relative ${
                isListening
                  ? 'border-rose-500 bg-rose-950 text-rose-300'
                  : 'border-indigo-500 bg-gradient-to-b from-indigo-600 to-indigo-900 text-white'
              }`}>
                <Bot className="w-12 h-12" />

                {/* Pulsing ring indicator */}
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-950 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
                </div>
              </div>
            </div>

            <h3 className={`font-extrabold text-base tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Pathshala AI Assistant
            </h3>
            <p className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Voice-Activated • Multilingual (11 Languages)
            </p>

            {/* Waveform Simulation Bars */}
            <div className="flex items-center gap-1.5 my-3 h-6">
              {[40, 75, 100, 60, 90, 45, 80, 55, 30].map((h, i) => (
                <div
                  key={i}
                  style={{ height: `${h}%` }}
                  className={`w-1 rounded-full transition-all duration-300 ${
                    isListening
                      ? 'bg-rose-500 animate-pulse'
                      : isDarkMode
                      ? 'bg-indigo-400/80'
                      : 'bg-indigo-600'
                  }`}
                />
              ))}
            </div>

            {/* Quick Prompt Chips */}
            <div className="w-full space-y-1.5 mt-2">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block text-left">
                Suggested voice queries:
              </span>
              <button
                onClick={() => handleQuickVoiceQuery('What is my attendance percentage and recent log?')}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition border flex items-center justify-between ${
                  isDarkMode
                    ? 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-800'
                    : 'bg-slate-50 hover:bg-indigo-50/70 text-slate-700 border-slate-200 hover:border-indigo-200'
                }`}
              >
                <span className="truncate">&quot;What is my attendance percentage?&quot;</span>
                <ArrowRight className="w-3 h-3 text-slate-400 shrink-0 ml-1" />
              </button>
              <button
                onClick={() => handleQuickVoiceQuery('How has my attendance changed over the last 3 weeks?')}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition border flex items-center justify-between ${
                  isDarkMode
                    ? 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-800'
                    : 'bg-slate-50 hover:bg-indigo-50/70 text-slate-700 border-slate-200 hover:border-indigo-200'
                }`}
              >
                <span className="truncate">&quot;How has my 3-week trend changed?&quot;</span>
                <ArrowRight className="w-3 h-3 text-slate-400 shrink-0 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
