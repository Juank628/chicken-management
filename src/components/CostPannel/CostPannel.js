import React from "react";
import "./CostPannel.css";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions/actionTypes";
import ValuesTable from "../ValuesTable/ValuesTable";

function CostPannel(props) {
  const updateFixedCost = (total) => {
    props.setFixedCost({ total });
  };

  const updateVariableCost = (total) => {
    props.setVariableCost({ total });
  };

  return (
    <div className="Cost-Pannel-Container">
      <div>
        <ValuesTable setTotal={updateFixedCost} />
      </div>
      <div>
        <ValuesTable setTotal={updateVariableCost} />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    fixedCost: state.fixedCostReducer.fixedCost,
    variableCost: state.variableCostReducer.variableCost,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setFixedCost: (payload) =>
      dispatch({ type: actionTypes.SET_FIXED_COST, payload }),
    setVariableCost: (payload) =>
      dispatch({ type: actionTypes.SET_VARIABLE_COST, payload }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CostPannel);
