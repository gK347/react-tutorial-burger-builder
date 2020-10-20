import React from "react";
import classes from "./BuildControler.module.css";
import BuildControl from "./BuildControl";

const controls = [
  { label: "Meat", type: "Meat" },
  { label: "Cheese", type: "Cheese" },
  { label: "Salad", type: "Salad" },
  { label: "Bacon", type: "Bacon" },
];
const buildControler = (props) => (
  <div className={classes.BuildControler}>
    <p>
      Current Price: <strong>{props.price.toFixed(2)}</strong>
    </p>
    {controls.map((control) => (
      <BuildControl
        key={control.label}
        label={control.label}
        onPressAdd={() => props.addIngredient(control.type)}
        onPressRemove={() => props.removeIngredient(control.type)}
        disableButton={props.ingredients[control.label] > 0 ? false : true}
      />
    ))}
    <button
      className={classes.OrderButton}
      disabled={!props.purchaseAble}
      onClick={() => props.purchaseHandler()}
    >
      ORDER NOW
    </button>
  </div>
);

export default buildControler;
