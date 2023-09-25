import { createContext, useContext } from "react";

import RecipeStore from "./recipeStore";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";

interface Store {
  recipeStore: RecipeStore;
  commonStore: CommonStore;
  modalStore: ModalStore;
}

export const store: Store = {
  recipeStore: new RecipeStore(),
  commonStore: new CommonStore(),
  modalStore: new ModalStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
