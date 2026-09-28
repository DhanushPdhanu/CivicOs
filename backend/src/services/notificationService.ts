import { prisma } from '../config/prisma.js';
import { errors } from '../utils/errors.js';

export const notificationService = {
  async list(userId: string) {
    return prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
  },

  async markRead(userId: string, id: string) {
    const note = await prisma.notification.findUnique({ where: { id } });
    if (!note || note.userId !== userId) throw errors.notFound('Notification not found');
    return prisma.notification.update({ where: { id }, data: { read: true } });
  },
};
