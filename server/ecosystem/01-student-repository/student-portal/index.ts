import { db } from '../../../database/database.js';

export class StudentPortalService {
  public static getStudentProfile(studentId: string) {
    const student = db.getStudentById(studentId);
    if (!student) return null;
    const records = db.getStudentAttendanceRecords(studentId);
    return {
      student,
      attendanceRecords: records,
      percentage: student.attendance_percentage
    };
  }
}
