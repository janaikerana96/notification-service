import { Content } from './content';
import { Notification } from './notification';

describe('Notification', () => {
    it('Shoube be able to create a notification', () => {
        const notification = new Notification({
            content: new Content('Nova solicitação de serviço'), 
            category: 'Casa',
            recipientId: 'example-recipient-id'
        })
        expect(notification).toBeTruthy();
    })
 })