import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./NavigationItems.module.css";

const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <li>
      <NavLink to="/" activeClassName={classes.active} exact>
        Burger Builder
      </NavLink>
    </li>
    <li>
      <NavLink to="/orders" activeClassName={classes.active} exact>
        Orders
      </NavLink>
    </li>
    <li>
      <NavLink to="/auth" activeClassName={classes.active} exact>
        Login
      </NavLink>
    </li>
  </ul>
);

export default navigationItems;
