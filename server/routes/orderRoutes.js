const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  buyProduct,
  getMyOrders,
  getSellerSales,
  updateOrderStatus,
} = require("../controllers/orderController");

// Purchase Product
router.post("/", authMiddleware, buyProduct);

// Buyer's Orders
router.get("/my-orders", authMiddleware, getMyOrders);

router.get("/my-sales", authMiddleware, getSellerSales);

router.put(
  "/:id/status",
  authMiddleware,
  updateOrderStatus
);

module.exports = router;