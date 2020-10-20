import React from "react";
import classes from "./Modal.module.css";
import BackDrop from "./BackDrop";
const modal = (props) => (
  <>
    <div
      style={{
        transform: props.show ? "translateY(0)" : "translateY(-100vh)",
        opacity: props.show ? "1" : "0",
      }}
      className={classes.Modal}
    >
      {props.children}
    </div>
    <BackDrop show={props.show} closeBackDrop={() => props.closeBackDrop()} />
  </>
);

export default modal;
