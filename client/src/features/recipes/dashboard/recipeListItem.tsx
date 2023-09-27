import { Image, Icon, Card, Grid } from "semantic-ui-react";
import { format } from "date-fns";

import { Recipe } from "../../../app/models/recipe";

interface Props {
  recipe: Recipe;
}

export default function RecipeListItem({ recipe }: Props) {
  return (
    <Card link={true} fluid href={`/recipes/${recipe.id}`}>
      <Image
        src="https://twistedsifter.com/wp-content/uploads/2013/08/bread-village-carl-warner.jpg"
        wrapped
        ui={false}
      />
      <Card.Content textAlign="center">
        <Card.Header>{recipe.name}</Card.Header>
        <Card.Meta>
          <span className="date">{format(recipe.date!, "dd MMM yyyy")}</span>
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

    // <Segment.Group>
    //   <Segment>
    //     <Item.Group>
    //       <Item>
    //         <Item.Content>
    //           <Item.Header as={Link} to={`/recipes/${recipe.id}`}>
    //             {recipe.name}
    //           </Item.Header>
    //         </Item.Content>
    //       </Item>
    //     </Item.Group>
    //   </Segment>
    //   <Segment>
    //     <span>
    //       <Icon color="pink" name="clock" />{" "}
    //       {format(recipe.date!, "dd MMM yyyy")}
    //       <Icon color="pink" style={{ marginLeft: "1em" }} name="food" />{" "}
    //       {recipe.category}
    //     </span>
    //   </Segment>

    //   <Segment clearing>
    //     <span>{recipe.description}</span>
    //     <Button
    //       style={{ marginTop: "2em" }}
    //       as={Link}
    //       to={`/recipes/${recipe.id}`}
    //       color="purple"
    //       floated="right"
    //       content="View"
    //     />
    //   </Segment>
    // </Segment.Group>
  );
}
