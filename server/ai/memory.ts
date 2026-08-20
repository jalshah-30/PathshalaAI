export interface DebugTraceData {
  role: string;
  intent: string;
  entities: Record<string, any>;
  tool: string;
  authorized: boolean;
  authReason?: string;
  rawResult?: any;
  resolvedFromMemory: boolean;
  latencyMs: number;
  modelUsed?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  role?: string;
  intent?: string;
  entities?: Record<string, any>;
  toolExecuted?: string;
  toolResult?: any;
  authorized?: boolean;
  clarificationOptions?: { student_id?: string; name: string; class_name?: string; value?: string }[];
  debugTrace?: DebugTraceData;
}

export interface SessionContextState {
  sessionId: string;
  role: string;
  userId: string;
  currentStudentId?: string;
  currentStudentName?: string;
  currentClass?: string;
  currentIntent?: string;
  currentDate?: string;
  lastToolExecuted?: string;
  language: string;
  pendingClarification?: {
    type: 'disambiguate_student' | 'missing_student' | 'missing_status' | 'missing_date';
    originalIntent: string;
    partialEntities: Record<string, any>;
    options?: { student_id?: string; name: string; class_name?: string }[];
  };
  messages: ChatMessage[];
}

export class ConversationMemoryManager {
  private sessions: Map<string, SessionContextState> = new Map();

  public getOrCreateSession(sessionId: string, userId: string, role: string): SessionContextState {
    let session = this.sessions.get(sessionId);
    if (!session) {
      session = {
        sessionId,
        role,
        userId,
        language: 'English',
        messages: []
      };
      this.sessions.set(sessionId, session);
    } else {
      // Sync current role if switched
      session.role = role;
      session.userId = userId;
    }
    return session;
  }

  public getSession(sessionId: string): SessionContextState | undefined {
    return this.sessions.get(sessionId);
  }

  public addMessage(sessionId: string, message: ChatMessage): void {
    const session = this.sessions.get(sessionId);
    if (session) {
      session.messages.push(message);
      // Keep last 40 messages to prevent unbounded growth
      if (session.messages.length > 40) {
        session.messages = session.messages.slice(session.messages.length - 40);
      }
    }
  }

  public updateContext(sessionId: string, updates: Partial<SessionContextState>): void {
    const session = this.sessions.get(sessionId);
    if (session) {
      Object.assign(session, updates);
    }
  }

  public clearPendingClarification(sessionId: string): void {
    const session = this.sessions.get(sessionId);
    if (session) {
      session.pendingClarification = undefined;
    }
  }

  public clearSession(sessionId: string): void {
    const session = this.sessions.get(sessionId);
    if (session) {
      session.messages = [];
      session.currentStudentId = undefined;
      session.currentStudentName = undefined;
      session.currentClass = undefined;
      session.currentIntent = undefined;
      session.lastToolExecuted = undefined;
      session.pendingClarification = undefined;
    }
  }

  /**
   * Resolves pronouns ('he', 'she', 'they', 'him', 'her', 'my child', 'the student')
   * or implicit context to previous active student.
   */
  public resolveContextualEntity(
    sessionId: string,
    extractedStudentName?: string
  ): { studentName?: string; studentId?: string; resolvedFromMemory: boolean } {
    const session = this.sessions.get(sessionId);
    if (!session) {
      return { studentName: extractedStudentName, resolvedFromMemory: false };
    }

    // If explicit name provided and not a pronoun
    if (extractedStudentName) {
      const lower = extractedStudentName.trim().toLowerCase();
      const pronouns = ['he', 'she', 'him', 'her', 'they', 'them', 'the child', 'my child', 'my kid', 'the student', 'this student'];
      if (!pronouns.includes(lower)) {
        return {
          studentName: extractedStudentName,
          studentId: undefined, // will be looked up by name
          resolvedFromMemory: false
        };
      }
    }

    // If no student name provided or pronoun used, check session memory
    if (session.currentStudentName) {
      return {
        studentName: session.currentStudentName,
        studentId: session.currentStudentId,
        resolvedFromMemory: true
      };
    }

    return { studentName: undefined, studentId: undefined, resolvedFromMemory: false };
  }
}

export const memoryManager = new ConversationMemoryManager();
