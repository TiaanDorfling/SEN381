import { User } from './User.js';

export class Tutor extends User{
    constructor(userID, name, email, passwordHash, assignedModules = []){
        super(userID, name, email, passwordHash, 'tutor');
        this.assignedModules = assignedModules;
        this.tutorTopics = [];
        this.uploadedResources = [];
    }

    createTopic(tutor) {}
    respondToQuery(query){}
    uploadResource(resource) { this.uploadedResources.push(resource); }
    provideFeedback(feedback){}
}