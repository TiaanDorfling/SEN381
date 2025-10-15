import express from 'express';
import { updateProfile } from '../controller/UserController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Get current user (profile)
// router.get('/update-user', auth(true), getCurrentUser);

// Update current user (profile)
router.put('/update-user', auth(true), updateProfile);

export default router;