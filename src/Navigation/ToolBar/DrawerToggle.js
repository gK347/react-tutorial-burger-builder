import React from "react";
import classes from "./ToolBar.module.css";
// import Logo from "../../Components/Logo/Logo";
// import NavigationItems from "./../../Navigation/NavigationItems/NavigationItems";

const drawerToggle = (props) => (
  <div onClick={props.menuToggleHandler} className={classes.DrawerToggle}>
    <div />
    <div />
    <div />
  </div>
);

export default drawerToggle;
