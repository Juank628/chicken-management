import * as actionTypes from "../actions/actionTypes";

const initialState = {
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
};

const variableCostReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_VARIABLE_COST:
      return {
        ...state,
        costs: action.payload,
      };
    default:
      return state;
  }
};

export default variableCostReducer;
