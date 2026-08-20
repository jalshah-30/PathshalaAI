import React, { useState, useEffect, useRef } from 'react';
import { AiAvatar, AvatarState } from './AiAvatar';
import { voiceService, VisemeMouthShape } from '../../services/voiceService';
import { UserRole, AuthUser, ChatMessage, ClarificationOption } from '../../types';
import { 
  Bot, 
  Mic, 
  MicOff, 
  X, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  ChevronRight, 
  MessageSquare,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import { CleanMessageRenderer } from '../chat/CleanMessageRenderer';
import { getTranslations } from '../../i18n/localization';

interface FloatingAvatarWidgetProps {
  currentUser: AuthUser | null;
  latestAssistantMessage: ChatMessage | null;
  onSendMessage: (text: string) => void;
  isLoading: boolean;
  onSelectOption: (option: ClarificationOption) => void;
  onOpenFullAssistant?: () => void;
  selectedLanguage?: string;
}

export const FloatingAvatarWidget: React.FC<FloatingAvatarWidgetProps> = ({
  currentUser,
  latestAssistantMessage,
  onSendMessage,
  isLoading,
  onSelectOption,
  onOpenFullAssistant,
  selectedLanguage = 'English'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [avatarState, setAvatarState] = useState<AvatarState>('idle');
  const [viseme, setViseme] = useState<VisemeMouthShape>('rest');
  const [amplitude, setAmplitude] = useState<number>(0);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isMuted, setIsMuted] = useState(() => voiceService.isVoiceMuted());

  const role = currentUser?.role || 'student';
  const t = getTranslations(selectedLanguage);
  const lastSpokenRef = useRef<string | null>(null);

  // Sync global mute state
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

  // Sync avatar state
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

  // Read aloud if open and NOT muted
  useEffect(() => {
    if (
      isOpen &&
      !isMuted &&
      latestAssistantMessage &&
      latestAssistantMessage.sender === 'assistant' &&
      latestAssistantMessage.id !== lastSpokenRef.current
    ) {
      lastSpokenRef.current = latestAssistantMessage.id;
      handleSpeak(latestAssistantMessage.text);
    }
  }, [latestAssistantMessage, isOpen, isMuted, selectedLanguage]);

  const handleSpeak = (text: string) => {
    if (isMuted || !text) return;
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
        onViseme: (v, a) => {
          setViseme(v);
          setAmplitude(a);
        }
      }
    );
  };

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    voiceService.setMuted(nextMuted);
    if (nextMuted) {
      voiceService.stopSpeaking();
      setIsSpeaking(false);
      setAvatarState('idle');
      setViseme('rest');
      setAmplitude(0);
    }
  };

  const handleToggleMic = () => {
    if (isListening) {
      voiceService.stopListening();
      setIsListening(false);
      return;
    }

    if (isSpeaking) {
      voiceService.stopSpeaking();
      setIsSpeaking(false);
    }

    setTranscript('');
    const ok = voiceService.startListening(
      {
        onResult: (t, isFinal) => {
          setTranscript(t);
          if (isFinal) {
            setIsListening(false);
            onSendMessage(t);
          }
        },
        onError: () => {
          setIsListening(false);
        },
        onEnd: () => {
          setIsListening(false);
        }
      },
      selectedLanguage
    );

    if (ok) {
      setIsListening(true);
    }
  };

  const handleStopSpeaking = () => {
    voiceService.stopSpeaking();
    setIsSpeaking(false);
    setViseme('rest');
    setAmplitude(0);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Expanded Voice Dialog Card */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-slate-900/95 backdrop-blur-md rounded-3xl border border-indigo-500/40 p-5 text-white shadow-2xl animate-fadeIn flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-indigo-900/40 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-600/40 flex items-center justify-center text-indigo-300">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Pathshala AI Voice Avatar</h4>
                <p className="text-[10px] text-slate-400">Speak or listen to answers</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={handleToggleMute}
                className={`p-1.5 rounded-lg border transition cursor-pointer ${
                  !isMuted ? 'bg-indigo-600/40 text-indigo-300 border-indigo-500/40' : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                }`}
                title={!isMuted ? 'Voice audio active (Click to Mute)' : 'Voice audio muted (Click to Unmute)'}
              >
                {!isMuted ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => {
                  voiceService.stopSpeaking();
                  voiceService.stopListening();
                  setIsOpen(false);
                }}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Mini Avatar Graphic */}
          <div className="flex items-center justify-center py-1">
            <AiAvatar
              role={role}
              state={avatarState}
              viseme={viseme}
              amplitude={amplitude}
              size="md"
              showDetailsBadge={false}
              pulseAura={false}
            />
          </div>

          {/* Dialogue Transcript */}
          <div className="bg-slate-950/70 rounded-2xl border border-slate-800 p-3 max-h-36 overflow-y-auto text-xs leading-relaxed">
            {latestAssistantMessage ? (
              <CleanMessageRenderer content={latestAssistantMessage.text} isDark={true} />
            ) : (
              <p className="text-slate-400 italic">
                Press the microphone to ask anything regarding attendance or school updates.
              </p>
            )}

            {transcript && (
              <div className="mt-2 pt-2 border-t border-slate-800 text-indigo-300 italic text-[11px]">
                You: "{transcript}"
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between gap-2">
            <button
              onClick={handleToggleMic}
              disabled={isLoading}
              className={`flex-1 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition shadow-md ${
                isListening
                  ? 'bg-rose-600 hover:bg-rose-500 text-white animate-pulse'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
              }`}
            >
              {isListening ? (
                <>
                  <MicOff className="w-4 h-4" />
                  <span>Listening...</span>
                </>
              ) : (
                <>
                  <Mic className="w-4 h-4" />
                  <span>Speak with Pathshala AI</span>
                </>
              )}
            </button>

            {onOpenFullAssistant && (
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenFullAssistant();
                }}
                className="px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 flex items-center gap-1"
                title="Open Pathshala AI Full Orchestrator"
              >
                <span>Studio</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Floating Trigger Orb Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 text-white shadow-xl shadow-indigo-500/30 border-2 border-indigo-400/40 flex items-center justify-center hover:scale-105 active:scale-95 transition relative group"
      >
        <div className="absolute inset-0 rounded-full bg-indigo-400/20 animate-ping pointer-events-none" />
        <Bot className="w-7 h-7 group-hover:scale-110 transition" />
        <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-900 animate-pulse" />
      </button>
    </div>
  );
};
