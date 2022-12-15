import { Body, Controller, Get, Post } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateNotificationsDto } from './create-notification.dto.';
import { PrismaService } from './prisma.service';

@Controller()
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  list() {
    return this.prisma.notification.findMany()
  }

  @Post() 
  async create(@Body() dto: CreateNotificationsDto) {
    const { recipientId, content, category} = dto;

    await this.prisma.notification.create({
      data: {
        id: randomUUID(),
        content,
        category,
        recipientId
      }
    })    
  }
}
