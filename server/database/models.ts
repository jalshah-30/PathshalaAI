export interface Student {
  student_id: string;
  name: string;
  class_name: string;
  parent_id: string;
  attendance_percentage: number;
  roll_number?: number;
  email?: string;
}

export interface Parent {
  parent_id: string;
  name: string;
  email?: string;
  phone?: string;
  children_ids: string[];
}

export interface Teacher {
  teacher_id: string;
  name: string;
  class_name: string; // primary class teacher of
  subjects: string[];
  email?: string;
}

export interface Principal {
  principal_id: string;
  name: string;
  email?: string;
  title: string;
}

export type AttendanceStatus = 'present' | 'absent' | 'late' | 'excused';
export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export interface RiskAlert {
  alert_id: string;
  student_id: string;
  student_name: string;
  class_name: string;
  current_attendance: number;
  current_attendance_percentage?: number;
  three_week_change: number; // percentage point change e.g. -9.1%
  consecutive_absences: number;
  risk_level: RiskLevel;
  reason: string;
  reasons?: string[];
  recommended_action: string;
  suggested_action?: string;
  trend_direction?: 'improving' | 'stable' | 'declining';
  detected_at: string;
}

export interface AttendanceTrendResult {
  student_id?: string;
  student_name?: string;
  class_name?: string;
  current_percentage: number;
  current_overall_percentage?: number;
  previous_three_week_percentage: number;
  three_week_change: number;
  change_percentage_points?: number;
  consecutive_absences: number;
  risk_level: RiskLevel;
  trend_direction: 'improving' | 'stable' | 'declining';
  summary: string;
  weekly_breakdown: {
    week: string;
    percentage: number;
    days_present: number;
    days_total: number;
  }[];
}

export interface RootCauseFactor {
  factor: string;
  category: string;
  impact_percentage_points: number;
  affected_students_count: number;
  details: string;
}

export interface ExplainWhyResult {
  metric: string;
  current_value: number;
  previous_value: number;
  net_change: number;
  total_decline_percentage_points?: number;
  primary_driver?: string;
  primary_contributing_classes: {
    class_name: string;
    attendance_percentage: number;
    decline_percentage: number;
    affected_students_count: number;
  }[];
  grade_level_breakdown?: {
    class_name: string;
    previous_rate: number;
    current_rate: number;
    decline_points: number;
  }[];
  root_causes?: RootCauseFactor[];
  key_factors: string[];
  recommended_interventions: string[];
  recommendations?: string[];
}

export interface AuditLogEntry {
  log_id: string;
  timestamp: string;
  user_id: string;
  user_name: string;
  role: string;
  action: string;
  target_resource: string;
  authorization_result: 'ALLOWED' | 'DENIED';
  tool_executed?: string;
  status: 'SUCCESS' | 'BLOCKED' | 'ERROR';
  reason?: string;
}

export interface AttendanceRecord {
  attendance_id: string;
  student_id: string;
  student_name: string;
  class_name: string;
  date: string; // YYYY-MM-DD
  status: AttendanceStatus;
  marked_by: string; // teacher_id or 'SYSTEM'
  remarks?: string;
  updated_at?: string;
}

export interface CallRequest {
  request_id: string;
  requester_id: string;
  requester_name: string;
  requester_role: 'parent' | 'student' | 'teacher';
  target_type: 'teacher' | 'principal';
  target_id?: string;
  student_id?: string;
  student_name?: string;
  reason: string;
  status: 'pending' | 'in_progress' | 'completed';
  created_at: string;
}

export interface SchoolAnalytics {
  overall_attendance_percentage: number;
  total_students: number;
  total_teachers: number;
  class_breakdown: {
    class_name: string;
    total_students: number;
    attendance_percentage: number;
    present_today: number;
    absent_today: number;
  }[];
  date_breakdown: {
    date: string;
    attendance_percentage: number;
    present_count: number;
    absent_count: number;
  }[];
  low_attendance_students: {
    student_id: string;
    name: string;
    class_name: string;
    attendance_percentage: number;
  }[];
}
