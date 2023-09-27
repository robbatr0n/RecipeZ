import { observer } from "mobx-react-lite";
import {
  Segment,
  Grid,
  Icon,
  SegmentGroup,
  Container,
} from "semantic-ui-react";
import { Recipe } from "../../../app/models/recipe";

interface Props {
  recipe: Recipe;
}

export default observer(function ActivityDetailedInfo({ recipe }: Props) {
  return (
    <>
      <SegmentGroup>
        <Segment.Group className="white-bg" horizontal>
          <Segment textAlign="center">
            <Grid.Column style={{ marginBottom: ".5em" }} width={1}>
              <Icon name="food" size="large" color="pink" />
            </Grid.Column>
            <Grid.Column width={15}>
              <span>{recipe.category}</span>
            </Grid.Column>
          </Segment>
          <Segment textAlign="center">
            <Grid.Column style={{ marginBottom: ".5em" }} width={1}>
              <Icon name="food" size="large" color="pink" />
            </Grid.Column>
            <Grid.Column width={15}>
              <span>{recipe.cookTime}</span>
            </Grid.Column>
          </Segment>
          <Segment textAlign="center">
            <Grid.Column style={{ marginBottom: ".5em" }} width={1}>
              <Icon name="food" size="large" color="pink" />
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
      <Container>
        {recipe.instructions.map((instruction, index) => (
          <div>
            <p>r</p>
            <p>{instruction.text}</p>
          </div>
        ))}
      </Container>
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
