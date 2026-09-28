import { z } from 'zod';
import { CATEGORIES, SEVERITIES } from '../types/domain.js';

export const registerSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().toLowerCase(),
  password: z.string().min(6).max(128),
  role: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().trim().email().toLowerCase(),
  password: z.string().min(1),
});

const locationSchema = z.object({
  lat: z.number().gte(-90).lte(90),
  lng: z.number().gte(-180).lte(180),
  address: z.string().trim().min(3).max(240),
  district: z.string().trim().min(1).max(120).optional(),
});

export const createReportSchema = z
  .object({
    title: z.string().trim().max(160).optional(),
    description: z.string().trim().min(10).max(4000),
    category: z.enum(CATEGORIES),
    location: locationSchema.optional(),
    address: z.string().trim().min(3).max(240).optional(),
    district: z.string().trim().max(120).optional(),
    latitude: z.number().gte(-90).lte(90).optional(),
    longitude: z.number().gte(-180).lte(180).optional(),
    severity: z.enum(SEVERITIES).optional(),
    urgency: z.enum(SEVERITIES).optional(),
    images: z.array(z.string().max(500)).max(8).optional(),
    imageIds: z.array(z.string().uuid()).max(8).optional(),
    audioUrl: z.string().url().optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.location && !data.address) {
      ctx.addIssue({
        code: 'custom',
        path: ['location'],
        message: 'Location address is required',
      });
    }
  });

export const updateReportSchema = z.object({
  status: z.string().optional(),
  title: z.string().trim().min(3).max(160).optional(),
  description: z.string().trim().min(10).max(4000).optional(),
});

export const reportQuerySchema = z.object({
  category: z.string().optional(),
  severity: z.enum(SEVERITIES).optional(),
  status: z.string().optional(),
  district: z.string().optional(),
  from: z.string().datetime().optional(),
  to: z.string().datetime().optional(),
  lat: z.coerce.number().optional(),
  lng: z.coerce.number().optional(),
  radiusKm: z.coerce.number().min(0.1).max(50).optional(),
});

export const copilotQuerySchema = z.object({
  question: z.string().trim().min(5).max(1000).optional(),
  query: z.string().trim().min(5).max(1000).optional(),
}).superRefine((data, ctx) => {
  if (!data.question && !data.query) {
    ctx.addIssue({ code: 'custom', path: ['question'], message: 'Question is required' });
  }
});

export const adminUserPatchSchema = z.object({
  role: z.enum(['citizen', 'government', 'admin', 'Citizen', 'Government', 'Admin']).optional(),
  name: z.string().trim().min(2).max(80).optional(),
});

export type CreateReportInput = z.infer<typeof createReportSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
