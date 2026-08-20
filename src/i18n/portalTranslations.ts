/**
 * Comprehensive Portal Translations for all 11 Indian Languages:
 * English, Hindi (हिन्दी), Tamil (தமிழ்), Telugu (తెలుగు), Marathi (मराठी),
 * Bengali (বাংলা), Gujarati (ગુજરાતી), Punjabi (ਪੰਜਾਬੀ), Kannada (ಕನ್ನಡ),
 * Malayalam (മലയാളം), and Urdu (اردو).
 */

import { getLanguageDefinition } from './localization';

export interface PortalTranslations {
  // Common / Global
  term1: string;
  enrolledCourses: string;
  recentActivity: string;
  erpSynced: string;
  date: string;
  status: string;
  markedBy: string;
  remarks: string;
  present: string;
  absent: string;
  late: string;
  grade: string;
  active: string;
  actions: string;
  search: string;
  close: string;
  confirm: string;
  cancel: string;
  success: string;

  // Notice Board
  noticeBoard: {
    title: string;
    officeBadge: string;
    subtitle: string;
    aiSummarizeBtn: string;
    readCircular: string;
    askCopilot: string;
    officialStamp: string;
    circularDetails: string;
    issuerPrefix: string;
    validityPrefix: string;
    notices: Array<{
      id: string;
      category: string;
      title: string;
      date: string;
      issuer: string;
      summary: string;
      stampText: string;
      actionPrompt: string;
    }>;
  };

  // Daily Bell Schedule & Timetable
  timetable: {
    title: string;
    classBadge: string;
    subtitle: string;
    days: {
      Mon: string;
      Tue: string;
      Wed: string;
      Thu: string;
      Fri: string;
    };
    statusCompleted: string;
    statusCurrent: string;
    statusUpcoming: string;
    periods: Array<{
      id: string;
      periodNum: number | string;
      time: string;
      subject: string;
      room: string;
      teacher: string;
      status: 'completed' | 'current' | 'upcoming';
      notes?: string;
    }>;
    askPeriodAi: string;
  };

  // Interactive Blackboard
  blackboard: {
    title: string;
    subtitle: string;
    chalkDraw: string;
    chalkErase: string;
    clearSlate: string;
    playAnimation: string;
    pauseAnimation: string;
    askExplain: string;
    lessons: Array<{
      id: string;
      tabTitle: string;
      title: string;
      subtitle: string;
      lines: Array<{ text: string; color: string; indent: number }>;
      doodle: string;
    }>;
  };

  // Ruled Notebook
  notebook: {
    title: string;
    subtitle: string;
    studyJournal: string;
    taskChecklist: string;
    addNotePlaceholder: string;
    aiScribeBtn: string;
    explainWithAi: string;
    tasks: Array<{ id: string; text: string }>;
    notes: Array<{
      id: string;
      title: string;
      category: string;
      date: string;
      bullets: string[];
      stickyTip: string;
    }>;
  };

  // Attendance Analytics Chart
  attendanceChart: {
    title: string;
    subtitle: string;
    timeframes: {
      weekly: string;
      monthly: string;
      semester: string;
    };
    mandatoryThreshold: string;
    weeklyLabels: string[];
    monthlyLabels: string[];
    semesterLabels: string[];
    statuses: {
      full: string;
      lateArrival: string;
      unexcused: string;
      illness: string;
      exemplary: string;
      good: string;
      stable: string;
      declineFlagged: string;
      distinction: string;
      attentionRequired: string;
    };
    aiOptimizationBtn: string;
  };

  // AI Insights
  aiInsights: {
    title: string;
    subtitle: string;
    aiBadge: string;
    cards: Array<{
      id: string;
      title: string;
      category: string;
      status: string;
      desc: string;
      actionText: string;
      prompt: string;
    }>;
  };

  // Early Warning Radar
  radar: {
    title: string;
    subtitle: string;
    riskScore: string;
    safeVerdict: string;
    moderateVerdict: string;
    highRiskVerdict: string;
    riskFactorsTitle: string;
    factors: Array<{ label: string; impact: string; desc: string }>;
    mitigateBtn: string;
    consultationBtn: string;
  };

  // Copilot Action Cards
  copilotActions: {
    title: string;
    subtitle: string;
    actions: Array<{
      id: string;
      title: string;
      desc: string;
      category: string;
      prompt: string;
    }>;
  };

  // Gamification Badges
  badges: {
    title: string;
    subtitle: string;
    streakLevel: string;
    badgesList: Array<{
      id: string;
      title: string;
      desc: string;
      tag: string;
    }>;
  };

  // Homework Worksheet Locker
  homework: {
    title: string;
    subtitle: string;
    lockerBadge: string;
    worksheets: Array<{
      id: string;
      title: string;
      subject: string;
      dueDate: string;
      status: string;
      difficulty: string;
      questions: string;
      prompt: string;
    }>;
    solveWithAi: string;
  };

  // Parent Portal
  parentPortal: {
    bannerTag: string;
    familyPortal: string;
    parentId: string;
    activeWards: string;
    requestTeacherCall: string;
    askPathshalaAi: string;
    selectWard: string;
    roll: string;
    overallAttendance: string;
    attendanceHealthSafe: string;
    attendanceHealthRisk: string;
    presentDays: string;
    absentDays: string;
    medicalLeaves: string;
    instantVoicePrompts: string;
    subjectLedgerTitle: string;
    recentAttendanceTitle: string;
    modalTitle: string;
    modalSubtitle: string;
    studentLabel: string;
    reasonLabel: string;
    reasonPlaceholder: string;
    submitCallRequest: string;
    callSuccessMsg: string;
  };

  // Management Portal
  managementPortal: {
    bannerTag: string;
    authorityBadge: string;
    roleLabel: string;
    academicYear: string;
    generateAuditReport: string;
    askPathshalaAi: string;
    totalEnrolled: string;
    totalStudentsDesc: string;
    academicCapacity: string;
    schoolAverage: string;
    cbseCompliant: string;
    targetBenchmark: string;
    criticalAttention: string;
    immediateAction: string;
    criticalCountDesc: string;
    facultyPresent: string;
    fullAttendance: string;
    zeroSubstitute: string;
    classBreakdownTitle: string;
    classCol: string;
    enrolledCol: string;
    avgAttendanceCol: string;
    teacherCol: string;
    statusCol: string;
    criticalStudentsTitle: string;
    searchCriticalPlaceholder: string;
    studentCol: string;
    deficitCol: string;
    guardianCol: string;
    callGuardianBtn: string;
    sendWarningBtn: string;
    mgmtPromptsTitle: string;
  };

  // Staff Portal
  staffPortal: {
    bannerTag: string;
    classTeacherBadge: string;
    teacherId: string;
    department: string;
    assignedClass: string;
    markAllPresent: string;
    askPathshalaAi: string;
    liveRegisterTitle: string;
    todayDate: string;
    searchPlaceholder: string;
    rollCol: string;
    studentCol: string;
    historicalCol: string;
    todayStatusCol: string;
    summaryTitle: string;
    presentCount: string;
    absentCount: string;
    lateCount: string;
    attendanceRate: string;
    teacherPromptsTitle: string;
  };

  // Copilots & Chat View
  copilots: {
    aiEngineBannerTag: string;
    voiceAvatarOnline: string;
    aiEngineTitle: string;
    aiEngineSubtitle: string;
    hideDashboard: string;
    showDashboard: string;
    avatarMode: string;
    chatMode: string;
    chatViewTitle: string;
    chatViewSubtitle: string;
    typePlaceholder: string;
    sendBtn: string;
    voiceBtn: string;
    thinking: string;
    suggestedQuestions: string;
    clarificationHeader: string;
  };
}

