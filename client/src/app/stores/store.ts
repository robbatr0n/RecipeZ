import { createContext, useContext } from 'react';

import RecipeStore from './recipeStore';
import CommonStore from './commonStore';
import ModalStore from './modalStore';
import UserStore from './userStore';
import ProfileStore from './profileStore';
import CommentStore from './commentStore';

interface Store {
	recipeStore: RecipeStore;
	commonStore: CommonStore;
	modalStore: ModalStore;
	userStore: UserStore;
	profileStore: ProfileStore;
	commentStore: CommentStore;
}

export const store: Store = {
	recipeStore: new RecipeStore(),
	commonStore: new CommonStore(),
	modalStore: new ModalStore(),
	userStore: new UserStore(),
	profileStore: new ProfileStore(),
	commentStore: new CommentStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
	return useContext(StoreContext);
}
