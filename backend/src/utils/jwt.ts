import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import type { CanonicalRole } from '../types/domain.js';

export interface JwtPayload {
  userId: string;
  role: CanonicalRole;
}

export function signToken(payload: JwtPayload): string {
  return jwt.sign(payload, env.jwtSecret, { expiresIn: env.jwtExpiresIn as jwt.SignOptions['expiresIn'] });
}

export function verifyToken(token: string): JwtPayload {
  const decoded = jwt.verify(token, env.jwtSecret) as JwtPayload;
  return { userId: decoded.userId, role: decoded.role };
}
