import React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import * as actionCreators from "../../../store/actions";
import classes from "./OrdersTable.module.css";
import TableTools from "../../TableTools/TableTools";
import OrderStatusBar from "../../OrderStatusBar/OrderStatusBar";

function OrdersTable(props) {
  const history = useHistory();

  const openOrder = (e) => {
    const orderId = e.currentTarget.id || "new"
    history.push(`/order/${orderId}`);
  };

  useEffect(() => {
    props.actReadOrders();
  }, []);

  return (
    <div className={classes.OrdersTable}>
      <TableTools openAddModal={openOrder} />
      <table>
        <thead>
          <tr className="table-header">
            <th className={classes.id}>id</th>
            <th className={classes.table}>Mesa</th>
            <th className={classes.price}>Precio (S/)</th>
            <th className={classes.status}>Estado</th>
          </tr>
        </thead>
        <tbody>
          {props.orders.map((order) => (
            <tr key={order.id} id={order.id} onClick={openOrder}>
              <td>{order.id}</td>
              <td>{order.table}</td>
              <td>{order.totalPrice}</td>
              <td>
                <OrderStatusBar percent={order.percent} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
    actReadOrders: (payload) => dispatch(actionCreators.readOrders(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrdersTable);
