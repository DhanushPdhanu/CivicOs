import { PrismaClient } from '@prisma/client';
import { logger } from '../utils/logger.js';

export const prisma = new PrismaClient({
  log: [
    { emit: 'event', level: 'error' },
    { emit: 'event', level: 'warn' },
  ],
});

prisma.$on('error', (e) => {
  logger.error({ err: e.message }, 'prisma error');
});

prisma.$on('warn', (e) => {
  logger.warn({ msg: e.message }, 'prisma warning');
});
