import * as actionTypes from "../actions/actionTypes";

const initialState = {
  fixedCost: 0,
};

const fixedCostReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_FIXED_COST:
      return {
        ...state,
        fixedCost: action.payload.total,
      };
    default:
      return state;
  }
};

export default fixedCostReducer;