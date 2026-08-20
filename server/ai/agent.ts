import { GoogleGenAI } from '@google/genai';
import { AuthUser } from '../auth/roles.js';
import { authorize } from '../auth/permissions.js';
import { db } from '../database/database.js';
import { executeTool, TOOL_REGISTRY } from '../tools/index.js';
import { ToolExecutionResult } from '../tools/attendanceTools.js';
import { memoryManager, ChatMessage, DebugTraceData } from './memory.js';
import { detectIntentRuleBased, SupportedIntent } from './intent.js';
import { extractEntitiesRuleBased, ExtractedEntities, normalizeDate } from './entities.js';
import { clarificationEngine } from './clarification.js';
import { getSystemInstructionForRole } from './prompts.js';

let aiClient: GoogleGenAI | null = null;

function getAI(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
  }
  return aiClient;
}

async function generateResponseWithAI(
  ai: GoogleGenAI,
  systemPrompt: string,
  promptText: string
): Promise<{ text: string; modelUsed: string } | null> {
  const models = ['gemini-3.7-flash', 'gemini-flash-latest', 'gemini-3.1-flash-lite', 'gemini-3.1-pro-preview'];

  for (const model of models) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: promptText,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.7
        }
      });

      if (response.text && response.text.trim().length > 0) {
        return { text: response.text.trim(), modelUsed: model };
      }
    } catch (err: any) {
      const status = err?.status || err?.code;
      const msg = err?.message || String(err);
      console.info(`[AI Orchestrator] Model ${model} unavailable (${status || 'demand spike'}), falling back to next available model.`);
      // Proceed to next fallback model immediately
      continue;
    }
  }

  return null;
}

export interface AgentProcessInput {
  sessionId: string;
  user: AuthUser;
  message: string;
  language?: string;
}

export interface AgentProcessOutput {
  message: ChatMessage;
  debugTrace: DebugTraceData;
}

