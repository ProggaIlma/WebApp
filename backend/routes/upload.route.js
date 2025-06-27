import express from 'express';
import multer from 'multer';
import cloudinary from '../config/cloudinaryConfig.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadrouter = express.Router();

// Use memory storage so files stay in RAM
const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST route for **single** file upload
uploadrouter.post('/', upload.single('image'), async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const ext = path.extname(file.originalname) || '.png';
    const fileName = `temp-upload-${Date.now()}-${Math.random().toString(36).substr(2, 5)}${ext}`;
    const tempDir = path.join(__dirname, 'temp');

    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }

    const tempPath = path.join(tempDir, fileName);

    // Write buffer to temp file
    fs.writeFileSync(tempPath, file.buffer);

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(tempPath, {
      public_id: `upload_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`
    });

    // Delete temp file
    fs.unlinkSync(tempPath);

    return res.json({ message: 'Upload successful', url: result.secure_url });

  } catch (err) {
    console.error('Upload error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default uploadrouter;
