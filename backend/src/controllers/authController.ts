import type { Request, Response, NextFunction } from 'express';
import { loginSchema, registerSchema } from '../validators/schemas.js';
import { authService } from '../services/authService.js';

export const authController = {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const body = registerSchema.parse(req.body);
      const result = await authService.register(body);
      res.cookie('civicos_token', result.token, authService.cookieOptions());
      res.status(201).json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  },

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const body = loginSchema.parse(req.body);
      const result = await authService.login(body.email, body.password);
      res.cookie('civicos_token', result.token, authService.cookieOptions());
      res.json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  },

  async logout(_req: Request, res: Response) {
    res.clearCookie('civicos_token', { path: '/' });
    res.json({ success: true, data: { loggedOut: true } });
  },

  async me(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await authService.me(req.user!.id);
      res.json({ success: true, data: user });
    } catch (err) {
      next(err);
    }
  },
};
