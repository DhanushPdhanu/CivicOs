import type { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/prisma.js';
import { errors } from '../utils/errors.js';
import { verifyToken } from '../utils/jwt.js';
import type { CanonicalRole } from '../types/domain.js';

function extractToken(req: Request): string | null {
  const header = req.headers.authorization;
  if (header?.startsWith('Bearer ')) return header.slice(7);
  const cookie = req.cookies?.civicos_token;
  if (typeof cookie === 'string' && cookie.length > 0) return cookie;
  return null;
}

export async function authenticateUser(req: Request, _res: Response, next: NextFunction) {
  try {
    const token = extractToken(req);
    if (!token) throw errors.unauthorized('Missing authentication token');

    let payload;
    try {
      payload = verifyToken(token);
    } catch {
      throw errors.unauthorized('Invalid or expired token', 'INVALID_TOKEN');
    }

    const user = await prisma.user.findUnique({ where: { id: payload.userId } });
    if (!user) throw errors.unauthorized('User no longer exists', 'USER_DELETED');

    req.user = { id: user.id, role: user.role, email: user.email, name: user.name };
    next();
  } catch (err) {
    next(err);
  }
}

export function optionalAuth(req: Request, _res: Response, next: NextFunction) {
  const token = extractToken(req);
  if (!token) return next();
  void authenticateUser(req, _res, next);
}

export function requireRole(...roles: CanonicalRole[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) return next(errors.unauthorized());
    if (!roles.includes(req.user.role)) {
      return next(errors.forbidden());
    }
    next();
  };
}

export const requireAnyRole = requireRole;
