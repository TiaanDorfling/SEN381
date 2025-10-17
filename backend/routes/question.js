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

router.post(
  "/:questionId/response", // Captures the ID of the question to respond to
  auth(true),
  requireRole("tutor"), // 🛑 CRUCIAL: Only Tutors are allowed to respond
  [
    // Validate the content field, which corresponds to the ResponseSchema
    body("content").isString().trim().isLength({ min: 10 }),
    body("isAnonymous").optional().isBoolean(),
  ],
  validate,
  async (req, res) => {
    const { questionId } = req.params;
    const { content, isAnonymous } = req.body;
    const tutorId = req.user.id; // The ID of the authenticated tutor

    // 1. Prepare the data object for the response
    const responseData = {
      message: content,
      postedBy: tutorId,
      isAnonymous: isAnonymous || false,
    };

    try {
      // 2. Find the question document
      const question = await Question.findById(questionId);

      if (!question) {
        return res.status(404).json({ message: "Question not found" });
      }

      // 3. Use the Mongoose instance method to add the response and save
      await question.addResponse(responseData);

      // 4. Get the newly added response to return (it now has a Mongoose _id)
      const lastResponse = question.responses[question.responses.length - 1];

      // 5. Success response
      return res.status(201).json({
        message: "Response posted successfully",
        response: lastResponse,
      });

    } catch (error) {
      console.error("Error posting response:", error);
      return res.status(500).json({ error: "Failed to post response" });
    }
  }
);

export default router;
