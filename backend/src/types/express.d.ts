import type { CanonicalRole } from './domain.ts';

declare global {
  namespace Express {
    interface Request {
      requestId?: string;
      user?: {
        id: string;
        role: CanonicalRole;
        email: string;
        name: string;
      };
    }
  }
}

export {};
