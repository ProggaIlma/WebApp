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

// POST route for multiple file upload
uploadrouter.post('/', upload.array('images', 10), async (req, res) => {
  try {
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const tempDir = path.join(__dirname, 'temp');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }

    const uploadedUrls = [];

    for (const file of files) {
      const ext = path.extname(file.originalname) || '.png';
      const fileName = `temp-upload-${Date.now()}-${Math.random().toString(36).substr(2, 5)}${ext}`;
      const tempPath = path.join(tempDir, fileName);

      // Write buffer to temp file
      fs.writeFileSync(tempPath, file.buffer);

      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(tempPath, {
        public_id: `upload_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`
      });

      // Delete temp file
      fs.unlinkSync(tempPath);

      uploadedUrls.push(result.secure_url);
    }

    return res.json({ message: 'Upload successful', urls: uploadedUrls });

  } catch (err) {
    console.error('Upload error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default uploadrouter;
