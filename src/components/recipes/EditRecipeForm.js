import React, { useState, useEffect } from "react";
import RecipeManager from "../../modules/RecipeManager";

const userNow = JSON.parse(sessionStorage.getItem("userCredentials"));

const EditRecipeForm = props => {
  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    instructions: "",
    ingredients: "",
    userId: userNow
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleFieldChange = evt => {
    const stateToChange = { ...recipe };
    stateToChange[evt.target.id] = evt.target.value;
    setRecipe(stateToChange);
  };

  const updateExistingRecipe = evt => {
    evt.preventDefault();
    setIsLoading(true);

    const editedRecipe = {
      id: props.match.params.recipeId,
      name: recipe.name,
      description: recipe.description,
      instructions: recipe.instructions,
      ingredients: recipe.ingredients,
      userId: userNow
    };

    RecipeManager.update(editedRecipe).then(() =>
      props.history.push("/recipes")
    );
  };

  useEffect(() => {
    RecipeManager.get(props.match.params.recipeId).then(recipe => {
      const recipeToChange = { ...recipe };
      setRecipe(recipeToChange);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <form>
        <fieldset>
          <div className="formgrid">
            <label htmlFor="name">Recipe name: </label>

            <input
              type="text"
              required
              className="form-control"
              onChange={handleFieldChange}
              id="name"
              value={recipe.name}
            />
            <label htmlFor="description">Description: </label>

            <input
              type="description"
              required
              className="form-control"
              onChange={handleFieldChange}
              id="description"
              value={recipe.description}
            />

            <label htmlFor="instructions">Instructions: </label>

            <input
              type="text"
              required
              className="form-control"
              onChange={handleFieldChange}
              id="instructions"
              value={recipe.instructions}
            />

            <label htmlFor="ingredients">Ingredients: </label>

            <input
              type="text"
              required
              className="form-control"
              onChange={handleFieldChange}
              id="ingredients"
              value={recipe.ingredients}
            />
          </div>
          <div className="alignRight">
            <button
              type="button"
              disabled={isLoading}
              onClick={updateExistingRecipe}
              className="btn btn-primary"
            >
              Submit
            </button>
          </div>
        </fieldset>
      </form>
    </>
  );
};

export default EditRecipeForm;
