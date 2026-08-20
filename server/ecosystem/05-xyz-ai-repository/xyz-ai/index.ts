import { agentOrchestrator } from '../../../ai/agent.js';
import { memoryManager } from '../../../ai/memory.js';

export class XyzAiService {
  public static async processMessage(params: {
    sessionId: string;
    user: any;
    message: string;
  }) {
    return agentOrchestrator.process(params);
  }

  public static getMemory(sessionId: string) {
    return memoryManager.getSession(sessionId);
  }

  public static clearMemory(sessionId: string) {
    return memoryManager.clearSession(sessionId);
  }
}
