import React, { Component } from "react";
import { connect } from "react-redux";
import withErrorHandler from "../../HOC/withErrorHandler/withErrorHandler";
import {
  addIngredients,
  removeIngredients,
  initIngredients,
  purchaseInit,
} from "../../store/Actions";
import BuildControler from "../BuildControler/BuildControler";
import Burger from "../Burger/Burger";
import Modal from "../Modal/Modal";
import OrderSummary from "../Modal/OrderSummary";
import Spinner from "../Spinner/Spinner";
import axios from "../../axiosOrder";

class BurgerBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      purchasing: false,
    };
  }

  componentDidMount() {
    this.props.onInitIngredient();
  }

  updatePurchaseAble = () => {
    let { ings } = this.props;
    let sum = 0;
    Object.keys(ings).map((key) => (sum += ings[key]));
    return sum === 0 ? false : true;
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseContinueHandler = () => {
    this.props.purchaseInit();
    this.props.history.push("/checkout");
  };

  render() {
    let { purchasing } = this.state;
    let { ings, totalPrice, error } = this.props;
    let orderSummery = null;

    let burger = error ? (
      <p>Sorry! Something went wront please try again later...</p>
    ) : (
      <Spinner />
    );
    if (ings) {
      burger = (
        <>
          <Burger ingredients={ings} />
          <BuildControler
            addIngredient={(type) => this.props.onAddIngredient(type)}
            removeIngredient={(type) => this.props.onRemoveIngredient(type)}
            ingredients={ings}
            price={totalPrice}
            purchaseAble={this.updatePurchaseAble()}
            purchaseHandler={() => this.purchaseHandler()}
          />
        </>
      );
      orderSummery = (
        <OrderSummary
          ingredients={ings}
          onClickCancle={() => this.setState({ purchasing: false })}
          onClickContinue={() => this.purchaseContinueHandler()}
          totalPrice={totalPrice}
        />
      );
    }
    return (
      <>
        <Modal
          show={purchasing}
          closeBackDrop={() => this.setState({ purchasing: false })}
        >
          {orderSummery}
        </Modal>
        {burger}
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddIngredient: (ingredientName) =>
      dispatch(addIngredients(ingredientName)),
    onRemoveIngredient: (ingredientName) =>
      dispatch(removeIngredients(ingredientName)),
    onInitIngredient: (ingredientName) =>
      dispatch(initIngredients(ingredientName)),
    purchaseInit: () => dispatch(purchaseInit()),
  };
};

const mapStateToProps = ({ burgerBuilderReducer }) => {
  return {
    ings: burgerBuilderReducer.ingredients,
    totalPrice: burgerBuilderReducer.totalPrice,
    error: burgerBuilderReducer.error,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
