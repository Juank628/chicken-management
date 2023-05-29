import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux"
import classes from "./RecipePicker.module.css"
import InputField from "../InputField/InputField";
import SelectField from "../SelectField/SelectField";

function RecipePicker(props) {
  const [isEdit, setIsEdit] = useState(true);
  const [filteredRecipesDesc, setFilteredRecipesDesc] = useState([])
  const [noFilteredRecipesDesc, setNoFilteredRecipesDesc] = useState([])
  const [fieldsData, setFieldsData] = useState({
    filterCriteria: "",
    quantity: 0
  })
  const isMounted = useRef(false)

  const onChange = (e) => {
    setFieldsData({
      ...fieldsData,
      [e.target.name]:e.target.value
    })
  };

  const onValidation = (e) => {};

  useEffect(()=>{
    let onlyDesc = props.recipes.map(recipe => {
      return recipe.description
    })

    setNoFilteredRecipesDesc(onlyDesc)
    setFilteredRecipesDesc(onlyDesc)
  },[])

  useEffect(()=>{
    if(isMounted.current){
      let filteredValues = []
      const regexp = new RegExp(fieldsData.filterCriteria, "i")
      filteredValues = noFilteredRecipesDesc.filter((recipe)=>regexp.test(recipe))
      setFilteredRecipesDesc(filteredValues)
    }
    isMounted.current = true
  },[fieldsData.filterCriteria])

  return (
    <div>
      <div>
        <InputField
          label="Buscar"
          name="filterCriteria"
          disabled={!isEdit}
          value={fieldsData.filterCriteria}
          onChange={onChange}
          onValidation={onValidation}
        />
      </div>
      <div>
        <SelectField
          showLabel={false}
          name="description"
          disabled={!isEdit}
          value={0}
          options={filteredRecipesDesc}
          size={10}
          validations={[]}
          onChange={onChange}
          onValidation={onValidation}
        />
      </div>
      <div>
        <InputField
          label="Cantidad"
          name="quantity"
          disabled={!isEdit}
          value={fieldsData.quantity}
          onChange={onChange}
          onValidation={onValidation}
        />
      </div>
      <div className={classes.buttonArea}>
        <button
          type="button"
          className="btn-success"
        >
          Guardar
        </button>
        <button
          type="button"
          className="btn-danger"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    recipes: state.recipeReducer.recipes
  }
}

export default connect(mapStateToProps)(RecipePicker)