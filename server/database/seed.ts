import { Student, Parent, Teacher, Principal, AttendanceRecord, CallRequest } from './models.js';

export const INITIAL_STUDENTS: Student[] = [
  {
    student_id: 'S101',
    name: 'Rahul Sharma',
    class_name: 'Class 10-A',
    parent_id: 'P101',
    attendance_percentage: 91.2,
    roll_number: 14,
    email: 'rahul.sharma@school.edu'
  },
  {
    student_id: 'S102',
    name: 'Priya Patel',
    class_name: 'Class 10-A',
    parent_id: 'P102',
    attendance_percentage: 95.0,
    roll_number: 18,
    email: 'priya.patel@school.edu'
  },
  {
    student_id: 'S103',
    name: 'Aarav Gupta',
    class_name: 'Class 10-B',
    parent_id: 'P103',
    attendance_percentage: 78.5,
    roll_number: 3,
    email: 'aarav.gupta@school.edu'
  },
  {
    student_id: 'S104',
    name: 'Ananya Iyer',
    class_name: 'Class 9-A',
    parent_id: 'P104',
    attendance_percentage: 88.0,
    roll_number: 7,
    email: 'ananya.iyer@school.edu'
  },
  {
    student_id: 'S105',
    name: 'Rohan Sharma',
    class_name: 'Class 10-A',
    parent_id: 'P101', // Sibling of Rahul Sharma
    attendance_percentage: 86.4,
    roll_number: 22,
    email: 'rohan.sharma@school.edu'
  },
  {
    student_id: 'S106',
    name: 'Rahul Verma', // Ambiguous name for Rahul disambiguation testing
    class_name: 'Class 10-B',
    parent_id: 'P105',
    attendance_percentage: 93.1,
    roll_number: 15,
    email: 'rahul.verma@school.edu'
  },
  {
    student_id: 'S107',
    name: 'Sneha Roy',
    class_name: 'Class 9-B',
    parent_id: 'P106',
    attendance_percentage: 72.0,
    roll_number: 28,
    email: 'sneha.roy@school.edu'
  },
  {
    student_id: 'S108',
    name: 'Vikram Singh',
    class_name: 'Class 10-A',
    parent_id: 'P107',
    attendance_percentage: 96.5,
    roll_number: 31,
    email: 'vikram.singh@school.edu'
  }
];

export const INITIAL_PARENTS: Parent[] = [
  {
    parent_id: 'P101',
    name: 'Ramesh Sharma',
    email: 'ramesh.sharma@gmail.com',
    phone: '+1-555-0101',
    children_ids: ['S101', 'S105'] // Rahul Sharma and Rohan Sharma
  },
  {
    parent_id: 'P102',
    name: 'Sunita Patel',
    email: 'sunita.patel@gmail.com',
    phone: '+1-555-0102',
    children_ids: ['S102'] // Priya Patel
  },
  {
    parent_id: 'P103',
    name: 'Vikram Gupta',
    email: 'vikram.gupta@gmail.com',
    phone: '+1-555-0103',
    children_ids: ['S103'] // Aarav Gupta
  },
  {
    parent_id: 'P104',
    name: 'Lakshmi Iyer',
    email: 'lakshmi.iyer@gmail.com',
    phone: '+1-555-0104',
    children_ids: ['S104'] // Ananya Iyer
  },
  {
    parent_id: 'P105',
    name: 'Deepak Verma',
    email: 'deepak.verma@gmail.com',
    phone: '+1-555-0105',
    children_ids: ['S106'] // Rahul Verma
  },
  {
    parent_id: 'P106',
    name: 'Alok Roy',
    email: 'alok.roy@gmail.com',
    phone: '+1-555-0106',
    children_ids: ['S107'] // Sneha Roy
  }
];

