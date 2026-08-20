import React, { useState } from 'react';
import { 
  Bot, 
  Activity, 
  Terminal,
  Mic,
  MessageSquare,
  Sparkles,
  LayoutDashboard
} from 'lucide-react';
import { ChatView } from '../../../components/ChatView';
import { DebugInspector } from '../../../components/DebugInspector';
import { QuickPrompts } from '../../../components/QuickPrompts';
import { AvatarStage } from '../../../components/avatar/AvatarStage';
import { StudentCopilot } from '../../../components/copilot/StudentCopilot';
import { ParentCopilot } from '../../../components/copilot/ParentCopilot';
import { TeacherCopilot } from '../../../components/copilot/TeacherCopilot';
import { PrincipalCopilot } from '../../../components/copilot/PrincipalCopilot';
import { AuthUser, RoleDefinition, ChatMessage, DebugTrace, ActiveContext, ClarificationOption } from '../../../types';
import { SupportedLanguage } from '../../../i18n/localization';
import { getPortalTranslations } from '../../../i18n/portalTranslations';

interface XyzAiEngineProps {
  currentUser: AuthUser | null;
  roleDefinition: RoleDefinition | null;
  messages: ChatMessage[];
  inputValue: string;
  onInputChange: (val: string) => void;
  onSendMessage: (customText?: string) => void;
  isLoading: boolean;
  activeContext: ActiveContext | null;
  latestTrace: DebugTrace | null;
  onSelectOption: (option: ClarificationOption) => void;
  showDebug: boolean;
  onToggleDebug: () => void;
  onOpenSecurityCenter: () => void;
  onOpenAuditLogs: () => void;
  onRequestTeacherCall: (studentName?: string) => void;
  selectedLanguage?: SupportedLanguage;
}

