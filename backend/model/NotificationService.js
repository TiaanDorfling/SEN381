export class NotificationService{
    constructor(notificationType, recipient, messageContent){
        this.notificationType = notificationType;
        this.recipient = recipient;
        this.messageContent = messageContent;
    }

    sendNotification() {/* logic to send sms/email */}
}