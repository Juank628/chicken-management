import React from "react";
import classes from "./RecipesTable.module.css";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import TableTools from "../../TableTools/TableTools";

function RecipesTable(props) {
  const history = useHistory();

  const openRecipe = (e) => {
    const recipeId = e.currentTarget.id || "new";
    history.push(`/recipe/${recipeId}`);
  };

  return (
    <div className={classes.RecipeTable}>
      <TableTools openAddModal={openRecipe} />
      <table>
        <thead>
          <tr className="table-header">
            <th className={classes.id}>id</th>
            <th className={classes.desc}>Descripcion</th>
            <th className={classes.family}>Familia</th>
            <th className={classes.cost}>Costo</th>
            <th className={classes.price}>Precio</th>
            <th className={classes.profitAmount}>Ganancia S/</th>
            <th className={classes.profitPercent}>Ganancia %</th>
          </tr>
        </thead>
        <tbody>
          {props.recipes.map((recipe) => (
            <tr key={recipe.id} id={recipe.id} onClick={openRecipe}>
              <td>{recipe.id}</td>
              <td>{recipe.description}</td>
              <td>{recipe.family}</td>
              <td>null</td>
              <td>{recipe.price}</td>
              <td>null</td>
              <td>null</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    recipes: state.recipeReducer.recipes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipesTable);
