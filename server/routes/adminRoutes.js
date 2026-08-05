const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {
  getStats,
  getUsers,
  getProductsAdmin,
  deleteProduct,
  deleteUser,
} = require("../controllers/adminController");

router.get(
  "/stats",
  authMiddleware,
  adminMiddleware,
  getStats
);

router.get(
  "/users",
  authMiddleware,
  adminMiddleware,
  getUsers
);

router.get(
  "/products",
  authMiddleware,
  adminMiddleware,
  getProductsAdmin
);

router.delete(
  "/products/:id",
  authMiddleware,
  adminMiddleware,
  deleteProduct
);

router.delete(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  deleteUser
);

module.exports = router;