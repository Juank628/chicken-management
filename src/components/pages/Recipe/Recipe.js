import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import classes from "./Recipe.module.css";
import * as actionCreators from "../../../store/actions";
import { units } from "../../../config/units.json";
import { families, categories } from "../../../config/recipes.json";
import { calculateSubtotals } from "../../../utilities/calculation";
import Modal from "../../Modal/Modal";
import VariableCostPicker from "../../VariableCostPicker/VariableCostPicker";
import TableTools from "../../TableTools/TableTools";
import InputField from "../../InputField/InputField";
import SelectField from "../../SelectField/SelectField";
import CheckboxField from "../../CheckboxField/CheckboxField";

function Recipe(props) {
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(true);
  const [isNew, setIsNew] = useState(false);
  const [isFormValid, setIsFormValid] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [costsData, setCostsData] = useState([]);
  const [costsUnitSymbol, setCostsUnitSymbol] = useState([]);
  const [costsQuantity, setCostsQuantity] = useState([]);
  const [subtotals, setSubtotals] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [profit, setProfit] = useState(0);
  const [profitPercent, setProfitPercent] = useState(0);
  const [fieldsData, setFieldsData] = useState({
    description: "",
    instructions: "",
    brief: "",
    category: "",
    family: "",
    price: 0,
    eShop: false,
    sale: false,
  });
  const [validationErrors, setValidationErrors] = useState({
    description: false,
    category: false,
    family: false,
    price: false,
  });

  const onChange = (e) => {
    let attribute = "";
    if (e.target.type === "checkbox") {
      attribute = "checked";
    } else {
      attribute = "value";
    }
    setFieldsData({
      ...fieldsData,
      [e.target.name]: e.target[attribute],
    });
  };

  const onValidation = (name, value) => {
    setValidationErrors({ ...validationErrors, [name]: value });
  };

  const openModal = (isNew) => (e) => {
    setShowModal(true);
  };

  const addCost = (data, unitSymbol, quantity) => {
    setCostsData([...costsData, data]);
    setCostsUnitSymbol([...costsUnitSymbol, unitSymbol]);
    setCostsQuantity([...costsQuantity, quantity]);
  };

  const updateCost = (costData, costQuantity) => {
    console.log("update cost:", costData, costQuantity);
  };

  const save = () => {
    setIsSaving(true);
    isNew ? _create() : _update();
  };

  const _create = async () => {
    const recipeData = { ...fieldsData };
    const recipeCosts = {
      costsData,
      costsUnitSymbol,
      costsQuantity,
    };
    const res = await props.actCreateRecipe({ recipeData, recipeCosts });
    if (res.status >= 200 && res.status < 300) {
      setIsSaving(false);
      history.push("/recipes-table");
    }
  };

  const _update = () => {
    console.log("update");
  };

  useEffect(() => {
    if (props.data) {
      setFieldsData({ ...props.data });
    } else {
      setIsEdit(true);
      setIsNew(true);
      setValidationErrors({
        description: true,
        category: true,
        family: true,
        price: true,
      });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const newSubtotals = calculateSubtotals(
      units,
      props.variableCosts,
      costsData,
      costsUnitSymbol,
      costsQuantity
    );
    const newTotalCost = newSubtotals.reduce(
      (acc, value) => acc + parseFloat(value),
      0
    );
    setSubtotals(newSubtotals);
    setTotalCost(newTotalCost.toFixed(2));
  }, [costsData, costsUnitSymbol, costsQuantity]);

  useEffect(() => {
    setProfit(fieldsData.price - totalCost);
    setProfitPercent(
      (((fieldsData.price - totalCost) * 100) / fieldsData.price).toFixed(2)
    );
  }, [subtotals, totalCost, fieldsData.price]);

  useEffect(() => {
    const { description, category, family, price } = validationErrors;
    setIsFormValid(!(description || category || family || price));
  }, [validationErrors]);

  return (
    <div>
      <div className={classes.container}>
        <header>
          <InputField
            showLabel={false}
            name="description"
            disabled={!isEdit}
            placeholder="Ingrese el nombre de la receta..."
            value={fieldsData.description}
            validations={["isNotEmpty"]}
            onChange={onChange}
            onValidation={onValidation}
          />
        </header>
        <label>Ingredientes</label>
        <TableTools openAddModal={openModal(true)} />
        <table>
          <thead className="table-header">
            <tr>
              <th>id</th>
              <th>descripcion</th>
              <th>unidad</th>
              <th>cantidad</th>
              <th>subtotal</th>
            </tr>
          </thead>
          <tbody>
            {costsData.map((cost, index) => (
              <tr key={cost.id}>
                <td>{cost.id}</td>
                <td>{cost.description}</td>
                <td>{costsUnitSymbol[index]}</td>
                <td>{costsQuantity[index]}</td>
                <td>{subtotals[index]}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={classes.inputArea}>
          <div className={classes.instructions}>
            <label>Instrucciones</label>
            <br />
            <textarea
              name="instructions"
              disabled={!isEdit}
              cols="30"
              rows="10"
              onChange={onChange}
            ></textarea>
          </div>
          <div className={classes.brief}>
            <label>resumen</label>
            <br />
            <textarea
              name="brief"
              disabled={!isEdit}
              cols="30"
              rows="10"
              onChange={onChange}
            ></textarea>
          </div>
          <div className={classes.selectionArea}>
            <div>
              <SelectField
                label="Categoría"
                name="category"
                disabled={!isEdit}
                value={fieldsData.category}
                options={categories}
                validations={["isNotEmpty"]}
                onChange={onChange}
                onValidation={onValidation}
              />
              <SelectField
                label="Familia"
                name="family"
                disabled={!isEdit}
                value={fieldsData.family}
                options={families}
                validations={["isNotEmpty"]}
                onChange={onChange}
                onValidation={onValidation}
              />
              <InputField
                label="Precio"
                name="price"
                disabled={!isEdit}
                value={fieldsData.price}
                min={0}
                validations={["isNotEmpty", "isNumber"]}
                onChange={onChange}
                onValidation={onValidation}
              />
            </div>
            <div className={classes.checkboxArea}>
              <CheckboxField
                label="eShop"
                name="eShop"
                disabled={!isEdit}
                onChange={onChange}
              />
              <CheckboxField
                label="Oferta"
                name="sale"
                disabled={!isEdit}
                onChange={onChange}
              />
            </div>
            <div className={classes.lastArea}>
              <div>
                <p>Costo: S/{totalCost}</p>
                <p>Ganancia: S/{profit}</p>
                <p>Margen: {profitPercent}%</p>
              </div>
              <div>
                <button
                  className="btn-success"
                  onClick={save}
                  disabled={!isFormValid || isSaving}
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal show={showModal} closeModal={() => setShowModal(false)}>
        <VariableCostPicker
          closeModal={() => setShowModal(false)}
          addCost={addCost}
          updateCost={updateCost}
          //data={selectedItem}
        />
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    variableCosts: state.variableCostReducer.costs,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actCreateRecipe: (payload) =>
      dispatch(actionCreators.createRecipe(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Recipe);
