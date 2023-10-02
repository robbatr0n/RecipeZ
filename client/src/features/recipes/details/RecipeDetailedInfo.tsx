import { observer } from 'mobx-react-lite';
import { Segment, Grid, Icon, SegmentGroup, Container, Table, List } from 'semantic-ui-react';
import { Recipe } from '../../../app/models/recipe';

interface Props {
	recipe: Recipe;
}

export default observer(function RecipeDetailedInfo({ recipe }: Props) {
	return (
		<>
			<SegmentGroup>
				<Segment.Group className="white-bg" horizontal>
					<Segment textAlign="center">
						<Grid.Column style={{ marginBottom: '.5em' }} width={1}>
							<Icon name="food" size="large" color="pink" />
						</Grid.Column>
						<Grid.Column width={15}>
							<span>{recipe.category}</span>
						</Grid.Column>
					</Segment>
					<Segment textAlign="center">
						<Grid.Column style={{ marginBottom: '.5em' }} width={1}>
							<Icon name="time" size="large" color="pink" />
						</Grid.Column>
						<Grid.Column width={15}>
							<span>{recipe.cookTime}</span>
						</Grid.Column>
					</Segment>
					<Segment textAlign="center">
						<Grid.Column style={{ marginBottom: '.5em' }} width={1}>
							<Icon name="world" size="large" color="pink" />
						</Grid.Column>
						<Grid.Column width={15}>
							<span>{recipe.cuisine}</span>
						</Grid.Column>
					</Segment>
				</Segment.Group>
				<Segment>
					<Container>
						<p>{recipe.description}</p>
					</Container>
				</Segment>
			</SegmentGroup>
			<Segment>
				<Container>
					<Grid padded={true}>
						<Grid.Column width={5}>
							<h2 style={{ paddingBottom: '.5em' }}>Ingredients</h2>
							<Table basic="very" compact="very" celled collapsing>
								<Table.Header>
									<Table.Row>
										<Table.HeaderCell>Ingredient</Table.HeaderCell>
										<Table.HeaderCell>Amount</Table.HeaderCell>
									</Table.Row>
								</Table.Header>
								<Table.Body>
									{recipe.recipeIngredients.map((ingredient, index) => (
										<Table.Row>
											<Table.Cell>{ingredient.ingredient.name}</Table.Cell>
											<Table.Cell>
												{ingredient.amount} {ingredient.unit}
											</Table.Cell>
										</Table.Row>
									))}
								</Table.Body>
							</Table>
						</Grid.Column>
						<Grid.Column width={11}>
							<h2 style={{ paddingBottom: '.5em' }}>Instructions</h2>
							<List relaxed="very">
								{recipe.instructions.map((instruction, index) => (
									<List.Item>
										{instruction.step}
										{'. '} {instruction.text}
									</List.Item>
								))}
							</List>
						</Grid.Column>
					</Grid>
				</Container>
			</Segment>
		</>

		// <Segment.Group>
		//   <Segment attached="top">
		//     <Grid>
		//       <Grid.Column width={1}>
		//         <Icon size="large" color="teal" name="info" />
		//       </Grid.Column>
		//       <Grid.Column width={15}>
		//         <p>{recipe.description}</p>
		//       </Grid.Column>
		//     </Grid>
		//   </Segment>
		//   <Segment attached>
		//     <Grid verticalAlign="middle">
		//       <Grid.Column width={1}>
		//         <Icon name="calendar" size="large" color="teal" />
		//       </Grid.Column>
		//       <Grid.Column width={15}>
		//         <span>{format(recipe.date!, "dd MMM yyy h:mm aa")}</span>
		//       </Grid.Column>
		//     </Grid>
		//   </Segment>
		//   <Segment attached>
		//     <Grid verticalAlign="middle">
		//       <Grid.Column width={1}>
		//         <Icon name="food" size="large" color="teal" />
		//       </Grid.Column>
		//       <Grid.Column width={15}>
		//         <span>{recipe.category}</span>
		//       </Grid.Column>
		//     </Grid>
		//   </Segment>
		// </Segment.Group>
	);
});
