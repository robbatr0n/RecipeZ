import { Recipe } from "../models/recipe";
import { v4 as uuid } from "uuid";

export function transformRecipe(recipe: Recipe): Recipe {
  const transformedRecipe: Recipe = {
    id: recipe.id || uuid(),
    name: recipe.name,
    description: recipe.description,
    date: recipe.date,
    category: recipe.category,
    recipeIngredients: recipe.recipeIngredients.map((ingredient) => ({
      amount: ingredient.amount,
      unit: ingredient.unit,
      ingredient: {
        name: ingredient.ingredient.name,
      },
    })),
    instructions: recipe.instructions.map((instruction) => ({
      step: instruction.step,
      text: instruction.text,
    })),
  };

  return transformedRecipe;
}
