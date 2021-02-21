import React, { useState, useEffect, useCallback, useRef } from "react";
import * as validate from "../../utilities/validation";

export default function InputField({
  label = "",
  type = "text",
  name,
  placeholder,
  autoComplete = "off",
  maxLength = Infinity,
  minLength = -Infinity,
  value,
  onChange,
  validations = [],
}) {
  const [validationErrors, setValidationErrors] = useState([]);
  const prevValue = useRef("");

  const onChangeHandler = (e) => {
    onChange(e);
  };

  const validateErrors = useCallback(() => {
    let errors = [];
    validations.forEach((validation) => {
      switch (validation) {
        case "isString":
          errors = [
            ...errors,
            validate[validation](value, minLength, maxLength),
          ];
          break;

        default:
          errors = [...errors, validate[validation](value)];
          break;
      }
    });
    setValidationErrors(errors);
  }, [validations, value, maxLength, minLength]);

  useEffect(() => {
    if (value !== prevValue.current) {
      validateErrors();
    }
    prevValue.current = value;
  }, [value, validateErrors]);

  return (
    <React.Fragment>
      <label>{label}</label>
      <br />
      <input
        type={type}
        name={name}
        minLength={minLength}
        maxLength={maxLength}
        value={value}
        onChange={onChangeHandler}
        disabled={false}
        placeholder={placeholder}
        autoComplete={autoComplete}
      />
      {validationErrors.map((error, index) => (
        <p key={index} className="field-error-text">
          {error}
        </p>
      ))}
    </React.Fragment>
  );
}
