import { AuthUser } from '../auth/roles.js';
import { authorize } from '../auth/permissions.js';
import { db } from '../database/database.js';
import { AttendanceStatus } from '../database/models.js';

export interface ToolExecutionResult {
  toolName: string;
  success: boolean;
  authorized: boolean;
  message?: string;
  data?: any;
  error?: string;
}

/**
 * Tool: get_student_attendance
 * Input: student_id
 * Returns: attendance information for authenticated student.
 */
export function get_student_attendance(
  user: AuthUser,
  params: { student_id?: string }
): ToolExecutionResult {
  const targetStudentId = params.student_id || user.associatedId;

  if (!targetStudentId) {
    return {
      toolName: 'get_student_attendance',
      success: false,
      authorized: false,
      error: 'No student ID provided or associated with current session.'
    };
  }

  // Authorize
  const auth = authorize({
    user,
    action: 'view_own_attendance',
    resourceId: targetStudentId
  });

  if (!auth.authorized) {
    return {
      toolName: 'get_student_attendance',
      success: false,
      authorized: false,
      error: auth.reason || 'Unauthorized to view student attendance.'
    };
  }

  const student = db.getStudentById(targetStudentId);
  if (!student) {
    return {
      toolName: 'get_student_attendance',
      success: false,
      authorized: true,
      error: `Student ID '${targetStudentId}' was not found in school database.`
    };
  }

  const records = db.getStudentAttendanceRecords(targetStudentId);
  const recentDays = records.slice(0, 7);

  return {
    toolName: 'get_student_attendance',
    success: true,
    authorized: true,
    data: {
      student_id: student.student_id,
      name: student.name,
      class_name: student.class_name,
      roll_number: student.roll_number,
      attendance_percentage: student.attendance_percentage,
      total_days_evaluated: records.length,
      present_count: records.filter((r) => r.status === 'present' || r.status === 'late').length,
      absent_count: records.filter((r) => r.status === 'absent').length,
      recent_history: recentDays.map((r) => ({
        date: r.date,
        status: r.status,
        remarks: r.remarks
      }))
    }
  };
}

/**
 * Tool: get_child_attendance
 * Input: parent_id, student_id
 * Verifies that the student belongs to the parent before returning data.
 */
export function get_child_attendance(
  user: AuthUser,
  params: { parent_id?: string; student_id?: string; student_name?: string }
): ToolExecutionResult {
  const parentId = params.parent_id || user.associatedId;
  let targetStudentId = params.student_id;

  // If student_name was provided instead of student_id, search student
  if (!targetStudentId && params.student_name) {
    const matches = db.getStudentsByName(params.student_name);
    if (matches.length === 1) {
      targetStudentId = matches[0].student_id;
    } else if (matches.length > 1) {
      // Filter by parent if possible
      const parentMatches = matches.filter((s) => s.parent_id === parentId);
      if (parentMatches.length === 1) {
        targetStudentId = parentMatches[0].student_id;
      }
    }
  }

  // If parent only has one child and no target specified, default to that child
  if (!targetStudentId && user.childrenIds && user.childrenIds.length === 1) {
    targetStudentId = user.childrenIds[0];
  }

  if (!targetStudentId) {
    // If parent has multiple children, return clarification needed
    if (user.childrenIds && user.childrenIds.length > 1) {
      const children = user.childrenIds
        .map((cid) => db.getStudentById(cid))
        .filter(Boolean);
      return {
        toolName: 'get_child_attendance',
        success: false,
        authorized: true,
        error: 'Multiple children found. Please specify which child you would like to view.',
        data: {
          requires_clarification: true,
          options: children.map((c) => ({ student_id: c!.student_id, name: c!.name, class_name: c!.class_name }))
        }
      };
    }

    return {
      toolName: 'get_child_attendance',
      success: false,
      authorized: false,
      error: 'Student ID not specified.'
    };
  }

  // Authorize Parent & Child relationship
  const auth = authorize({
    user,
    action: 'view_child_attendance',
    resourceId: targetStudentId
  });

  if (!auth.authorized) {
    return {
      toolName: 'get_child_attendance',
      success: false,
      authorized: false,
      error: auth.reason || 'Permission denied: Not authorized to view this student.'
    };
  }

  const student = db.getStudentById(targetStudentId)!;
  const records = db.getStudentAttendanceRecords(targetStudentId);

  return {
    toolName: 'get_child_attendance',
    success: true,
    authorized: true,
    data: {
      student_id: student.student_id,
      name: student.name,
      class_name: student.class_name,
      attendance_percentage: student.attendance_percentage,
      parent_name: user.name,
      recent_records: records.slice(0, 10).map((r) => ({
        date: r.date,
        status: r.status,
        remarks: r.remarks
      })),
      total_days: records.length,
      absent_count: records.filter((r) => r.status === 'absent').length
    }
  };
}

