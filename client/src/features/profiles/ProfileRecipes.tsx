import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Tab, Grid, Header, Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { UserRecipe } from '../../app/models/profile';
import { useStore } from '../../app/stores/store';

export default observer(function ProfileActivities() {
	const { profileStore } = useStore();
	const {
		loadUserRecipes: loadUserRecipes,
		profile,
		loadingRecipes: loadingRecipes,
		userRecipes: userRecipes,
	} = profileStore;

	useEffect(() => {
		loadUserRecipes(profile!.username);
	}, [loadUserRecipes, profile]);

	return (
		<Tab.Pane loading={loadingRecipes}>
			<Grid>
				<Grid.Column width={16}>
					<Header floated="left" icon="food" content={'Activities'} />
				</Grid.Column>
				<Grid.Column width={16}>
					<br />
					<Card.Group itemsPerRow={4}>
						{userRecipes.map((recipe: UserRecipe) => (
							<Card as={Link} to={`/activities/${recipe.id}`} key={recipe.id}>
								{/* <Image
									src={`/assets/categoryImages/${recipe.category}.jpg`}
									style={{ minHeight: 100, objectFit: 'cover' }}
								/> */}
								<Card.Content>
									<Card.Header textAlign="center">{recipe.title}</Card.Header>
									<Card.Meta textAlign="center">
										<div>
											<p>{recipe.category}</p>
											<p>{recipe.cuisine}</p>
										</div>
									</Card.Meta>
								</Card.Content>
							</Card>
						))}
					</Card.Group>
				</Grid.Column>
			</Grid>
		</Tab.Pane>
	);
});
