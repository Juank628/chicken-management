import React, { useState, useEffect, useCallback } from "react";
import "./ValuesTable.css";
import delete_icon from "../../img/delete_icon.svg";
import accept_icon from "../../img/accept_icon.svg";

function ValuesTable(props) {
  const { setTotal } = props;
  const [rowsContent, setRowsContent] = useState([]);
  const [isNewRow, setIsNewRow] = useState(false);
  const [newRow, setNewRow] = useState({
    newDesc: "",
    newValue: 0,
  });

  const addRowContent = async () => {
    setRowsContent([
      ...rowsContent,
      {
        id: "temp" + new Date().getTime(), //Temporal ID for new item
        description: newRow.newDesc,
        value: parseFloat(newRow.newValue),
        edit: false,
      },
    ]);
    setIsNewRow(false);
    clearNewField();
    calculateTotal();
  };

  const updateNewRow = (e) => {
    setNewRow((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const updateField = (e) => {
    if (e.target.value !== "") {
      let fieldValue = 0;
      if (e.target.type === "number") {
        fieldValue = parseFloat(e.target.value);
      } else {
        fieldValue = e.target.value;
      }
      const idToUpdate = e.target.parentElement.parentElement.id;
      const itemToUpdate = rowsContent.findIndex(
        (item) => item.id === idToUpdate
      );
      let updatedRowsContent = rowsContent;
      updatedRowsContent[itemToUpdate] = {
        ...updatedRowsContent[itemToUpdate],
        [e.target.name]: fieldValue,
      };
      setRowsContent([...updatedRowsContent]);
    }
  };

  const clearNewField = () =>
    setNewRow({
      newDesc: "",
      newValue: "0",
    });
  const insertNewRow = () => setIsNewRow(true);
  const deleteNewRow = () => setIsNewRow(false);
  const deleteRow = (e) => {
    const idToDelete = e.target.parentElement.parentElement.id;
    const updatedRowsContent = rowsContent.filter(
      (element) => element.id !== idToDelete
    );
    setRowsContent([...updatedRowsContent]);
  };
  const editRow = (e) => {
    changeEditState(e.currentTarget.id, true);
  };

  const acceptEdit = (e) => {
    changeEditState(e.target.parentElement.parentElement.id, false);
  };

  const changeEditState = (id, isEdit) => {
    let updatedRowsContent = rowsContent;
    const indexToEdit = updatedRowsContent.findIndex(
      (element) => element.id === id
    );
    updatedRowsContent[indexToEdit] = {
      ...updatedRowsContent[indexToEdit],
      edit: isEdit,
    };
    setRowsContent([...updatedRowsContent]);
  };

  const calculateTotal = useCallback(() => {
    if (rowsContent.length) {
      const total = rowsContent.reduce((acc, row) => acc + row.value, 0);
      setTotal(total);
    }
  }, [rowsContent, setTotal]);

  useEffect(() => {
    calculateTotal();
  }, [rowsContent, calculateTotal]);

  return (
    <div>
      <table>
        <thead>
          <tr className="table-title">
            <th colSpan="2">{props.title}</th>
          </tr>
          <tr className="table-header">
            <th className="Desc-Width">{props.descColText}</th>
            <th className="Value-Width">{props.valueColText}</th>
          </tr>
        </thead>
        <tbody>
          {rowsContent.map((item, index) => (
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
                      type="number"
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
                  name="newDesc"
                  onChange={updateNewRow}
                />
              </td>
              <td>
                <input
                  className="Value-Width"
                  name="newValue"
                  onChange={updateNewRow}
                />
              </td>
              <td className="Bg-White">
                <img
                  src={accept_icon}
                  alt="accept"
                  className="Icon"
                  onClick={addRowContent}
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

export default ValuesTable;
