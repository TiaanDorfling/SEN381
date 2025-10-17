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
import "./models/User.js";
import "./models/Admin.js";
import "./models/Tutor.js";
import "./models/Student.js";

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
const allowed =
  (process.env.CLIENT_ORIGIN && process.env.CLIENT_ORIGIN.split(",")) || ["*"];
app.use(
  cors({
    origin: allowed,
    credentials: true,
  })
);

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

// Rate limiting (exists in project structure)
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
import indexRouter from "./routes/index.js";
import authRoutes from "./routes/auth.routes.js";
import topicRoutes from "./routes/topics.routes.js";
import forumRoutes from "./routes/forum.routes.js";
import submissionsRoutes from "./routes/submissions.routes.js";
import resourcesRoutes from "./routes/resources.routes.js";
import messagesRoutes from "./routes/messages.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import calendarRoutes from "./routes/calendar.routes.js";

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
