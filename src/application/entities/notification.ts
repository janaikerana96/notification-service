export interface NotificationProps {
  recipientId: string;
  content: string;
  category: string;
  readAt?: Date | null;
  createAt: Date;
}

export class Notification {
    private props: NotificationProps; 

    constructor(props: NotificationProps) {
        this.props = props;
    }

    public set recipientId(recipientId: string) {
        this.props.recipientId = recipientId
    }

    public get recipientId(): string {
        return this.props.recipientId
    }

    public set content(content: string) {
        this.props.content = content
    }

    public get content(): string {
        return this.props.content
    }

    public set category(category: string) {
        this.props.category = category
    }

    public get category(): string {
        return this.props.category
    }

    public set readAt(readAt: Date) {
        this.props.readAt = readAt
    }

    public get readAt(): Date {
        return this.props.readAt
    }

}
