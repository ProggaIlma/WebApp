import express from 'express';

import multer from 'multer';
import cloudinary from '../config/cloudinaryConfig.js'; // Import Cloudinary config

const uploadrouter = express.Router();

// Configure multer to store uploaded images in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// POST route for uploading images
uploadrouter.post('/', upload.single('image'), async (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).send('No file uploaded.');
        }

        // Upload the image to Cloudinary
        const uploadResult = await cloudinary.uploader.upload_stream(
            {
                public_id: `image_${Date.now()}`, // You can change the filename here
                resource_type: 'image', // Ensure it's an image
            },
            (error, result) => {
                if (error) {
                    return res.status(500).send('Error uploading to Cloudinary');
                }
                
                // Respond with the uploaded image URL
                res.status(200).json({
                    message: 'File uploaded successfully!',
                    fileUrl: result.secure_url,  // URL of the uploaded image
                });
            }
        );

        // Pipe the buffer from multer to Cloudinary upload stream
        uploadResult.end(file.buffer);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    }
});

export default uploadrouter;
