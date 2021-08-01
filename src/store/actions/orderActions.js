import * as actionTypes from "../actions/actionTypes";

export const insertOrder = (payload) => {
  return {
    type: actionTypes.INSERT_ORDER,
    payload,
  };
};

export const setOrders = (payload) => {
  return {
    type: actionTypes.SET_ORDERS,
    payload,
  };
};

/***************database actions***************/

export const createOrder = (payload) => {
  return async (dispatch) => {
    try {
      const res = await fetch("http://localhost:4000/orders/create", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "content-type": "application/json",
        },
      });
      if (res.status >= 200 && res.status < 300) {
        const newOrder = await res.json();
        dispatch(insertOrder(newOrder));
      }
      return res;
    } catch (err) {
      console.log(err);
    }
  };
};

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
