// backend/app.js
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
import usersRouter from './routes/users.js';
import studentRoute from './routes/studentRoute.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ---- Load env & connect DB early ----
loadEnv();
await connectDB(process.env.MONGO_URI);

const app = express();

// ---- Middleware ----
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ---- Static (backend/public) ----
app.use(express.static(path.join(__dirname, 'public')));

// ---- Routes ----
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/students', studentRoute);

// ---- 404 fallback (JSON) ----
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

export default app;
