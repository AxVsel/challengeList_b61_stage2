import express from "express";
import { updateItemWithSupplier } from "../controllers/shop-controller";

const router = express.Router();

router.put("/suppliers-stock", updateItemWithSupplier);
// router.get("/user-points/:id", userPoints);

export default router;
