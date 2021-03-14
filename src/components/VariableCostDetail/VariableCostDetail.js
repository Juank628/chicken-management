import React, { useState, useEffect, useCallback, useRef } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";
import classes from "./VariableCostDetail.module.css";
import close_icon from "../../img/close_icon.svg";
import { types, units } from "../../config/units.json";
import InputField from "../InputField/InputField";
import SelectField from "../SelectField/SelectField";

function VariableCostDetail(props) {
  const [isEdit, setIsEdit] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [isFormValid, setIsFormValid] = useState(true);
  const [isAdvanced, setIsAdvanced] = useState(false);
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
    if (!isDeleting) {
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
    <div className={classes.VariableCostDetail}>
      <form>
        <div className={classes.closeBtn}>
          <img
            alt="close"
            src={close_icon}
            className={classes.closeIcon}
            onClick={props.closeModal}
          />
        </div>
        <div className={classes.idField}>
          <h2>Id: {detail.id}</h2>
        </div>
        <div className={classes.descField}>
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
        <div className={classes.typeField}>
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
        <div className={classes.unitField}>
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
        <div className={classes.costField}>
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
          <React.Fragment>
            <div className={classes.btnArea}>
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
            </div>
            {!isNew ? (
              <div className={classes.advancedArea}>
                <p
                  className={classes.advancedBtn}
                  onClick={() => setIsAdvanced(!isAdvanced)}
                >
                  opciones avanzadas
                </p>
                {isAdvanced ? (
                  <p className={classes.deleteBtn} onClick={_delete}>
                    Eliminar
                  </p>
                ) : null}
              </div>
            ) : null}
          </React.Fragment>
        ) : (
          <div className={classes.btnArea}>
            <button
              type="button"
              className={`btn-info ${classes.btnEdit}`}
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
