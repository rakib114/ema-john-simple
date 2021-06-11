import React from "react";

const ReviewIteam = (props) => {
  // console.log(props);
  const { name, quantity, key, price } = props.product;
  const reviewIteamStyle = {
    borderBottom: "1px solid lightgray",
    marginBottom: "5px",
    paddingBottom: "5px",
    marginLeft: "200px",
  };
  return (
    <div style={reviewIteamStyle}>
      <h3 className="product-name">{name}</h3>
      <p>Quantity {quantity}</p>
      <p><small>${price}</small></p>
      <br />
      <button onClick={() => props.removeProduct(key)} className="order-btn">
        Remove
      </button>
    </div>
  );
};

export default ReviewIteam;
