import React, { useRef, useEffect, useState } from 'react';
import {
  Send,
  Bot,
  User,
  ShieldCheck,
  ShieldAlert,
  HelpCircle,
  Clock,
  Sparkles,
  ArrowRight,
  Database,
  Mic,
  MicOff,
  Volume2,
  VolumeX
} from 'lucide-react';
import { ChatMessage, UserRole, ClarificationOption } from '../types';
import { voiceService } from '../services/voiceService';
import { AiAvatar } from './avatar/AiAvatar';
import { CleanMessageRenderer } from './chat/CleanMessageRenderer';
import { getTranslations } from '../i18n/localization';

interface ChatViewProps {
  messages: ChatMessage[];
  inputValue: string;
  onInputChange: (val: string) => void;
  onSendMessage: (text?: string) => void;
  isLoading: boolean;
  userRole: UserRole;
  userName: string;
  onSelectOption: (option: ClarificationOption) => void;
  selectedLanguage?: string;
}

export const ChatView: React.FC<ChatViewProps> = ({
  messages,
  inputValue,
  onInputChange,
  onSendMessage,
  isLoading,
  userRole,
  userName,
  onSelectOption,
  selectedLanguage = 'English'
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isListening, setIsListening] = useState(false);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);
  const t = getTranslations(selectedLanguage);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  const handleToggleMic = () => {
    if (isListening) {
      voiceService.stopListening();
      setIsListening(false);
      return;
    }

    voiceService.stopSpeaking();
    setSpeakingMessageId(null);

    const started = voiceService.startListening(
      {
        onResult: (transcript, isFinal) => {
          onInputChange(transcript);
          if (isFinal) {
            setIsListening(false);
            onSendMessage(transcript);
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

    if (started) {
      setIsListening(true);
    }
  };

  const handleSpeakMessage = (msgId: string, text: string) => {
    if (speakingMessageId === msgId) {
      voiceService.stopSpeaking();
      setSpeakingMessageId(null);
      return;
    }

    setSpeakingMessageId(msgId);
    voiceService.speak(
      text,
      userRole,
      selectedLanguage,
      {
        onEnd: () => {
          setSpeakingMessageId(null);
        }
      }
    );
  };

  return (
    <div className="flex-1 flex flex-col bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-6">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-500">
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
              <Bot className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-slate-800 mb-1">
              Pathshala AI School Assistant Ready
            </h3>
            <p className="text-xs text-slate-500 max-w-md leading-relaxed">
              Logged in as <strong className="text-slate-800">{userName}</strong> ({userRole.toUpperCase()}).
              Ask questions about attendance, submit assistance requests, or test role authorization boundaries.
            </p>
          </div>
        ) : (
          messages.map((msg) => {
            const isUser = msg.sender === 'user';

            return (
              <div
                key={msg.id}
                className={`flex items-start space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold shadow-2xs ${
                    isUser
                      ? 'bg-slate-900 text-white'
                      : 'bg-indigo-600 text-white'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Message Bubble & Metadata */}
                <div className={`flex flex-col max-w-xl ${isUser ? 'items-end' : 'items-start'}`}>
                  {/* Sender & Timestamp */}
                  <div className="flex items-center space-x-2 text-[10px] text-slate-400 mb-1 px-1">
                    <span className="font-semibold text-slate-600">
                      {isUser ? userName : 'Pathshala AI Assistant'}
                    </span>
                    <span>•</span>
                    <span>
                      {new Date(msg.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>

                  {/* Bubble */}
                  <div
                    className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${
                      isUser
                        ? 'bg-slate-900 text-white rounded-tr-xs'
                        : 'bg-slate-50 border border-slate-200/80 text-slate-800 rounded-tl-xs'
                    }`}
                  >
                    {isUser ? (
                      <div className="whitespace-pre-wrap">{msg.text}</div>
                    ) : (
                      <CleanMessageRenderer content={msg.text} isDark={false} />
                    )}

                    {/* Clarification Chips */}
                    {msg.clarificationOptions && msg.clarificationOptions.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-slate-200/60">
                        <div className="text-[11px] font-semibold text-slate-600 mb-2 flex items-center space-x-1">
                          <HelpCircle className="w-3.5 h-3.5 text-indigo-500" />
                          <span>Select an option:</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {msg.clarificationOptions.map((opt, i) => (
                            <button
                              key={i}
                              onClick={() => onSelectOption(opt)}
                              className="px-3 py-1.5 rounded-lg bg-white hover:bg-indigo-50 text-indigo-700 border border-indigo-200 font-medium text-xs transition flex items-center space-x-1 shadow-2xs hover:border-indigo-300"
                            >
                              <span>{opt.name || opt.value}</span>
                              {opt.class_name && (
                                <span className="text-[10px] text-slate-400 font-mono">
                                  ({opt.class_name})
                                </span>
                              )}
                              <ArrowRight className="w-3 h-3 ml-1 text-indigo-400" />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Tool Execution / Authorization Badge & TTS Speaker */}
                  <div className="mt-1.5 flex items-center justify-between w-full px-1">
                    <div className="flex items-center space-x-1.5 text-[10px] font-mono">
                      {!isUser && msg.toolExecuted && msg.toolExecuted !== 'none' && (
                        <>
                          <span className="text-slate-400">Tool:</span>
                          <span className="font-semibold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded-sm">
                            {msg.toolExecuted}
                          </span>
                          {msg.authorized ? (
                            <span className="text-emerald-700 font-semibold flex items-center space-x-0.5 bg-emerald-50 px-1.5 py-0.5 rounded-sm border border-emerald-200">
                              <ShieldCheck className="w-3 h-3" />
                              <span>Authorized</span>
                            </span>
                          ) : (
                            <span className="text-rose-700 font-semibold flex items-center space-x-0.5 bg-rose-50 px-1.5 py-0.5 rounded-sm border border-rose-200">
                              <ShieldAlert className="w-3 h-3" />
                              <span>Access Denied</span>
                            </span>
                          )}
                        </>
                      )}
                    </div>

                    {!isUser && (
                      <button
                        onClick={() => handleSpeakMessage(msg.id, msg.text)}
                        title={speakingMessageId === msg.id ? 'Stop Speech' : 'Listen with AI Persona Voice'}
                        className={`p-1 rounded-md text-xs transition flex items-center gap-1 ${
                          speakingMessageId === msg.id
                            ? 'text-indigo-600 bg-indigo-50 font-semibold animate-pulse'
                            : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {speakingMessageId === msg.id ? (
                          <>
                            <VolumeX className="w-3 h-3 text-rose-500" />
                            <span className="text-[10px] text-indigo-600">Playing...</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3 h-3" />
                            <span className="text-[10px]">Listen</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}

        {/* Loading Bubble */}
        {isLoading && (
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-3.5 rounded-2xl rounded-tl-xs bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></div>
              </div>
              <span className="text-slate-500 font-medium">Orchestrating agent & verifying permissions...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 sm:p-4 bg-slate-50 border-t border-slate-200">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSendMessage();
          }}
          className="flex items-end gap-2"
        >
          <div className="flex-1 bg-white rounded-xl border border-slate-300 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 transition shadow-2xs flex items-center">
            <textarea
              value={inputValue}
              onChange={(e) => onInputChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Ask as ${userName} (${userRole})... e.g. "What's my attendance?", "Mark Rahul absent", "Show school analytics"`}
              rows={1}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 bg-transparent border-0 focus:outline-hidden resize-none max-h-28"
            />

            {/* Mic button in text box */}
            <button
              type="button"
              onClick={handleToggleMic}
              title={isListening ? 'Stop Listening' : 'Speak to Pathshala AI'}
              className={`mr-2 p-2 rounded-lg transition ${
                isListening
                  ? 'bg-rose-500 text-white animate-pulse'
                  : 'text-slate-400 hover:text-indigo-600 hover:bg-slate-100'
              }`}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="p-2.5 sm:px-4 sm:py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium text-xs sm:text-sm transition flex items-center justify-center space-x-1.5 shadow-xs shrink-0"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Send</span>
          </button>
        </form>
      </div>
    </div>
  );
};
