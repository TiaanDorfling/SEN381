// routes/ai.js
import express from 'express';
import { auth } from '../middleware/auth.js';
import { GoogleGenAI } from '@google/genai';
import AIChatBot from '../model/AIChatBot.js';

const router = express.Router();
const aiBot = new AIChatBot();

console.log('✅ AI Routes loaded, AIChatBot initialized');

router.post('/chat', auth(false), async (req, res) => {
  try {
    const { message } = req.body || {};
    
    if (!message) {
      return res.status(400).json({ error: 'Missing message' });
    }

    // Step 1: Check knowledge base first
    const kbResult = await aiBot.answerQuestion(message);
    if (kbResult) {
      return res.status(200).json(kbResult);
    }

    // Step 2: Build context from MongoDB
    const dbContext = await aiBot.buildContextForAI(message);
    
    // Step 3: If we have direct tutor info, return it
    if (dbContext.tutors && dbContext.tutors.length > 0) {
      return res.status(200).json({ 
        reply: dbContext.tutors.join('\n'), 
        source: 'MongoDB' 
      });
    }

    if (dbContext.tutorSearch && Array.isArray(dbContext.tutorSearch)) {
      const tutorInfo = dbContext.tutorSearch.map(t => 
        `${t.name} (${t.email}) - Modules: ${t.modules.join(', ')}`
      ).join('\n');
      
      return res.status(200).json({ 
        reply: tutorInfo, 
        source: 'MongoDB' 
      });
    }

    // Step 4: Build AI prompt with context
    let contextStr = 'You are the CampusLearn assistant.\n\n';
    
    if (dbContext.modules.length > 0) {
      contextStr += `The user is asking about module(s): ${dbContext.modules.join(', ')}\n`;
      contextStr += 'No tutors were found for this module in the database.\n\n';
    }
    
    if (aiBot.isMongoConnected()) {
      contextStr += 'Database is connected and available for queries.\n\n';
    } else {
      contextStr += 'Note: Database connection is currently unavailable.\n\n';
    }

    contextStr += `User question: ${message}\n\n`;
    contextStr += 'Please provide a helpful response. If the user is asking about tutors or modules, ';
    contextStr += 'let them know that the information is not currently available in the system.';

    // Step 5: Query AI with context
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const modelChoices = ['gemini-2.5-flash', 'gemini-2.5-pro'];
    
    let reply = null;
    let provider = null;

    for (const model of modelChoices) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: contextStr,
        });
        
        reply = typeof response.text === 'function' ? await response.text() : response.text;
        provider = model;
        break;
      } catch (e) {
        if (e.status === 404 || e.message?.includes('not found')) {
          continue;
        }
        throw e;
      }
    }

    if (!reply) {
      return res.status(500).json({ 
        error: 'Unable to generate a response from any model' 
      });
    }

    res.status(200).json({ 
      reply, 
      provider,
      source: 'AI',
      mongoConnected: aiBot.isMongoConnected()
    });

  } catch (err) {
    console.error('AI /chat error:', err);
    res.status(500).json({ 
      error: err.message || 'Chatbot error',
      details: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
});

// Test endpoint to check MongoDB connection and tutors
router.get('/test-db', auth(false), async (req, res) => {
  try {
    const isConnected = aiBot.isMongoConnected();
    
    if (!isConnected) {
      return res.status(503).json({
        connected: false,
        message: 'MongoDB is not connected'
      });
    }

    const allTutors = await aiBot.getAllTutors();
    
    res.status(200).json({
      connected: true,
      message: 'MongoDB is connected',
      tutorCount: Array.isArray(allTutors) ? allTutors.length : 0,
      tutors: allTutors
    });
  } catch (err) {
    console.error('Test DB error:', err);
    res.status(500).json({ 
      error: err.message,
      connected: false 
    });
  }
});

export default router;