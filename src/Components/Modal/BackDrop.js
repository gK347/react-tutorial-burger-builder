import React from "react";
import classes from "./Modal.module.css";

const backDrop = (props) =>
  props.show ? (
    <div className={classes.BackDrop} onClick={props.closeBackDrop} />
  ) : null;

export default backDrop;
