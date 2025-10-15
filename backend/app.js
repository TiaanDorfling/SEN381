import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { loadEnv } from './config/loadEnv.js';
import { connectDB } from './config/db.js';

// Routers
import indexRouter from './routes/index.js';
import authRoutes from './routes/auth.js';
import topicRoutes from './routes/topics.js';
import questionRoutes from './routes/question.js';
import { notFound, errorHandler } from './middleware/error.js';
import userRouter from './routes/userRoute.js';

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
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN?.split(',') || '*',
    credentials: true
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ---- Static ----
app.use(express.static(path.join(__dirname, 'public')));

// ---- Routes ----
app.use('/', indexRouter);
app.use('/api/auth', authRoutes);
app.use('/api/topics', topicRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/user', userRouter)

// ---- 404 & Error ----
app.use(notFound);
app.use(errorHandler);

export default app;