export function XyzAiEngine({
  currentUser,
  roleDefinition,
  messages,
  inputValue,
  onInputChange,
  onSendMessage,
  isLoading,
  activeContext,
  latestTrace,
  onSelectOption,
  showDebug,
  onToggleDebug,
  onOpenSecurityCenter,
  onOpenAuditLogs,
  onRequestTeacherCall,
  selectedLanguage = 'en'
}: XyzAiEngineProps) {
  const [viewMode, setViewMode] = useState<'avatar' | 'chat'>('avatar');
  const [showCopilotCard, setShowCopilotCard] = useState(true);

  const t = getPortalTranslations(selectedLanguage);
  const tc = t.copilots;

  // Latest assistant message for the avatar to speak & display
  const latestAssistantMessage = [...messages].reverse().find((m) => m.sender === 'assistant') || null;

  return (
    <div className="space-y-4 animate-fadeIn">
      {/* Top Banner / Pathshala AI Orchestrator Engine */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 text-white shadow-xl border border-indigo-900/40 relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-indigo-600/30 backdrop-blur border border-indigo-500/40 flex items-center justify-center text-indigo-300 shadow-inner">
              <Bot className="w-9 h-9" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="bg-indigo-500/30 text-indigo-300 text-xs px-2.5 py-0.5 rounded-full font-semibold uppercase tracking-wider border border-indigo-400/30">
                  {tc.aiEngineBannerTag}
                </span>
                <span className="bg-emerald-500/20 text-emerald-300 text-xs px-2 py-0.5 rounded-full font-medium border border-emerald-400/30 flex items-center gap-1">
                  <Activity className="w-3 h-3 text-emerald-400 animate-pulse" />
                  {tc.voiceAvatarOnline}
                </span>
              </div>
              <h1 className="text-2xl font-bold mt-1 text-white tracking-tight">
                {tc.aiEngineTitle}
              </h1>
              <p className="text-slate-300 text-sm flex flex-wrap items-center gap-3 mt-0.5">
                <span>{tc.aiEngineSubtitle}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Toggle Copilot Card */}
            <button
              onClick={() => setShowCopilotCard(!showCopilotCard)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border cursor-pointer ${
                showCopilotCard
                  ? 'bg-emerald-600/20 border-emerald-500/40 text-emerald-300'
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>{showCopilotCard ? tc.hideDashboard : tc.showDashboard}</span>
            </button>

            {/* View Mode Toggle */}
            <div className="bg-slate-800/90 p-1 rounded-xl border border-slate-700 flex items-center shadow-inner">
              <button
                onClick={() => setViewMode('avatar')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'avatar'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Mic className="w-3.5 h-3.5" />
                <span>{tc.avatarMode}</span>
              </button>
              <button
                onClick={() => setViewMode('chat')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'chat'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{tc.chatMode}</span>
              </button>
            </div>

            <button
              onClick={onToggleDebug}
              className={`px-3.5 py-2 rounded-xl font-semibold text-xs transition flex items-center gap-1.5 border cursor-pointer ${
                showDebug
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-md'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{showDebug ? 'Hide Trace' : 'Show Trace'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Role-Specific Copilot Intelligence Card */}
      {showCopilotCard && currentUser && (
        <div className="animate-fadeIn">
          {currentUser.role === 'student' && (
            <StudentCopilot
              user={currentUser}
              onSendPrompt={(p) => onSendMessage(p)}
              onRequestTeacherCall={() => onRequestTeacherCall(currentUser.name)}
            />
          )}

          {currentUser.role === 'parent' && (
            <ParentCopilot
              user={currentUser}
              onSendPrompt={(p) => onSendMessage(p)}
              onRequestTeacherCall={(childName) => onRequestTeacherCall(childName)}
            />
          )}

          {currentUser.role === 'teacher' && (
            <TeacherCopilot
              user={currentUser}
              onSendPrompt={(p) => onSendMessage(p)}
              onRequestParentCall={(studentName) => onRequestTeacherCall(studentName)}
            />
          )}

          {currentUser.role === 'principal' && (
            <PrincipalCopilot
              user={currentUser}
              onSendPrompt={(p) => onSendMessage(p)}
              onOpenSecurityCenter={onOpenSecurityCenter}
              onOpenAuditLogs={onOpenAuditLogs}
            />
          )}
        </div>
      )}

      {/* Main Mode View */}
      {viewMode === 'avatar' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          <div className={`${showDebug ? 'lg:col-span-8' : 'lg:col-span-12'}`}>
            <AvatarStage
              currentUser={currentUser}
              latestAssistantMessage={latestAssistantMessage}
              onSendMessage={(text) => onSendMessage(text)}
              isLoading={isLoading}
              onSelectOption={onSelectOption}
              onSwitchToChat={() => setViewMode('chat')}
              selectedLanguage={selectedLanguage}
            />
          </div>

          {/* Real-time Architecture & Trace Inspector */}
          {showDebug && (
            <div className="lg:col-span-4 sticky top-20">
              <DebugInspector
                trace={latestTrace}
                activeContext={activeContext}
                onClose={onToggleDebug}
              />
            </div>
          )}
        </div>
      ) : (
        <>
          {/* Quick Prompts for Current Context */}
          {currentUser && (
            <QuickPrompts
              role={currentUser.role}
              onSelectPrompt={(p) => onSendMessage(p)}
              disabled={isLoading}
            />
          )}

          {/* Chat Assistant and Trace Inspector Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start min-h-[580px]">
            {/* Main Chat Area */}
            <div className={`${showDebug ? 'lg:col-span-8' : 'lg:col-span-12'} h-[620px] flex flex-col`}>
              <ChatView
                messages={messages}
                inputValue={inputValue}
                onInputChange={onInputChange}
                onSendMessage={onSendMessage}
                isLoading={isLoading}
                userRole={currentUser?.role || 'student'}
                userName={currentUser?.name || 'User'}
                onSelectOption={onSelectOption}
                selectedLanguage={selectedLanguage}
              />
            </div>

            {/* Real-time Architecture & Trace Inspector */}
            {showDebug && (
              <div className="lg:col-span-4 sticky top-20">
                <DebugInspector
                  trace={latestTrace}
                  activeContext={activeContext}
                  onClose={onToggleDebug}
                />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
