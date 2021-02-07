import React, { useState } from "react";
import "./CostDetail.css";
import close_icon from "../../img/close_icon.svg";

export default function CostDetail(props) {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="CostDetail">
      <form>
        <div className="close-btn">
          <img alt="close" src={close_icon} className="Icon" />
        </div>
        <div className="id-field">
          <h2>Id: 48597178</h2>
        </div>
        <div className="desc-field">
          <label>Decripcion</label>
          <br />
          <input type="text" />
        </div>
        <div className="unit-field">
          <label>Unidad</label>
          <br />
          <select name="">
            <option value="">a</option>
            <option value="">b</option>
          </select>
        </div>
        <div className="cost-field">
          <label>Costo</label>
          <br />
          <input type="number" />
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
