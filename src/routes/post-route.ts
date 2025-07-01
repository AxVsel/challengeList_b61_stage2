import express from "express";
import {
  getPostByCategorie,
  getCommentLimit,
  getCommentSummary,
} from "../controllers/post-controller";

const router = express.Router();

router.get("/posts", getPostByCategorie);
router.get("/posts/:id/comments", getCommentLimit);
router.get("/posts/comments-summary", getCommentSummary);

export default router;
