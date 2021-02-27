import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";
import "./VariableCostDetail.css";
import close_icon from "../../img/close_icon.svg";
import { types, units } from "../../config/units.json";
import InputField from "../InputField/InputField";
import SelectField from "../SelectField/SelectField";

function VariableCostDetail(props) {
  const [isEdit, setIsEdit] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [isFormValid, setIsFormValid] = useState(true);
  const [availableUnits, setAvailableUnits] = useState([]);
  const [detail, setDetail] = useState({
    id: "0",
    description: "",
    unitType: "seleccione...",
    unitSymbol: "seleccione...",
    cost: 0,
  });
  const [validationErrors, setValidationErrors] = useState({
    description: false,
    unitType: false,
    unitSymbol: false,
    cost: false,
  });

  const getAvailableUnits = useCallback(() => {
    let newAvailableUnits = [];
    units.forEach((unit) => {
      if (unit.type === detail.unitType) {
        newAvailableUnits.push(unit.symbol);
      }
    });
    setAvailableUnits(newAvailableUnits);
  }, [detail.unitType]);

  const onChange = (e) => {
    setDetail({
      ...detail,
      [e.target.name]: e.target.value,
    });
  };

  const onValidation = (name, value) => {
    setValidationErrors({
      ...validationErrors,
      [name]: value,
    });
  };

  const save = () => {
    isNew ? create() : update();
  };

  const create = () => {
    props.actCreateVariableCost(detail);
  };

  const update = () => {
    const newCosts = props.costs;
    const indexToUpdate = newCosts.findIndex((item) => item.id === detail.id);
    newCosts[indexToUpdate] = detail;
    props.actSetVariableCosts(newCosts);
    props.closeModal();
  };

  useEffect(() => {
    if (props.data) {
      setDetail({ ...props.data });
    } else {
      setIsEdit(true);
      setIsNew(true);
      setIsFormValid(false);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    getAvailableUnits();
  }, [detail.unitType, getAvailableUnits]);

  useEffect(() => {
    const { description, unitType, unitSymbol, cost } = validationErrors;
    setIsFormValid(!(description || unitType || unitSymbol || cost));
  }, [validationErrors]);

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
          <InputField
            label="Descripción"
            name="description"
            disabled={!isEdit}
            value={detail.description}
            minLength="0"
            maxLength="30"
            validations={["isNotEmpty", "isString"]}
            onChange={onChange}
            onValidation={onValidation}
          />
        </div>
        <div className="type-field">
          <SelectField
            label="Medida"
            name="unitType"
            disabled={!isEdit}
            value={detail.unitType}
            options={types}
            validations={["isNotEmpty"]}
            onChange={onChange}
            onValidation={onValidation}
          />
        </div>
        <div className="unit-field">
          <SelectField
            label="Unidad"
            name="unitSymbol"
            disabled={!isEdit}
            value={detail.unitSymbol}
            options={availableUnits}
            validations={["isNotEmpty"]}
            onChange={onChange}
            onValidation={onValidation}
          />
        </div>
        <div className="cost-field">
          <InputField
            type="number"
            label="Costo"
            name="cost"
            disabled={!isEdit}
            value={detail.cost}
            min={0}
            validations={["isNumber"]}
            onChange={onChange}
            onValidation={onValidation}
          />
        </div>

        {isEdit ? (
          <div className="btn-area">
            <button
              type="button"
              className="btn-success"
              onClick={save}
              disabled={!isFormValid}
            >
              Guardar
            </button>
            <button
              type="button"
              className="btn-danger"
              onClick={() => props.closeModal()}
            >
              Cancelar
            </button>
          </div>
        ) : (
          <div className="btn-area">
            <button
              type="button"
              className="btn-info btn-edit"
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
    actSetVariableCosts: (payload) =>
      dispatch(actionCreators.setVariableCosts(payload)),
    actCreateVariableCost: (payload) =>
      dispatch(actionCreators.createVariableCost(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VariableCostDetail);
