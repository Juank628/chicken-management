import * as actionTypes from "../actions/actionTypes";

export const setVariableCosts = (payload) => {
  return {
    type: actionTypes.SET_VARIABLE_COSTS,
    payload,
  };
};

export const insertVariableCost = (payload) => {
  return {
    type: actionTypes.INSERT_VARIABLE_COST,
    payload,
  };
};

export const modifyVariableCost = (data, costs) => {
  const indexToModify = costs.findIndex((item) => item.id === data.id);
  costs[indexToModify] = data;
  return {
    type: actionTypes.SET_VARIABLE_COSTS,
    payload: costs,
  };
};

//set, insert, modify

export const createVariableCost = (payload) => {
  return async (dispatch) => {
    try {
      let data = payload;
      delete data.id;
      const res = await fetch("http://localhost:4000/variable-costs/create", {
        method: "POST",
        body: JSON.stringify({ ...data }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const newItem = await res.json();
      dispatch(insertVariableCost([newItem]));
    } catch (err) {
      console.log(err);
    }
  };
};

export const readVariableCosts = () => {
  return async (dispatch) => {
    try {
      const res = await fetch("http://localhost:4000/variable-costs/read");
      const data = await res.json();
      dispatch(setVariableCosts(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateVariableCost = (payload) => {
  return async (dispatch) => {
    try {
      const res = await fetch("http://localhost:4000/variable-costs/update", {
        method: "POST",
        body: JSON.stringify({ ...payload.detail }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch(modifyVariableCost(data, payload.costs));
      return res
    } catch (err) {
      console.log(err);
    }
  };
};
