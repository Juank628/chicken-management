import React from "react";
import classes from "./OrderStatusBar.module.css";
import { useState, useEffect } from "react";

export default function OrderStatusBar(props) {
  const [description, setDescription] = useState("");
  const [percentString, setPercentString] = useState("0%")
  const {percent} = props 

  useEffect(() => {
    setPercentString(`${percent}%`);
    switch (props.percent) {
      case 0:
        setDescription("Anulado");
        break;
      case 25:
        setDescription("Cocina");
        break;
      case 50:
        setDescription("En camino");
        break;
      case 75:
        setDescription("Entregado");
        break;
      case 100:
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
