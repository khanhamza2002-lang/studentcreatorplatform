const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  buyProduct,
  getMyOrders,
  getSellerSales,
} = require("../controllers/orderController");

// Purchase Product
router.post("/", authMiddleware, buyProduct);

// Buyer's Orders
router.get("/my-orders", authMiddleware, getMyOrders);

router.get("/my-sales", authMiddleware, getSellerSales);

module.exports = router;