const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  addReview,
  getReviews,
  getAverageRating,
} = require("../controllers/reviewController");

// Add or Update Review
router.post("/", authMiddleware, addReview);

// Average Rating (keep this BEFORE :productId)
router.get("/rating/:productId", getAverageRating);

// Reviews
router.get("/:productId", getReviews);

module.exports = router;