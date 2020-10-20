import React, { Component } from "react";
import classes from "./Auth.module.css";
import Button from "../Button/Button";
import axios from "../../axiosOrder";
import Spinner from "../Spinner/Spinner";
import Input from "../../UI/Input/Input";
import { connect } from "react-redux";
import withErrorHandler from "../../HOC/withErrorHandler/withErrorHandler";
import { purchaseBurger } from "../../store/Actions";
class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authForm: {
        email: {
          elementType: "input",
          elementConfig: {
            type: "email",
            placeholder: "Your email",
          },
          value: "",
          isValid: false,
          touched: false,
          validation: {
            isRequired: true,
            isEmail: true,
          },
        },
        password: {
          elementType: "input",
          elementConfig: {
            type: "password",
            placeholder: "Your password",
          },
          value: "",
          isValid: false,
          touched: false,
          validation: {
            isRequired: true,
            minLength: 6,
          },
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
      if (rules.minLength && isValid) {
        isValid = value.length >= rules.minLength ? true : false;
      }
      if (rules.isEmail && isValid) {
        const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        isValid = re.test(String(value).toLowerCase()) && isValid;
      }
    }
    return isValid;
  };

  orderHandler = (event) => {
    let { ingredients, price } = this.props;
    let { authForm } = this.state;
    event.preventDefault();
    const customerData = {};
    for (let i in authForm) {
      console.log(i);
      customerData[i] = authForm[i].value;
    }
    let orderBody = {
      ingredients,
      price: price.toFixed(2),
      customerData,
    };
    this.props.purchaseBurger(orderBody);
  };

  inputChangeHandler = (event, inputIdentifier) => {
    let { authForm, isFromValid } = this.state;
    authForm = {
      ...authForm,
      [inputIdentifier]: {
        ...authForm[inputIdentifier],
        value: event.target.value,
        touched: true,
        isValid: this.checkValidation(
          authForm[inputIdentifier].value,
          authForm[inputIdentifier].validation
        ),
      },
    };

    isFromValid = true;
    for (let item in authForm) {
      if (authForm[item].validation) {
        isFromValid = authForm[item].isValid && isFromValid ? true : false;
      }
    }
    this.setState({ authForm, isFromValid });
  };

  render() {
    let { authForm, isFromValid } = this.state;
    let { loading } = this.props;
    const formEle = [];
    for (let key in authForm) {
      formEle.push({
        id: key,
        config: authForm[key],
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
          Submit
        </Button>
      </form>
    );
    if (loading) {
      form = <Spinner />;
    }
    return <div className={classes.AuthData}>{form}</div>;
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
)(withErrorHandler(Auth, axios));
