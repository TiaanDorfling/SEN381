// backend/middleware/auth.js
import jwt from 'jsonwebtoken';

// Verify JWT and attach user to request
export function auth(required = true) {
  return (req, res, next) => {
    const token = req.cookies.jwt; 

    if (!token) {
      if (!required) return next();
      return res.status(401).json({ error: 'No token' });
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



