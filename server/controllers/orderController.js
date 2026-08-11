const pool = require("../config/db");

// Buy Product
const buyProduct = async (req, res) => {
  try {
   const buyer_id = req.user.id;

const {
  product_id,
  customer_name,
  phone,
  delivery_address,
  city,
  payment_method,
} = req.body;

if (
  !product_id ||
  !customer_name ||
  !phone ||
  !delivery_address ||
  !city ||
  !payment_method
) {
  return res.status(400).json({
    success: false,
    message: "Please complete all checkout details.",
  });
}

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
  (
    buyer_id,
    seller_id,
    product_id,
    customer_name,
    phone,
    delivery_address,
    city,
    payment_method,
    order_status
  )
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
  [
    buyer_id,
    product.rows[0].seller_id,
    product_id,
    customer_name,
    phone,
    delivery_address,
    city,
    payment_method,
    "Processing",
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
      orders.customer_name,
      orders.phone,
      orders.delivery_address,
      orders.city,
      orders.payment_method,
      orders.order_status,
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

// Update Order Status
const updateOrderStatus = async (req, res) => {
  try {
    const seller_id = req.user.id;
    const order_id = req.params.id;
    const { order_status } = req.body;

    const allowedStatuses = [
      "Processing",
      "Shipped",
      "Completed",
    ];

    if (!allowedStatuses.includes(order_status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status.",
      });
    }

    const result = await pool.query(
      `UPDATE orders
       SET order_status = $1
       WHERE id = $2
       AND seller_id = $3
       RETURNING *`,
      [order_status, order_id, seller_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    res.json({
      success: true,
      message: "Order status updated successfully.",
      order: result.rows[0],
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
  updateOrderStatus,
};