const pool = require("../config/db");

// Add to Wishlist
const addToWishlist = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { product_id } = req.body;

    await pool.query(
      `INSERT INTO wishlist (user_id, product_id)
       VALUES ($1,$2)
       ON CONFLICT (user_id, product_id)
       DO NOTHING`,
      [user_id, product_id]
    );

    res.json({
      success: true,
      message: "Added to wishlist",
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get Wishlist
const getWishlist = async (req, res) => {
  try {
    const user_id = req.user.id;

    const result = await pool.query(
      `SELECT
          products.*,
          users.full_name
       FROM wishlist
       JOIN products
       ON wishlist.product_id = products.id
       JOIN users
       ON products.seller_id = users.id
       WHERE wishlist.user_id = $1`,
      [user_id]
    );

    res.json({
      success: true,
      products: result.rows,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Remove from Wishlist
const removeWishlist = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { id } = req.params;

    await pool.query(
      `DELETE FROM wishlist
       WHERE user_id = $1
       AND product_id = $2`,
      [user_id, id]
    );

    res.json({
      success: true,
      message: "Removed from wishlist",
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
  addToWishlist,
  getWishlist,
  removeWishlist,
};