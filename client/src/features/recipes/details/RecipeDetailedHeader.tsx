import { Button, Header, Item, Segment, Image, Popup, PopupContent } from 'semantic-ui-react';
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
	return (
		<Segment.Group>
			<Segment basic attached="top" style={{ padding: '0' }}>
				<Image
					src="https://twistedsifter.com/wp-content/uploads/2013/08/bread-village-carl-warner.jpg"
					fluid
					style={recipeImageStyle}
				/>
				<Segment style={recipeImageTextStyle} basic>
					<Item.Group>
						<Item>
							<Item.Content>
								<Header size="huge" content={recipe.name} style={{ color: 'white' }} />
								<p>{format(recipe.date!, 'dd MMM yyy')}</p>
								{
									<Popup hoverable key={recipe.author.username} trigger={<p>{recipe.author.username}</p>}>
										<PopupContent>
											<ProfileCard profile={recipe.author} />
										</PopupContent>
									</Popup>
								}
							</Item.Content>
						</Item>
					</Item.Group>
				</Segment>
			</Segment>
			{recipe.author.username === store.userStore.getLoggedInUser()?.username && (
				<Segment clearing attached="bottom">
					<Button as={Link} to={`/manage/${recipe.id}`} color="orange" floated="right">
						Edit Recipe
					</Button>
				</Segment>
			)}
		</Segment.Group>
	);
});
