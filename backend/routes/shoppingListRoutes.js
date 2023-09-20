import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getShoppingList,
  addToShoppingList,
  deleteFromShoppingList,
  addAllToShoppingList,
} from "../controllers/shoppingListController.js";

const router = express.Router();

router.route("/addall").post(protect, addAllToShoppingList);

router
  .route("/")
  .get(protect, getShoppingList)
  .post(protect, addToShoppingList)
  .delete(protect, deleteFromShoppingList);

export default router;
