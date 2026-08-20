/**
 * Voice Service for Speech-to-Text (STT) and Text-to-Speech (TTS)
 * with Persona-Tuned Voices, Lip-Sync Viseme Generation,
 * and Comprehensive Multilingual Support for 11 Indian Languages
 */

import { getLanguageDefinition, SUPPORTED_LANGUAGES } from '../i18n/localization';

export interface PersonaVoiceConfig {
  pitch: number;
  rate: number;
  voiceNamePreference: string[];
  lang: string;
  avatarMood: 'friendly' | 'caring' | 'professional' | 'executive';
}

// Persona configurations with tuned pitch and rate for natural Indian School AI Copilot
export const PERSONA_VOICE_CONFIGS: Record<string, PersonaVoiceConfig> = {
  student: {
    pitch: 1.08,
    rate: 0.98,
    voiceNamePreference: [
      'Google हिन्दी',
      'Google தமிழ்',
      'Google తెలుగు',
      'Google मराठी',
      'Google বাংলা',
      'Google ગુજરાતી',
      'Google ਪੰਜਾਬੀ',
      'Google ಕನ್ನಡ',
      'Google മലയാളം',
      'Google اردو',
      'Lekha',
      'Swara',
      'Microsoft Swara Online (Natural)',
      'Microsoft Madhur Online (Natural)',
      'Microsoft Neerja Online (Natural)',
      'Microsoft Valluvar Online (Natural)',
      'Microsoft Mohan Online (Natural)',
      'Microsoft Aarohi Online (Natural)',
      'Microsoft Bashkar Online (Natural)',
      'Microsoft Dhwani Online (Natural)',
      'Microsoft Raavi Online (Natural)',
      'Microsoft Gagan Online (Natural)',
      'Microsoft Midhun Online (Natural)',
      'Microsoft Salman Online (Natural)',
      'Google UK English Female',
      'Google US English Female',
      'Samantha',
      'Victoria',
      'Microsoft Jenny Online (Natural)',
      'Microsoft Zira',
      'Veena',
      'Karen'
    ],
    lang: 'en-IN',
    avatarMood: 'friendly'
  },
  parent: {
    pitch: 1.05,
    rate: 0.95,
    voiceNamePreference: [
      'Google हिन्दी',
      'Google தமிழ்',
      'Google తెలుగు',
      'Google मराठी',
      'Google বাংলা',
      'Google ગુજરાતી',
      'Google ਪੰਜਾਬੀ',
      'Google ಕನ್ನಡ',
      'Google മലയാളം',
      'Google اردو',
      'Microsoft Neerja Online (Natural)',
      'Microsoft Swara Online (Natural)',
      'Microsoft Pallavi Online (Natural)',
      'Microsoft Shruti Online (Natural)',
      'Microsoft Tanishaa Online (Natural)',
      'Microsoft Sapna Online (Natural)',
      'Microsoft Sobhana Online (Natural)',
      'Lekha',
      'Neerja',
      'Veena',
      'Google UK English Female',
      'Google US English Female',
      'Moira',
      'Fiona',
      'Microsoft Jenny Online (Natural)'
    ],
    lang: 'en-IN',
    avatarMood: 'caring'
  },
  teacher: {
    pitch: 1.06,
    rate: 0.96,
    voiceNamePreference: [
      'Google हिन्दी',
      'Google தமிழ்',
      'Google తెలుగు',
      'Google मराठी',
      'Google বাংলা',
      'Google ગુજરાતી',
      'Google ਪੰਜਾਬੀ',
      'Google ಕನ್ನಡ',
      'Google മലയാളം',
      'Google اردو',
      'Microsoft Swara Online (Natural)',
      'Microsoft Kalpana Online (Natural)',
      'Microsoft Lekha Online (Natural)',
      'Lekha',
      'Swara',
      'Veena',
      'Google UK English Female',
      'Google US English Female',
      'Microsoft Jenny Online (Natural)',
      'Samantha',
      'Victoria'
    ],
    lang: 'en-IN',
    avatarMood: 'professional'
  },
  principal: {
    pitch: 1.04,
    rate: 0.94,
    voiceNamePreference: [
      'Google हिन्दी',
      'Google தமிழ்',
      'Google తెలుగు',
      'Google मराठी',
      'Google বাংলা',
      'Google ગુજરાતી',
      'Google ਪੰਜਾਬੀ',
      'Google ಕನ್ನಡ',
      'Google മലയാളം',
      'Google اردو',
      'Microsoft Kalpana Online (Natural)',
      'Microsoft Neerja Online (Natural)',
      'Microsoft Swara Online (Natural)',
      'Veena',
      'Neerja',
      'Google UK English Female',
      'Google US English Female',
      'Microsoft Jenny Online (Natural)',
      'Microsoft Aria Online (Natural)',
      'Samantha'
    ],
    lang: 'en-IN',
    avatarMood: 'executive'
  }
};

