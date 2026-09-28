import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(here, '../../.env') });

function required(name: string, fallback?: string): string {
  const value = process.env[name] ?? fallback;
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 5000),
  databaseUrl: required('DATABASE_URL', 'postgresql://civicos:civicos@localhost:5432/civicos?schema=public'),
  jwtSecret: required('JWT_SECRET', 'dev-only-change-me'),
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? '7d',
  frontendUrl: process.env.FRONTEND_URL ?? 'http://localhost:3000',
  aiProvider: (process.env.AI_PROVIDER ?? 'demo').toLowerCase(),
  aiApiKey: process.env.AI_API_KEY ?? '',
  aiApiUrl: process.env.AI_API_URL ?? 'https://api.openai.com/v1/chat/completions',
  aiModel: process.env.AI_MODEL ?? 'gpt-4o-mini',
  aiTimeoutMs: Number(process.env.AI_TIMEOUT_MS ?? 8000),
  demoPassword: process.env.DEMO_PASSWORD ?? 'demo123',
  allowGovernmentSelfRegister: (process.env.ALLOW_GOVERNMENT_SELF_REGISTER ?? 'true') === 'true',
  uploadDir: process.env.UPLOAD_DIR ?? 'uploads',
  maxUploadBytes: Number(process.env.MAX_UPLOAD_BYTES ?? 5 * 1024 * 1024),
  logLevel: process.env.LOG_LEVEL ?? 'info',
};

export const isProduction = env.nodeEnv === 'production';
export const isTest = env.nodeEnv === 'test';
