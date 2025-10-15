// backend/routes/ai.js
import express from 'express';
import { auth } from '../middleware/auth.js';
import { GoogleGenAI } from '@google/genai';

const router = express.Router();

/**
 * POST /api/ai/chat
 * Route to generate an AI reply using Google GenAI.
 * - Reads the user's message from req.body.message.
 * - Uses the GEMINI_API_KEY from your .env file.
 * - Tries the gemini‑2.5‑flash model first, then falls back to gemini‑2.5‑pro.
 */
router.post('/chat', auth(false), async (req, res) => {
  try {
    const { message } = req.body || {};
    if (!message) return res.status(400).json({ error: 'Missing message' });

    // Initialise the AI client with your API key
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    // Try available models in order of preference
    const modelChoices = ['gemini-2.5-flash', 'gemini-2.5-pro'];
    let reply = null;
    let provider = null;

    for (const model of modelChoices) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: message,
        });
        // New library: .text() is a function returning the generated text
        reply = typeof response.text === 'function' ? await response.text() : response.text;
        provider = model;
        break; // exit loop on success
      } catch (e) {
        // If 404 (model not found), try next model
        if (e.status === 404 || e.message?.includes('not found')) {
          console.warn(`Model ${model} failed: ${e.message}`);
          continue;
        }
        // Re-throw unexpected errors
        throw e;
      }
    }

    if (!reply) {
      return res.status(500).json({ error: 'Unable to generate a response from any model' });
    }

    res.status(200).json({
      reply,
      provider,
    });
  } catch (err) {
    console.error('AI /chat error:', err);
    res.status(500).json({ error: err.message || 'Gemini API error' });
  }
});

export default router;
