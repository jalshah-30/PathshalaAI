import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ErpDatabaseModal } from './components/ErpDatabaseModal';
import { TestRunnerModal } from './components/TestRunnerModal';
import { SecurityCenterModal } from './components/modals/SecurityCenterModal';
import { AuditLogModal } from './components/modals/AuditLogModal';
import { EscalationModal } from './components/modals/EscalationModal';
import { EcosystemNavigator, EcosystemTab } from './ecosystem/EcosystemNavigator';
import { StudentPortal } from './ecosystem/01-student-repository/student-portal';
import { ParentPortal } from './ecosystem/02-parent-repository/parent-portal';
import { ManagementPortal } from './ecosystem/03-management-repository/management-portal';
import { StaffPortal } from './ecosystem/04-staff-repository/staff-portal';
import { XyzAiEngine } from './ecosystem/05-xyz-ai-repository/xyz-ai';
import { FloatingAvatarWidget } from './components/avatar/FloatingAvatarWidget';
import { ClassroomAmbientDecor } from './components/classroom/ClassroomAmbientDecor';
import { AuthUser, RoleDefinition, ChatMessage, DebugTrace, ActiveContext, ClarificationOption } from './types';

const DEFAULT_STUDENT: AuthUser = {
  userId: 'user-student-1',
  role: 'student',
  name: 'Rahul Sharma',
  email: 'rahul.sharma@school.edu',
  associatedId: 'S101'
};

const DEFAULT_ROLE_DEF: RoleDefinition = {
  role: 'student',
  title: 'Student Portal',
  personaName: 'Academic Assistant',
  personaDescription: 'Track academic attendance, daily schedules, worksheets, and ask Pathshala AI for homework help.',
  allowedActions: ['view_own_attendance', 'general_school_question']
};

