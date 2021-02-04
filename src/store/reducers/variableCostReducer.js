import * as actionTypes from "../actions/actionTypes";

const initialState = {
  productID: 0,
  costs: [
    {
      supplyID: 0,
      supplyDescription: "Ingrediente 1",
      supplyCost: 1,
    },
    {
      supplyID: 1,
      supplyDescription: "Ingrediente 2",
      supplyCost: 1,
    },
  ],
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
