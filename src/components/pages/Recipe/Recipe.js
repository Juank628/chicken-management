import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import classes from "./Recipe.module.css";
import * as actionCreators from "../../../store/actions";
import { units } from "../../../config/units.json";
import { families } from "../../../config/recipes.json";
import { calculateSubtotals } from "../../../utilities/calculation";
import Modal from "../../Modal/Modal";
import VariableCostPicker from "../../VariableCostPicker/VariableCostPicker";
import TableTools from "../../TableTools/TableTools";
import InputField from "../../InputField/InputField";
import SelectField from "../../SelectField/SelectField";

function Recipe(props) {
  const [showModal, setShowModal] = useState(false);
  const [isNew, setIsNew] = useState(true);
  const [isEdit, setIsEdit] = useState(true);
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
    price: 0,
    family: "",
  });

  const onChange = (e) => {
    setFieldsData({
      ...fieldsData,
      [e.target.name]: e.target.value,
    });
  };
  const onValidation = () => {};
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

  const _create = () => {
    console.log("save");
    const recipeData = { ...fieldsData };
    const recipeCosts = {
      costsData,
      costsUnitSymbol,
      costsQuantity,
    };
    props.actCreateRecipe({ recipeData, recipeCosts });
  };

  const _update = () => {
    console.log("update");
  };

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
    setTotalCost(newTotalCost);
  }, [costsData, costsUnitSymbol, costsQuantity]);

  useEffect(() => {
    setProfit(fieldsData.price - totalCost);
    setProfitPercent(
      (((fieldsData.price - totalCost) * 100) / fieldsData.price).toFixed(2)
    );
  }, [subtotals, totalCost, fieldsData.price]);

  return (
    <div>
      <div className={classes.container}>
        <header>
          <InputField
            showLabel={false}
            name="description"
            disabled={false}
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
              cols="30"
              rows="10"
              onChange={onChange}
            ></textarea>
          </div>
          <div className={classes.priceAndFamily}>
            <div>
              <InputField
                label="Precio"
                name="price"
                disabled={false}
                value={fieldsData.price}
                validations={["isNotEmpty", "isNumber"]}
                onChange={onChange}
                onValidation={onValidation}
              />
              <br />
              <SelectField
                label="Familia"
                name="family"
                disabled={false}
                value={fieldsData.family}
                options={families}
                validations={["isNotEmpty"]}
                onChange={onChange}
                onValidation={onValidation}
              />
            </div>
          </div>
          <div className={classes.metrics}>
            <p>Costo: S/{totalCost}</p>
            <p>Ganancia: S/{profit}</p>
            <p>Margen: {profitPercent}%</p>
          </div>
          <div className={classes.btnArea}>
            <button className="btn-success" onClick={save}>
              Guardar
            </button>
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
    actCreateRecipe: (payload) => dispatch(actionCreators.createRecipe(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Recipe);
