import React from "react";
import '../../../assets/styles/templatesStyles/Ecommerce/Navbar.scss';
// import '../../../assets/styles/templatesStyles/Ecommerce/Search.scss';
import shoppingCart from "../../../assets/svg/templates-svg/🦆 icon _shopping cart outline_.svg";
import { useAppSelector } from "../../../store";
import { Link } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";
import { useLocation } from "react-router-dom";

const NoSearchNavbar: React.FC = () => {

  const customerRole = window.localStorage.getItem('customer');

  const project = useAppSelector((state) => state.project);
  const location = useLocation();
  const itemIndicator = location.pathname === '/payment' || location.pathname === '/receipt' || location.pathname === '/non-direct-payment' || location.pathname === '/order-complete';
  const cartProducts = useAppSelector((state) => state.cart.products);

  const cartItemCount = cartProducts.length;

  const loggedIn = window.localStorage.getItem('token');


  return (
    <>
      <div className="navbar">
        <div className="login-signup-buttons">
          <Link to={ loggedIn && customerRole ? "/custdashboard/" : loggedIn && !customerRole ? "/dashboard/" : "."}><button className="signup"><MdKeyboardBackspace />Dashboard</button></Link>
        </div>
        <Link to={"."}><h3 className="logo">{project.name}</h3></Link>
        <div className="search-component"></div>
        <Link to="/cart" className="cart-link">
          <img src={shoppingCart} alt="shopping cart" />
          {!itemIndicator && cartItemCount > 0 && <span className="cart-indicator">{cartItemCount}</span>}
        </Link>
      </div>
    </>
  );
};

export default NoSearchNavbar;
