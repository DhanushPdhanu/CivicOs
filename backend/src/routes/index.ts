import { Router } from 'express';
import multer from 'multer';
import { env } from '../config/env.js';
import { authenticateUser, requireRole } from '../middleware/auth.js';
import { authController } from '../controllers/authController.js';
import { reportController } from '../controllers/reportController.js';
import {
  adminController,
  copilotController,
  fileController,
  governmentController,
  hotspotController,
  mapController,
  notificationController,
  predictionController,
  recommendationController,
} from '../controllers/miscControllers.js';
import { prisma } from '../config/prisma.js';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: env.maxUploadBytes, files: 5 },
});

export const router = Router();

router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.post('/auth/logout', authController.logout);
router.get('/auth/me', authenticateUser, authController.me);

router.post('/reports', authenticateUser, requireRole('citizen', 'admin'), upload.array('images', 5), reportController.create);
router.get('/reports', authenticateUser, reportController.list);
router.get('/reports/:id', authenticateUser, reportController.get);
router.patch('/reports/:id', authenticateUser, reportController.update);
router.delete('/reports/:id', authenticateUser, requireRole('citizen', 'admin'), reportController.remove);

router.get('/map/reports', authenticateUser, requireRole('government', 'admin', 'citizen'), mapController.reports);
router.get('/map/hotspots', authenticateUser, mapController.hotspots);
router.get('/hotspots', authenticateUser, hotspotController.list);
router.get('/hotspots/:id', authenticateUser, hotspotController.get);

router.get('/predictions', authenticateUser, predictionController.list);
router.get('/predictions/:id', authenticateUser, predictionController.get);

router.post('/copilot/query', authenticateUser, requireRole('government', 'admin'), copilotController.query);
router.post('/copilot/recommend', authenticateUser, requireRole('government', 'admin'), copilotController.recommend);

router.get('/recommendations', authenticateUser, requireRole('government', 'admin'), recommendationController.list);
router.get('/recommendations/:id', authenticateUser, requireRole('government', 'admin'), recommendationController.get);
router.get('/recommendations/:id/evidence', authenticateUser, requireRole('government', 'admin'), recommendationController.evidence);
router.patch('/recommendations/:id/review', authenticateUser, requireRole('government', 'admin'), recommendationController.review);

router.get('/government/dashboard', authenticateUser, requireRole('government', 'admin'), governmentController.dashboard);

router.get('/admin/dashboard', authenticateUser, requireRole('admin'), adminController.dashboard);
router.get('/admin/users', authenticateUser, requireRole('admin'), adminController.users);
router.patch('/admin/users/:id', authenticateUser, requireRole('admin'), adminController.patchUser);
router.get('/admin/activity', authenticateUser, requireRole('admin'), adminController.activity);
router.get('/admin/audit-logs', authenticateUser, requireRole('admin'), adminController.auditLogs);

router.get('/notifications', authenticateUser, notificationController.list);
router.patch('/notifications/:id/read', authenticateUser, notificationController.read);

router.get('/files/:id', fileController.get);

router.get('/health/deep', async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'ok', service: 'civicos-backend', database: 'connected' });
  } catch {
    res.status(503).json({ status: 'degraded', service: 'civicos-backend', database: 'disconnected' });
  }
});
