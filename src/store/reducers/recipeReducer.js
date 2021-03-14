import * as actionTypes from "../actions/actionTypes";

const initialState = {
  recipes: [],
};

const recipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload],
      };

    case actionTypes.INSERT_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, ...action.payload],
      };

    default:
      return state;
  }
};

export default recipeReducer;
