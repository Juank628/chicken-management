import React, { useState, useEffect, useCallback } from "react";
import "./VariableCostDetail.css";
import close_icon from "../../img/close_icon.svg";
import { types, units } from "../../config/units.json";

function VariableCostDetail(props) {
  const [isEdit, setIsEdit] = useState(false);
  const [availableUnits, setAvailableUnits] = useState([]);
  const [detail, setDetail] = useState({
    id: "0",
    description: "ingrese...",
    unitType: "seleccione...",
    unitSymbol: "seleccione...",
    cost: 0,
  });

  const getAvailableUnits = useCallback(() => {
    let newAvailableUnits = units.filter(
      (unit) => unit.type === detail.unitType
    );
    setAvailableUnits(newAvailableUnits);
  }, [detail.unitType]);

  const changeHandler = (e) => {
    setDetail({
      ...detail,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    setDetail({ ...props.data });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    getAvailableUnits();
  }, [detail, getAvailableUnits]);

  return (
    <div className="VariableCostDetail">
      <form>
        <div className="close-btn" onClick={props.closeModal}>
          <img alt="close" src={close_icon} className="Icon" />
        </div>
        <div className="id-field">
          <h2>Id: {detail.id}</h2>
        </div>
        <div className="desc-field">
          <label>Decripcion</label>
          <br />
          <input
            type="text"
            name="description"
            value={detail.description}
            onChange={changeHandler}
            disabled={!isEdit}
          />
        </div>
        <div className="type-field">
          <label>Medida</label>
          <br />
          <select
            name="unitType"
            value={detail.unitType}
            onChange={changeHandler}
            disabled={!isEdit}
          >
            <option value="0">seleccione...</option>
            {types.map((type, item) => (
              <option key={item} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="unit-field">
          <label>Unidad</label>
          <br />
          <select
            name="unitSymbol"
            value={detail.unitSymbol}
            onChange={changeHandler}
            disabled={!isEdit}
          >
            <option value="0">seleccione...</option>
            {availableUnits.map((unit, item) => (
              <option key={item} value={unit.symbol}>
                {unit.symbol}
              </option>
            ))}
          </select>
        </div>
        <div className="cost-field">
          <label>Costo</label>
          <br />
          <input
            type="number"
            name="cost"
            value={detail.cost}
            onChange={changeHandler}
            disabled={!isEdit}
          />
        </div>

        {isEdit ? (
          <div className="btn-area">
            <button type="button" className="save-btn">
              Guardar
            </button>
            <button
              type="button"
              className="cancel-btn"
              onClick={() => setIsEdit(false)}
            >
              Cancelar
            </button>
          </div>
        ) : (
          <div className="btn-area">
            <button
              type="button"
              className="edit-btn"
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

export default VariableCostDetail;
