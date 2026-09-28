import type { Server as HttpServer } from 'node:http';
import { Server } from 'socket.io';
import { env } from '../config/env.js';
import { verifyToken } from '../utils/jwt.js';
import { prisma } from '../config/prisma.js';
import { logger } from '../utils/logger.js';

let io: Server | null = null;

export function initSockets(httpServer: HttpServer) {
  io = new Server(httpServer, {
    cors: {
      origin: env.frontendUrl,
      credentials: true,
    },
  });

  io.use(async (socket, next) => {
    try {
      const token =
        (socket.handshake.auth?.token as string | undefined) ||
        (socket.handshake.headers.authorization?.startsWith('Bearer ')
          ? socket.handshake.headers.authorization.slice(7)
          : undefined);
      if (!token) return next(new Error('unauthorized'));
      const payload = verifyToken(token);
      const user = await prisma.user.findUnique({ where: { id: payload.userId } });
      if (!user) return next(new Error('unauthorized'));
      socket.data.user = { id: user.id, role: user.role };
      next();
    } catch {
      next(new Error('unauthorized'));
    }
  });

  io.on('connection', (socket) => {
    const user = socket.data.user as { id: string; role: string };
    socket.join(`user:${user.id}`);
    if (user.role === 'citizen') socket.join(`citizen:${user.id}`);
    if (user.role === 'government' || user.role === 'admin') socket.join('government');
    if (user.role === 'admin') socket.join('admin');
    logger.info({ userId: user.id, role: user.role }, 'socket connected');
  });

  return io;
}

export function getIo(): Server | null {
  return io;
}

export const realtime = {
  reportCreated(payload: object, citizenId: string) {
    io?.to('government').to('admin').to(`citizen:${citizenId}`).emit('report:created', payload);
    io?.to('government').to('admin').emit('dashboard:updated', { reason: 'report:created' });
  },
  reportAnalyzed(payload: object, citizenId: string) {
    io?.to('government').to('admin').to(`citizen:${citizenId}`).emit('report:analyzed', payload);
  },
  reportStatusUpdated(payload: object, citizenId: string) {
    io?.to('government').to('admin').to(`citizen:${citizenId}`).emit('report:status_updated', payload);
    io?.to('government').to('admin').emit('dashboard:updated', { reason: 'report:status_updated' });
  },
  hotspotUpdated(payload: object) {
    io?.to('government').to('admin').emit('hotspot:updated', payload);
  },
};
