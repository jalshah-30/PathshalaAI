import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { sessionManager } from './server/auth/authentication.js';
import { DEMO_USERS, ROLE_DEFINITIONS, UserRole } from './server/auth/roles.js';
import { agentOrchestrator } from './server/ai/agent.js';
import { memoryManager } from './server/ai/memory.js';
import { db } from './server/database/database.js';
import { runAllAutomatedTests } from './server/tests/testSuite.js';
import { runSecuritySimulator } from './server/tools/securitySimulator.js';
import { executeTool } from './server/tools/index.js';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// --- API Endpoints ---

// 1. Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    app: 'Pathshala AI — Smart AI School Copilot',
    environment: process.env.NODE_ENV || 'development',
    geminiConfigured: !!process.env.GEMINI_API_KEY
  });
});

// 2. Session information & demo accounts
app.get('/api/session', (req, res) => {
  const sessionId = (req.query.sessionId as string) || 'default-session';
  const currentUser = sessionManager.getSession(sessionId);
  const sessionMemory = memoryManager.getOrCreateSession(sessionId, currentUser.userId, currentUser.role);

  res.json({
    sessionId,
    currentUser,
    roleDefinition: ROLE_DEFINITIONS[currentUser.role],
    availableUsers: DEMO_USERS,
    roleDefinitions: ROLE_DEFINITIONS,
    activeContext: {
      currentStudentId: sessionMemory.currentStudentId,
      currentStudentName: sessionMemory.currentStudentName,
      currentClass: sessionMemory.currentClass,
      currentIntent: sessionMemory.currentIntent,
      lastToolExecuted: sessionMemory.lastToolExecuted,
      messageCount: sessionMemory.messages.length
    },
    messages: sessionMemory.messages
  });
});

// 3. Switch active authenticated user / role
app.post('/api/session/switch', (req, res) => {
  const { sessionId = 'default-session', userId, role } = req.body;
  let user;

  if (userId) {
    user = sessionManager.switchUserById(userId, sessionId);
  } else if (role) {
    user = sessionManager.switchUserByRole(role as UserRole, sessionId);
  } else {
    user = sessionManager.getSession(sessionId);
  }

  // Update memory session role
  memoryManager.getOrCreateSession(sessionId, user.userId, user.role);

  res.json({
    success: true,
    user,
    roleDefinition: ROLE_DEFINITIONS[user.role]
  });
});

// 4. Clear conversation memory
app.post('/api/session/clear', (req, res) => {
  const { sessionId = 'default-session' } = req.body;
  memoryManager.clearSession(sessionId);

  res.json({
    success: true,
    message: 'Conversation memory and active context reset successfully.'
  });
});

// 5. Chat interaction with AI Agent Orchestrator
app.post('/api/chat', async (req, res) => {
  try {
    const { sessionId = 'default-session', message, language } = req.body;

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      res.status(400).json({ error: 'Message content is required.' });
      return;
    }

    const currentUser = sessionManager.getSession(sessionId);
    const result = await agentOrchestrator.process({
      sessionId,
      user: currentUser,
      message: message.trim(),
      language: language || 'English'
    });

    res.json(result);
  } catch (err: any) {
    console.error('Error processing chat:', err);
    res.status(500).json({
      error: 'Agent processing error',
      details: err.message || String(err)
    });
  }
});

// 6. Direct Tool Execution (for interactive copilot action buttons)
app.post('/api/tools/execute', (req, res) => {
  const { sessionId = 'default-session', toolName, params = {} } = req.body;
  const currentUser = sessionManager.getSession(sessionId);

  const result = executeTool(toolName, currentUser, params);
  res.json(result);
});

// 7. Analytics: Multi-week Attendance Trends
app.get('/api/analytics/trends', (req, res) => {
  const studentId = req.query.studentId as string;
  const sessionId = (req.query.sessionId as string) || 'default-session';
  const currentUser = sessionManager.getSession(sessionId);

  const targetId = studentId || (currentUser.role === 'student' ? currentUser.associatedId : currentUser.childrenIds?.[0]);
  if (!targetId) {
    res.status(400).json({ error: 'Student ID required' });
    return;
  }

  const result = executeTool('get_attendance_trend', currentUser, { student_id: targetId });
  res.json(result);
});

// 8. Analytics: Early Warning Risk Alerts
app.get('/api/analytics/at-risk', (req, res) => {
  const className = req.query.className as string;
  const sessionId = (req.query.sessionId as string) || 'default-session';
  const currentUser = sessionManager.getSession(sessionId);

  const result = executeTool('get_at_risk_students', currentUser, { class_name: className });
  res.json(result);
});

// 9. Analytics: Explain Why Diagnostic Root Cause
app.get('/api/analytics/explain-why', (req, res) => {
  const className = req.query.className as string;
  const sessionId = (req.query.sessionId as string) || 'default-session';
  const currentUser = sessionManager.getSession(sessionId);

  const result = executeTool('analyze_attendance', currentUser, { class_name: className });
  res.json(result);
});

// 10. Security Simulator (7 Attack Vector Test Suite)
app.get('/api/security/simulate', (req, res) => {
  const results = runSecuritySimulator();
  res.json({
    totalTests: results.length,
    passedTests: results.filter((r) => r.status === 'PASSED').length,
    failedTests: results.filter((r) => r.status === 'FAILED').length,
    results
  });
});

// 11. Security Audit Logs Trail
app.get('/api/audit-logs', (req, res) => {
  const limit = Number(req.query.limit) || 50;
  const logs = db.getAuditLogs(limit);
  res.json({
    count: logs.length,
    logs
  });
});

// 12. Submit Call / Escalation Request
app.post('/api/escalation/request', (req, res) => {
  const { sessionId = 'default-session', targetType, studentId, studentName, reason } = req.body;
  const currentUser = sessionManager.getSession(sessionId);

  if (targetType === 'principal') {
    const result = executeTool('request_management_assistance', currentUser, { reason });
    res.json(result);
  } else {
    const result = executeTool('request_teacher_assistance', currentUser, {
      student_id: studentId,
      student_name: studentName,
      reason
    });
    res.json(result);
  }
});

// 13. Inspect ERP Database
app.get('/api/erp/data', (req, res) => {
  const snapshot = db.getSnapshot();
  res.json(snapshot);
});

// 14. Reset ERP Database
app.post('/api/erp/reset', (req, res) => {
  db.seed();
  res.json({ success: true, message: 'School ERP database reset to initial seed state.' });
});

// 15. Run Automated Test Suite
app.get('/api/tests/run', async (req, res) => {
  try {
    const testReport = await runAllAutomatedTests();
    res.json(testReport);
  } catch (err: any) {
    console.error('Test execution failed:', err);
    res.status(500).json({ error: 'Failed to run test suite', details: err.message });
  }
});

// --- Vite Middleware / Static Serving ---
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Pathshala AI School Assistant running at http://localhost:${PORT} (or http://127.0.0.1:${PORT})`);
  });
}

startServer();