/**
 * Tool: get_student_attendance_for_teacher
 * Input: teacher_id, student_id
 * Verifies that the teacher is authorized to access the student.
 */
export function get_student_attendance_for_teacher(
  user: AuthUser,
  params: { teacher_id?: string; student_id?: string; student_name?: string }
): ToolExecutionResult {
  let targetStudentId = params.student_id;

  if (!targetStudentId && params.student_name) {
    const matches = db.getStudentsByName(params.student_name);
    if (matches.length === 1) {
      targetStudentId = matches[0].student_id;
    } else if (matches.length > 1) {
      return {
        toolName: 'get_student_attendance_for_teacher',
        success: false,
        authorized: true,
        error: `Found ${matches.length} students matching '${params.student_name}'. Disambiguation required.`,
        data: {
          requires_clarification: true,
          options: matches.map((m) => ({ student_id: m.student_id, name: m.name, class_name: m.class_name }))
        }
      };
    }
  }

  if (!targetStudentId) {
    return {
      toolName: 'get_student_attendance_for_teacher',
      success: false,
      authorized: false,
      error: 'Student ID or name required.'
    };
  }

  const auth = authorize({
    user,
    action: 'view_student_attendance',
    resourceId: targetStudentId
  });

  if (!auth.authorized) {
    return {
      toolName: 'get_student_attendance_for_teacher',
      success: false,
      authorized: false,
      error: auth.reason || 'Teacher unauthorized to view student attendance.'
    };
  }

  const student = db.getStudentById(targetStudentId);
  if (!student) {
    return {
      toolName: 'get_student_attendance_for_teacher',
      success: false,
      authorized: true,
      error: `Student ID '${targetStudentId}' not found.`
    };
  }

  const records = db.getStudentAttendanceRecords(targetStudentId);

  return {
    toolName: 'get_student_attendance_for_teacher',
    success: true,
    authorized: true,
    data: {
      student_id: student.student_id,
      name: student.name,
      class_name: student.class_name,
      roll_number: student.roll_number,
      attendance_percentage: student.attendance_percentage,
      records: records.slice(0, 10)
    }
  };
}

/**
 * Tool: mark_attendance
 * Input: teacher_id, student_id, date, status, remarks?
 * Verifies teacher authorization before modifying the database.
 */
export function mark_attendance(
  user: AuthUser,
  params: {
    teacher_id?: string;
    student_id: string;
    date: string;
    status: AttendanceStatus;
    remarks?: string;
  }
): ToolExecutionResult {
  const { student_id, date, status, remarks } = params;

  if (!student_id || !date || !status) {
    return {
      toolName: 'mark_attendance',
      success: false,
      authorized: false,
      error: 'Missing required parameters: student_id, date, and status are mandatory.'
    };
  }

  // Validate status enum
  const validStatuses: AttendanceStatus[] = ['present', 'absent', 'late', 'excused'];
  if (!validStatuses.includes(status.toLowerCase() as AttendanceStatus)) {
    return {
      toolName: 'mark_attendance',
      success: false,
      authorized: false,
      error: `Invalid status '${status}'. Must be one of: ${validStatuses.join(', ')}.`
    };
  }

  // Authorize Teacher
  const auth = authorize({
    user,
    action: 'mark_attendance',
    resourceId: student_id
  });

  if (!auth.authorized) {
    return {
      toolName: 'mark_attendance',
      success: false,
      authorized: false,
      error: auth.reason || 'Unauthorized: Only authorized teachers can mark attendance for this student.'
    };
  }

  const student = db.getStudentById(student_id);
  if (!student) {
    return {
      toolName: 'mark_attendance',
      success: false,
      authorized: true,
      error: `Student with ID '${student_id}' not found.`
    };
  }

  const result = db.markAttendance(
    student_id,
    date,
    status.toLowerCase() as AttendanceStatus,
    user.associatedId || user.name,
    remarks || `Marked by ${user.name}`
  );

  return {
    toolName: 'mark_attendance',
    success: true,
    authorized: true,
    data: {
      student_id: student.student_id,
      student_name: student.name,
      class_name: student.class_name,
      date,
      status: status.toLowerCase(),
      updated_percentage: result.updatedPercentage,
      marked_by: user.name,
      record: result.record
    },
    message: `Successfully marked ${student.name} as ${status} on ${date}. New attendance rate: ${result.updatedPercentage}%.`
  };
}