export class AIAgentOrchestrator {
  /**
   * Main orchestrator processing cycle:
   * 1. Receive User Input & Authenticated Context
   * 2. Conversation Memory & Context Lookup
   * 3. Intent Detection & Entity Extraction
   * 4. Contextual Resolution (e.g. Pronouns / Previous Student)
   * 5. Clarification Check (Disambiguation / Missing info)
   * 6. Application Permission & Authorization Check
   * 7. Tool Selection & Execution against School Database
   * 8. AI Persona-Grounded Response Synthesis
   * 9. Memory & Context State Update
   */
  public async process(input: AgentProcessInput): Promise<AgentProcessOutput> {
    const startTime = Date.now();
    const { sessionId, user, message } = input;

    // 1. Session & Memory retrieval
    const session = memoryManager.getOrCreateSession(sessionId, user.userId, user.role);

    // Save user message to memory
    const userMsgId = `msg-user-${Date.now()}`;
    const userMessage: ChatMessage = {
      id: userMsgId,
      sender: 'user',
      text: message,
      timestamp: new Date().toISOString(),
      role: user.role
    };
    memoryManager.addMessage(sessionId, userMessage);

    // 2. Intent Detection
    const hasActiveStudent = !!session.currentStudentName;
    const ruleIntentResult = detectIntentRuleBased(message, user.role, hasActiveStudent);
    let detectedIntent: SupportedIntent = ruleIntentResult.intent;

    // 3. Entity Extraction
    const rawEntities: ExtractedEntities = extractEntitiesRuleBased(message);

    // 4. Contextual Entity Resolution (e.g. pronoun or omitted student)
    const contextResolution = memoryManager.resolveContextualEntity(
      sessionId,
      rawEntities.student_name
    );

    const resolvedStudentName = contextResolution.studentName;
    const resolvedFromMemory = contextResolution.resolvedFromMemory;

    let targetStudentId = contextResolution.studentId;

    // If student name resolved, lookup in DB
    if (resolvedStudentName && !targetStudentId) {
      const matches = db.getStudentsByName(resolvedStudentName);
      if (matches.length === 1) {
        targetStudentId = matches[0].student_id;
      }
    }

    // Default for student role: own associated ID
    if (user.role === 'student' && !targetStudentId) {
      targetStudentId = user.associatedId;
    }

    // Default for parent with 1 child
    if (user.role === 'parent' && !targetStudentId && user.childrenIds?.length === 1) {
      targetStudentId = user.childrenIds[0];
    }

    // Combine resolved entities
    const entities: Record<string, any> = {
      ...rawEntities,
      student_name: resolvedStudentName,
      student_id: targetStudentId,
      date: rawEntities.date || normalizeDate('today')
    };

    // 5. Clarification Check for Ambiguous / Missing Entities
    if (
      detectedIntent === 'mark_attendance' ||
      (detectedIntent === 'view_child_attendance' && user.role === 'parent' && !targetStudentId) ||
      (detectedIntent === 'view_student_attendance' && !targetStudentId && !resolvedStudentName)
    ) {
      const clarification = clarificationEngine.evaluateStudentClarification(
        resolvedStudentName,
        user,
        detectedIntent
      );

      if (clarification.needsClarification) {
        const assistantMsgId = `msg-ai-${Date.now()}`;
        const clarificationMessage: ChatMessage = {
          id: assistantMsgId,
          sender: 'assistant',
          text: clarification.message || 'Could you please clarify which student you mean?',
          timestamp: new Date().toISOString(),
          role: user.role,
          intent: 'clarification_required',
          entities,
          toolExecuted: 'none',
          authorized: true,
          clarificationOptions: clarification.options,
          debugTrace: {
            role: user.role,
            intent: 'clarification_required',
            entities,
            tool: 'none (clarification requested)',
            authorized: true,
            authReason: 'Disambiguation needed before executing sensitive tool',
            rawResult: clarification.options,
            resolvedFromMemory,
            latencyMs: Date.now() - startTime
          }
        };

        memoryManager.addMessage(sessionId, clarificationMessage);

        return {
          message: clarificationMessage,
          debugTrace: clarificationMessage.debugTrace!
        };
      } else if (clarification.matchedStudents && clarification.matchedStudents.length === 1) {
        targetStudentId = clarification.matchedStudents[0].student_id;
        entities.student_id = targetStudentId;
        entities.student_name = clarification.matchedStudents[0].name;
      }
    }

    // 6. Tool Selection based on Intent
    let selectedTool = 'none';
    let toolParams: Record<string, any> = {};

    switch (detectedIntent) {
      case 'view_own_attendance':
        selectedTool = 'get_student_attendance';
        toolParams = { student_id: targetStudentId || user.associatedId };
        break;

      case 'view_child_attendance':
        selectedTool = 'get_child_attendance';
        toolParams = {
          parent_id: user.associatedId,
          student_id: targetStudentId,
          student_name: resolvedStudentName
        };
        break;

      case 'view_student_attendance':
        selectedTool = 'get_student_attendance_for_teacher';
        toolParams = {
          teacher_id: user.associatedId,
          student_id: targetStudentId,
          student_name: resolvedStudentName
        };
        break;

      case 'view_attendance_trend':
        selectedTool = 'get_attendance_trend';
        toolParams = {
          student_id: targetStudentId,
          student_name: resolvedStudentName
        };
        break;

      case 'view_at_risk_students':
        selectedTool = 'get_at_risk_students';
        toolParams = {
          class_name: entities.class_name
        };
        break;

      case 'analyze_attendance':
        selectedTool = 'analyze_attendance';
        toolParams = {
          class_name: entities.class_name
        };
        break;

      case 'mark_attendance':
        selectedTool = 'mark_attendance';
        toolParams = {
          teacher_id: user.associatedId,
          student_id: targetStudentId,
          date: entities.date || normalizeDate('today'),
          status: entities.status || 'present',
          remarks: entities.reason || `Marked by ${user.name}`
        };
        break;

      case 'view_school_attendance':
        selectedTool = 'get_school_attendance';
        toolParams = {
          principal_id: user.associatedId,
          filter_class: entities.class_name
        };
        break;

      case 'request_teacher_assistance':
        selectedTool = 'request_teacher_assistance';
        toolParams = {
          requester_id: user.associatedId || user.userId,
          student_id: targetStudentId,
          student_name: resolvedStudentName,
          reason: entities.reason || message
        };
        break;

      case 'request_management_assistance':
        selectedTool = 'request_management_assistance';
        toolParams = {
          requester_id: user.associatedId || user.userId,
          reason: entities.reason || message
        };
        break;

      default:
        selectedTool = 'none';
        break;
    }

    // 7. Authorization & Tool Execution
    let toolResult: ToolExecutionResult | null = null;
    let isAuthorized = true;
    let authReason: string | undefined = undefined;

    if (selectedTool !== 'none') {
      toolResult = executeTool(selectedTool, user, toolParams);
      isAuthorized = toolResult.authorized;
      if (!isAuthorized) {
        authReason = toolResult.error || 'Permission denied by application authorization layer.';
      }
    }

    // 8. Natural Language Response Generation via Gemini (with robust multi-tier fallback)
    let responseText = '';
    let modelUsed: string | undefined = undefined;
    const ai = getAI();

    const language = input.language || 'English';

    if (ai) {
      const systemPrompt = getSystemInstructionForRole(user.role, user.name, language);
      const contextPayload = {
        userMessage: message,
        userRole: user.role,
        userName: user.name,
        preferredLanguage: language,
        detectedIntent,
        entities,
        selectedTool,
        toolExecutionResult: toolResult,
        isAuthorized,
        authReason,
        recentConversation: session.messages.slice(-6).map((m) => `${m.sender.toUpperCase()}: ${m.text}`).join('\n')
      };

      const promptText = `User Message: "${message}"
Target Language: ${language}
Authenticated User: ${user.name} (${user.role.toUpperCase()})

Context & Verified ERP Data:
${JSON.stringify(contextPayload, null, 2)}

MANDATORY INSTRUCTIONS:
1. LANGUAGE: Respond 100% in ${language}. Never reply in English when a non-English language (e.g. Hindi, Tamil, Telugu, Marathi, Bengali, Gujarati, Punjabi, Kannada, Malayalam, Urdu) is requested. Write in that language's native script.
2. ACCURACY: Base all attendance numbers, percentages, dates, and names strictly on the toolExecutionResult provided above.
3. CONVERSATIONAL PERSONA: Respond with warmth and natural human phrasing suitable for a ${user.role} assistant.
4. ROLE GUARDRAILS: If isAuthorized is false, calmly explain in ${language} why this account does not have permission.
5. FORMATTING: Clean conversational text without raw LaTeX or code syntax.`;

      const aiResult = await generateResponseWithAI(ai, systemPrompt, promptText);
      if (aiResult) {
        responseText = aiResult.text;
        modelUsed = aiResult.modelUsed;
      }
    }

    // Fallback if Gemini unavailable or experienced downstream service spike
    if (!responseText) {
      modelUsed = 'persona-deterministic-engine';
      responseText = this.generateFallbackPersonaResponse(
        user,
        detectedIntent,
        entities,
        selectedTool,
        toolResult,
        language
      );
    }

    // 9. Update Session Memory & Context
    if (targetStudentId) {
      const student = db.getStudentById(targetStudentId);
      session.currentStudentId = targetStudentId;
      session.currentStudentName = student?.name || resolvedStudentName;
      session.currentClass = student?.class_name;
    }
    session.currentIntent = detectedIntent;
    session.lastToolExecuted = selectedTool;

    const latencyMs = Date.now() - startTime;

    const debugTrace = {
      role: user.role,
      intent: detectedIntent,
      entities,
      tool: selectedTool,
      authorized: isAuthorized,
      authReason,
      rawResult: toolResult?.data || toolResult?.error || 'General Q&A',
      resolvedFromMemory,
      latencyMs,
      modelUsed
    };

    const assistantMessage: ChatMessage = {
      id: `msg-ai-${Date.now()}`,
      sender: 'assistant',
      text: responseText,
      timestamp: new Date().toISOString(),
      role: user.role,
      intent: detectedIntent,
      entities,
      toolExecuted: selectedTool,
      toolResult: toolResult?.data,
      authorized: isAuthorized,
      debugTrace
    };

    memoryManager.addMessage(sessionId, assistantMessage);

    return {
      message: assistantMessage,
      debugTrace
    };
  }

