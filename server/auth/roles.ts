export type UserRole = 'student' | 'parent' | 'teacher' | 'principal';

export interface RoleDefinition {
  role: UserRole;
  title: string;
  personaName: string;
  personaDescription: string;
  allowedActions: string[];
}

export const ROLE_DEFINITIONS: Record<UserRole, RoleDefinition> = {
  student: {
    role: 'student',
    title: 'Student',
    personaName: 'Academic Assistant',
    personaDescription:
      'Friendly, encouraging, and supportive. Explains concepts clearly and helps students keep track of their attendance and academic progress.',
    allowedActions: [
      'view_own_attendance',
      'view_attendance_trend',
      'request_teacher_assistance',
      'general_school_question'
    ]
  },
  parent: {
    role: 'parent',
    title: 'Parent',
    personaName: 'Parent Support Assistant',
    personaDescription:
      'Caring, patient, reassuring, and helpful. Provides accurate updates on their child’s school attendance, activities, and coordinates with teachers.',
    allowedActions: [
      'view_child_attendance',
      'view_attendance_trend',
      'request_teacher_assistance',
      'request_teacher_call',
      'request_management_assistance',
      'general_school_question'
    ]
  },
  teacher: {
    role: 'teacher',
    title: 'Teacher',
    personaName: 'Teaching Assistant',
    personaDescription:
      'Professional, concise, organized, and practical. Assists teachers with student attendance lookups, marking attendance, and classroom summaries.',
    allowedActions: [
      'view_student_attendance',
      'mark_attendance',
      'view_class_attendance',
      'view_attendance_trend',
      'view_at_risk_students',
      'request_management_assistance',
      'request_management_call',
      'general_school_question'
    ]
  },
  principal: {
    role: 'principal',
    title: 'Principal',
    personaName: 'Management Assistant',
    personaDescription:
      'Professional, analytical, strategic, and management-oriented. Delivers high-level school-wide analytics, attendance trends, and administrative operations.',
    allowedActions: [
      'view_school_attendance',
      'view_student_attendance',
      'view_class_attendance',
      'view_attendance_trend',
      'view_at_risk_students',
      'analyze_attendance',
      'request_management_assistance',
      'request_management_call',
      'manage_call_requests',
      'general_school_question'
    ]
  }
};

export interface AuthUser {
  userId: string;
  role: UserRole;
  name: string;
  email: string;
  associatedId?: string; // student_id, parent_id, teacher_id, or principal_id
  assignedClass?: string; // For teachers
  childrenIds?: string[]; // For parents
}

export const DEMO_USERS: AuthUser[] = [
  {
    userId: 'user-student-1',
    role: 'student',
    name: 'Rahul Sharma',
    email: 'rahul.sharma@school.edu',
    associatedId: 'S101'
  },
  {
    userId: 'user-parent-1',
    role: 'parent',
    name: 'Ramesh Sharma',
    email: 'ramesh.sharma@gmail.com',
    associatedId: 'P101',
    childrenIds: ['S101', 'S105'] // Rahul Sharma and Rohan Sharma
  },
  {
    userId: 'user-parent-2',
    role: 'parent',
    name: 'Sunita Patel',
    email: 'sunita.patel@gmail.com',
    associatedId: 'P102',
    childrenIds: ['S102'] // Priya Patel
  },
  {
    userId: 'user-teacher-1',
    role: 'teacher',
    name: 'Meera Sen',
    email: 'meera.sen@school.edu',
    associatedId: 'T201',
    assignedClass: 'Class 10-A'
  },
  {
    userId: 'user-principal-1',
    role: 'principal',
    name: 'Dr. Ananya Iyer',
    email: 'principal@school.edu',
    associatedId: 'PR301'
  }
];
