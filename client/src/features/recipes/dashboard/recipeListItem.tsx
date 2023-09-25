import { Item, Button, Icon, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";

import { Recipe } from "../../../app/models/recipe";

interface Props {
  recipe: Recipe;
}

export default function RecipeListItem({ recipe }: Props) {
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image
              style={{ marginBottom: 5 }}
              size="tiny"
              circular
              src="/assets/user.png"
            />
            <Item.Content>
              <Item.Header as={Link} to={`/recipes/${recipe.id}`}>
                {recipe.name}
              </Item.Header>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon color="pink" name="clock" />{" "}
          {format(recipe.date!, "dd MMM yyyy h:mm aa")}
          <Icon color="pink" style={{ marginLeft: "1em" }} name="marker" />{" "}
          {recipe.category}
        </span>
      </Segment>

      <Segment clearing>
        <span>{recipe.description}</span>
        <Button
          as={Link}
          to={`/recipes/${recipe.id}`}
          color="purple"
          floated="right"
          content="View"
        />
      </Segment>
    </Segment.Group>
  );
}
