import { Router } from "express";
import {
  createReview,
  getReviews,
  getReviewById,
  updateReview,
  deleteReview
} from "../controllers/review.controller.js";

const reviewrouter = Router();

// Routes
reviewrouter.post("/create-review", createReview);
reviewrouter.get("/getReviews", getReviews);
reviewrouter.get("/:id", getReviewById);
reviewrouter.patch("/:id", updateReview);
reviewrouter.delete("/:id", deleteReview);

export default reviewrouter;
