import React, { useContext } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";

const MyOrders = () => {
  const { currency, orders } = useContext(StoreContext);
  
  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {orders?.length > 0 ? (
          orders?.map((order, index) => {
            return (
              <div key={index} className="my-orders-order">
                <img src={assets.parcel_icon} alt="" />
                <p>
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return item.name + " x " + item.quantity;
                    } else {
                      return item.name + " x " + item.quantity + ", ";
                    }
                  })}
                </p>
                <p>
                  {currency}
                  {order.amount}.00
                </p>
                <p>Items: {order.items.length}</p>
                <p>
                  <span>&#x25cf;</span> <b>{order.status}</b>
                </p>
                <button>Track Order</button>
              </div>
            );
          })
        ) : (
          <div className="no-orders">
            <p>No orders yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
