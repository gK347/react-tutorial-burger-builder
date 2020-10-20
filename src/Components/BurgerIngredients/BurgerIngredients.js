import React from "react";
import classes from "./BurgerIngredient.module.css";
import Proptypes from "prop-types";

const burgerIngredient = (props) => {
  let ingredient = null;
  // eslint-disable-next-line default-case
  switch (props.type) {
    case "BreadBottom":
      ingredient = <div className={classes.BreadBottom} />;
      break;
    case "BreadTop":
      ingredient = (
        <div className={classes.BreadTop}>
          <div className={classes.Seeds1}></div>
          <div className={classes.Seeds2}></div>
        </div>
      );
      break;
    case "Meat":
      ingredient = <div className={classes.Meat} />;
      break;
    case "Cheese":
      ingredient = <div className={classes.Cheese} />;
      break;
    case "Salad":
      ingredient = <div className={classes.Salad} />;
      break;
    case "Bacon":
      ingredient = <div className={classes.Bacon} />;
      break;
    default:
      ingredient = null;
      break;
  }
  return ingredient;
};

burgerIngredient.propTypes = {
  type: Proptypes.string.isRequired,
};

export default burgerIngredient;
