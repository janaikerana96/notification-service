import { Body, Controller, Post } from '@nestjs/common';
import { SendNotification } from 'src/application/use-cases/send-notification';
import { CreateNotificationsDto } from '../dtos/create-notification.dto.';

@Controller('notifications')
export class NotificationsController {
  constructor (private sendNotification: SendNotification) {}
  
  @Post() 
  async create(@Body() dto: CreateNotificationsDto) {
    const { recipientId, content, category} = dto;  
    
    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category
    })

    return { notification }
  }
}
