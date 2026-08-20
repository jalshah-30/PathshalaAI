import React from 'react';
import { 
  BookOpen, 
  CheckCircle2, 
  HelpCircle, 
  Lightbulb, 
  Sparkles, 
  Calculator,
  Compass,
  FileText,
  Bookmark
} from 'lucide-react';

interface CleanMessageRendererProps {
  content: string;
  isDarkMode?: boolean;
  className?: string;
}

/**
 * Helper to clean raw LaTeX, markdown noise, and disturbance from AI text
 */
export function cleanRawAcademicText(rawText: string): string {
  if (!rawText) return '';

  let text = rawText;

  // 1. Clean LaTeX \text{...} wrappers
  text = text.replace(/\\text\{([^}]+)\}/g, '$1');

  // 2. Clean LaTeX \quad, \cdot, \times, etc.
  text = text.replace(/\\quad/g, ' ');
  text = text.replace(/\\qquad/g, '  ');
  text = text.replace(/\\cdot/g, ' · ');
  text = text.replace(/\\times/g, ' × ');
  text = text.replace(/\\pm/g, ' ± ');
  text = text.replace(/\\approx/g, ' ≈ ');
  text = text.replace(/\\neq/g, ' ≠ ');
  text = text.replace(/\\le/g, ' ≤ ');
  text = text.replace(/\\ge/g, ' ≥ ');
  text = text.replace(/\\sqrt\{([^}]+)\}/g, '√($1)');
  text = text.replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1 / $2)');

  // 3. Clean superscript powers like x^2, 13^2, (x-7)^2
  text = text.replace(/\^2\b/g, '²');
  text = text.replace(/\^3\b/g, '³');
  text = text.replace(/\^(\d+)/g, '^$1');

  // 4. Strip stray LaTeX dollar signs around units and math
  text = text.replace(/\$([^\$]+)\$/g, '$1');
  text = text.replace(/\$\$([^\$]+)\$\$/g, '$1');

  // 5. Clean up duplicate or messy horizontal rules
  text = text.replace(/\s*---\s*/g, '\n\n---\n\n');

  return text.trim();
}

/**
 * Formats inline text with bolding, italics, math, and code spans
 */
function renderInlineContent(text: string, isDark: boolean = true) {
  // Clean raw LaTeX & math clutter
  const cleaned = cleanRawAcademicText(text);

  // Split by bold (**text**)
  const parts = cleaned.split(/(\*\*[^*]+\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const boldText = part.slice(2, -2);
      return (
        <strong 
          key={index} 
          className={`font-bold ${isDark ? 'text-amber-300' : 'text-slate-900'}`}
        >
          {boldText}
        </strong>
      );
    }

    // Check for inline math equations with equal signs or arithmetic
    if (
      (part.includes('=') || part.includes('²') || part.includes('+') || part.includes('×')) &&
      !part.includes('http') &&
      part.length < 120
    ) {
      return (
        <span 
          key={index} 
          className={`font-mono tracking-tight font-medium ${isDark ? 'text-indigo-200' : 'text-indigo-900'}`}
        >
          {part}
        </span>
      );
    }

    return <span key={index}>{part}</span>;
  });
}

/**
 * CleanMessageRenderer: Renders structured, clean, high-contrast school responses
 * completely free from raw markdown/LaTeX disturbance.
 */
