// src/app/api/copilot/route.ts
// Next.js API route — Gemini AI Copilot endpoint
// Replace GEMINI_API_KEY in .env.local with your real key.

import { NextRequest, NextResponse } from 'next/server';

const GEMINI_API_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

const SYSTEM_CONTEXT = `You are CivicOS Policy AI Copilot — an expert government policy advisor for Indian municipal governments.

You have access to the following live civic data summary:
- 1,050+ citizen reports across 4 districts (A, B, C, D)
- Top issues: Drainage (28%), Waste Management (22%), Water Supply (18%), Roads (15%), Healthcare (9%), others
- Critical hotspots: Demo District A – Drainage, Demo District B – Waste, Demo District C – Healthcare, Demo District D – Electricity
- Active predictions: 10 risk forecasts, 3 CRITICAL, 7 HIGH risk
- Population affected: 520,000+ residents

Your role:
- Provide data-driven, actionable policy recommendations
- Suggest budget allocations with estimated costs in Indian Rupees (₹ Crore)
- Prioritize by urgency, population impact, and cost-effectiveness
- Give specific, implementable action plans
- Be concise but comprehensive — use bullet points and numbered lists
- Always mention which district is affected and estimated population impact

Respond in a structured, professional tone suitable for government officials.
Keep responses under 400 words. Do not use markdown headers with ##, use plain text formatting.`;

export async function POST(req: NextRequest) {
  try {
    const { query, history } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY not configured. Please add it to .env.local and restart the server.' },
        { status: 503 }
      );
    }

    // Build conversation history for multi-turn
    const contents = [];

    // Add system context as first user turn (Gemini doesn't have system role)
    contents.push({
      role: 'user',
      parts: [{ text: `System context (follow these instructions throughout):\n${SYSTEM_CONTEXT}` }],
    });
    contents.push({
      role: 'model',
      parts: [{ text: 'Understood. I am CivicOS Policy AI Copilot, ready to provide data-driven civic policy recommendations.' }],
    });

    // Add conversation history
    if (history && Array.isArray(history)) {
      for (const msg of history) {
        contents.push({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }],
        });
      }
    }

    // Add current query
    contents.push({
      role: 'user',
      parts: [{ text: query }],
    });

    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents,
        generationConfig: {
          temperature:     0.7,
          topK:            40,
          topP:            0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          { category: 'HARM_CATEGORY_HARASSMENT',        threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_HATE_SPEECH',       threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        ],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('Gemini API error:', err);
      return NextResponse.json(
        { error: `Gemini API error: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      return NextResponse.json({ error: 'No response from Gemini' }, { status: 500 });
    }

    return NextResponse.json({ reply: text });
  } catch (err) {
    console.error('Copilot route error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
