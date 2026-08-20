import { AuthUser, DEMO_USERS, UserRole } from './roles.js';

class SessionManager {
  private activeSessions: Map<string, AuthUser> = new Map();
  private defaultSessionId = 'default-session';

  constructor() {
    // Default to Student or Parent for demo
    this.activeSessions.set(this.defaultSessionId, DEMO_USERS[0]); // Rahul Sharma (Student)
  }

  public getSession(sessionId: string = this.defaultSessionId): AuthUser {
    return this.activeSessions.get(sessionId) || DEMO_USERS[0];
  }

  public setSessionUser(sessionId: string = this.defaultSessionId, user: AuthUser): void {
    this.activeSessions.set(sessionId, user);
  }

  public switchUserByRole(role: UserRole, sessionId: string = this.defaultSessionId): AuthUser {
    const user = DEMO_USERS.find((u) => u.role === role) || DEMO_USERS[0];
    this.activeSessions.set(sessionId, user);
    return user;
  }

  public switchUserById(userId: string, sessionId: string = this.defaultSessionId): AuthUser {
    const user = DEMO_USERS.find((u) => u.userId === userId) || DEMO_USERS[0];
    this.activeSessions.set(sessionId, user);
    return user;
  }

  public getAvailableUsers(): AuthUser[] {
    return DEMO_USERS;
  }
}

export const sessionManager = new SessionManager();
