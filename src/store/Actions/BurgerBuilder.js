import { ACTION_TYPE } from "./ActionTypes";
import axios from "../../axiosOrder";

export const addIngredients = (ingredientName) => {
  return {
    type: ACTION_TYPE.ADD_INGREDIENTS,
    ingredientName,
  };
};

export const removeIngredients = (ingredientName) => {
  return {
    type: ACTION_TYPE.REMOVE_INGREDIENTS,
    ingredientName,
  };
};

const setIngredients = (ingredients) => {
  return {
    type: ACTION_TYPE.SET_INGREDIENTS,
    ingredients,
  };
};

const fetchIngredientsFail = () => {
  return {
    type: ACTION_TYPE.FETCH_INGREDIENTS_FAIL,
  };
};

export const initIngredients = () => {
  return (dispatch) => {
    axios
      .get("/ingradients.json")
      .then((res) => {
        dispatch(setIngredients(res.data));
      })
      .catch((err) => {
        dispatch(fetchIngredientsFail());
      });
  };
};
