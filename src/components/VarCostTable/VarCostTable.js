import React, { useState } from "react";

function VarCostTable() {
  const [cost, setCost] = useState("0");

  return (
    <div>
      <p>{cost}</p>
      <input onChange={(e) => setCost(e.target.value)} />
    </div>
  );
}

export default VarCostTable;
