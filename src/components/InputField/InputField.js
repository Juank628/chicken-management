import classes from "./InputField.module.css";
import React, { useState, useEffect, useCallback, useRef } from "react";
import * as validate from "../../utilities/validation";

export default function InputField({
  showLabel = true,
  label = "",
  type = "text",
  name,
  placeholder,
  disabled = false,
  autoComplete = "off",
  minLength = -1,
  maxLength = Infinity,
  min = -Infinity,
  max = Infinity,
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
    <React.Fragment>
      {showLabel ? (
        <div>
          <label>{label}</label>
          <br />
        </div>
      ) : null}
      <input
        type={type}
        name={name}
        minLength={minLength}
        maxLength={maxLength}
        min={min}
        max={max}
        value={value}
        onChange={onChangeHandler}
        disabled={disabled}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={classes.inputField}
      />
      {validationErrors.map((error, index) => (
        <p key={index} className="field-error-text">
          {error}
        </p>
      ))}
    </React.Fragment>
  );
}
