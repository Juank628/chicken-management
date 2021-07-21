import { combineReducers } from "redux";
import fixedCostReducer from "./fixedCostReducer";
import variableCostReducer from "./variableCostReducer";
import recipeReducer from "./recipeReducer";
import orderReducer from "./orderReducer";

const rootReducer = combineReducers({
  fixedCostReducer,
  variableCostReducer,
  recipeReducer,
  orderReducer
});

export default rootReducer;
