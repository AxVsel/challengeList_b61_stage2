import express from "express";
import {
  getUser,
  getUserByPost,
  createUser,
  editUser,
  deleteUser,
} from "../controllers/user-controller";

import {
  getPost,
  createPost,
  editPost,
  deletePost,
} from "../controllers/post-controller";

const router = express.Router();

router.get("/user", getUser);
router.post("/user", createUser);
router.put("/user/:id", editUser);
router.get("/user/:id", getUserByPost);
router.delete("/user/:id", deleteUser);

router.get("/post", getPost);
router.post("/post", createPost);
router.put("/post/:id", editPost);
router.delete("/post/:id", deletePost);

export default router;
