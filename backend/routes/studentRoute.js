import express from 'express';
import { UserFactory } from '../controller/UserFactory.js';

const router = express.Router();

router.get('/get-student', (req, res) => {

  const mockDbData = { 
      _id: '60c72b2f9f1b2c001c8e1d2a', // MongoDB's unique ID
      name: 'Jane Doe', 
      email: 'jane@example.com', 
      academicBackground: 'BCOMP Student',
      // Mongoose automatically adds 'role: student' based on the model/discriminator
  };

  try{
  const Student = UserFactory.createUser('student',mockDbData);

  const studentName = Student.name;
  const studentID = Student._id; 
  const studentRole = Student.role;
  const studentEmail = Student.email;

  return res.status(200).json({ 
      message: `Student document loaded from mock data.`,
      student: {
          id: studentID,
          name: studentName,
          email: studentEmail,
          role: studentRole,
          academicBackground: Student.academicBackground
      }
  });
  }
  catch(error){
    console.error("Error loading student:", error);
    return res.status(500).json({ message: "Server error loading student." });
  }

});

export default router;