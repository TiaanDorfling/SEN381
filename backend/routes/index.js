// backend/routes/index.js
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Health check
router.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'SEN381 backend' });
});

// (Optional) show which env keys exist (no values)
router.get('/health/env-keys', (req, res) => {
  const keys = Object.keys(process.env).filter(k => ['MONGO_URI', 'PORT'].includes(k));
  res.json({ envKeys: keys });
});

// Serve static landing page from backend/public
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

export default router;
