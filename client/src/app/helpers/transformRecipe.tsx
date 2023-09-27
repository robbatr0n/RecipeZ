import { Recipe } from "../models/recipe";
import { v4 as uuid } from "uuid";

export function transformRecipe(recipe: Recipe): Recipe {
  const transformedRecipe: Recipe = {
    id: recipe.id || uuid(),
    name: recipe.name,
    description: recipe.description,
    date: recipe.date,
    category: recipe.category,
    cookTime: recipe.cookTime,
    cuisine: recipe.cuisine,
    recipeIngredients: recipe.recipeIngredients.map((_ingredient) => ({
      amount: _ingredient.amount,
      unit: _ingredient.unit,
      ingredient: {
        name: _ingredient.ingredient.name,
      },
    })),
    instructions: recipe.instructions.map((instruction) => ({
      step: instruction.step,
      text: instruction.text,
    })),
  };

  return transformedRecipe;
}
