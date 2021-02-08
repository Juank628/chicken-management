import * as actionTypes from "../actions/actionTypes";

const initialState = {
  productID: 0,
  costs: [
    {
      id: "11",
      description: "Ingrediente 1",
      unitType: "peso",
      unitSymbol: "Kg",
      cost: 1.2,
    },
    {
      id: "12",
      description: "Ingrediente 2",
      unitType: "volumen",
      unitSymbol: "ml",
      cost: 1.3,
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
