import { AuthUser } from '../auth/roles.js';
import { authorize } from '../auth/permissions.js';
import { db } from '../database/database.js';
import { ToolExecutionResult } from './attendanceTools.js';

/**
 * Tool: request_teacher_assistance
 * Input: requester_id, student_id, reason
 * Creates a real database record in call_requests table.
 */
export function request_teacher_assistance(
  user: AuthUser,
  params: { requester_id?: string; student_id?: string; student_name?: string; reason: string }
): ToolExecutionResult {
  if (!params.reason || params.reason.trim().length === 0) {
    return {
      toolName: 'request_teacher_assistance',
      success: false,
      authorized: false,
      error: 'Reason for teacher assistance is required.'
    };
  }

  let targetStudentId = params.student_id;
  if (!targetStudentId && params.student_name) {
    const matches = db.getStudentsByName(params.student_name);
    if (matches.length >= 1) targetStudentId = matches[0].student_id;
  }
  if (!targetStudentId && user.role === 'student') {
    targetStudentId = user.associatedId;
  }
  if (!targetStudentId && user.role === 'parent' && user.childrenIds?.length === 1) {
    targetStudentId = user.childrenIds[0];
  }

  // Authorize
  const auth = authorize({
    user,
    action: 'request_teacher_assistance',
    resourceId: targetStudentId
  });

  if (!auth.authorized) {
    return {
      toolName: 'request_teacher_assistance',
      success: false,
      authorized: false,
      error: auth.reason || 'Unauthorized to request teacher assistance.'
    };
  }

  const student = targetStudentId ? db.getStudentById(targetStudentId) : undefined;

  // Find class teacher if student is known
  let targetTeacherId: string | undefined;
  if (student) {
    const teachers = db.getAllTeachers();
    const classTeacher = teachers.find(
      (t) => t.class_name.toLowerCase() === student.class_name.toLowerCase()
    );
    if (classTeacher) targetTeacherId = classTeacher.teacher_id;
  }

  const newRequest = db.createCallRequest({
    requester_id: user.associatedId || user.userId,
    requester_name: user.name,
    requester_role: user.role as 'parent' | 'student' | 'teacher',
    target_type: 'teacher',
    target_id: targetTeacherId,
    student_id: student?.student_id,
    student_name: student?.name,
    reason: params.reason
  });

  return {
    toolName: 'request_teacher_assistance',
    success: true,
    authorized: true,
    data: {
      request_id: newRequest.request_id,
      status: newRequest.status,
      assigned_teacher_id: targetTeacherId || 'Class Teacher Pool',
      student: student?.name,
      reason: newRequest.reason,
      created_at: newRequest.created_at
    },
    message: `Teacher assistance request logged successfully (Ticket #${newRequest.request_id}). The class teacher will be notified.`
  };
}

/**
 * Tool: request_management_assistance
 * Input: requester_id, reason
 * Creates a real database record for escalation to the Principal/Management.
 */
export function request_management_assistance(
  user: AuthUser,
  params: { requester_id?: string; reason: string }
): ToolExecutionResult {
  if (!params.reason || params.reason.trim().length === 0) {
    return {
      toolName: 'request_management_assistance',
      success: false,
      authorized: false,
      error: 'Reason for management escalation is required.'
    };
  }

  const auth = authorize({
    user,
    action: 'request_management_assistance'
  });

  if (!auth.authorized) {
    return {
      toolName: 'request_management_assistance',
      success: false,
      authorized: false,
      error: auth.reason || 'Unauthorized to escalate to school management.'
    };
  }

  const principal = db.getPrincipal();

  const newRequest = db.createCallRequest({
    requester_id: user.associatedId || user.userId,
    requester_name: user.name,
    requester_role: user.role as 'parent' | 'student' | 'teacher',
    target_type: 'principal',
    target_id: principal.principal_id,
    reason: params.reason
  });

  return {
    toolName: 'request_management_assistance',
    success: true,
    authorized: true,
    data: {
      request_id: newRequest.request_id,
      status: newRequest.status,
      target: principal.name,
      reason: newRequest.reason,
      created_at: newRequest.created_at
    },
    message: `Management escalation ticket #${newRequest.request_id} created for Dr. Arthur Vance (Principal).`
  };
}

export const request_teacher_call = request_teacher_assistance;
export const request_management_call = request_management_assistance;

