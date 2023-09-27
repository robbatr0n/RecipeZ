import { makeAutoObservable, runInAction } from "mobx";
import { v4 as uuid } from "uuid";

import { transformRecipe } from "../helpers/transformRecipe";
import { Recipe } from "../models/recipe";
import agent from "../api/agent";

export default class RecipeStore {
  recipeRegistry = new Map<string, Recipe>();
  selectedRecipe: Recipe | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = false;

  constructor() {
    makeAutoObservable(this);
  }

  get recipesByDate() {
    return Array.from(this.recipeRegistry.values()).sort(
      (a, b) => a.date!.getTime() - b.date!.getTime()
    );
  }

  loadRecipes = async () => {
    this.setLoadingInitial(true);
    try {
      const recipes = await agent.Recipes.list();
      runInAction(() => {
        recipes.forEach((recipe) => {
          this.setRecipe(recipe);
        });
      });
      this.setLoadingInitial(false);
    } catch (error) {
      this.setLoadingInitial(false);
      console.log(error);
    }
  };

  loadRecipe = async (id: string) => {
    let recipe = this.getRecipe(id);
    console.log(recipe);
    if (recipe) {
      this.selectedRecipe = recipe;
      return recipe;
    } else {
      this.setLoadingInitial(true);
      try {
        recipe = await agent.Recipes.details(id);
        console.log(recipe);
        this.setRecipe(recipe);
        runInAction(() => {
          this.selectedRecipe = recipe;
        });
        this.setLoadingInitial(false);
        return recipe;
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  };

  private setRecipe = (recipe: Recipe) => {
    recipe.date = new Date(recipe.date!);
    this.recipeRegistry.set(recipe.id, recipe);
  };

  private getRecipe = (id: string) => {
    return this.recipeRegistry.get(id);
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  createRecipe = async (recipe: Recipe) => {
    this.loading = true;
    recipe.id = uuid();
    const transformedRecipe = transformRecipe(recipe);

    try {
      await agent.Recipes.create(transformedRecipe);
      runInAction(() => {
        this.recipeRegistry.set(transformedRecipe.id, transformedRecipe);
        this.selectedRecipe = recipe;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  updateRecipe = async (recipe: Recipe) => {
    this.loading = true;
    const transformedRecipe = transformRecipe(recipe);
    console.log(transformedRecipe);
    try {
      await agent.Recipes.update(transformedRecipe);
      runInAction(() => {
        this.recipeRegistry.set(recipe.id, recipe);
        this.selectedRecipe = recipe;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  deleteRecipe = async (id: string) => {
    this.loading = true;
    try {
      await agent.Recipes.delete(id);
      runInAction(() => {
        this.recipeRegistry.delete(id);
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}
