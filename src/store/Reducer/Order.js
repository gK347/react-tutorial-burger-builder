import { ACTION_TYPE } from "../Actions/ActionTypes";

const initialState = {
  loading: false,
  error: null,
  orders: [],
  purchased: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.PURCHASE_INIT:
      return {
        ...state,
        purchased: false,
      };

    case ACTION_TYPE.PURCHASE_BURGET_SUCCESS:
      return {
        ...state,
        loading: false,
        purchased: true,
        orders: state.orders.concat({
          id: action.orderId.name,
          ...action.orderData,
        }),
      };

    case ACTION_TYPE.PURCHASE_BURGET_FAILURE:
      return { ...state, loading: false };

    case ACTION_TYPE.PURCHASE_BURDER:
      return { ...state, loading: true };

    case ACTION_TYPE.FETCH_ORDER_INIT:
      return {
        ...state,
        loading: true,
      };

    case ACTION_TYPE.ORDER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.orders,
      };

    case ACTION_TYPE.ORDER_LIST_FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
};
export default reducer;
