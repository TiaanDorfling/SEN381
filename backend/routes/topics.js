// backend/routes/topics.js
import express from 'express';
import { body, query } from 'express-validator';
import { validate } from '../middleware/validate.js';
import { auth } from '../middleware/auth.js';
import Topic from '../model/Topic.js';
import UserModel from '../model/UserModel.js';
import e from 'express';

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

router.post(
  '/subscribe',
  auth(true),
  async (req, res) => {
    const topicId = req.body.topicId;
    const id = req.user._id; //from auth

    try {
        const topic = await Topic.findById(topicId);

        if (!topic) {
          return res.status(404).json({ message: `Topic not found` });
        }      

        await topic.addSubscriber(id);

        return res.status(200).json({ 
          message: 'Successfully subscribed to topic.',
          topicId: topic._id,
          newSubscriberCount: topic.subscribers.length
        });        
    }
    catch (error){
      console.error(error);
      return res.status(500).json({ message: 'Failed to subscribe due to a server error.' });
    }
  }
);

router.delete(
  '/unsubscribe',
  auth(true), // Ensure the user is logged in
  async (req, res) => {
    // 1. Get IDs from the request
    const topicId = req.body.topicId;
    const userId = req.user._id; // The user ID to be removed

    try {
      // 2. Find the specific Topic document
      const topic = await Topic.findById(topicId);

      if (!topic) {
        return res.status(404).json({ message: 'Topic not found' });
      }

      // 3. Call the instance method to remove the subscriber and save
      // Your method handles the filtering and saving in one call.
      await topic.removeSubscriber(userId); 

      // 4. Send a successful response
      return res.status(200).json({ 
        message: 'Successfully unsubscribed from topic.',
        topicId: topic._id,
        newSubscriberCount: topic.subscribers.length // Return the new count
      });
      
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Failed to unsubscribe due to a server error.' });
    }
  }
);

export default router;
