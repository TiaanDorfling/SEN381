export class PrivateMessage {
  constructor(messageId, senderId, receiverId, content, attachments = [], timestamp = new Date()) {
    this.messageId = messageId;
    this.senderId = senderId;
    this.receiverId = receiverId;
    this.content = content;
    this.attachments = attachments;
    this.timestamp = timestamp;
  }

  sendMessage() { /* logic */ }
  attachResource(resource) { this.attachments.push(resource); }
}