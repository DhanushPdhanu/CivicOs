import type { Category } from '../types/domain.js';
import { SEVERITIES, type Severity } from '../types/domain.js';

export interface AiAnalysisInput {
  description: string;
  category: Category | string;
  location?: string;
  imageCount?: number;
}

export interface AiAnalysisOutput {
  category: string;
  severity: Severity;
  urgency: Severity;
  summary: string;
  recommendedAction: string;
  confidence: number;
  reasoning: string;
  mode: 'demo' | 'real';
}

const KEYWORDS: Record<string, { category: string; severity: Severity; urgency: Severity }> = {
  flood: { category: 'Drainage', severity: 'HIGH', urgency: 'HIGH' },
  waterlog: { category: 'Drainage', severity: 'HIGH', urgency: 'HIGH' },
  drain: { category: 'Drainage', severity: 'HIGH', urgency: 'MEDIUM' },
  pothole: { category: 'Roads', severity: 'MEDIUM', urgency: 'MEDIUM' },
  road: { category: 'Roads', severity: 'MEDIUM', urgency: 'MEDIUM' },
  garbage: { category: 'Waste', severity: 'MEDIUM', urgency: 'MEDIUM' },
  waste: { category: 'Waste', severity: 'MEDIUM', urgency: 'MEDIUM' },
  hospital: { category: 'Healthcare', severity: 'HIGH', urgency: 'HIGH' },
  school: { category: 'Education', severity: 'MEDIUM', urgency: 'LOW' },
  outage: { category: 'Electricity', severity: 'HIGH', urgency: 'HIGH' },
  electricity: { category: 'Electricity', severity: 'MEDIUM', urgency: 'MEDIUM' },
  bus: { category: 'Public Transport', severity: 'MEDIUM', urgency: 'MEDIUM' },
  water: { category: 'Water', severity: 'HIGH', urgency: 'HIGH' },
};

function demoAnalyze(input: AiAnalysisInput): AiAnalysisOutput {
  const text = input.description.toLowerCase();
  let match = { category: input.category || 'Other', severity: 'MEDIUM' as Severity, urgency: 'MEDIUM' as Severity };
  for (const [keyword, value] of Object.entries(KEYWORDS)) {
    if (text.includes(keyword)) {
      match = value;
      break;
    }
  }
  if (text.includes('every time it rains') || text.includes('flooded')) {
    match = { category: 'Drainage', severity: 'HIGH', urgency: 'HIGH' };
  }
  const confidence = text.includes('flood') ? 92 : 78;
  return {
    category: match.category,
    severity: match.severity,
    urgency: match.urgency,
    summary: `Deterministic demo analysis: the report describes a ${match.category.toLowerCase()} issue. This is DEMO MODE output, not measured AI accuracy.`,
    recommendedAction: `Prioritize inspection of ${match.category.toLowerCase()} infrastructure at the reported location.`,
    confidence,
    reasoning: `Keyword and category heuristics in demo mode. Input category=${input.category}.`,
    mode: 'demo',
  };
}

function stripPersonalInfo(text: string): string {
  return text
    .replace(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi, '[redacted-email]')
    .replace(/\b\+?\d[\d\s()-]{8,}\b/g, '[redacted-phone]')
    .slice(0, 1500);
}

const analysisSchemaKeys = ['category', 'severity', 'urgency', 'summary', 'recommendedAction', 'confidence', 'reasoning'] as const;

function validateAiJson(raw: unknown, fallbackCategory: string): AiAnalysisOutput | null {
  if (!raw || typeof raw !== 'object') return null;
  const obj = raw as Record<string, unknown>;
  const category = typeof obj.category === 'string' ? obj.category : fallbackCategory;
  const severity = SEVERITIES.includes(obj.severity as Severity) ? (obj.severity as Severity) : null;
  const urgency = SEVERITIES.includes(obj.urgency as Severity) ? (obj.urgency as Severity) : null;
  if (!severity || !urgency) return null;
  const confidence = Number(obj.confidence);
  if (!Number.isFinite(confidence)) return null;
  return {
    category,
    severity,
    urgency,
    summary: String(obj.summary ?? '').slice(0, 500),
    recommendedAction: String(obj.recommendedAction ?? '').slice(0, 400),
    confidence: Math.max(0, Math.min(100, Math.round(confidence))),
    reasoning: String(obj.reasoning ?? '').slice(0, 500),
    mode: 'real',
  };
}

async function realAnalyze(input: AiAnalysisInput): Promise<AiAnalysisOutput> {
  const { env } = await import('../config/env.js');
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), env.aiTimeoutMs);
  const safeDescription = stripPersonalInfo(input.description);
  try {
    const response = await fetch(env.aiApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${env.aiApiKey}`,
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: env.aiModel,
        temperature: 0.1,
        response_format: { type: 'json_object' },
        messages: [
          {
            role: 'system',
            content:
              'You are CivicOS decision-support. Return JSON only with keys: category, severity (LOW|MEDIUM|HIGH|CRITICAL), urgency (same), summary, recommendedAction, confidence (0-100), reasoning. Do not make government decisions. Do not invent facts.',
          },
          {
            role: 'user',
            content: JSON.stringify({
              description: safeDescription,
              statedCategory: input.category,
              location: input.location,
              imageCount: input.imageCount ?? 0,
            }),
          },
        ],
      }),
    });
    if (!response.ok) throw new Error(`AI provider ${response.status}`);
    const data = (await response.json()) as { choices?: { message?: { content?: string } }[] };
    const content = data.choices?.[0]?.message?.content;
    const parsed = content ? JSON.parse(content) : null;
    const validated = validateAiJson(parsed, String(input.category));
    if (!validated) throw new Error('AI output failed schema validation');
    return validated;
  } finally {
    clearTimeout(timer);
  }
}

export const aiService = {
  async analyzeCitizenReport(input: AiAnalysisInput): Promise<AiAnalysisOutput> {
    const { env } = await import('../config/env.js');
    const useReal = Boolean(env.aiApiKey) && env.aiProvider !== 'demo';
    if (!useReal) return demoAnalyze(input);
    try {
      return await realAnalyze(input);
    } catch {
      const fallback = demoAnalyze(input);
      return {
        ...fallback,
        summary: `${fallback.summary} External AI was unavailable; demo fallback applied.`,
        reasoning: 'Provider timeout, rate limit, or invalid response. Report was still saved.',
      };
    }
  },
};

void analysisSchemaKeys;
