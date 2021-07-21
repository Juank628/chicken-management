import * as actionTypes from "../actions/actionTypes";

export const setOrders = (payload) => {
  return {
    type: actionTypes.SET_ORDERS,
    payload,
  };
};

/***************database actions***************/

export const readOrders = () => {
  return async (dispatch) => {
    try {
      const res = await fetch("http://localhost:4000/orders/read");
      const data = await res.json();
      dispatch(setOrders(data));
    } catch (err) {
      console.log(err);
    }
  };
};
