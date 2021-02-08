import React, { useState } from "react";
import "./VariableCostsTable.css";
import Modal from "../../Modal/Modal";
import VariableCostDetail from "../../VariableCostDetail/VariableCostDetail";
import { connect } from "react-redux";

function VariableCostsTable(props) {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});

  const openModal = (e) => {
    const item = props.variableCosts.find(
      (item) => item.id === e.currentTarget.id
    );
    setSelectedItem(item);
    setShowModal(true);
  };

  return (
    <div className="VariableCostTable">
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
          {props.variableCosts.map((item) => (
            <tr key={item.id} id={item.id} onClick={openModal}>
              <td>{item.id}</td>
              <td>{item.description}</td>
              <td>{item.unit}</td>
              <td>{item.cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal show={showModal} closeModal={() => setShowModal(false)}>
        <VariableCostDetail
          closeModal={() => setShowModal(false)}
          data={selectedItem}
        />
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    variableCosts: state.variableCostReducer.costs,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(VariableCostsTable);
