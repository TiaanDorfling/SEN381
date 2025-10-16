// ============================================================================
//  CampusLearn Backend – Express App Entry Point
//  Author: Thian du Plessis
//  Description: Sets up Express, loads environment vars, connects MongoDB,
//  registers discriminators, and wires up all API routes and middleware.
// ============================================================================

import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// --- Loaders ---
import { loadEnv } from './config/loadEnv.js';
import { connectDB } from './config/db.js';

// --- Load environment variables first ---
loadEnv();

// --- Ensure all discriminators are registered BEFORE any routes ---
import './model/UserModel.js';
import './model/AdminModel.js';
import './model/TutorModel.js';
import './model/StudentModel.js';
console.log('✅ User discriminators (Admin, Tutor, Student) loaded successfully');

// --- Connect to MongoDB ---
await connectDB(process.env.MONGO_URI);

// --- Express initialization ---
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ============================================================================
//  MIDDLEWARE CONFIGURATION
// ============================================================================

// Detailed request logger (development only)
app.use((req, res, next) => {
  console.log('--- Incoming Request ---');
  console.log('Method:', req.method);
  console.log('Path:', req.path);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  console.log('------------------------');
  next();
});

app.use(morgan('dev'));

// Allow frontend (React) access for cookies and requests
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN?.split(',') || '*',
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ============================================================================
//  STATIC FILES
// ============================================================================
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'));
// ============================================================================
//  ROUTE IMPORTS
// ============================================================================
import indexRouter from './routes/index.js';
import authRoutes from './routes/auth.js';
import topicRoutes from './routes/topics.js';
import questionRoutes from './routes/question.js';
import userRouter from './routes/userRoute.js';
import aiRoutes from './routes/ai.js';
import studentRoute from './routes/studentRoute.js';

// ============================================================================
//  ROUTE REGISTRATION
// ============================================================================
app.use('/', indexRouter);
app.use('/api/auth', authRoutes);
app.use('/api/topics', topicRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/user', userRouter);
app.use('/api/ai', aiRoutes);
app.use('/students', studentRoute);

// ============================================================================
//  ERROR HANDLERS
// ============================================================================
import { notFound, errorHandler } from './middleware/error.js';

app.use(notFound);
app.use(errorHandler);

// ============================================================================
//  EXPORT APP
// ============================================================================
export default app;
