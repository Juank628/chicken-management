import { combineReducers } from "redux";
import fixedCostReducer from "./fixedCostReducer";
import variableCostReducer from "./variableCostReducer";

const rootReducer = combineReducers({
  fixedCostReducer,
  variableCostReducer,
});

export default rootReducer;
