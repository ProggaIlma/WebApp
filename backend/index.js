// app.js
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userrouter from './routes/user.route.js';
import productrouter from './routes/product.route.js';
import categoryrouter from './routes/category.route.js';
import uploadrouter from './routes/upload.route.js';
import orderrouter from './routes/order.route.js';
import reviewrouter from './routes/review.route.js';
dotenv.config();

const app = express();

// Connect to MongoDB
await connectDB();

// Middleware
app.use(express.json()); // ✅ Add this
app.use(express.urlencoded({ extended: true })); // ✅ And this

// Routes (example)
app.get('/', (req, res) => res.send('API Running'));
app.use("/user", userrouter);
app.use("/product", productrouter);
app.use("/category", categoryrouter);
app.use("/upload", uploadrouter);
app.use("/order", orderrouter);
app.use("/review", reviewrouter);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
