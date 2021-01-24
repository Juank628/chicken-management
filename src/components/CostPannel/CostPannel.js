import React from "react";
import "./CostPannel.css";
import FixedCostTable from "../FixedCostTable/FixedCostTable";
import VarCostTable from "../VarCostTable/VarCostTable";

function CostPannel() {
  return (
    <div className="Cost-Pannel-Container">
      <div>
        <FixedCostTable />
      </div>
      <div>
        <VarCostTable />
      </div>
    </div>
  );
}

export default CostPannel;
