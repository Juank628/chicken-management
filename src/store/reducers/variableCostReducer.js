import * as actionTypes from "../actions/actionTypes";

const initialState = {
  variableCost: 0,
};

const variableCostReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_VARIABLE_COST:
      return {
        ...state,
        variableCost: action.payload.total,
      };
    default:
      return state;
  }
};

export default variableCostReducer;