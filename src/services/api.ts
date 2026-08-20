import {
  AuthUser,
  RoleDefinition,
  ActiveContext,
  ChatMessage,
  RiskAlert,
  AttendanceTrendResult,
  ExplainWhyResult,
  AuditLogEntry,
  SecurityTestResult,
  TestSuiteSummary
} from '../types';

export interface SessionResponse {
  sessionId: string;
  currentUser: AuthUser;
  roleDefinition: RoleDefinition;
  availableUsers: AuthUser[];
  roleDefinitions: Record<string, RoleDefinition>;
  activeContext: ActiveContext;
  messages: ChatMessage[];
}

export async function fetchSession(sessionId: string = 'default-session'): Promise<SessionResponse> {
  const res = await fetch(`/api/session?sessionId=${encodeURIComponent(sessionId)}`);
  if (!res.ok) throw new Error('Failed to fetch session');
  return res.json();
}

export async function switchUser(
  sessionId: string,
  userId?: string,
  role?: string
): Promise<{ success: boolean; user: AuthUser; roleDefinition: RoleDefinition }> {
  const res = await fetch('/api/session/switch', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId, userId, role })
  });
  if (!res.ok) throw new Error('Failed to switch user');
  return res.json();
}

export async function clearSessionMemory(sessionId: string): Promise<{ success: boolean; message: string }> {
  const res = await fetch('/api/session/clear', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId })
  });
  if (!res.ok) throw new Error('Failed to clear session');
  return res.json();
}

export async function sendChatMessage(
  sessionId: string,
  message: string,
  language?: string
): Promise<{ message: ChatMessage; debugTrace: any }> {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId, message, language })
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Chat request failed' }));
    throw new Error(err.error || 'Chat request failed');
  }
  return res.json();
}

export async function executeToolDirectly(
  toolName: string,
  params: Record<string, any> = {},
  sessionId: string = 'default-session'
): Promise<any> {
  const res = await fetch('/api/tools/execute', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId, toolName, params })
  });
  if (!res.ok) throw new Error('Tool execution request failed');
  return res.json();
}

export async function fetchAttendanceTrend(
  studentId?: string,
  sessionId: string = 'default-session'
): Promise<AttendanceTrendResult | null> {
  const url = studentId
    ? `/api/analytics/trends?studentId=${encodeURIComponent(studentId)}&sessionId=${encodeURIComponent(sessionId)}`
    : `/api/analytics/trends?sessionId=${encodeURIComponent(sessionId)}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const json = await res.json();
  return json.data || null;
}

export async function fetchAtRiskStudents(
  className?: string,
  sessionId: string = 'default-session'
): Promise<{ scope: string; total_at_risk_detected: number; high_risk_count: number; medium_risk_count: number; alerts: RiskAlert[] } | null> {
  const url = className
    ? `/api/analytics/at-risk?className=${encodeURIComponent(className)}&sessionId=${encodeURIComponent(sessionId)}`
    : `/api/analytics/at-risk?sessionId=${encodeURIComponent(sessionId)}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const json = await res.json();
  return json.data || null;
}

export async function fetchExplainWhy(
  className?: string,
  sessionId: string = 'default-session'
): Promise<ExplainWhyResult | null> {
  const url = className
    ? `/api/analytics/explain-why?className=${encodeURIComponent(className)}&sessionId=${encodeURIComponent(sessionId)}`
    : `/api/analytics/explain-why?sessionId=${encodeURIComponent(sessionId)}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const json = await res.json();
  return json.data || null;
}

export async function runSecuritySimulator(): Promise<{
  totalTests: number;
  passedTests: number;
  failedTests: number;
  results: SecurityTestResult[];
}> {
  const res = await fetch('/api/security/simulate');
  if (!res.ok) throw new Error('Security simulation failed');
  return res.json();
}

export async function fetchAuditLogs(limit: number = 50): Promise<{ count: number; logs: AuditLogEntry[] }> {
  const res = await fetch(`/api/audit-logs?limit=${limit}`);
  if (!res.ok) throw new Error('Failed to fetch audit logs');
  return res.json();
}

export async function submitEscalationRequest(params: {
  sessionId?: string;
  targetType: 'teacher' | 'principal';
  studentId?: string;
  studentName?: string;
  reason: string;
}): Promise<any> {
  const res = await fetch('/api/escalation/request', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params)
  });
  if (!res.ok) throw new Error('Escalation submission failed');
  return res.json();
}

export async function runAutomatedTestSuite(): Promise<TestSuiteSummary> {
  const res = await fetch('/api/tests/run');
  if (!res.ok) throw new Error('Test suite execution failed');
  return res.json();
}

export async function fetchERPDatabase(): Promise<any> {
  const res = await fetch('/api/erp/data');
  if (!res.ok) throw new Error('Failed to fetch ERP data');
  return res.json();
}

export async function resetERPDatabase(): Promise<{ success: boolean; message: string }> {
  const res = await fetch('/api/erp/reset', { method: 'POST' });
  if (!res.ok) throw new Error('Failed to reset ERP database');
  return res.json();
}
