import { db } from '../../../database/database.js';
import { AttendanceStatus } from '../../../database/models.js';

export class StaffPortalService {
  public static getClassRoster(className: string) {
    const students = db.getStudentsByClass(className);
    return students;
  }

  public static markAttendance(
    studentId: string,
    date: string,
    status: AttendanceStatus,
    teacherName: string,
    remarks?: string
  ) {
    return db.markAttendance(studentId, date, status, teacherName, remarks);
  }
}