export const INITIAL_TEACHERS: Teacher[] = [
  {
    teacher_id: 'T201',
    name: 'Meera Sen',
    class_name: 'Class 10-A', // Class Teacher for 10-A
    subjects: ['Mathematics', 'Statistics'],
    email: 'meera.sen@school.edu'
  },
  {
    teacher_id: 'T202',
    name: 'Rajesh Nair',
    class_name: 'Class 10-B', // Class Teacher for 10-B
    subjects: ['Physics', 'Science'],
    email: 'rajesh.nair@school.edu'
  },
  {
    teacher_id: 'T203',
    name: 'Kavita Das',
    class_name: 'Class 9-A', // Class Teacher for 9-A
    subjects: ['English Literature', 'Grammar'],
    email: 'kavita.das@school.edu'
  }
];

export const INITIAL_PRINCIPAL: Principal = {
  principal_id: 'PR301',
  name: 'Dr. Arthur Vance',
  email: 'principal@school.edu',
  title: 'School Principal & Academic Director'
};

// Generates realistic attendance for past 14 weekdays
export function generateInitialAttendance(): AttendanceRecord[] {
  const records: AttendanceRecord[] = [];
  const today = new Date();
  
  // Format YYYY-MM-DD
  const formatDate = (d: Date) => d.toISOString().split('T')[0];

  const dates: string[] = [];
  for (let i = 0; i < 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    // skip weekends (0 is Sun, 6 is Sat)
    if (d.getDay() !== 0 && d.getDay() !== 6) {
      dates.push(formatDate(d));
    }
  }

  // Ensure today's date (or closest weekday) is in the list
  const todayStr = formatDate(today);
  if (!dates.includes(todayStr) && today.getDay() !== 0 && today.getDay() !== 6) {
    dates.unshift(todayStr);
  }

  let idCounter = 1;

  for (const student of INITIAL_STUDENTS) {
    for (let index = 0; index < dates.length; index++) {
      const date = dates[index];
      let status: 'present' | 'absent' | 'late' | 'excused' = 'present';
      
      // Add realistic variance based on their overall attendance
      if (student.student_id === 'S101') {
        // Rahul: absent 2 days ago
        if (index === 2) status = 'absent';
        else if (index === 5) status = 'late';
      } else if (student.student_id === 'S103') {
        // Aarav: multiple absences (78.5%)
        if (index === 1 || index === 4 || index === 8) status = 'absent';
        else if (index === 6) status = 'late';
      } else if (student.student_id === 'S107') {
        // Sneha: low attendance
        if (index === 0 || index === 3 || index === 7 || index === 9) status = 'absent';
      }

      records.push({
        attendance_id: `ATT-${String(idCounter++).padStart(4, '0')}`,
        student_id: student.student_id,
        student_name: student.name,
        class_name: student.class_name,
        date,
        status,
        marked_by: student.class_name === 'Class 10-A' ? 'T201' : (student.class_name === 'Class 10-B' ? 'T202' : 'T203'),
        remarks: status === 'absent' ? 'Unexcused leave' : (status === 'late' ? 'Arrived 15 mins late' : 'Normal attendance'),
        updated_at: new Date().toISOString()
      });
    }
  }

  return records;
}

export const INITIAL_CALL_REQUESTS: CallRequest[] = [
  {
    request_id: 'REQ-1001',
    requester_id: 'P101',
    requester_name: 'Ramesh Sharma',
    requester_role: 'parent',
    target_type: 'teacher',
    target_id: 'T201',
    student_id: 'S101',
    student_name: 'Rahul Sharma',
    reason: 'Discussion regarding upcoming Mathematics mid-term preparation and recent quiz score',
    status: 'pending',
    created_at: new Date(Date.now() - 86400000).toISOString()
  },
  {
    request_id: 'REQ-1002',
    requester_id: 'P103',
    requester_name: 'Vikram Gupta',
    requester_role: 'parent',
    target_type: 'teacher',
    target_id: 'T202',
    student_id: 'S103',
    student_name: 'Aarav Gupta',
    reason: 'Follow-up on attendance and extra support in Physics laboratory sessions',
    status: 'in_progress',
    created_at: new Date(Date.now() - 172800000).toISOString()
  }
];
