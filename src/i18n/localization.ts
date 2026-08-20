/**
 * Multilingual Localization Dictionary and Language Utilities for Pathshala AI
 * Comprehensive support for 11 Indian languages with deep UI text coverage
 */

export interface LanguageDefinition {
  code: string;
  name: string;
  native: string;
  bcp47: string;
  voiceKeywords: string[];
}

export type SupportedLanguage = 'en' | 'hi' | 'ta' | 'te' | 'mr' | 'bn' | 'gu' | 'pa' | 'kn' | 'ml' | 'ur' | string;

export const SUPPORTED_LANGUAGES: LanguageDefinition[] = [
  { code: 'en', name: 'English', native: 'English', bcp47: 'en-IN', voiceKeywords: ['India', 'Indian', 'en-IN', 'en-GB', 'en-US', 'Samantha', 'Google US English'] },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी', bcp47: 'hi-IN', voiceKeywords: ['hi-IN', 'hi_IN', 'Hindi', 'हिन्दी', 'Lekha', 'Swara', 'Madhur', 'Google हिन्दी'] },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்', bcp47: 'ta-IN', voiceKeywords: ['ta-IN', 'ta_IN', 'Tamil', 'தமிழ்', 'Google தமிழ்', 'Valluvar'] },
  { code: 'te', name: 'Telugu', native: 'తెలుగు', bcp47: 'te-IN', voiceKeywords: ['te-IN', 'te_IN', 'Telugu', 'తెలుగు', 'Google తెలుగు', 'Mohan'] },
  { code: 'mr', name: 'Marathi', native: 'मराठी', bcp47: 'mr-IN', voiceKeywords: ['mr-IN', 'mr_IN', 'Marathi', 'मराठी', 'Google मराठी', 'Aarohi'] },
  { code: 'bn', name: 'Bengali', native: 'বাংলা', bcp47: 'bn-IN', voiceKeywords: ['bn-IN', 'bn_IN', 'bn-BD', 'Bengali', 'বাংলা', 'Google বাংলা', 'Bashkar'] },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી', bcp47: 'gu-IN', voiceKeywords: ['gu-IN', 'gu_IN', 'Gujarati', 'ગુજરાતી', 'Google ગુજરાતી', 'Dhwani'] },
  { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ', bcp47: 'pa-IN', voiceKeywords: ['pa-IN', 'pa_IN', 'Punjabi', 'ਪੰਜਾਬੀ', 'Google ਪੰਜਾਬੀ'] },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ', bcp47: 'kn-IN', voiceKeywords: ['kn-IN', 'kn_IN', 'Kannada', 'ಕನ್ನಡ', 'Google ಕನ್ನಡ', 'Gagan'] },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം', bcp47: 'ml-IN', voiceKeywords: ['ml-IN', 'ml_IN', 'Malayalam', 'മലയാളം', 'Google മലയാളം', 'Midhun'] },
  { code: 'ur', name: 'Urdu', native: 'اردو', bcp47: 'ur-IN', voiceKeywords: ['ur-IN', 'ur_IN', 'ur-PK', 'Urdu', 'اردو', 'Google اردو', 'Salman'] }
];

export function getLanguageDefinition(langNameOrCode: string): LanguageDefinition {
  const normalized = (langNameOrCode || '').toLowerCase().trim();
  const match = SUPPORTED_LANGUAGES.find(
    (l) => l.name.toLowerCase() === normalized || l.code.toLowerCase() === normalized || l.native.toLowerCase() === normalized
  );
  return match || SUPPORTED_LANGUAGES[0];
}

export interface TranslationDict {
  // Brand & School Header
  appTitle: string;
  appSubtitle: string;
  campusBadge: string;
  motto: string;
  periodText: string;

  // Navigation Tabs
  tabStudent: string;
  tabParent: string;
  tabPrincipal: string;
  tabFaculty: string;
  tabCopilot: string;

  // Ecosystem Header
  ecosystemTitle: string;
  ecosystemSubtitle: string;
  ecosystemRepositories: string;
  ecosystemInteractive: string;

  // Roles & Switcher
  switchRole: string;
  availableRoles: string;
  personasReady: string;
  searchPlaceholder: string;
  roleStudent: string;
  roleParent: string;
  roleFaculty: string;
  rolePrincipal: string;
  allFilter: string;

  // Student Card
  campusSmartId: string;
  verifiedBiometric: string;
  activeStudent: string;
  registeredParent: string;
  facultyMember: string;
  principalRole: string;
  rollNo: string;
  className: string;
  house: string;
  houseName: string;
  bloodGroup: string;
  bloodGroupVal: string;
  emergencyContact: string;
  cbseAffiliation: string;

  // AI Assistant & Avatar Stage
  aiAvatarTitle: string;
  aiSubtitle: string;
  speakingRealtime: string;
  tapToSpeak: string;
  listening: string;
  processing: string;
  replaySpoken: string;
  muteVoice: string;
  unmuteVoice: string;
  clarifyPrompt: string;
  welcomeGreeting: string;
  quickQuestionsTitle: string;

  // Telemetry & KPI Cards
  academicTelemetry: string;
  liveSync: string;
  overallAttendance: string;
  sessions: string;
  safeZone: string;
  safeZoneDesc: string;
  trajectoryTitle: string;
  recentShift: string;
  decliningTrend: string;
  trajectoryDesc: string;
  presenceStreak: string;
  consecutive: string;
  activeStreak: string;
  streakDesc: string;
  daysText: string;

  // Portal Modules
  noticeBoardTitle: string;
  timetableTitle: string;
  blackboardTitle: string;
  notebookTitle: string;
  homeworkTitle: string;
  attendanceChartTitle: string;
  aiInsightsTitle: string;
  earlyWarningRadarTitle: string;
  copilotActionsTitle: string;
  badgesTitle: string;

  // Parent Portal
  parentPortalHeader: string;
  selectChild: string;
  callTeacher: string;
  submitLeave: string;
  childAttendanceSummary: string;

  // Management & Staff
  mgmtPortalHeader: string;
  staffPortalHeader: string;
  classRegister: string;
  markPresent: string;
  markAbsent: string;
  exportReport: string;

  // Prompts by role
  prompts: {
    student: { label: string; text: string }[];
    parent: { label: string; text: string }[];
    teacher: { label: string; text: string }[];
    principal: { label: string; text: string }[];
  };

  // Actions & Buttons
  askAi: string;
  send: string;
  typeMessagePlaceholder: string;
  markAttendance: string;
  viewReport: string;
  requestCall: string;
  autoVoiceEnabled: string;
  autoVoiceMuted: string;
}

