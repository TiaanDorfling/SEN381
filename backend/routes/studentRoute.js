import express from 'express';
import StudentModel from '../model/StudentModel.js';

const router = express.Router();

router.get('/get-student', (req, res) => {
  try {
    const student = new StudentModel({
      name: 'Tiaan Dorfling',
      email: 'tiaan@student.belgiumcampus.ac.za',
      passwordHash: 'hashedPass',
      academicBackground: 'Software Engineering',
      role: 'student'
    });
    res.json({
      message: `Student created: ${student.name}, Email: ${student.email}, Role: ${student.role}`
    });
  } catch (err) {
    console.error('Error in /students/get-student:', err);
    res.status(500).json({ error: 'Server error creating student' });
  }
});


export default router;
