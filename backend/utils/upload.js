import multer from 'multer';
import path from 'path';

// Define the directory where files will be saved
const UPLOAD_DESTINATION = 'uploads/topic-resources/';

// Configure disk storage
const storage = multer.diskStorage({
  // 1. Define the destination folder
  destination: function (req, file, cb) {
    // NOTE: This folder MUST exist before the server runs!
    cb(null, UPLOAD_DESTINATION); 
  },
  // 2. Define a unique filename
  filename: function (req, file, cb) {
    // Uses the original extension and appends a timestamp to prevent name clashes
    const ext = path.extname(file.originalname);
    // Assuming topicId is available in req.params (e.g., from the URL)
    const topicIdentifier = req.params.topicId || 'unknown'; 
    cb(null, `${topicIdentifier}-${Date.now()}${ext}`);
  }
});

// Create the Multer instance
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 } // Optional: Limit file size to 5MB
});

export default upload;