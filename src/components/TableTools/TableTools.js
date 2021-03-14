import React from "react";
import add_icon from "../../img/add_icon.svg";
import classes from "./TableTools.module.css";

export default function TableTools(props) {
  return (
    <div className={classes.tableTools}>
      <div>
        {props.showSearch ? (
          <input type="text" placeholder="Buscar..." />
        ) : null}
      </div>
      <div className={classes.iconsContainer}>
        <img
          src={add_icon}
          alt="add"
          className={classes.addIcon}
          onClick={props.openAddModal}
        />
      </div>
    </div>
  );
}
