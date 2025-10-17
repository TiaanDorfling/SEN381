export class Response {
  constructor(responseId, content, postedBy) {
    this.responseId = responseId;
    this.content = content;
    this.postedBy = postedBy;
    this.upvotes = 0;
  }

  addUpvote() { this.upvotes++; }
}