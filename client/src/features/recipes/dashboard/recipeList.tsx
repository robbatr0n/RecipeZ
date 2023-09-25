import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import RecipeListItem from "./recipeListItem";

export default observer(function RecipeList() {
  const { recipeStore } = useStore();
  const { recipesByDate } = recipeStore;

  return (
    <>
      {recipesByDate.map((recipe) => (
        <RecipeListItem key={recipe.id} recipe={recipe} />
      ))}
    </>
  );
});
