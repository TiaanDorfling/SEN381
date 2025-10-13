import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cors from 'cors';

import { loadEnv } from './config/loadEnv.js';
import { connectDB } from './config/db.js';

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import studentRoute from './routes/studentRoute.js';

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

// ---- Middleware ----
app.use(morgan('dev'));
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN?.split(',') || '*',
    credentials: true
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ---- Static (backend/public) ----
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// ---- Routes ----
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/students', studentRoute);

// NEW API
app.use('/api/auth', authRoutes);
app.use('/api/topics', topicRoutes);

// ---- 404 & Error ----
app.use(notFound);
app.use(errorHandler);

export default app;
