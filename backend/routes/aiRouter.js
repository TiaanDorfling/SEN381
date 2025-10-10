import express from 'express';
import dotenv from "dotenv";
import fetch from "node-fetch";

var router = express.Router();
dotenv.config();

router.post("/api/copilot", async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", 
        messages: [
          { role: "system", content: "You are a helpful computer science tutor with a PHD in computer science." },
          { role: "user", content: prompt },
        ],
      }),
    });

    const data = await response.json();
    res.json({ result: data.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;