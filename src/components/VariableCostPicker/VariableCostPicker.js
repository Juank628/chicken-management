import React, { useState, useRef, useEffect } from "react";
import classes from "./VariableCostPicker.module.css";
import { connect } from "react-redux";
import InputField from "../InputField/InputField";
import SelectField from "../SelectField/SelectField";

function VariableCostPicker(props) {
  const [isEdit, setIsEdit] = useState(false);
  const [filteredCostsNames, setFilteredCostsNames] = useState([]);
  const [noFilteredCostsNames, setNoFilteredCostsNames] = useState([]);
  const [fieldsData, setFieldsData] = useState({
    filterCriteria: "",
    description: "",
    unitSymbol: "",
    quantity: 1,
  });
  const isMounted = useRef(false);

  const onChange = (e) => {
    setFieldsData({
      ...fieldsData,
      [e.target.name]: e.target.value,
    });
  };
  const onValidation = () => {};

  useEffect(() => {
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
            options={[]}
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
            onChange={onChange}
            onValidation={onValidation}
          />
        </div>

        {isEdit ? (
          <React.Fragment>
            <div>
              <button type="button" className="btn-success">
                Guardar
              </button>
            </div>
            <div>
              <button type="button" className="btn-danger">
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
