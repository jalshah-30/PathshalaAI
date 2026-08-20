import { db } from '../../../database/database.js';

export class ManagementPortalService {
  public static getSchoolOverview() {
    return {
      principal: db.getPrincipal(),
      analytics: db.getSchoolAnalytics(),
      students: db.getAllStudents(),
      teachers: db.getAllTeachers(),
      callRequests: db.getAllCallRequests()
    };
  }
}
