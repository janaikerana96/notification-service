import { SendNotification } from '@application/use-cases/send-notification';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateNotificationsDto } from '../dtos/create-notification.dto.';
import { NotificstionViewModel } from '../view-models/notification-view-model';

@Controller('notifications')
export class NotificationsController {
  constructor(private sendNotification: SendNotification) {}

  @Post()
  async create(@Body() dto: CreateNotificationsDto) {
    const { recipientId, content, category } = dto;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category,
    });

    return { notification: NotificstionViewModel.toHTTP(notification) };
  }
}
