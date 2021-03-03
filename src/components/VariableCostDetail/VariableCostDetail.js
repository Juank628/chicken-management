import React, { useState, useEffect, useCallback, useRef } from "react";
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
    unitType: "",
    unitSymbol: "",
    cost: 0,
  });
  const [validationErrors, setValidationErrors] = useState({
    description: false,
    unitType: false,
    unitSymbol: false,
    cost: false,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const isMounted = useRef(false);
  const isFirstChange = useRef(true);

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
    setIsSaving(true);
    isNew ? _create() : _update();
  };

  const _create = async () => {
    const res = await props.actCreateVariableCost(detail);
    if (res.status >= 200 && res.status < 300) {
      props.closeModal();
    } else {
      setIsSaving(false);
    }
  };

  const _update = async () => {
    const res = await props.actUpdateVariableCost({
      detail,
      costs: props.costs,
    });
    if (res.status >= 200 && res.status < 300) {
      props.closeModal();
    } else {
      setIsSaving(false);
    }
  };

  const _delete = async () => {
    setIsDeleting(true);
    const res = await props.actDeleteVariableCost({
      id: detail.id,
      costs: props.costs,
    });
    if (res.status >= 200 && res.status < 300) {
      props.closeModal();
    } else {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    if (props.data) {
      setDetail({ ...props.data });
    } else {
      setIsEdit(true);
      setIsNew(true);
      setValidationErrors({
        description: true,
        unitType: true,
        unitSymbol: true,
      });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isMounted.current) {
      getAvailableUnits();
      if (!isFirstChange.current) {
        setDetail({
          ...detail,
          unitSymbol: "",
        });
      }
      isFirstChange.current = false;
    }
  }, [detail.unitType, getAvailableUnits]);

  useEffect(() => {
    const { description, unitType, unitSymbol, cost } = validationErrors;
    setIsFormValid(!(description || unitType || unitSymbol || cost));
    isMounted.current = true;
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
              disabled={!isFormValid || isSaving}
            >
              {isSaving ? "Guardando..." : "Guardar"}
            </button>
            <button
              type="button"
              className="btn-danger"
              onClick={() => props.closeModal()}
            >
              Cancelar
            </button>
            <button type="button" onClick={_delete} disabled={isDeleting}>
              Eliminar
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
    actCreateVariableCost: (payload) =>
      dispatch(actionCreators.createVariableCost(payload)),
    actUpdateVariableCost: (payload) =>
      dispatch(actionCreators.updateVariableCost(payload)),
    actDeleteVariableCost: (payload) =>
      dispatch(actionCreators.deleteVariableCost(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VariableCostDetail);
