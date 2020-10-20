import React, { Component } from "react";
import classes from "./Checkout.module.css";
import Button from "./../Button/Button";
import axios from "../../axiosOrder";
import Spinner from "../Spinner/Spinner";
import Input from "./../../UI/Input/Input";
import { connect } from "react-redux";
import withErrorHandler from "../../HOC/withErrorHandler/withErrorHandler";
import { purchaseBurger } from "./../../store/Actions";
class ContactData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderForm: {
        name: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "Your name",
          },
          value: "",
          isValid: false,
          touched: false,
          validation: {
            isRequired: true,
          },
        },
        city: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "Your city",
          },
          value: "",
          isValid: false,
          touched: false,
          validation: {
            isRequired: true,
          },
        },
        zipCode: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "Your zip code",
          },
          value: "",
          isValid: false,
          touched: false,
          validation: {
            isRequired: true,
            lengthEquals: 6,
          },
        },
        country: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "Your country",
          },
          value: "",
          isValid: false,
          touched: false,
          validation: {
            isRequired: true,
          },
        },
        email: {
          elementType: "email",
          elementConfig: {
            type: "text",
            placeholder: "Your email",
          },
          value: "",
          isValid: false,
          touched: false,
          validation: {
            isRequired: true,
          },
        },
        deliveryMethod: {
          elementType: "select",
          elementConfig: {
            options: [
              { value: "fastest", displayValue: "Fastest" },
              { value: "cheapest", displayValue: "Cheapest" },
            ],
          },
          value: "fastest",
          isValid: true,
          validation: {},
        },
      },
      isFromValid: false,
    };
  }

  checkValidation = (value, rules) => {
    let isValid = true;
    if (rules) {
      if (rules.isRequired && isValid) {
        isValid = value.trim() !== "";
      }
      if (rules.lengthEquals && isValid) {
        isValid = value.length !== rules.lengthEquals ? false : true;
      }
    }
    return isValid;
  };

  orderHandler = (event) => {
    let { ingredients, price } = this.props;
    let { orderForm } = this.state;
    event.preventDefault();
    const customerData = {};
    for (let i in orderForm) {
      console.log(i);
      customerData[i] = orderForm[i].value;
    }
    let orderBody = {
      ingredients,
      price: price.toFixed(2),
      customerData,
    };
    this.props.purchaseBurger(orderBody);
  };

  inputChangeHandler = (event, inputIdentifier) => {
    let { orderForm, isFromValid } = this.state;
    orderForm[inputIdentifier].value = event.target.value;
    orderForm[inputIdentifier].touched = true;
    orderForm[inputIdentifier].isValid = this.checkValidation(
      orderForm[inputIdentifier].value,
      orderForm[inputIdentifier].validation
    );
    isFromValid = true;
    for (let item in orderForm) {
      if (orderForm[item].validation) {
        isFromValid = orderForm[item].isValid && isFromValid ? true : false;
      }
    }
    this.setState({ orderForm, isFromValid });
  };

  render() {
    let { orderForm, isFromValid } = this.state;
    let { loading } = this.props;
    const formEle = [];
    for (let key in orderForm) {
      formEle.push({
        id: key,
        config: orderForm[key],
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formEle.map((formComp) => {
          return (
            <Input
              key={formComp.id}
              elementType={formComp.config.elementType}
              elementConfig={formComp.config.elementConfig}
              value={formComp.config.value}
              onchange={(event) => this.inputChangeHandler(event, formComp.id)}
              invalid={!formComp.config.isValid}
              shouldValidate={formComp.config.validation}
              isTouched={formComp.config.touched}
            />
          );
        })}
        <Button
          btnType="Success"
          onClick={this.orderHandler}
          disabled={!isFromValid}
        >
          Order
        </Button>
      </form>
    );
    if (loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your details.</h4>
        {form}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    purchaseBurger: (orderData) => dispatch(purchaseBurger(orderData)),
  };
};

const mapStateToProps = ({ orderReducer, burgerBuilderReducer }) => {
  return {
    ingredients: burgerBuilderReducer.ingredients,
    price: burgerBuilderReducer.totalPrice,
    loading: orderReducer.loading,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
