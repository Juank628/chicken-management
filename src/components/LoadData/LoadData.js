import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";

function LoadData(props) {
  useEffect(() => {
    props.actReadVariableCosts();
    props.actReadRecipes()
  }, []);

  return null;
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    actReadVariableCosts: () => dispatch(actionCreators.readVariableCosts()),
    actReadRecipes: () => dispatch(actionCreators.readRecipes())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoadData);
