import React, { useState, useEffect, useCallback, useRef } from "react";
import classes from "./SelectField.module.css";
import * as validate from "../../utilities/validation";

export default function SelectField({
  showLabel = true,
  label = "",
  name,
  disabled = false,
  options = [],
  size = 1,
  min = -Infinity,
  max = Infinity,
  minLength = -1,
  maxLength = Infinity,
  value,
  validations = [],
  onChange,
  onValidation,
}) {
  const [validationErrors, setValidationErrors] = useState([]);
  const prevValue = useRef("");

  const onChangeHandler = (e) => {
    onChange(e);
  };

  const validateErrors = useCallback(() => {
    let errors = [];
    let filteredErrors = [];
    validations.forEach((validation) => {
      switch (validation) {
        case "isString":
          errors = [
            ...errors,
            validate[validation](value, minLength, maxLength),
          ];
          break;

        case "isNumber":
          errors = [...errors, validate[validation](value, min, max)];
          break;

        default:
          errors = [...errors, validate[validation](value)];
          break;
      }
    });
    filteredErrors = errors.filter((err) => err.length > 0);
    setValidationErrors(filteredErrors);
  }, [validations, value, minLength, maxLength, min, max]);

  useEffect(() => {
    if (value !== prevValue.current) {
      validateErrors();
    }
    prevValue.current = value;
  }, [value, validateErrors]);

  useEffect(() => {
    if (validationErrors.length > 0) {
      onValidation(name, true);
    } else {
      onValidation(name, false);
    }
  }, [validationErrors, name]);

  return (
    <div>
      {showLabel ? (
        <React.Fragment>
          <label>{label}</label>
          <br />
        </React.Fragment>
      ) : null}
      <select
        name={name}
        value={value}
        size={size}
        onChange={onChangeHandler}
        disabled={disabled}
        className={classes.selectField}
      >
        <option value="">seleccione...</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      {validationErrors.map((error, index) => (
        <p key={index} className="field-error-text">
          {error}
        </p>
      ))}
    </div>
  );
}
