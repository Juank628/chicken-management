import React, { useState } from "react";
import "./CostsTable.css";
import Modal from "../../Modal/Modal";
import CostDetail from "../../CostDetail/CostDetail";

export default function CostsTable() {
  const [showModal, setShowModal] = useState(true);

  return (
    <div className="CostTable">
      <table>
        <thead>
          <tr className="table-header">
            <th className="id">id</th>
            <th className="desc">Descripcion</th>
            <th className="unit">Unidad</th>
            <th className="cost">Costo</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>id</td>
            <td>Descripcion</td>
            <td>Unidad</td>
            <td>Costo</td>
          </tr>
          <tr>
            <td>id</td>
            <td>Descripcion</td>
            <td>Unidad</td>
            <td>Costo</td>
          </tr>
        </tbody>
      </table>
      <Modal show={showModal} closeModal={() => setShowModal(false)}>
        <CostDetail />
      </Modal>
    </div>
  );
}