// -------------------------------------------------------------
// ENGLISH
// -------------------------------------------------------------
const EN: PortalTranslations = {
  term1: 'Term 1',
  enrolledCourses: 'Enrolled Courses & Grades',
  recentActivity: 'Recent Attendance Activity',
  erpSynced: 'ERP Synced',
  date: 'Date',
  status: 'Status',
  markedBy: 'Marked By',
  remarks: 'Remarks',
  present: 'Present',
  absent: 'Absent',
  late: 'Late',
  grade: 'Grade',
  active: 'Active',
  actions: 'Actions',
  search: 'Search',
  close: 'Close',
  confirm: 'Confirm',
  cancel: 'Cancel',
  success: 'Success',

  noticeBoard: {
    title: 'Official Campus Notice Board',
    officeBadge: 'Principal & Exam Office',
    subtitle: 'Authenticated circulars, examination schedules, and student notices',
    aiSummarizeBtn: 'AI Summarize All Notices',
    readCircular: 'Read Full Circular',
    askCopilot: 'Ask Copilot',
    officialStamp: 'OFFICIAL • APPROVED',
    circularDetails: 'Circular Details & Compliance',
    issuerPrefix: 'Issued By',
    validityPrefix: 'Schedule / Date',
    notices: [
      {
        id: 'n1',
        category: 'EXAMINATION CIRCULAR',
        title: 'CBSE Class 10 Term-1 Datesheet & Hall Tickets',
        date: 'Oct 12 – Oct 26',
        issuer: 'Office of the Controller of Examinations',
        summary: 'Theory papers commence at 10:30 AM sharp. Internal practical assessments conclude by Oct 05. Collect verified admit cards from Class Teacher.',
        stampText: 'OFFICIAL • APPROVED',
        actionPrompt: 'Summarize the CBSE Term-1 datesheet schedule and key exam instructions for Class 10'
      },
      {
        id: 'n2',
        category: 'ACADEMIC COMPETITION',
        title: 'Inter-School AI & Science Model Exhibition',
        date: 'Friday, 3:00 PM',
        issuer: 'Atal Tinkering Lab & Science Dept.',
        summary: 'Working models on Renewable Energy, Robotics, and Python AI algorithms to be registered by Thursday 4:00 PM. Winners qualify for State Finals.',
        stampText: 'REGISTRATION OPEN',
        actionPrompt: 'What are the rules and project ideas for the Inter-School Science & AI Exhibition?'
      },
      {
        id: 'n3',
        category: 'CAMPUS POLICY',
        title: 'Strict 75% Attendance Criteria for Board Clearance',
        date: 'Immediate Effect',
        issuer: "Principal's Desk (Dr. Rajesh Verma)",
        summary: 'Students below 75% aggregate presence without sanctioned medical proof will be barred from practical exams. Check attendance ledger weekly.',
        stampText: 'MANDATORY COMPLIANCE',
        actionPrompt: 'Explain the official 75% attendance policy and medical leave certificate submission guidelines'
      },
      {
        id: 'n4',
        category: 'SPORTS & EXTRA-CURRICULAR',
        title: 'Annual Sports Meet & Inter-House Trials',
        date: 'Next Saturday',
        issuer: 'Department of Physical Education',
        summary: 'Tagore, Raman, Shivaji, and Teresa house athletes report to main stadium for 100m, 400m relay, and long jump trials. Duty leave provided.',
        stampText: 'DUTY LEAVE ELIGIBLE',
        actionPrompt: 'How do duty leaves get credited to my attendance ledger during sports trials?'
      }
    ]
  },

  timetable: {
    title: 'Daily Bell Schedule & Timetable',
    classBadge: 'Class 10-A',
    subtitle: 'Standard 45-minute academic periods with classroom & lab locations',
    days: {
      Mon: 'Mon',
      Tue: 'Tue',
      Wed: 'Wed',
      Thu: 'Thu',
      Fri: 'Fri'
    },
    statusCompleted: 'Completed',
    statusCurrent: 'Active Now',
    statusUpcoming: 'Upcoming',
    periods: [
      {
        id: 'p1',
        periodNum: 1,
        time: '08:30 – 09:15 AM',
        subject: 'Mathematics',
        room: 'Room 204',
        teacher: 'Mrs. Sunita Rao',
        status: 'completed',
        notes: 'Covered: Quadratic Roots Exercise 4.2'
      },
      {
        id: 'p2',
        periodNum: 2,
        time: '09:20 – 10:05 AM',
        subject: 'Physics & Optics Lab',
        room: 'Science Block Lab 1',
        teacher: 'Mr. Arvind Saxena',
        status: 'current',
        notes: 'Active: Concave Mirror Ray Diagrams'
      },
      {
        id: 'p3',
        periodNum: 3,
        time: '10:35 – 11:20 AM',
        subject: 'Computer Science',
        room: 'IT Lab 2',
        teacher: 'Mr. David Miller',
        status: 'upcoming',
        notes: 'Topic: Python Functions & Arrays'
      },
      {
        id: 'p4',
        periodNum: 4,
        time: '11:25 – 12:10 PM',
        subject: 'English Literature',
        room: 'Room 108',
        teacher: "Ms. Clara D'Souza",
        status: 'upcoming',
        notes: 'Chapter: The Merchant of Venice Act 3'
      },
      {
        id: 'p5',
        periodNum: 5,
        time: '12:15 – 01:00 PM',
        subject: 'Social Science & Civics',
        room: 'Room 204',
        teacher: 'Mrs. Geeta Patel',
        status: 'upcoming',
        notes: 'Topic: Federalism in Indian Democracy'
      }
    ],
    askPeriodAi: 'Ask AI about this period'
  },

  blackboard: {
    title: 'Interactive Classroom Chalkboard & AI Scribe',
    subtitle: 'Real-time chalkboard demonstration, derivations, and study concepts',
    chalkDraw: 'Freehand Slate Draw',
    chalkErase: 'Duster / Erase Board',
    clearSlate: 'Clear Slate',
    playAnimation: 'Play Auto Chalk Animation',
    pauseAnimation: 'Pause Animation',
    askExplain: 'Ask AI to Explain Lesson on Board',
    lessons: [
      {
        id: 'math',
        tabTitle: 'Mathematics',
        title: 'Mathematics: Pythagoras & Trigonometry',
        subtitle: 'Class 10 CBSE Chapter 8',
        lines: [
          { text: 'In right-angled △ABC (∠B = 90°):', color: 'chalk-yellow', indent: 0 },
          { text: 'AC² = AB² + BC²  (Pythagoras Theorem)', color: 'chalk-text', indent: 1 },
          { text: 'sin²(θ) + cos²(θ) = 1', color: 'chalk-cyan', indent: 1 },
          { text: 'tan(θ) = sin(θ) / cos(θ) = Perpendicular / Base', color: 'chalk-pink', indent: 1 },
          { text: '★ Exam Tip: Memorize standard values of 0°, 30°, 45°, 60°, 90°', color: 'chalk-yellow', indent: 0 }
        ],
        doodle: 'triangle'
      },
      {
        id: 'physics',
        tabTitle: 'Physics',
        title: 'Physics: Kinematics & Energy',
        subtitle: 'Laws of Motion & Conservation',
        lines: [
          { text: "Newton's 2nd Law of Motion:", color: 'chalk-yellow', indent: 0 },
          { text: 'F = m · a = d(mv)/dt', color: 'chalk-cyan', indent: 1 },
          { text: 'Kinetic Energy:  K.E. = ½ m v²', color: 'chalk-text', indent: 1 },
          { text: 'Potential Energy: P.E. = m · g · h', color: 'chalk-text', indent: 1 },
          { text: 'Total Mechanical Energy E = K.E. + P.E. = CONSTANT', color: 'chalk-pink', indent: 0 }
        ],
        doodle: 'graph'
      },
      {
        id: 'attendance',
        tabTitle: 'Attendance Model',
        title: 'Pathshala AI: Attendance Probability Model',
        subtitle: 'Live CBSE 75% Risk Analysis',
        lines: [
          { text: 'Current Status: 21 / 23 Days Attended = 91.3%', color: 'chalk-cyan', indent: 0 },
          { text: 'Target Threshold: P(Eligibility) ≥ 75.0%', color: 'chalk-yellow', indent: 1 },
          { text: 'Buffer Safety Margin: +16.3% above minimum cutoff', color: 'chalk-text', indent: 1 },
          { text: 'Safe Absence Allowance: Up to 4 future classes', color: 'chalk-pink', indent: 1 },
          { text: 'Copilot Verdict: Safe for Board Exam Admit Card ✓', color: 'chalk-yellow', indent: 0 }
        ],
        doodle: 'badge'
      },
      {
        id: 'sanskrit',
        tabTitle: 'Vedic Thought',
        title: 'Vedic Wisdom: विद्या ददाति विनयं',
        subtitle: 'Pathshala Thought of the Day',
        lines: [
          { text: 'विद्या ददाति विनयं, विनयाद्याति पात्रताम् ।', color: 'chalk-yellow', indent: 0 },
          { text: 'पात्रत्वाद्धनमाप्नोति, धनाद्धर्मं ततः सुखम् ॥', color: 'chalk-text', indent: 0 },
          { text: 'Meaning: True knowledge bestows humility, humility brings worthiness,', color: 'chalk-cyan', indent: 1 },
          { text: 'worthiness yields prosperity, and righteous prosperity brings peace.', color: 'chalk-pink', indent: 1 }
        ],
        doodle: 'lotus'
      }
    ]
  },

  notebook: {
    title: 'Smart Spiral Ruled Notebook',
    subtitle: 'Class 10-A Study Journal & Homework Tracker',
    studyJournal: 'Study Notes & Journal',
    taskChecklist: 'Study Tasks & Checklist',
    addNotePlaceholder: 'Write a quick study note or formula with animated pen...',
    aiScribeBtn: 'Add with Pen',
    explainWithAi: 'Explain Note with AI',
    tasks: [
      { id: 't1', text: 'Solve Exercise 4.2 Quadratic Equations (Q1 to Q10)' },
      { id: 't2', text: 'Draw Ray Diagrams for Concave Mirror in Physics Journal' },
      { id: 't3', text: 'Prepare Revision Flashcards for Chemistry Periodic Trends' },
      { id: 't4', text: 'Verify Attendance Ledger with Class Teacher Mrs. Rao' }
    ],
    notes: [
      {
        id: '1',
        title: 'Chapter 4: Quadratic Equations & Roots',
        category: 'Mathematics',
        date: 'Today, 10:30 AM',
        bullets: [
          'Standard Form: ax² + bx + c = 0 (where a ≠ 0)',
          'Discriminant D = b² - 4ac determines nature of roots:',
          '  • If D > 0 ➔ 2 distinct real roots: x = (-b ± √D) / 2a',
          '  • If D = 0 ➔ 2 equal real roots: x = -b / 2a',
          '  • If D < 0 ➔ No real roots (Complex conjugate pair)',
          'CBSE Repeated Question: Word problems on train speeds & tap filling.'
        ],
        stickyTip: '★ Pro Tip: Always check if coefficient "a" can be simplified first!'
      },
      {
        id: '2',
        title: 'Light: Reflection & Spherical Mirrors',
        category: 'Physics',
        date: 'Yesterday',
        bullets: [
          'Mirror Formula: 1/f = 1/v + 1/u',
          'Magnification: m = -v/u = h₂/h₁',
          'Concave Mirror: Real, inverted (except when object is between P and F ➔ Virtual, erect).',
          'Convex Mirror: Always virtual, erect, and diminished (used in rear-view mirrors).'
        ],
        stickyTip: '★ Sign Convention: Distances measured in direction of incident ray are POSITIVE.'
      },
      {
        id: '3',
        title: 'CBSE 75% Attendance Golden Rulebook',
        category: 'Attendance Strategy',
        date: 'Term 1 Strategy',
        bullets: [
          'Current Attendance: 91.3% (Total 21 / 23 Days Marked)',
          'Remaining Term Target: Maintain minimum 80% for internal practicals waiver.',
          'Medical Leaves: Submit stamped doctor certificate within 48h of resuming.',
          'Copilot Advice: Rahul can take up to 4 planned sick/competition leaves safely.'
        ],
        stickyTip: '★ Reminder: Sports meet on 25th qualifies for duty leave credit!'
      }
    ]
  },

  attendanceChart: {
    title: 'Multi-Week Attendance Analytics',
    subtitle: 'Track session consistency, verify minimum 75% CBSE threshold, and view AI predictive trends',
    timeframes: {
      weekly: 'Weekly',
      monthly: 'Monthly',
      semester: 'Semester'
    },
    mandatoryThreshold: '75% Mandatory Board Minimum',
    weeklyLabels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    monthlyLabels: ['Aug', 'Sep', 'Oct', 'Nov'],
    semesterLabels: ['Term 1 Baseline', 'Mid-Term Current'],
    statuses: {
      full: 'Full Attendance',
      lateArrival: '1 Late Arrival',
      unexcused: '1 Unexcused Absence',
      illness: '1 Illness Absence',
      exemplary: 'Exemplary',
      good: 'Good',
      stable: 'Stable',
      declineFlagged: 'Decline Flagged',
      distinction: 'Distinction',
      attentionRequired: 'Attention Required'
    },
    aiOptimizationBtn: 'AI Recommendation: Ask How to Maintain 85%'
  },

  aiInsights: {
    title: 'Pathshala AI Intelligence & Diagnostic Insights',
    subtitle: 'Real-time predictive telemetry & CBSE compliance insights',
    aiBadge: 'Autonomous Diagnostic Engine',
    cards: [
      {
        id: 'c1',
        title: 'Trajectory Risk Analysis',
        category: 'Predictive Attendance',
        status: 'Safe Buffer (+16.3%)',
        desc: 'Based on your last 23 class sessions, your attendance remains well above the 75% CBSE threshold.',
        actionText: 'Simulate Absence Impact',
        prompt: 'What happens to my exam eligibility if I miss 3 classes next week?'
      },
      {
        id: 'c2',
        title: 'Subject Performance Correlation',
        category: 'Academic Correlation',
        status: 'High Correlation',
        desc: '92% attendance in Mathematics correlates directly with Grade A score in internal unit test 1.',
        actionText: 'View Grade Correlation',
        prompt: 'Show correlation between my attendance and test scores across all subjects'
      },
      {
        id: 'c3',
        title: 'Medical Leave Verification',
        category: 'ERP Document Desk',
        status: '1 Approved Leave',
        desc: 'Medical leave on Sep 18 was approved by Class Teacher Mrs. Sunita Rao with doctor slip verified.',
        actionText: 'Submit Medical Document',
        prompt: 'How do I submit a medical certificate for an unplanned absence?'
      },
      {
        id: 'c4',
        title: 'Board Admit Card Clearance',
        category: 'Exam Clearance',
        status: 'Clearance Granted',
        desc: 'You have cleared all preliminary attendance prerequisites for the upcoming Term 1 CBSE board exam.',
        actionText: 'Generate Clearance Slip',
        prompt: 'Generate an official attendance clearance certificate for Class 10 Term 1'
      }
    ]
  },

  radar: {
    title: 'Early Warning Academic & Attendance Radar',
    subtitle: 'Continuous diagnostic model detecting attendance dips and risk triggers before escalation',
    riskScore: 'Composite Risk Score',
    safeVerdict: 'Low Risk — Excellent Trajectory',
    moderateVerdict: 'Moderate Risk — Attendance Attention Required',
    highRiskVerdict: 'High Risk — CBSE Clearance Threatened',
    riskFactorsTitle: 'Diagnostic Risk Factors Evaluated',
    factors: [
      { label: 'Absence Clustering', impact: 'Low', desc: 'No consecutive Friday/Monday absence pattern detected.' },
      { label: 'Morning Punctuality', impact: 'Low', desc: '98% on-time check-in through RFID campus gates.' },
      { label: 'Lab Practical Attendance', impact: 'None', desc: '100% attendance in Physics and Optics practical labs.' }
    ],
    mitigateBtn: 'Generate Risk Mitigation Plan',
    consultationBtn: 'Request Teacher Consultation'
  },

  copilotActions: {
    title: 'Recommended AI Copilot Quick Actions',
    subtitle: '1-Click natural language triggers for automated analysis, reports, and communications',
    actions: [
      {
        id: 'a1',
        title: 'Attendance Forecast',
        desc: 'Predict final term attendance percentage based on upcoming schedule.',
        category: 'Analytics',
        prompt: 'Predict my final term attendance percentage based on my current rate of 91.3%'
      },
      {
        id: 'a2',
        title: 'Absence History Breakdown',
        desc: 'List exact dates and subjects where absence was recorded.',
        category: 'Audit',
        prompt: 'List all specific dates and subjects where I was marked absent this term'
      },
      {
        id: 'a3',
        title: 'CBSE Eligibility Check',
        desc: 'Confirm board exam clearance and required future presence days.',
        category: 'Compliance',
        prompt: 'Am I currently eligible for the CBSE Class 10 Board Examination under the 75% rule?'
      },
      {
        id: 'a4',
        title: 'Schedule Teacher Call',
        desc: 'Request academic or attendance discussion with class teacher.',
        category: 'Communication',
        prompt: 'Schedule a call with my class teacher Mrs. Sunita Rao regarding my academic progress'
      },
      {
        id: 'a5',
        title: 'Homework AI Solver',
        desc: 'Step-by-step hints and formulas for current assignments.',
        category: 'Study Aid',
        prompt: 'Explain the solution steps for Chapter 4 Quadratic Equations exercise 4.2'
      },
      {
        id: 'a6',
        title: 'Duty Leave Application',
        desc: 'Apply for official duty leave for upcoming sports or competition.',
        category: 'Leave Desk',
        prompt: 'Help me draft an application for duty leave for the Inter-School Science Exhibition'
      }
    ]
  },

  badges: {
    title: 'Academic Consistency & Attendance Streaks',
    subtitle: 'Recognition for continuous punctuality, diligence, and academic engagement',
    streakLevel: 'Level 3 — Diligent Scholar',
    badgesList: [
      { id: 'b1', title: '7-Day Streak Master', desc: 'Attended all periods consecutively for 7 school days.', tag: 'Active Streak' },
      { id: 'b2', title: 'Punctuality Ace', desc: 'Checked in before 08:25 AM for 15 consecutive days.', tag: 'Punctual' },
      { id: 'b3', title: '100% Math Attendance', desc: 'Never missed a single Mathematics period this term.', tag: 'Subject Pro' },
      { id: 'b4', title: 'Lab Explorer', desc: 'Full attendance across all Physics and Science practicals.', tag: 'Lab Pro' }
    ]
  },

  homework: {
    title: 'Homework & Assignment Worksheets Locker',
    subtitle: 'Class 10-A assignments, submission deadlines, and AI study tutor support',
    lockerBadge: 'Active Assignments',
    worksheets: [
      {
        id: 'hw1',
        title: 'Quadratic Equations Exercise 4.2',
        subject: 'Mathematics',
        dueDate: 'Due Tomorrow, 08:30 AM',
        status: 'In Progress',
        difficulty: 'Medium',
        questions: '10 Problems (Roots & Discriminants)',
        prompt: 'Give me hints to solve Quadratic Equations exercise 4.2 question 5 and 6'
      },
      {
        id: 'hw2',
        title: 'Optics Ray Diagrams Worksheet',
        subject: 'Physics',
        dueDate: 'Due Friday, 10:00 AM',
        status: 'Pending',
        difficulty: 'Hard',
        questions: '6 Diagrams (Concave & Convex Mirrors)',
        prompt: 'Explain the rules for drawing ray diagrams for a concave mirror with object at C'
      },
      {
        id: 'hw3',
        title: 'Federalism in India Essay',
        subject: 'Social Science',
        dueDate: 'Due Monday',
        status: 'Submitted',
        difficulty: 'Easy',
        questions: '500 Words Essay',
        prompt: 'Summarize key features of Indian Federalism for Class 10 Civics'
      },
      {
        id: 'hw4',
        title: 'Python Functions & Lists',
        subject: 'Computer Science',
        dueDate: 'Due Next Week',
        status: 'Pending',
        difficulty: 'Medium',
        questions: '4 Coding Exercises',
        prompt: 'Show Python code example for defining a function that calculates attendance average'
      }
    ],
    solveWithAi: 'Solve with AI Tutor'
  },

  parentPortal: {
    bannerTag: '02. Parent Repository / parent-portal',
    familyPortal: 'Family Portal',
    parentId: 'Parent ID',
    activeWards: 'Active Wards',
    requestTeacherCall: 'Request Teacher Call',
    askPathshalaAi: 'Ask Pathshala AI',
    selectWard: 'Select Student / Ward',
    roll: 'Roll',
    overallAttendance: 'Overall Attendance Status',
    attendanceHealthSafe: 'Safe Eligibility Buffer (+16.3% above minimum)',
    attendanceHealthRisk: 'Attention: Below 75% CBSE Minimum',
    presentDays: 'Present Days',
    absentDays: 'Unexcused Absences',
    medicalLeaves: 'Medical Leaves Approved',
    instantVoicePrompts: 'Instant Parent Voice Queries',
    subjectLedgerTitle: 'Subject-wise Attendance Breakdown',
    recentAttendanceTitle: 'Recent Attendance Audit Trail',
    modalTitle: 'Request Class Teacher Consultation',
    modalSubtitle: 'Schedule an official callback or meeting with your ward’s class teacher',
    studentLabel: 'Student / Ward',
    reasonLabel: 'Discussion Subject / Reason',
    reasonPlaceholder: 'e.g., Discuss recent absence due to viral fever and request extra math worksheets...',
    submitCallRequest: 'Submit Call Request',
    callSuccessMsg: 'Call request successfully logged with Class Teacher!'
  },

  managementPortal: {
    bannerTag: '03. Management Repository / management-portal',
    authorityBadge: 'Principal Executive Authority',
    roleLabel: 'Role: Management / Leadership',
    academicYear: 'ERP Academic Year: 2026–2027',
    generateAuditReport: 'Generate Audit Report',
    askPathshalaAi: 'Ask Pathshala AI',
    totalEnrolled: 'Total Enrolled',
    totalStudentsDesc: 'Students across 4 Divisions',
    academicCapacity: 'Academic Capacity: 96%',
    schoolAverage: 'School Average Attendance',
    cbseCompliant: 'CBSE Compliant Benchmark',
    targetBenchmark: 'Target Benchmark: 85%',
    criticalAttention: 'Critical Attention (<75%)',
    immediateAction: 'Immediate Action Mandated',
    criticalCountDesc: 'Students flagged for board risk',
    facultyPresent: 'Faculty Present Today',
    fullAttendance: '100% Teacher Attendance',
    zeroSubstitute: 'Zero Substitute Need',
    classBreakdownTitle: 'Class-wise Performance & Attendance Overview',
    classCol: 'Class & Section',
    enrolledCol: 'Enrolled',
    avgAttendanceCol: 'Avg Attendance',
    teacherCol: 'Class Teacher',
    statusCol: 'Status',
    criticalStudentsTitle: 'Students Flagged for Immediate Action (<75% Attendance)',
    searchCriticalPlaceholder: 'Search student by name, ID or class...',
    studentCol: 'Student Name',
    deficitCol: 'Deficit from 75%',
    guardianCol: 'Guardian Contact',
    callGuardianBtn: 'Call Guardian',
    sendWarningBtn: 'Send Notice',
    mgmtPromptsTitle: 'Executive AI Copilot Commands'
  },

  staffPortal: {
    bannerTag: '04. Staff Repository / staff-portal (Teacher)',
    classTeacherBadge: 'Class Teacher 10-A',
    teacherId: 'Teacher ID',
    department: 'Department: Mathematics',
    assignedClass: 'Assigned Class: Class 10-A (28 Students)',
    markAllPresent: 'Mark All Present',
    askPathshalaAi: 'Ask Pathshala AI',
    liveRegisterTitle: 'Live Attendance Register — Class 10-A',
    todayDate: "Today's Date",
    searchPlaceholder: 'Search student by roll or name...',
    rollCol: 'Roll No',
    studentCol: 'Student Name',
    historicalCol: 'Historical %',
    todayStatusCol: "Today's Status",
    summaryTitle: 'Class 10-A Real-time Attendance Summary',
    presentCount: 'Present',
    absentCount: 'Absent',
    lateCount: 'Late',
    attendanceRate: 'Daily Rate',
    teacherPromptsTitle: 'Teacher Voice Commands & Quick Actions'
  },

  copilots: {
    aiEngineBannerTag: '05. Pathshala AI Repository / core-ai',
    voiceAvatarOnline: 'Voice Avatar Online',
    aiEngineTitle: 'Pathshala AI — Human-Like Voice & Avatar Copilot',
    aiEngineSubtitle: 'Multi-Week Analytics • Early Warning Radar • Explain-Why Diagnostics • Zero-Trust RBAC',
    hideDashboard: 'Hide Dashboard',
    showDashboard: 'Show Dashboard',
    avatarMode: 'AI Avatar & Voice',
    chatMode: 'Chat View',
    chatViewTitle: 'Interactive Pathshala AI Chat',
    chatViewSubtitle: 'Ask any question about attendance, exams, homework, or school policies',
    typePlaceholder: 'Ask a question or type a command in your language...',
    sendBtn: 'Send',
    voiceBtn: 'Speak',
    thinking: 'Pathshala AI is thinking...',
    suggestedQuestions: 'Suggested Questions',
    clarificationHeader: 'Please select an option to clarify:'
  }
};

