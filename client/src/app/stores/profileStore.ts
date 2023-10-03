import { Profile, UserRecipe } from '../models/profile';
import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';
import { toast } from 'react-toastify';

export default class ProfileStore {
	profile: Profile | null = null;
	loadingProfile = false;
	uploading = false;
	loading = false;
	userRecipes: UserRecipe[] = [];
	loadingRecipes = false;

	constructor() {
		makeAutoObservable(this);
	}

	loadProfile = async (username: string) => {
		this.loadingProfile = true;
		try {
			const profile = await agent.Profiles.get(username);
			runInAction(() => {
				this.profile = profile;
				this.loadingProfile = false;
			});
		} catch (error) {
			toast.error('Problem loading profile');
			runInAction(() => {
				this.loadingProfile = false;
			});
		}
	};

	loadUserRecipes = async (username: string, predicate?: string) => {
		this.loadingRecipes = true;
		try {
			const recipes = await agent.Profiles.listRecipes(username, predicate!);
			runInAction(() => {
				this.userRecipes = recipes;
				this.loadingRecipes = false;
			});
		} catch (error) {
			console.log(error);
			runInAction(() => {
				this.loadingRecipes = false;
			});
		}
	};
}
