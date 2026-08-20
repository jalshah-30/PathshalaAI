import React, { useState, useEffect, useRef } from 'react';
import { AiAvatar, AvatarState } from './AiAvatar';
import { VoiceOrb } from './VoiceOrb';
import { voiceService, VisemeMouthShape } from '../../services/voiceService';
import { UserRole, AuthUser, ChatMessage, ClarificationOption } from '../../types';
import { 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  Sparkles, 
  MessageSquare, 
  ShieldCheck, 
  HelpCircle, 
  ArrowRight,
  Settings2,
  Mic,
  Zap
} from 'lucide-react';
import { CleanMessageRenderer } from '../chat/CleanMessageRenderer';
import { getTranslations } from '../../i18n/localization';

interface AvatarStageProps {
  currentUser: AuthUser | null;
  latestAssistantMessage: ChatMessage | null;
  onSendMessage: (text: string) => void;
  isLoading: boolean;
  onSelectOption: (option: ClarificationOption) => void;
  onSwitchToChat?: () => void;
  selectedLanguage?: string;
}

export const AvatarStage: React.FC<AvatarStageProps> = ({
  currentUser,
  latestAssistantMessage,
  onSendMessage,
  isLoading,
  onSelectOption,
  onSwitchToChat,
  selectedLanguage = 'English'
}) => {
  const role: UserRole = currentUser?.role || 'student';
  const userName = currentUser?.name || 'User';
  const t = getTranslations(selectedLanguage);

  // Avatar state & voice
  const [avatarState, setAvatarState] = useState<AvatarState>('idle');
  const [viseme, setViseme] = useState<VisemeMouthShape>('rest');
  const [amplitude, setAmplitude] = useState<number>(0);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [liveTranscript, setLiveTranscript] = useState<string>('');
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(() => voiceService.isVoiceMuted());
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [speechRate, setSpeechRate] = useState<number>(1.0);

  const lastSpokenMessageIdRef = useRef<string | null>(null);

  const currentPrompts = t.prompts[role] || t.prompts.student;

  // Listen to global voice mute changes
  useEffect(() => {
    setIsMuted(voiceService.isVoiceMuted());
    const unsub = voiceService.onMuteChange((muted) => {
      setIsMuted(muted);
      if (muted) {
        setIsSpeaking(false);
        setAvatarState('idle');
        setViseme('rest');
        setAmplitude(0);
      }
    });
    return unsub;
  }, []);

  // React to loading state
  useEffect(() => {
    if (isLoading) {
      setAvatarState('thinking');
    } else if (isSpeaking) {
      setAvatarState('speaking');
    } else if (isListening) {
      setAvatarState('listening');
    } else {
      setAvatarState('idle');
    }
  }, [isLoading, isSpeaking, isListening]);

  // Trigger TTS voice playback when a new assistant message arrives
  useEffect(() => {
    if (
      !isMuted &&
      latestAssistantMessage &&
      latestAssistantMessage.sender === 'assistant' &&
      latestAssistantMessage.id !== lastSpokenMessageIdRef.current
    ) {
      lastSpokenMessageIdRef.current = latestAssistantMessage.id;
      handleSpeakText(latestAssistantMessage.text);
    }
  }, [latestAssistantMessage, isMuted, selectedLanguage]);

  const handleSpeakText = (text: string) => {
    if (!text || isMuted) return;
    setVoiceError(null);

    voiceService.speak(
      text,
      role,
      selectedLanguage,
      {
        onStart: () => {
          setIsSpeaking(true);
          setAvatarState('speaking');
        },
        onEnd: () => {
          setIsSpeaking(false);
          setAvatarState('idle');
          setViseme('rest');
          setAmplitude(0);
        },
        onViseme: (shape, amp) => {
          setViseme(shape);
          setAmplitude(amp);
        }
      }
    );
  };

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    voiceService.setMuted(nextMuted);
    if (nextMuted) {
      handleStopSpeaking();
    }
  };

  const handleToggleListening = () => {
    if (isListening) {
      voiceService.stopListening();
      setIsListening(false);
      setAvatarState('idle');
      return;
    }

    if (isSpeaking) {
      voiceService.stopSpeaking();
      setIsSpeaking(false);
    }

    setVoiceError(null);
    setLiveTranscript('');

    const started = voiceService.startListening(
      {
        onResult: (transcript, isFinal) => {
          setLiveTranscript(transcript);
          if (isFinal) {
            setIsListening(false);
            setAvatarState('thinking');
            onSendMessage(transcript);
          }
        },
        onError: (err) => {
          setIsListening(false);
          setAvatarState('idle');
          setVoiceError(
            typeof err === 'string'
              ? `Microphone error: ${err}`
              : 'Microphone access restricted or not detected. Try selecting a quick voice query below!'
          );
        },
        onEnd: () => {
          setIsListening(false);
          if (!isLoading) {
            setAvatarState('idle');
          }
        }
      },
      selectedLanguage
    );

    if (started) {
      setIsListening(true);
      setAvatarState('listening');
    }
  };

  const handleStopSpeaking = () => {
    voiceService.stopSpeaking();
    setIsSpeaking(false);
    setAvatarState('idle');
    setViseme('rest');
    setAmplitude(0);
  };

  const handleReplayLatest = () => {
    if (latestAssistantMessage?.text) {
      handleSpeakText(latestAssistantMessage.text);
    }
  };

  const handleQuickPromptClick = (text: string) => {
    if (isSpeaking) {
      handleStopSpeaking();
    }
    setLiveTranscript(text);
    onSendMessage(text);
  };

  return (
    <div className="flex flex-col bg-gradient-to-b from-slate-900 via-indigo-950/70 to-slate-900 rounded-3xl border border-indigo-900/40 p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden">
      {/* Background Decorative Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Bar */}
      <div className="flex items-center justify-between gap-4 z-10 border-b border-indigo-900/40 pb-4 mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/30 border border-indigo-400/30 flex items-center justify-center text-indigo-300">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold tracking-tight text-white">Pathshala AI Voice Avatar</h2>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                Live Interactive
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Conversing with <strong className="text-slate-200">{userName}</strong> ({role.toUpperCase()})
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {latestAssistantMessage && (
            <button
              onClick={handleReplayLatest}
              title="Replay Spoken Response"
              className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={handleToggleMute}
            title={!isMuted ? 'Voice Audio Active (Click to Mute)' : 'Voice Audio Muted (Click to Unmute)'}
            className={`p-2.5 rounded-xl border transition cursor-pointer ${
              !isMuted
                ? 'bg-indigo-600/40 text-indigo-300 border-indigo-500/50 hover:bg-indigo-600/60'
                : 'bg-rose-500/20 text-rose-300 border-rose-500/40 hover:bg-rose-500/30'
            }`}
          >
            {!isMuted ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {onSwitchToChat && (
            <button
              onClick={onSwitchToChat}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Text View</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Avatar Stage View */}
      <div className="flex flex-col items-center justify-center my-2 relative z-10">
        {/* Animated Avatar with Dynamic Visemes & Expressions */}
        <AiAvatar
          role={role}
          state={avatarState}
          viseme={viseme}
          amplitude={amplitude}
          size="lg"
          showDetailsBadge={true}
          pulseAura={true}
        />

        {/* Live Spoken Subtitle & Dialogue Box */}
        <div className="w-full max-w-2xl mt-6">
          {latestAssistantMessage ? (
            <div className="bg-slate-900/90 backdrop-blur-md rounded-2xl border border-indigo-900/50 p-5 shadow-xl text-left">
              <div className="flex items-center justify-between text-xs text-indigo-400 font-semibold mb-2">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{t.aiAvatarTitle}</span>
                </span>
                {isSpeaking && (
                  <span className="flex items-center gap-1 text-emerald-400 text-[11px] animate-pulse">
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>{t.speakingRealtime}</span>
                  </span>
                )}
              </div>

              <div className="text-sm sm:text-base text-slate-100 leading-relaxed font-normal">
                <CleanMessageRenderer content={latestAssistantMessage.text} isDark={true} />
              </div>

              {/* Clarification Chips if needed */}
              {latestAssistantMessage.clarificationOptions && latestAssistantMessage.clarificationOptions.length > 0 && (
                <div className="mt-4 pt-3 border-t border-slate-800">
                  <div className="text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1">
                    <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{t.clarifyPrompt}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {latestAssistantMessage.clarificationOptions.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => onSelectOption(opt)}
                        className="px-3.5 py-1.5 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 border border-indigo-400/40 text-xs font-medium transition flex items-center gap-1.5 hover:scale-105 shadow-md"
                      >
                        <span>{opt.name || opt.value}</span>
                        {opt.class_name && (
                          <span className="text-[10px] text-indigo-300/70">({opt.class_name})</span>
                        )}
                        <ArrowRight className="w-3 h-3 text-indigo-400" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-center text-slate-400 text-xs sm:text-sm">
              {t.welcomeGreeting}
            </div>
          )}
        </div>

        {/* Voice Orb & Microphone Controls */}
        <div className="mt-6 w-full">
          <VoiceOrb
            isListening={isListening}
            isSpeaking={isSpeaking}
            onToggleListening={handleToggleListening}
            onStopSpeaking={handleStopSpeaking}
            liveTranscript={liveTranscript}
            error={voiceError}
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Persona-Specific Voice Prompts (Speak Directly) */}
      <div className="mt-6 pt-5 border-t border-indigo-900/40 z-10">
        <div className="text-xs font-semibold text-slate-400 mb-2.5 flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>{t.quickQuestionsTitle}:</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {currentPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleQuickPromptClick(p.text)}
              disabled={isLoading}
              className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-indigo-900/40 border border-slate-700/80 hover:border-indigo-500/50 text-left transition flex flex-col gap-0.5 group disabled:opacity-50"
            >
              <span className="text-[11px] font-bold text-indigo-300 group-hover:text-indigo-200">
                {p.label}
              </span>
              <span className="text-xs text-slate-300 line-clamp-1 italic">
                "{p.text}"
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
