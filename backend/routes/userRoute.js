import express from 'express';
import { updateProfile, adminUpdateUser } from '../controller/UserController.js';
import { auth, requireRole } from '../middleware/auth.js';

const router = express.Router();

// Update current user (profile)
router.put('/update-user', auth(true), updateProfile);

// Admin updates any user's profile
router.put('/update/:id', auth(true), requireRole('admin'), adminUpdateUser);

// Admin creates new user

// Admin deletes user


export default router;