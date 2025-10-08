import express from 'express';
import { Student } from '../model/Student.js';

const router = express.Router();

router.get('/test', (req, res) => {
  const student = new Student(1, 'Tiaan', 'tiaan@example.com', 'hashedPass', 'CS Major');
  res.json({ message: `Student created: ${student.name}` });
});

export default router;