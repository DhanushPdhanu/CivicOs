import type { Request, Response, NextFunction } from 'express';
import { createReportSchema, updateReportSchema, reportQuerySchema } from '../validators/schemas.js';
import { reportService } from '../services/reportService.js';
import { prisma } from '../config/prisma.js';
import { storageAdapter } from '../services/storageService.js';

function parseJsonBody(body: Record<string, unknown>) {
  if (typeof body.location === 'string') {
    try {
      body.location = JSON.parse(body.location);
    } catch {
      /* keep string */
    }
  }
  if (typeof body.latitude === 'string') body.latitude = Number(body.latitude);
  if (typeof body.longitude === 'string') body.longitude = Number(body.longitude);
  if (typeof body.images === 'string') {
    try {
      body.images = JSON.parse(body.images);
    } catch {
      /* keep */
    }
  }
  return body;
}

export const reportController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const body = createReportSchema.parse(parseJsonBody({ ...req.body }));
      const files = (req.files as Express.Multer.File[] | undefined) ?? [];
      const imageFileIds: string[] = [...(body.imageIds ?? [])];
      for (const file of files) {
        const stored = await storageAdapter.save(file);
        const row = await prisma.storedFile.create({
          data: {
            storageKey: stored.storageKey,
            originalName: stored.originalName,
            mimeType: stored.mimeType,
            size: stored.size,
          },
        });
        imageFileIds.push(row.id);
      }
      const report = await reportService.create(req.user!.id, body, imageFileIds);
      res.status(201).json({ success: true, data: report });
    } catch (err) {
      next(err);
    }
  },

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const query = reportQuerySchema.parse(req.query);
      const data = await reportService.list(req.user!, query as Record<string, string | undefined>);
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  },

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await reportService.getById(req.user!, req.params.id);
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const body = updateReportSchema.parse(req.body);
      const data = await reportService.update(req.user!, req.params.id, body);
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  },

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await reportService.remove(req.user!, req.params.id);
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  },
};
