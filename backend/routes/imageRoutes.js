import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getImages,
  updateImage,
  uploadImage,
} from "../controllers/imageController.js";

const router = express.Router();

router
  .route("/")
  .post(protect, uploadImage)
  .get(protect, getImages)
  .put(protect, updateImage);

export default router;
