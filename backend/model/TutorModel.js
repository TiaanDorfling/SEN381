// model/TutorModel.js
// Updated to use TutorDirectory collection directly
import mongoose from 'mongoose';

const TutorSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true,
    unique: true 
  },
  assignedModules: [{ 
    type: String 
  }],
  uploadedResources: [{
    title: String,
    url: String,
    uploadDate: { type: Date, default: Date.now }
  }]
}, { 
  collection: 'TutorDirectory',  // Explicitly set collection name
  timestamps: true 
});

// Instance methods
TutorSchema.methods.createTopic = function(topic) {
  // Implementation for creating topics
  return topic;
};

TutorSchema.methods.respondToQuery = function(query) {
  // Implementation for responding to queries
  return { query, response: 'Response from tutor' };
};

TutorSchema.methods.uploadResource = function(resource) { 
  this.uploadedResources.push(resource); 
  return this.save(); 
};

TutorSchema.methods.provideFeedback = function(feedback) {
  // Implementation for providing feedback
  return feedback;
};

// Static methods
TutorSchema.statics.findTutorsByModule = async function(moduleCode) {
  return this.find({ 
    assignedModules: moduleCode 
  }).lean(); 
};

TutorSchema.statics.findByEmail = async function(email) {
  return this.findOne({ email }).lean();
};

TutorSchema.statics.getAllTutors = async function() {
  return this.find({}).lean();
};

// Create or retrieve model
const TutorModel = mongoose.models.TutorDirectory || 
  mongoose.model('TutorDirectory', TutorSchema);

export default TutorModel;