export type VisemeMouthShape = 'rest' | 'aa' | 'ee' | 'ih' | 'oh' | 'ou' | 'smile';

// Known male voice keywords to actively deprioritize when searching for warm female persona voices
const MALE_VOICE_KEYWORDS = [
  'male',
  'david',
  'daniel',
  'alex',
  'fred',
  'george',
  'arthur',
  'tom',
  'oliver',
  'rishi',
  'mark',
  'guy',
  'richard',
  'stefan',
  'microsoft david',
  'microsoft mark'
];

// Known female voice indicators
const FEMALE_VOICE_KEYWORDS = [
  'female',
  'woman',
  'girl',
  'samantha',
  'victoria',
  'zira',
  'jenny',
  'aria',
  'karen',
  'moira',
  'fiona',
  'serena',
  'veena',
  'lekha',
  'swara',
  'neerja',
  'kalpana',
  'sangeeta',
  'heera',
  'tessa',
  'kavya',
  'ananya',
  'sunita',
  'pallavi',
  'shruti',
  'aarohi',
  'tanishaa',
  'dhwani',
  'raavi',
  'sapna',
  'sobhana',
  'gul'
];

class VoiceService {
  private synth: SpeechSynthesis | null = null;
  private recognition: any = null;
  private isListening = false;
  private isSpeaking = false;
  private isMuted = false;
  private muteListeners: ((muted: boolean) => void)[] = [];
  private availableVoices: SpeechSynthesisVoice[] = [];
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private visemeTimer: any = null;
  private keepAliveInterval: any = null;
  
