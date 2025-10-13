// backend/middleware/auth.js

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserFactory } from '../controller/UserFactory.js';

export class Auth {
  // REGISTER NEW USER
  static async register(req, res) {
    const { role, email, password, name } = req.body;

    try {
      // Hash password securely
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create user using factory pattern
      const newUser = UserFactory.createUser(role, {
        name,
        email,
        passwordHash: hashedPassword,
      });

      const savedUser = await newUser.save();

      // Generate JWT
      const token = jwt.sign(
        { sub: savedUser._id, role: role }, // <-- consistent naming
        process.env.JWT_SECRET,
        { expiresIn: '6h' }
      );

      return res.status(201).json({
        message: `${role} registered successfully!`,
        token,
        user: {
          id: savedUser._id,
          email: savedUser.email,
          name: savedUser.name,
          role,
        },
      });
    } catch (error) {
      if (error.code === 11000)
        return res.status(409).json({ message: 'Email already in use.' });

      console.error('Registration error:', error);
      return res.status(500).json({ message: 'Server error during registration.' });
    }
  }

  // LOGIN USER
  static async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await UserFactory.findByEmail(email);
      if (!user)
        return res.status(404).json({ message: 'User not found.' });

      const validPassword = await bcrypt.compare(password, user.passwordHash);
      if (!validPassword)
        return res.status(401).json({ message: 'Invalid credentials.' });

      const token = jwt.sign(
        { sub: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      return res.status(200).json({
        message: 'Login successful!',
        token,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      });
    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({ message: 'Server error during login.' });
    }
  }
}

/**
 * --------------------------
 * AUTH MIDDLEWARE FUNCTIONS
 * --------------------------
 */

// Verify JWT and attach user to request
export function auth(required = true) {
  return (req, res, next) => {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;

    if (!token) {
      if (!required) return next();
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      req.user = { id: payload.sub, role: payload.role };
      next();
    } catch (err) {
      console.error('JWT verification error:', err);
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
  };
}

// Role-based access control
export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user)
      return res.status(401).json({ error: 'Unauthorized' });
    if (!roles.includes(req.user.role))
      return res.status(403).json({ error: 'Forbidden' });
    next();
  };
}

