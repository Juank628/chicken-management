import React, { useState } from "react";
import classes from "./Recipe.module.css";
import Modal from "../../Modal/Modal";
import VariableCostPicker from "../../VariableCostPicker/VariableCostPicker";
import TableTools from "../../TableTools/TableTools";
import InputField from "../../InputField/InputField";
import SelectField from "../../SelectField/SelectField";

function Recipe() {
  const [showModal, setShowModal] = useState(false);
  const onChange = () => {};
  const onValidation = () => {};
  const openModal = (isNew) => (e) => {
    setShowModal(true);
  };

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
            <tr>
              <td>1</td>
              <td>Pollo</td>
              <td>Kg</td>
              <td>0.25</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Lechuga</td>
              <td>Kg</td>
              <td>0.3</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Tomate</td>
              <td>Kg</td>
              <td>0.7</td>
            </tr>
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
            <p>Costo: S/7.36</p>
            <p>Ganancia: S/3.2</p>
            <p>Ganancia: 30%</p>
          </div>
        </div>
      </div>

      <Modal show={showModal} closeModal={() => setShowModal(false)}>
        <VariableCostPicker
          closeModal={() => setShowModal(false)}
          //data={selectedItem}
        />
      </Modal>
    </div>
  );
}

export default Recipe;
