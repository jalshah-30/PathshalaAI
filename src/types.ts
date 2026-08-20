export type UserRole = 'student' | 'parent' | 'teacher' | 'principal';

export interface AuthUser {
  userId: string;
  role: UserRole;
  name: string;
  email: string;
  associatedId?: string;
  assignedClass?: string;
  childrenIds?: string[];
}

export interface RoleDefinition {
  role: UserRole;
  title: string;
  personaName: string;
  personaDescription: string;
  allowedActions: string[];
}

export interface DebugTrace {
  role: string;
  intent: string;
  entities: Record<string, any>;
  tool: string;
  authorized: boolean;
  authReason?: string;
  rawResult?: any;
  resolvedFromMemory?: boolean;
  latencyMs?: number;
  modelUsed?: string;
}

export interface ClarificationOption {
  student_id?: string;
  name: string;
  class_name?: string;
  value?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  role?: UserRole;
  intent?: string;
  entities?: Record<string, any>;
  toolExecuted?: string;
  toolResult?: any;
  authorized?: boolean;
  clarificationOptions?: ClarificationOption[];
  debugTrace?: DebugTrace;
}

export interface ActiveContext {
  currentStudentId?: string;
  currentStudentName?: string;
  currentClass?: string;
  currentIntent?: string;
  lastToolExecuted?: string;
  messageCount: number;
}

export interface RiskAlert {
  alert_id?: string;
  student_id: string;
  student_name: string;
  class_name: string;
  current_attendance?: number;
  current_attendance_percentage?: number;
  three_week_change?: number;
  risk_level: 'LOW' | 'MEDIUM' | 'HIGH';
  reason?: string;
  reasons?: string[];
  consecutive_absences: number;
  trend_direction?: 'improving' | 'stable' | 'declining';
  suggested_action?: string;
  recommended_action?: string;
  detected_at?: string;
}

export interface AttendanceTrendResult {
  student_id?: string;
  student_name?: string;
  class_name?: string;
  current_percentage?: number;
  current_overall_percentage?: number;
  recent_week_percentage?: number;
  previous_three_week_percentage?: number;
  historical_week_percentage?: number;
  three_week_change?: number;
  change_percentage_points?: number;
  trend_direction: 'improving' | 'stable' | 'declining';
  consecutive_absences: number;
  risk_level?: 'LOW' | 'MEDIUM' | 'HIGH';
  weekly_breakdown?: {
    week: string;
    percentage: number;
    days_present: number;
    days_total: number;
  }[];
  summary: string;
}

export interface RootCauseFactor {
  factor: string;
  category: string;
  impact_percentage_points: number;
  affected_students_count: number;
  details: string;
}

export interface ExplainWhyResult {
  metric?: string;
  current_value?: number;
  previous_value?: number;
  net_change?: number;
  baseline_period_avg?: number;
  current_period_avg?: number;
  total_decline_percentage_points?: number;
  primary_driver?: string;
  primary_contributing_classes?: {
    class_name: string;
    attendance_percentage: number;
    decline_percentage: number;
    affected_students_count: number;
  }[];
  root_causes?: RootCauseFactor[];
  grade_level_breakdown?: {
    class_name: string;
    previous_rate: number;
    current_rate: number;
    decline_points: number;
  }[];
  key_factors?: string[];
  recommended_interventions?: string[];
  recommendations?: string[];
}

export interface AuditLogEntry {
  id?: string;
  log_id?: string;
  timestamp: string;
  user_id: string;
  user_name: string;
  role: UserRole | string;
  action: string;
  target_resource: string;
  authorization_result: 'ALLOWED' | 'DENIED';
  tool_executed?: string;
  status: 'SUCCESS' | 'BLOCKED' | 'ERROR';
  reason?: string;
}

export interface SecurityTestResult {
  testId: string;
  name: string;
  category: string;
  attackVector: string;
  status: 'PASSED' | 'FAILED';
  defenseMechanism: string;
  executionDetail: string;
  timestamp: string;
}

export interface TestResultItem {
  id: string;
  category: 'Authentication' | 'Authorization' | 'Tools' | 'Memory' | 'Clarification' | 'Security';
  name: string;
  description: string;
  passed: boolean;
  expected: string;
  actual: string;
  error?: string;
  durationMs: number;
}

export interface TestSuiteSummary {
  total: number;
  passed: number;
  failed: number;
  allPassed: boolean;
  durationMs: number;
  results: TestResultItem[];
}
