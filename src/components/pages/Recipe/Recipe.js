import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import classes from "./Recipe.module.css";
import { units } from "../../../config/units.json";
import Modal from "../../Modal/Modal";
import VariableCostPicker from "../../VariableCostPicker/VariableCostPicker";
import TableTools from "../../TableTools/TableTools";
import InputField from "../../InputField/InputField";
import SelectField from "../../SelectField/SelectField";

function Recipe(props) {
  const [showModal, setShowModal] = useState(false);
  const [costsData, setCostsData] = useState([]);
  const [costsUnitSymbol, setCostsUnitSymbol] = useState([]);
  const [costsQuantity, setCostsQuantity] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  const onChange = () => {};
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

  useEffect(() => {
    let newTotalCost = 0;
    costsData.forEach((cost, index) => {
      //calculate cost
    });
  }, [costsData, costsUnitSymbol, costsQuantity]);

  return (
    <div>
      <div className={classes.container}>
        <header>
          <h1>Pollo a la braza</h1>
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
            </tr>
          </thead>
          <tbody>
            {costsData.map((cost, index) => (
              <tr key={cost.id}>
                <td>{cost.id}</td>
                <td>{cost.description}</td>
                <td>{costsUnitSymbol[index]}</td>
                <td>{costsQuantity[index]}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={classes.inputArea}>
          <div className={classes.instructions}>
            <label>Instrucciones</label>
            <br />
            <textarea name="" id="" cols="30" rows="10"></textarea>
          </div>
          <div>
            <InputField
              label="Precio"
              name="price"
              disabled={false}
              value={0}
              validations={["isNotEmpty", "isNumber"]}
              onChange={onChange}
              onValidation={onValidation}
            />
            <br />
            <SelectField
              label="Familia"
              name="family"
              disabled={true}
              value={"Seleccione..."}
              options={[]}
              validations={["isNotEmpty"]}
              onChange={onChange}
              onValidation={onValidation}
            />
          </div>
          <div>
            <p>Costo: S/{totalCost}</p>
            <p>Ganancia: S/3.2</p>
            <p>Ganancia: 30%</p>
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Recipe);
