// backend/middleware/rateLimit.js
export default function rateLimit(req, res, next) {
  if (req.method === "OPTIONS") return next();
  return next();
}
