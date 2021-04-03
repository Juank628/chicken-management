import React from "react";
import classes from "./CheckboxField.module.css";

function CheckboxField({ label = "", onChange, name, checked = false }) {
  const onChangeHandler = (e) => {
    onChange(e);
  };
  return (
    <div>
      <input
        type="checkbox"
        checked={checked}
        name={name}
        onChange={onChangeHandler}
        className={classes.checkBox}
      />
      <label>{label}</label>
    </div>
  );
}

export default CheckboxField;
