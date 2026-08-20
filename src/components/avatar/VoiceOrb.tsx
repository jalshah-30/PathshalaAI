import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, VolumeX, Sparkles, AudioWaveform as Waveform, AlertCircle, ExternalLink } from 'lucide-react';
import { voiceService } from '../../services/voiceService';

interface VoiceOrbProps {
  isListening: boolean;
  isSpeaking: boolean;
  onToggleListening: () => void;
  onStopSpeaking: () => void;
  liveTranscript?: string;
  error?: string | null;
  isIframeRestriction?: boolean;
  disabled?: boolean;
  audioVolume?: number;
}

export const VoiceOrb: React.FC<VoiceOrbProps> = ({
  isListening,
  isSpeaking,
  onToggleListening,
  onStopSpeaking,
  liveTranscript,
  error,
  isIframeRestriction,
  disabled,
  audioVolume = 0
}) => {
  // Audio levels for visual wave pulses (responsive to real mic volume when available)
  const [waveBars, setWaveBars] = useState<number[]>([12, 20, 32, 18, 28, 14, 24]);

  useEffect(() => {
    let interval: any;
    if (isListening || isSpeaking) {
      interval = setInterval(() => {
        const baseMultiplier = audioVolume > 0 ? audioVolume * 2.5 + 0.5 : 1;
        setWaveBars([
          Math.min(48, (8 + Math.random() * 20) * baseMultiplier),
          Math.min(52, (12 + Math.random() * 28) * baseMultiplier),
          Math.min(56, (16 + Math.random() * 36) * baseMultiplier),
          Math.min(50, (10 + Math.random() * 26) * baseMultiplier),
          Math.min(54, (18 + Math.random() * 32) * baseMultiplier),
          Math.min(46, (12 + Math.random() * 24) * baseMultiplier),
          Math.min(42, (8 + Math.random() * 18) * baseMultiplier)
        ]);
      }, 90);
    } else {
      setWaveBars([10, 14, 18, 12, 16, 10, 8]);
    }
    return () => clearInterval(interval);
  }, [isListening, isSpeaking, audioVolume]);

  const handleOpenInNewTab = () => {
    if (typeof window !== 'undefined') {
      window.open(window.location.href, '_blank');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-3 w-full max-w-md mx-auto">
      {/* Audio Wave Visualizer Bars */}
      <div className="flex items-center justify-center gap-1.5 h-12 px-6 py-2 rounded-2xl bg-slate-900/60 backdrop-blur border border-slate-800/80 w-full shadow-inner">
        {waveBars.map((height, idx) => (
          <div
            key={idx}
            style={{ height: `${Math.max(8, height)}px` }}
            className={`w-1.5 rounded-full transition-all duration-100 ${
              isListening
                ? 'bg-gradient-to-t from-emerald-500 to-teal-300'
                : isSpeaking
                ? 'bg-gradient-to-t from-indigo-500 to-purple-400'
                : 'bg-slate-700/60'
            }`}
          />
        ))}

        <div className="ml-3 text-xs font-medium text-slate-300 flex items-center gap-2">
          {isListening ? (
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold animate-pulse">
              <Mic className="w-3.5 h-3.5" />
              <span>Listening to Voice...</span>
            </span>
          ) : isSpeaking ? (
            <span className="flex items-center gap-1.5 text-indigo-400 font-semibold">
              <Volume2 className="w-3.5 h-3.5 animate-pulse" />
              <span>Pathshala AI Speaking</span>
            </span>
          ) : (
            <span className="text-slate-400 text-xs">Ready to speak</span>
          )}
        </div>
      </div>

      {/* Live Transcript Subtitle Banner */}
      {liveTranscript && (
        <div className="w-full px-4 py-2.5 rounded-xl bg-slate-800/90 border border-indigo-500/30 text-slate-100 text-xs sm:text-sm text-center shadow-lg animate-fadeIn">
          <span className="text-indigo-400 font-semibold mr-1.5">You:</span>
          <span className="italic">"{liveTranscript}"</span>
        </div>
      )}

      {/* Error / Diagnostic alert banner */}
      {error && (
        <div className="flex flex-col gap-2 w-full p-3 rounded-xl bg-rose-950/70 border border-rose-800/70 text-rose-200 text-xs shadow-md">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
            <div className="flex-1 leading-relaxed">{error}</div>
          </div>

          {typeof window !== 'undefined' && window.location.hostname === '0.0.0.0' && (
            <div className="pt-1 flex items-center justify-end">
              <a
                href={`http://localhost:${window.location.port || '3000'}${window.location.pathname}`}
                className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition flex items-center gap-1.5 shadow-sm"
              >
                <span>Switch to http://localhost:3000</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}

          {isIframeRestriction && (
            <div className="pt-1 flex items-center justify-end">
              <button
                type="button"
                onClick={handleOpenInNewTab}
                className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition flex items-center gap-1.5 shadow-sm"
              >
                <span>Open in New Tab</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Primary Voice Action Buttons */}
      <div className="flex items-center justify-center gap-3">
        {/* Main Microphone Button */}
        <button
          onClick={onToggleListening}
          disabled={disabled}
          className={`px-5 py-3 rounded-2xl font-bold text-sm transition-all duration-300 flex items-center gap-2.5 shadow-lg ${
            isListening
              ? 'bg-rose-600 hover:bg-rose-500 text-white ring-4 ring-rose-400/40 animate-pulse'
              : 'bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white shadow-indigo-500/25 ring-2 ring-indigo-400/30 hover:scale-105 active:scale-95'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isListening ? (
            <>
              <MicOff className="w-5 h-5" />
              <span>Stop Listening</span>
            </>
          ) : (
            <>
              <Mic className="w-5 h-5" />
              <span>Tap to Speak</span>
            </>
          )}
        </button>

        {/* Stop Speech Button (if speaking) */}
        {isSpeaking && (
          <button
            onClick={onStopSpeaking}
            className="px-4 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold border border-slate-700 transition flex items-center gap-2"
          >
            <VolumeX className="w-4 h-4 text-rose-400" />
            <span>Mute</span>
          </button>
        )}
      </div>
    </div>
  );
};
