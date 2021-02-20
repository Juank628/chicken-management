import * as actionTypes from "../actions/actionTypes";

export const setVariableCosts = (payload) => {
  return {
    type: actionTypes.SET_VARIABLE_COST,
    payload,
  };
};

export const readVariableCosts = () => {
  return async (dispatch) => {
    console.log("trigger");
    try {
      const res = await fetch("http://localhost:4000/variable-costs/read");
      const data = await res.json();
      dispatch(setVariableCosts(data));
    } catch (err) {
      console.log(err);
    }
  };
};

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
      console.log(newItem);
      dispatch(setVariableCosts([newItem]))
    } catch (err) {
      console.log(err);
    }
  };
};

/* const newCosts = props.costs;
    newCosts.push(detail);
    props.closeModal();
 */
