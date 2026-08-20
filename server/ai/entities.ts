import { AttendanceStatus } from '../database/models.js';

export interface ExtractedEntities {
  student_name?: string;
  student_id?: string;
  class_name?: string;
  date?: string;
  status?: AttendanceStatus;
  reason?: string;
  date_phrase?: string; // e.g. "last week", "today"
}

/**
 * Normalizes date phrases into ISO YYYY-MM-DD format based on current local date.
 */
export function normalizeDate(dateStr?: string): string {
  const today = new Date();
  if (!dateStr || dateStr.toLowerCase() === 'today' || dateStr.toLowerCase() === 'now') {
    return today.toISOString().split('T')[0];
  }

  const lower = dateStr.toLowerCase().trim();
  if (lower === 'yesterday') {
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    return yesterday.toISOString().split('T')[0];
  }

  if (lower === 'day before yesterday') {
    const d = new Date(today);
    d.setDate(today.getDate() - 2);
    return d.toISOString().split('T')[0];
  }

  // If already YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(lower)) {
    return lower;
  }

  // Fallback to today
  return today.toISOString().split('T')[0];
}

/**
 * Deterministic entity extraction rules for school queries.
 */
export function extractEntitiesRuleBased(userInput: string): ExtractedEntities {
  const text = userInput.trim();
  const lower = text.toLowerCase();
  const entities: ExtractedEntities = {};

  // 1. Extract status
  if (/\babsent\b/i.test(text)) {
    entities.status = 'absent';
  } else if (/\bpresent\b/i.test(text)) {
    entities.status = 'present';
  } else if (/\blate\b/i.test(text)) {
    entities.status = 'late';
  } else if (/\bexcused\b/i.test(text)) {
    entities.status = 'excused';
  }

  // 2. Extract date
  if (/\btoday\b/i.test(text)) {
    entities.date = normalizeDate('today');
    entities.date_phrase = 'today';
  } else if (/\byesterday\b/i.test(text)) {
    entities.date = normalizeDate('yesterday');
    entities.date_phrase = 'yesterday';
  } else if (/\blast week\b/i.test(text)) {
    entities.date_phrase = 'last week';
  } else if (/\bthis week\b/i.test(text)) {
    entities.date_phrase = 'this week';
  }

  // 3. Extract known student names
  const knownNames = [
    'Rahul Sharma',
    'Rahul Verma',
    'Rahul',
    'Priya Patel',
    'Priya',
    'Aarav Gupta',
    'Aarav',
    'Ananya Iyer',
    'Ananya',
    'Rohan Sharma',
    'Rohan',
    'Sneha Roy',
    'Sneha',
    'Vikram Singh'
  ];

  for (const name of knownNames) {
    // Word boundary match
    const regex = new RegExp(`\\b${name}\\b`, 'i');
    if (regex.test(text)) {
      entities.student_name = name;
      break;
    }
  }

  // Check for pronouns if no name found
  if (!entities.student_name) {
    if (/\b(he|him|his)\b/i.test(text)) {
      entities.student_name = 'he';
    } else if (/\b(she|her)\b/i.test(text)) {
      entities.student_name = 'she';
    } else if (/\b(my child|my kid|my son|my daughter)\b/i.test(text)) {
      entities.student_name = 'my child';
    }
  }

  // 4. Extract class names
  const classMatch = text.match(/\b(Class\s*(?:10-A|10-B|9-A|9-B|10A|10B|9A|9B|10|9))\b/i);
  if (classMatch) {
    entities.class_name = classMatch[1].replace('10A', '10-A').replace('10B', '10-B');
  }

  // 5. Extract reason (for assistance/escalation)
  if (lower.includes('because') || lower.includes('regarding') || lower.includes('for') || lower.includes('about')) {
    const reasonParts = text.split(/(?:because|regarding|about|for)\s+/i);
    if (reasonParts.length > 1 && reasonParts[1].length > 3) {
      entities.reason = reasonParts.slice(1).join(' ').trim();
    }
  }

  return entities;
}