export default function App() {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(DEFAULT_STUDENT);
  const [roleDefinition, setRoleDefinition] = useState<RoleDefinition | null>(DEFAULT_ROLE_DEF);
  const [availableUsers, setAvailableUsers] = useState<AuthUser[]>([DEFAULT_STUDENT]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const [activeContext, setActiveContext] = useState<ActiveContext | null>(null);
  const [latestTrace, setLatestTrace] = useState<DebugTrace | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showDebug, setShowDebug] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('English');
  
  // Theme state: dark/light mode
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('pathshala_theme');
    return saved ? saved === 'dark' : false;
  });

  useEffect(() => {
    localStorage.setItem('pathshala_theme', isDarkMode ? 'dark' : 'light');
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Modals state
  const [isErpModalOpen, setIsErpModalOpen] = useState(false);
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [isSecurityModalOpen, setIsSecurityModalOpen] = useState(false);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [isEscalationModalOpen, setIsEscalationModalOpen] = useState(false);
  const [escalationStudentName, setEscalationStudentName] = useState<string | undefined>(undefined);

  const [activeEcosystemTab, setActiveEcosystemTab] = useState<EcosystemTab>('01-student-portal');

  const sessionId = 'default-session';

  // Load session info on initial mount
  const fetchSession = async () => {
    try {
      const res = await fetch(`/api/session?sessionId=${sessionId}`);
      const data = await res.json();
      setCurrentUser(data.currentUser);
      setRoleDefinition(data.roleDefinition);
      setAvailableUsers(data.availableUsers || []);
      setActiveContext(data.activeContext || null);
      if (data.messages && data.messages.length > 0) {
        setMessages(data.messages);
        const lastWithTrace = [...data.messages].reverse().find((m: ChatMessage) => m.debugTrace);
        if (lastWithTrace) {
          setLatestTrace(lastWithTrace.debugTrace);
        }
      }
    } catch (err) {
      console.error('Failed to fetch session:', err);
    }
  };

  useEffect(() => {
    fetchSession();
  }, []);

  const handleSwitchUser = async (userId: string) => {
    try {
      const res = await fetch('/api/session/switch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, userId })
      });
      const data = await res.json();
      if (data.success) {
        setCurrentUser(data.user);
        setRoleDefinition(data.roleDefinition);
        if (data.user?.role === 'student') setActiveEcosystemTab('01-student-portal');
        else if (data.user?.role === 'parent') setActiveEcosystemTab('02-parent-portal');
        else if (data.user?.role === 'teacher') setActiveEcosystemTab('04-staff-portal');
        else if (data.user?.role === 'principal') setActiveEcosystemTab('03-management-portal');
        fetchSession();
      }
    } catch (err) {
      console.error('Failed to switch user:', err);
    }
  };

  const handleSelectEcosystemTab = (tab: EcosystemTab) => {
    setActiveEcosystemTab(tab);

    // Align default demo user for relevant portal
    if (tab === '01-student-portal' && currentUser?.role !== 'student') {
      const studentUser = availableUsers.find((u) => u.role === 'student');
      if (studentUser) handleSwitchUser(studentUser.userId);
    } else if (tab === '02-parent-portal' && currentUser?.role !== 'parent') {
      const parentUser = availableUsers.find((u) => u.role === 'parent');
      if (parentUser) handleSwitchUser(parentUser.userId);
    } else if (tab === '03-management-portal' && currentUser?.role !== 'principal') {
      const principalUser = availableUsers.find((u) => u.role === 'principal');
      if (principalUser) handleSwitchUser(principalUser.userId);
    } else if (tab === '04-staff-portal' && currentUser?.role !== 'teacher') {
      const teacherUser = availableUsers.find((u) => u.role === 'teacher');
      if (teacherUser) handleSwitchUser(teacherUser.userId);
    }
  };

  const handleClearSession = async () => {
    try {
      await fetch('/api/session/clear', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId })
      });
      setMessages([]);
      setLatestTrace(null);
      fetchSession();
    } catch (err) {
      console.error('Failed to clear session:', err);
    }
  };

  const handleSendMessage = async (customText?: string) => {
    const textToSend = (customText || inputValue).trim();
    if (!textToSend || isLoading) return;

    // Switch to Pathshala AI tab automatically if interacting with prompt from portal
    if (activeEcosystemTab !== '05-xyz-ai') {
      setActiveEcosystemTab('05-xyz-ai');
    }

    // Optimistic user message addition
    const tempUserMsg: ChatMessage = {
      id: `temp-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toISOString(),
      role: currentUser?.role
    };

    setMessages((prev) => [...prev, tempUserMsg]);
    if (!customText) setInputValue('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          message: textToSend,
          language: selectedLanguage
        })
      });

      const data = await res.json();
      if (data.message) {
        setMessages((prev) => {
          const filtered = prev.filter((m) => !m.id.startsWith('temp-'));
          return [...filtered, tempUserMsg, data.message];
        });

        if (data.debugTrace) {
          setLatestTrace(data.debugTrace);
        }
      }
      fetchSession();
    } catch (err) {
      console.error('Error in handleSendMessage:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectClarificationOption = (option: ClarificationOption) => {
    const chosenText = option.name || option.value || option.student_id;
    if (chosenText) {
      handleSendMessage(chosenText);
    }
  };

  const handleOpenEscalation = (studentName?: string) => {
    setEscalationStudentName(studentName);
    setIsEscalationModalOpen(true);
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 flex flex-col font-sans antialiased ${
      isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50/80 text-slate-900'
    }`}>
      {/* Top Application Header */}
      <Header
        currentUser={currentUser}
        roleDefinition={roleDefinition}
        availableUsers={availableUsers}
        onSwitchUser={handleSwitchUser}
        onClearSession={handleClearSession}
        onOpenDatabase={() => setIsErpModalOpen(true)}
        onOpenTestRunner={() => setIsTestModalOpen(true)}
        onOpenSecurityCenter={() => setIsSecurityModalOpen(true)}
        onOpenAuditLogs={() => setIsAuditModalOpen(true)}
        selectedLanguage={selectedLanguage}
        onSelectLanguage={setSelectedLanguage}
        showDebug={showDebug}
        onToggleDebug={() => setShowDebug(!showDebug)}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
        onSendPrompt={handleSendMessage}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 flex flex-col gap-4">
        {/* Visual School ERP Ecosystem Hierarchy Switcher */}
        <EcosystemNavigator
          activeTab={activeEcosystemTab}
          onSelectTab={handleSelectEcosystemTab}
          currentUser={currentUser}
          isDarkMode={isDarkMode}
          selectedLanguage={selectedLanguage}
        />

        {/* Dynamic Repository / Portal View Rendering */}
        {activeEcosystemTab === '01-student-portal' && (
          <StudentPortal
            currentUser={currentUser}
            availableUsers={availableUsers}
            onSwitchUser={handleSwitchUser}
            onAskAi={handleSendMessage}
            onOpenAiAssistant={() => setActiveEcosystemTab('05-xyz-ai')}
            onOpenVoiceStage={() => setActiveEcosystemTab('05-xyz-ai')}
            isDarkMode={isDarkMode}
            selectedLanguage={selectedLanguage}
          />
        )}

        {activeEcosystemTab === '02-parent-portal' && (
          <ParentPortal
            currentUser={currentUser}
            onAskAi={handleSendMessage}
            onOpenAiAssistant={() => setActiveEcosystemTab('05-xyz-ai')}
            isDarkMode={isDarkMode}
            selectedLanguage={selectedLanguage}
          />
        )}

        {activeEcosystemTab === '03-management-portal' && (
          <ManagementPortal
            currentUser={currentUser}
            onAskAi={handleSendMessage}
            onOpenAiAssistant={() => setActiveEcosystemTab('05-xyz-ai')}
            isDarkMode={isDarkMode}
            selectedLanguage={selectedLanguage}
          />
        )}

        {activeEcosystemTab === '04-staff-portal' && (
          <StaffPortal
            currentUser={currentUser}
            onAskAi={handleSendMessage}
            onOpenAiAssistant={() => setActiveEcosystemTab('05-xyz-ai')}
            isDarkMode={isDarkMode}
            selectedLanguage={selectedLanguage}
          />
        )}

        {activeEcosystemTab === '05-xyz-ai' && (
          <XyzAiEngine
            currentUser={currentUser}
            roleDefinition={roleDefinition}
            messages={messages}
            inputValue={inputValue}
            onInputChange={setInputValue}
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            activeContext={activeContext}
            latestTrace={latestTrace}
            onSelectOption={handleSelectClarificationOption}
            showDebug={showDebug}
            onToggleDebug={() => setShowDebug(!showDebug)}
            onOpenSecurityCenter={() => setIsSecurityModalOpen(true)}
            onOpenAuditLogs={() => setIsAuditModalOpen(true)}
            onRequestTeacherCall={handleOpenEscalation}
            selectedLanguage={selectedLanguage}
          />
        )}
      </main>

      {/* Floating Voice Avatar Widget when viewing specific portals */}
      {activeEcosystemTab !== '05-xyz-ai' && (
        <FloatingAvatarWidget
          currentUser={currentUser}
          latestAssistantMessage={[...messages].reverse().find((m) => m.sender === 'assistant') || null}
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
          onSelectOption={handleSelectClarificationOption}
          onOpenFullAssistant={() => setActiveEcosystemTab('05-xyz-ai')}
          selectedLanguage={selectedLanguage}
        />
      )}

      {/* Classroom Ambient Flying Paper Plane & Quick Scratchpad Tools */}
      <ClassroomAmbientDecor
        isDarkMode={isDarkMode}
        onAskAi={handleSendMessage}
      />

      {/* Live School ERP Database Modal */}
      <ErpDatabaseModal
        isOpen={isErpModalOpen}
        onClose={() => setIsErpModalOpen(false)}
      />

      {/* Automated Test Suite Modal */}
      <TestRunnerModal
        isOpen={isTestModalOpen}
        onClose={() => setIsTestModalOpen(false)}
      />

      {/* Security Attack Simulator Modal */}
      <SecurityCenterModal
        isOpen={isSecurityModalOpen}
        onClose={() => setIsSecurityModalOpen(false)}
      />

      {/* Real-time Audit Logs Modal */}
      <AuditLogModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
      />

      {/* Consultation Ticket Escalation Modal */}
      {currentUser && (
        <EscalationModal
          isOpen={isEscalationModalOpen}
          onClose={() => setIsEscalationModalOpen(false)}
          user={currentUser}
          defaultStudentName={escalationStudentName}
          onSuccessPrompt={(msg) => handleSendMessage(msg)}
        />
      )}
    </div>
  );
}
