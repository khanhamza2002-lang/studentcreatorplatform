const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  createProduct,
  getProducts,
  searchProducts,
  getProductById,
  getMyProducts,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController");
// Get All Products
router.get("/", getProducts);

// Create Product
router.get("/my-products", authMiddleware, getMyProducts);
router.get("/search", searchProducts);
router.get("/:id", getProductById);
router.post("/", authMiddleware, upload.single("image"), createProduct);
router.delete("/:id", authMiddleware, deleteProduct);
router.put("/:id", authMiddleware, updateProduct);
module.exports = router;