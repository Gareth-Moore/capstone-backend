import express from "express";
import {
  addUserRecipe,
  authUser,
  deleteUserRecipes,
  getUserProfile,
  getUserRecipes,
  logoutUser,
  registerUser,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/auth", authUser);
router.post("/", registerUser);
router.post("/logout", logoutUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route("/recipe")
  .put(protect, addUserRecipe)
  .get(protect, getUserRecipes)
  .delete(protect, deleteUserRecipes);

export default router;
