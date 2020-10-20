import React, { Component } from "react";
import classes from "./Orders.module.css";
// import Spinner from "../Spinner/Spinner";
import axios from "../../axiosOrder";
import withErrorHandler from "../../HOC/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import { orderList } from "./../../store/Actions";
import Spinner from "../Spinner/Spinner";

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
    };
  }

  componentDidMount() {
    this.props.orderList();
  }

  render() {
    let { orders, loading } = this.props;
    let loadingData = loading ? <Spinner /> : null;

    return (
      <div>
        {loadingData}
        {orders.map((order) => {
          let ingredients = Object.keys(order.ingredients).map(
            (ingredient, index) => (
              <span
                key={ingredient + index}
                style={{
                  textTransform: "capitalize",
                  display: "inline-block",
                  margin: "0 8px",
                  padding: "5px",
                  border: "1px solid #ccc",
                }}
              >
                {ingredient}({order.ingredients[ingredient]})
              </span>
            )
          );
          return (
            <div className={classes.Order} key={order.id}>
              <p>Ingredients: {ingredients}</p>
              <p>
                Price: <strong>USD {order.price}</strong>
              </p>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    orderList: () => dispatch(orderList()),
  };
};

const mapStateToProps = ({ orderReducer }) => {
  return {
    orders: orderReducer.orders,
    loading: orderReducer.loading,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
