import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actionCreators from "./../../../store/actions";
import { useHistory } from "react-router";
import classes from "./Order.module.css";
import Modal from "../../Modal/Modal";
import TableTools from "../../TableTools/TableTools";
import InputField from "../../InputField/InputField";
import SelectField from "../../SelectField/SelectField";
import OrderStatusBar from "../../OrderStatusBar/OrderStatusBar";
import RecipePicker from "../../RecipePicker/RecipePicker";

function Order(props) {
  const history = useHistory();
  const [fieldsData, setFieldsData] = useState({
    name: "",
    phone: "",
    address: "",
    comments: "",
    table: 0,
    discount: 0,
    percent: 50,
    recipesDesc: [],
    recipesQuantities: [],
    recipesPrices: [],
    recipesCosts: [],
    totalPrice: 0,
    totalCost: 0,
    totalProfit: 0,
  });
  const [recipeId, setRecipeId] = useState(0);
  const [validationErrors, setValidationErrors] = useState({
    name: false,
    phone: false,
    address: false,
    table: false,
    discount: false,
    percent: false,
  });
  const statusOptions = [
    "Anulado",
    "Cocina",
    "En camino",
    "Entregado",
    "Pagado",
  ];
  const statusValues = [0, 25, 50, 75, 100];
  const [isNew, setIsNew] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const onChange = (e) => {
    if (e.target.name === "percent") {
      setFieldsData({
        ...fieldsData,
        [e.target.name]: parseInt(e.target.value),
      });
    } else {
      setFieldsData({
        ...fieldsData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const onValidation = (name, value) => {
    setValidationErrors({
      ...validationErrors,
      [name]: value,
    });
  };

  const save = () => {
    isNew ? _create() : _update();
  };

  const _create = async () => {
    const adaptedFieldsData = adaptFieldsData();
    const res = await props.actCreateOrder(adaptedFieldsData);
    if (res.status >= 200 && res.status < 300) {
      history.push("/orders-table");
    }
  };

  const _update = () => {};

  const adaptFieldsData = () => {
    return {
      ...fieldsData,
      recipesDesc: fieldsData.recipesDesc.join(","),
      recipesQuantities: fieldsData.recipesQuantities.join(","),
      recipesPrices: fieldsData.recipesPrices.join(","),
      recipesCosts: fieldsData.recipesCosts.join(","),
    };
  };

  useEffect(() => {
    const { id } = props.match.params;
    setRecipeId(id)
    
    const selectedOrder = props.orders.find(order => order.id = id)
    setFieldsData(selectedOrder)

  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.general_info}>Order: 4893</div>

      <TableTools openAddModal={openModal} />
      <table>
        <thead>
          <tr className="table-header">
            <th className={classes.table_id}>id</th>
            <th className={classes.table_desc}>Descripción</th>
            <th className={classes.table_quantity}>Cantidad</th>
            <th className={classes.table_price}>Precio (S/)</th>
            <th className={classes.table_subtotal}>Subtotal (S/)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>1/4 Pollo a la brasa</td>
          </tr>
        </tbody>
      </table>

      <div className={classes.detailed_info}>
        <div className={classes.info_box}>
          <InputField
            label="Nombre"
            name="name"
            disabled={false}
            value={fieldsData.name}
            min={0}
            validations={[]}
            onChange={onChange}
            onValidation={onValidation}
          />
          <InputField
            label="Teléfono"
            name="phone"
            disabled={false}
            value={fieldsData.phone}
            min={9}
            validations={[]}
            onChange={onChange}
            onValidation={onValidation}
          />
          <InputField
            label="Dirección"
            name="address"
            disabled={false}
            value={fieldsData.address}
            min={0}
            validations={[]}
            onChange={onChange}
            onValidation={onValidation}
          />
          <label>Comentarios</label>
          <br />
          <textarea
            name="comments"
            value={fieldsData.comments}
            disabled={false}
            rows="10"
            onChange={onChange}
          ></textarea>
        </div>
        <div className={classes.info_box}>
          <InputField
            label="Mesa"
            name="table"
            disabled={false}
            value={fieldsData.table}
            min={0}
            validations={[]}
            onChange={onChange}
            onValidation={onValidation}
          />
          <InputField
            label="Descuento"
            name="discount"
            disabled={false}
            value={fieldsData.discount}
            min={0}
            validations={[]}
            onChange={onChange}
            onValidation={onValidation}
          />
          <SelectField
            label="Estado"
            name="percent"
            disabled={false}
            value={fieldsData.percent}
            optionValues={statusValues}
            options={statusOptions}
            validations={["isNotEmpty"]}
            onChange={onChange}
            onValidation={onValidation}
          />
          <div className={classes.status_bar}>
            <OrderStatusBar percent={fieldsData.percent} />
          </div>
        </div>
        <div className={classes.brief_container}>
          <div>
            <p className="mt-0">Subtotal: S/{56.8}</p>
            <p>Descuento: S/{0.0}</p>
            <p>Total a pagar: S/{56.8}</p>
          </div>
          <div>
            <button className="btn-success" onClick={save} disabled={false}>
              Guardar
            </button>
          </div>
        </div>
      </div>
      <Modal show={showModal} closeModal={() => setShowModal(false)}>
        <RecipePicker />
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    orders: state.orderReducer.orders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actCreateOrder: (payload) => dispatch(actionCreators.createOrder(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);
