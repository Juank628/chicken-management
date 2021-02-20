import * as actionTypes from "../actions/actionTypes";

const initialState = {
  costs: [],
};

const variableCostReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_VARIABLE_COST:
      return {
        ...state,
        costs: [...state.costs, ...action.payload] 
        //[state.costs, ...action.payload],
      };
    default:
      return state;
  }
};

export default variableCostReducer;
