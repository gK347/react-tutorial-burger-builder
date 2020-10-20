import { ACTION_TYPE } from "../Actions/ActionTypes";

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
};

const INGREDIENTS_PRICE = {
  Meat: 1.3,
  Cheese: 0.4,
  Salad: 0.5,
  Bacon: 0.7,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingredientName],
      };
    case ACTION_TYPE.REMOVE_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
        },
        totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.ingredientName],
      };
    case ACTION_TYPE.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          Meat: action.ingredients.Meat,
          Cheese: action.ingredients.Cheese,
          Salad: action.ingredients.Salad,
          Bacon: action.ingredients.Bacon,
        },
        totalPrice: 4,
        error: false,
      };
    case ACTION_TYPE.FETCH_INGREDIENTS_FAIL:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
};
export default reducer;
