import pino from 'pino';
import { env, isProduction } from '../config/env.js';

export const logger = pino({
  level: env.logLevel,
  redact: {
    paths: [
      'password',
      'passwordHash',
      '*.password',
      'req.headers.authorization',
      'req.headers.cookie',
      'jwt',
      'token',
      'AI_API_KEY',
      'JWT_SECRET',
    ],
    remove: true,
  },
  transport: isProduction
    ? undefined
    : {
        target: 'pino/file',
        options: { destination: 1 },
      },
});
