import { Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import RecipeDetailedHeader from './RecipeDetailedHeader';
import RecipeDetailedInfo from './RecipeDetailedInfo';
import RecipeDetailedChat from './RecipeDetailedChat';

export default observer(function RecipeDetails() {
	const { recipeStore } = useStore();
	const { selectedRecipe: recipe, loadRecipe, loadingInitial } = recipeStore;
	const { id } = useParams();

	useEffect(() => {
		if (id) loadRecipe(id);
	}, [id, loadRecipe]);

	if (loadingInitial || !recipe) return <LoadingComponent />;

	return (
		<Grid>
			<Grid.Column width="16">
				<RecipeDetailedHeader recipe={recipe} />
				<RecipeDetailedInfo recipe={recipe} />
				<RecipeDetailedChat recipeId={recipe.id} />
			</Grid.Column>
		</Grid>
	);
});
