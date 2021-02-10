import * as actionTypes from "../actions/actionTypes";

export const setVariableCost = (payload) => {
  return {
    type: actionTypes.SET_VARIABLE_COST,
    payload,
  };
};

