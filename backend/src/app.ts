import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import pinoHttp from 'pino-http';
import { env, isProduction } from './config/env.js';
import { logger } from './utils/logger.js';
import { requestId } from './middleware/requestId.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import { router } from './routes/index.js';
import { prisma } from './config/prisma.js';

export function createApp() {
  const app = express();
  app.disable('x-powered-by');
  app.use(requestId);
  app.use(
    pinoHttp({
      logger,
      customLogLevel: (_req, res, err) => {
        if (err || res.statusCode >= 500) return 'error';
        if (res.statusCode >= 400) return 'warn';
        return 'info';
      },
      serializers: {
        req(req) {
          return { method: req.method, url: req.url };
        },
      },
    }),
  );
  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' },
    }),
  );
  app.use(
    cors({
      origin: isProduction ? env.frontendUrl : [env.frontendUrl, 'http://localhost:3000', 'http://127.0.0.1:3000'],
      credentials: true,
    }),
  );
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true, limit: '1mb' }));
  app.use(cookieParser());
  app.use(
    rateLimit({
      windowMs: 60_000,
      limit: 120,
      standardHeaders: true,
      legacyHeaders: false,
      handler: (_req, res) => {
        res.status(429).json({
          success: false,
          error: { code: 'RATE_LIMITED', message: 'Too many requests' },
        });
      },
    }),
  );

  app.get('/health', async (_req, res) => {
    let database: 'connected' | 'disconnected' = 'disconnected';
    try {
      await prisma.$queryRaw`SELECT 1`;
      database = 'connected';
    } catch {
      database = 'disconnected';
    }
    res.status(database === 'connected' ? 200 : 503).json({
      status: database === 'connected' ? 'ok' : 'degraded',
      service: 'civicos-backend',
      database,
    });
  });

  app.use('/api', router);
  app.use(notFoundHandler);
  app.use(errorHandler);
  return app;
}
