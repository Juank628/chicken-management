export const calculateSubtotals = (
  units,
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
