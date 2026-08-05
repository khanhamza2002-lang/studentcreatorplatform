const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  addToWishlist,
  getWishlist,
  removeWishlist,
} = require("../controllers/wishlistController");

router.post("/", authMiddleware, addToWishlist);

router.get("/", authMiddleware, getWishlist);

router.delete("/:id", authMiddleware, removeWishlist);

module.exports = router;