import express from 'express';
import { UserFactory } from '../controller/UserFactory.js';

const router = express.Router();

router.get('/create-student', (req, res) => {

  // Example data coming from a request body or database
  const userData = { 
      userID: 'u123', 
      name: 'John Doe', 
      email: 'john@example.com', 
      passwordHash: 'hashed12345' 
  };

  const newStudent = UserFactory.createUser('student',userData);

  res.json({ message: `Student created: ${newStudent.userID}, ${newStudent.name}, ${newStudent.email}` });
});

export default router;