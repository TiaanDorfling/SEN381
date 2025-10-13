// backend/routes/auth.js
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { body } from 'express-validator';
import { validate } from '../middleware/validate.js';
import User from '../model/UserModel.js';

const router = express.Router();

router.post(
  '/register',
  [
    body('name').isString().trim().isLength({ min: 2 }),
    body('email').isEmail().normalizeEmail(),
    body('password').isString().isLength({ min: 8 }),
    body('role').optional().isIn(['student', 'tutor', 'admin'])
  ],
  validate,
  async (req, res) => {
    try {
      const { name, email, password, role = 'student' } = req.body;

      if (!/^[a-z0-9._%+-]+@student\.belgiumcampus\.ac\.za$/i.test(email)) {
        return res.status(400).json({ error: 'Campus student email required' });
      }

      const exists = await User.findOne({ email }).lean().exec();
      if (exists) return res.status(409).json({ error: 'Email already exists' });

      const passwordHash = await bcrypt.hash(password, 12);
      const user = await User.create({ name, email, role, passwordHash });

      return res.status(201).json({
        message: `${role} registered successfully!`,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt,
        }
      });
    } catch (err) {
      console.error('POST /auth/register', err);
      return res.status(500).json({ error: 'Registration failed' });
    }
  }
);

router.post(
  '/login',
  [body('email').isEmail(), body('password').isString().isLength({ min: 8 })],
  validate,
  async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email }).exec();
      if (!user) return res.status(401).json({ error: 'Invalid credentials' });

      const ok = await bcrypt.compare(password, user.passwordHash);
      if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

      const token = jwt.sign(
        { sub: user._id.toString(), role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );


      return res.status(200).json({
        message: 'Login successful!',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (err) {
      console.error('POST /auth/login', err);
      return res.status(500).json({ error: 'Login failed' });
    }
  }
);

export default router;
