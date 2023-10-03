import { Profile } from './profile';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface Recipe {
	id: string;
	name: string;
	description: string;
	date: Date | null;
	category: string;
	cookTime: string;
	cuisine: string;
	author?: Profile;
	authorUsername?: string;
	isAuthor?: boolean;
	authorId?: string;
	image: string;
	recipeIngredients: RecipeIngredient[];
	instructions: RecipeInstruction[];
}

export interface RecipeInstruction {
	step: number;
	text: string;
}

export interface RecipeIngredient {
	amount: number;
	unit: string;
	ingredient: {
		name: string;
	};
}

export class RecipeFormValues {
	id?: string = undefined;
	name: string = '';
	category: string = '';
	description: string = '';
	date: Date | null = null;
	cookTime: string = '';
	cuisine: string = '';
	image: string = '';
	recipeIngredients: RecipeIngredient[] = [];
	instructions: RecipeInstruction[] = [];

	constructor(recipe?: RecipeFormValues) {
		if (recipe) {
			this.id = recipe.id;
			this.name = recipe.name;
			this.category = recipe.category;
			this.description = recipe.description;
			this.date = recipe.date;
			this.cookTime = recipe.cookTime;
			this.image = recipe.image;
			this.cuisine = recipe.cuisine;
			this.recipeIngredients = recipe.recipeIngredients;
			this.instructions = recipe.instructions;
		}
	}
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class Recipe implements Recipe {
	constructor(init?: RecipeFormValues) {
		Object.assign(this, init);
	}
}
