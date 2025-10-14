import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { loadEnv } from './config/loadEnv.js';
import { connectDB } from './config/db.js';

import indexRouter from './routes/index.js';

// NEW
import authRoutes from './routes/auth.js';
import topicRoutes from './routes/topics.js';
import { notFound, errorHandler } from './middleware/error.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ---- Load env & connect DB early ----
loadEnv();
await connectDB(process.env.MONGO_URI);

const app = express();

// --- debugging ---
app.use((req, res, next) => {
  console.log('--- Incoming Request ---');
  console.log('Method:', req.method);
  console.log('Path:', req.path);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  console.log('------------------------');
  next();
});

// ---- Middleware ----
app.use(morgan('dev'));
const allowedOrigins = process.env.CLIENT_ORIGIN?.split(',') || ['http://localhost:3000'];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true, // allow cookies
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// ---- Routes ----
app.use('/', indexRouter);
app.use('/api/auth', authRoutes);
app.use('/api/topics', topicRoutes);

// ---- 404 & Error ----
app.use(notFound);
app.use(errorHandler);

export default app;
