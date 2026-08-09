const pool = require("../config/db");

// Dashboard Statistics
const getStats = async (req, res) => {
  try {
    const users = await pool.query("SELECT COUNT(*) FROM users");
    const products = await pool.query("SELECT COUNT(*) FROM products");
    const messages = await pool.query("SELECT COUNT(*) FROM messages");

    res.json({
      success: true,
      stats: {
        users: users.rows[0].count,
        products: products.rows[0].count,
        messages: messages.rows[0].count,
      },
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get All Users
const getUsers = async (req, res) => {
  try {
    const users = await pool.query(
      `SELECT id, full_name, email, role
       FROM users
       ORDER BY id`
    );

    res.json({
      success: true,
      users: users.rows,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get All Products
const getProductsAdmin = async (req, res) => {
  try {
    const products = await pool.query(
      `SELECT
        products.*,
        users.full_name
      FROM products
      JOIN users
      ON users.id = products.seller_id
      ORDER BY products.created_at DESC`
    );

    res.json({
      success: true,
      products: products.rows,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      "DELETE FROM products WHERE id = $1",
      [id]
    );

    res.json({
      success: true,
      message: "Product deleted successfully",
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      "DELETE FROM users WHERE id = $1",
      [id]
    );

    res.json({
      success: true,
      message: "User deleted successfully",
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const approveProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `UPDATE products
       SET approved = TRUE
       WHERE id = $1
       RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      message: "Product approved successfully",
      product: result.rows[0],
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
  getStats,
  getUsers,
  getProductsAdmin,
  deleteProduct,
  deleteUser,
  approveProduct,
};