export const CleanMessageRenderer: React.FC<CleanMessageRendererProps> = ({
  content,
  isDark = true,
  className = ''
}) => {
  if (!content) return null;

  // Pre-clean text disturbance
  const cleanedFullText = cleanRawAcademicText(content);

  // Split into paragraphs / blocks
  // Handle dividers '---', headers '###', '####', blockquotes '>', and list items
  const lines = cleanedFullText.split('\n');

  const blocks: React.ReactNode[] = [];
  let currentListItems: string[] = [];
  let currentBlockquote: string[] = [];
  let blockKey = 0;

  const flushList = () => {
    if (currentListItems.length > 0) {
      const listCopy = [...currentListItems];
      blocks.push(
        <ul key={`list-${blockKey++}`} className="space-y-2 my-2.5 pl-1">
          {listCopy.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm sm:text-base leading-relaxed">
              <span className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${isDark ? 'bg-indigo-400' : 'bg-indigo-600'}`} />
              <div className="flex-1">{renderInlineContent(item, isDark)}</div>
            </li>
          ))}
        </ul>
      );
      currentListItems = [];
    }
  };

  const flushBlockquote = () => {
    if (currentBlockquote.length > 0) {
      const quoteText = currentBlockquote.join(' ');
      blocks.push(
        <div 
          key={`quote-${blockKey++}`}
          className={`my-3 p-4 rounded-xl border transition-all ${
            isDark 
              ? 'bg-slate-950/80 border-indigo-500/40 text-slate-100 shadow-inner' 
              : 'bg-indigo-50/70 border-indigo-200 text-slate-900'
          }`}
        >
          <div className="flex items-center gap-2 mb-1.5 text-xs font-bold uppercase tracking-wider text-indigo-400">
            <BookOpen className="w-4 h-4" />
            <span>Problem Statement</span>
          </div>
          <div className="text-sm sm:text-base leading-relaxed font-medium">
            {renderInlineContent(quoteText, isDark)}
          </div>
        </div>
      );
      currentBlockquote = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i].trim();

    if (!rawLine) {
      flushList();
      flushBlockquote();
      continue;
    }

    // Divider
    if (rawLine === '---' || rawLine === '***' || rawLine === '___') {
      flushList();
      flushBlockquote();
      blocks.push(
        <div key={`hr-${blockKey++}`} className="my-4 border-b border-indigo-500/20" />
      );
      continue;
    }

    // Blockquote (> text)
    if (rawLine.startsWith('>')) {
      flushList();
      const quoteContent = rawLine.replace(/^>\s*/, '').replace(/^\*\*Problem:\*\*\s*/i, '');
      if (quoteContent) {
        currentBlockquote.push(quoteContent);
      }
      continue;
    }

    // Header 1 / 2 / 3
    if (rawLine.startsWith('###') || rawLine.startsWith('##') || rawLine.startsWith('#')) {
      flushList();
      flushBlockquote();
      const headerText = rawLine.replace(/^#+\s*/, '').replace(/\*\*/g, '');
      const isChallenge = headerText.toLowerCase().includes('challenge') || headerText.toLowerCase().includes('problem');
      const isSolution = headerText.toLowerCase().includes('solution') || headerText.toLowerCase().includes('step');

      blocks.push(
        <div 
          key={`h-${blockKey++}`} 
          className={`mt-4 mb-2 pb-1.5 flex items-center gap-2 border-b ${
            isDark ? 'border-slate-800 text-white' : 'border-slate-200 text-slate-900'
          }`}
        >
          {isChallenge ? (
            <Bookmark className="w-4 h-4 text-amber-400 shrink-0" />
          ) : isSolution ? (
            <Lightbulb className="w-4 h-4 text-yellow-400 shrink-0" />
          ) : (
            <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
          )}
          <h3 className="text-base sm:text-lg font-bold tracking-tight">
            {headerText}
          </h3>
        </div>
      );
      continue;
    }

    // Header 4 (e.g. #### Step 1: ...)
    if (rawLine.startsWith('####') || rawLine.match(/^Step \d+:/i)) {
      flushList();
      flushBlockquote();
      const stepText = rawLine.replace(/^#+\s*/, '').replace(/\*\*/g, '');

      blocks.push(
        <div 
          key={`step-${blockKey++}`}
          className={`mt-3.5 mb-1.5 p-2.5 rounded-lg flex items-center gap-2 font-bold text-sm ${
            isDark ? 'bg-indigo-950/60 text-indigo-200 border border-indigo-800/40' : 'bg-indigo-50 text-indigo-900 border border-indigo-100'
          }`}
        >
          <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
          <span>{stepText}</span>
        </div>
      );
      continue;
    }

    // List item (- or * or numbered 1.)
    if (rawLine.startsWith('- ') || rawLine.startsWith('* ') || rawLine.match(/^\d+\.\s+/)) {
      flushBlockquote();
      const itemText = rawLine.replace(/^[-*]\s+/, '').replace(/^\d+\.\s+/, '');
      currentListItems.push(itemText);
      continue;
    }

    // Check for Answer highlight
    if (rawLine.toLowerCase().includes('**answer:**') || rawLine.toLowerCase().startsWith('answer:')) {
      flushList();
      flushBlockquote();
      blocks.push(
        <div 
          key={`ans-${blockKey++}`}
          className={`my-3.5 p-3.5 rounded-xl border flex items-start gap-3 shadow-md ${
            isDark 
              ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-100' 
              : 'bg-emerald-50 border-emerald-200 text-emerald-950'
          }`}
        >
          <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
          <div className="text-sm sm:text-base leading-relaxed font-semibold">
            {renderInlineContent(rawLine, isDark)}
          </div>
        </div>
      );
      continue;
    }

    // Regular Paragraph
    flushList();
    flushBlockquote();
    blocks.push(
      <p 
        key={`p-${blockKey++}`} 
        className={`text-sm sm:text-base leading-relaxed my-2 font-normal ${
          isDark ? 'text-slate-100' : 'text-slate-800'
        }`}
      >
        {renderInlineContent(rawLine, isDark)}
      </p>
    );
  }

  flushList();
  flushBlockquote();

  return (
    <div className={`space-y-1 clean-academic-text ${className}`}>
      {blocks}
    </div>
  );
};
