// backend/routes/forum.routes.js
import express from "express";
import { ForumCategory, ForumThread, ForumPost } from "../model/Forum.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// === JWT auth middleware ===
function requireAuth(req, res, next) {
  const token = req.cookies?.jwt;
  if (!token) return res.status(401).json({ ok: false, message: "Not authenticated" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.sub || decoded.id || decoded._id;
    req.userRole = decoded.role || "student";
    next();
  } catch {
    return res.status(401).json({ ok: false, message: "Invalid token" });
  }
}

//
// ─── FORUM CATEGORIES ───────────────────────────────────────────────────────────
//

// Create category
router.post("/categories", requireAuth, async (req, res) => {
  try {
    const category = await ForumCategory.create({
      name: req.body.name,
      description: req.body.description,
    });
    res.status(201).json({ ok: true, category });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// List categories
router.get("/categories", async (_req, res) => {
  const cats = await ForumCategory.find().sort("name");
  res.json({ ok: true, categories: cats });
});

//
// ─── THREADS ────────────────────────────────────────────────────────────────────
//

// Create thread
router.post("/threads", requireAuth, async (req, res) => {
  try {
    const thread = await ForumThread.create({
      category: req.body.categoryId,
      author: req.userId,
      authorRole: req.userRole,
      title: req.body.title,
    });
    res.status(201).json({ ok: true, thread });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// List threads
router.get("/threads", async (req, res) => {
  const filter = {};
  if (req.query.category) filter.category = req.query.category;
  const threads = await ForumThread.find(filter).populate("category author").sort("-createdAt");
  res.json({ ok: true, threads });
});

//
// ─── POSTS ──────────────────────────────────────────────────────────────────────
//

// Create post
router.post("/posts", requireAuth, async (req, res) => {
  try {
    const post = await ForumPost.create({
      thread: req.body.threadId,
      author: req.userId,
      authorRole: req.userRole,
      content: req.body.content,
    });
    res.status(201).json({ ok: true, post });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// List posts for thread
router.get("/posts", async (req, res) => {
  if (!req.query.thread)
    return res.status(400).json({ ok: false, message: "Missing ?thread=id" });
  const posts = await ForumPost.find({ thread: req.query.thread })
    .populate("author")
    .sort("createdAt");
  res.json({ ok: true, posts });
});

export default router;
