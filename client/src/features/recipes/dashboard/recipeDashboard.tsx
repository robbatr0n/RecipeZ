import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import RecipeList from "./recipeList";
import RecipeFilters from "./recipeFilters";

export default observer(function ActivityDashboard() {
  const { recipeStore } = useStore();
  const { loadRecipes, recipeRegistry } = recipeStore;

  useEffect(() => {
    if (recipeRegistry.size <= 1) loadRecipes();
  }, [loadRecipes, recipeRegistry.size]);
  if (recipeStore.loadingInitial)
    return <LoadingComponent content="Loading recipes..." />;

  return (
    <Grid>
      <Grid.Column width="10">
        <RecipeList />
      </Grid.Column>
      <Grid.Column width="6">
        <RecipeFilters />
      </Grid.Column>
    </Grid>
  );
});
