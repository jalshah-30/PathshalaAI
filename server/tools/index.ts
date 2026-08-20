import { AuthUser } from '../auth/roles.js';
import {
  get_student_attendance,
  get_child_attendance,
  get_student_attendance_for_teacher,
  mark_attendance,
  ToolExecutionResult
} from './attendanceTools.js';
import {
  get_school_attendance,
  get_class_attendance_summary,
  get_attendance_trend,
  get_at_risk_students,
  analyze_attendance
} from './analyticsTools.js';
import {
  request_teacher_assistance,
  request_management_assistance,
  request_teacher_call,
  request_management_call
} from './escalationTools.js';

export interface ToolDefinition {
  name: string;
  description: string;
  requiredRole?: string[];
  parameters: {
    name: string;
    type: string;
    description: string;
    required: boolean;
  }[];
}

export const TOOL_REGISTRY: Record<string, ToolDefinition> = {
  get_student_attendance: {
    name: 'get_student_attendance',
    description: 'Retrieve current attendance percentages and recent logs for the authenticated student.',
    requiredRole: ['student'],
    parameters: [
      { name: 'student_id', type: 'string', description: 'Student ID (optional for authenticated student)', required: false }
    ]
  },
  get_child_attendance: {
    name: 'get_child_attendance',
    description: 'Retrieve detailed attendance records and statistics for a parent’s registered child.',
    requiredRole: ['parent'],
    parameters: [
      { name: 'student_name', type: 'string', description: 'Child first/full name (e.g. Rahul, Priya)', required: false },
      { name: 'student_id', type: 'string', description: 'Child student ID', required: false }
    ]
  },
  get_student_attendance_for_teacher: {
    name: 'get_student_attendance_for_teacher',
    description: 'Look up student attendance records in the teacher’s authorized classroom.',
    requiredRole: ['teacher', 'principal'],
    parameters: [
      { name: 'student_name', type: 'string', description: 'Student name to look up', required: false },
      { name: 'student_id', type: 'string', description: 'Student ID to look up', required: false }
    ]
  },
  get_attendance_trend: {
    name: 'get_attendance_trend',
    description: 'Calculate multi-week attendance trend, percentage changes, consecutive absences, and risk trajectory.',
    requiredRole: ['student', 'parent', 'teacher', 'principal'],
    parameters: [
      { name: 'student_name', type: 'string', description: 'Student name', required: false },
      { name: 'student_id', type: 'string', description: 'Student ID', required: false }
    ]
  },
  get_at_risk_students: {
    name: 'get_at_risk_students',
    description: 'Early Warning System tool returning students flagged LOW / MEDIUM / HIGH risk with specific causes.',
    requiredRole: ['teacher', 'principal'],
    parameters: [
      { name: 'class_name', type: 'string', description: 'Optional specific class filter', required: false }
    ]
  },
  analyze_attendance: {
    name: 'analyze_attendance',
    description: 'Explain Why analytical tool calculating mathematical root causes and class contributions for attendance declines.',
    requiredRole: ['teacher', 'principal'],
    parameters: [
      { name: 'class_name', type: 'string', description: 'Optional specific class filter', required: false }
    ]
  },
  mark_attendance: {
    name: 'mark_attendance',
    description: 'Mark or update a student attendance record for a specific date (present, absent, late, excused).',
    requiredRole: ['teacher'],
    parameters: [
      { name: 'student_id', type: 'string', description: 'Student ID', required: true },
      { name: 'student_name', type: 'string', description: 'Student name if student_id unknown', required: false },
      { name: 'date', type: 'string', description: 'Date in YYYY-MM-DD format (or "today", "yesterday")', required: true },
      { name: 'status', type: 'string', description: 'Attendance status: "present" | "absent" | "late" | "excused"', required: true },
      { name: 'remarks', type: 'string', description: 'Optional remark', required: false }
    ]
  },
  get_school_attendance: {
    name: 'get_school_attendance',
    description: 'Executive management tool for overall school attendance percentages, class breakdowns, and alerts.',
    requiredRole: ['principal'],
    parameters: [
      { name: 'filter_class', type: 'string', description: 'Optional specific class filter', required: false }
    ]
  },
  get_class_attendance_summary: {
    name: 'get_class_attendance_summary',
    description: 'Retrieve summary attendance statistics and roster for a class.',
    requiredRole: ['teacher', 'principal'],
    parameters: [
      { name: 'class_name', type: 'string', description: 'Class name (e.g. Class 10-A)', required: false }
    ]
  },
  request_teacher_assistance: {
    name: 'request_teacher_assistance',
    description: 'Create an official teacher callback or academic consultation ticket for a student.',
    requiredRole: ['parent', 'student'],
    parameters: [
      { name: 'student_name', type: 'string', description: 'Name of the student involved', required: false },
      { name: 'reason', type: 'string', description: 'Reason for requesting teacher consultation', required: true }
    ]
  },
  request_teacher_call: {
    name: 'request_teacher_call',
    description: 'Create an official teacher callback ticket for a student.',
    requiredRole: ['parent', 'student'],
    parameters: [
      { name: 'student_name', type: 'string', description: 'Name of the student involved', required: false },
      { name: 'reason', type: 'string', description: 'Reason for requesting teacher consultation', required: true }
    ]
  },
  request_management_assistance: {
    name: 'request_management_assistance',
    description: 'Escalate an administrative, fee, or special concern to Principal management.',
    requiredRole: ['parent', 'teacher', 'principal'],
    parameters: [
      { name: 'reason', type: 'string', description: 'Reason for escalating to Principal management', required: true }
    ]
  },
  request_management_call: {
    name: 'request_management_call',
    description: 'Escalate an administrative concern directly to Principal management.',
    requiredRole: ['parent', 'teacher', 'principal'],
    parameters: [
      { name: 'reason', type: 'string', description: 'Reason for escalating to Principal management', required: true }
    ]
  }
};

/**
 * Unified tool executor with centralized permission gating and safe failure handling.
 */
export function executeTool(
  toolName: string,
  user: AuthUser,
  params: Record<string, any>
): ToolExecutionResult {
  try {
    switch (toolName) {
      case 'get_student_attendance':
        return get_student_attendance(user, params);

      case 'get_child_attendance':
        return get_child_attendance(user, params);

      case 'get_student_attendance_for_teacher':
        return get_student_attendance_for_teacher(user, params);

      case 'get_attendance_trend':
        return get_attendance_trend(user, params);

      case 'get_at_risk_students':
        return get_at_risk_students(user, params);

      case 'analyze_attendance':
        return analyze_attendance(user, params);

      case 'mark_attendance':
        return mark_attendance(user, params as any);

      case 'get_school_attendance':
        return get_school_attendance(user, params);

      case 'get_class_attendance_summary':
        return get_class_attendance_summary(user, params);

      case 'request_teacher_assistance':
      case 'request_teacher_call':
        return request_teacher_assistance(user, params as any);

      case 'request_management_assistance':
      case 'request_management_call':
        return request_management_assistance(user, params as any);

      default:
        return {
          toolName,
          success: false,
          authorized: false,
          error: `Unknown tool '${toolName}'. Available tools: ${Object.keys(TOOL_REGISTRY).join(', ')}`
        };
    }
  } catch (err: any) {
    return {
      toolName,
      success: false,
      authorized: false,
      error: `Execution error in ${toolName}: ${err.message || String(err)}`
    };
  }
}
