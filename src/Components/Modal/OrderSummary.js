import React from "react";
import Button from "./../Button/Button";

const orderSummary = (props) => {
  const ingredientsList = Object.keys(props.ingredients).map((ingKey) => {
    return (
      <li key={ingKey}>
        {ingKey}: {props.ingredients[ingKey]}
      </li>
    );
  });
  return (
    <div>
      <h3>Your Order</h3>
      <p><strong>Total Price: {props.totalPrice.toFixed(2)}</strong></p>
      <p>Delicious burger with following ingredients:</p>
      <ul>{ingredientsList}</ul>
      <p>Continue to checkout?</p>
      <Button btnType={"Danger"} onClick ={()=>props.onClickCancle()}>CANCLE</Button>
      <Button btnType={"Success"} onClick ={()=>props.onClickContinue()}>CONTINUE</Button>
    </div>
  );
};

export default orderSummary;
