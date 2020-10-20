import React, { Component } from "react";
import classes from "./Layout.module.css";
import Toolbar from "./../../Navigation/ToolBar/ToolBar";
import SideDrawer from "../../Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSideDrawer: false,
    };
  }

  sideDrawerCloseHandler = () => {
    this.setState({ showSideDrawer: true });
  };

  sideDrawerCloseHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  menuToggleHandler = () => {
    this.setState((prevState) => {
      return {
        showSideDrawer: !prevState.showSideDrawer,
      };
    });
  };

  render() {
    let { showSideDrawer } = this.state;
    return (
      <>
        <Toolbar menuToggleHandler={this.menuToggleHandler} />
        <SideDrawer close={this.sideDrawerCloseHandler} open={showSideDrawer} />
        <main className={classes.Content}>{this.props.children}</main>
      </>
    );
  }
}

export default Layout;
