import { Notification } from '@application/entities/notification';

export class InMemoryNotificationsRepository
  implements InMemoryNotificationsRepository
{
  public notifications: Notification[] = [];

  async findById(notificationId: string): Promise<Notification> {
    const notification = this.notifications.find(
      (item) => item.id === notificationId,
    );
    if (!notification) {
      return null;
    }
  }

  async create(notification: Notification) {
    this.notifications.push(notification);
  }

  async save(notification: Notification) {
    const notificationIndex = this.notifications.findIndex(
      (item) => item.id === notification.id,
    );

    if (notificationIndex >= 0) {
      this.notifications[notificationIndex] = notification;
    }
  }
}
