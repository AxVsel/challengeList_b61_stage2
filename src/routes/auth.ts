import express from "express";
import {
  handleRegister,
  handleLogin,
  handlePasswordResetRequest,
  handleResetPasswordSubmit,
  handleSupplier,
  handleCreateProduct,
} from "../controllers/auth";
import { authenticate } from "../middlewares/auth";
import { authenticateAdminOnly } from "../middlewares/authorizeRole";

const router = express.Router();
router.post("/register", handleRegister);
router.post("/login", handleLogin);
router.post("/suppliers/login", handleSupplier);
router.post("/reset/request", handlePasswordResetRequest);
router.post("/reset/submit", handleResetPasswordSubmit);

router.post("/products/add", authenticateAdminOnly, handleCreateProduct);

router.get("/me", authenticate, (req, res) => {
  res.json({ message: "Protected route" });
});

export default router;
