import { makeAutoObservable, reaction, runInAction } from 'mobx';
import { v4 as uuid } from 'uuid';
import { store } from './store';
import { transformRecipe } from '../helpers/transformRecipe';
import { Recipe } from '../models/recipe';
import agent from '../api/agent';
import { Pagination, PagingParams } from '../models/pagination';
import { Profile } from '../models/profile';
import { capitalizeFirstLetter } from '../helpers/functions';

export default class RecipeStore {
	recipeRegistry = new Map<string, Recipe>();
	selectedRecipe: Recipe | undefined = undefined;
	editMode = false;
	loading = false;
	loadingInitial = false;
	pagination: Pagination | null = null;
	pagingParams = new PagingParams();
	predicate = new Map().set('all', true);

	constructor() {
		makeAutoObservable(this);
		reaction(
			() => this.predicate.keys(),
			() => {
				this.pagingParams = new PagingParams();
				this.recipeRegistry.clear();
				this.loadRecipes();
			}
		);
	}

	setPagingParams = (pagingParams: PagingParams) => {
		this.pagingParams = pagingParams;
	};

	setPredicate = (predicate: string, value: string | Date) => {
		const resetPredicate = () => {
			this.predicate.forEach((value, key) => {
				this.predicate.delete(key);
			});
		};
		switch (predicate) {
			case 'all':
				resetPredicate();
				this.predicate.set('all', true);
				break;
			case 'isBreakfast':
				resetPredicate();
				this.predicate.set('isBreakfast', true);
				break;
			case 'isLunch':
				resetPredicate();
				this.predicate.set('isLunch', true);
				break;
			case 'isDinner':
				resetPredicate();
				this.predicate.set('isDinner', true);
				break;
		}
	};

	get axiosParams() {
		const params = new URLSearchParams();
		params.append('pageNumber', this.pagingParams.pageNumber.toString());
		params.append('pageSize', this.pagingParams.pageSize.toString());
		this.predicate.forEach((value, key) => {
			if (key === 'startDate') {
				params.append(key, (value as Date).toISOString());
			} else {
				params.append(key, value);
			}
		});
		return params;
	}

	get recipesByDate() {
		return Array.from(this.recipeRegistry.values()).sort((a, b) => a.date!.getTime() - b.date!.getTime());
	}

	loadRecipes = async () => {
		this.setLoadingInitial(true);
		try {
			const result = await agent.Recipes.list(this.axiosParams);
			runInAction(() => {
				result.data.forEach((recipe) => {
					this.setRecipe(recipe);
				});
			});
			this.setPagination(result.pagination);
			this.setLoadingInitial(false);
		} catch (error) {
			this.setLoadingInitial(false);
			console.log(error);
		}
	};

	setPagination = (pagination: Pagination) => {
		this.pagination = pagination;
	};

	loadRecipe = async (id: string) => {
		let recipe = this.getRecipe(id);
		if (recipe) {
			this.selectedRecipe = recipe;
			return recipe;
		} else {
			this.setLoadingInitial(true);
			try {
				recipe = await agent.Recipes.details(id);
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
		const user = store.userStore!.user;
		const profile = new Profile(user!);
		this.loading = true;
		recipe.id = uuid();
		recipe.category = capitalizeFirstLetter(recipe.category);
		const transformedRecipe = transformRecipe(recipe);
		transformedRecipe.author = profile;

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
