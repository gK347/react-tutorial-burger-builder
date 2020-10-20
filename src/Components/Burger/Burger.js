import React from "react";
import classes from "./Burger.module.css";
import BurgerIngredient from "../BurgerIngredients/BurgerIngredients";

const burger = (props) => {
  let ingredientList = Object.keys(props.ingredients)
    .map((igKey) => {
      return [...Array(props.ingredients[igKey])].map((_, i) => (
        <BurgerIngredient key={igKey + i} type={igKey} />
      ));
    })
    .flat();
  if (ingredientList.length === 0) {
    ingredientList = <p>Please Start Adding Ingredients.</p>;
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type={"BreadTop"} />
      {ingredientList}
      <BurgerIngredient type={"BreadBottom"} />
    </div>
  );
};

export default burger;
