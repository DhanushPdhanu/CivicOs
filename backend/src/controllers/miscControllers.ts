import type { Request, Response, NextFunction } from 'express';
import { hotspotService } from '../services/hotspotService.js';
import { predictionService } from '../services/predictionService.js';
import { copilotService } from '../services/copilotService.js';
import { dashboardService, adminService, toAuditDto } from '../services/dashboardService.js';
import { notificationService } from '../services/notificationService.js';
import { copilotQuerySchema, adminUserPatchSchema, reportQuerySchema } from '../validators/schemas.js';
import { prisma } from '../config/prisma.js';
import { storageAdapter } from '../services/storageService.js';
import { errors } from '../utils/errors.js';
import { toReportDto, toHotspotDto, toPredictionDto, toRecommendationDto } from '../utils/mappers.js';

export const mapController = {
  async reports(req: Request, res: Response, next: NextFunction) {
    try {
      const query = reportQuerySchema.parse(req.query);
      const data = await hotspotService.mapReports(query as Record<string, string | undefined>);
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  },
  async hotspots(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await hotspotService.list(req.query as Record<string, string | undefined>);
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  },
};

export const hotspotController = {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await hotspotService.list(req.query as Record<string, string | undefined>);
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  },
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await hotspotService.getById(req.params.id);
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  },
};

export const predictionController = {
  async list(_req: Request, res: Response, next: NextFunction) {
    try {
      const data = await predictionService.list();
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  },
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await predictionService.getById(req.params.id);
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  },
};

export const copilotController = {
  async query(req: Request, res: Response, next: NextFunction) {
    try {
      const body = copilotQuerySchema.parse(req.body);
      const question = (body.question || body.query)!;
      const data = await copilotService.query(question);
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  },
  async recommend(req: Request, res: Response, next: NextFunction) {
    try {
      const body = copilotQuerySchema.parse(req.body);
      const question = (body.question || body.query)!;
      const data = await copilotService.query(question);
      res.json({ success: true, data: data.recommendations });
    } catch (err) {
      next(err);
    }
  },
};

export const recommendationController = {
  async list(_req: Request, res: Response, next: NextFunction) {
    try {
      const data = await copilotService.listRecommendations();
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  },
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await copilotService.getRecommendation(req.params.id);
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  },
  async evidence(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await copilotService.getEvidence(req.params.id);
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  },
  async review(req: Request, res: Response, next: NextFunction) {
    try {
      const decision = req.body.decision === 'rejected' ? 'rejected' : 'approved';
      const data = await copilotService.review(req.params.id, req.user!.id, decision);
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  },
};

export const governmentController = {
  async dashboard(_req: Request, res: Response, next: NextFunction) {
    try {
      const raw = await dashboardService.government();
      res.json({
        success: true,
        data: {
          totalReports: raw.totalReports,
          pendingReports: raw.pendingReports,
          activeReports: raw.activeReports,
          resolvedReports: raw.resolvedReports,
          highSeverityReports: raw.highSeverityReports,
          hotspots: raw.hotspots.map(toHotspotDto),
          predictions: raw.predictions.map(toPredictionDto),
          recentReports: raw.recentReports.map(toReportDto),
          priorityRecommendations: raw.priorityRecommendations.map(toRecommendationDto),
        },
      });
    } catch (err) {
      next(err);
    }
  },
};

export const adminController = {
  async dashboard(_req: Request, res: Response, next: NextFunction) {
    try {
      const data = await dashboardService.admin();
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  },
  async users(_req: Request, res: Response, next: NextFunction) {
    try {
      const data = await adminService.users();
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  },
  async patchUser(req: Request, res: Response, next: NextFunction) {
    try {
      const body = adminUserPatchSchema.parse(req.body);
      const data = await adminService.patchUser(req.params.id, body);
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  },
  async activity(_req: Request, res: Response, next: NextFunction) {
    try {
      const data = await adminService.activity();
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  },
  async auditLogs(_req: Request, res: Response, next: NextFunction) {
    try {
      const data = await adminService.auditLogs();
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  },
};

export const notificationController = {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await notificationService.list(req.user!.id);
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  },
  async read(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await notificationService.markRead(req.user!.id, req.params.id);
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  },
};

export const fileController = {
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const file = await prisma.storedFile.findUnique({ where: { id: req.params.id } });
      if (!file) throw errors.notFound('File not found');
      const stored = await storageAdapter.read(file.storageKey);
      if (!stored) throw errors.notFound('File not found');
      res.setHeader('Content-Type', file.mimeType);
      res.setHeader('Content-Disposition', 'inline');
      res.send(stored.buffer);
    } catch (err) {
      next(err);
    }
  },
};

void toAuditDto;