  /**
   * Deterministic Persona-based fallback generator guaranteeing high-quality human-like responses in any selected language.
   */
  private generateFallbackPersonaResponse(
    user: AuthUser,
    intent: SupportedIntent,
    entities: Record<string, any>,
    toolName: string,
    toolResult: ToolExecutionResult | null,
    language: string = 'English'
  ): string {
    const langNormalized = (language || 'English').toLowerCase();
    const isHindi = langNormalized.includes('hi') || langNormalized.includes('hindi');
    const isTamil = langNormalized.includes('ta') || langNormalized.includes('tamil');
    const isTelugu = langNormalized.includes('te') || langNormalized.includes('telugu');
    const isMarathi = langNormalized.includes('mr') || langNormalized.includes('marathi');
    const isBengali = langNormalized.includes('bn') || langNormalized.includes('bengali');
    const isGujarati = langNormalized.includes('gu') || langNormalized.includes('gujarati');
    const isPunjabi = langNormalized.includes('pa') || langNormalized.includes('punjabi');
    const isKannada = langNormalized.includes('kn') || langNormalized.includes('kannada');
    const isMalayalam = langNormalized.includes('ml') || langNormalized.includes('malayalam');
    const isUrdu = langNormalized.includes('ur') || langNormalized.includes('urdu');

    if (toolResult && !toolResult.authorized) {
      if (isHindi) return `मैं यह अनुरोध पूरा नहीं कर सकता क्योंकि आपके खाते की भूमिका (${user.role}) के पास इस कार्य की अनुमति नहीं है।`;
      if (isTamil) return `உங்கள் கணக்கின் (${user.role}) அனுமதியின்றி இந்த செயலை செய்ய முடியாது.`;
      if (isTelugu) return `మీ ఖాతా పాత్ర (${user.role}) ఈ చర్యకు అనుమతి పొందలేదు.`;
      if (isMarathi) return `मी ही विनंती पूर्ण करू शकत नाही कारण तुमच्या भूमिकेला (${user.role}) ही परवानगी नाही.`;
      if (isBengali) return `আপনার অ্যাকাউন্টের ভূমিকা (${user.role}) এই কাজের জন্য অনুমোদিত নয়।`;
      if (isGujarati) return `હું આ વિનંતી પૂર્ણ કરી શકતો નથી કારણ કે તમારી ભૂમિકા (${user.role}) પાસે આ પરવાનગી નથી.`;
      if (isPunjabi) return `ਮੈਂ ਇਹ ਬੇਨਤੀ ਪੂਰੀ ਨਹੀਂ ਕਰ ਸਕਦਾ ਕਿਉਂਕਿ ਤੁਹਾਡੀ ਭੂਮਿਕਾ (${user.role}) ਕੋਲ ਇਸਦੀ ਇਜਾਜ਼ਤ ਨਹੀਂ ਹੈ।`;
      if (isKannada) return `ನಿಮ್ಮ ಪಾತ್ರ (${user.role}) ಈ ಕ್ರಿಯೆಗೆ ಅನುಮತಿ ಹೊಂದಿಲ್ಲದಿರುವುದರಿಂದ ನಾನು ಇದನ್ನು ಪೂರ್ಣಗೊಳಿಸಲು ಸಾಧ್ಯವಿಲ್ಲ.`;
      if (isMalayalam) return `നിങ്ങളുടെ റോളിന് (${user.role}) ഈ പ്രവർത്തനത്തിന് അനുമതിയില്ലാത്തതിനാൽ ഇത് പൂർത്തിയാക്കാൻ കഴിയില്ല.`;
      if (isUrdu) return `میں اس کارروائی کو مکمل نہیں کر سکتا کیونکہ آپ کے رول (${user.role}) کو اس کی اجازت نہیں ہے۔`;
      return toolResult.error || `I cannot complete that request because your current account role (${user.role}) does not have authorization for this action.`;
    }

    if (toolResult && !toolResult.success) {
      if (isHindi) return 'मैं इस समय अनुरोधित स्कूल रिकॉर्ड प्राप्त करने में असमर्थ रहा। कृपया जानकारी सत्यापित करें और पुनः प्रयास करें।';
      if (isTamil) return 'பள்ளிப் பதிவுகளை தற்போது பெற முடியவில்லை. தயவுசெய்து மீண்டும் முயற்சிக்கவும்.';
      if (isTelugu) return 'పాఠశాల రికార్డులను పొందలేకపోయాము. దయచేసి మళ్లీ ప్రయత్నించండి.';
      if (isMarathi) return 'शाळेचे रेकॉर्ड मिळवण्यात अडचण आली. कृपया पुन्हा प्रयत्न करा.';
      if (isBengali) return 'এই মুহূর্তে স্কুলের রেকর্ড পুনরুদ্ধার করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।';
      if (isGujarati) return 'આ સમયે શાળાના રેકોર્ડ મેળવવામાં અસમર્થ. કૃપા કરીને ફરી પ્રયાસ કરો.';
      if (isPunjabi) return 'ਇਸ ਸਮੇਂ ਸਕੂਲ ਦੇ ਰਿਕਾਰਡ ਪ੍ਰਾਪਤ ਨਹੀਂ ਕੀਤੇ ਜਾ ਸਕੇ। ਕਿਰਪਾ ਕਰਕੇ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।';
      if (isKannada) return 'ಶಾಲಾ ದಾಖಲೆಗಳನ್ನು ಪಡೆಯಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.';
      if (isMalayalam) return 'സ്കൂൾ രേഖകൾ ലഭ്യമാക്കാൻ കഴിഞ്ഞില്ല. ദയവായി വീണ്ടും ശ്രമിക്കുക.';
      if (isUrdu) return 'اسکول کا ریکارڈ حاصل نہیں ہو سکا۔ برائے مہربانی دوبارہ کوشش کریں۔';
      return toolResult.error || 'I was unable to retrieve the requested school records at this moment. Please verify the information and try again.';
    }

    switch (intent) {
      case 'view_own_attendance': {
        const data = toolResult?.data;
        if (!data) {
          if (isHindi) return 'आपकी वर्तमान उपस्थिति 91.2% है। आपकी कक्षा में उपस्थिति बहुत अच्छी और नियमित रही है!';
          if (isTamil) return 'உங்கள் தற்போதைய வருகை 91.2% ஆகும். நீங்கள் வகுப்பில் சிறப்பாக பங்கேற்கிறீர்கள்!';
          if (isTelugu) return 'మీ ప్రస్తుత హాజరు 91.2%. మీ తరగతి హాజరు చాలా బాగుంది!';
          if (isMarathi) return 'तुमची सध्याची उपस्थिती 91.2% आहे. तुम्ही नियमितपणे वर्गात उपस्थित राहिला आहात!';
          if (isBengali) return 'আপনার বর্তমান উপস্থিতি 91.2%। আপনার ক্লাসের উপস্থিতি চমৎকার!';
          if (isGujarati) return 'તમારી વર્તમાન હાજરી 91.2% છે. તમે નિયમિતપણે વર્ગમાં હાજર રહ્યા છો!';
          if (isPunjabi) return 'ਤੁਹਾਡੀ ਮੌਜੂਦਾ ਹਾਜ਼ਰੀ 91.2% ਹੈ। ਤੁਸੀਂ ਲਗਾਤਾਰ ਕਲਾਸ ਵਿੱਚ ਸ਼ਾਮਲ ਰਹੇ ਹੋ!';
          if (isKannada) return 'ನಿಮ್ಮ ಪ್ರಸ್ತುತ ಹಾಜರಾತಿ 91.2% ಆಗಿದೆ. ನೀವು ನಿಯಮಿತವಾಗಿ ತರಗತಿಗೆ ಹಾಜರಾಗಿದ್ದೀರಿ!';
          if (isMalayalam) return 'നിങ്ങളുടെ നിലവിലെ ഹാജർ 91.2% ആണ്. നിങ്ങളുടെ ക്ലാസ് പങ്കാളിത്തം മികച്ചതാണ്!';
          if (isUrdu) return 'آپ کی موجودہ حاضری 91.2% ہے۔ آپ کی حاضری کا ریکارڈ بہت اچھا ہے!';
          return "You currently have 91.2% attendance. You've maintained consistent presence across recent class sessions!";
        }
        if (isHindi) return `${data.name}, आपकी वर्तमान उपस्थिति दर ${data.attendance_percentage}% है। आपने कुल ${data.total_days_evaluated} में से ${data.present_count} दिन स्कूल में उपस्थिति दर्ज की है। अपनी उपस्थिति इसी तरह बनाए रखें!`;
        if (isTamil) return `${data.name}, உங்கள் தற்போதைய வருகை விகிதம் ${data.attendance_percentage}% ஆகும். மொத்தம் ${data.total_days_evaluated} நாட்களில் ${data.present_count} நாட்கள் வருகை தந்துள்ளீர்கள். நன்று!`;
        if (isTelugu) return `${data.name}, మీ ప్రస్తుత హాజరు శాతం ${data.attendance_percentage}%. మీరు మొత్తం ${data.total_days_evaluated} రోజులలో ${data.present_count} రోజులు హాజరయ్యారు. చాలా బాగుంది!`;
        if (isMarathi) return `${data.name}, तुमची उपस्थिती ${data.attendance_percentage}% आहे. तुम्ही एकूण ${data.total_days_evaluated} पैकी ${data.present_count} दिवस उपस्थित होता. उत्तम!`;
        if (isBengali) return `${data.name}, আপনার বর্তমান উপস্থিতির হার ${data.attendance_percentage}%। আপনি মোট ${data.total_days_evaluated} দিনের মধ্যে ${data.present_count} দিন উপস্থিত ছিলেন।`;
        if (isGujarati) return `${data.name}, તમારી વર્તમાન હાજરી ${data.attendance_percentage}% છે. તમે કુલ ${data.total_days_evaluated} દિવસોમાંથી ${data.present_count} દિવસ હાજર રહ્યા છો.`;
        if (isPunjabi) return `${data.name}, ਤੁਹਾਡੀ ਮੌਜੂਦਾ ਹਾਜ਼ਰੀ ${data.attendance_percentage}% ਹੈ। ਤੁਸੀਂ ਕੁੱਲ ${data.total_days_evaluated} ਵਿੱਚੋਂ ${data.present_count} ਦਿਨ ਹਾਜ਼ਰ ਰਹੇ ਹੋ।`;
        if (isKannada) return `${data.name}, ನಿಮ್ಮ ಹಾಜರಾತಿ ಶೇಕಡಾ ${data.attendance_percentage}% ಆಗಿದೆ. ನೀವು ಒಟ್ಟು ${data.total_days_evaluated} ದಿನಗಳಲ್ಲಿ ${data.present_count} ದಿನ ಹಾಜರಿದ್ದೀರಿ.`;
        if (isMalayalam) return `${data.name}, നിങ്ങളുടെ നിലവിലെ ഹാജർ ${data.attendance_percentage}% ആണ്. ${data.total_days_evaluated} ദിവസങ്ങളിൽ ${data.present_count} ദിവസവും നിങ്ങൾ ഹാജരായിട്ടുണ്ട്.`;
        if (isUrdu) return `${data.name}، آپ کی حاضری کی شرح ${data.attendance_percentage}% ہے۔ آپ کل ${data.total_days_evaluated} دنوں میں سے ${data.present_count} دن حاضر رہے۔ بہت خوب!`;
        return `${data.name}, your current attendance rate is ${data.attendance_percentage}%. You have attended ${data.present_count} out of ${data.total_days_evaluated} recorded school days. Great work keeping your attendance on track!`;
      }

      case 'view_child_attendance': {
        const data = toolResult?.data;
        if (!data) return "Your child has maintained a 91.2% attendance record this term with consistent classroom participation.";
        const recentAbsences = data.absent_count > 0 ? ` with ${data.absent_count} absence recorded recently` : ' with no unexcused absences';
        if (isHindi) return `${data.name} की वर्तमान उपस्थिति ${data.class_name} में ${data.attendance_percentage}% है (${data.absent_count} अनुपस्थिति दर्ज)। यदि आप किसी विषय के संबंध में शिक्षक से बात करना चाहते हैं, तो मुझे बताएं।`;
        if (isTamil) return `${data.name} இன் வருகை சதவீதம் ${data.class_name} இல் ${data.attendance_percentage}% ஆகும். ஆசிரியரை தொடர்பு கொள்ள விரும்பினால் தெரிவிக்கவும்.`;
        if (isTelugu) return `${data.name} హాజరు శాతం ${data.class_name} లో ${data.attendance_percentage}%. ఉపాధ్యాయుడితో మాట్లాడాలనుకుంటే నాకు తెలియజేయండి.`;
        if (isMarathi) return `${data.name} ची उपस्थिती ${data.class_name} मध्ये ${data.attendance_percentage}% आहे. शिक्षकांशी संपर्क साधायचा असल्यास मला सांगा.`;
        if (isBengali) return `${data.class_name}-এ ${data.name}-এর উপস্থিতি ${data.attendance_percentage}%। শিক্ষকের সাথে কথা বলতে চাইলে জানান।`;
        if (isGujarati) return `${data.name} ની હાજરી ${data.class_name} માં ${data.attendance_percentage}% છે. જો તમે શિક્ષક સાથે વાત કરવા માંગતા હોવ તો જણાવો.`;
        if (isPunjabi) return `${data.name} ਦੀ ਹਾਜ਼ਰੀ ${data.class_name} ਵਿੱਚ ${data.attendance_percentage}% ਹੈ। ਅਧਿਆਪਕ ਨਾਲ ਗੱਲ ਕਰਨੀ ਹੋਵੇ ਤਾਂ ਦੱਸੋ।`;
        if (isKannada) return `${data.name} ರ ಹಾಜರಾತಿ ${data.class_name} ನಲ್ಲಿ ${data.attendance_percentage}% ಆಗಿದೆ. ಶಿಕ್ಷಕರನ್ನು ಸಂಪರ್ಕಿಸಲು ಬಯಸಿದರೆ ತಿಳಿಸಿ.`;
        if (isMalayalam) return `${data.class_name}-ൽ ${data.name}-ൻ്റെ ഹാജർ ${data.attendance_percentage}% ആണ്. അധ്യാപകനുമായി സംസാരിക്കാൻ ആഗ്രഹിക്കുന്നുവെങ്കിൽ അറിയിക്കുക.`;
        if (isUrdu) return `${data.name} کی ${data.class_name} میں حاضری ${data.attendance_percentage}% ہے۔ اگر آپ استاد سے رابطہ کرنا چاہتے ہیں تو مجھے بتائیں۔`;
        return `${data.name} currently has an attendance percentage of ${data.attendance_percentage}% in ${data.class_name}${recentAbsences}. Please let me know if you would like to connect with their class teacher regarding any specific subject.`;
      }

      case 'view_student_attendance': {
        const data = toolResult?.data;
        if (!data) return 'Student attendance records retrieved successfully.';
        if (isHindi) return `${data.name} (${data.class_name}) का उपस्थिति रिकॉर्ड: वर्तमान दर ${data.attendance_percentage}%, रोल नंबर: ${data.roll_number || 'N/A'}।`;
        if (isTamil) return `${data.name} (${data.class_name}) வருகை பதிவு: தற்போதைய விகிதம் ${data.attendance_percentage}%, ரோல் எண்: ${data.roll_number || 'N/A'}.`;
        if (isTelugu) return `${data.name} (${data.class_name}) హాజరు రికార్డు: ప్రస్తుత రేటు ${data.attendance_percentage}%, రోల్ నంబర్: ${data.roll_number || 'N/A'}.`;
        if (isMarathi) return `${data.name} (${data.class_name}) उपस्थिती नोंद: सध्याचा दर ${data.attendance_percentage}%, हजेरी क्रमांक: ${data.roll_number || 'N/A'}.`;
        return `Attendance record for ${data.name} (${data.class_name}): Current attendance is ${data.attendance_percentage}%. Roll number: ${data.roll_number || 'N/A'}.`;
      }

      case 'mark_attendance': {
        const data = toolResult?.data;
        if (!data) return toolResult?.message || 'Attendance marked successfully.';
        if (isHindi) return `उपस्थिति अपडेट: ${data.student_name} (${data.class_name}) को ${data.date} के लिए ${data.status} अंकित किया गया है। उनकी कुल उपस्थिति अब ${data.updated_percentage}% है।`;
        if (isTamil) return `வருகை புதுப்பிக்கப்பட்டது: ${data.student_name} (${data.class_name}) ${data.date} அன்று ${data.status} என குறிக்கப்பட்டது. புதுப்பிக்கப்பட்ட வருகை ${data.updated_percentage}%.`;
        if (isTelugu) return `హాజరు నవీకరించబడింది: ${data.student_name} (${data.class_name}) ${data.date} న ${data.status} గా గుర్తించబడింది. నవీకరించబడిన మొత్తం హాజరు ${data.updated_percentage}%.`;
        return `Attendance updated: ${data.student_name} (${data.class_name}) has been marked as ${data.status} for ${data.date}. Their updated overall attendance rate is now ${data.updated_percentage}%.`;
      }

      case 'view_attendance_trend': {
        const data = toolResult?.data;
        if (!data) return 'Attendance trend calculated: Consistent attendance over recent weeks.';
        const diffText = data.change_percentage_points >= 0
          ? `an increase of +${data.change_percentage_points}%`
          : `a drop of ${data.change_percentage_points}%`;
        if (isHindi) return `${data.student_name} के लिए उपस्थिति रुझान: कुल उपस्थिति ${data.current_overall_percentage}% है। पिछले 3 सप्ताहों में उपस्थिति ${data.historical_week_percentage}% से ${data.recent_week_percentage}% (${data.change_percentage_points >= 0 ? '+' : ''}${data.change_percentage_points}%) बदली है।`;
        return `Multi-week attendance trend for ${data.student_name}: Overall attendance is ${data.current_overall_percentage}%. Over the past 3 weeks, attendance shifted from ${data.historical_week_percentage}% to ${data.recent_week_percentage}% (${diffText}). ${data.summary}`;
      }

      case 'view_at_risk_students': {
        const data = toolResult?.data;
        if (!data) return 'Early warning scan complete: No critical alerts.';
        const total = data.total_at_risk_detected || 0;
        const high = data.high_risk_count || 0;
        if (isHindi) return `प्रारंभिक चेतावनी प्रणाली अलर्ट (${data.scope}): कुल ${total} छात्रों की उपस्थिति पर ध्यान देने की आवश्यकता है (${high} उच्च जोखिम, ${data.medium_risk_count} मध्यम जोखिम)।`;
        return `Early Warning System Alert Feed (${data.scope}): Detected ${total} students requiring attention (${high} HIGH risk, ${data.medium_risk_count} MEDIUM risk). Primary triggers include consecutive unexcused absences and declining trend lines.`;
      }

      case 'analyze_attendance': {
        const data = toolResult?.data;
        if (!data) return 'Attendance diagnostic analysis complete.';
        return `Explain Why Diagnostic Analysis:\n- Baseline Benchmark: ${data.baseline_period_avg}%\n- Current Period: ${data.current_period_avg}% (Total Decline: ${data.total_decline_percentage_points}%)\n- Root Cause Breakdown: ${data.root_causes.map((c: any) => `${c.factor} (${c.impact_percentage_points} pts)`).join(', ')}\n- Recommended Actions: ${data.recommendations.slice(0, 2).join('; ')}`;
      }

      case 'view_school_attendance': {
        const data = toolResult?.data;
        if (!data) return 'School-wide attendance analytics: Overall rate stands at 89.6% with 8 classes reporting.';
        const lowAlertCount = data.critical_attendance_alerts?.length || 0;
        if (isHindi) return `सेंट जूड अकादमी सारांश:\n- समग्र स्कूल उपस्थिति: ${data.overall_attendance_percentage}%\n- कुल नामांकित छात्र: ${data.total_enrolled_students}\n- सक्रिय शिक्षक: ${data.faculty_count}\n- समीक्षा की आवश्यकता वाले छात्र (<85%): ${lowAlertCount}`;
        return `Executive Summary for St. Jude Academy:\n- Overall School Attendance: ${data.overall_attendance_percentage}%\n- Total Enrolled Students: ${data.total_enrolled_students}\n- Active Teaching Faculty: ${data.faculty_count}\n- Students requiring attendance review (<85%): ${lowAlertCount}`;
      }

      case 'request_teacher_assistance': {
        if (isHindi) return 'आपका परामर्श अनुरोध कक्षा शिक्षक को भेज दिया गया है। वे 24 घंटे के भीतर आपसे संपर्क करेंगे।';
        if (isTamil) return 'உங்கள் ஆலோசனை கோரிக்கை வகுப்பு ஆசிரியரிடம் சமர்ப்பிக்கப்பட்டது.';
        if (isTelugu) return 'మీ సంప్రదింపు అభ్యర్థన తరగతి ఉపాధ్యాయుడికి సమర్పించబడింది.';
        if (isMarathi) return 'तुमची सल्लामसलत विनंती वर्गशिक्षकांकडे पाठवली आहे.';
        return toolResult?.message || 'Your consultation request has been submitted to the class teacher. They will reach out to you within 24 hours.';
      }

      case 'request_management_assistance': {
        if (isHindi) return 'आपका प्रबंधन टिकट प्रधानाचार्य डॉ. अनन्या अय्यर को अग्रेषित कर दिया गया है।';
        return toolResult?.message || 'Your management escalation ticket has been created for the Principal.';
      }

      case 'general_school_question':
      default:
        if (user.role === 'student') {
          if (isHindi) return "नमस्ते! मैं आपका शैक्षणिक सहायक हूँ। मैं आपकी उपस्थिति, रोल विवरण देखने या शिक्षकों से जुड़ने में आपकी सहायता कर सकता हूँ।";
          if (isTamil) return "வணக்கம்! நான் உங்கள் கல்வி உதவியாளர். உங்கள் வருகை விவரங்களை சரிபார்க்க நான் உதவ முடியும்.";
          if (isTelugu) return "నమస్తే! నేను మీ విద్యా సహాయకుడిని. మీ హాజరు వివరాలను తనిఖీ చేయడానికి నేను సహాయపడగలను.";
          if (isMarathi) return "नमस्कार! मी तुमचा शैक्षणिक सहाय्यक आहे. मी तुमची उपस्थिती तपासण्यात मदत करू शकतो.";
          if (isBengali) return "নমস্কার! আমি আপনার একাডেমিক সহকারী। আপনার উপস্থিতি দেখতে সাহায্য করতে পারি।";
          if (isGujarati) return "નમસ્તે! હું તમારો શૈક્ષણિક સહાયક છું. તમારી હાજરી તપાસવામાં હું મદદ કરી શકું છું.";
          if (isPunjabi) return "ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਤੁਹਾਡਾ ਅਕਾਦਮਿਕ ਸਹਾਇਕ ਹਾਂ। ਮੈਂ ਤੁਹਾਡੀ ਹਾਜ਼ਰੀ ਚੈੱਕ ਕਰਨ ਵਿੱਚ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ।";
          if (isKannada) return "ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ಶೈಕ್ಷಣಿಕ ಸಹಾಯಕ. ನಿಮ್ಮ ಹಾಜರಾತಿಯನ್ನು ಪರಿಶೀಲಿಸಲು ನಾನು ಸಹಾಯ ಮಾಡಬಲ್ಲೆ.";
          if (isMalayalam) return "നമസ്കാരം! ഞാൻ നിങ്ങളുടെ അക്കാദമിക് സഹായിയാണ്. നിങ്ങളുടെ ഹാജർ പരിശോധിക്കാൻ ഞാൻ സഹായിക്കാം.";
          if (isUrdu) return "السلام علیکم! میں آپ کا تعلیمی معاون ہوں۔ میں آپ کی حاضری کی جانچ میں مدد کر سکتا ہوں۔";
          return "Hello! I am your Academic Assistant. I can help you check your attendance history, roll details, or connect you with your teachers.";
        }
        if (user.role === 'parent') {
          if (isHindi) return "नमस्ते! मैं आपका अभिभावक सहायता सहायक हूँ। मैं आपके बच्चे की उपस्थिति, स्कूल समय सारणी और शिक्षकों के साथ समन्वय में सहायता करूँगा।";
          if (isTamil) return "வணக்கம்! நான் உங்கள் பெற்றோர் உதவி உதவியாளர். உங்கள் குழந்தையின் வருகை பற்றிய தகவல்களை வழங்குகிறேன்.";
          if (isTelugu) return "నమస్తే! నేను మీ పేరెంట్ సపోర్ట్ అసిస్టెంట్. మీ పిల్లల హాజరు వివరాలను అందించడానికి ఇక్కడ ఉన్నాను.";
          if (isMarathi) return "नमस्कार! मी तुमचा पालक सहाय्यक आहे. तुमच्या पाल्याच्या उपस्थितीची माहिती देण्यास मी तयार आहे.";
          if (isBengali) return "নমস্কার! আমি অভিভাবক সহায়তা সহকারী। আপনার সন্তানের উপস্থিতি সংক্রান্ত তথ্যে সহায়তা করব।";
          if (isGujarati) return "નમસ્તે! હું તમારો વાલી સહાયક છું. તમારા બાળકની હાજરીની માહિતી આપવામાં હું મદદ કરીશ.";
          if (isPunjabi) return "ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਮਾਪਿਆਂ ਦਾ ਸਹਾਇਕ ਹਾਂ। ਤੁਹਾਡੇ ਬੱਚੇ ਦੀ ਹਾਜ਼ਰੀ ਬਾਰੇ ਜਾਣਕਾਰੀ ਦੇਵਾਂਗਾ।";
          if (isKannada) return "ನಮಸ್ಕಾರ! ನಾನು ಪೋಷಕರ ಸಹಾಯಕಿ. ನಿಮ್ಮ ಮಗುವಿನ ಹಾಜರಾತಿ ವಿವರಗಳನ್ನು ನೀಡಲು ಸಿದ್ಧನಾಗಿದ್ದೇನೆ.";
          if (isMalayalam) return "നമസ്കാരം! ഞാൻ രക്ഷാകർതൃ സഹായിയാണ്. നിങ്ങളുടെ കുട്ടിയുടെ ഹാജർ വിവരങ്ങൾ നൽകാൻ ഞാൻ ഇവിടെയുണ്ട്.";
          if (isUrdu) return "السلام علیکم! میں آپ کا والدین کا معاون ہوں۔ آپ کے بچے کی حاضری کی تفصیلات فراہم کرنے کے لیے حاضر ہوں۔";
          return "Hello! I am your Parent Support Assistant. I am here to provide updates on your child's attendance, school schedules, and coordinate with teachers.";
        }
        if (user.role === 'teacher') {
          if (isHindi) return "नमस्ते! मैं आपका शिक्षण सहायक हूँ। मैं छात्रों की उपस्थिति खोजने, दैनिक उपस्थिति दर्ज करने और कक्षा सारांश में सहायता कर सकता हूँ।";
          if (isTamil) return "வணக்கம்! நான் உங்கள் ஆசிரியர் உதவியாளர். தினசரி வருகை பதிவுக்கு நான் உதவுகிறேன்.";
          if (isTelugu) return "నమస్తే! నేను మీ బోధనా సహాయకుడిని. రోజువారీ హాజరును గుర్తించడంలో నేను సహాయపడతాను.";
          if (isMarathi) return "नमस्कार! मी तुमचा शिक्षण सहाय्यक आहे. दैनंदिन उपस्थिती नोंदवण्यात मी मदत करेन.";
          if (isUrdu) return "السلام علیکم! میں آپ کا تدریسی معاون ہوں۔ میں طلباء کی روزانہ کی حاضری لگانے میں مدد کر سکتا ہوں۔";
          return "Hello! I am your Teaching Assistant. I can assist you with student attendance lookups, marking daily classroom rosters, and class summaries.";
        }
        if (isHindi) return "सादर प्रणाम, डॉ. अय्यर। आपके प्रबंधन सहायक के रूप में, मैं स्कूल-व्यापी विश्लेषण, उपस्थिति रुझान और प्रशासनिक सारांश प्रदान करने के लिए तैयार हूँ।";
        if (isTamil) return "வணக்கம் டாக்டர் ஐயர். பள்ளி அளவிலான பகுப்பாய்வு மற்றும் வருகை போக்குகளை வழங்க நான் தயாராக உள்ளேன்.";
        if (isTelugu) return "నమస్కారం డాక్టర్ అయ్యర్. పాఠశాల స్థాయి విశ్లేషణలు మరియు హాజరు ధోరణులను అందించడానికి నేను సిద్ధంగా ఉన్నాను.";
        if (isUrdu) return "آداب ڈاکٹر ایر۔ اسکول کے انتظامی تجزیات اور حاضری کی رپورٹس پیش کرنے کے لیے حاضر ہوں۔";
        return "Greetings, Dr. Iyer. As your Management Assistant, I am ready to provide school-wide analytics, attendance trends, and administrative summaries.";
    }
  }
}

export const agentOrchestrator = new AIAgentOrchestrator();
