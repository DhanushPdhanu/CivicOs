import { createServer } from 'node:http';
import { createApp } from './app.js';
import { env } from './config/env.js';
import { logger } from './utils/logger.js';
import { prisma } from './config/prisma.js';
import { initSockets } from './sockets/index.js';

const app = createApp();
const server = createServer(app);
initSockets(server);

server.listen(env.port, () => {
  logger.info({ port: env.port }, 'CivicOS backend listening');
});

async function shutdown(signal: string) {
  logger.info({ signal }, 'shutting down');
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
}

process.on('SIGINT', () => void shutdown('SIGINT'));
process.on('SIGTERM', () => void shutdown('SIGTERM'));
process.on('unhandledRejection', (err) => {
  logger.error({ err }, 'unhandledRejection');
});
