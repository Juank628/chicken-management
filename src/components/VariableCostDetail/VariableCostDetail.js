import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";
import * as validate from "../../utilities/validation";
import "./VariableCostDetail.css";
import close_icon from "../../img/close_icon.svg";
import { types, units } from "../../config/units.json";
import InputField from "../InputField/InputField";

function VariableCostDetail(props) {
  const [isEdit, setIsEdit] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [availableUnits, setAvailableUnits] = useState([]);
  const [detail, setDetail] = useState({
    id: "0",
    description: "",
    unitType: "seleccione...",
    unitSymbol: "seleccione...",
    cost: 0,
  });
  const [validationErrors, setValidationErrors] = useState({
    description: [],
    unitType: [],
    unitSymbol: [],
    cost: [],
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
        unitSymbol: "",
      });
      validateFields(["unitType", "unitSymbol"], [e.target.value, ""]);
    } else {
      setDetail({
        ...detail,
        [e.target.name]: e.target.value,
      });
      validateFields([e.target.name], [e.target.value]);
    }
  };

  const onChange = (e) => {
    setDetail({
      ...detail,
      [e.target.name]: e.target.value,
    });
  };

  const validateFields = (fieldNames, fieldValues) => {
    let err = validationErrors;

    fieldNames.forEach((fieldName, index) => {
      if (fieldName === "description") {
        err.description.push(...validate.isString(fieldValues[index], 1, 30));
      }
      if (fieldName === "unitType") {
        err.unitType.push(...validate.isNotEmpty(fieldValues[index]));
      }
      if (fieldName === "unitSymbol") {
        err.unitSymbol.push(...validate.isNotEmpty(fieldValues[index]));
      }
      if (fieldName === "cost") {
        err.cost.push(...validate.isNumber(fieldValues[index], 0));
      }
    });
    setValidationErrors({ ...err });
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
      setIsValid(false);
      setValidationErrors({
        description: [""],
        unitType: [""],
        unitSymbol: [""],
        cost: [],
      });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    getAvailableUnits();
  }, [detail.unitType, getAvailableUnits]);

  useEffect(() => {
    const errorsCount =
      validationErrors.description.length +
      validationErrors.unitType.length +
      validationErrors.unitSymbol.length +
      validationErrors.cost.length;
    errorsCount ? setIsValid(false) : setIsValid(true);
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
            value={detail.description}
            onChange={onChange}
            minLength="0"
            maxLength="30"
            validations={["isNotEmpty", "isString"]}
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
            <option value="">seleccione...</option>
            {types.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
          {validationErrors.unitType.map((error, index) => (
            <p key={index} className="field-error-text">
              {error}
            </p>
          ))}
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
            <option value="">seleccione...</option>
            {availableUnits.map((unit, index) => (
              <option key={index} value={unit.symbol}>
                {unit.symbol}
              </option>
            ))}
          </select>
          {validationErrors.unitSymbol.map((error, index) => (
            <p key={index} className="field-error-text">
              {error}
            </p>
          ))}
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
          {validationErrors.cost.map((error, index) => (
            <p key={index} className="field-error-text">
              {error}
            </p>
          ))}
        </div>

        {isEdit ? (
          <div className="btn-area">
            <button
              type="button"
              className="btn-success"
              onClick={save}
              disabled={!isValid}
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
