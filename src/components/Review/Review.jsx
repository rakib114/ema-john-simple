import React, { useEffect, useState } from "react";
import fakeData from "../../fakeData";
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from "../../utilities/databaseManager";
import Cart from "../Cart/Cart";
import ReviewIteam from "../ReviewIteam/ReviewIteam";
import happyImg from "../../images/giphy.gif"
const Review = () => {
  const [cart, setCart] = useState([]);
  const [orderPlace, setOrderPlace] = useState(false)
  const handlePlaceOrder = ()=>{
    setCart([]);
    setOrderPlace(true);
    processOrder();
  }
  const removeProduct = (productKey) => {
    // console.log("remove Button is Clicked", productKey);
    const newCart = cart.filter((prdct) => prdct.key !== productKey);
    setCart(newCart);
    removeFromDatabaseCart(productKey);
  };
  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);
    const cartProducts = productKeys.map((key) => {
      const product = fakeData.find((prdct) => prdct.key === key);
      product.quantity = savedCart[key];
      return product;
    });
    setCart(cartProducts);
  }, []);

  let thankYou;
  if(orderPlace){
    thankYou = <img src={happyImg} alt="" />
  }
  return (
    <div className="twin-container">
      <div className="product-container">
      {cart.map((pd) => (
        <ReviewIteam
          key={pd.key}
          removeProduct={removeProduct}
          product={pd}
        ></ReviewIteam>
      ))}
      {thankYou}
      </div>
      <div className="cart-container">
        <Cart cart={cart}>
          <button onClick={handlePlaceOrder} className="order-btn">Place Order</button>
        </Cart>
      </div>
    </div>
  );
};

export default Review;
