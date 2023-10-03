import { Image, Icon, Card, Grid } from 'semantic-ui-react';
import { format } from 'date-fns';

import { Recipe } from '../../../app/models/recipe';

interface Props {
	recipe: Recipe;
}

export default function RecipeListItem({ recipe }: Props) {
	return (
		<Card link={true} fluid href={`/recipes/${recipe.id}`}>
			<Image src={recipe.image} wrapped ui={false} />
			<Card.Content textAlign="center">
				<Card.Header>{recipe.name}</Card.Header>
				<Card.Meta>
					<span className="date">{format(recipe.date!, 'dd MMM yyyy')}</span>
				</Card.Meta>
				<Card.Description>{recipe.description}</Card.Description>
			</Card.Content>
			<Card.Content textAlign="center" extra>
				<Grid>
					<Grid.Column width={8}>
						<Icon color="pink" name="food" /> {recipe.category}
					</Grid.Column>
					<Grid.Column width={8}>
						<Icon color="pink" name="world" /> {recipe.cuisine}
					</Grid.Column>
				</Grid>
			</Card.Content>
		</Card>
	);
}
