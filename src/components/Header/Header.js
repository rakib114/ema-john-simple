import React, { useContext } from "react";
import logo from "../../images/logo.png";
import "./Header.css";
import { Link } from "react-router-dom";
import { userContext } from "../../App";

const Header = () => {
  const [logedInUser, setLogedInUser] = useContext(userContext);
  return (
    <div className="header">
      <img src={logo} alt="#" />
      <nav>
        <Link to="/shop">Shop</Link>
        <Link to="/review">Order Rivew</Link>
        <Link to="/inventory">Manage Inventory</Link>
        <button onClick={() => setLogedInUser({})}>Sign Out</button>
      </nav>
    </div>
  );
};

export default Header;
