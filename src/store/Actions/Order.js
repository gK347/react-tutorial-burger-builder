import { ACTION_TYPE } from "./ActionTypes";
import axios from "../../axiosOrder";

export const purchaseInit = () => {
  return {
    type: ACTION_TYPE.PURCHASE_INIT,
  };
};

export const startPurchasing = () => {
  return {
    type: ACTION_TYPE.PURCHASE_BURDER,
  };
};

const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: ACTION_TYPE.PURCHASE_BURGET_SUCCESS,
    orderId: id,
    orderData,
    // ingredients,
  };
};

const purchaseBurgerFail = (error) => {
  return {
    type: ACTION_TYPE.PURCHASE_BURGET_FAILURE,
    error,
  };
};

export const purchaseBurger = (orderData) => {
  return (dispatch) => {
    dispatch(startPurchasing());
    axios
      .post("/orders.json", orderData)
      .then((res) => {
        dispatch(purchaseBurgerSuccess(res.data, orderData));
      })
      .catch((err) => {
        dispatch(purchaseBurgerFail(err));
      });
  };
};

export const fetchOrderInit = () => {
  return {
    type: ACTION_TYPE.FETCH_ORDER_INIT,
  };
};

const orderListSuccess = (orders) => {
  console.log(orders);
  return {
    type: ACTION_TYPE.ORDER_LIST_SUCCESS,
    orders,
  };
};

const orderListFail = (error) => {
  return {
    type: ACTION_TYPE.ORDER_LIST_FAILURE,
    error,
  };
};

export const orderList = () => {
  return (dispatch) => {
    dispatch(fetchOrderInit());
    axios
      .get("/orders.json")
      .then((res) => {
        let fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key,
          });
        }
        dispatch(orderListSuccess(fetchedOrders));
      })
      .catch((err) => {
        dispatch(orderListFail(err));
      });
  };
};
