export class Topic {
  constructor(topicId, title, description, createdBy) {
    this.topicId = topicId;
    this.title = title;
    this.description = description;
    this.createdBy = createdBy;
    this.subscribers = [];
    this.resources = [];
    this.questions = [];
  }

  addSubscriber(student) { this.subscribers.push(student); }
  broadcastTopic() { /* logic */ }
  notifyTutors() { /* logic */ }
}