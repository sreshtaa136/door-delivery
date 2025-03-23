import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import "./Verify.css";

const Verify = () => {
  const { url, fetchOrders } = useContext(StoreContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const fromStripe = searchParams.get("fromStripe"); // Detect Stripe tab

  const navigate = useNavigate();

  const verifyPayment = async () => {
    const response = await axios.post(url + "/api/order/verify", {
      success,
      orderId,
    });
    // if (response.data.success) {
    //   navigate("/my-orders");
    // } else {
    //   navigate("/");
    // }
    fetchOrders();

    if (fromStripe) {
      window.close(); // Close the Stripe tab
    }

    if (response.data.success) {
      navigate("/my-orders"); // Redirect in the main app
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
