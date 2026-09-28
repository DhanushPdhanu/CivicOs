import bcrypt from 'bcryptjs';
import { prisma } from '../config/prisma.js';
import { env } from '../config/env.js';
import { errors } from '../utils/errors.js';
import { signToken } from '../utils/jwt.js';
import { toCanonicalRole, toUserDto } from '../utils/mappers.js';
import { toCanonicalRole as parseRole } from '../types/domain.js';
import { toUserDto as mapUser } from '../utils/mappers.js';

function cookieOptions() {
  return {
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: env.nodeEnv === 'production',
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: '/',
  };
}

export const authService = {
  cookieOptions,

  async register(input: { name: string; email: string; password: string; role?: string }) {
    const existing = await prisma.user.findUnique({ where: { email: input.email } });
    if (existing) throw errors.conflict('An account with this email already exists', 'DUPLICATE_EMAIL');

    let role = parseRole(input.role ?? 'citizen') ?? 'citizen';
    if (role === 'admin') role = 'citizen';
    if (role === 'government' && !env.allowGovernmentSelfRegister) role = 'citizen';

    const passwordHash = await bcrypt.hash(input.password, 12);
    const user = await prisma.user.create({
      data: { name: input.name, email: input.email, passwordHash, role },
    });
    const token = signToken({ userId: user.id, role: user.role });
    return { user: mapUser(user), token };
  },

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw errors.unauthorized('Invalid email or password', 'INVALID_CREDENTIALS');
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) throw errors.unauthorized('Invalid email or password', 'INVALID_CREDENTIALS');
    const token = signToken({ userId: user.id, role: user.role });
    return { user: mapUser(user), token };
  },

  async me(userId: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw errors.unauthorized('User no longer exists', 'USER_DELETED');
    return mapUser(user);
  },
};

void toCanonicalRole;
void toUserDto;
