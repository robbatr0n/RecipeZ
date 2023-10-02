import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Grid, Loader } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import RecipeList from './recipeList';
import RecipeFilters from './recipeFilters';
import { PagingParams } from '../../../app/models/pagination';
import InfiniteScroll from 'react-infinite-scroller';

export default observer(function RecipeDashboard() {
	const { recipeStore } = useStore();
	const { loadRecipes, recipeRegistry, setPagingParams, pagination } = recipeStore;
	const [loadingNext, setLoadingNext] = useState(false);

	function handleGetNext() {
		setLoadingNext(true);
		setPagingParams(new PagingParams(pagination!.currentPage + 1));
		loadRecipes().then(() => setLoadingNext(false));
	}

	useEffect(() => {
		if (recipeRegistry.size <= 1) loadRecipes();
	}, [loadRecipes, recipeRegistry.size]);

	if (recipeStore.loadingInitial && !loadingNext) return <LoadingComponent content="Loading recipes..." />;

	return (
		<Grid>
			<Grid.Column width="10">
				<InfiniteScroll
					pageStart={0}
					loadMore={handleGetNext}
					hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages}
					initialLoad={false}>
					<RecipeList />
				</InfiniteScroll>
			</Grid.Column>
			<Grid.Column width="6">
				<RecipeFilters />
			</Grid.Column>
			<Grid.Column width={10}>
				<Loader active={loadingNext} />
			</Grid.Column>
		</Grid>
	);
});
