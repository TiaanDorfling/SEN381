import { updateProfile, adminUpdateUser } from '../controller/UserController.js';
import { auth, requireRole } from '../middleware/auth.js';
import express from 'express';
import bcrypt from 'bcryptjs';
import { body } from 'express-validator';
import { validate } from '../middleware/validate.js';
import User from '../model/UserModel.js';

const router = express.Router();

// Update current user (profile)
router.put('/update-user', auth(true), updateProfile);

// Admin updates any user's profile
router.put('/update/:id', auth(true), requireRole('admin'), adminUpdateUser);

// Admin creates new user
router.post(
    '/create-user',
    [
    body('name').isString().trim().isLength({ min: 2 }),
    body('email').isEmail().normalizeEmail(),
    body('password').isString().isLength({ min: 8 }),
    body('role').optional().isIn(['student', 'tutor', 'admin']),
  ],
  validate,
    auth(true),
    requireRole('admin'),
  async (req, res) =>{
    try {
        const { name, email, password, role = 'student' } = req.body;

        if (!/^[a-z0-9._%+-]+@student\.belgiumcampus\.ac\.za$/i.test(email)) {
            return res.status(400).json({ error: 'Campus student email required' });
        }

        const exists = await User.findOne({ email });
        if (exists) return res.status(409).json({ error: 'Email already exists' });

        const passwordHash = await bcrypt.hash(password, 12);
        const user = await User.create({ name, email, role, passwordHash });

        res.status(201).json({
            message: `${role} registered successfully`,
            user: { id: user._id, name, email, role },
        });
        } catch (err) {
        console.error('REGISTER error:', err);
        res.status(500).json({ error: 'Registration failed' });
        }
  }
);

// Admin deletes user


export default router;