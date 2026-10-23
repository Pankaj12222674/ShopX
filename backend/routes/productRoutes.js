import express from "express";
import {
  createProduct,
  fetchAllProduct,
  fetchProductById,
  updateProduct,
} from "../controllers/productController.js";
import auth, { protect} from "../middleware/authMiddleware.js";
import { upload } from "../config/cloudinary.js";

const router = express.Router();

// Public
router.get("/", fetchAllProduct);
router.get("/:id", fetchProductById);

// Admin only
router.post("/", auth, protect, upload.single("image"), createProduct);
router.put("/:id", auth, protect, updateProduct);

//super Admin only
router.post("/", auth, protect, upload.single("image"), createProduct);
router.put("/:id", auth, protect, updateProduct);
export default router;