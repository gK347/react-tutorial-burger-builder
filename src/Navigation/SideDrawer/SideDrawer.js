import React from "react";
import classes from "./SideDrawer.module.css";
import Logo from "./../../Components/Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import BackDrop from "../../Components/Modal/BackDrop";

const sideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }

  return (
    <>
      <BackDrop show={props.open} closeBackDrop={props.close} />
      <div className={attachedClasses.join(" ")}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </>
  );
};

export default sideDrawer;
