import React from "react";
import classes from "./Home.module.css";
import HomeItem from "../../HomeItem/HomeItem";
import ingredients_icon from "../../../img/ingredients_icon.svg";
import recipe_icon from "../../../img/recipe_icon.svg";
import cash_machine_icon from "../../../img/cash_machine_icon.svg";

export default function Home() {
  return (
    <div className={classes.container}>
      <HomeItem
        icon={ingredients_icon}
        title="ingredientes"
        to="/variable-costs"
      />
      <HomeItem icon={recipe_icon} title="recetas" to="/recipes-table" />
      <HomeItem icon={cash_machine_icon} title="órdenes" to="/orders-table" />
    </div>
  );
}
