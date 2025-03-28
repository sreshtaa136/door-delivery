import React, { useState, useContext, useEffect } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets.js";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const { getTotalCartAmount, user, setUser, url, setShowLogin, emptyValues } =
    useContext(StoreContext);
  const [menu, setMenu] = useState("home");
  const navigate = useNavigate();
  const logout = async () => {
    setUser("");
    try {
      const response = await axios.post(`${url}/api/user/logout`, {});
      emptyValues();
      // window.location.reload();
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img className="logo" src={assets.logo} alt="doordel-logo" />
      </Link>
      {isHome && (
        <ul className="navbar-menu">
          <Link
            to="/"
            onClick={() => setMenu("home")}
            className={`${menu === "home" ? "active" : ""}`}
          >
            home
          </Link>
          <a
            href="#explore-menu"
            onClick={() => setMenu("menu")}
            className={`${menu === "menu" ? "active" : ""}`}
          >
            menu
          </a>
          <a
            href="#app-download"
            onClick={() => setMenu("mob-app")}
            className={`${menu === "mob-app" ? "active" : ""}`}
          >
            mobile app
          </a>
          <a
            href="#footer"
            onClick={() => setMenu("contact")}
            className={`${menu === "contact" ? "active" : ""}`}
          >
            contact us
          </a>
        </ul>
      )}
      <div className="navbar-right">
        {/* <img src={assets.search_icon} alt="search-icon" /> */}
        <Link to="/cart" className="navbar-search-icon">
          <img src={assets.basket_icon} alt="" />
          <div className={getTotalCartAmount() > 0 ? "dot" : ""}></div>
        </Link>
        {!user ? (
          <button onClick={() => setShowLogin(true)}>Sign In</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="profile-icon" />
            <ul className="navbar-profile-dropdown">
              <li onClick={() => navigate("/my-orders")}>
                {" "}
                <img src={assets.bag_icon} alt="bag-icon" /> <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                {" "}
                <img src={assets.logout_icon} alt="logout-icon" /> <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
