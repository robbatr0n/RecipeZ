import { Button, Header, Item, Segment, Image } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { format } from "date-fns";

import { Recipe } from "../../../app/models/recipe";

const recipeImageStyle = {
  filter: "brightness(30%)",
};

const recipeImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white",
};

interface Props {
  recipe: Recipe;
}

export default observer(function RecipeDetailsHeader({ recipe }: Props) {
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        <Image
          src={`/assets/categoryImages/${recipe.category}.jpg`}
          fluid
          style={recipeImageStyle}
        />
        <Segment style={recipeImageTextStyle} basic>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={recipe.name}
                  style={{ color: "white" }}
                />
                <p>{format(recipe.date!, "dd MMM yyy")}</p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached="bottom">
        <Button color="teal">Join Activity</Button>
        <Button>Cancel attendance</Button>
        <Button
          as={Link}
          to={`/manage/${recipe.id}`}
          color="orange"
          floated="right"
        >
          Manage Event
        </Button>
      </Segment>
    </Segment.Group>
  );
});
