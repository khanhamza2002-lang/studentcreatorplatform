const express = require("express");
const cors = require("cors");
const path = require("path");
const pool = require("./config/db");



const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const messageRoutes = require("./routes/messageRoutes");
const adminRoutes = require("./routes/adminRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const orderRoutes = require("./routes/orderRoutes");



const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Static Folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/orders", orderRoutes);


// Home Route
app.get("/", (req, res) => {
  res.json({
    message: "TMUC Student Marketplace API is running 🚀",
  });
});

// Database Test
app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");

    res.json({
      success: true,
      time: result.rows[0].now,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = app;