const pool = require("../config/db");

// Create Product
const createProduct = async (req, res) => {
  try {
    const { title, description, price, category } = req.body;

    const seller_id = req.user.id;

    const image_url = req.file
      ? `/uploads/${req.file.filename}`
      : null;

    if (!title || !description || !price || !category) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields.",
      });
    }

    await pool.query(
      `INSERT INTO products
      (seller_id, title, description, price, category, image_url)
      VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        seller_id,
        title,
        description,
        price,
        category,
        image_url,
      ]
    );

    res.status(201).json({
      success: true,
      message: "Product uploaded successfully!",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get All Products
const getProducts = async (req, res) => {
  try {
    const products = await pool.query(
      `SELECT
        products.*,
        users.full_name
      FROM products
      JOIN users
      ON products.seller_id = users.id
      ORDER BY products.created_at DESC`
    );

    res.json({
      success: true,
      products: products.rows,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get Single Product
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT
        products.*,
        users.full_name
      FROM products
      JOIN users
      ON products.seller_id = users.id
      WHERE products.id = $1`,
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
      product: result.rows[0],
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get Logged-in User's Products
const getMyProducts = async (req, res) => {
  try {
    const seller_id = req.user.id;

    const products = await pool.query(
      `SELECT *
    id,
    title,
    description,
    price,
    category,
    image_url,
    sold,
    created_at
FROM products
WHERE seller_id = $1
ORDER BY created_at DESC`,
      [seller_id]
    );

    res.json({
      success: true,
      products: products.rows,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const seller_id = req.user.id;

    const result = await pool.query(
      `DELETE FROM products
       WHERE id = $1
       AND seller_id = $2
       RETURNING *`,
      [id, seller_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found or you don't own it.",
      });
    }

    res.json({
      success: true,
      message: "Product deleted successfully.",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
const searchProducts = async (req, res) => {
  try {
    const { search = "", category = "" } = req.query;

    let query = `
      SELECT
        products.*,
        users.full_name
      FROM products
      JOIN users
      ON products.seller_id = users.id
      WHERE 1=1
    `;

    const values = [];
    let count = 1;

    if (search) {
      query += ` AND LOWER(products.title) LIKE LOWER($${count})`;
      values.push(`%${search}%`);
      count++;
    }

    if (category) {
      query += ` AND products.category = $${count}`;
      values.push(category);
      count++;
    }

    query += ` ORDER BY products.created_at DESC`;

    const result = await pool.query(query, values);

    res.json({
      success: true,
      products: result.rows,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const { title, description, price, category } = req.body;

    const seller_id = req.user.id;

    const result = await pool.query(
      `UPDATE products
       SET title=$1,
           description=$2,
           price=$3,
           category=$4
       WHERE id=$5
       AND seller_id=$6
       RETURNING *`,
      [
        title,
        description,
        price,
        category,
        id,
        seller_id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    res.json({
      success: true,
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
  createProduct,
  getProducts,
  searchProducts,
  getProductById,
  getMyProducts,
  deleteProduct,
  updateProduct,
};