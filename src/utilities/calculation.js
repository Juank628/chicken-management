export const calculateSubtotals = (units, variableCosts, costsData, costsUnitSymbol, costsQuantity) => {
  let newSubtotals = [];

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

    let calculatedCost =
      costsQuantity[index] *
      costUnit.factor *
      (variableCost.cost / variableCostUnit.factor);

    newSubtotals.push(calculatedCost);
  });

  return newSubtotals
};
