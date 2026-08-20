import { AuthUser } from '../auth/roles.js';
import { authorize } from '../auth/permissions.js';
import { db } from '../database/database.js';
import { ToolExecutionResult } from './attendanceTools.js';

/**
 * Tool: get_school_attendance
 * Input: principal_id, filter_class?
 * Only authorized management users (Principal) may execute this tool.
 */
export function get_school_attendance(
  user: AuthUser,
  params: { principal_id?: string; filter_class?: string } = {}
): ToolExecutionResult {
  const auth = authorize({
    user,
    action: 'view_school_attendance'
  });

  if (!auth.authorized) {
    return {
      toolName: 'get_school_attendance',
      success: false,
      authorized: false,
      error: auth.reason || 'Executive clearance required: Principal role required for school-wide analytics.'
    };
  }

  const analytics = db.getSchoolAnalytics(params.filter_class);

  return {
    toolName: 'get_school_attendance',
    success: true,
    authorized: true,
    data: {
      institution: 'St. Jude Academy ERP',
      executive_officer: user.name,
      overall_attendance_percentage: analytics.overall_attendance_percentage,
      total_enrolled_students: analytics.total_students,
      faculty_count: analytics.total_teachers,
      class_breakdown: analytics.class_breakdown,
      trend_last_7_days: analytics.date_breakdown,
      critical_attendance_alerts: analytics.low_attendance_students
    }
  };
}

/**
 * Tool: get_class_attendance_summary
 * Input: class_name?
 * Allows teachers and principals to get classroom metrics.
 */
export function get_class_attendance_summary(
  user: AuthUser,
  params: { class_name?: string } = {}
): ToolExecutionResult {
  const targetClass = params.class_name || user.assignedClass;

  if (!targetClass) {
    return {
      toolName: 'get_class_attendance_summary',
      success: false,
      authorized: false,
      error: 'Class name not specified.'
    };
  }

  const auth = authorize({
    user,
    action: 'view_class_attendance',
    resourceId: targetClass
  });

  if (!auth.authorized) {
    return {
      toolName: 'get_class_attendance_summary',
      success: false,
      authorized: false,
      error: auth.reason || 'Unauthorized to view class attendance summary.'
    };
  }

  const students = db.getStudentsByClass(targetClass);
  if (students.length === 0) {
    return {
      toolName: 'get_class_attendance_summary',
      success: false,
      authorized: true,
      error: `No class found matching '${targetClass}'.`
    };
  }

  const avgAttendance = Number(
    (
      students.reduce((sum, s) => sum + s.attendance_percentage, 0) / students.length
    ).toFixed(1)
  );

  return {
    toolName: 'get_class_attendance_summary',
    success: true,
    authorized: true,
    data: {
      class_name: targetClass,
      total_students: students.length,
      average_attendance: avgAttendance,
      students_roster: students.map((s) => ({
        student_id: s.student_id,
        name: s.name,
        roll_number: s.roll_number,
        attendance_percentage: s.attendance_percentage
      }))
    }
  };
}

/**
 * Tool: get_attendance_trend
 * Input: student_id?, class_name?
 * Multi-week attendance trend with percentage point change calculation.
 */
export function get_attendance_trend(
  user: AuthUser,
  params: { student_id?: string; student_name?: string; class_name?: string } = {}
): ToolExecutionResult {
  let targetStudentId = params.student_id;

  if (!targetStudentId && params.student_name) {
    const matches = db.getStudentsByName(params.student_name);
    if (matches.length === 1) {
      targetStudentId = matches[0].student_id;
    } else if (matches.length > 1 && user.role === 'parent') {
      const parentMatches = matches.filter((s) => s.parent_id === user.associatedId);
      if (parentMatches.length === 1) targetStudentId = parentMatches[0].student_id;
    }
  }

  // If student role and no id provided, default to own id
  if (!targetStudentId && user.role === 'student') {
    targetStudentId = user.associatedId;
  }

  // If parent role and only 1 child, default to child id
  if (!targetStudentId && user.role === 'parent' && user.childrenIds?.length === 1) {
    targetStudentId = user.childrenIds[0];
  }

  if (!targetStudentId) {
    return {
      toolName: 'get_attendance_trend',
      success: false,
      authorized: false,
      error: 'Student ID or name required to calculate attendance trend.'
    };
  }

  const auth = authorize({
    user,
    action: 'view_attendance_trend',
    resourceId: targetStudentId
  });

  if (!auth.authorized) {
    return {
      toolName: 'get_attendance_trend',
      success: false,
      authorized: false,
      error: auth.reason || 'Unauthorized to view attendance trend for this student.'
    };
  }

  const trend = db.getStudentAttendanceTrend(targetStudentId);
  if (!trend) {
    return {
      toolName: 'get_attendance_trend',
      success: false,
      authorized: true,
      error: `Student ID '${targetStudentId}' not found.`
    };
  }

  return {
    toolName: 'get_attendance_trend',
    success: true,
    authorized: true,
    data: trend,
    message: trend.summary
  };
}

/**
 * Tool: get_at_risk_students
 * Input: class_name?
 * AI Early Warning System tool returning students flagged LOW / MEDIUM / HIGH risk.
 */
export function get_at_risk_students(
  user: AuthUser,
  params: { class_name?: string } = {}
): ToolExecutionResult {
  const targetClass = params.class_name || (user.role === 'teacher' ? user.assignedClass : undefined);

  const auth = authorize({
    user,
    action: 'view_at_risk_students',
    resourceId: targetClass
  });

  if (!auth.authorized) {
    return {
      toolName: 'get_at_risk_students',
      success: false,
      authorized: false,
      error: auth.reason || 'Access denied: At-risk alert feed requires teacher or principal credentials.'
    };
  }

  const atRiskList = db.getAtRiskStudents(targetClass);

  return {
    toolName: 'get_at_risk_students',
    success: true,
    authorized: true,
    data: {
      scope: targetClass ? `Class ${targetClass}` : 'School-Wide',
      total_at_risk_detected: atRiskList.length,
      high_risk_count: atRiskList.filter((a) => a.risk_level === 'HIGH').length,
      medium_risk_count: atRiskList.filter((a) => a.risk_level === 'MEDIUM').length,
      alerts: atRiskList
    }
  };
}

/**
 * Tool: analyze_attendance
 * Input: class_name?
 * AI "Explain Why" tool performing mathematical root cause analysis for attendance decline.
 */
export function analyze_attendance(
  user: AuthUser,
  params: { class_name?: string } = {}
): ToolExecutionResult {
  const targetClass = params.class_name;

  const auth = authorize({
    user,
    action: 'analyze_attendance',
    resourceId: targetClass
  });

  if (!auth.authorized) {
    return {
      toolName: 'analyze_attendance',
      success: false,
      authorized: false,
      error: auth.reason || 'Access denied: Attendance decline diagnostic analysis is restricted to staff and principal.'
    };
  }

  const analysis = db.explainAttendanceDecline(targetClass);

  return {
    toolName: 'analyze_attendance',
    success: true,
    authorized: true,
    data: analysis
  };
}
