import React from "react";
import classes from "./ToolBar.module.css";
import Logo from "../../Components/Logo/Logo";
import NavigationItems from "./../../Navigation/NavigationItems/NavigationItems";
import DrawerToggle from "./DrawerToggle";

const toolBar = (props) => (
  <header className={classes.ToolBar}>
    <DrawerToggle menuToggleHandler={props.menuToggleHandler} />
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems />
    </nav>
  </header>
);

export default toolBar;
