import express from "express";
import {
  getUserComments,
  addUserComment,
  deleteUserComment,
} from "../controllers/commentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(protect, getUserComments)
  .post(protect, addUserComment)
  .delete(protect, deleteUserComment);

export default router;
