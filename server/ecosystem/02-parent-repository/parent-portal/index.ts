import { db } from '../../../database/database.js';

export class ParentPortalService {
  public static getParentWards(parentId: string) {
    const parent = db.getParentById(parentId);
    if (!parent) return null;
    const wards = db.getStudentsByParentId(parentId);
    return {
      parent,
      wards
    };
  }

  public static requestTeacherCall(data: {
    parentId: string;
    parentName: string;
    studentId: string;
    studentName: string;
    reason: string;
  }) {
    return db.createCallRequest({
      requester_id: data.parentId,
      requester_name: data.parentName,
      requester_role: 'parent',
      target_type: 'teacher',
      student_id: data.studentId,
      student_name: data.studentName,
      reason: data.reason
    });
  }
}
