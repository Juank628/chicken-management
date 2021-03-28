import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import "./RecipesTable.css";
import TableTools from "../../TableTools/TableTools";

function RecipesTable(props) {
  const history = useHistory();
  
  const openRecipe = () => {
    history.push("/recipe");
  };

  return (
    <div className="RecipeTable">
      <TableTools openAddModal={openRecipe} />
      <table>
        <thead>
          <tr className="table-header">
            <th className="id">id</th>
            <th className="desc">Descripcion</th>
            <th className="family">Familia</th>
            <th className="cost">Costo</th>
            <th className="price">Precio</th>
            <th className="profit-amount">Ganancia S/</th>
            <th className="profit-percent">Ganancia %</th>
          </tr>
        </thead>
        <tbody>
          {props.recipes.map((recipe) => (
            <tr key={recipe.id}>
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
