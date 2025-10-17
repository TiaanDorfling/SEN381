export class Forum {
  constructor() {
    this.posts = [];
    this.faqs = [];
    this.trendingTopics = [];
  }

  postAnonymousQuestion(question) { this.posts.push(question); }
  moderatePosts() { /* logic */ }
  upvoteResponse(response) { response.addUpvote(); }
}