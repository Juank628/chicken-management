import React, { useState, useEffect, useCallback } from "react";
import classes from "./RecipesTable.module.css";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { calculateRecipeCost } from "../../../utilities/calculation";
import TableTools from "../../TableTools/TableTools";

function RecipesTable(props) {
  const history = useHistory();
  const [costsAndProfits, setCostsAndProfits] = useState([]);

  const openRecipe = (e) => {
    const recipeId = e.currentTarget.id || "new";
    history.push(`/recipe/${recipeId}`);
  };

  const getCost = (index) => {
    if (costsAndProfits[index]) {
      return costsAndProfits[index].totalCost;
    }
    return "not available";
  };

  const getProfit = (index) => {
    if (costsAndProfits[index]) {
      return costsAndProfits[index].profit;
    }
    return "not available";
  };

  const getProfitPercent = (index) => {
    if (costsAndProfits[index]) {
      return costsAndProfits[index].profitPercent;
    }
    return "not available";
  };

  const calculateCostsAndProfits = useCallback(() => {
    const results = [];
    props.recipes.forEach((recipe) =>
      results.push(calculateRecipeCost(props.recipes, recipe.id))
    );
    setCostsAndProfits(results);
  }, [props.recipes]);

  useEffect(() => {
    calculateCostsAndProfits();
  }, []);

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
          {props.recipes.map((recipe, index) => (
            <tr key={recipe.id} id={recipe.id} onClick={openRecipe}>
              <td>{recipe.id}</td>
              <td>{recipe.description}</td>
              <td>{recipe.family}</td>
              <td>{getCost(index)}</td>
              <td>{recipe.price}</td>
              <td>{getProfit(index)}</td>
              <td>{getProfitPercent(index)}</td>
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
