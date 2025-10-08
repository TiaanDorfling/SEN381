import {User} from './User.js' 

export class Student extends User{
    constructor(userID, name, email, passwordHash, academicBackground = 'BCOMP Student'){
        super(userID, name, email, passwordHash, 'student');
        this.academicBackground = academicBackground;
        this.subscribedTopics = [];
        this.interactionHistory = [];
    }

    createHelpTopic(topic) { /* logic */ } //Katryn waarvoor is hierdie? Om met Ai te praat?
    subscribeTopic(topic) { this.subscribedTopics.push(topic); }
    viewResponses() { /* logic */ } //is hierdie om messages te sien?
    postQuestion(question) { /* logic */ }
}