import React, { useState } from "react";
import classes from "./RecipePicker.module.css"
import InputField from "../InputField/InputField";
import SelectField from "../SelectField/SelectField";

export default function RecipePicker() {
  const [isEdit, setIsEdit] = useState(true);

  const onChange = (e) => {};

  const onValidation = (e) => {};

  return (
    <div>
      <div className={classes.costFilter}>
        <InputField
          label="Buscar"
          name="filterCriteria"
          disabled={!isEdit}
          value={0}
          onChange={onChange}
          onValidation={onValidation}
        />
      </div>
      <div className={classes.costList}>
        <SelectField
          showLabel={false}
          name="description"
          disabled={!isEdit}
          value={0}
          options={["Jamon", "Queso"]}
          size={10}
          validations={[]}
          onChange={onChange}
          onValidation={onValidation}
        />
      </div>
    </div>
  );
}
