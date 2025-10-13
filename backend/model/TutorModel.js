import UserModel from './UserModel.js';
import mongoose from 'mongoose';

const TutorSchema = new mongoose.Schema({
    assignedModules: [{ type: String }],
    tutorTopics: [{ type: String }],
    uploadedResources: [{ 
        resourceID: mongoose.Schema.Types.ObjectId, // Link to a resource model
        title: String,
        uploadDate: { type: Date, default: Date.now }
    }]
});

TutorSchema.methods.createTopic = function(tutor) {}
TutorSchema.methods.respondToQuery = function(query) {}
TutorSchema.methods.uploadResource = function(resource) {this.uploadedResources.push(resource); return this.save();}
TutorSchema.methods.provideFeedback = function(feedback) {}

const TutorModel = UserModel.discriminator('tutor', TutorSchema);

export default TutorModel;