const pool = require("../config/db");

// Buy Product
const buyProduct = async (req, res) => {
  try {
    const buyer_id = req.user.id;
    const { product_id } = req.body;

    const product = await pool.query(
      `SELECT * FROM products WHERE id = $1`,
      [product_id]
    );

    if (product.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    if (product.rows[0].sold) {
  return res.status(400).json({
    success: false,
    message: "This product has already been sold.",
  });
}

    await pool.query(
      `INSERT INTO orders
      (buyer_id, seller_id, product_id)
      VALUES ($1, $2, $3)`,
      [
        buyer_id,
        product.rows[0].seller_id,
        product_id,
      ]

      
    );
    console.log("Buying product:", product_id);
    
    await pool.query(
  `UPDATE products
   SET sold = TRUE
   WHERE id = $1`,
  [product_id]
);

    res.json({
      success: true,
      message: "Purchase successful!",
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Buyer's Orders
const getMyOrders = async (req, res) => {
  try {
    const buyer_id = req.user.id;

    const orders = await pool.query(
      `SELECT
        orders.*,
        products.title,
        products.price,
        products.image_url,
        users.full_name AS seller_name
      FROM orders
      JOIN products
      ON orders.product_id = products.id
      JOIN users
      ON orders.seller_id = users.id
      WHERE buyer_id = $1
      ORDER BY orders.created_at DESC`,
      [buyer_id]
    );

    res.json({
      success: true,
      orders: orders.rows,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Seller Sales
const getSellerSales = async (req, res) => {
  try {
    const seller_id = req.user.id;

    const result = await pool.query(
      `SELECT
          orders.id,
          orders.created_at,
          products.title,
          products.price,
          products.image_url,
          users.full_name AS buyer_name
       FROM orders
       JOIN products
         ON orders.product_id = products.id
       JOIN users
         ON orders.buyer_id = users.id
       WHERE orders.seller_id = $1
       ORDER BY orders.created_at DESC`,
      [seller_id]
    );

    res.json({
      success: true,
      sales: result.rows,
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
  buyProduct,
  getMyOrders,
  getSellerSales,
};