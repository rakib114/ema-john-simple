import React, { useEffect, useState } from "react";
// import fakeData from "../../fakeData";
import {
  addToDatabaseCart,
  getDatabaseCart,
} from "../../utilities/databaseManager";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";
import { Link } from "react-router-dom";
const Shop = () => {
  // const firstTen = fakeData.slice(0, 10);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('https://enigmatic-garden-61574.herokuapp.com/products?search' + search)
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [search]);

  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKey = Object.keys(savedCart);
    fetch('https://enigmatic-garden-61574.herokuapp.com/productsByKeys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productKey)
    })
      .then(res => res.json())
      .then(data => setCart(data));
  }, []);

  const handleSearch = event => {
    setSearch(event.target.value);
  }

  const handleAddProduct = (product) => {
    // console.log("Add Cart Button is Clicked", product);
    const toBeAddedKey = product.key;

    const sameProduct = cart.find((pd) => pd.key === toBeAddedKey);
    let count = 1;
    let newCart;
    if (sameProduct) {
      count = sameProduct.quantity + 1;
      sameProduct.quantity = count;
      const others = cart.filter((pd) => pd.key !== toBeAddedKey);
      newCart = [...others, sameProduct];
    } else {
      product.quantity = 1;
      newCart = [...cart, product];
    }
    setCart(newCart);
    addToDatabaseCart(product.key, count);
  };
  return (
    <div className="twin-container">
      <div className="product-container">
        <input type="text" className="productSearch" onBlur={handleSearch} placeholder="Search..." />
        {
          products.length === 0 && <p>Loading...</p>
        }
        {products.map((prdct) => (
          <Product
            key={prdct.key}
            showAddToCart={true}
            product={prdct}
            handleAddProduct={handleAddProduct}
          >
            {" "}
          </Product>
        ))}
      </div>
      <div className="cart-container">
        <Cart cart={cart}>
          <Link to="/review">
            <button className="order-btn">Review Order</button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Shop;
