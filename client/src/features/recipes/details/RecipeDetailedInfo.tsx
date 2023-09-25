import { observer } from "mobx-react-lite";
import { Segment, Grid, Icon } from "semantic-ui-react";
import { Recipe } from "../../../app/models/recipe";
import { format } from "date-fns";

interface Props {
  recipe: Recipe;
}

export default observer(function ActivityDetailedInfo({ recipe }: Props) {
  return (
    <Segment.Group>
      <Segment attached="top">
        <Grid>
          <Grid.Column width={1}>
            <Icon size="large" color="teal" name="info" />
          </Grid.Column>
          <Grid.Column width={15}>
            <p>{recipe.description}</p>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="calendar" size="large" color="teal" />
          </Grid.Column>
          <Grid.Column width={15}>
            <span>{format(recipe.date!, "dd MMM yyy h:mm aa")}</span>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="food" size="large" color="teal" />
          </Grid.Column>
          <Grid.Column width={15}>
            <span>{recipe.category}</span>
          </Grid.Column>
        </Grid>
      </Segment>
    </Segment.Group>
  );
});
