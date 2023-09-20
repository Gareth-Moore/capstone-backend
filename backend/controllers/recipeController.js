import asyncHandler from "express-async-handler";
import Recipe from "../models/recipeModel.js";

const uploadRecipe = asyncHandler(async (req, res) => {
  const recipe = req.body;

  recipe.extendedIngredients = recipe.extendedIngredients.filter((value) => {
    return value.name != "";
  });
  const upload = await Recipe.create({ ...recipe });

  if (upload) {
    res.status(200).json({ recipes });
  } else {
    res.status(500).json({ message: "Could not create recipe" });
  }
});

const getRecipeById = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findOne({ id: req.query.id });
  if (recipe) {
    return res.status(200).json({ recipe });
  } else {
    return res.status(404).json({ message: "Recipe not found" });
  }
});

export { uploadRecipe, getRecipeById };
