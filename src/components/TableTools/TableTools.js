import React from "react";
import add_icon from "../../img/add_icon.svg";
import "./TableTools.css";

export default function TableTools(props) {
  return (
    <div className="TableTools">
      <div>
        <input type="text" placeholder="Buscar..." />
      </div>
      <div className="icons-container">
        <img
          src={add_icon}
          alt="add"
          className="add-icon"
          onClick={props.openAddModal}
        />
      </div>
    </div>
  );
}
