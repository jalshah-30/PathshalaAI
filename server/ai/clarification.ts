import { Student } from '../database/models.js';
import { db } from '../database/database.js';
import { AuthUser } from '../auth/roles.js';

export interface ClarificationResult {
  needsClarification: boolean;
  type?: 'disambiguate_student' | 'missing_student' | 'missing_status' | 'missing_date';
  message?: string;
  options?: { student_id: string; name: string; class_name: string; value: string }[];
  matchedStudents?: Student[];
}

export class ClarificationEngine {
  /**
   * Evaluates if disambiguation or missing entity resolution is needed.
   */
  public evaluateStudentClarification(
    studentName: string | undefined,
    user: AuthUser,
    action: string
  ): ClarificationResult {
    // If no student name is specified
    if (!studentName) {
      if (user.role === 'parent') {
        const children = (user.childrenIds || [])
          .map((id) => db.getStudentById(id))
          .filter(Boolean) as Student[];

        if (children.length > 1) {
          return {
            needsClarification: true,
            type: 'disambiguate_student',
            message: `You have ${children.length} children enrolled. Which child's records would you like to view?`,
            options: children.map((c) => ({
              student_id: c.student_id,
              name: c.name,
              class_name: c.class_name,
              value: c.name
            })),
            matchedStudents: children
          };
        }
      }

      if (action === 'mark_attendance' || action === 'view_student_attendance') {
        const candidates = user.assignedClass
          ? db.getStudentsByClass(user.assignedClass)
          : db.getAllStudents().slice(0, 5);

        return {
          needsClarification: true,
          type: 'missing_student',
          message: 'Which student would you like me to process?',
          options: candidates.map((s) => ({
            student_id: s.student_id,
            name: s.name,
            class_name: s.class_name,
            value: s.name
          }))
        };
      }

      return { needsClarification: false };
    }

    // Check if name search returns multiple matches
    const matches = db.getStudentsByName(studentName);

    if (matches.length > 1) {
      // If user is a teacher, check if only 1 belongs to teacher's class
      if (user.role === 'teacher' && user.assignedClass) {
        const classMatches = matches.filter(
          (s) => s.class_name.toLowerCase() === user.assignedClass?.toLowerCase()
        );
        if (classMatches.length === 1) {
          return {
            needsClarification: false,
            matchedStudents: [classMatches[0]]
          };
        }
      }

      // If user is a parent, check if one belongs to parent
      if (user.role === 'parent' && user.associatedId) {
        const parentMatches = matches.filter((s) => s.parent_id === user.associatedId);
        if (parentMatches.length === 1) {
          return {
            needsClarification: false,
            matchedStudents: [parentMatches[0]]
          };
        }
      }

      return {
        needsClarification: true,
        type: 'disambiguate_student',
        message: `I found ${matches.length} students matching "${studentName}". Which student do you mean?`,
        options: matches.map((s) => ({
          student_id: s.student_id,
          name: s.name,
          class_name: s.class_name,
          value: `${s.name} (${s.class_name})`
        })),
        matchedStudents: matches
      };
    }

    if (matches.length === 0) {
      return {
        needsClarification: true,
        type: 'missing_student',
        message: `I couldn't find a student named "${studentName}" in the school directory. Please check the name or select from your class:`,
        options: (user.assignedClass ? db.getStudentsByClass(user.assignedClass) : db.getAllStudents().slice(0, 4)).map(
          (s) => ({
            student_id: s.student_id,
            name: s.name,
            class_name: s.class_name,
            value: s.name
          })
        )
      };
    }

    return {
      needsClarification: false,
      matchedStudents: matches
    };
  }
}

export const clarificationEngine = new ClarificationEngine();
