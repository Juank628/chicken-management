import React from "react";
import classes from "./Home.module.css";
import HomeItem from "../../HomeItem/HomeItem";
import ingredients_icon from "../../../img/ingredients_icon.svg";
import recipe_icon from "../../../img/recipe_icon.svg";

export default function Home() {
  return (
    <div className={classes.container}>
      <HomeItem
        icon={ingredients_icon}
        title="ingredientes"
        to="/variable-costs"
      />
      <HomeItem icon={recipe_icon} title="recetas" to="/recipes-table" />
    </div>
  );
}