// -------------------------------------------------------------
// HINDI (हिन्दी)
// -------------------------------------------------------------
const HI: PortalTranslations = {
  term1: 'सत्र 1 (Term 1)',
  enrolledCourses: 'नामांकित विषय एवं ग्रेड',
  recentActivity: 'हालिया उपस्थिति गतिविधि',
  erpSynced: 'ERP समन्वित',
  date: 'दिनांक',
  status: 'स्थिति',
  markedBy: 'दर्जकर्ता',
  remarks: 'टिप्पणी',
  present: 'उपस्थित (Present)',
  absent: 'अनुपस्थित (Absent)',
  late: 'विलंब (Late)',
  grade: 'ग्रेड',
  active: 'सक्रिय',
  actions: 'कार्रवाई',
  search: 'खोजें',
  close: 'बंद करें',
  confirm: 'पुष्टि करें',
  cancel: 'रद्द करें',
  success: 'सफलता',

  noticeBoard: {
    title: 'आधिकारिक विद्यालय सूचना पट्ट',
    officeBadge: 'प्रधानाचार्य एवं परीक्षा कार्यालय',
    subtitle: 'सत्यापित परिपत्र, परीक्षा सारणी एवं विद्यार्थी सूचनाएं',
    aiSummarizeBtn: 'AI सभी सूचनाओं का सारांश दें',
    readCircular: 'पूरा परिपत्र पढ़ें',
    askCopilot: 'को-पायलट से पूछें',
    officialStamp: 'आधिकारिक • अनुमोदित',
    circularDetails: 'परिपत्र विवरण एवं अनुपालन',
    issuerPrefix: 'जारीकर्ता',
    validityPrefix: 'समय सारणी / दिनांक',
    notices: [
      {
        id: 'n1',
        category: 'परीक्षा परिपत्र',
        title: 'CBSE कक्षा 10 सत्र-1 परीक्षा सारणी एवं प्रवेश पत्र',
        date: '12 अक्टूबर – 26 अक्टूबर',
        issuer: 'परीक्षा नियंत्रक कार्यालय',
        summary: 'सैद्धांतिक परीक्षाएं सुबह ठीक 10:30 बजे प्रारंभ होंगी। प्रायोगिक परीक्षाएं 05 अक्टूबर तक संपन्न होंगी। कक्षा अध्यापक से प्रवेश पत्र प्राप्त करें।',
        stampText: 'आधिकारिक • अनुमोदित',
        actionPrompt: 'कक्षा 10 की CBSE सत्र-1 परीक्षा सारणी और मुख्य दिशा-निर्देशों का सारांश दें'
      },
      {
        id: 'n2',
        category: 'शैक्षणिक प्रतियोगिता',
        title: 'अंतर-विद्यालय AI एवं विज्ञान मॉडल प्रदर्शनी',
        date: 'शुक्रवार, दोपहर 3:00 बजे',
        issuer: 'अटल टिंकरिंग लैब एवं विज्ञान विभाग',
        summary: 'नवीकरणीय ऊर्जा, रोबोटिक्स और पायथन AI मॉडल का पंजीकरण गुरुवार शाम 4:00 बजे तक अनिवार्य है। विजेता राज्य स्तर पर चयनित होंगे।',
        stampText: 'पंजीकरण खुला है',
        actionPrompt: 'अंतर-विद्यालय विज्ञान एवं AI प्रदर्शनी के नियम और प्रोजेक्ट विचार क्या हैं?'
      },
      {
        id: 'n3',
        category: 'विद्यालय नीति',
        title: 'बोर्ड परीक्षा हेतु 75% अनिवार्य उपस्थिति का नियम',
        date: 'तत्काल प्रभाव से लागू',
        issuer: 'प्रधानाचार्य कार्यालय (डॉ. राजेश वर्मा)',
        summary: 'स्वीकृत चिकित्सकीय प्रमाण पत्र के बिना 75% से कम उपस्थिति वाले विद्यार्थियों को प्रायोगिक परीक्षा से रोका जा सकता है। उपस्थिति साप्ताहिक जांचें।',
        stampText: 'अनिवार्य अनुपालन',
        actionPrompt: 'आधिकारिक 75% उपस्थिति नियम और मेडिकल अवकाश प्रमाण पत्र जमा करने के नियम समझाएं'
      },
      {
        id: 'n4',
        category: 'खेलकूद एवं सह-पाठ्यक्रम',
        title: 'वार्षिक खेलकूद प्रतियोगिता एवं हाउस ट्रायल',
        date: 'आगामी शनिवार',
        issuer: 'शारीरिक शिक्षा विभाग',
        summary: 'टैगोर, रमन, शिवाजी और टेरेसा हाउस के धावक 100मी, 400मी रिले और लंबी कूद के लिए मुख्य स्टेडियम पहुंचें। ड्यूटी लीव मान्य होगी।',
        stampText: 'ड्यूटी लीव मान्य',
        actionPrompt: 'खेलकूद ट्रायल के दौरान उपस्थिति रजिस्टर में ड्यूटी लीव कैसे दर्ज होती है?'
      }
    ]
  },

  timetable: {
    title: 'दैनिक घंटी सारणी एवं समय-सारणी',
    classBadge: 'कक्षा 10-A',
    subtitle: 'कक्ष व प्रयोगशाला विवरण के साथ 45 मिनट के मानक शैक्षणिक कालांश',
    days: {
      Mon: 'सोम',
      Tue: 'मंगल',
      Wed: 'बुध',
      Thu: 'गुरु',
      Fri: 'शुक्र'
    },
    statusCompleted: 'संपन्न',
    statusCurrent: 'सक्रिय (वर्तमान)',
    statusUpcoming: 'आगामी',
    periods: [
      {
        id: 'p1',
        periodNum: 1,
        time: '08:30 – 09:15 AM',
        subject: 'गणित (Mathematics)',
        room: 'कक्ष 204',
        teacher: 'श्रीमती सुनीता राव',
        status: 'completed',
        notes: 'अध्ययन: द्विघात समीकरण प्रश्नावली 4.2'
      },
      {
        id: 'p2',
        periodNum: 2,
        time: '09:20 – 10:05 AM',
        subject: 'भौतिकी एवं प्रकाशिकी लैब',
        room: 'विज्ञान ब्लॉक लैब 1',
        teacher: 'श्री अरविंद सक्सेना',
        status: 'current',
        notes: 'सक्रिय: अवतल दर्पण किरण आरेख'
      },
      {
        id: 'p3',
        periodNum: 3,
        time: '10:35 – 11:20 AM',
        subject: 'कंप्यूटर साइंस (Computer Science)',
        room: 'आईटी लैब 2',
        teacher: 'श्री डेविड मिलर',
        status: 'upcoming',
        notes: 'विषय: पायथन फंक्शन्स एवं एरे'
      },
      {
        id: 'p4',
        periodNum: 4,
        time: '11:25 – 12:10 PM',
        subject: 'अंग्रेजी साहित्य (English)',
        room: 'कक्ष 108',
        teacher: 'सुश्री क्लारा डिसूजा',
        status: 'upcoming',
        notes: 'पाठ: मर्चेंट ऑफ वेनिस अंक 3'
      },
      {
        id: 'p5',
        periodNum: 5,
        time: '12:15 – 01:00 PM',
        subject: 'सामाजिक विज्ञान व नागरिक शास्त्र',
        room: 'कक्ष 204',
        teacher: 'श्रीमती गीता पटेल',
        status: 'upcoming',
        notes: 'विषय: भारतीय लोकतंत्र में संघवाद'
      }
    ],
    askPeriodAi: 'इस कालांश के बारे में AI से पूछें'
  },

  blackboard: {
    title: 'इंटरैक्टिव कक्षा श्यामपट्ट (Blackboard) एवं AI लेखक',
    subtitle: 'वास्तविक समय में चॉक द्वारा सूत्र, आरेख व अवधारणाओं का प्रदर्शन',
    chalkDraw: 'स्लेट पर हाथ से लिखें',
    chalkErase: 'डस्टर / पट्ट साफ़ करें',
    clearSlate: 'पूरी स्लेट मिटाएं',
    playAnimation: 'स्वचालित चॉक लेखन चलाएं',
    pauseAnimation: 'एनीमेशन रोकें',
    askExplain: 'AI से श्यामपट्ट पाठ समझाने को कहें',
    lessons: [
      {
        id: 'math',
        tabTitle: 'गणित',
        title: 'गणित: पाइथागोरस प्रमेय एवं त्रिकोणमिति',
        subtitle: 'कक्षा 10 CBSE अध्याय 8',
        lines: [
          { text: 'समकोण त्रिभुज △ABC में (∠B = 90°):', color: 'chalk-yellow', indent: 0 },
          { text: 'कर्ण² (AC²) = लम्ब² (AB²) + आधार² (BC²)', color: 'chalk-text', indent: 1 },
          { text: 'sin²(θ) + cos²(θ) = 1', color: 'chalk-cyan', indent: 1 },
          { text: 'tan(θ) = sin(θ) / cos(θ) = लम्ब / आधार', color: 'chalk-pink', indent: 1 },
          { text: '★ परीक्षा टिप: 0°, 30°, 45°, 60°, 90° के मान कंठस्थ करें', color: 'chalk-yellow', indent: 0 }
        ],
        doodle: 'triangle'
      },
      {
        id: 'physics',
        tabTitle: 'भौतिकी',
        title: 'भौतिकी: गति के नियम एवं ऊर्जा संरक्षण',
        subtitle: 'न्यूटन के नियम एवं गतिज ऊर्जा',
        lines: [
          { text: 'न्यूटन का गति का द्वितीय नियम:', color: 'chalk-yellow', indent: 0 },
          { text: 'F = m · a = d(mv)/dt  (बल = द्रव्यमान × त्वरण)', color: 'chalk-cyan', indent: 1 },
          { text: 'गतिज ऊर्जा (K.E.) = ½ m v²', color: 'chalk-text', indent: 1 },
          { text: 'स्थितिज ऊर्जा (P.E.) = m · g · h', color: 'chalk-text', indent: 1 },
          { text: 'कुल यांत्रिक ऊर्जा E = K.E. + P.E. = नियतांक (Constant)', color: 'chalk-pink', indent: 0 }
        ],
        doodle: 'graph'
      },
      {
        id: 'attendance',
        tabTitle: 'उपस्थिति मॉडल',
        title: 'पाठशाला AI: उपस्थिति प्रायिकता मॉडल',
        subtitle: 'लाइव CBSE 75% जोखिम विश्लेषण',
        lines: [
          { text: 'वर्तमान स्थिति: 23 में से 21 दिन उपस्थित = 91.3%', color: 'chalk-cyan', indent: 0 },
          { text: 'लक्ष्य सीमा: परीक्षा पात्रता ≥ 75.0%', color: 'chalk-yellow', indent: 1 },
          { text: 'सुरक्षित अंतर (Buffer): न्यूनतम से +16.3% अधिक', color: 'chalk-text', indent: 1 },
          { text: 'सुरक्षित अवकाश सीमा: भविष्य में 4 कक्षाएं तक', color: 'chalk-pink', indent: 1 },
          { text: 'को-पायलट निर्णय: बोर्ड परीक्षा प्रवेश पत्र हेतु पूर्णतः सुरक्षित ✓', color: 'chalk-yellow', indent: 0 }
        ],
        doodle: 'badge'
      },
      {
        id: 'sanskrit',
        tabTitle: 'वैदिक सुविचार',
        title: 'वैदिक सूक्ति: विद्या ददाति विनयं',
        subtitle: 'पाठशाला आज का विचार',
        lines: [
          { text: 'विद्या ददाति विनयं, विनयाद्याति पात्रताम् ।', color: 'chalk-yellow', indent: 0 },
          { text: 'पात्रत्वाद्धनमाप्नोति, धनाद्धर्मं ततः सुखम् ॥', color: 'chalk-text', indent: 0 },
          { text: 'अर्थ: विद्या से विनम्रता, विनम्रता से योग्यता,', color: 'chalk-cyan', indent: 1 },
          { text: 'योग्यता से धन, और धर्मयुक्त धन से सुख मिलता है।', color: 'chalk-pink', indent: 1 }
        ],
        doodle: 'lotus'
      }
    ]
  },

  notebook: {
    title: 'स्मार्ट रूल्ड नोटबुक एवं फाउंटेन पेन',
    subtitle: 'कक्षा 10-A अध्ययन डायरी एवं गृहकार्य ट्रैकर',
    studyJournal: 'अध्ययन नोट्स एवं डायरी',
    taskChecklist: 'अध्ययन कार्य एवं चेकलिस्ट',
    addNotePlaceholder: 'एनिमेटेड पेन से तुरंत कोई सूत्र या महत्वपूर्ण बिंदु लिखें...',
    aiScribeBtn: 'पेन से जोड़ें',
    explainWithAi: 'AI से नोट समझें',
    tasks: [
      { id: 't1', text: 'द्विघात समीकरण प्रश्नावली 4.2 (प्रश्न 1 से 10) हल करें' },
      { id: 't2', text: 'भौतिकी जर्नल में अवतल दर्पण के किरण आरेख बनाएं' },
      { id: 't3', text: 'रसायन विज्ञान आवर्त सारणी के फ्लैशकार्ड तैयार करें' },
      { id: 't4', text: 'कक्षा अध्यापिका श्रीमती राव से उपस्थिति रजिस्टर सत्यापित कराएं' }
    ],
    notes: [
      {
        id: '1',
        title: 'अध्याय 4: द्विघात समीकरण एवं मूल',
        category: 'गणित',
        date: 'आज, 10:30 AM',
        bullets: [
          'मानक रूप: ax² + bx + c = 0 (जहाँ a ≠ 0)',
          'विविक्तकर (Discriminant) D = b² - 4ac मूलों की प्रकृति तय करता है:',
          '  • यदि D > 0 ➔ 2 भिन्न वास्तविक मूल: x = (-b ± √D) / 2a',
          '  • यदि D = 0 ➔ 2 समान वास्तविक मूल: x = -b / 2a',
          '  • यदि D < 0 ➔ कोई वास्तविक मूल नहीं',
          'CBSE महत्वपूर्ण प्रश्न: रेलगाड़ी की चाल और नल टंकी वाले प्रश्न।'
        ],
        stickyTip: '★ टिप: सबसे पहले देखें कि क्या गुणांक "a" को सरल किया जा सकता है!'
      },
      {
        id: '2',
        title: 'प्रकाश: परावर्तन एवं गोलीय दर्पण',
        category: 'भौतिकी',
        date: 'कल',
        bullets: [
          'दर्पण सूत्र: 1/f = 1/v + 1/u',
          'आवर्धन: m = -v/u = h₂/h₁',
          'अवतल दर्पण: वास्तविक व उल्टा (P और F के बीच होने पर आभासी व सीधा)।',
          'उत्तल दर्पण: सदैव आभासी, सीधा व छोटा (वाहनों के रियर-व्यू मिरर में)।'
        ],
        stickyTip: '★ चिन्ह परिपाटी: आपतित किरण की दिशा में नापी गई दूरियां धनात्मक होती हैं।'
      },
      {
        id: '3',
        title: 'CBSE 75% उपस्थिति स्वर्णिम नियम',
        category: 'उपस्थिति रणनीति',
        date: 'सत्र 1 रणनीति',
        bullets: [
          'वर्तमान उपस्थिति: 91.3% (कुल 23 में से 21 दिन)',
          'सत्र का लक्ष्य: प्रैक्टिकल छूट हेतु न्यूनतम 80% बनाए रखें।',
          'चिकित्सा अवकाश: स्कूल आने के 48 घंटे के भीतर डॉक्टर पर्ची जमा करें।',
          'को-पायलट सलाह: राहुल 4 नियोजित छुट्टियां सुरक्षित रूप से ले सकते हैं।'
        ],
        stickyTip: '★ सूचना: 25 तारीख को स्पोर्ट्स मीट के लिए ड्यूटी लीव मिलेगी!'
      }
    ]
  },

  attendanceChart: {
    title: 'बहु-सप्ताहिक उपस्थिति विश्लेषण (Analytics)',
    subtitle: 'सत्र निरंतरता ट्रैक करें, CBSE 75% न्यूनतम सीमा जांचें व AI पूर्वानुमान देखें',
    timeframes: {
      weekly: 'साप्ताहिक',
      monthly: 'मासिक',
      semester: 'सत्र (Semester)'
    },
    mandatoryThreshold: '75% अनिवार्य बोर्ड न्यूनतम सीमा',
    weeklyLabels: ['सप्ताह 1', 'सप्ताह 2', 'सप्ताह 3', 'सप्ताह 4'],
    monthlyLabels: ['अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर'],
    semesterLabels: ['सत्र 1 आधार रेखा', 'मध्य-सत्र वर्तमान'],
    statuses: {
      full: 'पूर्ण उपस्थिति',
      lateArrival: '1 विलंब आगमन',
      unexcused: '1 अनाधिकृत अनुपस्थिति',
      illness: '1 बीमारी अवकाश',
      exemplary: 'उत्कृष्ट',
      good: 'अच्छा',
      stable: 'स्थिर',
      declineFlagged: 'गिरावट दर्ज',
      distinction: 'विशिष्टता',
      attentionRequired: 'ध्यान देने योग्य'
    },
    aiOptimizationBtn: 'AI सुझाव: 85% उपस्थिति बनाए रखने का तरीका पूछें'
  },

  aiInsights: {
    title: 'पाठशाला AI बुद्धिमत्ता एवं नैदानिक अंतर्दृष्टि',
    subtitle: 'वास्तविक समय पूर्वानुमान एवं CBSE अनुपालन अंतर्दृष्टि',
    aiBadge: 'स्वायत्त नैदानिक इंजन',
    cards: [
      {
        id: 'c1',
        title: 'उपस्थिति प्रक्षेपवक्र विश्लेषण',
        category: 'पूर्वानुमान उपस्थिति',
        status: 'सुरक्षित बफर (+16.3%)',
        desc: 'पिछले 23 सत्रों के आधार पर आपकी उपस्थिति 75% CBSE सीमा से काफी ऊपर है।',
        actionText: 'अनुपस्थिति प्रभाव अनुकरण करें',
        prompt: 'यदि मैं अगले सप्ताह 3 कक्षाएं छोड़ दूं तो मेरी परीक्षा पात्रता पर क्या प्रभाव पड़ेगा?'
      },
      {
        id: 'c2',
        title: 'विषय प्रदर्शन सहसंबंध',
        category: 'शैक्षणिक सहसंबंध',
        status: 'उच्च सहसंबंध',
        desc: 'गणित में 92% उपस्थिति सीधे यूनिट टेस्ट 1 में ग्रेड A से जुड़ी हुई है।',
        actionText: 'ग्रेड सहसंबंध देखें',
        prompt: 'सभी विषयों में मेरी उपस्थिति और टेस्ट अंकों के बीच सहसंबंध दिखाएं'
      },
      {
        id: 'c3',
        title: 'मेडिकल लीव सत्यापन',
        category: 'ERP दस्तावेज़ पटल',
        status: '1 स्वीकृत अवकाश',
        desc: '18 सितंबर का मेडिकल अवकाश कक्षा अध्यापिका श्रीमती सुनीता राव द्वारा सत्यापित किया गया।',
        actionText: 'मेडिकल पर्ची जमा करें',
        prompt: 'अचानक हुई अनुपस्थिति के लिए मेडिकल सर्टिफिकेट कैसे जमा करें?'
      },
      {
        id: 'c4',
        title: 'बोर्ड प्रवेश पत्र स्वीकृति',
        category: 'परीक्षा स्वीकृति',
        status: 'स्वीकृति प्राप्त',
        desc: 'आपने आगामी सत्र 1 CBSE बोर्ड परीक्षा के सभी उपस्थिति मापदंड पूरे कर लिए हैं।',
        actionText: 'स्वीकृति पर्ची डाउनलोड करें',
        prompt: 'कक्षा 10 सत्र 1 के लिए आधिकारिक उपस्थिति क्लीयरेंस सर्टिफिकेट जनरेट करें'
      }
    ]
  },

  radar: {
    title: 'प्रारंभिक चेतावनी शैक्षणिक एवं उपस्थिति रडार',
    subtitle: 'गिरावट और जोखिम कारकों का तुरंत पता लगाने वाला सतत नैदानिक मॉडल',
    riskScore: 'समग्र जोखिम स्कोर',
    safeVerdict: 'निम्न जोखिम — उत्कृष्ट प्रक्षेपवक्र',
    moderateVerdict: 'मध्यम जोखिम — उपस्थिति पर ध्यान देने की आवश्यकता',
    highRiskVerdict: 'उच्च जोखिम — बोर्ड परीक्षा पात्रता खतरे में',
    riskFactorsTitle: 'मूल्यांकित नैदानिक जोखिम कारक',
    factors: [
      { label: 'अनुपस्थिति समूह', impact: 'निम्न', desc: 'लगातार शुक्रवार या सोमवार को अनुपस्थिति का कोई पैटर्न नहीं मिला।' },
      { label: 'प्रातः समयबद्धता', impact: 'निम्न', desc: 'RFID गेट से 98% समय पर प्रवेश दर्ज।' },
      { label: 'लैब प्रैक्टिकल उपस्थिति', impact: 'शून्य', desc: 'भौतिकी व प्रकाशिकी प्रैक्टिकल में 100% उपस्थिति।' }
    ],
    mitigateBtn: 'जोखिम निवारण योजना बनाएं',
    consultationBtn: 'शिक्षक परामर्श का अनुरोध करें'
  },

  copilotActions: {
    title: 'सुझाए गए AI को-पायलट त्वरित कार्य',
    subtitle: 'स्वचालित विश्लेषण, रिपोर्ट और संचार के लिए 1-क्लिक प्रॉम्प्ट्स',
    actions: [
      {
        id: 'a1',
        title: 'उपस्थिति पूर्वानुमान',
        desc: 'आगामी समय-सारणी के आधार पर अंतिम सत्र उपस्थिति का अनुमान लगाएं।',
        category: 'विश्लेषण',
        prompt: 'मेरी वर्तमान 91.3% दर के आधार पर अंतिम सत्र उपस्थिति का पूर्वानुमान लगाएं'
      },
      {
        id: 'a2',
        title: 'अनुपस्थिति इतिहास विवरण',
        desc: 'उन सभी तिथियों और विषयों की सूची जहां अनुपस्थिति दर्ज की गई।',
        category: 'ऑडिट',
        prompt: 'उन सभी विशिष्ट तिथियों और विषयों की सूची बनाएं जहां मैं अनुपस्थित था'
      },
      {
        id: 'a3',
        title: 'CBSE पात्रता जांच',
        desc: '75% नियम के तहत बोर्ड परीक्षा पात्रता की पुष्टि करें।',
        category: 'अनुपालन',
        prompt: 'क्या मैं 75% नियम के तहत CBSE कक्षा 10 बोर्ड परीक्षा के लिए पात्र हूं?'
      },
      {
        id: 'a4',
        title: 'शिक्षक कॉल का अनुरोध',
        desc: 'कक्षा अध्यापिका के साथ शैक्षणिक या उपस्थिति पर चर्चा का अनुरोध करें।',
        category: 'संचार',
        prompt: 'मेरी कक्षा अध्यापिका श्रीमती सुनीता राव के साथ शैक्षणिक प्रगति पर बात करने का समय तय करें'
      },
      {
        id: 'a5',
        title: 'गृहकार्य AI सहायक',
        desc: 'वर्तमान असाइनमेंट के लिए चरण-दर-चरण संकेत और सूत्र।',
        category: 'अध्ययन सहायता',
        prompt: 'अध्याय 4 द्विघात समीकरण प्रश्नावली 4.2 के प्रश्नों के हल के संकेत दें'
      },
      {
        id: 'a6',
        title: 'ड्यूटी लीव आवेदन',
        desc: 'खेलकूद या प्रतियोगिता के लिए आधिकारिक ड्यूटी लीव का आवेदन तैयार करें।',
        category: 'अवकाश पटल',
        prompt: 'अंतर-विद्यालय विज्ञान प्रदर्शनी के लिए ड्यूटी लीव का आवेदन पत्र तैयार करने में मदद करें'
      }
    ]
  },

  badges: {
    title: 'शैक्षणिक निरंतरता एवं उपस्थिति बैज',
    subtitle: 'निरंतर समयबद्धता, परिश्रम और शैक्षणिक जुड़ाव के लिए सम्मान',
    streakLevel: 'स्तर 3 — कर्मठ अध्येता',
    badgesList: [
      { id: 'b1', title: '7-दिवसीय स्ट्रीक मास्टर', desc: 'लगातार 7 कार्यदिवस सभी कालांशों में उपस्थित रहे।', tag: 'सक्रिय स्ट्रीक' },
      { id: 'b2', title: 'समयबद्धता शिरोमणि', desc: 'लगातार 15 दिनों तक सुबह 08:25 से पहले उपस्थित हुए।', tag: 'समयनिष्ठ' },
      { id: 'b3', title: '100% गणित उपस्थिति', desc: 'इस सत्र गणित का एक भी कालांश नहीं छोड़ा।', tag: 'विषय महारत' },
      { id: 'b4', title: 'लैब अन्वेषक', desc: 'भौतिकी और विज्ञान के सभी प्रैक्टिकल में पूर्ण उपस्थिति।', tag: 'लैब प्रो' }
    ]
  },

  homework: {
    title: 'गृहकार्य एवं कार्यपत्रिका (Worksheet) लॉकर',
    subtitle: 'कक्षा 10-A असाइनमेंट, जमा करने की अंतिम तिथि एवं AI ट्यूटर सहायता',
    lockerBadge: 'सक्रिय गृहकार्य',
    worksheets: [
      {
        id: 'hw1',
        title: 'द्विघात समीकरण प्रश्नावली 4.2',
        subject: 'गणित',
        dueDate: 'कल सुबह 08:30 बजे तक',
        status: 'प्रगति पर',
        difficulty: 'मध्यम',
        questions: '10 प्रश्न (मूल एवं विविक्तकर)',
        prompt: 'द्विघात समीकरण प्रश्नावली 4.2 के प्रश्न 5 और 6 हल करने के लिए संकेत दें'
      },
      {
        id: 'hw2',
        title: 'प्रकाशिकी किरण आरेख वर्कशीट',
        subject: 'भौतिकी',
        dueDate: 'शुक्रवार सुबह 10:00 बजे तक',
        status: 'लंबित',
        difficulty: 'कठिन',
        questions: '6 आरेख (अवतल व उत्तल दर्पण)',
        prompt: 'वक्रता केंद्र C पर रखी वस्तु के लिए अवतल दर्पण किरण आरेख बनाने के नियम समझाएं'
      },
      {
        id: 'hw3',
        title: 'भारत में संघवाद पर निबंध',
        subject: 'सामाजिक विज्ञान',
        dueDate: 'सोमवार तक',
        status: 'जमा किया गया',
        difficulty: 'सरल',
        questions: '500 शब्दों का निबंध',
        prompt: 'कक्षा 10 नागरिक शास्त्र के लिए भारतीय संघवाद की प्रमुख विशेषताओं का सारांश दें'
      },
      {
        id: 'hw4',
        title: 'पायथन फंक्शन्स एवं लिस्ट्स',
        subject: 'कंप्यूटर साइंस',
        dueDate: 'अगले सप्ताह तक',
        status: 'लंबित',
        difficulty: 'मध्यम',
        questions: '4 कोडिंग अभ्यास',
        prompt: 'उपस्थिति का औसत निकालने वाले पायथन फ़ंक्शन का कोड उदाहरण दिखाएं'
      }
    ],
    solveWithAi: 'AI ट्यूटर के साथ हल करें'
  },

  parentPortal: {
    bannerTag: '02. अभिभावक रिपोजिटरी / parent-portal',
    familyPortal: 'अभिभावक परिवार पोर्टल',
    parentId: 'अभिभावक आईडी',
    activeWards: 'नामांकित बच्चे',
    requestTeacherCall: 'शिक्षक से बातचीत का अनुरोध',
    askPathshalaAi: 'पाठशाला AI से पूछें',
    selectWard: 'विद्यार्थी / बच्चा चुनें',
    roll: 'अनुक्रमांक (Roll)',
    overallAttendance: 'कुल उपस्थिति स्थिति',
    attendanceHealthSafe: 'सुरक्षित पात्रता बफर (न्यूनतम से +16.3% अधिक)',
    attendanceHealthRisk: 'सावधान: CBSE 75% न्यूनतम सीमा से कम',
    presentDays: 'उपस्थित दिन',
    absentDays: 'अनाधिकृत अनुपस्थिति',
    medicalLeaves: 'स्वीकृत चिकित्सकीय अवकाश',
    instantVoicePrompts: 'अभिभावक त्वरित वॉइस प्रश्न',
    subjectLedgerTitle: 'विषयवार उपस्थिति विवरण',
    recentAttendanceTitle: 'हालिया उपस्थिति ऑडिट ट्रेल',
    modalTitle: 'कक्षा अध्यापिका से परामर्श का अनुरोध',
    modalSubtitle: 'अपने बच्चे के अध्यापक के साथ आधिकारिक बैठक या फोन कॉल का समय तय करें',
    studentLabel: 'विद्यार्थी / बच्चा',
    reasonLabel: 'बातचीत का विषय / कारण',
    reasonPlaceholder: 'उदा. बुखार के कारण छूटे पाठ व अतिरिक्त गणित वर्कशीट हेतु चर्चा...',
    submitCallRequest: 'कॉल अनुरोध जमा करें',
    callSuccessMsg: 'शिक्षक के पास कॉल अनुरोध सफलतापूर्वक दर्ज हो गया है!'
  },

  managementPortal: {
    bannerTag: '03. प्रबंधन रिपोजिटरी / management-portal',
    authorityBadge: 'प्रधानाचार्य कार्यकारी अधिकार',
    roleLabel: 'भूमिका: प्रबंधन / नेतृत्व',
    academicYear: 'ERP शैक्षणिक वर्ष: 2026–2027',
    generateAuditReport: 'ऑडिट रिपोर्ट तैयार करें',
    askPathshalaAi: 'पाठशाला AI से पूछें',
    totalEnrolled: 'कुल नामांकित विद्यार्थी',
    totalStudentsDesc: '4 वर्गों में कुल विद्यार्थी',
    academicCapacity: 'शैक्षणिक क्षमता: 96%',
    schoolAverage: 'विद्यालय औसत उपस्थिति',
    cbseCompliant: 'CBSE अनुपालन मानक',
    targetBenchmark: 'लक्ष्य मानक: 85%',
    criticalAttention: 'गंभीर चिंता (<75%)',
    immediateAction: 'तत्काल कार्रवाई आवश्यक',
    criticalCountDesc: 'बोर्ड जोखिम वाले विद्यार्थी',
    facultyPresent: 'आज उपस्थित शिक्षक',
    fullAttendance: '100% शिक्षक उपस्थिति',
    zeroSubstitute: 'प्रतिस्थानी की आवश्यकता नहीं',
    classBreakdownTitle: 'कक्षावार प्रदर्शन एवं उपस्थिति अवलोकन',
    classCol: 'कक्षा व वर्ग',
    enrolledCol: 'नामांकित',
    avgAttendanceCol: 'औसत उपस्थिति',
    teacherCol: 'कक्षा अध्यापक',
    statusCol: 'स्थिति',
    criticalStudentsTitle: 'तत्काल कार्रवाई हेतु चिह्नित विद्यार्थी (<75% उपस्थिति)',
    searchCriticalPlaceholder: 'नाम, आईडी या कक्षा द्वारा खोजें...',
    studentCol: 'विद्यार्थी का नाम',
    deficitCol: '75% से कमी',
    guardianCol: 'अभिभावक संपर्क',
    callGuardianBtn: 'अभिभावक को कॉल करें',
    sendWarningBtn: 'चेतावनी नोटिस भेजें',
    mgmtPromptsTitle: 'कार्यकारी AI को-पायलट कमांड्स'
  },

  staffPortal: {
    bannerTag: '04. शिक्षक रिपोजिटरी / staff-portal (Teacher)',
    classTeacherBadge: 'कक्षा अध्यापिका 10-A',
    teacherId: 'शिक्षक आईडी',
    department: 'विभाग: गणित',
    assignedClass: 'आवंटित कक्षा: कक्षा 10-A (28 विद्यार्थी)',
    markAllPresent: 'सभी को उपस्थित लगाएं',
    askPathshalaAi: 'पाठशाला AI से पूछें',
    liveRegisterTitle: 'लाइव उपस्थिति रजिस्टर — कक्षा 10-A',
    todayDate: 'आज की तिथि',
    searchPlaceholder: 'अनुक्रमांक या नाम से खोजें...',
    rollCol: 'रोल नं.',
    studentCol: 'विद्यार्थी का नाम',
    historicalCol: 'पिछली %',
    todayStatusCol: 'आज की स्थिति',
    summaryTitle: 'कक्षा 10-A वास्तविक समय उपस्थिति सारांश',
    presentCount: 'उपस्थित',
    absentCount: 'अनुपस्थित',
    lateCount: 'विलंब',
    attendanceRate: 'दैनिक दर',
    teacherPromptsTitle: 'शिक्षक वॉइस कमांड्स एवं त्वरित कार्य'
  },

  copilots: {
    aiEngineBannerTag: '05. पाठशाला AI रिपोजिटरी / core-ai',
    voiceAvatarOnline: 'वॉयस अवतार ऑनलाइन',
    aiEngineTitle: 'पाठशाला AI — मानवीय आवाज़ एवं अवतार को-पायलट',
    aiEngineSubtitle: 'बहु-सप्ताहिक विश्लेषण • प्रारंभिक चेतावनी रडार • नैदानिक स्पष्टीकरण • शून्य-विश्वास RBAC',
    hideDashboard: 'डैशबोर्ड छुपाएं',
    showDashboard: 'डैशबोर्ड दिखाएं',
    avatarMode: 'AI अवतार एवं आवाज़',
    chatMode: 'चैट दृश्य (Chat View)',
    chatViewTitle: 'इंटरैक्टिव पाठशाला AI चैट',
    chatViewSubtitle: 'उपस्थिति, परीक्षा, गृहकार्य या नीतियों पर कोई भी प्रश्न पूछें',
    typePlaceholder: 'अपनी भाषा में कोई प्रश्न पूछें या कमांड लिखें...',
    sendBtn: 'भेजें',
    voiceBtn: 'बोलें',
    thinking: 'पाठशाला AI सोच रहा है...',
    suggestedQuestions: 'सुझाए गए प्रश्न',
    clarificationHeader: 'कृपया स्पष्ट करने के लिए एक विकल्प चुनें:'
  }
};

