import * as actionTypes from "../actions/actionTypes";

export const setRecipes = (payload) => {
  return {
    type: actionTypes.SET_RECIPES,
    payload,
  };
};

export const insertRecipe = (payload) => {
  return {
    type: actionTypes.INSERT_RECIPE,
    payload,
  };
};

export const modifyRecipe = (data, recipes) => {
  const indexToModify = recipes.findIndex((item) => item.id === data.id);
  recipes[indexToModify] = data;
  return {
    type: actionTypes.SET_RECIPES,
    payload: recipes,
  };
};

/* export const removeVariableCost = (id, costs) => {
  const indexToDelete = costs.findIndex((item) => item.id === id);
  costs.splice(indexToDelete, 1);
  return {
    type: actionTypes.SET_VARIABLE_COSTS,
    payload: costs,
  };
}; */

/********************database actions************************/

export const createRecipe = (payload) => {
  return async (dispatch) => {
    try {
      let { recipeData, recipeCosts } = payload;
      delete recipeData.id;

      const res = await fetch("http://localhost:4000/recipes/create", {
        method: "POST",
        body: JSON.stringify({ recipeData, recipeCosts }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const newItem = await res.json();
      const newRecipe = {
        ...newItem,
        VariableCosts: recipeCosts,
      };
      dispatch(insertRecipe([newRecipe]));
      return res;
    } catch (err) {
      console.log(err);
    }
  };
};

export const readRecipes = () => {
  return async (dispatch) => {
    try {
      const res = await fetch("http://localhost:4000/recipes/read");
      const data = await res.json();
      dispatch(setRecipes(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateRecipe = (payload) => {
  return async (dispatch) => {
    let { recipeData, recipeCosts, recipes } = payload;
    try {
      const res = await fetch("http://localhost:4000/recipes/update", {
        method: "PUT",
        body: JSON.stringify({ recipeData, recipeCosts }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      delete recipeData.createdAt
      delete recipeData.updatedAt
      const data = {
        ...recipeData,
        VariableCosts: []
      }    
      dispatch(modifyRecipe(data, recipes));
      return res;
    } catch (err) {
      console.log(err);
    }
  };
};

/* export const deleteVariableCost = (payload) => {
  return async (dispatch) => {
    try {
      const res = await fetch("http://localhost:4000/variable-costs/delete", {
        method: "DELETE",
        body: JSON.stringify({ id: payload.id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch(removeVariableCost(payload.id, payload.costs));
      return res;
    } catch (err) {
      console.log(err);
    }
  };
};
 */
