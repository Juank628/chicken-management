import { units } from "../config/units.json";

export const calculateSubtotals = (
  variableCosts,
  costsData,
  costsUnitSymbol,
  costsQuantity
) => {
  let newSubtotals = [];
  let calculatedCost = 0;

  costsData.forEach((cost, index) => {
    const variableCost = variableCosts.find(
      (variableCost) => variableCost.description === cost.description
    );

    const costUnit = units.find(
      (unit) => unit.symbol === costsUnitSymbol[index]
    );
    const variableCostUnit = units.find(
      (unit) => unit.symbol === variableCost.unitSymbol
    );

    calculatedCost =
      costsQuantity[index] *
      costUnit.factor *
      (variableCost.cost / variableCostUnit.factor);

    newSubtotals.push(calculatedCost.toFixed(2));
  });

  return newSubtotals;
};

export const calculateRecipeCost = (recipes, recipeId) => {
  let subtotals = [];
  let calculatedCost = 0;
  let totalCost = 0;
  let profit = 0;
  let profitPercent = 0;

  const { VariableCosts, price } = recipes.find((item) => item.id === recipeId);

  VariableCosts.forEach((cost) => {
    const costUnit = units.find(
      (unit) => unit.symbol === cost.RecipeCost.CostUnit
    );
    const variableCostUnit = units.find(
      (unit) => unit.symbol === cost.unitSymbol
    );
    calculatedCost =
      cost.RecipeCost.CostQuantity *
      costUnit.factor *
      (cost.cost / variableCostUnit.factor);
    subtotals.push(calculatedCost);
  });

  totalCost = subtotals
    .reduce((acc, value) => acc + parseFloat(value), 0)
    .toFixed(1);
  profit = (price - totalCost).toFixed(1);
  profitPercent = (profit / price).toFixed(1);

  const results = { totalCost, profit, profitPercent };

  return results;
};
