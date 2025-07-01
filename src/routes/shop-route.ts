import express from "express";
import {
  createProduct,
  deleteProduct,
  editProduct,
  getOrder,
  getProduct,
  createOrder,
  deleteOrder,
} from "../controllers/shop-controller";

const router = express.Router();

router.get("/products", getProduct);
router.post("/products", createProduct);
router.delete("/products/:id", deleteProduct);
router.put("/products/:id", editProduct);

router.get("/orders", getOrder);
router.post("/orders", createOrder);
router.delete("/orders/:id", deleteOrder);

export default router;
