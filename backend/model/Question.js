export class Question {
  constructor(questionId, content, postedBy, isAnonymous = false) {
    this.questionId = questionId;
    this.content = content;
    this.postedBy = postedBy;
    this.isAnonymous = isAnonymous;
    this.responses = [];
  }

  postQuestion() { /* logic */ }
  addResponse(response) { this.responses.push(response); }
}