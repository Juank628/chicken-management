import * as actionTypes from "../actions/actionTypes";

const initialState = {
  orders: [],
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ORDERS:
      return {
        ...state,
        orders: [...action.payload],
      };
    case actionTypes.INSERT_ORDER:
      return {
        ...state,
        orders: [...state.orders, action.payload],
      };
    default:
      return state;
  }
};

export default orderReducer;