  // Real microphone stream & audio analyser
  private audioContext: AudioContext | null = null;
  private mediaStream: MediaStream | null = null;
  private analyser: AnalyserNode | null = null;
  private micLevelInterval: any = null;

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        const savedMute = localStorage.getItem('pathshala_voice_muted');
        this.isMuted = savedMute === 'true';
      } catch (e) {
        this.isMuted = false;
      }

      if ('speechSynthesis' in window) {
        this.synth = window.speechSynthesis;
        this.loadVoices();
        if (this.synth.onvoiceschanged !== undefined) {
          this.synth.onvoiceschanged = () => this.loadVoices();
        }
      }
    }
  }

  public isVoiceMuted(): boolean {
    return this.isMuted;
  }

  public setMuted(muted: boolean): void {
    this.isMuted = muted;
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('pathshala_voice_muted', muted ? 'true' : 'false');
      }
    } catch (e) {
      // ignore
    }
    if (muted) {
      this.stopSpeaking();
    }
    this.muteListeners.forEach((cb) => {
      try {
        cb(muted);
      } catch (e) {
        // ignore
      }
    });
  }

  public toggleMuted(): boolean {
    this.setMuted(!this.isMuted);
    return this.isMuted;
  }

  public onMuteChange(callback: (muted: boolean) => void): () => void {
    this.muteListeners.push(callback);
    return () => {
      this.muteListeners = this.muteListeners.filter((cb) => cb !== callback);
    };
  }

  private loadVoices() {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    if (voices && voices.length > 0) {
      this.availableVoices = voices;
    }
  }

  public getVoices(): SpeechSynthesisVoice[] {
    if (this.synth) {
      const freshVoices = this.synth.getVoices();
      if (freshVoices && freshVoices.length > 0) {
        this.availableVoices = freshVoices;
      }
    }
    return this.availableVoices;
  }

  public isSpeechRecognitionSupported(): boolean {
    if (typeof window === 'undefined') return false;
    return !!((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);
  }

  public isSpeechSynthesisSupported(): boolean {
    if (typeof window === 'undefined') return false;
    return 'speechSynthesis' in window;
  }

  public isInIframe(): boolean {
    try {
      return typeof window !== 'undefined' && window.self !== window.top;
    } catch (e) {
      return true;
    }
  }

  /**
   * Request microphone stream and start real audio level analyser
   */
  public async startMicrophoneAnalyser(onVolume?: (volume: number) => void): Promise<boolean> {
    try {
      if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
        return false;
      }

      this.stopMicrophoneAnalyser();

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });
      this.mediaStream = stream;

      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.audioContext = new AudioCtx();
        if (this.audioContext.state === 'suspended') {
          await this.audioContext.resume();
        }
        const source = this.audioContext.createMediaStreamSource(stream);
        this.analyser = this.audioContext.createAnalyser();
        this.analyser.fftSize = 256;
        source.connect(this.analyser);

        const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
        this.micLevelInterval = setInterval(() => {
          if (!this.analyser || !this.isListening) return;
          this.analyser.getByteFrequencyData(dataArray);
          let sum = 0;
          for (let i = 0; i < dataArray.length; i++) {
            sum += dataArray[i];
          }
          const average = sum / dataArray.length;
          const normalized = Math.min(1, average / 80); // 0 to 1
          onVolume?.(normalized);
        }, 80);
      }
      return true;
    } catch (err) {
      console.warn('[VoiceService] Could not start microphone analyser:', err);
      return false;
    }
  }

  public stopMicrophoneAnalyser() {
    if (this.micLevelInterval) {
      clearInterval(this.micLevelInterval);
      this.micLevelInterval = null;
    }
    if (this.audioContext) {
      try {
        this.audioContext.close();
      } catch (e) {
        // ignore
      }
      this.audioContext = null;
    }
    if (this.mediaStream) {
      try {
        this.mediaStream.getTracks().forEach((track) => track.stop());
      } catch (e) {
        // ignore
      }
      this.mediaStream = null;
    }
    this.analyser = null;
  }

  /**
   * Start Speech-to-Text listening with real-time callbacks and fallback handling
   */
  public startListening(
    options: {
      onResult: (transcript: string, isFinal: boolean) => void;
      onError: (err: { message: string; code?: string; isIframeRestriction?: boolean }) => void;
      onEnd: () => void;
      onVolume?: (volume: number) => void;
    },
    languageNameOrCode?: string
  ): boolean {
    if (this.isListening) {
      this.stopListening();
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    const inIframe = this.isInIframe();

    if (!SpeechRecognition) {
      options.onError({
        message: 'Speech recognition is not natively supported in this browser. Please use Chrome, Edge, or Safari.',
        code: 'not-supported'
      });
      return false;
    }

    // Try starting mic analyser for real audio level visualizer
    this.startMicrophoneAnalyser(options.onVolume);

    try {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      
      const langDef = getLanguageDefinition(languageNameOrCode || 'English');
      this.recognition.lang = langDef.bcp47;
      this.recognition.maxAlternatives = 1;

      this.recognition.onstart = () => {
        this.isListening = true;
      };

      this.recognition.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const trans = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += trans;
          } else {
            interimTranscript += trans;
          }
        }

        if (finalTranscript) {
          options.onResult(finalTranscript.trim(), true);
        } else if (interimTranscript) {
          options.onResult(interimTranscript.trim(), false);
        }
      };

      this.recognition.onerror = (event: any) => {
        const errType = event?.error || 'unknown';

        // 'no-speech' is normal if user pauses — don't cancel prematurely
        if (errType === 'no-speech') {
          return;
        }

        this.isListening = false;
        this.stopMicrophoneAnalyser();

        if (errType === 'not-allowed' || errType === 'service-not-allowed') {
          if (inIframe) {
            options.onError({
              message: 'Web Speech API is blocked inside preview frames by Chrome. Open the app in a new tab to use live speech recognition, or click any voice query prompt below.',
              code: 'iframe-restricted',
              isIframeRestriction: true
            });
          } else {
            options.onError({
              message: 'Microphone permission was blocked. Please allow microphone access in your browser address bar and reload.',
              code: 'not-allowed'
            });
          }
        } else if (errType === 'network') {
          const isZeroHost = typeof window !== 'undefined' && window.location.hostname === '0.0.0.0';
          options.onError({
            message: isZeroHost
              ? 'Chrome blocks Speech Recognition on "0.0.0.0". Please open the app via "http://localhost:3000" in your address bar.'
              : 'Voice recognition network error. Ensure your connection is active, or use http://localhost:3000.',
            code: 'network'
          });
        } else if (errType === 'audio-capture') {
          options.onError({
            message: 'No microphone was detected. Please verify your microphone is plugged in.',
            code: 'audio-capture'
          });
        } else {
          options.onError({
            message: `Speech error (${errType}). You can also click any voice prompt or type.`,
            code: errType
          });
        }
      };

      this.recognition.onend = () => {
        this.isListening = false;
        this.stopMicrophoneAnalyser();
        options.onEnd();
      };

      this.recognition.start();
      this.isListening = true;
      return true;
    } catch (e: any) {
      this.isListening = false;
      this.stopMicrophoneAnalyser();
      options.onError({
        message: inIframe
          ? 'Browser speech recognition is restricted inside preview iframes. Click "Open in New Tab" for full voice input.'
          : (e?.message || 'Could not start speech recognition.'),
        code: 'start-failed',
        isIframeRestriction: inIframe
      });
      return false;
    }
  }

  public stopListening() {
    this.stopMicrophoneAnalyser();
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch (e) {
        // ignore
      }
      this.isListening = false;
    }
  }

  /**
   * Clean markdown, LaTeX, tables, and special tags before text-to-speech synthesis
   */
  public cleanTextForSpeech(text: string, isIndic: boolean = false): string {
    if (!text) return '';

    let cleaned = text
      // Remove code blocks
      .replace(/```[\s\S]*?```/g, ' ')
      .replace(/`([^`]+)`/g, '$1')
      // Remove markdown links [text](url) -> text
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      // Remove URLs
      .replace(/https?:\/\/\S+/g, ' ')
      // Remove LaTeX \text{...} wrappers
      .replace(/\\text\{([^}]+)\}/g, '$1')
      // Remove LaTeX commands
      .replace(/\\quad/g, ' ')
      .replace(/\\qquad/g, ' ')
      .replace(/\\cdot/g, ' ')
      .replace(/\\sqrt\{([^}]+)\}/g, '$1')
      // Remove LaTeX dollar signs
      .replace(/\$\$([^\$]+)\$\$/g, '$1')
      .replace(/\$([^\$]+)\$/g, '$1')
      // Remove markdown structural markers
      .replace(/^#+\s+/gm, '')
      .replace(/^>\s*/gm, '')
      .replace(/^[-*•]\s+/gm, '')
      .replace(/---/g, ' ')
      .replace(/[*_~`\[\]]/g, '')
      .replace(/Tool:\s*\w+/gi, '')
      .replace(/Authorized/gi, '')
      .replace(/\(?(STU|CLS|USR|PR|T)-\d+\)?/gi, '')
      // Remove emojis
      .replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '');

    // For English text, clean up power notation
    if (!isIndic) {
      cleaned = cleaned
        .replace(/\\times/g, ' times ')
        .replace(/\\pm/g, ' plus or minus ')
        .replace(/\^2\b/g, ' squared')
        .replace(/\^3\b/g, ' cubed')
        .replace(/\^(\d+)/g, ' to the power of $1');
    } else {
      // In Indic text, replace punctuation like purna viram '।' with comma for natural breathing pauses
      cleaned = cleaned
        .replace(/।/g, ', ')
        .replace(/\^/g, ' ');
    }

    return cleaned
      .replace(/\s+/g, ' ')
      .trim();
  }

  /**
   * Speak response using persona voice with real-time lip sync viseme generation
   * Supports comprehensive multilingual Indic language voice synthesis
   */
  public speak(
    text: string,
    role: string,
    languageOrCallbacks?:
      | string
      | {
          onStart?: () => void;
          onEnd?: () => void;
          onViseme?: (shape: VisemeMouthShape, amplitude: number) => void;
        },
    maybeCallbacks?: {
      onStart?: () => void;
      onEnd?: () => void;
      onViseme?: (shape: VisemeMouthShape, amplitude: number) => void;
    }
  ) {
    let callbacks = maybeCallbacks;
    let language = 'English';

    if (typeof languageOrCallbacks === 'string') {
      language = languageOrCallbacks;
    } else if (languageOrCallbacks && typeof languageOrCallbacks === 'object') {
      callbacks = languageOrCallbacks;
    }

    // Strict Mute Check: If muted, do NOT play voice under any circumstance
    if (this.isMuted) {
      callbacks?.onEnd?.();
      return;
    }

    if (!this.synth) return;

    this.stopSpeaking();

    const langDef = getLanguageDefinition(language);
    const isIndic = langDef.code !== 'en';
    const cleanText = this.cleanTextForSpeech(text, isIndic);
    if (!cleanText) {
      callbacks?.onEnd?.();
      return;
    }

    // Chrome speech synthesis resume fix
    if (this.synth.paused) {
      try {
        this.synth.resume();
      } catch (e) {
        // ignore
      }
    }

    const config = PERSONA_VOICE_CONFIGS[role] || PERSONA_VOICE_CONFIGS.student;
    const utterance = new SpeechSynthesisUtterance(cleanText);

    utterance.lang = langDef.bcp47;
    
    // Natural tuning for Indic vs English:
    // Indic languages sound much more natural and clear at rate 0.94-0.96 and pitch 1.04-1.08
    if (isIndic) {
      utterance.rate = 0.95;
      utterance.pitch = 1.05;
    } else {
      utterance.rate = config.rate || 1.0;
      utterance.pitch = config.pitch || 1.08;
    }

    // Pick best matching female voice for language & persona
    const voices = this.getVoices();
    if (voices && voices.length > 0) {
      let chosenVoice: SpeechSynthesisVoice | null = null;

      const isVoiceFemale = (v: SpeechSynthesisVoice): boolean => {
        const name = (v.name || '').toLowerCase();
        const isMale = MALE_VOICE_KEYWORDS.some((kw) => name.includes(kw.toLowerCase()));
        if (isMale) return false;
        const hasFemaleKw = FEMALE_VOICE_KEYWORDS.some((kw) => name.includes(kw.toLowerCase()));
        return hasFemaleKw;
      };

      const isNotMale = (v: SpeechSynthesisVoice): boolean => {
        const name = (v.name || '').toLowerCase();
        return !MALE_VOICE_KEYWORDS.some((kw) => name.includes(kw.toLowerCase()));
      };

      const langPrefix = langDef.bcp47.split('-')[0].toLowerCase();

      // 1. Find language-specific voices
      const languageSpecificVoices = voices.filter((v) => {
        const vLang = (v.lang || '').toLowerCase().replace('_', '-');
        return (
          vLang === langDef.bcp47.toLowerCase() ||
          vLang.startsWith(langPrefix + '-') ||
          vLang === langPrefix ||
          langDef.voiceKeywords.some((kw) => {
            const kwLower = kw.toLowerCase();
            return (
              (v.name || '').toLowerCase().includes(kwLower) ||
              vLang.includes(kwLower)
            );
          })
        );
      });

      if (languageSpecificVoices.length > 0) {
        // Priority 1A: Match persona preference list among language voices
        for (const pref of config.voiceNamePreference) {
          chosenVoice =
            languageSpecificVoices.find(
              (v) => (v.name || '').toLowerCase().includes(pref.toLowerCase()) && isNotMale(v)
            ) || null;
          if (chosenVoice) break;
        }

        // Priority 1B: Any female voice in this language
        if (!chosenVoice) {
          chosenVoice = languageSpecificVoices.find((v) => isVoiceFemale(v)) || null;
        }

        // Priority 1C: Any non-male voice in this language
        if (!chosenVoice) {
          chosenVoice = languageSpecificVoices.find((v) => isNotMale(v)) || null;
        }

        if (!chosenVoice) {
          chosenVoice = languageSpecificVoices[0];
        }

        utterance.voice = chosenVoice;
      } else if (!isIndic) {
        // For English, match preferred English voices
        for (const pref of config.voiceNamePreference) {
          chosenVoice =
            voices.find((v) => (v.name || '').toLowerCase().includes(pref.toLowerCase()) && isNotMale(v)) || null;
          if (chosenVoice) break;
        }
        if (!chosenVoice) {
          chosenVoice = voices.find((v) => (v.lang || '').startsWith('en') && isVoiceFemale(v)) || null;
        }
        if (!chosenVoice) {
          chosenVoice = voices.find((v) => (v.lang || '').startsWith('en') && isNotMale(v)) || null;
        }
        if (!chosenVoice) {
          chosenVoice = voices.find((v) => (v.lang || '').startsWith('en')) || voices[0];
        }
        if (chosenVoice) {
          utterance.voice = chosenVoice;
        }
      } else {
        // CRITICAL FOR INDIC LANGUAGES (Hindi, Tamil, Telugu, etc.):
        // If the OS voice list does not have an explicit voice object for this Indic language,
        // DO NOT assign an English voice (like Samantha)!
        // Leaving utterance.voice unset ensures the browser engine (Chrome/Edge/Android)
        // routes to its native cloud/OS multi-language synthesizer for utterance.lang (e.g. 'hi-IN').
      }
    }

    // Viseme simulation cycle during speech
    const visemeShapes: VisemeMouthShape[] = ['aa', 'oh', 'ee', 'ih', 'ou', 'smile', 'rest'];
    let visemeIndex = 0;

    const startVisemeLoop = () => {
      if (this.visemeTimer) clearInterval(this.visemeTimer);
      this.visemeTimer = setInterval(() => {
        if (!this.isSpeaking) {
          clearInterval(this.visemeTimer);
          callbacks?.onViseme?.('rest', 0);
          return;
        }
        // Generate organic mouth movement matching speech cadence
        const shape = visemeShapes[visemeIndex % visemeShapes.length];
        const amplitude = 0.45 + Math.random() * 0.55;
        callbacks?.onViseme?.(shape, amplitude);
        visemeIndex++;
      }, 110);
    };

    // Chrome 14-second SpeechSynthesis garbage collection keep-alive
    const startKeepAlive = () => {
      if (this.keepAliveInterval) clearInterval(this.keepAliveInterval);
      this.keepAliveInterval = setInterval(() => {
        if (this.synth && this.synth.speaking && !this.synth.paused) {
          this.synth.pause();
          this.synth.resume();
        }
      }, 5000);
    };

    const cleanup = () => {
      this.isSpeaking = false;
      if (this.visemeTimer) clearInterval(this.visemeTimer);
      if (this.keepAliveInterval) clearInterval(this.keepAliveInterval);
      callbacks?.onViseme?.('rest', 0);
      callbacks?.onEnd?.();
      this.currentUtterance = null;
    };

    utterance.onstart = () => {
      this.isSpeaking = true;
      callbacks?.onStart?.();
      startVisemeLoop();
      startKeepAlive();
    };

    utterance.onboundary = (event) => {
      if (event.name === 'word') {
        const shape = visemeShapes[Math.floor(Math.random() * (visemeShapes.length - 1))];
        callbacks?.onViseme?.(shape, 0.85);
      }
    };

    utterance.onend = () => {
      cleanup();
    };

    utterance.onerror = (e) => {
      console.warn('[VoiceService] Speech utterance error:', e);
      cleanup();
    };

    this.currentUtterance = utterance;
    
    try {
      this.synth.speak(utterance);
    } catch (err) {
      console.error('[VoiceService] synth.speak failed:', err);
      cleanup();
    }
  }

  public stopSpeaking() {
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch (e) {
        // ignore
      }
    }
    if (this.visemeTimer) {
      clearInterval(this.visemeTimer);
    }
    if (this.keepAliveInterval) {
      clearInterval(this.keepAliveInterval);
    }
    this.isSpeaking = false;
    this.currentUtterance = null;
  }

  public getIsSpeaking(): boolean {
    return this.isSpeaking;
  }

  public getIsListening(): boolean {
    return this.isListening;
  }
}

export const voiceService = new VoiceService();