export const TRANSLATIONS: Record<string, TranslationDict> = {
  English: {
    appTitle: 'Pathshala AI',
    appSubtitle: 'Pathshala Senior Secondary',
    campusBadge: 'Campus AI Copilot',
    motto: 'Vidya Dadati Vinayam',
    periodText: 'Period 2: Physics Lab',

    tabStudent: '01. Student Portal',
    tabParent: '02. Parent Portal',
    tabPrincipal: '03. Management Portal',
    tabFaculty: '04. Staff & Faculty',
    tabCopilot: '05. Pathshala AI Copilot',

    ecosystemTitle: 'School ERP Ecosystem Architecture',
    ecosystemSubtitle: 'Modular Ecosystem: 01. Student ➔ 02. Parent ➔ 03. Management ➔ 04. Staff ➔ 05. Pathshala AI Core',
    ecosystemRepositories: '5 Repositories',
    ecosystemInteractive: 'Interactive Multi-Portal',

    switchRole: 'Switch Role / User',
    availableRoles: 'Available School Roles',
    personasReady: 'Personas Ready',
    searchPlaceholder: 'Search student, teacher, parent, principal...',
    roleStudent: 'Student',
    roleParent: 'Parent',
    roleFaculty: 'Faculty',
    rolePrincipal: 'Principal',
    allFilter: 'All',

    campusSmartId: 'CAMPUS SMART ID',
    verifiedBiometric: 'Verified Biometric RFID ID',
    activeStudent: 'Active Student',
    registeredParent: 'Registered Parent',
    facultyMember: 'Faculty Member',
    principalRole: 'Principal & Management',
    rollNo: 'Roll No',
    className: 'Class',
    house: 'House',
    houseName: 'Garuda (Yellow)',
    bloodGroup: 'Blood Group',
    bloodGroupVal: 'O+ Positive',
    emergencyContact: 'Emergency',
    cbseAffiliation: 'Affiliated to CBSE Board (Affil. No. 2130842) • Session 2025-26',

    aiAvatarTitle: 'Pathshala AI Voice Avatar',
    aiSubtitle: 'Live Interactive Academic Copilot',
    speakingRealtime: 'Speaking in real-time...',
    tapToSpeak: 'Tap to Speak',
    listening: 'Listening to your voice...',
    processing: 'Pathshala AI is thinking...',
    replaySpoken: 'Replay Spoken Response',
    muteVoice: 'Mute Voice',
    unmuteVoice: 'Enable Voice',
    clarifyPrompt: 'Clarify by voice or tap:',
    welcomeGreeting: 'Hello! I am Pathshala AI — your intelligent campus copilot. Ask me anything regarding student attendance, timetable, or academic subjects.',
    quickQuestionsTitle: 'Quick Voice Questions',

    academicTelemetry: 'Core Academic Telemetry',
    liveSync: 'Live Sync',
    overallAttendance: 'Overall Attendance',
    sessions: '21/23 sessions',
    safeZone: 'Safe Zone (>75%)',
    safeZoneDesc: 'Comfortably surpasses mandatory 75% CBSE Board criteria',
    trajectoryTitle: '3-Week Trajectory',
    recentShift: 'Recent Shift',
    decliningTrend: 'Declining Trend',
    trajectoryDesc: 'Comparing last 7 days against 3-week baseline average',
    presenceStreak: 'Presence Streak',
    consecutive: 'Consecutive',
    activeStreak: 'Active Streak',
    streakDesc: 'Current term best streak. 3 more days to unlock Gold Badge',
    daysText: 'Days',

    noticeBoardTitle: 'Official Campus Notice Board',
    timetableTitle: 'Daily Bell Schedule & Timetable',
    blackboardTitle: 'Interactive Pathshala Blackboard & Chalkboard Scribe',
    notebookTitle: 'Smart Spiral Ruled Notebook with Ink Scribe',
    homeworkTitle: 'Homework & Assignment Worksheets Locker',
    attendanceChartTitle: 'Multi-Week Attendance Analytics Chart',
    aiInsightsTitle: 'Pathshala AI Diagnostic Insights',
    earlyWarningRadarTitle: 'Early Warning Academic Radar',
    copilotActionsTitle: 'Recommended AI Copilot Actions',
    badgesTitle: 'Academic Milestone Badges',

    parentPortalHeader: '02. Parent Repository / parent-portal',
    selectChild: 'Select Child',
    callTeacher: 'Schedule Teacher Call',
    submitLeave: 'Submit Leave Application',
    childAttendanceSummary: 'Child Attendance Overview',

    mgmtPortalHeader: '03. Management Repository / management-portal',
    staffPortalHeader: '04. Staff Repository / staff-portal',
    classRegister: 'Class Attendance Register',
    markPresent: 'Mark Present',
    markAbsent: 'Mark Absent',
    exportReport: 'Export CBSE Compliance Report',

    prompts: {
      student: [
        { label: 'My Attendance', text: 'How much attendance do I have?' },
        { label: 'Absence History', text: 'Which days was I marked absent?' },
        { label: 'Exam Eligibility', text: 'Am I eligible for final exams?' },
        { label: 'Math Doubt', text: 'Help me solve a right-angled triangle problem with altitude (x - 7) cm and hypotenuse 13 cm' }
      ],
      parent: [
        { label: 'Child Attendance', text: 'How much attendance does my child have?' },
        { label: 'Absence Details', text: 'Which days was Rahul absent?' },
        { label: 'Exam Eligibility', text: 'Is Rahul eligible for his exams?' },
        { label: 'Teacher Call', text: 'I would like to speak with his teacher' }
      ],
      teacher: [
        { label: 'Class 10-A Roster', text: 'Show attendance for Class 10-A' },
        { label: 'Mark Absent', text: 'Mark Rahul Sharma absent today' },
        { label: 'Mark Present', text: 'Mark Rahul Sharma present today' },
        { label: 'At-Risk Students', text: 'Who in my class has attendance below 75%?' }
      ],
      principal: [
        { label: 'School Overview', text: 'Show overall school attendance analytics' },
        { label: 'Critical Alerts', text: 'Which students have attendance below 75%?' },
        { label: 'Class Comparison', text: 'How does Class 10-A compare to Class 10-B?' },
        { label: 'Student Lookup', text: 'What is Rahul Sharma attendance record?' }
      ]
    },

    askAi: 'Ask AI',
    send: 'Send',
    typeMessagePlaceholder: 'Ask attendance, lesson plans, math questions, or school policies...',
    markAttendance: 'Mark Attendance',
    viewReport: 'View Report',
    requestCall: 'Request Teacher Call',
    autoVoiceEnabled: 'Auto Voice Speech Enabled',
    autoVoiceMuted: 'Auto Voice Speech Muted'
  },

  Hindi: {
    appTitle: 'पाठशाला AI',
    appSubtitle: 'पाठशाला सीनियर सेकेंडरी स्कूल',
    campusBadge: 'स्मार्ट स्कूल AI सहायक',
    motto: 'विद्या ददाति विनयं',
    periodText: 'कालांश २: भौतिकी प्रयोगशाला',

    tabStudent: '०१. छात्र पोर्टल',
    tabParent: '०२. अभिभावक पोर्टल',
    tabPrincipal: '०३. प्रबंधन पोर्टल',
    tabFaculty: '०४. शिक्षक व स्टाफ',
    tabCopilot: '०५. पाठशाला AI सहायक',

    ecosystemTitle: 'स्कूल ईआरपी इकोसिस्टम संरचना',
    ecosystemSubtitle: 'मॉड्यूलर इकोसिस्टम: ०१. छात्र ➔ ०२. अभिभावक ➔ ०३. प्रबंधन ➔ ०४. शिक्षक ➔ ०५. पाठशाला AI कोर',
    ecosystemRepositories: '५ रिपॉजिटरी',
    ecosystemInteractive: 'इंटरैक्टिव मल्टी-पोर्टल',

    switchRole: 'भूमिका / उपयोगकर्ता बदलें',
    availableRoles: 'उपलब्ध स्कूल भूमिकाएं',
    personasReady: 'प्रोफाइल उपलब्ध',
    searchPlaceholder: 'छात्र, शिक्षक, अभिभावक, प्रधानाचार्य खोजें...',
    roleStudent: 'छात्र',
    roleParent: 'अभिभावक',
    roleFaculty: 'शिक्षक',
    rolePrincipal: 'प्रधानाचार्य',
    allFilter: 'सभी',

    campusSmartId: 'कैंपस स्मार्ट आईडी',
    verifiedBiometric: 'सत्यापित बायोमेट्रिक आरएफआईडी',
    activeStudent: 'सक्रिय छात्र',
    registeredParent: 'पंजीकृत अभिभावक',
    facultyMember: 'संकाय सदस्य',
    principalRole: 'प्रधानाचार्य व प्रबंधन',
    rollNo: 'अनुक्रमांक',
    className: 'कक्षा',
    house: 'सदन',
    houseName: 'गरुड़ (पीला)',
    bloodGroup: 'रक्त समूह',
    bloodGroupVal: 'O+ पॉजिटिव',
    emergencyContact: 'आपातकालीन संपर्क',
    cbseAffiliation: 'सीबीएसई बोर्ड से संबद्ध (संबद्धता सं. 2130842) • सत्र 2025-26',

    aiAvatarTitle: 'पाठशाला AI वॉइस अवतार',
    aiSubtitle: 'लाइव इंटरैक्टिव शैक्षणिक साथी',
    speakingRealtime: 'ध्वनि में उत्तर दे रहा है...',
    tapToSpeak: 'बोलने के लिए स्पर्श करें',
    listening: 'आपकी आवाज़ सुनी जा रही है...',
    processing: 'पाठशाला AI विश्लेषण कर रहा है...',
    replaySpoken: 'पुनः उत्तर सुनें',
    muteVoice: 'आवाज़ बंद करें',
    unmuteVoice: 'आवाज़ चालू करें',
    clarifyPrompt: 'विकल्प चुनें या बोलें:',
    welcomeGreeting: 'नमस्ते! मैं पाठशाला एआई हूँ — आपका स्मार्ट स्कूल सहायक। आप मुझसे उपस्थिति, समय सारणी, गणित या शैक्षणिक विषयों के बारे में पूछ सकते हैं।',
    quickQuestionsTitle: 'त्वरित आवाज़ प्रश्न',

    academicTelemetry: 'मुख्य शैक्षणिक टेलीमेट्री',
    liveSync: 'लाइव सिंक',
    overallAttendance: 'कुल उपस्थिति',
    sessions: '२१/२३ सत्र',
    safeZone: 'सुरक्षित क्षेत्र (>७५%)',
    safeZoneDesc: 'सीबीएसई बोर्ड के अनिवार्य ७५% मानदंड से सुरक्षित अधिक',
    trajectoryTitle: '३-सप्ताह का रुझान',
    recentShift: 'हालिया बदलाव',
    decliningTrend: 'घटता रुझान',
    trajectoryDesc: 'पिछले ७ दिनों की तुलना ३ सप्ताह के औसत से',
    presenceStreak: 'लगातार उपस्थिति स्ट्रीक',
    consecutive: 'लगातार',
    activeStreak: 'सक्रिय स्ट्रीक',
    streakDesc: 'वर्तमान सत्र की सर्वश्रेष्ठ स्ट्रीक। गोल्ड बैज के लिए ३ दिन शेष',
    daysText: 'दिन',

    noticeBoardTitle: 'आधिकारिक कैंपस सूचना पट्ट',
    timetableTitle: 'दैनिक घंटी समय-सारणी व कक्षाएं',
    blackboardTitle: 'इंटरैक्टिव पाठशाला श्यामपट्ट (ब्लैकबोर्ड)',
    notebookTitle: 'स्मार्ट रूल्ड नोटबुक व स्याही स्क्रैचपैड',
    homeworkTitle: 'गृहकार्य व कार्यपत्रक (असाइनमेंट लॉकर)',
    attendanceChartTitle: 'बहु-सप्ताहिक उपस्थिति विश्लेषण चार्ट',
    aiInsightsTitle: 'पाठशाला AI निदानात्मक विश्लेषण',
    earlyWarningRadarTitle: 'पूर्व चेतावनी शैक्षणिक रडार',
    copilotActionsTitle: 'अनुशंसित AI सहायक कार्य',
    badgesTitle: 'शैक्षणिक उपलब्धि बैज',

    parentPortalHeader: '०२. अभिभावक रिपॉजिटरी / parent-portal',
    selectChild: 'बच्चा चुनें',
    callTeacher: 'शिक्षक से वार्तालाप तय करें',
    submitLeave: 'अवकाश आवेदन भेजें',
    childAttendanceSummary: 'बच्चे की उपस्थिति सारांश',

    mgmtPortalHeader: '०३. प्रबंधन रिपॉजिटरी / management-portal',
    staffPortalHeader: '०४. शिक्षक रिपॉजिटरी / staff-portal',
    classRegister: 'कक्षा उपस्थिति रजिस्टर',
    markPresent: 'उपस्थित दर्ज करें',
    markAbsent: 'अनुपस्थित दर्ज करें',
    exportReport: 'सीबीएसई रिपोर्ट निर्यात करें',

    prompts: {
      student: [
        { label: 'मेरी उपस्थिति', text: 'मेरी कुल उपस्थिति कितने प्रतिशत है?' },
        { label: 'अनुपस्थिति इतिहास', text: 'मैं किन-किन तारीखों को अनुपस्थित रहा?' },
        { label: 'परीक्षा पात्रता', text: 'क्या मैं अंतिम परीक्षा में बैठने के योग्य हूँ?' },
        { label: 'गणित प्रश्न', text: 'समकोण त्रिभुज का प्रश्न हल करने में मदद करें जिसका लंब (x - 7) सेमी और कर्ण 13 सेमी है' }
      ],
      parent: [
        { label: 'बच्चे की उपस्थिति', text: 'मेरे बच्चे राहुल की उपस्थिति कितनी है?' },
        { label: 'अनुपस्थिति विवरण', text: 'राहुल किस-किस दिन अनुपस्थित था?' },
        { label: 'परीक्षा पात्रता', text: 'क्या राहुल परीक्षा के लिए योग्य है?' },
        { label: 'शिक्षक परामर्श', text: 'मैं राहुल के शिक्षक से बात करना चाहता हूँ' }
      ],
      teacher: [
        { label: 'कक्षा १०-ए सूची', text: 'कक्षा १०-ए की उपस्थिति रिपोर्ट दिखाएं' },
        { label: 'अनुपस्थित दर्ज करें', text: 'राहुल शर्मा को आज अनुपस्थित दर्ज करें' },
        { label: 'उपस्थित दर्ज करें', text: 'राहुल शर्मा को आज उपस्थित दर्ज करें' },
        { label: 'कम उपस्थिति वाले छात्र', text: 'मेरी कक्षा में ७५% से कम उपस्थिति वाले कौन हैं?' }
      ],
      principal: [
        { label: 'स्कूल रिपोर्ट', text: 'पूरे विद्यालय की कुल उपस्थिति रिपोर्ट दिखाएं' },
        { label: 'महत्वपूर्ण अलर्ट', text: 'किन छात्रों की उपस्थिति ७५% से कम है?' },
        { label: 'कक्षा तुलना', text: 'कक्षा १०-ए और १०-बी की उपस्थिति तुलना दिखाएं' },
        { label: 'छात्र विवरण', text: 'राहुल शर्मा का पूरा उपस्थिति रिकॉर्ड क्या है?' }
      ]
    },

    askAi: 'AI से पूछें',
    send: 'भेजें',
    typeMessagePlaceholder: 'उपस्थिति, पाठ योजना, गणित या स्कूल नीति के बारे में पूछें...',
    markAttendance: 'उपस्थिति दर्ज करें',
    viewReport: 'रिपोर्ट देखें',
    requestCall: 'शिक्षक से बात करें',
    autoVoiceEnabled: 'स्वचालित वॉइस चालू',
    autoVoiceMuted: 'स्वचालित वॉइस बंद'
  },

  Tamil: {
    appTitle: 'பாடசாலா AI',
    appSubtitle: 'பாடசாலா மேல்நிலைப் பள்ளி',
    campusBadge: 'ஸ்மார்ட் பள்ளி AI உதவியாளர்',
    motto: 'வித்யா ததாதி வினயம்',
    periodText: 'வேளை 2: இயற்பியல் ஆய்வகம்',

    tabStudent: '01. மாணவர் தளம்',
    tabParent: '02. பெற்றோர் தளம்',
    tabPrincipal: '03. நிர்வாக தளம்',
    tabFaculty: '04. ஆசிரியர் தளம்',
    tabCopilot: '05. பாடசாலா AI உதவியாளர்',

    ecosystemTitle: 'பள்ளி ERP கட்டமைப்பு அமைப்பு',
    ecosystemSubtitle: 'மட்டுப்படுத்தப்பட்ட கட்டமைப்பு: 01. மாணவர் ➔ 02. பெற்றோர் ➔ 03. நிர்வாகம் ➔ 04. ஆசிரியர் ➔ 05. AI கோர்',
    ecosystemRepositories: '5 களஞ்சியங்கள்',
    ecosystemInteractive: 'ஊடாடும் பல தளம்',

    switchRole: 'பயனர் / பங்கை மாற்றவும்',
    availableRoles: 'பள்ளிப் பங்குகள்',
    personasReady: 'தயாராக உள்ள சுயவிவரங்கள்',
    searchPlaceholder: 'மாணவர், ஆசிரியர், பெற்றோர் தேடவும்...',
    roleStudent: 'மாணவர்',
    roleParent: 'பெற்றோர்',
    roleFaculty: 'ஆசிரியர்',
    rolePrincipal: 'முதல்வர்',
    allFilter: 'அனைத்தும்',

    campusSmartId: 'வளாக ஸ்மார்ட் ஐடி',
    verifiedBiometric: 'சரிபார்க்கப்பட்ட பயோமெட்ரிக் ஐடி',
    activeStudent: 'செயலில் உள்ள மாணவர்',
    registeredParent: 'பதிவுசெய்த பெற்றோர்',
    facultyMember: 'ஆசிரியர் உறுப்பினர்',
    principalRole: 'முதல்வர் மற்றும் நிர்வாகம்',
    rollNo: 'வரிசை எண்',
    className: 'வகுப்பு',
    house: 'இல்லம்',
    houseName: 'கருடன் (மஞ்சள்)',
    bloodGroup: 'இரத்த வகை',
    bloodGroupVal: 'O+ பாசிட்டிவ்',
    emergencyContact: 'அவசர தொடர்பு',
    cbseAffiliation: 'CBSE வாரிய அங்கீகாரம் (எண் 2130842) • பருவம் 2025-26',

    aiAvatarTitle: 'பாடசாலா AI குரல் அவதாரம்',
    aiSubtitle: 'நேரடி கல்வி உதவியாளர்',
    speakingRealtime: 'நேரலையில் பேசுகிறது...',
    tapToSpeak: 'பேச தட்டவும்',
    listening: 'உங்கள் குரலைக் கேட்கிறது...',
    processing: 'AI சிந்திக்கிறது...',
    replaySpoken: 'மீண்டும் கேட்கவும்',
    muteVoice: 'குரலை அணைக்கவும்',
    unmuteVoice: 'குரலை இயக்கவும்',
    clarifyPrompt: 'தேர்வு செய்யவும் அல்லது பேசவும்:',
    welcomeGreeting: 'வணக்கம்! நான் பாடசாலா AI — உங்கள் ஸ்மார்ட் பள்ளி உதவியாளர். வருகை அல்லது கல்வி பற்றி என்னிடம் கேட்கலாம்.',
    quickQuestionsTitle: 'விரைவான குரல் கேள்விகள்',

    academicTelemetry: 'முக்கிய கல்வித் தரவு',
    liveSync: 'நேரலை ஒத்திசைவு',
    overallAttendance: 'ஒட்டுமொத்த வருகை',
    sessions: '21/23 அமர்வுகள்',
    safeZone: 'பாதுகாப்பான மண்டலம் (>75%)',
    safeZoneDesc: 'CBSE 75% விதியை விட சிறப்பானது',
    trajectoryTitle: '3-வார போக்கு',
    recentShift: 'சமீபத்திய மாற்றம்',
    decliningTrend: 'குறையும் போக்கு',
    trajectoryDesc: 'கடந்த 7 நாட்களின் சராசரி ஒப்பீடு',
    presenceStreak: 'தொடர் வருகை',
    consecutive: 'தொடர்ச்சியானது',
    activeStreak: 'செயலில் உள்ள வரிசை',
    streakDesc: 'தங்க பதக்கம் பெற இன்னும் 3 நாட்கள் தேவை',
    daysText: 'நாட்கள்',

    noticeBoardTitle: 'பள்ளி அதிகாரப்பூர்வ அறிவிப்பு பலகை',
    timetableTitle: 'தினசரி கால அட்டவணை மற்றும் வகுப்புகள்',
    blackboardTitle: 'பாடசாலா ஊடாடும் கரும்பலகை',
    notebookTitle: 'ஸ்மார்ட் சுருள் நோட்டுப்புத்தகம்',
    homeworkTitle: 'வீட்டுப்பாடம் மற்றும் பணிகள்',
    attendanceChartTitle: 'வருகை பகுப்பாய்வு விளக்கப்படம்',
    aiInsightsTitle: 'பாடசாலா AI நுண்ணறிவு',
    earlyWarningRadarTitle: 'முன்கூட்டிய எச்சரிக்கை ரேடார்',
    copilotActionsTitle: 'பரிந்துரைக்கப்பட்ட AI செயல்கள்',
    badgesTitle: 'கல்வி சாதனை பதக்கங்கள்',

    parentPortalHeader: '02. பெற்றோர் தளம் / parent-portal',
    selectChild: 'குழந்தையைத் தேர்ந்தெடுக்கவும்',
    callTeacher: 'ஆசிரியருடன் பேச முன்பதிவு',
    submitLeave: 'விடுப்பு விண்ணப்பம் அனுப்பவும்',
    childAttendanceSummary: 'குழந்தையின் வருகை சுருக்கம்',

    mgmtPortalHeader: '03. நிர்வாக தளம் / management-portal',
    staffPortalHeader: '04. ஆசிரியர் தளம் / staff-portal',
    classRegister: 'வகுப்பு வருகை பதிவேடு',
    markPresent: 'வருகை பதிவு செய்க',
    markAbsent: 'வராதவராக பதிவு செய்க',
    exportReport: 'CBSE அறிக்கையை பதிவிறக்குக',

    prompts: {
      student: [
        { label: 'என் வருகை', text: 'எனக்கு எத்தனை சதவீதம் வருகை உள்ளது?' },
        { label: 'விடுப்பு வரலாறு', text: 'நான் எந்த நாட்களில் வரவில்லை?' },
        { label: 'தேர்வு தகுதி', text: 'நான் இறுதித் தேர்வுக்கு தகுதியானவனா?' },
        { label: 'கணித சந்தேகம்', text: 'செங்கோண முக்கோண கணக்கை தீர்க்க உதவவும்' }
      ],
      parent: [
        { label: 'குழந்தை வருகை', text: 'என் குழந்தை ராகுலின் வருகை எவ்வளவு?' },
        { label: 'விடுப்பு விவரம்', text: 'ராகுல் எந்த நாட்களில் வரவில்லை?' },
        { label: 'தேர்வு தகுதி', text: 'ராகுல் தேர்வு எழுத தகுதியா?' },
        { label: 'ஆசிரியர் உரையாடல்', text: 'நான் ஆசிரியரிடம் பேச விரும்புகிறேன்' }
      ],
      teacher: [
        { label: 'வகுப்பு 10-A பட்டியல்', text: 'வகுப்பு 10-A வருகை அறிக்கையைக் காட்டு' },
        { label: 'விடுப்பு பதிவு', text: 'இன்று ராகுலை வராதவராக பதிவு செய்' },
        { label: 'வருகை பதிவு', text: 'இன்று ராகுலை வந்தவராக பதிவு செய்' },
        { label: 'குறைந்த வருகை', text: '75% க்கும் குறைவாக வருகை உள்ளவர்கள் யார்?' }
      ],
      principal: [
        { label: 'பள்ளி அறிக்கை', text: 'பள்ளியின் முழு வருகை அறிக்கையைக் காட்டு' },
        { label: 'முக்கிய எச்சரிக்கை', text: '75% க்கும் குறைவான மாணவர்கள் யார்?' },
        { label: 'வகுப்பு ஒப்பீடு', text: 'வகுப்பு 10-A, 10-B ஒப்பீட்டைக் காட்டு' },
        { label: 'மாணவர் விபரம்', text: 'ராகுல் சர்மாவின் வருகை விபரம் என்ன?' }
      ]
    },

    askAi: 'AI யிடம் கேட்க',
    send: 'அனுப்புக',
    typeMessagePlaceholder: 'வருகை அல்லது பாடங்கள் பற்றி கேட்கவும்...',
    markAttendance: 'வருகை பதிவு செய்க',
    viewReport: 'அறிக்கையைப் பார்க்கவும்',
    requestCall: 'ஆசிரியரை அழைக்கவும்',
    autoVoiceEnabled: 'குரல் இயக்கப்பட்டது',
    autoVoiceMuted: 'குரல் அணைக்கப்பட்டது'
  },

  Telugu: {
    appTitle: 'పాఠశాల AI',
    appSubtitle: 'పాఠశాల సీనియర్ సెకండరీ స్కూల్',
    campusBadge: 'స్మార్ట్ స్కూల్ AI సహాయకుడు',
    motto: 'విద్యా దదాతి వినయం',
    periodText: 'పీరియడ్ 2: ఫిజిక్స్ ల్యాబ్',

    tabStudent: '01. విద్యార్థి పోర్టల్',
    tabParent: '02. తల్లిదండ్రుల పోర్టల్',
    tabPrincipal: '03. నిర్వహణ పోర్టల్',
    tabFaculty: '04. ఉపాధ్యాయ పోర్టల్',
    tabCopilot: '05. పాఠశాల AI సహాయకుడు',

    ecosystemTitle: 'పాఠశాల ERP ఆర్కిటెక్చర్',
    ecosystemSubtitle: 'మాడ్యులర్ ఎకోసిస్టమ్: 01. విద్యార్థి ➔ 02. తల్లిదండ్రులు ➔ 03. నిర్వహణ ➔ 04. ఉపాధ్యాయులు ➔ 05. AI కోర్',
    ecosystemRepositories: '5 రిపోజిటరీలు',
    ecosystemInteractive: 'ఇంటరాక్టివ్ మల్టీ-పోర్టల్',

    switchRole: 'పాత్రను మార్చండి',
    availableRoles: 'అందుబాటులో ఉన్న పాత్రలు',
    personasReady: 'ప్రొఫైల్స్ సిద్ధంగా ఉన్నాయి',
    searchPlaceholder: 'విద్యార్థి, ఉపాధ్యాయుడు, తల్లిదండ్రులను వెతకండి...',
    roleStudent: 'విద్యార్థి',
    roleParent: 'తల్లిదండ్రులు',
    roleFaculty: 'ఉపాధ్యాయుడు',
    rolePrincipal: 'ప్రిన్సిపాల్',
    allFilter: 'అన్నీ',

    campusSmartId: 'క్యాంపస్ స్మార్ట్ ఐడీ',
    verifiedBiometric: 'ధృవీకరించబడిన బయోమెట్రిక్ ఐడీ',
    activeStudent: 'యాక్టివ్ విద్యార్థి',
    registeredParent: 'నమోదైన తల్లిదండ్రులు',
    facultyMember: 'ఉపాధ్యాయ సభ్యుడు',
    principalRole: 'ప్రిన్సిపాల్ మరియు నిర్వహణ',
    rollNo: 'రోల్ నంబర్',
    className: 'తరగతి',
    house: 'హౌస్',
    houseName: 'గరుడ (పసుపు)',
    bloodGroup: 'రక్త వర్గం',
    bloodGroupVal: 'O+ పాజిటివ్',
    emergencyContact: 'అత్యవసర సంప్రదింపు',
    cbseAffiliation: 'CBSE బోర్డు గుర్తింపు (నం. 2130842) • సెషన్ 2025-26',

    aiAvatarTitle: 'పాఠశాల AI వాయిస్ అవతార్',
    aiSubtitle: 'లైవ్ ఇంటరాక్టివ్ విద్యా సహాయకుడు',
    speakingRealtime: 'లైవ్‌లో మాట్లాడుతోంది...',
    tapToSpeak: 'మాట్లాడటానికి నొక్కండి',
    listening: 'మీ స్వరం వింటోంది...',
    processing: 'AI ఆలోచిస్తోంది...',
    replaySpoken: 'మళ్ళీ వినండి',
    muteVoice: 'వాయిస్ మ్యూట్ చేయండి',
    unmuteVoice: 'వాయిస్ ఆన్ చేయండి',
    clarifyPrompt: 'ఎంచుకోండి లేదా మాట్లాడండి:',
    welcomeGreeting: 'నమస్కారం! నేను పాఠశాల AI — మీ స్మార్ట్ స్కూల్ అసిస్టెంట్. హాజరు లేదా చదువుల గురించి నన్ను అడగవచ్చు.',
    quickQuestionsTitle: 'త్వరిత వాయిస్ ప్రశ్నలు',

    academicTelemetry: 'ప్రధాన విద్యా టెలిమెట్రీ',
    liveSync: 'లైవ్ సింక్',
    overallAttendance: 'మొత్తం హాజరు',
    sessions: '21/23 సెషన్లు',
    safeZone: 'సురక్షిత జోన్ (>75%)',
    safeZoneDesc: 'CBSE 75% ప్రమాణం కంటే మెరుగైనది',
    trajectoryTitle: '3-వారాల సరళి',
    recentShift: 'ఇటీవలి మార్పు',
    decliningTrend: 'తగ్గుతున్న సరళి',
    trajectoryDesc: 'గత 7 రోజుల సగటుతో పోలిక',
    presenceStreak: 'వరుస హాజరు',
    consecutive: 'నిరంతరాయంగా',
    activeStreak: 'యాక్టివ్ స్ట్రీక్',
    streakDesc: 'గోల్డ్ బ్యాడ్జ్ కోసం మరో 3 రోజులు కావాలి',
    daysText: 'రోజులు',

    noticeBoardTitle: 'క్యాంపస్ అధికారిక నోటీసు బోర్డు',
    timetableTitle: 'రోజువారీ బెల్ షెడ్యూల్ మరియు టైమ్‌టేబుల్',
    blackboardTitle: 'ఇంటరాక్టివ్ పాఠశాల బ్లాక్‌బోర్డ్',
    notebookTitle: 'స్మార్ట్ రూల్డ్ స్పైరల్ నోట్‌బుక్',
    homeworkTitle: 'హోంవర్క్ మరియు అసైన్‌మెంట్ లాకర్',
    attendanceChartTitle: 'హాజరు విశ్లేషణ చార్ట్',
    aiInsightsTitle: 'పాఠశాల AI అంతర్దృష్టులు',
    earlyWarningRadarTitle: 'ముందస్తు హెచ్చరిక రాడార్',
    copilotActionsTitle: 'సిఫార్సు చేయబడిన AI చర్యలు',
    badgesTitle: 'విద్యా పురస్కార బ్యాడ్జీలు',

    parentPortalHeader: '02. తల్లిదండ్రుల పోర్టల్ / parent-portal',
    selectChild: 'పిల్లలను ఎంచుకోండి',
    callTeacher: 'టీచర్‌తో కాల్ బుక్ చేయండి',
    submitLeave: 'సెలవు దరఖాస్తును సమర్పించండి',
    childAttendanceSummary: 'పిల్లల హాజరు సారాంశం',

    mgmtPortalHeader: '03. నిర్వహణ పోర్టల్ / management-portal',
    staffPortalHeader: '04. ఉపాధ్యాయ పోర్టల్ / staff-portal',
    classRegister: 'తరగతి హాజరు పట్టిక',
    markPresent: 'హాజరు నమోదు చేయండి',
    markAbsent: 'గైర్హాజరు నమోదు చేయండి',
    exportReport: 'CBSE నివేదికను డౌన్‌లోడ్ చేయండి',

    prompts: {
      student: [
        { label: 'నా హాజరు', text: 'నాకు ఎంత శాతం హాజరు ఉంది?' },
        { label: 'సెలవుల చరిత్ర', text: 'నేను ఏ రోజుల్లో గైర్హాజరయ్యాను?' },
        { label: 'పరీక్ష అర్హత', text: 'నేను తుది పరీక్షలకు అర్హుడినేనా?' },
        { label: 'గణిత సందేహం', text: 'లంబకోణ త్రిభుజం సమస్యను పరిష్కరించడంలో సహాయపడండి' }
      ],
      parent: [
        { label: 'పిల్లల హాజరు', text: 'నా బిడ్డ రాహుల్ హాజరు ఎంత?' },
        { label: 'సెలవు వివరాలు', text: 'రాహుల్ ఏ రోజుల్లో హాజరు కాలేదు?' },
        { label: 'పరీక్ష అర్హత', text: 'రాహుల్ పరీక్ష రాయడానికి అర్హుడేనా?' },
        { label: 'ఉపాధ్యాయుడితో మాట', text: 'నేను రాహుల్ టీచర్‌తో మాట్లాడాలి' }
      ],
      teacher: [
        { label: 'క్లాస్ 10-A జాబితా', text: 'క్లాస్ 10-A హాజరు చూపించండి' },
        { label: 'గైర్హాజరు నమోదు', text: 'ఈ రోజు రాహుల్‌ని ఆబ్సెంట్ చేయండి' },
        { label: 'హాజరు నమోదు', text: 'ఈ రోజు రాహుల్‌ని ప్రెజెంట్ చేయండి' },
        { label: 'తక్కువ హాజరు', text: '75% కంటే తక్కువ హాజరు ఉన్నవారు ఎవరు?' }
      ],
      principal: [
        { label: 'పాఠశాల నివేదిక', text: 'మొత్తం పాఠశాల హాజరు నివేదికను చూపించండి' },
        { label: 'ముఖ్య హెచ్చరిక', text: '75% కంటే తక్కువ హాజరు ఉన్న విద్యార్థులు ఎవరు?' },
        { label: 'తరగతి పోలిక', text: 'క్లాస్ 10-A మరియు 10-B పోలిక చూపించండి' },
        { label: 'విద్యార్థి వివరాలు', text: 'రాహుల్ శర్మ హాజరు రికార్డు ఏమిటి?' }
      ]
    },

    askAi: 'AI ని అడగండి',
    send: 'పంపండి',
    typeMessagePlaceholder: 'హాజరు లేదా పాఠాల గురించి అడగండి...',
    markAttendance: 'హాజరు నమోదు',
    viewReport: 'నివేదికను వీక్షించండి',
    requestCall: 'టీచర్‌ని సంప్రదించండి',
    autoVoiceEnabled: 'వాయిస్ ఆన్',
    autoVoiceMuted: 'వాయిస్ ఆఫ్'
  },

  Marathi: {
    appTitle: 'पाठशाळा AI',
    appSubtitle: 'पाठशाळा सीनियर सेकंडरी स्कूल',
    campusBadge: 'स्मार्ट स्कूल AI सहाय्यक',
    motto: 'विद्या ददाति विनयं',
    periodText: 'तासिका २: भौतिकशास्त्र प्रयोगशाळा',

    tabStudent: '०१. विद्यार्थी पोर्टल',
    tabParent: '०२. पालक पोर्टल',
    tabPrincipal: '०३. व्यवस्थापन पोर्टल',
    tabFaculty: '०४. शिक्षक पोर्टल',
    tabCopilot: '०५. पाठशाळा AI सहाय्यक',

    ecosystemTitle: 'शाळा ERP प्रणाली रचना',
    ecosystemSubtitle: 'मॉड्यूलर इकोसिस्टम: ०१. विद्यार्थी ➔ ०२. पालक ➔ ०३. व्यवस्थापन ➔ ०४. शिक्षक ➔ ०५. AI गाभा',
    ecosystemRepositories: '५ रिपॉझिटरी',
    ecosystemInteractive: 'इंटरॅक्टिव्ह मल्टी-पोर्टल',

    switchRole: 'भूमिका / वापरकर्ता बदला',
    availableRoles: 'उपलब्ध भूमिका',
    personasReady: 'प्रोफाइल तयार आहेत',
    searchPlaceholder: 'विद्यार्थी, शिक्षक, पालक शोधा...',
    roleStudent: 'विद्यार्थी',
    roleParent: 'पालक',
    roleFaculty: 'शिक्षक',
    rolePrincipal: 'मुख्याध्यापक',
    allFilter: 'सर्व',

    campusSmartId: 'कॅम्पस स्मार्ट आयडी',
    verifiedBiometric: 'सत्यापित बायोमेट्रिक आरएफआयडी',
    activeStudent: 'सक्रिय विद्यार्थी',
    registeredParent: 'नोंदणीकृत पालक',
    facultyMember: 'शिक्षक सदस्य',
    principalRole: 'मुख्याध्यापक व व्यवस्थापन',
    rollNo: 'हजेरी क्रमांक',
    className: 'इयत्ता',
    house: 'सदन',
    houseName: 'गरुड (पिवळा)',
    bloodGroup: 'रक्तगट',
    bloodGroupVal: 'O+ पॉझिटिव्ह',
    emergencyContact: 'आपत्कालीन संपर्क',
    cbseAffiliation: 'CBSE बोर्ड संलग्न (क्र. 2130842) • सत्र 2025-26',

    aiAvatarTitle: 'पाठशाळा AI व्हॉइस अवतार',
    aiSubtitle: 'थेट शैक्षणिक सहाय्यक',
    speakingRealtime: 'थेट आवाजात बोलत आहे...',
    tapToSpeak: 'बोलण्यासाठी टॅप करा',
    listening: 'तुमचा आवाज ऐकत आहे...',
    processing: 'AI विचार करत आहे...',
    replaySpoken: 'पुन्हा ऐका',
    muteVoice: 'आवाज म्यूट करा',
    unmuteVoice: 'आवाज सुरू करा',
    clarifyPrompt: 'पर्याय निवडा किंवा बोला:',
    welcomeGreeting: 'नमस्कार! मी पाठशाळा AI आहे — तुमचा स्मार्ट शाळा सहाय्यक. तुम्ही मला उपस्थिती किंवा अभ्यासाबद्दल विचारू शकता.',
    quickQuestionsTitle: 'द्रुत व्हॉइस प्रश्न',

    academicTelemetry: 'मुख्य शैक्षणिक टेलिमेट्री',
    liveSync: 'थेट सिंक',
    overallAttendance: 'एकूण उपस्थिती',
    sessions: '२१/२३ सत्रे',
    safeZone: 'सुरक्षित क्षेत्र (>७५%)',
    safeZoneDesc: 'CBSE ७५% निकषापेक्षा अधिक उत्तम',
    trajectoryTitle: '३-आठवड्यांचा कल',
    recentShift: 'नुकताच बदल',
    decliningTrend: 'घटता कल',
    trajectoryDesc: 'मागील ७ दिवसांची तुलना ३ आठवड्यांच्या सरासरीशी',
    presenceStreak: 'सातत्यपूर्ण उपस्थिती',
    consecutive: 'सलग',
    activeStreak: 'सक्रिय स्ट्रीक',
    streakDesc: 'गोल्ड बॅजसाठी आणखी ३ दिवस उपस्थित राहा',
    daysText: 'दिवस',

    noticeBoardTitle: 'अधिकृत कॅम्पस सूचना फलक',
    timetableTitle: 'दैनिक तासिका वेळापत्रक',
    blackboardTitle: 'इंटरॅक्टिव्ह पाठशाळा फळा (ब्लॅकबोर्ड)',
    notebookTitle: 'स्मार्ट रूल्ड वही व डिजिटल पेन',
    homeworkTitle: 'गृहपाठ व स्वाध्याय लॉकर',
    attendanceChartTitle: 'उपस्थिती विश्लेषण आलेख',
    aiInsightsTitle: 'पाठशाळा AI अंतर्दृष्टी',
    earlyWarningRadarTitle: 'पूर्वसूचना रडार',
    copilotActionsTitle: 'शिफारस केलेल्या कृती',
    badgesTitle: 'शैक्षणिक यश बॅज',

    parentPortalHeader: '०२. पालक पोर्टल / parent-portal',
    selectChild: 'पाल्य निवडा',
    callTeacher: 'शिक्षकांशी संभाषणाची वेळ घ्या',
    submitLeave: 'रजेचा अर्ज पाठवा',
    childAttendanceSummary: 'पाbasicConfigल्याची उपस्थिती सारांश',

    mgmtPortalHeader: '०३. व्यवस्थापन पोर्टल / management-portal',
    staffPortalHeader: '०४. शिक्षक पोर्टल / staff-portal',
    classRegister: 'इयत्ता हजेरी नोंदवही',
    markPresent: 'उपस्थित नोंदवा',
    markAbsent: 'अनुपस्थित नोंदवा',
    exportReport: 'CBSE अहवाल डाउनलोड करा',

    prompts: {
      student: [
        { label: 'माझी उपस्थिती', text: 'माझी एकूण उपस्थिती किती टक्के आहे?' },
        { label: 'रजेचा इतिहास', text: 'मी कोणत्या दिवशी अनुपस्थित होतो?' },
        { label: 'परीक्षा पात्रता', text: 'मी अंतिम परीक्षेसाठी पात्र आहे का?' },
        { label: 'गणितातील शंका', text: 'काटकोन त्रिकोणाचा प्रश्न सोडवण्यास मदत करा' }
      ],
      parent: [
        { label: 'पाbasicConfigल्याची उपस्थिती', text: 'माझा मुलगा राहुलची उपस्थिती किती आहे?' },
        { label: 'अनुपस्थिती माहिती', text: 'राहुल कोणत्या दिवशी अनुपस्थित होता?' },
        { label: 'परीक्षा पात्रता', text: 'राहुल परीक्षेसाठी पात्र आहे का?' },
        { label: 'शिक्षकांशी संवाद', text: 'मला राहुलच्या शिक्षकांशी बोलायचे आहे' }
      ],
      teacher: [
        { label: 'इयत्ता १०-अ यादी', text: 'इयत्ता १०-अ चा हजेरी अहवाल दाखवा' },
        { label: 'अनुपस्थित नोंदवा', text: 'आज राहुल शर्माला अनुपस्थित नोंदवा' },
        { label: 'उपस्थित नोंदवा', text: 'आज राहुल शर्माला उपस्थित नोंदवा' },
        { label: 'कमी उपस्थिती', text: '७५% पेक्षा कमी उपस्थिती कोणाची आहे?' }
      ],
      principal: [
        { label: 'शाळा अहवाल', text: 'संपूर्ण शाळेचा हजेरी अहवाल दाखवा' },
        { label: 'महत्त्वाचा इशारा', text: '७५% पेक्षा कमी उपस्थिती असलेले विद्यार्थी कोण आहेत?' },
        { label: 'इयत्ता तुलना', text: 'इयत्ता १०-अ आणि १०-ब ची तुलना दाखवा' },
        { label: 'विद्यार्थी तपशील', text: 'राहुल शर्माचा उपस्थिती रेकॉर्ड काय आहे?' }
      ]
    },

    askAi: 'AI ला विचारा',
    send: 'पाठवा',
    typeMessagePlaceholder: 'उपस्थिती किंवा अभ्यासाबद्दल विचारा...',
    markAttendance: 'उपस्थिती नोंदवा',
    viewReport: 'अहवाल पहा',
    requestCall: 'शिक्षकांशी चर्चा करा',
    autoVoiceEnabled: 'आवाज सुरू',
    autoVoiceMuted: 'आवाज बंद'
  },

  Bengali: {
    appTitle: 'পাঠশালা AI',
    appSubtitle: 'পাঠশালা সিনিয়র সেকেন্ডারি স্কুল',
    campusBadge: 'স্মার্ট স্কুল AI সহকারী',
    motto: 'বিদ্যা দদাতি বিনয়ম',
    periodText: 'পিরিয়ড ২: পদার্থবিজ্ঞান ল্যাব',

    tabStudent: '০১. শিক্ষার্থী পোর্টাল',
    tabParent: '০২. অভিভাবক পোর্টাল',
    tabPrincipal: '০৩. পরিচালনা পোর্টাল',
    tabFaculty: '০৪. শিক্ষক পোর্টাল',
    tabCopilot: '০৫. পাঠশালা AI সহকারী',

    ecosystemTitle: 'স্কুল ERP আর্কিটেকচার',
    ecosystemSubtitle: 'মডুলার ইকোসিস্টেম: ০১. শিক্ষার্থী ➔ ০২. অভিভাবক ➔ ০৩. প্রশাসন ➔ ০৪. শিক্ষক ➔ ০৫. AI কোর',
    ecosystemRepositories: '৫টি সংগ্রহশালা',
    ecosystemInteractive: 'ইন্টারেক্টিভ মাল্টি-পোর্টাল',

    switchRole: 'ভূমিকা পরিবর্তন করুন',
    availableRoles: 'উপলব্ধ ভূমিকা',
    personasReady: 'প্রোফাইল প্রস্তুত',
    searchPlaceholder: 'শিক্ষার্থী, শিক্ষক, অভিভাবক খুঁজুন...',
    roleStudent: 'শিক্ষার্থী',
    roleParent: 'অভিভাবক',
    roleFaculty: 'শিক্ষক',
    rolePrincipal: 'অধ্যক্ষ',
    allFilter: 'সব',

    campusSmartId: 'ক্যাম্পাস স্মার্ট আইডি',
    verifiedBiometric: 'যাচাইকৃত বায়োমেট্রিক আইডি',
    activeStudent: 'সক্রিয় শিক্ষার্থী',
    registeredParent: 'নিবন্ধিত অভিভাবক',
    facultyMember: 'শিক্ষক সদস্য',
    principalRole: 'অধ্যক্ষ ও প্রশাসন',
    rollNo: 'রোল নম্বর',
    className: 'শ্রেণী',
    house: 'হাউস',
    houseName: 'গরুড় (হলুদ)',
    bloodGroup: 'রক্তের গ্রুপ',
    bloodGroupVal: 'O+ পজিটিভ',
    emergencyContact: 'জরুরী যোগাযোগ',
    cbseAffiliation: 'CBSE অনুমোদিত (নং 2130842) • শিক্ষাবর্ষ 2025-26',

    aiAvatarTitle: 'পাঠশালা AI ভয়েস অবতার',
    aiSubtitle: 'লাইভ শিক্ষামূলক সহকারী',
    speakingRealtime: 'সরাসরি ভয়েসে কথা বলছে...',
    tapToSpeak: 'কথা বলতে ট্যাপ করুন',
    listening: 'আপনার কথা শুনছি...',
    processing: 'AI চিন্তা করছে...',
    replaySpoken: 'পুনরায় শুনুন',
    muteVoice: 'ভয়েস বন্ধ করুন',
    unmuteVoice: 'ভয়েস চালু করুন',
    clarifyPrompt: 'বিকল্প নির্বাচন করুন:',
    welcomeGreeting: 'নমস্কার! আমি পাঠশালা AI — আপনার স্মার্ট স্কুল সহকারী। উপস্থিতি বা পড়াশোনা সম্পর্কে যেকোনো প্রশ্ন আমাকে করতে পারেন।',
    quickQuestionsTitle: 'দ্রুত ভয়েস প্রশ্ন',

    academicTelemetry: 'মূল একাডেমিক টেলিমেট্রি',
    liveSync: 'লাইভ সিঙ্ক',
    overallAttendance: 'সামগ্রিক উপস্থিতি',
    sessions: '২১/২৩ সেশন',
    safeZone: 'নিরাপদ অঞ্চল (>৭৫%)',
    safeZoneDesc: 'CBSE ৭৫% নিয়মের চেয়ে অনেক ভালো',
    trajectoryTitle: '৩-সপ্তাহের প্রবণতা',
    recentShift: 'সাম্প্রতিক পরিবর্তন',
    decliningTrend: 'হ্রাসমান প্রবণতা',
    trajectoryDesc: 'গত ৭ দিনের গড় তুলনা',
    presenceStreak: 'ধারাবাহিক উপস্থিতি',
    consecutive: 'টানা',
    activeStreak: 'সক্রিয় ধারা',
    streakDesc: 'গোল্ড ব্যাজের জন্য আরও ৩ দিন উপস্থিত থাকুন',
    daysText: 'দিন',

    noticeBoardTitle: 'অফিসিয়াল ক্যাম্পাস নোটিশ বোর্ড',
    timetableTitle: 'দৈনিক সময়সূচী ও ক্লাসরুম',
    blackboardTitle: 'ইন্টারেক্টিভ পাঠশালা ব্ল্যাকবোর্ড',
    notebookTitle: 'স্মার্ট রুল্ড নোটবুক ও ডিজিটাল পেন',
    homeworkTitle: 'হোমওয়ার্ক ও অ্যাসাইনমেন্ট লকার',
    attendanceChartTitle: 'উপস্থিতি বিশ্লেষণ চার্ট',
    aiInsightsTitle: 'পাঠশালা AI অন্তর্দৃষ্টি',
    earlyWarningRadarTitle: 'সতর্কবার্তা রাডার',
    copilotActionsTitle: 'প্রস্তাবিত AI পদক্ষেপ',
    badgesTitle: 'একাডেমিক সাফল্য ব্যাজ',

    parentPortalHeader: '০২. অভিভাবক পোর্টাল / parent-portal',
    selectChild: 'সন্তান নির্বাচন করুন',
    callTeacher: 'শিক্ষকের সাথে কথা বলার সময় নির্ধারণ',
    submitLeave: 'ছুটির আবেদন জমা দিন',
    childAttendanceSummary: 'সন্তানের উপস্থিতি সারাংশ',

    mgmtPortalHeader: '০৩. পরিচালনা পোর্টাল / management-portal',
    staffPortalHeader: '০৪. শিক্ষক পোর্টাল / staff-portal',
    classRegister: 'শ্রেণী উপস্থিতি খাতা',
    markPresent: 'উপস্থিত চিহ্নিত করুন',
    markAbsent: 'অনুপস্থিত চিহ্নিত করুন',
    exportReport: 'CBSE রিপোর্ট ডাউনলোড করুন',

    prompts: {
      student: [
        { label: 'আমার উপস্থিতি', text: 'আমার মোট উপস্থিতি কত শতাংশ?' },
        { label: 'অনুপস্থিতির ইতিহাস', text: 'আমি কোন কোন দিনে অনুপস্থিত ছিলাম?' },
        { label: 'পরীক্ষার যোগ্যতা', text: 'আমি কি ফাইনাল পরীক্ষার যোগ্য?' },
        { label: 'গণিত প্রশ্ন', text: 'সমকোণী ত্রিভুজের সমস্যা সমাধানে সাহায্য করুন' }
      ],
      parent: [
        { label: 'সন্তানের উপস্থিতি', text: 'আমার সন্তান রাহুলের উপস্থিতি কত?' },
        { label: 'অনুপস্থিতির বিবরণ', text: 'রাহুল কোন কোন দিন স্কুলে যায়নি?' },
        { label: 'পরীক্ষার যোগ্যতা', text: 'রাহুল কি পরীক্ষা দেওয়ার যোগ্য?' },
        { label: 'শিক্ষকের সাথে কথা', text: 'আমি রাহুলের শিক্ষকের সাথে কথা বলতে চাই' }
      ],
      teacher: [
        { label: 'ক্লাস ১০-এ তালিকা', text: 'ক্লাস ১০-এ এর উপস্থিতি দেখান' },
        { label: 'অনুপস্থিত করুন', text: 'আজ রাহুল শর্মাকে অনুপস্থিত চিহ্নিত করুন' },
        { label: 'উপস্থিত করুন', text: 'আজ রাহুল শর্মাকে উপস্থিত চিহ্নিত করুন' },
        { label: 'কম উপস্থিতি', text: '৭৫% এর কম উপস্থিতি কাদের রয়েছে?' }
      ],
      principal: [
        { label: 'স্কুল রিপোর্ট', text: 'পুরো স্কুলের উপস্থিতি রিপোর্ট দেখান' },
        { label: 'জরুরী সতর্কতা', text: '৭৫% এর নিচে উপস্থিতি কার কার?' },
        { label: 'ক্লাস তুলনা', text: 'ক্লাস ১০-এ এবং ১০-বি এর তুলনা দেখান' },
        { label: 'শিক্ষার্থীর তথ্য', text: 'রাহুল শর্মার উপস্থিতির রেকর্ড কি?' }
      ]
    },

    askAi: 'AI কে জিজ্ঞাসা করুন',
    send: 'পাঠান',
    typeMessagePlaceholder: 'উপস্থিতি বা পড়াশোনা সম্পর্কে জিজ্ঞাসা করুন...',
    markAttendance: 'উপস্থিতি চিহ্নিত করুন',
    viewReport: 'রিপোর্ট দেখুন',
    requestCall: 'শিক্ষককে কল অনুরোধ',
    autoVoiceEnabled: 'ভয়েস চালু',
    autoVoiceMuted: 'ভয়েস বন্ধ'
  },

  Gujarati: {
    appTitle: 'પાઠશાળા AI',
    appSubtitle: 'પાઠશાળા સિનિયર સેકન્ડરી સ્કૂલ',
    campusBadge: 'સ્માર્ટ સ્કૂલ AI સહાયક',
    motto: 'વિદ્યા દદાતિ વિનયમ્',
    periodText: 'તાસ ૨: ભૌતિકવિજ્ઞાન પ્રયોગશાળા',

    tabStudent: '૦૧. વિદ્યાર્થી પોર્ટલ',
    tabParent: '૦૨. વાલી પોર્ટલ',
    tabPrincipal: '૦૩. વ્યવસ્થાપન પોર્ટલ',
    tabFaculty: '૦૪. શિક્ષક પોર્ટલ',
    tabCopilot: '૦૫. પાઠશાળા AI સહાયક',

    ecosystemTitle: 'શાળા ERP આર્કિટેક્ચર',
    ecosystemSubtitle: 'મોડ્યુલર ઇકોસિસ્ટમ: ૦૧. વિદ્યાર્થી ➔ ૦૨. વાલી ➔ ૦૩. વહીવટ ➔ ૦૪. શિક્ષક ➔ ૦૫. AI કોર',
    ecosystemRepositories: '૫ રિપોઝીટરીઝ',
    ecosystemInteractive: 'ઇન્ટરેક્ટિવ મલ્ટી-પોર્ટલ',

    switchRole: 'ભૂમિકા / વપરાશકર્તા બદલો',
    availableRoles: 'ઉપલબ્ધ ભૂમિકાઓ',
    personasReady: 'પ્રોફાઇલ તૈયાર છે',
    searchPlaceholder: 'વિદ્યાર્થી, શિક્ષક, વાલી શોધો...',
    roleStudent: 'વિદ્યાર્થી',
    roleParent: 'વાલી',
    roleFaculty: 'શિક્ષક',
    rolePrincipal: 'આચાર્ય',
    allFilter: 'બધા',

    campusSmartId: 'કેમ્પસ સ્માર્ટ આઈડી',
    verifiedBiometric: 'ચકાસાયેલ બાયોમેટ્રિક આઈડી',
    activeStudent: 'સક્રિય વિદ્યાર્થી',
    registeredParent: 'નોંધાયેલ વાલી',
    facultyMember: 'શિક્ષક સભ્ય',
    principalRole: 'આચાર્ય અને વહીવટ',
    rollNo: 'રોલ નંબર',
    className: 'ધોરણ',
    house: 'હાઉસ',
    houseName: 'ગરુડ (પીળો)',
    bloodGroup: 'બ્લડ ગ્રુપ',
    bloodGroupVal: 'O+ પોઝિટિવ',
    emergencyContact: 'ઇમરજન્સી સંપર્ક',
    cbseAffiliation: 'CBSE બોર્ડ સંલગ્ન (નં. 2130842) • સત્ર 2025-26',

    aiAvatarTitle: 'પાઠશાળા AI વૉઇસ અવતાર',
    aiSubtitle: 'લાઈવ શૈક્ષણિક સહાયક',
    speakingRealtime: 'લાઈવ અવાજમાં બોલી રહ્યું છે...',
    tapToSpeak: 'બોલવા માટે ટેપ કરો',
    listening: 'તમારો અવાજ સાંભળી રહ્યું છે...',
    processing: 'AI વિચારી રહ્યું છે...',
    replaySpoken: 'ફરીથી સાંભળો',
    muteVoice: 'અવાજ બંધ કરો',
    unmuteVoice: 'અવાજ ચાલુ કરો',
    clarifyPrompt: 'પસંદ કરો અથવા બોલો:',
    welcomeGreeting: 'નમસ્તે! હું પાઠશાળા AI છું — તમારો સ્માર્ટ શાળા સહાયક. તમે મને હાજરી અથવા અભ્યાસ વિશે પૂછી શકો છો.',
    quickQuestionsTitle: 'ઝડપી વૉઇસ પ્રશ્નો',

    academicTelemetry: 'મુખ્ય શૈક્ષણિક ટેલિમેટ્રી',
    liveSync: 'લાઈવ સિંક',
    overallAttendance: 'કુલ હાજરી',
    sessions: '૨૧/૨૩ સત્રો',
    safeZone: 'સુરક્ષિત ઝોન (>૭૫%)',
    safeZoneDesc: 'CBSE ૭૫% માપદંડ કરતાં ઉત્તમ',
    trajectoryTitle: '૩-અઠવાડિયાનું વલણ',
    recentShift: 'તાજેતરનો ફેરફાર',
    decliningTrend: 'ઘટતું વલણ',
    trajectoryDesc: 'છેલ્લા ૭ દિવસની સરેરાશ સરખામણી',
    presenceStreak: 'સતત હાજરી',
    consecutive: 'સતત',
    activeStreak: 'સક્રિય સ્ટ્રીક',
    streakDesc: 'ગોલ્ડ બેજ માટે વધુ ૩ દિવસ હાજર રહો',
    daysText: 'દિવસ',

    noticeBoardTitle: 'સત્તાવાર કેમ્પસ નોટિસ બોર્ડ',
    timetableTitle: 'દૈનિક સમયપત્રક અને વર્ગખંડ',
    blackboardTitle: 'ઇન્ટરેક્ટિવ પાઠશાળા બ્લેકબોર્ડ',
    notebookTitle: 'સ્માર્ટ રૂલ્ડ નોટબુક અને પેન',
    homeworkTitle: 'ગૃહકાર્ય અને અસાઇનમેન્ટ લોકર',
    attendanceChartTitle: 'હાજરી વિશ્લેષણ ચાર્ટ',
    aiInsightsTitle: 'પાઠશાળા AI આંતરદૃષ્ટિ',
    earlyWarningRadarTitle: 'ચેતવણી રડાર',
    copilotActionsTitle: 'ભલામણ કરેલ AI કાર્યો',
    badgesTitle: 'શૈક્ષણિક સિદ્ધિ બેજ',

    parentPortalHeader: '૦૨. વાલી પોર્ટલ / parent-portal',
    selectChild: 'બાળક પસંદ કરો',
    callTeacher: 'શિક્ષક સાથે વાતચીત ગોઠવો',
    submitLeave: 'રજાની અરજી મોકલો',
    childAttendanceSummary: 'બાળકની હાજરી સારાંશ',

    mgmtPortalHeader: '૦૩. વ્યવસ્થાપન પોર્ટલ / management-portal',
    staffPortalHeader: '૦૪. શિક્ષક પોર્ટલ / staff-portal',
    classRegister: 'વર્ગ હાજરી રજિસ્ટર',
    markPresent: 'હાજર નોંધો',
    markAbsent: 'ગેરહાજર નોંધો',
    exportReport: 'CBSE રિપોર્ટ ડાઉનલોડ કરો',

    prompts: {
      student: [
        { label: 'મારી હાજરી', text: 'મારી કુલ હાજરી કેટલા ટકા છે?' },
        { label: 'રજાનો ઇતિહાસ', text: 'હું કયા કયા દિવસે ગેરહાજર હતો?' },
        { label: 'પરીક્ષા પાત્રતા', text: 'શું હું ફાઈનલ પરીક્ષા માટે પાત્ર છું?' },
        { label: 'ગણિત પ્રશ્ન', text: 'કાટકોણ ત્રિકોણનો પ્રશ્ન ઉકેલવામાં મદદ કરો' }
      ],
      parent: [
        { label: 'બાળકની હાજરી', text: 'મારા બાળક રાહુલની હાજરી કેટલી છે?' },
        { label: 'ગેરહાજરી વિગત', text: 'રાહુલ કયા કયા દિવસે ગેરહાજર હતો?' },
        { label: 'પરીક્ષા પાત્રતા', text: 'શું રાહુલ પરીક્ષા આપવા યોગ્ય છે?' },
        { label: 'શિક્ષક સાથે વાત', text: 'મારે રાહુલના શિક્ષક સાથે વાત કરવી છે' }
      ],
      teacher: [
        { label: 'ધોરણ ૧૦-A યાદી', text: 'ધોરણ ૧૦-A ની હાજરી બતાવો' },
        { label: 'ગેરહાજર નોંધો', text: 'આજે રાહુલ શર્માને ગેરહાજર નોંધો' },
        { label: 'હાજર નોંધો', text: 'આજે રાહુલ શર્માને હાજર નોંધો' },
        { label: 'ઓછી હાજરી', text: '૭૫% થી ઓછી હાજરી કોની છે?' }
      ],
      principal: [
        { label: 'શાળા રિપોર્ટ', text: 'આખી શાળાનો હાજરી રિપોર્ટ બતાવો' },
        { label: 'મહત્વની ચેતવણી', text: '૭૫% થી ઓછી હાજરી વાળા વિદ્યાર્થીઓ કોણ છે?' },
        { label: 'વર્ગ સરખામણી', text: 'ધોરણ ૧૦-A અને ૧૦-B ની સરખામણી બતાવો' },
        { label: 'વિદ્યાર્થી વિગત', text: 'રાહુલ શર્માનો હાજરી રેકોર્ડ શું છે?' }
      ]
    },

    askAi: 'AI ને પૂછો',
    send: 'મોકલો',
    typeMessagePlaceholder: 'હાજરી અથવા અભ્યાસ વિશે પૂછો...',
    markAttendance: 'હાજરી નોંધો',
    viewReport: 'રિપોર્ટ જુઓ',
    requestCall: 'શિક્ષકને કૉલ વિનંતી',
    autoVoiceEnabled: 'વૉઇસ ચાલુ',
    autoVoiceMuted: 'વૉઇસ બંધ'
  },

  Punjabi: {
    appTitle: 'ਪਾਠਸ਼ਾਲਾ AI',
    appSubtitle: 'ਪਾਠਸ਼ਾਲਾ ਸੀਨੀਅਰ ਸੈਕੰਡਰੀ ਸਕੂਲ',
    campusBadge: 'ਸਮਾਰਟ ਸਕੂਲ AI ਸਹਾਇਕ',
    motto: 'ਵਿਦਿਆ ਦਦਾਤਿ ਵਿਨਯਮ੍',
    periodText: 'ਪੀਰੀਅਡ 2: ਫਿਜ਼ਿਕਸ ਲੈਬ',

    tabStudent: '01. ਵਿਦਿਆਰਥੀ ਪੋਰਟਲ',
    tabParent: '02. ਮਾਪੇ ਪੋਰਟਲ',
    tabPrincipal: '03. ਪ੍ਰਬੰਧਨ ਪੋਰਟਲ',
    tabFaculty: '04. ਅਧਿਆਪਕ ਪੋਰਟਲ',
    tabCopilot: '05. ਪਾਠਸ਼ਾਲਾ AI ਸਹਾਇਕ',

    ecosystemTitle: 'ਸਕੂਲ ERP ਆਰਕੀਟੈਕਚਰ',
    ecosystemSubtitle: 'ਮਾਡਿਊਲਰ ਈਕੋਸਿਸਟਮ: 01. ਵਿਦਿਆਰਥੀ ➔ 02. ਮਾਪੇ ➔ 03. ਪ੍ਰਬੰਧਨ ➔ 04. ਅਧਿਆਪਕ ➔ 05. AI ਕੋਰ',
    ecosystemRepositories: '5 ਰਿਪੋਜ਼ਟਰੀਆਂ',
    ecosystemInteractive: 'ਇੰਟਰਐਕਟਿਵ ਮਲਟੀ-ਪੋਰਟਲ',

    switchRole: 'ਭੂਮਿਕਾ ਬਦਲੋ',
    availableRoles: 'ਉਪਲਬਧ ਭੂਮਿਕਾਵਾਂ',
    personasReady: 'ਪ੍ਰੋਫਾਈਲ ਤਿਆਰ ਹਨ',
    searchPlaceholder: 'ਵਿਦਿਆਰਥੀ, ਅਧਿਆਪਕ, ਮਾਪੇ ਲੱਭੋ...',
    roleStudent: 'ਵਿਦਿਆਰਥੀ',
    roleParent: 'ਮਾਪੇ',
    roleFaculty: 'ਅਧਿਆਪਕ',
    rolePrincipal: 'ਪ੍ਰਿੰਸੀਪਲ',
    allFilter: 'ਸਾਰੇ',

    campusSmartId: 'ਕੈਂਪਸ ਸਮਾਰਟ ਆਈਡੀ',
    verifiedBiometric: 'ਪ੍ਰਮਾਣਿਤ ਬਾਇਓਮੈਟ੍ਰਿਕ ਆਈਡੀ',
    activeStudent: 'ਸਰਗਰਮ ਵਿਦਿਆਰਥੀ',
    registeredParent: 'ਰਜਿਸਟਰਡ ਮਾਪੇ',
    facultyMember: 'ਅਧਿਆਪਕ ਮੈਂਬਰ',
    principalRole: 'ਪ੍ਰਿੰਸੀਪਲ ਅਤੇ ਪ੍ਰਬੰਧਨ',
    rollNo: 'ਰੋਲ ਨੰਬਰ',
    className: 'ਜਮਾਤ',
    house: 'ਹਾਊਸ',
    houseName: 'ਗਰੁੜ (ਪੀਲਾ)',
    bloodGroup: 'ਬਲੱਡ ਗਰੁੱਪ',
    bloodGroupVal: 'O+ ਪਾਜ਼ੀਟਿਵ',
    emergencyContact: 'ਐਮਰਜੈਂਸੀ ਸੰਪਰਕ',
    cbseAffiliation: 'CBSE ਬੋਰਡ ਮਾਨਤਾ ਪ੍ਰਾਪਤ (ਨੰ. 2130842) • ਸੈਸ਼ਨ 2025-26',

    aiAvatarTitle: 'ਪਾਠਸ਼ਾਲਾ AI ਵੌਇਸ ਅਵਤਾਰ',
    aiSubtitle: 'ਲਾਈਵ ਵਿੱਦਿਅਕ ਸਹਾਇਕ',
    speakingRealtime: 'ਲਾਈਵ ਆਵਾਜ਼ ਵਿੱਚ ਬੋਲ ਰਿਹਾ ਹੈ...',
    tapToSpeak: 'ਬੋਲਣ ਲਈ ਟੈਪ ਕਰੋ',
    listening: 'ਤੁਹਾਡੀ ਆਵਾਜ਼ ਸੁਣ ਰਿਹਾ ਹੈ...',
    processing: 'AI ਸੋਚ ਰਿਹਾ ਹੈ...',
    replaySpoken: 'ਦੁਬਾਰਾ ਸੁਣੋ',
    muteVoice: 'ਆਵਾਜ਼ ਬੰਦ ਕਰੋ',
    unmuteVoice: 'ਆਵਾਜ਼ ਚਾਲੂ ਕਰੋ',
    clarifyPrompt: 'ਚੁਣੋ ਜਾਂ ਬੋਲੋ:',
    welcomeGreeting: 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਪਾਠਸ਼ਾਲਾ AI ਹਾਂ — ਤੁਹਾਡਾ ਸਮਾਰਟ ਸਕੂਲ ਸਹਾਇਕ। ਤੁਸੀਂ ਮੈਨੂੰ ਹਾਜ਼ਰੀ ਜਾਂ ਪੜ੍ਹਾਈ ਬਾਰੇ ਪੁੱਛ ਸਕਦੇ ਹੋ।',
    quickQuestionsTitle: 'ਤੁਰੰਤ ਵੌਇਸ ਸਵਾਲ',

    academicTelemetry: 'ਮੁੱਖ ਅਕਾਦਮਿਕ ਟੈਲੀਮੈਟਰੀ',
    liveSync: 'ਲਾਈਵ ਸਿੰਕ',
    overallAttendance: 'ਕੁੱਲ ਹਾਜ਼ਰੀ',
    sessions: '21/23 ਸੈਸ਼ਨ',
    safeZone: 'ਸੁਰੱਖਿਅਤ ਖੇਤਰ (>75%)',
    safeZoneDesc: 'CBSE 75% ਨਿਯਮ ਨਾਲੋਂ ਬਿਹਤਰ',
    trajectoryTitle: '3-ਹਫ਼ਤੇ ਦਾ ਰੁਝਾਨ',
    recentShift: 'ਤਾਜ਼ਾ ਬਦਲਾਅ',
    decliningTrend: 'ਘਟਦਾ ਰੁਝਾਨ',
    trajectoryDesc: 'ਪਿਛਲੇ 7 ਦਿਨਾਂ ਦੀ ਔਸਤ ਤੁਲਨਾ',
    presenceStreak: 'ਲਗਾਤਾਰ ਹਾਜ਼ਰੀ',
    consecutive: 'ਲਗਾਤਾਰ',
    activeStreak: 'ਸਰਗਰਮ ਸਟ੍ਰੀਕ',
    streakDesc: 'ਗੋਲਡ ਬੈਜ ਲਈ ਹੋਰ 3 ਦਿਨ ਹਾਜ਼ਰ ਰਹੋ',
    daysText: 'ਦਿਨ',

    noticeBoardTitle: 'ਅਧਿਕਾਰਤ ਕੈਂਪਸ ਨੋਟਿਸ ਬੋਰਡ',
    timetableTitle: 'ਰੋਜ਼ਾਨਾ ਘੰਟੀ ਸਮਾਂ-ਸਾਰਣੀ',
    blackboardTitle: 'ਇੰਟਰਐਕਟਿਵ ਪਾਠਸ਼ਾਲਾ ਬਲੈਕਬੋਰਡ',
    notebookTitle: 'ਸਮਾਰਟ ਰੂਲਡ ਕਾਪੀ ਤੇ ਡਿਜੀਟਲ ਪੈੱਨ',
    homeworkTitle: 'ਹੋਮਵਰਕ ਅਤੇ ਅਸਾਈਨਮੈਂਟ ਲਾਕਰ',
    attendanceChartTitle: 'ਹਾਜ਼ਰੀ ਵਿਸ਼ਲੇਸ਼ਣ ਚਾਰਟ',
    aiInsightsTitle: 'ਪਾਠਸ਼ਾਲਾ AI ਸੂਝ',
    earlyWarningRadarTitle: 'ਚੇਤਾਵਨੀ ਰਾਡਾਰ',
    copilotActionsTitle: 'ਸਿਫਾਰਸ਼ ਕੀਤੀਆਂ AI ਕਾਰਵਾਈਆਂ',
    badgesTitle: 'ਅਕਾਦਮਿਕ ਪ੍ਰਾਪਤੀ ਬੈਜ',

    parentPortalHeader: '02. ਮਾਪੇ ਪੋਰਟਲ / parent-portal',
    selectChild: 'ਬੱਚਾ ਚੁਣੋ',
    callTeacher: 'ਅਧਿਆਪਕ ਨਾਲ ਗੱਲਬਾਤ ਤੈਅ ਕਰੋ',
    submitLeave: 'ਛੁੱਟੀ ਦੀ ਅਰਜ਼ੀ ਭੇਜੋ',
    childAttendanceSummary: 'ਬੱਚੇ ਦੀ ਹਾਜ਼ਰੀ ਸੰਖੇਪ',

    mgmtPortalHeader: '03. ਪ੍ਰਬੰਧਨ ਪੋਰਟਲ / management-portal',
    staffPortalHeader: '04. ਅਧਿਆਪਕ ਪੋਰਟਲ / staff-portal',
    classRegister: 'ਜਮਾਤ ਹਾਜ਼ਰੀ ਰਜਿਸਟਰ',
    markPresent: 'ਹਾਜ਼ਰ ਲਗਾਓ',
    markAbsent: 'ਗੈਰਹਾਜ਼ਰ ਲਗਾਓ',
    exportReport: 'CBSE ਰਿਪੋਰਟ ਡਾਊਨਲੋਡ ਕਰੋ',

    prompts: {
      student: [
        { label: 'ਮੇਰੀ ਹਾਜ਼ਰੀ', text: 'ਮੇਰੀ ਕੁੱਲ ਹਾਜ਼ਰੀ ਕਿੰਨੇ ਫੀਸਦੀ ਹੈ?' },
        { label: 'ਛੁੱਟੀਆਂ ਦਾ ਇਤਿਹਾਸ', text: 'ਮੈਂ ਕਿਹੜੇ ਦਿਨਾਂ ਵਿੱਚ ਗੈਰਹਾਜ਼ਰ ਰਿਹਾ?' },
        { label: 'ਇਮਤਿਹਾਨ ਯੋਗਤਾ', text: 'ਕੀ ਮੈਂ ਫਾਈਨਲ ਪ੍ਰੀਖਿਆ ਲਈ ਯੋਗ ਹਾਂ?' },
        { label: 'ਹਿਸਾਬ ਦਾ ਸਵਾਲ', text: 'ਸਮਕੋਣ ਤਿਕੋਣ ਦਾ ਸਵਾਲ ਹੱਲ ਕਰਨ ਵਿੱਚ ਮਦਦ ਕਰੋ' }
      ],
      parent: [
        { label: 'ਬੱਚੇ ਦੀ ਹਾਜ਼ਰੀ', text: 'ਮੇਰੇ ਬੱਚੇ ਰਾਹੁਲ ਦੀ ਹਾਜ਼ਰੀ ਕਿੰਨੀ ਹੈ?' },
        { label: 'ਗੈਰਹਾਜ਼ਰੀ ਵੇਰਵਾ', text: 'ਰਾਹੁਲ ਕਿਹੜੇ ਦਿਨ ਸਕੂਲ ਨਹੀਂ ਆਇਆ?' },
        { label: 'ਇਮਤਿਹਾਨ ਯੋਗਤਾ', text: 'ਕੀ ਰਾਹੁਲ ਪ੍ਰੀਖਿਆ ਦੇਣ ਦੇ ਯੋਗ ਹੈ?' },
        { label: 'ਅਧਿਆਪਕ ਨਾਲ ਗੱਲ', text: 'ਮੈਂ ਰਾਹੁਲ ਦੇ ਅਧਿਆਪਕ ਨਾਲ ਗੱਲ ਕਰਨੀ ਚਾਹੁੰਦਾ ਹਾਂ' }
      ],
      teacher: [
        { label: 'ਜਮਾਤ 10-A ਸੂਚੀ', text: 'ਜਮਾਤ 10-A ਦੀ ਹਾਜ਼ਰੀ ਰਿਪੋਰਟ ਦਿਖਾਓ' },
        { label: 'ਗੈਰਹਾਜ਼ਰ ਲਗਾਓ', text: 'ਅੱਜ ਰਾਹੁਲ ਸ਼ਰਮਾ ਨੂੰ ਗੈਰਹਾਜ਼ਰ ਮਾਰਕ ਕਰੋ' },
        { label: 'ਹਾਜ਼ਰ ਲਗਾਓ', text: 'ਅੱਜ ਰਾਹੁਲ ਸ਼ਰਮਾ ਨੂੰ ਹਾਜ਼ਰ ਮਾਰਕ ਕਰੋ' },
        { label: 'ਘੱਟ ਹਾਜ਼ਰੀ', text: '75% ਤੋਂ ਘੱਟ ਹਾਜ਼ਰੀ ਵਾਲੇ ਕੌਣ ਹਨ?' }
      ],
      principal: [
        { label: 'ਸਕੂਲ ਰਿਪੋਰਟ', text: 'ਪੂਰੇ ਸਕੂਲ ਦੀ ਹਾਜ਼ਰੀ ਰਿਪੋਰਟ ਦਿਖਾਓ' },
        { label: 'ਜ਼ਰੂਰੀ ਚੇਤਾਵਨੀ', text: '75% ਤੋਂ ਘੱਟ ਹਾਜ਼ਰੀ ਵਾਲੇ ਵਿਦਿਆਰਥੀ ਕੌਣ ਹਨ?' },
        { label: 'ਜਮਾਤ ਤੁਲਨਾ', text: 'ਜਮਾਤ 10-A ਅਤੇ 10-B ਦੀ ਤੁਲਨਾ ਦਿਖਾਓ' },
        { label: 'ਵਿਦਿਆਰਥੀ ਵੇਰਵਾ', text: 'ਰਾਹੁਲ ਸ਼ਰਮਾ ਦਾ ਹਾਜ਼ਰੀ ਰਿਕਾਰਡ ਕੀ ਹੈ?' }
      ]
    },

    askAi: 'AI ਨੂੰ ਪੁੱਛੋ',
    send: 'ਭੇਜੋ',
    typeMessagePlaceholder: 'ਹਾਜ਼ਰੀ ਜਾਂ ਪੜ੍ਹਾਈ ਬਾਰੇ ਪੁੱਛੋ...',
    markAttendance: 'ਹਾਜ਼ਰੀ ਲਗਾਓ',
    viewReport: 'ਰਿਪੋਰਟ ਦੇਖੋ',
    requestCall: 'ਅਧਿਆਪਕ ਨੂੰ ਕਾਲ ਬੇਨਤੀ',
    autoVoiceEnabled: 'ਵੌਇਸ ਆਨ',
    autoVoiceMuted: 'ਵੌਇਸ ਆਫ'
  },

  Kannada: {
    appTitle: 'ಪಾಠಶಾಲಾ AI',
    appSubtitle: 'ಪಾಠಶಾಲಾ ಹಿರಿಯ ಪ್ರಾಥಮಿಕ ಹಾಗೂ ಪ್ರೌಢಶಾಲೆ',
    campusBadge: 'ಸ್ಮಾರ್ಟ್ ಶಾಲೆ AI ಸಹಾಯಕ',
    motto: 'ವಿದ್ಯಾ ದದಾತಿ ವಿನಯಮ್',
    periodText: 'ಅವಧಿ 2: ಭೌತಶಾಸ್ತ್ರ ಪ್ರಯೋಗಾಲಯ',

    tabStudent: '01. ವಿದ್ಯಾರ್ಥಿ ಪೋರ್ಟಲ್',
    tabParent: '02. ಪಾಲಕರ ಪೋರ್ಟಲ್',
    tabPrincipal: '03. ನಿರ್ವಹಣಾ ಪೋರ್ಟಲ್',
    tabFaculty: '04. ಶಿಕ್ಷಕರ ಪೋರ್ಟಲ್',
    tabCopilot: '05. ಪಾಠಶಾಲಾ AI ಸಹಾಯಕ',

    ecosystemTitle: 'ಶಾಲಾ ERP ಆರ್ಕಿಟೆಕ್ಚರ್',
    ecosystemSubtitle: 'ಮಾಡ್ಯುಲರ್ ಪರಿಸರ: 01. ವಿದ್ಯಾರ್ಥಿ ➔ 02. ಪಾಲಕರು ➔ 03. ಆಡಳಿತ ➔ 04. ಶಿಕ್ಷಕರು ➔ 05. AI ಕೋರ್',
    ecosystemRepositories: '5 ರೆಪೊಸಿಟರಿಗಳು',
    ecosystemInteractive: 'ಸಂವಾದಾತ್ಮಕ ಮಲ್ಟಿ-ಪೋರ್ಟಲ್',

    switchRole: 'ಪಾತ್ರ ಬದಲಾಯಿಸಿ',
    availableRoles: 'ಲಭ್ಯವಿರುವ ಪಾತ್ರಗಳು',
    personasReady: 'ಪ್ರೊಫೈಲ್‌ಗಳು ಸಿದ್ಧವಾಗಿವೆ',
    searchPlaceholder: 'ವಿದ್ಯಾರ್ಥಿ, ಶಿಕ್ಷಕ, ಪಾಲಕರನ್ನು ಹುಡುಕಿ...',
    roleStudent: 'ವಿದ್ಯಾರ್ಥಿ',
    roleParent: 'ಪಾಲಕರು',
    roleFaculty: 'ಶಿಕ್ಷಕರು',
    rolePrincipal: 'ಪ್ರಾಂಶುಪಾಲರು',
    allFilter: 'ಎಲ್ಲಾ',

    campusSmartId: 'ಕ್ಯಾಂಪಸ್ ಸ್ಮಾರ್ಟ್ ಐಡಿ',
    verifiedBiometric: 'ದೃಢೀಕರಿಸಿದ ಬಯೋಮೆಟ್ರಿಕ್ ಐಡಿ',
    activeStudent: 'ಸಕ್ರಿಯ ವಿದ್ಯಾರ್ಥಿ',
    registeredParent: 'ನೋಂದಾಯಿತ ಪಾಲಕರು',
    facultyMember: 'ಶಿಕ್ಷಕ ಸದಸ್ಯ',
    principalRole: 'ಪ್ರಾಂಶುಪಾಲರು ಮತ್ತು ಆಡಳಿತ',
    rollNo: 'ರೋಲ್ ಸಂಖ್ಯೆ',
    className: 'ತರಗತಿ',
    house: 'ಹೌಸ್',
    houseName: 'ಗರುಡ (ಹಳದಿ)',
    bloodGroup: 'ರಕ್ತದ ಗುಂಪು',
    bloodGroupVal: 'O+ ಪಾಸಿಟಿವ್',
    emergencyContact: 'ತುರ್ತು ಸಂಪರ್ಕ',
    cbseAffiliation: 'CBSE ಮಾನ್ಯತೆ ಪಡೆದಿದೆ (ಸಂಖ್ಯೆ 2130842) • ಶೈಕ್ಷಣಿಕ ವರ್ಷ 2025-26',

    aiAvatarTitle: 'ಪಾಠಶಾಲಾ AI ಧ್ವನಿ ಅವತಾರ',
    aiSubtitle: 'ಲೈವ್ ಸಂವಾದಾತ್ಮಕ ಶೈಕ್ಷಣಿಕ ಸಹಾಯಕ',
    speakingRealtime: 'ಲೈವ್ ಧ್ವನಿಯಲ್ಲಿ ಮಾತನಾಡುತ್ತಿದೆ...',
    tapToSpeak: 'ಮಾತನಾಡಲು ಸ್ಪರ್ಶಿಸಿ',
    listening: 'ನಿಮ್ಮ ಧ್ವನಿಯನ್ನು ಆಲಿಸುತ್ತಿದೆ...',
    processing: 'AI ಚಿಂತಿಸುತ್ತಿದೆ...',
    replaySpoken: 'ಮತ್ತೆ ಆಲಿಸಿ',
    muteVoice: 'ಧ್ವನಿ ಮ್ಯೂಟ್ ಮಾಡಿ',
    unmuteVoice: 'ಧ್ವನಿ ಆನ್ ಮಾಡಿ',
    clarifyPrompt: 'ಆಯ್ಕೆಮಾಡಿ ಅಥವಾ ಮಾತನಾಡಿ:',
    welcomeGreeting: 'ನಮಸ್ಕಾರ! ನಾನು ಪಾಠಶಾಲಾ AI — ನಿಮ್ಮ ಸ್ಮಾರ್ಟ್ ಶಾಲಾ ಸಹಾಯಕ. ಹಾಜರಾತಿ ಅಥವಾ ವಿಷಯಗಳ ಬಗ್ಗೆ ನನ್ನನ್ನು ಕೇಳಬಹುದು.',
    quickQuestionsTitle: 'ತ್ವರಿತ ಧ್ವನಿ ಪ್ರಶ್ನೆಗಳು',

    academicTelemetry: 'ಮುಖ್ಯ ಶೈಕ್ಷಣಿಕ ಟೆಲಿಮೆಟ್ರಿ',
    liveSync: 'ಲೈವ್ ಸಿಂಕ್',
    overallAttendance: 'ಒಟ್ಟು ಹಾಜರಾತಿ',
    sessions: '21/23 ಅವಧಿಗಳು',
    safeZone: 'ಸುರಕ್ಷಿತ ವಲಯ (>75%)',
    safeZoneDesc: 'CBSE 75% ಮಾನದಂಡಕ್ಕಿಂತ ಉತ್ತಮವಾಗಿದೆ',
    trajectoryTitle: '3-ವಾರಗಳ ಪ್ರವೃತ್ತಿ',
    recentShift: 'ಇತ್ತೀಚಿನ ಬದಲಾವಣೆ',
    decliningTrend: 'ಇಳಿಕೆಯ ಪ್ರವೃತ್ತಿ',
    trajectoryDesc: 'ಕಳೆದ 7 ದಿನಗಳ ಸರಾಸರಿ ಹೋಲಿಕೆ',
    presenceStreak: 'ನಿರಂತರ ಹಾಜರಾತಿ',
    consecutive: 'ನಿರಂತರ',
    activeStreak: 'ಸಕ್ರಿಯ ಸ್ಟ್ರೀಕ್',
    streakDesc: 'ಚಿನ್ನದ ಬ್ಯಾಡ್ಜ್‌ಗಾಗಿ ಇನ್ನೂ 3 ದಿನಗಳು ಬೇಕು',
    daysText: 'ದಿನಗಳು',

    noticeBoardTitle: 'ಅಧಿಕೃತ ಕ್ಯಾಂಪಸ್ ನೋಟಿಸ್ ಬೋರ್ಡ್',
    timetableTitle: 'ದೈನಂದಿನ ವೇಳಾಪಟ್ಟಿ ಮತ್ತು ತರಗತಿಗಳು',
    blackboardTitle: 'ಸಂವಾದಾತ್ಮಕ ಪಾಠಶಾಲಾ ಕಪ್ಪುಹಲಗೆ',
    notebookTitle: 'ಸ್ಮಾರ್ಟ್ ರೂಲ್ಡ್ ನೋಟ್‌ಬುಕ್ ಮತ್ತು ಪೆನ್',
    homeworkTitle: 'ಮನೆಗೆಲಸ ಮತ್ತು ಕಾರ್ಯಯೋಜನೆಗಳು',
    attendanceChartTitle: 'ಹಾಜರಾತಿ ವಿಶ್ಲೇಷಣೆ ಚಾರ್ಟ್',
    aiInsightsTitle: 'ಪಾಠಶಾಲಾ AI ಒಳನೋಟಗಳು',
    earlyWarningRadarTitle: 'ಮುನ್ನೆಚ್ಚರಿಕೆ ರೇಡಾರ್',
    copilotActionsTitle: 'ಶಿಫಾರಸು ಮಾಡಿದ AI ಕ್ರಮಗಳು',
    badgesTitle: 'ಶೈಕ್ಷಣಿಕ ಸಾಧನೆ ಬ್ಯಾಡ್ಜ್‌ಗಳು',

    parentPortalHeader: '02. ಪಾಲಕರ ಪೋರ್ಟಲ್ / parent-portal',
    selectChild: 'ಮಗುವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    callTeacher: 'ಶಿಕ್ಷಕರೊಂದಿಗೆ ಸಂವಾದ ನಿಗದಿಪಡಿಸಿ',
    submitLeave: 'ರಜೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ',
    childAttendanceSummary: 'ಮಗುವಿನ ಹಾಜರಾತಿ ಸಾರಾಂಶ',

    mgmtPortalHeader: '03. ನಿರ್ವಹಣಾ ಪೋರ್ಟಲ್ / management-portal',
    staffPortalHeader: '04. ಶಿಕ್ಷಕರ ಪೋರ್ಟಲ್ / staff-portal',
    classRegister: 'ತರಗತಿ ಹಾಜರಾತಿ ಪುಸ್ತಕ',
    markPresent: 'ಹಾಜರು ಗುರುತಿಸಿ',
    markAbsent: 'ಗೈರುಹಾಜರು ಗುರುತಿಸಿ',
    exportReport: 'CBSE ವರದಿ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ',

    prompts: {
      student: [
        { label: 'ನನ್ನ ಹಾಜರಾತಿ', text: 'ನನ್ನ ಒಟ್ಟು ಹಾಜರಾತಿ ಶೇಕಡಾವಾರು ಎಷ್ಟು?' },
        { label: 'ಗೈರುಹಾಜರಿ ಇತಿಹಾಸ', text: 'ನಾನು ಯಾವ ದಿನಗಳಲ್ಲಿ ಗೈರುಹಾಜರಾಗಿದ್ದೆ?' },
        { label: 'ಪರೀಕ್ಷಾ ಅರ್ಹತೆ', text: 'ನಾನು ಅಂತಿಮ ಪರೀಕ್ಷೆಗೆ ಅರ್ಹನೇ?' },
        { label: 'ಗಣಿತ ಪ್ರಶ್ನೆ', text: 'ಲಂಬಕೋನ ತ್ರಿಕೋನ ಸಮಸ್ಯೆಯನ್ನು ಪರಿಹರಿಸಲು ಸಹಾಯ ಮಾಡಿ' }
      ],
      parent: [
        { label: 'ಮಗುವಿನ ಹಾಜರಾತಿ', text: 'ನನ್ನ ಮಗು ರಾಹುಲ್‌ನ ಹಾಜರಾತಿ ಎಷ್ಟು?' },
        { label: 'ಗೈರುಹಾಜರಿ ವಿವರ', text: 'ರಾಹುಲ್ ಯಾವ ದಿನಗಳಲ್ಲಿ ಹಾಜರಾಗಿಲ್ಲ?' },
        { label: 'ಪರೀಕ್ಷಾ ಅರ್ಹತೆ', text: 'ರಾಹುಲ್ ಪರೀಕ್ಷೆ ಬರೆಯಲು ಅರ್ಹನೇ?' },
        { label: 'ಶಿಕ್ಷಕರೊಂದಿಗೆ ಮಾತು', text: 'ನಾನು ರಾಹುಲ್‌ನ ಶಿಕ್ಷಕರೊಂದಿಗೆ ಮಾತನಾಡಬೇಕು' }
      ],
      teacher: [
        { label: 'ತರಗತಿ 10-A ಪಟ್ಟಿ', text: 'ತರಗತಿ 10-A ಹಾಜರಾತಿ ವರದಿ ತೋರಿಸಿ' },
        { label: 'ಗೈರುಹಾಜರಿ ಗುರುತಿಸಿ', text: 'ಇಂದು ರಾಹುಲ್ ಶರ್ಮಾನನ್ನು ಗೈರುಹಾಜರು ಮಾಡಿ' },
        { label: 'ಹಾಜರು ಗುರುತಿಸಿ', text: 'ಇಂದು ರಾಹುಲ್ ಶರ್ಮಾನನ್ನು ಹಾಜರು ಮಾಡಿ' },
        { label: 'ಕಡಿಮೆ ಹಾಜರಾತಿ', text: '75% ಗಿಂತ ಕಡಿಮೆ ಹಾಜರಾತಿ ಇರುವವರು ಯಾರು?' }
      ],
      principal: [
        { label: 'ಶಾಲಾ ವರದಿ', text: 'ಇಡೀ ಶಾಲೆಯ ಹಾಜರಾತಿ ವರದಿಯನ್ನು ತೋರಿಸಿ' },
        { label: 'ಪ್ರಮುಖ ಎಚ್ಚರಿಕೆ', text: '75% ಗಿಂತ ಕಡಿಮೆ ಹಾಜರಾತಿ ಇರುವ ವಿದ್ಯಾರ್ಥಿಗಳು ಯಾರು?' },
        { label: 'ತರಗತಿ ಹೋಲಿಕೆ', text: 'ತರಗತಿ 10-A ಮತ್ತು 10-B ಹೋಲಿಕೆ ತೋರಿಸಿ' },
        { label: 'ವಿದ್ಯಾರ್ಥಿ ವಿವರ', text: 'ರಾಹುಲ್ ಶರ್ಮಾನ ಹಾಜರಾತಿ ದಾಖಲೆ ಏನು?' }
      ]
    },

    askAi: 'AI ಅನ್ನು ಕೇಳಿ',
    send: 'ಕಳುಹಿಸಿ',
    typeMessagePlaceholder: 'ಹಾಜರಾತಿ ಅಥವಾ ಪಾಠಗಳ ಬಗ್ಗೆ ಕೇಳಿ...',
    markAttendance: 'ಹಾಜರಾತಿ ಗುರುತಿಸಿ',
    viewReport: 'ವರದಿ ವೀಕ್ಷಿಸಿ',
    requestCall: 'ಶಿಕ್ಷಕರಿಗೆ ಕರೆ ವಿನಂತಿ',
    autoVoiceEnabled: 'ಧ್ವನಿ ಆನ್',
    autoVoiceMuted: 'ಧ್ವನಿ ಆಫ್'
  },

  Malayalam: {
    appTitle: 'പാഠശാല AI',
    appSubtitle: 'പാഠശാല സീനിയർ സെക്കൻഡറി സ്കൂൾ',
    campusBadge: 'സ്മാർട്ട് സ്കൂൾ AI സഹായി',
    motto: 'വിദ്യാ ദദാതി വിനയം',
    periodText: 'പീരിയഡ് 2: ഫിസിക്സ് ലാബ്',

    tabStudent: '01. വിദ്യാർത്ഥി പോർട്ടൽ',
    tabParent: '02. രക്ഷിതാവ് പോർട്ടൽ',
    tabPrincipal: '03. മാനേജ്മെന്റ് പോർട്ടൽ',
    tabFaculty: '04. അധ്യാപക പോർട്ടൽ',
    tabCopilot: '05. പാഠശാല AI സഹായി',

    ecosystemTitle: 'സ്കൂൾ ERP ആർക്കിടെക്ചർ',
    ecosystemSubtitle: 'മോഡുലാർ ആവാസവ്യവസ്ഥ: 01. വിദ്യാർത്ഥി ➔ 02. രക്ഷിതാവ് ➔ 03. മാനേജ്മെന്റ് ➔ 04. അധ്യാപകർ ➔ 05. AI കോർ',
    ecosystemRepositories: '5 സംഭരണികൾ',
    ecosystemInteractive: 'ഇന്ററാക്ടീവ് മൾട്ടി-പോർട്ടൽ',

    switchRole: 'പങ്ക് മാറ്റുക',
    availableRoles: 'ലഭ്യമായ പങ്കുകൾ',
    personasReady: 'പ്രൊഫൈലുകൾ തയ്യാറാണ്',
    searchPlaceholder: 'വിദ്യാർത്ഥി, അധ്യാപകൻ, രക്ഷിതാവ് തിരയുക...',
    roleStudent: 'വിദ്യാർത്ഥി',
    roleParent: 'രക്ഷിതാവ്',
    roleFaculty: 'അധ്യാപകൻ',
    rolePrincipal: 'പ്രിൻസിപ്പൽ',
    allFilter: 'എല്ലാം',

    campusSmartId: 'ക്യാമ്പസ് സ്മാർട്ട് ഐഡി',
    verifiedBiometric: 'സ്ഥിരീകരിച്ച ബയോമെട്രിക് ഐഡി',
    activeStudent: 'സജീവ വിദ്യാർത്ഥി',
    registeredParent: 'രജിസ്റ്റർ ചെയ്ത രക്ഷിതാവ്',
    facultyMember: 'അധ്യാപക അംഗം',
    principalRole: 'പ്രിൻസിപ്പലും മാനേജ്‌മെന്റും',
    rollNo: 'റോൾ നമ്പർ',
    className: 'ക്ലാസ്',
    house: 'ഹൗസ്',
    houseName: 'ഗരുഡ (മഞ്ഞ)',
    bloodGroup: 'രക്തഗ്രൂപ്പ്',
    bloodGroupVal: 'O+ പോസിറ്റീവ്',
    emergencyContact: 'അടിയന്തര ബന്ധപ്പെടൽ',
    cbseAffiliation: 'CBSE അംഗീകാരം (നമ്പർ 2130842) • അധ്യയന വർഷം 2025-26',

    aiAvatarTitle: 'പാഠശാല AI വോയ്സ് അവതാർ',
    aiSubtitle: 'തത്സമയ സംവേദനാത്മക പഠന സഹായി',
    speakingRealtime: 'തത്സമയ ശബ്ദത്തിൽ സംസാരിക്കുന്നു...',
    tapToSpeak: 'സംസാരിക്കാൻ ടാപ്പ് ചെയ്യുക',
    listening: 'നിങ്ങളുടെ ശബ്ദം കേൾക്കുന്നു...',
    processing: 'AI ചിന്തിക്കുന്നു...',
    replaySpoken: 'വീണ്ടും കേൾക്കുക',
    muteVoice: 'ശബ്ദം നിശബ്ദമാക്കുക',
    unmuteVoice: 'ശബ്ദം ഓണാക്കുക',
    clarifyPrompt: 'തിരഞ്ഞെടുക്കുക അല്ലെങ്കിൽ സംസാരിക്കുക:',
    welcomeGreeting: 'നമസ്കാരം! ഞാൻ പാഠശാല AI ആണ് — നിങ്ങളുടെ സ്മാർട്ട് സ്കൂൾ അസിസ്റ്റന്റ്. ഹാജർ അല്ലെങ്കിൽ പഠനവിഷയങ്ങൾ എന്നോട് ചോദിക്കാം.',
    quickQuestionsTitle: 'വേഗതയേറിയ വോയ്സ് ചോദ്യങ്ങൾ',

    academicTelemetry: 'പ്രധാന അക്കാദമിക് ടെലിമെട്രി',
    liveSync: 'തത്സമയ സമന്വയം',
    overallAttendance: 'ആകെ ഹാജർ',
    sessions: '21/23 സെഷനുകൾ',
    safeZone: 'സുരക്ഷിത മേഖല (>75%)',
    safeZoneDesc: 'CBSE 75% മാനദണ്ഡത്തേക്കാൾ മെച്ചപ്പെട്ടത്',
    trajectoryTitle: '3-ആഴ്ചത്തെ പ്രവണത',
    recentShift: 'സമീപകാല മാറ്റം',
    decliningTrend: 'കുറയുന്ന പ്രവണത',
    trajectoryDesc: 'കഴിഞ്ഞ 7 ദിവസത്തെ ശരാശരി താരതമ്യം',
    presenceStreak: 'തുടർച്ചയായ ഹാജർ',
    consecutive: 'തുടർച്ചയായി',
    activeStreak: 'സജീവ സ്ട്രീക്ക്',
    streakDesc: 'ഗോൾഡ് ബാഡ്ജിനായി 3 ദിവസങ്ങൾ കൂടി ഹാജരാകുക',
    daysText: 'ദിവസങ്ങൾ',

    noticeBoardTitle: 'ഔദ്യോഗിക ക്യാമ്പസ് നോട്ടീസ് ബോർഡ്',
    timetableTitle: 'പ്രതിദിന ബെൽ ഷെഡ്യൂളും സമയക്രമവും',
    blackboardTitle: 'ഇന്ററാക്ടീവ് പാഠശാല ബ്ലാക്ക്ബോർഡ്',
    notebookTitle: 'സ്മാർട്ട് റൂൾഡ് നോട്ട്ബുക്കും ഡിജിറ്റൽ പേനയും',
    homeworkTitle: 'ഹോംവർക്ക് & അസൈൻമെന്റ് ലോക്കർ',
    attendanceChartTitle: 'ഹാജർ വിശകലന ചാർട്ട്',
    aiInsightsTitle: 'പാഠശാല AI സ്ഥിതിവിവരക്കണക്കുകൾ',
    earlyWarningRadarTitle: 'മുന്നറിയിപ്പ് റഡാർ',
    copilotActionsTitle: 'ശുപാർശ ചെയ്യുന്ന AI പ്രവർത്തനങ്ങൾ',
    badgesTitle: 'അക്കാദമിക് നേട്ട ബാഡ്ജുകൾ',

    parentPortalHeader: '02. രക്ഷിതാവ് പോർട്ടൽ / parent-portal',
    selectChild: 'കുട്ടിയെ തിരഞ്ഞെടുക്കുക',
    callTeacher: 'അധ്യാപകനുമായി സംസാരിക്കാൻ സമയം നിശ്ചയിക്കുക',
    submitLeave: 'അവധി അപേക്ഷ സമർപ്പിക്കുക',
    childAttendanceSummary: 'കുട്ടിയുടെ ഹാജർ സംഗ്രഹം',

    mgmtPortalHeader: '03. മാനേജ്മെന്റ് പോർട്ടൽ / management-portal',
    staffPortalHeader: '04. അധ്യാപക പോർട്ടൽ / staff-portal',
    classRegister: 'ക്ലാസ് ഹാജർ പുസ്തകം',
    markPresent: 'ഹാജർ രേഖപ്പെടുത്തുക',
    markAbsent: 'അവധി രേഖപ്പെടുത്തുക',
    exportReport: 'CBSE റിപ്പോർട്ട് ഡൗൺലോഡ് ചെയ്യുക',

    prompts: {
      student: [
        { label: 'എന്റെ ഹാജർ', text: 'എനിക്ക് എത്ര ശതമാനം ഹാജറുണ്ട്?' },
        { label: 'അവധി ദിനങ്ങൾ', text: 'ഞാൻ ഏതൊക്കെ ദിവസങ്ങളിൽ അവധിയായിരുന്നു?' },
        { label: 'പരീക്ഷാ യോഗ്യത', text: 'ഞാൻ പരീക്ഷയ്ക്ക് യോഗ്യനാണോ?' },
        { label: 'കണക്ക് ചോദ്യം', text: 'മട്ടത്രികോണ കണക്ക് പരിഹരിക്കാൻ സഹായിക്കുക' }
      ],
      parent: [
        { label: 'കുട്ടിയുടെ ഹാജർ', text: 'എന്റെ കുട്ടി രാഹുലിന്റെ ഹാജർ എത്രയാണ്?' },
        { label: 'അവധി വിവരങ്ങൾ', text: 'രാഹുൽ ഏതൊക്കെ ദിവസങ്ങളിലാണ് വരാതിരുന്നത്?' },
        { label: 'പരീക്ഷാ യോഗ്യത', text: 'രാഹുൽ പരീക്ഷ എഴുതാൻ യോഗ്യനാണോ?' },
        { label: 'അധ്യാപകനുമായി സംസാരം', text: 'എനിക്ക് രാഹുലിന്റെ അധ്യാപകനുമായി സംസാരിക്കണം' }
      ],
      teacher: [
        { label: 'ക്ലാസ് 10-A ഹാജർ', text: 'ക്ലാസ് 10-A യുടെ ഹാജർ കാണിക്കുക' },
        { label: 'അവധി രേഖപ്പെടുത്തുക', text: 'ഇന്ന് രാഹുൽ ശർമ്മയെ ആബ്സെന്റ് ആക്കുക' },
        { label: 'ഹാജർ രേഖപ്പെടുത്തുക', text: 'ഇന്ന് രാഹുൽ ശർമ്മയെ പ്രസന്റ് ആക്കുക' },
        { label: 'കുറഞ്ഞ ഹാജർ', text: '75% ൽ താഴെ ഹാജരുള്ളവർ ആരെല്ലാം?' }
      ],
      principal: [
        { label: 'സ്കൂൾ റിപ്പോർട്ട്', text: 'സ്കൂളിന്റെ ആകെ ഹാജർ വിശകലനം കാണിക്കുക' },
        { label: 'പ്രധാന മുന്നറിയിപ്പ്', text: '75% ൽ താഴെ ഹാജരുള്ള കുട്ടികൾ ആരെല്ലാം?' },
        { label: 'ക്ലാസ് താരതമ്യം', text: 'ക്ലാസ് 10-A, 10-B താരതമ്യം കാണിക്കുക' },
        { label: 'വിദ്യാർത്ഥി വിവരങ്ങൾ', text: 'രാഹുൽ ശർമ്മയുടെ ഹാജർ റെക്കോർഡ് എന്താണ്?' }
      ]
    },

    askAi: 'AI യോട് ചോദിക്കുക',
    send: 'അയക്കുക',
    typeMessagePlaceholder: 'ഹാജർ അല്ലെങ്കിൽ പഠനവിഷയങ്ങൾ ചോദിക്കുക...',
    markAttendance: 'ഹാജർ രേഖപ്പെടുത്തുക',
    viewReport: 'റിപ്പോർട്ട് കാണുക',
    requestCall: 'ടീച്ചർ കോൾ അഭ്യർത്ഥിക്കുക',
    autoVoiceEnabled: 'വോയ്സ് ഓൺ',
    autoVoiceMuted: 'വോയ്സ് ഓഫ്'
  },

  Urdu: {
    appTitle: 'پاٹھ شالا AI',
    appSubtitle: 'پاٹھ شالا سینئر سیکنڈری اسکول',
    campusBadge: 'اسمارٹ اسکول AI معاون',
    motto: 'ودیا دداتی ونیم',
    periodText: 'پیریڈ 2: فزکس لیب',

    tabStudent: '01. طلباء پورٹل',
    tabParent: '02. والدین پورٹل',
    tabPrincipal: '03. انتظامی پورٹل',
    tabFaculty: '04. اساتذہ پورٹل',
    tabCopilot: '05. پاٹھ شالا AI معاون',

    ecosystemTitle: 'اسکول ERP آرکیٹیکچر',
    ecosystemSubtitle: 'ماڈیولر ایکو سسٹم: 01. طالب علم ➔ 02. والدین ➔ 03. انتظامیہ ➔ 04. اساتذہ ➔ 05. AI کور',
    ecosystemRepositories: '5 ذخیرے',
    ecosystemInteractive: 'انٹرایکٹو ملٹی پورٹل',

    switchRole: 'کردار / صارف تبدیل کریں',
    availableRoles: 'دستیاب اسکول کردار',
    personasReady: 'پروفائلز تیار ہیں',
    searchPlaceholder: 'طالب علم، استاد، والدین تلاش کریں...',
    roleStudent: 'طالب علم',
    roleParent: 'والدین',
    roleFaculty: 'استاد',
    rolePrincipal: 'پرنسپل',
    allFilter: 'تمام',

    campusSmartId: 'کیمپس اسمارٹ شناختی کارڈ',
    verifiedBiometric: 'تصدیق شدہ بائیو میٹرک کارڈ',
    activeStudent: 'فعال طالب علم',
    registeredParent: 'رجسٹرڈ والدین',
    facultyMember: 'فیکلٹی ممبر',
    principalRole: 'پرنسپل اور انتظامیہ',
    rollNo: 'رول نمبر',
    className: 'جماعت',
    house: 'ہاؤس',
    houseName: 'گرڑ (پیلا)',
    bloodGroup: 'بلڈ گروپ',
    bloodGroupVal: 'O+ پازیٹو',
    emergencyContact: 'ہنگامی رابطہ',
    cbseAffiliation: 'CBSE الحاق شدہ (نمبر 2130842) • سیشن 2025-26',

    aiAvatarTitle: 'پاٹھ شالا AI وائس اوتار',
    aiSubtitle: 'لائیو انٹرایکٹو تعلیمی معاون',
    speakingRealtime: 'آواز میں جواب دے رہا ہے...',
    tapToSpeak: 'بولنے کے لیے ٹیپ کریں',
    listening: 'آپ کی آواز سن رہا ہے...',
    processing: 'AI سوچ رہا ہے...',
    replaySpoken: 'دوبارہ سنیں',
    muteVoice: 'آواز بند کریں',
    unmuteVoice: 'آواز کھولیں',
    clarifyPrompt: 'آپشن منتخب کریں یا بولیں:',
    welcomeGreeting: 'السلام علیکم! میں پاٹھ شالا اے آئی ہوں — آپ کا اسمارٹ اسکول معاون۔ آپ مجھ سے حاضری، ٹائم ٹیبل یا تعلیمی سوالات پوچھ سکتے ہیں۔',
    quickQuestionsTitle: 'فوری صوتی سوالات',

    academicTelemetry: 'بنیادی تعلیمی ٹیلی میٹری',
    liveSync: 'لائیو مطابقت پذیری',
    overallAttendance: 'مجموعی حاضری',
    sessions: '21/23 سیشن',
    safeZone: 'محفوظ زون (>75%)',
    safeZoneDesc: 'CBSE کے 75% معیار سے بہت بہتر',
    trajectoryTitle: '3-ہفتے کا رجحان',
    recentShift: 'حالیہ تبدیلی',
    decliningTrend: 'گرتا ہوا رجحان',
    trajectoryDesc: 'گزشتہ 7 دنوں کی اوسط سے موازنہ',
    presenceStreak: 'مسلسل حاضری',
    consecutive: 'مسلسل',
    activeStreak: 'فعال سلسلہ',
    streakDesc: 'گولڈ بیج کے لیے مزید 3 دن حاضر رہیں',
    daysText: 'دن',

    noticeBoardTitle: 'سرکاری کیمپس نوٹس بورڈ',
    timetableTitle: 'روزانہ گھنٹی شیڈول اور ٹائم ٹیبل',
    blackboardTitle: 'انٹرایکٹو پاٹھ شالا بلیک بورڈ',
    notebookTitle: 'اسمارٹ رولڈ کاپی اور ڈیجیٹل پین',
    homeworkTitle: 'ہوم ورک اور اسائنمنٹ لاكر',
    attendanceChartTitle: 'حاضری تجزیاتی چارٹ',
    aiInsightsTitle: 'پاٹھ شالا AI بصیرت',
    earlyWarningRadarTitle: 'قبل از وقت وارننگ رڈار',
    copilotActionsTitle: 'تجویز کردہ AI اقدامات',
    badgesTitle: 'تعلیمی اعزازی بیجز',

    parentPortalHeader: '02. والدین پورٹل / parent-portal',
    selectChild: 'بچہ منتخب کریں',
    callTeacher: 'استاد سے بات چیت طے کریں',
    submitLeave: 'چھٹی کی درخواست بھیجیں',
    childAttendanceSummary: 'بچے کی حاضری کا خلاصہ',

    mgmtPortalHeader: '03. انتظامی پورٹل / management-portal',
    staffPortalHeader: '04. اساتذہ پورٹل / staff-portal',
    classRegister: 'کلاس حاضری رجسٹر',
    markPresent: 'حاضر لگائیں',
    markAbsent: 'غیر حاضر لگائیں',
    exportReport: 'CBSE رپورٹ ڈاؤن لوڈ کریں',

    prompts: {
      student: [
        { label: 'میری حاضری', text: 'میری کل حاضری کتنے فیصد ہے؟' },
        { label: 'غیر حاضری کی تاریخ', text: 'میں کن دنوں میں غیر حاضر رہا؟' },
        { label: 'امتحان کی اہلیت', text: 'کیا میں فائنل امتحان کے لیے اہل ہوں؟' },
        { label: 'ریاضی کا سوال', text: 'قائمۃ الزاویہ مثلث کا سوال حل کرنے میں مدد کریں' }
      ],
      parent: [
        { label: 'بچے کی حاضری', text: 'میرے بچے راہل کی حاضری کتنی ہے؟' },
        { label: 'غیر حاضری کی تفصیل', text: 'راہل کس کس دن غیر حاضر تھا؟' },
        { label: 'امتحان کی اہلیت', text: 'کیا راہل امتحان دینے کا اہل ہے؟' },
        { label: 'استاد سے بات', text: 'میں راہل کے استاد سے بات کرنا چاہتا ہوں' }
      ],
      teacher: [
        { label: 'کلاس 10-A حاضری', text: 'کلاس 10-A کی حاضری دکھائیں' },
        { label: 'غیر حاضر لگائیں', text: 'آج راہل شرما کو غیر حاضر مارک کریں' },
        { label: 'حاضر لگائیں', text: 'آج راہل شرما کو حاضر مارک کریں' },
        { label: 'کم حاضری', text: '75% سے کم حاضری والے طلباء کون ہیں؟' }
      ],
      principal: [
        { label: 'اسکول رپورٹ', text: 'پورے اسکول کی حاضری کی رپورٹ دکھائیں' },
        { label: 'اہم الرٹ', text: 'کن طلباء کی حاضری 75% سے کم ہے؟' },
        { label: 'کلاس موازنہ', text: 'کلاس 10-A اور 10-B کا موازنہ دکھائیں' },
        { label: 'طالب علم تلاش', text: 'راہل شرما کا حاضری کا ریکارڈ کیا ہے؟' }
      ]
    },

    askAi: 'AI سے پوچھیں',
    send: 'بھیجیں',
    typeMessagePlaceholder: 'حاضری یا تعلیمی امور کے بارے میں پوچھیں...',
    markAttendance: 'حاضری لگائیں',
    viewReport: 'رپورٹ دیکھیں',
    requestCall: 'استاد سے کال کی درخواست',
    autoVoiceEnabled: 'وائس آن',
    autoVoiceMuted: 'وائس آف'
  }
};

export function getTranslations(langNameOrCode: string): TranslationDict {
  const langDef = getLanguageDefinition(langNameOrCode);
  return TRANSLATIONS[langDef.name] || TRANSLATIONS.English;
}
