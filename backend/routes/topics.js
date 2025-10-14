// backend/routes/topics.js
import express from 'express';
import { body, query } from 'express-validator';
import { validate } from '../middleware/validate.js';
import { auth } from '../middleware/auth.js';
import Topic from '../model/Topic.js';

const router = express.Router();

// GET /api/topics?keyword=
router.get(
  '/',
  [query('keyword').optional().isString().trim().isLength({ min: 1 })],
  validate,
  auth(true),
  async (req, res) => {
    try {
      const { keyword } = req.query;
      const filter = keyword ? { $text: { $search: keyword } } : {};
      const topics = await Topic.find(filter)
        .sort({ createdAt: -1 })
        .limit(50)
        .select('title creatorId moduleCode status createdAt')
        .populate('creatorId', 'fullName email role')
        .lean()
        .exec();

      return res.status(200).json({
        message: "topics received successfully",
        topics
      });
    } catch (err) {
      console.error('GET /topics', err);
      return res.status(500).json({ error: 'Failed to fetch topics' });
    }
  }
);

// POST /api/topics
router.post(
  '/',
  auth(true),
  [
    body('title').isString().trim().isLength({ min: 3 }),
    body('body').isString().trim().isLength({ min: 10 }),
    body('moduleCode').isString().trim().isLength({ min: 2 }),
    body('tags').optional().isArray().custom(arr => arr.every(t => typeof t === 'string'))
  ],
  validate,
  async (req, res) => {
    try {
      const { title, body: text, moduleCode, tags = [] } = req.body;
      const topic = await Topic.create({
        title,
        body: text,
        moduleCode,
        tags,
        creatorId: req.user.id
      });
      return res.status(201).json({
        message: "topic created succesfully",
        topic
      });
    } catch (err) {
      console.error('POST /topics', err);
      return res.status(500).json({ error: 'Failed to create topic' });
    }
  }
);

export default router;
