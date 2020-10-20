import React, { Component } from "react";
import classes from "./Checkout.module.css";
import Burger from "./../Burger/Burger";
import Button from "./../Button/Button";
import { Route, Redirect } from "react-router-dom";
import ContactData from "./ContactData";
import { connect } from "react-redux";

class Checkout extends Component {
  onPressCheckoutCancel = () => {
    this.props.history.goBack();
  };

  onPressCheckoutContinue = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    let { ingredients, purchased } = this.props;
    let summary = <Redirect to="/" />;
    if (ingredients) {
      const purchaseRedirect = purchased ? <Redirect to="/" /> : null;
      summary = (
        <div>
          {purchaseRedirect}
          <div className={classes.Checkout}>
            <h1>We hope you like the burger.</h1>
            <div style={{ width: "100%", margin: "auto" }}>
              <Burger ingredients={ingredients} />
            </div>
            <Button
              btnType={"Danger"}
              onClick={() => this.onPressCheckoutCancel()}
            >
              Cancel
            </Button>
            <Button
              btnType={"Success"}
              onClick={() => this.onPressCheckoutContinue()}
            >
              Continue
            </Button>
          </div>
          <Route
            path={this.props.match.path + "/contact-data"}
            component={ContactData}
          />
        </div>
      );
    }
    return summary;
  }
}

const mapStateToProps = ({ burgerBuilderReducer, orderReducer }) => {
  return {
    ingredients: burgerBuilderReducer.ingredients,
    purchased: orderReducer.purchased,
  };
};

export default connect(mapStateToProps)(Checkout);
