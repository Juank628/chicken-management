import * as actionTypes from "./actionTypes"

export const setFixedCost = (payload) => {
    return {
        type: actionTypes.SET_FIXED_COST,
        payload,
    }
}