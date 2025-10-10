import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cors from 'cors';

import studentRoute from './routes/studentRoute.js';
import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import aiRouter from './routes/aiRouter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/students', studentRoute);
app.use('/ai', aiRouter);

export default app;
