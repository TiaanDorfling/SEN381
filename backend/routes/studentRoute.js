// backend/routes/student.routes.js
import express from "express";
import { Student } from "../model/StudentModel.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// === Simple middleware to extract user ID from JWT cookie ===
function requireAuth(req, res, next) {
  const token = req.cookies?.jwt;
  if (!token) return res.status(401).json({ ok: false, message: "Not authenticated" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.sub || decoded.id || decoded._id;
    next();
  } catch {
    return res.status(401).json({ ok: false, message: "Invalid token" });
  }
}

// === GET /api/student/me ===
router.get("/me", requireAuth, async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.userId }).populate("user");
    if (!student) return res.status(404).json({ ok: false, message: "Student not found" });
    res.json({ ok: true, student });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// === PUT /api/student/me ===
router.put("/me", requireAuth, async (req, res) => {
  try {
    const updated = await Student.findOneAndUpdate(
      { user: req.userId },
      req.body,
      { new: true }
    ).populate("user");
    if (!updated) return res.status(404).json({ ok: false, message: "Student not found" });
    res.json({ ok: true, student: updated });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

export default router;
