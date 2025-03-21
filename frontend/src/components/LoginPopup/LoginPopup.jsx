import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";

const LoginPopup = () => {
  const { url, loadCartData, getUser, setShowLogin } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Login");

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (e) => {
    e.preventDefault();
    let new_url = url;
    if (currState === "Login") {
      new_url += "/api/user/login";
    } else {
      new_url += "/api/user/register";
    }
    const response = await axios.post(new_url, data);
    if (response.data.success) {
      loadCartData();
      getUser();
      setShowLogin(false);
      toast.success("Successfully logged in", { autoClose: 500 });
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>{" "}
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-inputs">
          {currState === "Sign Up" ? (
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Your name"
              required
            />
          ) : (
            <></>
          )}
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Your email"
          />
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <button>{currState === "Login" ? "Login" : "Create account"}</button>

        {currState === "Login" ? (
          <p>
            New here?{" "}
            <span onClick={() => setCurrState("Sign Up")}> Sign Up</span>
          </p>
        ) : (
          <>
            <div className="login-popup-condition">
              <input type="checkbox" name="" id="" required />
              <p>
                By continuing, I agree to the terms of use & privacy policy.
              </p>
            </div>
            <p>
              Already have an account?{" "}
              <span onClick={() => setCurrState("Login")}> Login</span>
            </p>
          </>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
