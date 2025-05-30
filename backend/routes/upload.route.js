import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';

const uploadrouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

uploadrouter.post('/', upload.single('image'), async (req, res) => {
    try {
        const file = req.file;

        console.log("File received:", file ? file.originalname : "No file");

        if (!file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        console.log("Uploading to Cloudinary...");

        // Wrap upload stream in a promise
        const streamUpload = (buffer) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    {
                        public_id: `image_${Date.now()}`,
                        resource_type: 'image',
                    },
                    (error, result) => {
                        if (error) {
                            console.error("Cloudinary Error:", error);
                            return reject(error);
                        }
                        console.log("Cloudinary Upload Result:", result);
                        resolve(result);
                    }
                );
                stream.end(buffer); // write the image buffer to the stream
            });
        };

        const result = await streamUpload(file.buffer);

        return res.status(200).json({
            message: 'File uploaded successfully!',
            fileUrl: result.secure_url,
        });

    } catch (err) {
        console.error('Caught Error in Catch Block:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
export default uploadrouter;