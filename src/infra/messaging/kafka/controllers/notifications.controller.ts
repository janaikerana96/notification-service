import { SendNotification } from '@application/use-cases/send-notification';
import { EventPattern, Payload } from '@nestjs/microservices';

interface SendNotificationPayload {
  content: string;
  category: string;
  recipientId: string;
}

export class NotificationsController {
  constructor(private sendNotification: SendNotification) {}

  @EventPattern('')
  async handleSendNotificaton(
    @Payload() { content, category, recipientId }: SendNotificationPayload,
  ) {
    await this.sendNotification.execute({
      content,
      category,
      recipientId,
    });
  }
}
