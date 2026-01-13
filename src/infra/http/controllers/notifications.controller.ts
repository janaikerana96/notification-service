import { SendNotification } from '@application/use-cases/send-notification';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { CancelNotification } from '../../../application/use-cases/cancel-notification';
import { CountRecipientNotifications } from '../../../application/use-cases/count-recipient-notifications';
import { GetRecipientNotifications } from '../../../application/use-cases/get-recipient-notifications';
import { ReadNotification } from '../../../application/use-cases/read-notification';
import { UnreadNotification } from '../../../application/use-cases/unread-notification';
import { CreateNotificationsDto } from '../dtos/create-notification.dto.';
import { NotificationViewModel } from '../view-models/notification-view-model';

@ApiTags('notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification, 
    private countRecipientNotifications: CountRecipientNotifications, 
    private getRecipientNotifications: GetRecipientNotifications
    ) {}

  @Patch(':id/cancel')
  @ApiOperation({ summary: 'Cancelar uma notificação' })
  @ApiParam({ name: 'id', description: 'ID da notificação', type: String })
  @ApiResponse({ status: 200, description: 'Notificação cancelada com sucesso' })
  @ApiResponse({ status: 404, description: 'Notificação não encontrada' })
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({
      notificationId: id
    })
  }

  @Get('count/from/:recipientId')
  @ApiOperation({ summary: 'Contar notificações de um destinatário' })
  @ApiParam({ name: 'recipientId', description: 'ID do destinatário', type: String })
  @ApiResponse({ 
    status: 200, 
    description: 'Contagem de notificações',
    schema: {
      type: 'object',
      properties: {
        count: { type: 'number', example: 5 }
      }
    }
  })
  async countFromRecipient(@Param('recipientId') recipientId: string){
    const { count } = await this.countRecipientNotifications.execute({
      recipientId
    })
    return { count }
  }

  @Get('from/:recipientId')
  @ApiOperation({ summary: 'Listar notificações de um destinatário' })
  @ApiParam({ name: 'recipientId', description: 'ID do destinatário', type: String })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de notificações do destinatário',
    schema: {
      type: 'object',
      properties: {
        notifications: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              category: { type: 'string' },
              content: { type: 'string' },
              recipientId: { type: 'string' },
              readAt: { type: 'string', nullable: true },
              createdAt: { type: 'string' }
            }
          }
        }
      }
    }
  })
  async getFromRecipient(@Param('recipientId') recipientId: string){
    const { notifications } = await this.getRecipientNotifications.execute({
      recipientId
    })
    return {
      notifications: notifications.map( NotificationViewModel.toHTTP)
    } 
  }

  @Patch(':id/read')
  @ApiOperation({ summary: 'Marcar notificação como lida' })
  @ApiParam({ name: 'id', description: 'ID da notificação', type: String })
  @ApiResponse({ status: 200, description: 'Notificação marcada como lida com sucesso' })
  @ApiResponse({ status: 404, description: 'Notificação não encontrada' })
  async read(@Param('id') id: string) {
    await this.readNotification.execute({
      notificationId: id
    })
  }

  @Patch(':id/unread')
  @ApiOperation({ summary: 'Marcar notificação como não lida' })
  @ApiParam({ name: 'id', description: 'ID da notificação', type: String })
  @ApiResponse({ status: 200, description: 'Notificação marcada como não lida com sucesso' })
  @ApiResponse({ status: 404, description: 'Notificação não encontrada' })
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({
      notificationId: id
    })
  }


  @Post('create')
  @ApiOperation({ summary: 'Criar uma nova notificação' })
  @ApiBody({ type: CreateNotificationsDto })
  @ApiResponse({ 
    status: 201, 
    description: 'Notificação criada com sucesso',
    schema: {
      type: 'object',
      properties: {
        notification: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            category: { type: 'string' },
            content: { type: 'string' },
            recipientId: { type: 'string' },
            readAt: { type: 'string', nullable: true },
            createdAt: { type: 'string' }
          }
        }
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  async create(@Body() dto: CreateNotificationsDto) {
    const { recipientId, content, category } = dto;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category,
    });

    return { notification: NotificationViewModel.toHTTP(notification) };
  }
}
