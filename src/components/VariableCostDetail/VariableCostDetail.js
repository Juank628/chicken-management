import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";
import "./VariableCostDetail.css";
import close_icon from "../../img/close_icon.svg";
import { types, units } from "../../config/units.json";

function VariableCostDetail(props) {
  const [isEdit, setIsEdit] = useState(false);
  const [availableUnits, setAvailableUnits] = useState([]);
  const [detail, setDetail] = useState({
    id: "0",
    description: "",
    unitType: "seleccione...",
    unitSymbol: "seleccione...",
    cost: 0,
  });

  const getAvailableUnits = useCallback(() => {
    let newAvailableUnits = units.filter(
      (unit) => unit.type === detail.unitType
    );
    setAvailableUnits(newAvailableUnits);
  }, [detail.unitType]);

  const changeHandler = (e) => {
    if (e.target.name === "unitType") {
      setDetail({
        ...detail,
        unitType: e.target.value,
        unitSymbol: "0",
      });
    } else {
      setDetail({
        ...detail,
        [e.target.name]: e.target.value,
      });
    }
  };

  const create = () => {
    const newCosts = props.costs;
    newCosts.push(detail);
    console.log(newCosts);
  };

  const update = () => {
    const newCosts = props.costs;
    const indexToUpdate = newCosts.findIndex((item) => item.id === detail.id);
    newCosts[indexToUpdate] = detail;
    props.onSetVariableCost(newCosts);
    props.closeModal();
  };

  useEffect(() => {
    if (props.data) {
      setDetail({ ...props.data });
    } else {
      setIsEdit(true);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    getAvailableUnits();
  }, [detail.unitType, getAvailableUnits]);

  return (
    <div className="VariableCostDetail">
      <form>
        <div className="close-btn">
          <img
            alt="close"
            src={close_icon}
            className="close-icon"
            onClick={props.closeModal}
          />
        </div>
        <div className="id-field">
          <h2>Id: {detail.id}</h2>
        </div>
        <div className="desc-field">
          <label>Decripcion</label>
          <br />
          <input
            type="text"
            name="description"
            value={detail.description}
            onChange={changeHandler}
            disabled={!isEdit}
            placeholder="Ingrese la descripcion..."
          />
        </div>
        <div className="type-field">
          <label>Medida</label>
          <br />
          <select
            name="unitType"
            value={detail.unitType}
            onChange={changeHandler}
            disabled={!isEdit}
          >
            <option value="0">seleccione...</option>
            {types.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="unit-field">
          <label>Unidad</label>
          <br />
          <select
            name="unitSymbol"
            value={detail.unitSymbol}
            onChange={changeHandler}
            disabled={!isEdit}
          >
            <option value="0">seleccione...</option>
            {availableUnits.map((unit, index) => (
              <option key={index} value={unit.symbol}>
                {unit.symbol}
              </option>
            ))}
          </select>
        </div>
        <div className="cost-field">
          <label>Costo</label>
          <br />
          <input
            type="number"
            name="cost"
            value={detail.cost}
            onChange={changeHandler}
            disabled={!isEdit}
          />
        </div>

        {isEdit ? (
          <div className="btn-area">
            <button type="button" className="save-btn" onClick={update}>
              Guardar
            </button>
            <button
              type="button"
              className="cancel-btn"
              onClick={() => setIsEdit(false)}
            >
              Cancelar
            </button>
          </div>
        ) : (
          <div className="btn-area">
            <button
              type="button"
              className="edit-btn"
              onClick={() => setIsEdit(true)}
            >
              Editar
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    costs: state.variableCostReducer.costs,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetVariableCost: (payload) =>
      dispatch(actionCreators.setVariableCost(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VariableCostDetail);
