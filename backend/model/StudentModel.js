import UserModel from './UserModel.js';
import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema({
    academicBackground: { 
        type: String, 
        default: 'BCOMP Student' 
    },
    subscribedTopics: [{ type: String }],
    interactionHistory: [{ 
        action: String, 
        timestamp: { type: Date, default: Date.now } 
    }]
});


StudentSchema.methods.subscribeTopic = function(topic) {
    this.subscribedTopics.push(topic);
    return this.save(); 
};

StudentSchema.methods.createHelpTopic = function(topic){}
StudentSchema.methods.viewResponses = function(){}
StudentSchema.methods.postQuestion = function(question){}

const StudentModel = UserModel.discriminator('student', StudentSchema);

export default StudentModel;