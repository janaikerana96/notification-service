import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notification';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notification-repository';
import { CancelNotification } from './cancel-notification';
import { NotificationNotFound } from './errors/notification-not-found';

describe('Cancel notification', () => {
  it('should be able to cancel a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    const notification = new Notification({
        category: 'Casa',
        content: new Content('Nova solicitação de serviço'),
        recipientId: 'example-recipient-id',
    })
    await notificationsRepository.create(notification);

    await cancelNotification.execute({
      notificationId: notification.id
    })

    expect(notificationsRepository.notifications[0].cancelAt).toEqual(
        expect.any(Date)
    );
  });
  
  it('shoud not be able to cancel a non existing notification', async () =>{
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    expect(() => {
        return cancelNotification.execute({
            notificationId: 'fake-notification-id'
        })
    }).rejects.toThrow(NotificationNotFound)
  })
});