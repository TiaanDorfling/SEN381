// model/AIChatBot.js
import fs from 'fs/promises';
import mongoose from 'mongoose';

// Direct TutorDirectory schema (not a discriminator)
const TutorDirectorySchema = new mongoose.Schema({
  name: String,
  email: String,
  assignedModules: [{ type: String }]
}, { collection: 'TutorDirectory' }); // Explicitly set collection name

// Create model directly from TutorDirectory collection
const TutorDirectory = mongoose.models.TutorDirectory || 
  mongoose.model('TutorDirectory', TutorDirectorySchema);

export class AIChatBot {
  constructor(knowledgeBasePath = './data/knowledgeBase.json') {
    this.knowledgeBasePath = knowledgeBasePath;
    this.TutorModel = TutorDirectory;
  }

  // Check MongoDB connection status
  isMongoConnected() {
    return mongoose.connection.readyState === 1;
  }

  // MongoDB Tutor Query with enhanced error handling
  async getTutorsByModule(moduleCode) {
    try {
      if (!this.isMongoConnected()) {
        console.warn('MongoDB not connected. Skipping tutor lookup.');
        return null;
      }

      const tutors = await this.TutorModel.find({ 
        assignedModules: moduleCode 
      }).lean();
      
      if (!tutors || tutors.length === 0) {
        return `No tutors found for ${moduleCode}.`;
      }

      const tutorList = tutors.map(t => {
        const email = t.email || 'No email available';
        return `${t.name} (${email})`;
      }).join(', ');

      return `Tutors for ${moduleCode}: ${tutorList}`;
    } catch (error) {
      console.error('Error fetching tutors from MongoDB:', error);
      return null;
    }
  }

  // Get all tutors
  async getAllTutors() {
    try {
      if (!this.isMongoConnected()) {
        return null;
      }

      const tutors = await this.TutorModel.find({}).lean();
      
      if (!tutors || tutors.length === 0) {
        return 'No tutors found in the system.';
      }

      return tutors.map(t => ({
        name: t.name,
        email: t.email,
        modules: t.assignedModules || []
      }));
    } catch (error) {
      console.error('Error fetching all tutors:', error);
      return null;
    }
  }

  // Search tutors by name
  async searchTutorByName(name) {
    try {
      if (!this.isMongoConnected()) {
        return null;
      }

      const tutors = await this.TutorModel.find({
        name: { $regex: name, $options: 'i' }
      }).lean();

      if (!tutors || tutors.length === 0) {
        return `No tutors found matching "${name}".`;
      }

      return tutors.map(t => ({
        name: t.name,
        email: t.email,
        modules: t.assignedModules || []
      }));
    } catch (error) {
      console.error('Error searching tutors:', error);
      return null;
    }
  }

  // JSON Knowledge Base
  async loadKnowledgeBase() {
    try {
      const data = await fs.readFile(this.knowledgeBasePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.warn('Knowledge base file not found or invalid:', error.message);
      return [];
    }
  }

  async answerQuestion(question) {
    try {
      const kb = await this.loadKnowledgeBase();
      const found = kb.find(item =>
        question.toLowerCase().includes(item.question.toLowerCase())
      );
      
      if (found) {
        return { reply: found.answer, source: 'knowledgeBase' };
      }
      
      return null;
    } catch (error) {
      console.error('Error querying knowledge base:', error);
      return null;
    }
  }

  // Extract module codes from text
  extractModuleCodes(text) {
    const matches = text.match(/\b[A-Z]{2,4}\d{3}\b/gi);
    return matches ? [...new Set(matches.map(m => m.toUpperCase()))] : [];
  }

  // Build context from MongoDB for AI
  async buildContextForAI(message) {
    const context = {
      tutors: null,
      modules: []
    };

    // Extract module codes
    const moduleCodes = this.extractModuleCodes(message);
    
    if (moduleCodes.length > 0) {
      context.modules = moduleCodes;
      
      // Get tutors for each module
      const tutorPromises = moduleCodes.map(code => 
        this.getTutorsByModule(code)
      );
      
      const tutorResults = await Promise.all(tutorPromises);
      context.tutors = tutorResults.filter(r => r && !r.startsWith('No tutors'));
    }

    // Check for tutor name queries
    const nameMatch = message.match(/(?:tutor|lecturer|professor)\s+(?:named\s+)?([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i);
    if (nameMatch) {
      const searchResult = await this.searchTutorByName(nameMatch[1]);
      if (searchResult && !searchResult.startsWith('No tutors')) {
        context.tutorSearch = searchResult;
      }
    }

    return context;
  }
}


export default AIChatBot;