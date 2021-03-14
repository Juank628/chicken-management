import { combineReducers } from "redux";
import fixedCostReducer from "./fixedCostReducer";
import variableCostReducer from "./variableCostReducer";
import recipeReducer from "./recipeReducer";

const rootReducer = combineReducers({
  fixedCostReducer,
  variableCostReducer,
  recipeReducer,
});

export default rootReducer;
