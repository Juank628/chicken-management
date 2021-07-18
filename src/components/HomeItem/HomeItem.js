import React from "react";
import classes from "./HomeItem.module.css";
import { Link } from "react-router-dom";

export default function HomeItem(props) {
  return (
    <Link to={props.to} className={classes.link}>
      <div className={classes.container}>
        <h2>{props.title}</h2>
        <img src={props.icon} alt="img" />
      </div>
    </Link>
  );
}
