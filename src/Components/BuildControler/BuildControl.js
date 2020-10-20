import React from "react";
import classes from "./BuildControler.module.css";

const buildControl = (props) => {
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{props.label}</div>
      <button
        className={classes.Less}
        onClick={() => props.onPressRemove()}
        disabled={props.disableButton}
      >
        -
      </button>
      <button className={classes.More} onClick={() => props.onPressAdd()}>
        +
      </button>
    </div>
  );
};
export default buildControl;
