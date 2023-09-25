import { Button, Grid, Header, Icon, Segment } from "semantic-ui-react";
import { Formik, Form, FieldArray, ErrorMessage } from "formik";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { v4 as uuid } from "uuid";
import * as Yup from "yup";

import { categoryOptions } from "../../../app/common/options/categoryOptions";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import SelectInput from "../../../app/common/form/SelectInput";
import NumberInput from "../../../app/common/form/NumberInput";
import TextAreaInput from "../../../app/common/form/TextArea";
import TextInput from "../../../app/common/form/TextInput";
import DateInput from "../../../app/common/form/DateInput";
import { useStore } from "../../../app/stores/store";
import { Recipe } from "../../../app/models/recipe";

export default observer(function RecipeForm() {
  const { recipeStore } = useStore();
  const { createRecipe, updateRecipe, loading, loadRecipe, loadingInitial } =
    recipeStore;
  const { id } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState<Recipe>({
    id: "",
    name: "",
    description: "",
    category: "",
    date: null,
    recipeIngredients: [{ amount: 0, unit: "", ingredient: { name: "" } }],
    instructions: [{ step: 1, text: "" }],
  });

  const validationSchema = Yup.object({
    name: Yup.string().required("The recipe name is required"),
    category: Yup.string().required("The recipe category is required"),
    description: Yup.string().required(),
    date: Yup.string().required("Date is required").nullable(),
  });

  useEffect(() => {
    if (id) loadRecipe(id).then((recipe) => setRecipe(recipe!));
  }, [id, loadRecipe]);

  const handleFormSubmit = (recipe: Recipe) => {
    for (let i = 0; i < recipe.instructions.length; i++) {
      recipe.instructions[i].step = i + 1;
    }

    if (recipe.id.length === 0) {
      const newRecipe = {
        ...recipe,
        id: uuid(),
      };
      console.log(newRecipe);
      createRecipe(newRecipe).then(() => navigate(`/recipes/${newRecipe.id}`));
    } else {
      updateRecipe(recipe).then(() => navigate(`/recipes/${recipe.id}`));
    }
  };

  if (loadingInitial) return <LoadingComponent content="loading recipe" />;

  return (
    <Segment clearing>
      <Formik
        enableReinitialize
        initialValues={recipe}
        validationSchema={validationSchema}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({ handleSubmit, values }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <Grid>
              <Grid.Row>
                <Grid.Column>
                  <Header as="h2">
                    Create a Recipe
                    <Header.Subheader>
                      Input all of the data for a new recipe
                    </Header.Subheader>
                  </Header>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <TextInput name="name" placeholder="Title" />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <TextAreaInput
                    name="description"
                    placeholder="description"
                    rows={5}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <SelectInput
                    options={categoryOptions}
                    name="category"
                    placeholder="Category"
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <DateInput
                    name="date"
                    placeholderText="Date"
                    timeCaption="time"
                    dateFormat="MMMM d, yyyy h:mm aa"
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>

            <FieldArray name="instructions">
              {({ push, remove }) => (
                <Grid style={{ marginTop: "2rem" }}>
                  <Grid.Row>
                    <Grid.Column>
                      <Header as="h3">
                        Instructions
                        <Header.Subheader>
                          Add the steps of the recipe
                        </Header.Subheader>
                      </Header>
                    </Grid.Column>
                  </Grid.Row>
                  {values.instructions.map((instruction, index) => (
                    <Grid.Row key={index}>
                      <Grid.Column width={16}>
                        <TextInput
                          step={(index + 1).toString()}
                          name={`instructions[${index}].text`}
                          placeholder="Instruction"
                          icon={
                            <Icon name="delete" onClick={() => remove(index)} />
                          }
                        />
                        <ErrorMessage
                          name={`instructions.${index}.name`}
                          component="div"
                          className="field-error"
                        />
                      </Grid.Column>
                    </Grid.Row>
                  ))}
                  <Grid.Row>
                    <Grid.Column>
                      <Button
                        positive
                        type="button"
                        className="secondary"
                        onClick={() => push({ step: "", text: "" })}
                      >
                        Add Instruction
                      </Button>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              )}
            </FieldArray>

            <FieldArray name="recipeIngredients">
              {({ push, remove }) => (
                <Grid style={{ marginTop: "2rem" }}>
                  <Grid.Row>
                    <Grid.Column>
                      <Header as="h3">
                        Ingredients
                        <Header.Subheader>
                          Add the ingredients and quantites of the recipe
                        </Header.Subheader>
                      </Header>
                    </Grid.Column>
                  </Grid.Row>
                  {values.recipeIngredients.map((ingredient, index) => (
                    <Grid.Row key={index}>
                      <Grid.Column width={16}>
                        <TextInput
                          name={`recipeIngredients[${index}].ingredient.name`}
                          placeholder="Ingredient"
                        />
                        <TextInput
                          name={`recipeIngredients[${index}].unit`}
                          placeholder="Unit"
                        />
                        <NumberInput
                          name={`recipeIngredients[${index}].amount`}
                          placeholder="Amount"
                        />
                        <ErrorMessage
                          name={`instructions.${index}.name`}
                          component="div"
                          className="field-error"
                        />
                      </Grid.Column>
                    </Grid.Row>
                  ))}
                  <Grid.Row>
                    <Grid.Column>
                      <Button
                        positive
                        type="button"
                        className="secondary"
                        onClick={() =>
                          push({
                            amount: 0,
                            unit: "",
                            ingredient: { name: "" },
                          })
                        }
                      >
                        Add Ingredient
                      </Button>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              )}
            </FieldArray>

            <div>
              <Button
                floated="right"
                positive
                type="submit"
                content="Submit"
                loading={loading}
              />
              <Button
                as={Link}
                to="/"
                floated="right"
                type="button"
                content="Cancel"
              />
            </div>
          </Form>
        )}
      </Formik>
    </Segment>
  );
});
