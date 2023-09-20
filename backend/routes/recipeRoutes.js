import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getRecipeById,
  uploadRecipe,
} from "../controllers/recipeController.js";

const router = express.Router();

router.route("/").post(protect, uploadRecipe).get(protect, getRecipeById);

export default router;
