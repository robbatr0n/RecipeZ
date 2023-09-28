import { createContext, useContext } from 'react';

import RecipeStore from './recipeStore';
import CommonStore from './commonStore';
import ModalStore from './modalStore';
import UserStore from './userStore';

interface Store {
	recipeStore: RecipeStore;
	commonStore: CommonStore;
	modalStore: ModalStore;
	userStore: UserStore;
}

export const store: Store = {
	recipeStore: new RecipeStore(),
	commonStore: new CommonStore(),
	modalStore: new ModalStore(),
	userStore: new UserStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
	return useContext(StoreContext);
}
