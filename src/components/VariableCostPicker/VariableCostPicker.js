import React, { useState, useRef, useEffect } from "react";
import classes from "./VariableCostPicker.module.css";
import { connect } from "react-redux";
import { units } from "../../config/units.json";
import InputField from "../InputField/InputField";
import SelectField from "../SelectField/SelectField";

function VariableCostPicker(props) {
  const [isEdit, setIsEdit] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [filteredCostsNames, setFilteredCostsNames] = useState([]);
  const [noFilteredCostsNames, setNoFilteredCostsNames] = useState([]);
  const [selectedCost, setSelectedCost] = useState({});
  const [unitSymbols, setUnitSymbols] = useState([]);
  const [fieldsData, setFieldsData] = useState({
    filterCriteria: "",
    description: "",
    unitSymbol: "",
    quantity: 1,
  });
  const [validationErrors, setValidationErrors] = useState({
    description: false,
    unitSymbol: false,
    quantity: false,
  });
  const isMounted = useRef(false);

  const onChange = (e) => {
    setFieldsData({
      ...fieldsData,
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
    const costData = props.variableCosts.find(
      (cost) => cost.description === fieldsData.description
    );
    const costUnitSymbol = fieldsData.unitSymbol;
    const costQuantity = fieldsData.quantity;

    if (isNew) {
      props.addCost(costData, costUnitSymbol, costQuantity);
    } else {
      props.updateCost(costData, costUnitSymbol, costQuantity);
    }
    props.closeModal();
  };

  useEffect(() => {
    if (props.data) {
      const { description, unitSymbol, quantity } = props.data;
      setFieldsData({
        ...fieldsData,
        description,
        unitSymbol,
        quantity,
      });
    } else {
      setIsNew(true);
      setIsEdit(true);
      setValidationErrors({
        description: true,
        unitSymbol: true,
        quantity: true,
      });
    }
    let onlyNames = props.variableCosts.map((item) => {
      return item.description;
    });
    setFilteredCostsNames(onlyNames);
    setNoFilteredCostsNames(onlyNames);
  }, []);

  useEffect(() => {
    if (isMounted.current) {
      const regexp = new RegExp(fieldsData.filterCriteria, "i");
      let filteredValues = noFilteredCostsNames.filter((item) =>
        regexp.test(item)
      );
      setFilteredCostsNames(filteredValues);
    }
    isMounted.current = true;
  }, [fieldsData.filterCriteria]);

  useEffect(() => {
    const selectedItem = props.variableCosts.find(
      (item) => item.description === fieldsData.description
    );
    setSelectedCost(selectedItem);
  }, [fieldsData.description]);

  useEffect(() => {
    if (selectedCost) {
      const availableUnits = [];
      units.forEach((unit) => {
        if (unit.type === selectedCost.unitType) {
          availableUnits.push(unit.symbol);
        }
      });
      setUnitSymbols(availableUnits);
    }
  }, [selectedCost]);

  useEffect(() => {
    const { description, unitSymbol, quantity } = validationErrors;
    setIsFormValid(!(description || unitSymbol || quantity));
  }, [validationErrors]);

  return (
    <div className={classes.container}>
      <form>
        <div className={classes.costFilter}>
          <InputField
            label="Buscar"
            name="filterCriteria"
            disabled={false}
            value={fieldsData.filterCriteria}
            onChange={onChange}
            onValidation={onValidation}
          />
        </div>
        <div className={classes.costList}>
          <SelectField
            showLabel={false}
            name="description"
            disabled={false}
            value={fieldsData.description}
            options={filteredCostsNames}
            size={10}
            validations={["isNotEmpty"]}
            onChange={onChange}
            onValidation={onValidation}
          />
        </div>

        <div>
          <SelectField
            label="Unidad"
            name="unitSymbol"
            disabled={false}
            value={fieldsData.unitSymbol}
            options={unitSymbols}
            validations={["isNotEmpty"]}
            onChange={onChange}
            onValidation={onValidation}
          />
        </div>

        <div>
          <InputField
            type="number"
            label="Cantidad"
            name="quantity"
            disabled={false}
            value={fieldsData.quantity}
            min={0}
            validations={["isNumber"]}
            onChange={onChange}
            onValidation={onValidation}
          />
        </div>

        {isFormValid ? (
          <div className={classes.brief}>
            <p>{`${fieldsData.quantity}${fieldsData.unitSymbol} de ${fieldsData.description}`}</p>
          </div>
        ) : null}

        {isEdit ? (
          <React.Fragment>
            <div>
              <button
                type="button"
                className="btn-success"
                disabled={!isFormValid}
                onClick={save}
              >
                Guardar
              </button>
            </div>
            <div>
              <button
                type="button"
                className="btn-danger"
                onClick={() => props.closeModal()}
              >
                Cancelar
              </button>
            </div>
          </React.Fragment>
        ) : (
          <div className={classes.btnEditArea}>
            <button
              type="button"
              className="btn-info"
              onClick={() => {
                setIsEdit(true);
              }}
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
    variableCosts: state.variableCostReducer.costs,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(VariableCostPicker);
