import express from "express";
import { auth } from "../middleware/auth.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();

router.post("/chat", auth(false), async (req, res) => {
  try {
    const { message } = req.body || {};
    if (!message) return res.status(400).json({ error: "Missing message" });

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const systemPrompt = `
      You are CampusLearn's AI Tutor Assistant.
      Provide helpful, concise answers related to student support and SEN381.
    `;

    const prompt = `${systemPrompt}\nUser: ${message}`;
    const result = await model.generateContent(prompt);

    const reply = result.response?.text?.() || "No response generated.";
    res.status(200).json({ reply, provider: "gemini-1.5-flash (free)" });
  } catch (err) {
    console.error("AI /chat error:", err);
    res.status(500).json({ error: err.message || "Gemini API error" });
  }
});

export default router;
