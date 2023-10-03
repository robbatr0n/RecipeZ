import { Button, Header, Item, Segment, Image, Popup, PopupContent, Grid } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

import { Recipe } from '../../../app/models/recipe';
import { store } from '../../../app/stores/store';
import ProfileCard from '../../profiles/ProfileCard';

const recipeImageStyle = {
	filter: 'brightness(30%)',
};

const recipeImageTextStyle = {
	position: 'absolute',
	bottom: '5%',
	left: '5%',
	width: '100%',
	height: 'auto',
	color: 'white',
};

interface Props {
	recipe: Recipe;
}

export default observer(function RecipeDetailsHeader({ recipe }: Props) {
	console.log(recipe.image);
	return (
		<Segment.Group>
			<Segment basic attached="top" style={{ padding: '0' }}>
				<Image src={recipe.image} fluid style={recipeImageStyle} />
				<Segment style={recipeImageTextStyle} basic>
					<Item.Group>
						<Item>
							<Item.Content>
								<Header size="huge" content={recipe.name} style={{ color: 'white' }} />
								<p>{format(recipe.date!, 'dd MMM yyy')}</p>
							</Item.Content>
						</Item>
					</Item.Group>
				</Segment>
			</Segment>
			{recipe.author?.username === store.userStore.getLoggedInUser()?.username && (
				<Segment clearing attached="bottom">
					<Grid>
						<Grid.Column width={12}>
							{
								<Popup
									hoverable
									key={recipe.author?.username}
									trigger={
										<p style={{ fontSize: '1.1em', paddingTop: '.5em' }}>
											Written by{' '}
											<Link to={`/profiles/${recipe.author?.username}`}>
												<span style={{ color: 'teal', textDecoration: 'underline', cursor: 'pointer' }}>
													{recipe.author?.username}
												</span>
											</Link>
										</p>
									}>
									<PopupContent>
										<ProfileCard profile={recipe.author!} />
									</PopupContent>
								</Popup>
							}
						</Grid.Column>
						<Grid.Column width={4}>
							<Button as={Link} to={`/manage/${recipe.id}`} color="orange" floated="right">
								Edit Recipe
							</Button>
						</Grid.Column>
					</Grid>
				</Segment>
			)}
		</Segment.Group>
	);
});
