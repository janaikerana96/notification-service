import { Notification } from '@application/entities/notification';
import { Injectable } from '@nestjs/common';
import { PrismaNotificationMapper } from '../mappers/prisma-notification-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaNotificationsRepository
  implements PrismaNotificationsRepository
{
  constructor(private prismaService: PrismaService) {}

  async findById(notifivation: string): Promise<Notification> {
    throw new Error('Method not implemented')
  }
  
  async create(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification)
    await this.prismaService.notification.create({
      data: raw,
    });
  }

  async save(notification: Notification) {
    throw new Error('Method not implemented')
  }
}
