import express from 'express';
import multer from 'multer';
import cloudinary from '../config/cloudinaryConfig.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadrouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

uploadrouter.post('/', upload.single('image'), async (req, res) => {
  try {
    const file = req.file;

    if (!file) return res.status(400).json({ error: 'No file uploaded' });

    // Create a unique filename based on timestamp and original extension
    const ext = path.extname(file.originalname) || '.png';
    const fileName = `temp-upload-${Date.now()}${ext}`;

    // Ensure the temp directory exists
    const tempDir = path.join(__dirname, 'temp');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }

    const tempPath = path.join(tempDir, fileName);

    // Save the image buffer to disk
    fs.writeFileSync(tempPath, file.buffer);

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(tempPath, {
      public_id: `upload_${Date.now()}`,
    });

    // Delete the temp file
    fs.unlinkSync(tempPath);

    // Send response
    return res.json({ message: 'Upload successful', fileUrl: result.secure_url });

  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default uploadrouter;