// Helper function to build fallback localized variants for other 9 languages
function buildLanguageTranslations(baseLangName: string): PortalTranslations {
  // Return HI for Hindi, EN for English, and customized rich native translations for the others
  if (baseLangName === 'Hindi') return HI;
  if (baseLangName === 'English') return EN;

  // Let's create high quality localized dictionaries for the other 9 Indian languages
  const overrides: Record<string, Partial<PortalTranslations>> = {
    Tamil: {
      term1: 'பருவம் 1 (Term 1)',
      enrolledCourses: 'பதிவு செய்யப்பட்ட பாடங்கள் & தரங்கள்',
      recentActivity: 'சமீபத்திய வருகை பதிவு',
      present: 'வருகை (Present)',
      absent: 'வரவில்லை (Absent)',
      late: 'தாமதம் (Late)',
      date: 'தேதி',
      status: 'நிலை',
      search: 'தேடுக',
      close: 'மூடு',
      actions: 'செயல்கள்',
      grade: 'தரம்',
      parentPortal: {
        ...EN.parentPortal,
        bannerTag: '02. பெற்றோர் களஞ்சியம் / parent-portal',
        familyPortal: 'குடும்ப போர்ட்டல்',
        parentId: 'பெற்றோர் ஐடி',
        activeWards: 'மாணவர்கள்',
        requestTeacherCall: 'ஆசிரியரை அழைக்க கோரிக்கை',
        askPathshalaAi: 'பாடசாலா AI-யிடம் கேட்க',
        selectWard: 'மாணவரைத் தேர்ந்தெடுக்கவும்',
        overallAttendance: 'மொத்த வருகை நிலை',
        attendanceHealthSafe: 'பாதுகாப்பான நிலை (+16.3% அதிகம்)',
        submitCallRequest: 'அழைப்பு கோரிக்கையைச் சமர்ப்பிக்கவும்'
      },
      managementPortal: {
        ...EN.managementPortal,
        bannerTag: '03. மேலாண்மை களஞ்சியம் / management-portal',
        authorityBadge: 'முதல்வர் நிர்வாக அதிகாரம்',
        totalEnrolled: 'மொத்த மாணவர்கள்',
        schoolAverage: 'பள்ளி சராசரி வருகை',
        criticalAttention: 'கவனம் தேவை (<75%)',
        facultyPresent: 'ஆசிரியர்கள் வருகை',
        generateAuditReport: 'தணிக்கை அறிக்கை',
        askPathshalaAi: 'பாடசாலா AI'
      },
      staffPortal: {
        ...EN.staffPortal,
        bannerTag: '04. ஆசிரியர் களஞ்சியம் / staff-portal',
        classTeacherBadge: 'வகுப்பு ஆசிரியர் 10-A',
        markAllPresent: 'அனைவருக்கும் வருகை பதிவு செய்',
        liveRegisterTitle: 'நேரடி வருகை பதிவேடு — வகுப்பு 10-A',
        askPathshalaAi: 'பாடசாலா AI'
      },
      timetable: {
        ...EN.timetable,
        title: 'தினசரி மணி அட்டவணை & கால அட்டவணை',
        classBadge: 'வகுப்பு 10-A',
        statusCompleted: 'முடிந்தது',
        statusCurrent: 'தற்போது நடைபெறுகிறது',
        statusUpcoming: 'அடுத்து வருவது'
      },
      noticeBoard: {
        ...EN.noticeBoard,
        title: 'அதிகாரப்பூர்வ பள்ளி அறிவிப்பு பலகை',
        officeBadge: 'முதல்வர் & தேர்வு அலுவலகம்',
        aiSummarizeBtn: 'AI சுருக்கம் பார்க்க'
      },
      blackboard: {
        ...EN.blackboard,
        title: 'வகுப்பறை கரும்பலகை (Blackboard) & AI எழுத்தர்',
        chalkDraw: 'கையால் எழுத',
        chalkErase: 'அழிக்க',
        askExplain: 'AI பாடம் விளக்க கேட்க'
      },
      notebook: {
        ...EN.notebook,
        title: 'ஸ்மார்ட் நோட்புக் & ஃபவுண்டன் பேனா',
        aiScribeBtn: 'பேனாவால் சேர்க்க'
      },
      attendanceChart: {
        ...EN.attendanceChart,
        title: 'பல வார வருகை பகுப்பாய்வு (Analytics)',
        mandatoryThreshold: '75% கட்டாய குறைந்தபட்ச வருகை'
      },
      copilots: {
        ...EN.copilots,
        aiEngineTitle: 'பாடசாலா AI — குரல் & அவதார் வழிகாட்டி',
        avatarMode: 'AI அவதார் & குரல்',
        chatMode: 'அரட்டை (Chat)',
        typePlaceholder: 'உங்கள் மொழியில் கேள்வி கேட்கவும்...',
        sendBtn: 'அனுப்பு',
        thinking: 'பாடசாலா AI சிந்திக்கிறது...'
      }
    },
    Telugu: {
      term1: 'టర్మ్ 1 (Term 1)',
      enrolledCourses: 'నమోదైన సబ్జెక్టులు & గ్రేడ్‌లు',
      recentActivity: 'ఇటీవలి హాజరు కార్యకలాపం',
      present: 'హాజరు (Present)',
      absent: 'గైర్హాజరు (Absent)',
      late: 'ఆలస్యం (Late)',
      date: 'తేదీ',
      status: 'స్థితి',
      search: 'వెతకండి',
      close: 'మూసివేయి',
      parentPortal: {
        ...EN.parentPortal,
        bannerTag: '02. తల్లిదండ్రుల పోర్టల్ / parent-portal',
        familyPortal: 'ఫ్యామిలీ పోర్టల్',
        requestTeacherCall: 'ఉపాధ్యాయుని కాల్ అభ్యర్థన',
        askPathshalaAi: 'పాఠశాల AIని అడగండి',
        selectWard: 'విద్యార్థిని ఎంచుకోండి',
        overallAttendance: 'మొత్తం హాజరు స్థితి'
      },
      managementPortal: {
        ...EN.managementPortal,
        bannerTag: '03. మేనేజ్‌మెంట్ పోర్టల్ / management-portal',
        authorityBadge: 'ప్రిన్సిపాల్ ఎగ్జిక్యూటివ్ అధికారం',
        totalEnrolled: 'మొత్తం విద్యార్థులు',
        schoolAverage: 'పాఠశాల సగటు హాజరు',
        criticalAttention: 'శ్రద్ధ అవసరం (<75%)',
        facultyPresent: 'ఉపాధ్యాయుల హాజరు'
      },
      staffPortal: {
        ...EN.staffPortal,
        bannerTag: '04. ఉపాధ్యాయుల పోర్టల్ / staff-portal',
        classTeacherBadge: 'తరగతి ఉపాధ్యాయురాలు 10-A',
        markAllPresent: 'అందరికీ హాజరు వేయండి',
        liveRegisterTitle: 'ప్రత్యక్ష హాజరు రిజిస్టర్ — క్లాస్ 10-A'
      },
      timetable: {
        ...EN.timetable,
        title: 'రోజువారీ గంట షెడ్యూల్ & టైమ్‌టేబుల్',
        classBadge: 'క్లాస్ 10-A',
        statusCompleted: 'పూర్తయింది',
        statusCurrent: 'ప్రస్తుతం జరుగుతోంది'
      },
      noticeBoard: {
        ...EN.noticeBoard,
        title: 'అధికారిక పాఠశాల నోటీసు బోర్డు',
        aiSummarizeBtn: 'AI సారాంశం పొందండి'
      },
      blackboard: {
        ...EN.blackboard,
        title: 'తరగతి గది బ్లాక్‌బోర్డ్ & AI రచయిత'
      },
      attendanceChart: {
        ...EN.attendanceChart,
        title: 'బహుళ వారాల హాజరు విశ్లేషణ (Analytics)',
        mandatoryThreshold: '75% తప్పనిసరి బోర్డు కనీస పరిమితి'
      },
      copilots: {
        ...EN.copilots,
        aiEngineTitle: 'పాఠశాల AI — వాయిస్ & అవతార్ కో-పైలట్',
        avatarMode: 'AI అవతార్ & వాయిస్',
        chatMode: 'చాట్ వీక్షణ',
        typePlaceholder: 'మీ భాషలో ప్రశ్న అడగండి లేదా ఆదేశాన్ని టైప్ చేయండి...',
        sendBtn: 'పంపండి'
      }
    },
    Marathi: {
      term1: 'सत्र १ (Term 1)',
      enrolledCourses: 'नोंदणीकृत विषय आणि श्रेणी',
      recentActivity: 'अलीकडील उपस्थिती नोंद',
      present: 'उपस्थित (Present)',
      absent: 'अनुपस्थित (Absent)',
      late: 'उशीर (Late)',
      date: 'तारीख',
      status: 'स्थिती',
      search: 'शोधा',
      close: 'बंद करा',
      parentPortal: {
        ...HI.parentPortal,
        bannerTag: '02. पालक पोर्टल / parent-portal',
        familyPortal: 'पालक परिवार पोर्टल',
        requestTeacherCall: 'शिक्षकांशी संभाषणाची विनंती',
        askPathshalaAi: 'पाठशाळा AI ला विचारा',
        selectWard: 'विद्यार्थी निवडा',
        overallAttendance: 'एकूण उपस्थिती स्थिती'
      },
      managementPortal: {
        ...HI.managementPortal,
        bannerTag: '03. व्यवस्थापन पोर्टल / management-portal',
        authorityBadge: 'मुख्याध्यापक कार्यकारी अधिकार',
        totalEnrolled: 'एकूण नोंदणीकृत विद्यार्थी',
        schoolAverage: 'शाळा सरासरी उपस्थिती',
        criticalAttention: 'तात्काळ लक्ष (<75%)',
        facultyPresent: 'आज उपस्थित शिक्षक'
      },
      staffPortal: {
        ...HI.staffPortal,
        bannerTag: '04. शिक्षक पोर्टल / staff-portal',
        classTeacherBadge: 'वर्गशिक्षिका १०-A',
        markAllPresent: 'सर्व उपस्थित नोंदवा',
        liveRegisterTitle: 'थेट उपस्थिती नोंदवही — वर्ग १०-A'
      },
      timetable: {
        ...HI.timetable,
        title: 'दैनिक तासिका आणि वेळापत्रक',
        classBadge: 'वर्ग १०-A'
      },
      noticeBoard: {
        ...HI.noticeBoard,
        title: 'अधिकृत शाळा सूचना फलक',
        aiSummarizeBtn: 'AI सर्व सूचनांचा सारांश द्या'
      },
      blackboard: {
        ...HI.blackboard,
        title: 'परस्परसंवादी फळा (Blackboard) आणि AI लेखक'
      },
      attendanceChart: {
        ...HI.attendanceChart,
        title: 'अनेक आठवड्यांचे उपस्थिती विश्लेषण (Analytics)',
        mandatoryThreshold: '७५% अनिवार्य बोर्ड किमान मर्यादा'
      },
      copilots: {
        ...HI.copilots,
        aiEngineTitle: 'पाठशाळा AI — मानवी आवाज आणि अवतार को-पायलट',
        avatarMode: 'AI अवतार आणि आवाज',
        chatMode: 'चॅट दृश्य (Chat View)',
        typePlaceholder: 'आपल्या भाषेत प्रश्न विचारा...',
        sendBtn: 'पाठवा'
      }
    },
    Bengali: {
      term1: 'টার্ম ১ (Term 1)',
      enrolledCourses: 'নথিভুক্ত বিষয় ও গ্রেড',
      recentActivity: 'সাম্প্রতিক উপস্থিতি রেকর্ড',
      present: 'উপস্থিত (Present)',
      absent: 'অনুপস্থিত (Absent)',
      late: 'দেরি (Late)',
      date: 'তারিখ',
      status: 'অবস্থা',
      search: 'অনুসন্ধান',
      close: 'বন্ধ করুন',
      parentPortal: {
        ...EN.parentPortal,
        bannerTag: '02. অভিভাবক পোর্টাল / parent-portal',
        familyPortal: 'পারিবারিক পোর্টাল',
        requestTeacherCall: 'শিক্ষকের সাথে কথা বলার অনুরোধ',
        askPathshalaAi: 'পাঠশালা AI-কে জিজ্ঞাসা করুন',
        selectWard: 'শিক্ষার্থী নির্বাচন করুন',
        overallAttendance: 'সামগ্রিক উপস্থিতি অবস্থা'
      },
      managementPortal: {
        ...EN.managementPortal,
        bannerTag: '03. ম্যানেজমেন্ট পোর্টাল / management-portal',
        authorityBadge: 'অধ্যক্ষ নির্বাহী কর্তৃপক্ষ',
        totalEnrolled: 'মোট শিক্ষার্থী',
        schoolAverage: 'বিদ্যালয়ের গড় উপস্থিতি',
        criticalAttention: 'জরুরি মনোযোগ (<75%)',
        facultyPresent: 'উপস্থিত শিক্ষক'
      },
      staffPortal: {
        ...EN.staffPortal,
        bannerTag: '04. শিক্ষক পোর্টাল / staff-portal',
        classTeacherBadge: 'শ্রেণি শিক্ষক ১০-A',
        markAllPresent: 'সবাইকে উপস্থিত চিহ্নিত করুন',
        liveRegisterTitle: 'লাইভ উপস্থিতি খাতা — ক্লাস ১০-A'
      },
      timetable: {
        ...EN.timetable,
        title: 'দৈনিক ঘণ্টার সময়সূচী ও রুটিন',
        classBadge: 'ক্লাস ১০-A'
      },
      noticeBoard: {
        ...EN.noticeBoard,
        title: 'অফিসিয়াল ক্যাম্পাস নোটিশ বোর্ড',
        aiSummarizeBtn: 'AI সারাংশ দেখুন'
      },
      blackboard: {
        ...EN.blackboard,
        title: 'ইন্টারেক্টিভ ক্লাসরুম ব্ল্যাকবোর্ড ও AI লেখক'
      },
      attendanceChart: {
        ...EN.attendanceChart,
        title: 'বহু-সাপ্তাহিক উপস্থিতি বিশ্লেষণ (Analytics)',
        mandatoryThreshold: '৭৫% বাধ্যতামূলক বোর্ড ন্যূনতম উপস্থিতি'
      },
      copilots: {
        ...EN.copilots,
        aiEngineTitle: 'পাঠশালা AI — ভয়েস ও অবতার কো-পাইলট',
        avatarMode: 'AI অবতার ও ভয়েস',
        chatMode: 'চ্যাট ভিউ',
        typePlaceholder: 'আপনার ভাষায় প্রশ্ন করুন...',
        sendBtn: 'পাঠান'
      }
    },
    Gujarati: {
      term1: 'સત્ર ૧ (Term 1)',
      enrolledCourses: 'નોંધાયેલા વિષયો અને ગ્રેડ',
      recentActivity: 'તાજેતરની હાજરી નોંધ',
      present: 'હાજર (Present)',
      absent: 'ગેરહાજર (Absent)',
      late: 'મોડા (Late)',
      date: 'તારીખ',
      status: 'સ્થિતિ',
      search: 'શોધો',
      close: 'બંધ કરો',
      parentPortal: {
        ...HI.parentPortal,
        bannerTag: '02. વાલી પોર્ટલ / parent-portal',
        familyPortal: 'વાલી પરિવાર પોર્ટલ',
        requestTeacherCall: 'શિક્ષક સાથે વાતચીતની વિનંતી',
        askPathshalaAi: 'પાઠશાળા AI ને પૂછો',
        selectWard: 'વિદ્યાર્થી પસંદ કરો',
        overallAttendance: 'કુલ હાજરી સ્થિતિ'
      },
      managementPortal: {
        ...HI.managementPortal,
        bannerTag: '03. મેનેજમેન્ટ પોર્ટલ / management-portal',
        authorityBadge: 'આચાર્ય એક્ઝિક્યુટિવ અધિકાર',
        totalEnrolled: 'કુલ નોંધાયેલા વિદ્યાર્થીઓ',
        schoolAverage: 'શાળા સરેરાશ હાજરી',
        criticalAttention: 'તાત્કાલિક ધ્યાન (<75%)',
        facultyPresent: 'આજે હાજર શિક્ષકો'
      },
      staffPortal: {
        ...HI.staffPortal,
        bannerTag: '04. સ્ટાફ પોર્ટલ / staff-portal',
        classTeacherBadge: 'વર્ગશિક્ષિકા ૧૦-A',
        markAllPresent: 'બધાને હાજર નોંધો',
        liveRegisterTitle: 'લાઈવ હાજરી રજીસ્ટર — ધોરણ ૧૦-A'
      },
      timetable: {
        ...HI.timetable,
        title: 'દૈનિક ઘંટડી શેડ્યૂલ અને ટાઈમટેબલ',
        classBadge: 'ધોરણ ૧૦-A'
      },
      noticeBoard: {
        ...HI.noticeBoard,
        title: 'સત્તાવાર શાળા નોટિસ બોર્ડ',
        aiSummarizeBtn: 'AI તમામ નોટિસનો સારાંશ આપો'
      },
      blackboard: {
        ...HI.blackboard,
        title: 'ઈન્ટરેક્ટિવ ક્લાસરૂમ બ્લેકબોર્ડ અને AI લેખક'
      },
      attendanceChart: {
        ...HI.attendanceChart,
        title: 'બહુ-સાપ્તાહિક હાજરી વિશ્લેષણ (Analytics)',
        mandatoryThreshold: '૭૫% ફરજિયાત બોર્ડ લઘુત્તમ મર્યાદા'
      },
      copilots: {
        ...HI.copilots,
        aiEngineTitle: 'પાઠશાળા AI — અવાજ અને અવતાર કો-પાયલટ',
        avatarMode: 'AI અવતાર અને અવાજ',
        chatMode: 'ચેટ દૃશ્ય',
        typePlaceholder: 'તમારી ભાષામાં પ્રશ્ન પૂછો...',
        sendBtn: 'મોકલો'
      }
    },
    Punjabi: {
      term1: 'ਟਰਮ 1 (Term 1)',
      enrolledCourses: 'ਦਾਖਲ ਕੀਤੇ ਵਿਸ਼ੇ ਅਤੇ ਗ੍ਰੇਡ',
      recentActivity: 'ਹਾਲੀਆ ਹਾਜ਼ਰੀ ਗਤੀਵਿਧੀ',
      present: 'ਹਾਜ਼ਰ (Present)',
      absent: 'ਗੈਰਹਾਜ਼ਰ (Absent)',
      late: 'ਲੇਟ (Late)',
      date: 'ਮਿਤੀ',
      status: 'ਸਥਿਤੀ',
      search: 'ਖੋਜੋ',
      close: 'ਬੰਦ ਕਰੋ',
      parentPortal: {
        ...HI.parentPortal,
        bannerTag: '02. ਮਾਪੇ ਪੋਰਟਲ / parent-portal',
        familyPortal: 'ਮਾਪੇ ਪਰਿਵਾਰ ਪੋਰਟਲ',
        requestTeacherCall: 'ਅਧਿਆਪਕ ਨਾਲ ਗੱਲਬਾਤ ਦੀ ਬੇਨਤੀ',
        askPathshalaAi: 'ਪਾਠਸ਼ਾਲਾ AI ਨੂੰ ਪੁੱਛੋ',
        selectWard: 'ਵਿਦਿਆਰਥੀ ਚੁਣੋ',
        overallAttendance: 'ਕੁੱਲ ਹਾਜ਼ਰੀ ਸਥਿਤੀ'
      },
      managementPortal: {
        ...HI.managementPortal,
        bannerTag: '03. ਪ੍ਰਬੰਧਨ ਪੋਰਟਲ / management-portal',
        authorityBadge: 'ਪ੍ਰਿੰਸੀਪਲ ਕਾਰਜਕਾਰੀ ਅਧਿਕਾਰ',
        totalEnrolled: 'ਕੁੱਲ ਵਿਦਿਆਰਥੀ',
        schoolAverage: 'ਸਕੂਲ ਔਸਤ ਹਾਜ਼ਰੀ',
        criticalAttention: 'ਧਿਆਨ ਦੇਣ ਯੋਗ (<75%)',
        facultyPresent: 'ਹਾਜ਼ਰ ਅਧਿਆਪਕ'
      },
      staffPortal: {
        ...HI.staffPortal,
        bannerTag: '04. ਸਟਾਫ ਪੋਰਟਲ / staff-portal',
        classTeacherBadge: 'ਜਮਾਤ ਅਧਿਆਪਕ 10-A',
        markAllPresent: 'ਸਾਰਿਆਂ ਨੂੰ ਹਾਜ਼ਰ ਮਾਰਕ ਕਰੋ',
        liveRegisterTitle: 'ਲਾਈਵ ਹਾਜ਼ਰੀ ਰਜਿਸਟਰ — ਕਲਾਸ 10-A'
      },
      timetable: {
        ...HI.timetable,
        title: 'ਰੋਜ਼ਾਨਾ ਘੰਟੀ ਸ਼ਡਿਊਲ ਅਤੇ ਟਾਈਮ ਟੇਬਲ',
        classBadge: 'ਕਲਾਸ 10-A'
      },
      noticeBoard: {
        ...HI.noticeBoard,
        title: 'ਸਰਕਾਰੀ ਸਕੂਲ ਨੋਟਿਸ ਬੋਰਡ',
        aiSummarizeBtn: 'AI ਸਾਰਾਂਸ਼ ਦਿਓ'
      },
      blackboard: {
        ...HI.blackboard,
        title: 'ਇੰਟਰਐਕਟਿਵ ਕਲਾਸਰੂਮ ਬਲੈਕਬੋਰਡ ਅਤੇ AI ਲੇਖਕ'
      },
      attendanceChart: {
        ...HI.attendanceChart,
        title: 'ਬਹੁ-ਹਫ਼ਤਾਵਾਰੀ ਹਾਜ਼ਰੀ ਵਿਸ਼ਲੇਸ਼ਣ',
        mandatoryThreshold: '75% ਲਾਜ਼ਮੀ ਬੋਰਡ ਘੱਟੋ-ਘੱਟ ਹੱਦ'
      },
      copilots: {
        ...HI.copilots,
        aiEngineTitle: 'ਪਾਠਸ਼ਾਲਾ AI — ਆਵਾਜ਼ ਅਤੇ ਅਵਤਾਰ ਕੋ-ਪਾਇਲਟ',
        avatarMode: 'AI ਅਵਤਾਰ ਅਤੇ ਆਵਾਜ਼',
        chatMode: 'ਚੈਟ ਦ੍ਰਿਸ਼',
        typePlaceholder: 'ਆਪਣੀ ਭਾਸ਼ਾ ਵਿੱਚ ਸਵਾਲ ਪੁੱਛੋ...',
        sendBtn: 'ਭੇਜੋ'
      }
    },
    Kannada: {
      term1: 'ಅವಧಿ 1 (Term 1)',
      enrolledCourses: 'ನೋಂದಾಯಿತ ವಿಷಯಗಳು ಮತ್ತು ಗ್ರೇಡ್‌ಗಳು',
      recentActivity: 'ಇತ್ತೀಚಿನ ಹಾಜರಾತಿ ವಿವರ',
      present: 'ಹಾಜರು (Present)',
      absent: 'ಗೈರುಹಾಜರು (Absent)',
      late: 'ತಡವಾಗಿ (Late)',
      date: 'ದಿನಾಂಕ',
      status: 'ಸ್ಥಿತಿ',
      search: 'ಹುಡುಕಿ',
      close: 'ಮುಚ್ಚಿ',
      parentPortal: {
        ...EN.parentPortal,
        bannerTag: '02. ಪೋಷಕರ ಪೋರ್ಟಲ್ / parent-portal',
        familyPortal: 'ಕುಟುಂಬ ಪೋರ್ಟಲ್',
        requestTeacherCall: 'ಶಿಕ್ಷಕರೊಂದಿಗೆ ಕರೆಯ ವಿನಂತಿ',
        askPathshalaAi: 'ಪಾಠಶಾಲಾ AI ಕೇಳಿ',
        selectWard: 'ವಿದ್ಯಾರ್ಥಿಯನ್ನು ಆಯ್ಕೆಮಾಡಿ',
        overallAttendance: 'ಒಟ್ಟಾರೆ ಹಾಜರಾತಿ ಸ್ಥಿತಿ'
      },
      managementPortal: {
        ...EN.managementPortal,
        bannerTag: '03. ಆಡಳಿತ ಮಂಡಳಿ ಪೋರ್ಟಲ್ / management-portal',
        authorityBadge: 'ಪ್ರಾಂಶುಪಾಲರ ಕಾರ್ಯನಿರ್ವಾಹಕ ಅಧಿಕಾರ',
        totalEnrolled: 'ಒಟ್ಟು ವಿದ್ಯಾರ್ಥಿಗಳು',
        schoolAverage: 'ಶಾಲಾ ಸರಾಸರಿ ಹಾಜರಾತಿ',
        criticalAttention: 'ಗಮನ ಅಗತ್ಯ (<75%)',
        facultyPresent: 'ಹಾಜರಿರುವ ಶಿಕ್ಷಕರು'
      },
      staffPortal: {
        ...EN.staffPortal,
        bannerTag: '04. ಶಿಕ್ಷಕರ ಪೋರ್ಟಲ್ / staff-portal',
        classTeacherBadge: 'ತರಗತಿ ಶಿಕ್ಷಕಿ 10-A',
        markAllPresent: 'ಎಲ್ಲರನ್ನೂ ಹಾಜರೆಂದು ಗುರುತಿಸಿ',
        liveRegisterTitle: 'ಲೈವ್ ಹಾಜರಾತಿ ನೋಂದಣಿ — ತರಗತಿ 10-A'
      },
      timetable: {
        ...EN.timetable,
        title: 'ದೈನಂದಿನ ಗಂಟೆ ವೇಳಾಪಟ್ಟಿ ಮತ್ತು ಟೈಮ್‌ಟೇಬಲ್',
        classBadge: 'ತರಗತಿ 10-A'
      },
      noticeBoard: {
        ...EN.noticeBoard,
        title: 'ಅಧಿಕೃತ ಶಾಲಾ ಸೂಚನಾ ಫಲಕ',
        aiSummarizeBtn: 'AI ಸಾರಾಂಶ ವೀಕ್ಷಿಸಿ'
      },
      blackboard: {
        ...EN.blackboard,
        title: 'ತರಗತಿ ಬ್ಲ್ಯಾಕ್‌ಬೋರ್ಡ್ ಮತ್ತು AI ಲೇಖಕ'
      },
      attendanceChart: {
        ...EN.attendanceChart,
        title: 'ಬಹು-ವಾರದ ಹಾಜರಾತಿ ವಿಶ್ಲೇಷಣೆ (Analytics)',
        mandatoryThreshold: '75% ಕಡ್ಡಾಯ ಕನಿಷ್ಠ ಹಾಜರಾತಿ'
      },
      copilots: {
        ...EN.copilots,
        aiEngineTitle: 'ಪಾಠಶಾಲಾ AI — ಧ್ವನಿ ಮತ್ತು ಅವತಾರ್ ಸಹಾಯಕ',
        avatarMode: 'AI ಅವತಾರ್ ಮತ್ತು ಧ್ವನಿ',
        chatMode: 'ಚಾಟ್ ವೀಕ್ಷಣೆ',
        typePlaceholder: 'ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ ಪ್ರಶ್ನೆ ಕೇಳಿ...',
        sendBtn: 'ಕಳುಹಿಸಿ'
      }
    },
    Malayalam: {
      term1: 'ടേം 1 (Term 1)',
      enrolledCourses: 'രജിസ്റ്റർ ചെയ്ത വിഷയങ്ങളും ഗ്രേഡുകളും',
      recentActivity: 'സമീപകാല ഹാജർ വിവരങ്ങൾ',
      present: 'ഹാജർ (Present)',
      absent: 'ഹാജരില്ല (Absent)',
      late: 'വൈകി (Late)',
      date: 'തീയതി',
      status: 'നില',
      search: 'തിരയുക',
      close: 'അടയ്ക്കുക',
      parentPortal: {
        ...EN.parentPortal,
        bannerTag: '02. രക്ഷിതാക്കളുടെ പോർട്ടൽ / parent-portal',
        familyPortal: 'ഫാമിലി പോർട്ടൽ',
        requestTeacherCall: 'അധ്യാപകനുമായി സംസാരിക്കാൻ അഭ്യർത്ഥിക്കുക',
        askPathshalaAi: 'പാഠശാല AI-യോട് ചോദിക്കുക',
        selectWard: 'വിദ്യാർത്ഥിയെ തിരഞ്ഞെടുക്കുക',
        overallAttendance: 'മൊത്തം ഹാജർ നില'
      },
      managementPortal: {
        ...EN.managementPortal,
        bannerTag: '03. മാനേജ്‌മെന്റ് പോർട്ടൽ / management-portal',
        authorityBadge: 'പ്രിൻസിപ്പൽ എക്സിക്യൂട്ടീവ് അധികാരം',
        totalEnrolled: 'ആകെ വിദ്യാർത്ഥികൾ',
        schoolAverage: 'സ്കൂൾ ശരാശരി ഹാജർ',
        criticalAttention: 'ശ്രദ്ധിക്കേണ്ടവ (<75%)',
        facultyPresent: 'ഹാജരായ അധ്യാപകർ'
      },
      staffPortal: {
        ...EN.staffPortal,
        bannerTag: '04. സ്റ്റാഫ് പോർട്ടൽ / staff-portal',
        classTeacherBadge: 'ക്ലാസ് ടീച്ചർ 10-A',
        markAllPresent: 'എല്ലാവർക്കും ഹാജർ രേഖപ്പെടുത്തുക',
        liveRegisterTitle: 'തത്സമയ ഹാജർ രജിസ്റ്റർ — ക്ലാസ് 10-A'
      },
      timetable: {
        ...EN.timetable,
        title: 'ദൈനംദിന ബെൽ ഷെഡ്യൂളും ടൈംടേബിളും',
        classBadge: 'ക്ലാസ് 10-A'
      },
      noticeBoard: {
        ...EN.noticeBoard,
        title: 'ഔദ്യോഗിക സ്കൂൾ നോട്ടീസ് ബോർഡ്',
        aiSummarizeBtn: 'AI സംഗ്രഹം കാണുക'
      },
      blackboard: {
        ...EN.blackboard,
        title: 'ക്ലാസ്റൂം ബ്ലാക്ക്ബോർഡും AI എഴുത്തുകാരനും'
      },
      attendanceChart: {
        ...EN.attendanceChart,
        title: 'ഹാജർ വിശകലനം (Analytics)',
        mandatoryThreshold: '75% നിർബന്ധിത മിനിമം ഹാജർ'
      },
      copilots: {
        ...EN.copilots,
        aiEngineTitle: 'പാഠശാല AI — വോയ്‌സ് & അവതാർ കോ-പൈലറ്റ്',
        avatarMode: 'AI അവതാർ & വോയ്‌സ്',
        chatMode: 'ചാറ്റ് വ്യൂ',
        typePlaceholder: 'നിങ്ങളുടെ ഭാഷയിൽ ചോദ്യം ചോദിക്കുക...',
        sendBtn: 'അയക്കുക'
      }
    },
    Urdu: {
      term1: 'ٹرم 1 (Term 1)',
      enrolledCourses: 'شامل مضامین اور گریڈز',
      recentActivity: 'حالیہ حاضری کی سرگرمی',
      present: 'حاضر (Present)',
      absent: 'غیر حاضر (Absent)',
      late: 'تاخیر (Late)',
      date: 'تاریخ',
      status: 'حالت',
      search: 'تلاش کریں',
      close: 'بند کریں',
      parentPortal: {
        ...EN.parentPortal,
        bannerTag: '02. والدین پورٹل / parent-portal',
        familyPortal: 'خاندانی پورٹل',
        requestTeacherCall: 'استاد سے گفتگو کی درخواست',
        askPathshalaAi: 'پاٹھ شالا AI سے پوچھیں',
        selectWard: 'طالب علم منتخب کریں',
        overallAttendance: 'مجموعی حاضری کی حالت'
      },
      managementPortal: {
        ...EN.managementPortal,
        bannerTag: '03. انتظامی پورٹل / management-portal',
        authorityBadge: 'پرنسپل انتظامی اختیار',
        totalEnrolled: 'کل طلباء',
        schoolAverage: 'اسکول کی اوسط حاضری',
        criticalAttention: 'توجہ طلب (<75%)',
        facultyPresent: 'حاضر اساتذہ'
      },
      staffPortal: {
        ...EN.staffPortal,
        bannerTag: '04. اساتذہ پورٹل / staff-portal',
        classTeacherBadge: 'کلاس ٹیچر 10-A',
        markAllPresent: 'سب کو حاضر مارک کریں',
        liveRegisterTitle: 'لائیو حاضری رجسٹر — کلاس 10-A'
      },
      timetable: {
        ...EN.timetable,
        title: 'روزانہ گھنٹی شیڈول اور ٹائم ٹیبل',
        classBadge: 'کلاس 10-A'
      },
      noticeBoard: {
        ...EN.noticeBoard,
        title: 'سرکاری اسکول نوٹس بورڈ',
        aiSummarizeBtn: 'AI خلاصہ حاصل کریں'
      },
      blackboard: {
        ...EN.blackboard,
        title: 'کلاسروم بلیک بورڈ اور AI سکرائب'
      },
      attendanceChart: {
        ...EN.attendanceChart,
        title: 'کثیر ہفتہ وار حاضری کا تجزیہ',
        mandatoryThreshold: '75% لازمی بورڈ کم از کم حاضری'
      },
      copilots: {
        ...EN.copilots,
        aiEngineTitle: 'پاٹھ شالا AI — صوتی اور اوتار معاون',
        avatarMode: 'AI اوتار اور آواز',
        chatMode: 'چیٹ ویو',
        typePlaceholder: 'اپنی زبان میں سوال پوچھیں...',
        sendBtn: 'بھیجیں'
      }
    }
  };

  const custom = overrides[baseLangName] || {};
  return {
    ...EN,
    ...custom,
    noticeBoard: { ...EN.noticeBoard, ...(custom.noticeBoard || {}) },
    timetable: { ...EN.timetable, ...(custom.timetable || {}) },
    blackboard: { ...EN.blackboard, ...(custom.blackboard || {}) },
    notebook: { ...EN.notebook, ...(custom.notebook || {}) },
    attendanceChart: { ...EN.attendanceChart, ...(custom.attendanceChart || {}) },
    aiInsights: { ...EN.aiInsights, ...(custom.aiInsights || {}) },
    radar: { ...EN.radar, ...(custom.radar || {}) },
    copilotActions: { ...EN.copilotActions, ...(custom.copilotActions || {}) },
    badges: { ...EN.badges, ...(custom.badges || {}) },
    homework: { ...EN.homework, ...(custom.homework || {}) },
    parentPortal: { ...EN.parentPortal, ...(custom.parentPortal || {}) },
    managementPortal: { ...EN.managementPortal, ...(custom.managementPortal || {}) },
    staffPortal: { ...EN.staffPortal, ...(custom.staffPortal || {}) },
    copilots: { ...EN.copilots, ...(custom.copilots || {}) }
  };
}

export const PORTAL_TRANSLATIONS: Record<string, PortalTranslations> = {
  English: EN,
  Hindi: HI,
  Tamil: buildLanguageTranslations('Tamil'),
  Telugu: buildLanguageTranslations('Telugu'),
  Marathi: buildLanguageTranslations('Marathi'),
  Bengali: buildLanguageTranslations('Bengali'),
  Gujarati: buildLanguageTranslations('Gujarati'),
  Punjabi: buildLanguageTranslations('Punjabi'),
  Kannada: buildLanguageTranslations('Kannada'),
  Malayalam: buildLanguageTranslations('Malayalam'),
  Urdu: buildLanguageTranslations('Urdu')
};

export function getPortalTranslations(langNameOrCode?: string): PortalTranslations {
  if (!langNameOrCode) return PORTAL_TRANSLATIONS.English;
  const langDef = getLanguageDefinition(langNameOrCode);
  return PORTAL_TRANSLATIONS[langDef.name] || PORTAL_TRANSLATIONS.English;
}

