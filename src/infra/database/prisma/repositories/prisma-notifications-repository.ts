import { Injectable } from '@nestjs/common';
import { Notification } from '../../../../application/entities/notification';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaNotificationsRepository
  implements PrismaNotificationsRepository
{
  constructor(private prismaService: PrismaService) {}

  async create(notification: Notification): Promise<void> {
    await this.prismaService.notification.create({
      data: {
        id: notification.id,
        category: notification.category,
        content: notification.content.value,
        recipientId: notification.recipientId,
        readAt: notification.readAt,
        createdAt: notification.createAt,
      },
    });
  }
}
