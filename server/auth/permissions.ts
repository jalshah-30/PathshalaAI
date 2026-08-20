import { AuthUser, ROLE_DEFINITIONS } from './roles.js';
import { db } from '../database/database.js';

export interface AuthContext {
  user: AuthUser;
  action: string;
  resourceId?: string; // e.g. student_id, class_name
  targetRole?: string;
  metadata?: Record<string, any>;
}

export interface AuthorizationResult {
  status: 'AUTHORIZED' | 'DENIED';
  authorized: boolean;
  action: string;
  role: string;
  reason?: string;
  details?: Record<string, any>;
}

/**
 * Centralized authorization engine with role-based and object-level security.
 * Enforces zero-trust application-level authorization.
 */
export function authorize(context: AuthContext): AuthorizationResult {
  const { user, action, resourceId } = context;

  if (!user || !user.role) {
    return {
      status: 'DENIED',
      authorized: false,
      action,
      role: 'anonymous',
      reason: 'Authentication required. No authenticated user session found.'
    };
  }

  const roleDef = ROLE_DEFINITIONS[user.role];
  if (!roleDef) {
    return {
      status: 'DENIED',
      authorized: false,
      action,
      role: user.role,
      reason: `Unknown role '${user.role}'. Access denied.`
    };
  }

  // 1. Role-Level Permission Check
  const hasRolePermission = roleDef.allowedActions.includes(action);
  if (!hasRolePermission) {
    return {
      status: 'DENIED',
      authorized: false,
      action,
      role: user.role,
      reason: `Role '${user.role}' is not permitted to perform action '${action}'. Required permissions: ${action}.`
    };
  }

  // 2. Object-Level Resource Validation
  switch (action) {
    case 'view_own_attendance': {
      if (user.role !== 'student') {
        return {
          status: 'DENIED',
          authorized: false,
          action,
          role: user.role,
          reason: 'Only authenticated students can query personal attendance.'
        };
      }
      // If resourceId is supplied, it must match user's own student ID
      if (resourceId && user.associatedId && resourceId !== user.associatedId) {
        return {
          status: 'DENIED',
          authorized: false,
          action,
          role: user.role,
          reason: 'Students can only view their own attendance records, not other students.'
        };
      }
      break;
    }

    case 'view_child_attendance': {
      if (user.role !== 'parent') {
        return {
          status: 'DENIED',
          authorized: false,
          action,
          role: user.role,
          reason: 'Only authenticated parents can access child attendance.'
        };
      }
      if (resourceId) {
        const student = db.getStudentById(resourceId);
        if (!student) {
          return {
            status: 'DENIED',
            authorized: false,
            action,
            role: user.role,
            reason: `Student with ID '${resourceId}' does not exist.`
          };
        }
        if (student.parent_id !== user.associatedId) {
          return {
            status: 'DENIED',
            authorized: false,
            action,
            role: user.role,
            reason: `Privacy Violation: Student '${student.name}' is not registered under parent account '${user.name}'. Access denied.`
          };
        }
      }
      break;
    }

    case 'view_student_attendance': {
      if (user.role !== 'teacher' && user.role !== 'principal') {
        return {
          status: 'DENIED',
          authorized: false,
          action,
          role: user.role,
          reason: 'Only teachers and principals can look up general student attendance.'
        };
      }
      break;
    }

    case 'mark_attendance': {
      if (user.role !== 'teacher') {
        return {
          status: 'DENIED',
          authorized: false,
          action,
          role: user.role,
          reason: `Only teachers are authorized to mark or alter attendance. Current role '${user.role}' is unauthorized.`
        };
      }

      if (resourceId) {
        const student = db.getStudentById(resourceId);
        if (!student) {
          return {
            status: 'DENIED',
            authorized: false,
            action,
            role: user.role,
            reason: `Student with ID '${resourceId}' not found.`
          };
        }

        // Check if teacher is assigned to this student's class
        if (user.assignedClass && student.class_name.toLowerCase() !== user.assignedClass.toLowerCase()) {
          return {
            status: 'DENIED',
            authorized: false,
            action,
            role: user.role,
            reason: `Teacher '${user.name}' is assigned to ${user.assignedClass} and is not authorized to mark attendance for ${student.class_name} student '${student.name}'.`
          };
        }
      }
      break;
    }

    case 'view_school_attendance': {
      if (user.role !== 'principal') {
        return {
          status: 'DENIED',
          authorized: false,
          action,
          role: user.role,
          reason: `Access Denied: School-wide management analytics are restricted exclusively to the Principal. User role '${user.role}' cannot access executive metrics.`
        };
      }
      break;
    }

    case 'view_attendance_trend': {
      if (user.role === 'student') {
        if (resourceId && user.associatedId && resourceId !== user.associatedId) {
          const res: AuthorizationResult = {
            status: 'DENIED',
            authorized: false,
            action,
            role: user.role,
            reason: 'Students cannot view attendance trends for other students.'
          };
          db.addAuditLog({
            user_id: user.userId,
            user_name: user.name,
            role: user.role,
            action,
            target_resource: resourceId || 'trend',
            authorization_result: 'DENIED',
            status: 'BLOCKED',
            reason: res.reason
          });
          return res;
        }
      } else if (user.role === 'parent') {
        if (resourceId) {
          const student = db.getStudentById(resourceId);
          if (student && student.parent_id !== user.associatedId) {
            const res: AuthorizationResult = {
              status: 'DENIED',
              authorized: false,
              action,
              role: user.role,
              reason: `Privacy Violation: Student '${student.name}' is not registered under your parent account.`
            };
            db.addAuditLog({
              user_id: user.userId,
              user_name: user.name,
              role: user.role,
              action,
              target_resource: resourceId,
              authorization_result: 'DENIED',
              status: 'BLOCKED',
              reason: res.reason
            });
            return res;
          }
        }
      }
      break;
    }

    case 'view_at_risk_students': {
      if (user.role !== 'teacher' && user.role !== 'principal') {
        const res: AuthorizationResult = {
          status: 'DENIED',
          authorized: false,
          action,
          role: user.role,
          reason: 'Access Denied: Early Warning risk alerts are restricted to teachers and school management.'
        };
        db.addAuditLog({
          user_id: user.userId,
          user_name: user.name,
          role: user.role,
          action,
          target_resource: resourceId || 'risk_alerts',
          authorization_result: 'DENIED',
          status: 'BLOCKED',
          reason: res.reason
        });
        return res;
      }
      break;
    }

    case 'analyze_attendance': {
      if (user.role !== 'principal' && user.role !== 'teacher') {
        const res: AuthorizationResult = {
          status: 'DENIED',
          authorized: false,
          action,
          role: user.role,
          reason: 'Access Denied: Statistical root cause and Explain Why analytics are restricted to school staff and principal.'
        };
        db.addAuditLog({
          user_id: user.userId,
          user_name: user.name,
          role: user.role,
          action,
          target_resource: resourceId || 'explain_why',
          authorization_result: 'DENIED',
          status: 'BLOCKED',
          reason: res.reason
        });
        return res;
      }
      break;
    }

    case 'request_teacher_call':
    case 'request_teacher_assistance': {
      if (user.role !== 'parent' && user.role !== 'student') {
        const res: AuthorizationResult = {
          status: 'DENIED',
          authorized: false,
          action,
          role: user.role,
          reason: 'Only parents and students can submit teacher assistance requests.'
        };
        db.addAuditLog({
          user_id: user.userId,
          user_name: user.name,
          role: user.role,
          action,
          target_resource: resourceId || 'call_request',
          authorization_result: 'DENIED',
          status: 'BLOCKED',
          reason: res.reason
        });
        return res;
      }
      // If parent, check child ownership
      if (user.role === 'parent' && resourceId) {
        const student = db.getStudentById(resourceId);
        if (student && student.parent_id !== user.associatedId) {
          const res: AuthorizationResult = {
            status: 'DENIED',
            authorized: false,
            action,
            role: user.role,
            reason: `Cannot request teacher assistance for student '${student.name}' as they belong to a different family account.`
          };
          db.addAuditLog({
            user_id: user.userId,
            user_name: user.name,
            role: user.role,
            action,
            target_resource: resourceId,
            authorization_result: 'DENIED',
            status: 'BLOCKED',
            reason: res.reason
          });
          return res;
        }
      }
      break;
    }

    case 'request_management_call':
    case 'request_management_assistance': {
      if (user.role === 'student') {
        const res: AuthorizationResult = {
          status: 'DENIED',
          authorized: false,
          action,
          role: user.role,
          reason: 'Students should contact their class teacher directly before escalating to principal management.'
        };
        db.addAuditLog({
          user_id: user.userId,
          user_name: user.name,
          role: user.role,
          action,
          target_resource: resourceId || 'management_call',
          authorization_result: 'DENIED',
          status: 'BLOCKED',
          reason: res.reason
        });
        return res;
      }
      break;
    }

    default:
      // Allow if listed in role allowedActions
      break;
  }

  const successResult: AuthorizationResult = {
    status: 'AUTHORIZED',
    authorized: true,
    action,
    role: user.role,
    details: {
      user: user.name,
      associatedId: user.associatedId,
      resourceId
    }
  };

  db.addAuditLog({
    user_id: user.userId,
    user_name: user.name,
    role: user.role,
    action,
    target_resource: resourceId || 'authorized_resource',
    authorization_result: 'ALLOWED',
    tool_executed: action,
    status: 'SUCCESS'
  });

  return successResult;
}
