import React, { useState } from "react";
import delete_icon from "../../img/delete_icon.svg";
import accept_icon from "../../img/accept_icon.svg";

function FixedCostTable() {
  const [isNewRow, setIsNewRow] = useState(false);
  const [newField, setNewField] = useState({
    newCostDesc: "",
    newCostValue: "0",
  });
  const [fixedCosts, setFixedCosts] = useState([]);

  const addFixedCost = () => {
    setFixedCosts([
      ...fixedCosts,
      {
        id: "temp" + new Date().getTime(), //Temporal ID for new item
        description: newField.newCostDesc,
        value: newField.newCostValue,
        edit: false,
      },
    ]);
    setIsNewRow(false);
    clearNewField();
  };

  const updateNewField = (e) => {
    setNewField((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const updateField = (e) => {
    const idToUpdate = e.target.parentElement.parentElement.id;
    const itemToUpdate = fixedCosts.findIndex((item) => item.id === idToUpdate);
    let updatedFixedCosts = fixedCosts;
    updatedFixedCosts[itemToUpdate] = {
      ...updatedFixedCosts[itemToUpdate],
      [e.target.name]: e.target.value,
    };
    setFixedCosts([...updatedFixedCosts]);
  };

  const clearNewField = () =>
    setNewField({
      newCostDesc: "",
      newCostValue: "0",
    });
  const insertNewRow = () => setIsNewRow(true);
  const deleteNewRow = () => setIsNewRow(false);
  const deleteRow = (e) => {
    const idToDelete = e.target.parentElement.parentElement.id
    const updatedFixedCosts = fixedCosts.filter(element => element.id !== idToDelete)
    setFixedCosts([...updatedFixedCosts])
  }
  const editRow = (e) => {
    changeEditState(e.currentTarget.id, true);
  };

  const acceptEdit = (e) => {
    changeEditState(e.target.parentElement.parentElement.id, false);
  };

  const changeEditState = (id, isEdit) => {
    let costsToEdit = fixedCosts;
    const indexToEdit = costsToEdit.findIndex((element) => element.id === id);
    costsToEdit[indexToEdit] = {
      ...costsToEdit[indexToEdit],
      edit: isEdit,
    };
    setFixedCosts([...costsToEdit]);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th className="Desc-Width">Descripcion</th>
            <th className="Value-Width">Costo</th>
          </tr>
        </thead>
        <tbody>
          {fixedCosts.map((item, index) => (
            <tr key={index} onDoubleClick={editRow} id={item.id}>
              {item.edit ? (
                <React.Fragment>
                  <td>
                    <input
                      name="description"
                      className="Desc-Width"
                      onChange={updateField}
                      defaultValue={item.description}
                    />
                  </td>
                  <td>
                    <input
                      name="value"
                      className="Value-Width"
                      onChange={updateField}
                      defaultValue={item.value}
                    />
                  </td>
                  <td className="Bg-White">
                    <img
                      src={accept_icon}
                      alt="accept"
                      className="Icon"
                      onClick={acceptEdit}
                    />
                  </td>
                  <td className="Bg-White">
                    <img
                      src={delete_icon}
                      alt="delete"
                      className="Icon"
                      onClick={deleteRow}
                    />
                  </td>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <td>{item.description}</td>
                  <td>{item.value}</td>
                </React.Fragment>
              )}
            </tr>
          ))}
          {isNewRow ? (
            <tr>
              <td>
                <input
                  className="Desc-Width"
                  name="newCostDesc"
                  onChange={updateNewField}
                />
              </td>
              <td>
                <input
                  className="Value-Width"
                  name="newCostValue"
                  onChange={updateNewField}
                />
              </td>
              <td className="Bg-White">
                <img
                  src={accept_icon}
                  alt="accept"
                  className="Icon"
                  onClick={addFixedCost}
                />
              </td>
              <td className="Bg-White">
                <img
                  src={delete_icon}
                  alt="delete"
                  className="Icon"
                  onClick={deleteNewRow}
                />
              </td>
            </tr>
          ) : null}
          {!isNewRow ? (
            <tr>
              <td colSpan="2">
                <button onClick={insertNewRow}>Agregar</button>
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
}

export default FixedCostTable;
