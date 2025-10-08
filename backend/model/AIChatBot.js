export class AIChatBot{
    constructor(knowledgeBase = '', faqLibrary = []){
        this.knowledgeBase = knowledgeBase;
        this.faqLibrary = faqLibrary;
    }

    answerQuestion(question) {}
    recommendResource(topic) {}
    escalateToTutor(tutor) {}
}