import React from "react";
import "./CostPannel.css";
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions/index";
import ValuesTable from "../../ValuesTable/ValuesTable";

function CostPannel(props) {
  return (
    <div className="Cost-Pannel-Container">
      <div className="margin-x-auto box">
        <ValuesTable
          title="Costo fijo"
          descColText="Descripcion"
          valueColText="Costo"
          setTotal={(total) => props.onSetFixedCost({ total })}
        />
      </div>
      <div className="margin-x-auto box">
        <ValuesTable
          title="Costo variable"
          descColText="Descripcion"
          valueColText="Costo"
          setTotal={(total) => props.onSetVariableCost({ total })}
        />
      </div>
      <div className="margin-x-auto box">
        <ValuesTable
          title="Precios"
          descColText="Presentacion"
          valueColText="Precio"
          setTotal={() => {
            return;
          }}
        />
      </div>
      <div className="margin-x-auto box">zone 4</div>
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
    onSetFixedCost: (payload) => dispatch(actionCreators.setFixedCost(payload)),
    onSetVariableCost: (payload) =>
      dispatch(actionCreators.setVariableCost(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CostPannel);
