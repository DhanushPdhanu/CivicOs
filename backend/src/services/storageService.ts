import fs from 'node:fs/promises';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { env } from '../config/env.js';
import { errors } from '../utils/errors.js';

const ALLOWED_MIME = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);
const EXT_BY_MIME: Record<string, string> = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
  'image/gif': '.gif',
};

export function assertImageFile(file: { mimetype: string; size: number; originalname: string }) {
  if (!ALLOWED_MIME.has(file.mimetype)) {
    throw errors.validation('Invalid report data', { file: 'Unsupported image type' });
  }
  if (file.size > env.maxUploadBytes) {
    throw errors.validation('Invalid report data', { file: 'File exceeds size limit' });
  }
  const ext = path.extname(file.originalname).toLowerCase();
  const expected = EXT_BY_MIME[file.mimetype];
  if (ext && !['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext)) {
    throw errors.validation('Invalid report data', { file: 'File extension is not allowed' });
  }
  return expected;
}

export interface StoredObject {
  storageKey: string;
  mimeType: string;
  size: number;
  originalName: string;
}

export const localStorageAdapter = {
  async save(file: Express.Multer.File): Promise<StoredObject> {
    const ext = assertImageFile(file);
    const id = randomUUID();
    const storageKey = `${id}${ext}`;
    const dir = path.resolve(env.uploadDir);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(path.join(dir, storageKey), file.buffer);
    return {
      storageKey,
      mimeType: file.mimetype,
      size: file.size,
      originalName: file.originalname,
    };
  },

  async read(storageKey: string): Promise<{ buffer: Buffer; mimeTypeHint: string } | null> {
    if (storageKey.includes('..') || storageKey.includes('/') || storageKey.includes('\\')) {
      return null;
    }
    const full = path.join(path.resolve(env.uploadDir), storageKey);
    try {
      const buffer = await fs.readFile(full);
      return { buffer, mimeTypeHint: path.extname(storageKey) };
    } catch {
      return null;
    }
  },
};

export const storageAdapter = localStorageAdapter;
