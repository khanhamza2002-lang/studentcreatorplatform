const pool = require("../config/db");

// Add Review
const addReview = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { product_id, rating, review } = req.body;

    await pool.query(
      `INSERT INTO reviews (product_id, user_id, rating, review)
       VALUES ($1,$2,$3,$4)
       ON CONFLICT (product_id, user_id)
       DO UPDATE SET
       rating = EXCLUDED.rating,
       review = EXCLUDED.review`,
      [product_id, user_id, rating, review]
    );

    res.json({
      success: true,
      message: "Review submitted.",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get Reviews
const getReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    const result = await pool.query(
      `SELECT reviews.*, users.full_name
       FROM reviews
       JOIN users
       ON reviews.user_id = users.id
       WHERE product_id = $1
       ORDER BY created_at DESC`,
      [productId]
    );

    res.json({
      success: true,
      reviews: result.rows,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Average Rating
const getAverageRating = async (req, res) => {
  try {
    const { productId } = req.params;

    const result = await pool.query(
      `SELECT
         ROUND(AVG(rating),1) AS average,
         COUNT(*) AS total
       FROM reviews
       WHERE product_id = $1`,
      [productId]
    );

    res.json({
      success: true,
      rating: result.rows[0],
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  addReview,
  getReviews,
  getAverageRating,
};