import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const PlaceOrder = () => {
  axios.defaults.withCredentials = true; // Ensures cookies are sent with requests
  const navigate = useNavigate();
  const [payment, setPayment] = useState("cod");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    address: "",
    state: "",
    postcode: "",
    phone: "",
  });

  const {
    getTotalCartAmount,
    food_list,
    cartItems,
    url,
    setCartItems,
    currency,
    deliveryCharge,
  } = useContext(StoreContext);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    const totalAmount = (getTotalCartAmount() + deliveryCharge).toFixed(2);
    let orderData = {
      address: data,
      items: orderItems,
      amount: parseFloat(totalAmount),
    };

    if (payment === "stripe") {
      let newOrder = await axios.post(url + "/api/order/create", orderData);
      if (newOrder.data.success && newOrder.data.orderId) {
        let response = await axios.post(url + "/api/order/place", {
          ...orderData,
          orderId: newOrder.data.orderId,
        });
        if (response.data.success) {
          const { session_url } = response.data;
          // window.location.replace(session_url);
          // start checking
          window.open(session_url, "_blank");
          // Start checking order status
          checkOrderStatus(newOrder.data.orderId);
        } else {
          setLoading(false);
          toast.error("Something Went Wrong");
        }
      }
    } else {
      let response = await axios.post(url + "/api/order/placecod", orderData);
      if (response.data.success) {
        navigate("/my-orders");
        toast.success(response.data.message);
        setCartItems({});
      } else {
        toast.error("Something Went Wrong");
      }
      setLoading(false);
    }
  };

  // function to poll order status
  const checkOrderStatus = (orderId) => {
    const interval = setInterval(async () => {
      try {
        const response = await axios.get(`${url}/api/order/${orderId}`);
        const status = response.data.data.status;
        if (
          status &&
          (status === "Food Preparing" || status === "Payment failed")
        ) {
          clearInterval(interval); // Stop polling
          setCartItems({});
          navigate("/my-orders"); // Redirect user
          setLoading(false);
        }
      } catch (error) {
        console.error("Error checking order status:", error);
        clearInterval(interval); // Stop polling
      }
    }, 3000); // Check every 3 seconds
    setCartItems({});
  };

  return (
    <>
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p>Processing Payment...</p>
        </div>
      )}
      <form onSubmit={placeOrder} className="place-order">
        <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <input
            type="text"
            name="name"
            onChange={onChangeHandler}
            value={data.name}
            placeholder="Name"
            required
          />
          <input
            type="text"
            name="address"
            onChange={onChangeHandler}
            value={data.address}
            placeholder="Address"
            required
          />
          <input
            type="text"
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            placeholder="State"
            required
          />
          <input
            type="text"
            name="postcode"
            onChange={onChangeHandler}
            value={data.postcode}
            placeholder="Post code"
            required
          />
          <input
            type="text"
            name="phone"
            onChange={onChangeHandler}
            value={data.phone}
            placeholder="Phone"
            required
          />
        </div>
        <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart Total</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>
                  {currency}
                  {getTotalCartAmount()}
                </p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>
                  {currency}
                  {getTotalCartAmount() === 0 ? 0 : deliveryCharge}
                </p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>
                  {currency}
                  {getTotalCartAmount() === 0
                    ? 0
                    : (getTotalCartAmount() + deliveryCharge).toFixed(2)}
                </b>
              </div>
            </div>
          </div>
          <div className="payment">
            <h2>Payment Method</h2>
            <div onClick={() => setPayment("cod")} className="payment-option">
              <img
                src={payment === "cod" ? assets.checked : assets.un_checked}
                alt=""
              />
              <p>COD ( Cash on delivery )</p>
            </div>
            <div
              onClick={() => setPayment("stripe")}
              className="payment-option"
            >
              <img
                src={payment === "stripe" ? assets.checked : assets.un_checked}
                alt=""
              />
              <p>Stripe ( Credit/Debit )</p>
            </div>
          </div>
          {payment === "stripe" && (
            <div className="dummy-details">
              <p>
                Provide the following dummy card details to test interactively:
              </p>
              <p>
                <b>Card number:</b> 4242 4242 4242 4242
              </p>
              <p>
                <b>Expiry:</b> Use a valid future date, such as 12/34.
              </p>
              <p>
                <b>CVV:</b> Use any three digit number
              </p>
            </div>
          )}
          <button className="place-order-submit" type="submit">
            {payment === "cod" ? "Place Order" : "Proceed To Payment"}
          </button>
        </div>
      </form>
    </>
  );
};

export default PlaceOrder;
