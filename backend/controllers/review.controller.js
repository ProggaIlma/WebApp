import Review from "../models/review.model.js";
import { PaginationHelper } from "../utils/helpers/pagination.helper.js";
import mongoose from "mongoose";

const createReview = async (req, res) => {
  try {
    const { productId, userId, rating, comment } = req.body;

    if (!productId || !userId || rating == null) {
      return res.status(400).json({ error: "productId, userId and rating are required." });
    }

    const review = await Review.create({
      productId,
      userId,
      rating,
      comment,
    });

    return res.status(201).json({ message: "Review created successfully", review });
  } catch (error) {
    console.error("Review Creation Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getReviews = async (req, res) => {
  try {
    const p_info = {
      page: req.query.page,
      pageSize: req.query.limit || req.query.pageSize,
    };

    const filter = {}; // You can add filtering by productId, userId, etc.

    const pagination = PaginationHelper.createPaginationFilter(filter, p_info);

    if (Array.isArray(pagination)) {
      return res.status(400).json({
        code: 400,
        status: "BAD_REQUEST",
        errors: pagination,
      });
    }

    const { offset, limit, where, page } = pagination;

    const [reviews, total] = await Promise.all([
      Review.find(where).skip(offset).limit(limit),
      Review.countDocuments(where),
    ]);

    const response = PaginationHelper.prepareResponse(reviews, page, limit, total);

    return res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return res.status(500).json({
      code: 500,
      status: "INTERNAL_SERVER_ERROR",
      error: "Failed to fetch reviews",
    });
  }
};

const getReviewById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid review ID format" });
  }

  try {
    const review = await Review.findById(id);

    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    res.json(review);
  } catch (error) {
    console.error("Error fetching review:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    Object.keys(updates).forEach((key) => {
      review[key] = updates[key];
    });

    await review.save();

    return res.status(200).json({ message: "Review updated successfully", review });
  } catch (error) {
    console.error("Review Update Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    const review = await Review.findByIdAndDelete(id);

    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    return res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Review Deletion Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export {
  createReview,
  getReviews,
  getReviewById,
  updateReview,
  deleteReview,
};
