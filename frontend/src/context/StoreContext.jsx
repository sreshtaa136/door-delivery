import { createContext, useEffect, useState } from "react";
import { menu_list } from "../assets/assets";
import axios from "axios";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  axios.defaults.withCredentials = true; // Ensures cookies are sent with requests
  const url = import.meta.env.VITE_API_URL;
  const [food_list, setFoodList] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [user, setUser] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [orders, setOrders] = useState("");
  const currency = "$";
  const deliveryCharge = 3;

  const addToCart = async (itemId) => {
    setCartItems((prev) => {
      const updatedQuantity = (prev[itemId] || 0) + 1;
      return { ...prev, [itemId]: updatedQuantity };
    });

    try {
      await axios.post(`${url}/api/cart/add`, { itemId });
    } catch (error) {
      console.error("Failed to add item to cart:", error);
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      if (!prev[itemId]) return prev; // Ensure item exists
      const updatedQuantity = prev[itemId] - 1;
      if (updatedQuantity === 0) {
        // Remove the item completely
        const newState = { ...prev };
        delete newState[itemId];
        return newState;
      }
      return { ...prev, [itemId]: updatedQuantity };
    });

    try {
      await axios.post(`${url}/api/cart/remove`, { itemId });
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
      // Rollback UI if API call fails
      setCartItems((prev) => ({
        ...prev,
        [itemId]: (prev[itemId] || 0) + 1, // Restore previous quantity
      }));
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      try {
        if (cartItems[itemId] > 0) {
          let itemInfo = food_list.find((product) => product._id === itemId);
          if (itemInfo) {
            totalAmount += itemInfo.price * cartItems[itemId];
          }
        }
      } catch (error) {
        console.error("Error calculating total:", error);
      }
    }
    return parseFloat(totalAmount.toFixed(2)); // Ensures it's a number
  };

  const fetchFoodList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    // console.log("context foods: ", response.data.data);
    setFoodList(response.data.data);
  };

  const loadCartData = async () => {
    const response = await axios.get(`${url}/api/cart/`);
    // console.log("context cart: ", response.data.cartData);
    setCartItems(response.data.cartData || {});
  };

  const getUser = async () => {
    try {
      const response = await axios.get(`${url}/api/user/profile`);
      // console.log("context user: ", response.data.user);
      setUser(response.data.user);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/user/${user._id}`);
      setOrders(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const emptyValues = () => {
    setCartItems("");
    setOrders("");
    setUser("");
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      await loadCartData();
      await getUser();
      // await getTotalCartAmount();
    }
    loadData();
  }, []);

  useEffect(() => {
    if (user && !orders) {
      fetchOrders();
    }
  }, [user]);

  const contextValue = {
    url,
    food_list,
    menu_list,
    cartItems,
    user,
    setUser,
    getUser,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    loadCartData,
    setCartItems,
    currency,
    deliveryCharge,
    showLogin,
    setShowLogin,
    orders,
    emptyValues,
    fetchOrders,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
