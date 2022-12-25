import { Content } from "@application/entities/content"
import { Notification, NotificationProps } from "@application/entities/notification"

type Override = Partial <NotificationProps>

export function makeNotification(override: Override = {} ){
    return new Notification({
        content: new Content('Nova solicitação de serviço'), 
        category: 'Casa',
        recipientId: 'recipient-2',
        ...override,

    })
}