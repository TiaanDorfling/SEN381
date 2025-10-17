// ============================================================================
//  CampusLearn Backend – Express App Entry Point
//  Description: Loads env, connects MongoDB, registers discriminators,
//  configures middleware, serves static assets, and mounts all API routes.
// ============================================================================

import express from "express";
import path, { dirname } from "path";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import { fileURLToPath } from "url";

// --- Loaders ---
import { loadEnv } from "./config/loadEnv.js";
import { connectDB } from "./config/db.js";

// Load environment variables first
loadEnv();

// --- Register Mongoose models (incl. discriminators) BEFORE routes ---
import "./model/UserModel.js";
import "./model/AdminModel.js";
import "./model/TutorModel.js";
import "./model/StudentModel.js";

import "./model/AIChatBot.js";
import "./model/Forum.js";
import "./model/NotificationService.js";
import "./model/privateMessage.js";   // note casing
import "./model/QuestionModel.js";
import "./model/Resource.js";
import "./model/Response.js";
import "./model/Topic.js";

// --- Connect to MongoDB ---
await connectDB(process.env.MONGO_URI);

// --- Express app ---
const app = express();
app.set("trust proxy", true);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ============================================================================
//  MIDDLEWARE
// ============================================================================

// Verbose request logger (dev)
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// CORS
const allow =
  (process.env.CLIENT_ORIGIN || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

app.use(
  cors({
    origin(origin, cb) {
      // allow tools like curl/Postman (no Origin header)
      if (!origin) return cb(null, true);
      if (allow.includes(origin)) return cb(null, true);
      return cb(new Error(`CORS: Origin not allowed: ${origin}`), false);
    },
    credentials: true,
  })
);
// (optional) handle preflight explicitly in case other middleware blocks it
app.options("*", cors({ origin: (origin, cb) => cb(null, true), credentials: true }));

// Body & cookies
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(cookieParser());

// Optional: basic custom request trace (toggle via env)
if (process.env.REQUEST_TRACE === "1") {
  app.use((req, _res, next) => {
    console.log("→", req.method, req.originalUrl);
    next();
  });
}

// Rate limiting
import rateLimit from "./middleware/rateLimit.js";
app.use(rateLimit);

// ============================================================================
//  STATIC FILES
// ============================================================================
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

// Lightweight health check
app.get("/healthz", (_req, res) =>
  res.status(200).json({ ok: true, env: process.env.NODE_ENV || "dev" })
);

// ============================================================================
//  ROUTES
// ============================================================================

// Helper: safely load a router from several common filename patterns.
// If none exist, return an empty Router so the app still boots.
import { Router } from "express";
async function loadRoute(name /* e.g. 'auth' */) {
  const candidates = [
    `./routes/${name}.routes.js`,
    `./routes/${name}.route.js`,
    `./routes/${name}Routes.js`,
    `./routes/${name}.js`,
  ];
  for (const p of candidates) {
    try {
      const mod = await import(p);
      if (mod?.default) return mod.default;
    } catch (_) {
      // try next
    }
  }
  console.warn(`[routes] No route file found for "${name}" (tried: ${candidates.join(", ")})`);
  return Router(); // empty router
}

const indexRouter       = await loadRoute("index");
const authRoutes        = await loadRoute("auth");
const topicRoutes       = await loadRoute("topics");
const forumRoutes       = await loadRoute("forum");
const submissionsRoutes = await loadRoute("submissions");
const resourcesRoutes   = await loadRoute("resources");
const messagesRoutes    = await loadRoute("messages");
const adminRoutes       = await loadRoute("admin");
const calendarRoutes    = await loadRoute("calendar");

app.use("/", indexRouter);
app.use("/api/auth", authRoutes);
app.use("/api/topics", topicRoutes);
app.use("/api/forum", forumRoutes);
app.use("/api/submissions", submissionsRoutes);
app.use("/api/resources", resourcesRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/calendar", calendarRoutes);

// ============================================================================
//  ERROR HANDLING
// ============================================================================
import { notFound, errorHandler } from "./middleware/error.js";
app.use(notFound);
app.use(errorHandler);

// ============================================================================
//  EXPORT
// ============================================================================
export default app;
