// backend/routes/question.js
import express from "express";
import { body } from "express-validator";
import { validate } from "../middleware/validate.js";
import { auth, requireRole } from "../middleware/auth.js";
import Question from "../model/QuestionModel.js";

const router = express.Router();

/**
 * @route POST /api/questions
 * @desc Student posts a new question
 * @access Student only (requires login)
 */
router.post(
  "/",
  auth(true),
  requireRole("student"),
  [
    body("title").isString().trim().isLength({ min: 5 }),
    body("body").isString().trim().isLength({ min: 10 }),
    body("topic").optional().isMongoId(),
    body("moduleCode").optional().isString().trim().isLength({ min: 3, max: 10 }),
  ],
  validate,
  async (req, res) => {
    try {
      const { title, body: bodyText, topic, moduleCode } = req.body;
      const question = await Question.create({
        title,
        body: bodyText,
        student: req.user.id,
        topic,
        moduleCode,
      });

      return res.status(201).json({
        message: "Question posted successfully",
        question,
      });
    } catch (error) {
      console.error("Error posting question:", error);
      return res.status(500).json({ error: "Failed to post question" });
    }
  }
);

/**
 * @route GET /api/questions
 * @desc Get all questions (basic feed)
 * @access Public or logged-in users
 */
router.get("/", auth(false), async (req, res) => {
  try {
    const questions = await Question.find()
      .populate("student", "name email")
      .populate("topic", "title")
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({ questions });
  } catch (error) {
    console.error("Error fetching questions:", error);
    return res.status(500).json({ error: "Failed to fetch questions" });
  }
});

export default router;
