import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    cartItems,
    food_list,
    removeFromCart,
    getTotalCartAmount,
    url,
    currency,
    deliveryCharge,
    user,
  } = useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p> <p>Title</p> <p>Price</p> <p>Quantity</p> <p>Total</p>{" "}
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {Object.keys(cartItems).length > 0 ? (
          food_list.map((item, index) => {
            if (cartItems[item._id] > 0) {
              return (
                <div key={index}>
                  <div className="cart-items-title cart-items-item">
                    <img src={item.image} alt={item.name} />
                    <p>{item.name}</p>
                    <p>
                      {currency}
                      {item.price}
                    </p>
                    <div>{cartItems[item._id]}</div>
                    <p>
                      {currency}
                      {item.price * cartItems[item._id]}
                    </p>
                    <p
                      className="cart-items-remove-icon"
                      onClick={() => removeFromCart(item._id)}
                    >
                      x
                    </p>
                  </div>
                  <hr />
                </div>
              );
            }
          })
        ) : (
          <p className="empty-cart">
            {user
              ? "No items in the cart"
              : "Sign in to add items to your cart"}
          </p>
        )}
      </div>
      <div className="cart-bottom">
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
          <button
            onClick={() =>
              Object.keys(cartItems).length > 0 && navigate("/order")
            }
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="promo code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
