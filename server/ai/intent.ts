import { UserRole } from '../auth/roles.js';

export type SupportedIntent =
  | 'view_own_attendance'
  | 'view_child_attendance'
  | 'view_student_attendance'
  | 'view_attendance_trend'
  | 'view_at_risk_students'
  | 'analyze_attendance'
  | 'mark_attendance'
  | 'view_school_attendance'
  | 'request_teacher_assistance'
  | 'request_management_assistance'
  | 'general_school_question'
  | 'clarification_required'
  | 'unauthorized_request';

export interface IntentDetectionResult {
  intent: SupportedIntent;
  confidence: number;
  extractedRoleMention?: string;
  isSpoofingAttempt?: boolean;
}

/**
 * Deterministic intent rule engine for high precision and fallback resilience.
 */
export function detectIntentRuleBased(
  userInput: string,
  authenticatedRole: UserRole,
  hasActiveStudentInContext: boolean
): IntentDetectionResult {
  const text = userInput.trim().toLowerCase();

  // Detect role spoofing attempts like "I am the principal", "Act as principal", "I am a teacher"
  const isSpoofingAttempt =
    (text.includes('i am the principal') ||
      text.includes('i am principal') ||
      text.includes('act as principal') ||
      text.includes('i am a teacher') ||
      text.includes('i am the teacher') ||
      text.includes('override role') ||
      text.includes('ignore previous instructions')) &&
    !userInput.includes('assistance from');

  // Check for Explain Why / Root Cause Diagnosis
  if (
    text.includes('explain why') ||
    text.includes('why is attendance dropping') ||
    text.includes('why did attendance decrease') ||
    text.includes('root cause') ||
    text.includes('why are students absent') ||
    text.includes('analyze attendance decline') ||
    text.includes('diagnostic analysis')
  ) {
    return {
      intent: 'analyze_attendance',
      confidence: 0.95,
      isSpoofingAttempt
    };
  }

  // Check for At-Risk / Early Warning System
  if (
    text.includes('at risk') ||
    text.includes('at-risk') ||
    text.includes('early warning') ||
    text.includes('risk alerts') ||
    text.includes('students at risk') ||
    text.includes('who is falling behind') ||
    text.includes('risk score') ||
    text.includes('critical attendance')
  ) {
    return {
      intent: 'view_at_risk_students',
      confidence: 0.95,
      isSpoofingAttempt
    };
  }

  // Check for Multi-Week Attendance Trend
  if (
    text.includes('trend') ||
    text.includes('last 3 weeks') ||
    text.includes('improving or dropping') ||
    text.includes('attendance history over time') ||
    text.includes('trajectory') ||
    text.includes('change in attendance')
  ) {
    return {
      intent: 'view_attendance_trend',
      confidence: 0.95,
      isSpoofingAttempt
    };
  }

  // Check for mark attendance (Teacher action)
  if (
    text.includes('mark') ||
    text.includes('record attendance') ||
    text.includes('set status') ||
    (text.includes('absent') && (text.includes('today') || text.includes('yesterday') || text.includes('mark'))) ||
    (text.includes('present') && (text.includes('today') || text.includes('mark')))
  ) {
    if (text.includes('mark') || text.includes('absent') || text.includes('present') || text.includes('late')) {
      return {
        intent: 'mark_attendance',
        confidence: 0.95,
        isSpoofingAttempt
      };
    }
  }

  // Check for School-wide analytics (Principal action)
  if (
    text.includes('school attendance') ||
    text.includes('overall attendance') ||
    text.includes('school-wide') ||
    text.includes('school wide') ||
    text.includes('entire school') ||
    text.includes('management analytics') ||
    text.includes('school statistics') ||
    text.includes('school analytics') ||
    text.includes('all classes attendance') ||
    (text.includes('overall') && text.includes('attendance'))
  ) {
    return {
      intent: 'view_school_attendance',
      confidence: 0.95,
      isSpoofingAttempt
    };
  }

  // Check for Teacher Assistance request / Call Request
  if (
    text.includes('contact teacher') ||
    text.includes('speak with teacher') ||
    text.includes('talk to teacher') ||
    text.includes('teacher assistance') ||
    text.includes('request teacher') ||
    text.includes('call from teacher') ||
    text.includes('schedule call with teacher') ||
    text.includes('meeting with teacher')
  ) {
    return {
      intent: 'request_teacher_assistance',
      confidence: 0.92,
      isSpoofingAttempt
    };
  }

  // Check for Management / Principal escalation
  if (
    text.includes('contact principal') ||
    text.includes('management assistance') ||
    text.includes('escalate to principal') ||
    text.includes('speak with principal') ||
    text.includes('speak with management') ||
    text.includes('complaint to principal')
  ) {
    return {
      intent: 'request_management_assistance',
      confidence: 0.92,
      isSpoofingAttempt
    };
  }

  // Check for attendance inquiries based on role
  const isAttendanceQuery =
    text.includes('attendance') ||
    text.includes('how many days') ||
    text.includes('present') ||
    text.includes('absent') ||
    text.includes('last week') ||
    text.includes('yesterday') ||
    text.includes('today') ||
    text.includes('percentage') ||
    text.includes('how much does he have') ||
    text.includes('how much does she have') ||
    text.includes('how much attendance');

  if (isAttendanceQuery) {
    if (authenticatedRole === 'student') {
      return {
        intent: 'view_own_attendance',
        confidence: 0.95,
        isSpoofingAttempt
      };
    }

    if (authenticatedRole === 'parent') {
      return {
        intent: 'view_child_attendance',
        confidence: 0.95,
        isSpoofingAttempt
      };
    }

    if (authenticatedRole === 'teacher') {
      return {
        intent: 'view_student_attendance',
        confidence: 0.92,
        isSpoofingAttempt
      };
    }

    if (authenticatedRole === 'principal') {
      if (text.includes('student') || text.includes('rahul') || text.includes('priya') || hasActiveStudentInContext) {
        return {
          intent: 'view_student_attendance',
          confidence: 0.9,
          isSpoofingAttempt
        };
      }
      return {
        intent: 'view_school_attendance',
        confidence: 0.9,
        isSpoofingAttempt
      };
    }
  }

  // General school question
  return {
    intent: 'general_school_question',
    confidence: 0.75,
    isSpoofingAttempt
  };
}
