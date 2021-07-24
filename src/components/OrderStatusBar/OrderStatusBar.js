import React from "react";
import classes from "./OrderStatusBar.module.css";
import { useState, useEffect } from "react";

export default function OrderStatusBar(props) {
  const [description, setDescription] = useState("");
  const [percentString, setPercentString] = useState("0%")
  const {percent} = props 

  useEffect(() => {
    setPercentString(`${percent}%`);
    switch (props.status) {
      case 0:
        setDescription("Anulado");
        break;
      case 50:
        setDescription("Cocina");
        break;
      case 55:
        setDescription("En camino");
        break;
      case 60:
        setDescription("Entregado");
        break;
      case 65:
        setDescription("Pagado");
        break;
      default:
    }
  }, []);

  return (
    <div className={classes.OrderStatusBar}>
      <p>{description}</p>
      <div className={classes.bar_container}>
        <div className={classes.bar} style={{width: percentString}}></div>
        <div className={classes.scale}>
          <div>25</div>
          <div>50</div>
          <div>75</div>
          <div>100</div>
        </div>
      </div>
    </div>
  );
}
