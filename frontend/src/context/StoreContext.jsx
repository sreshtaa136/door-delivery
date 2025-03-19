import { createContext, useEffect, useState } from "react";
import { menu_list } from "../assets/assets";
import axios from "axios";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  axios.defaults.withCredentials = true; // Ensures cookies are sent with requests
  const url = import.meta.env.VITE_API_URL;
  const [food_list, setFoodList] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [user, setUser] = useState({});
  const currency = "$";
  const deliveryCharge = 3;

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    await axios.post(`${url}/api/cart/add`, { itemId });
  };

  const removeFromCart = async (itemId) => {
    if (cartItems[itemId] > 0) {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    }
    await axios.post(`${url}/api/cart/remove`, { itemId });
  };

  const getTotalCartAmount = async () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      try {
        if (cartItems[item] > 0) {
          let itemInfo = food_list.find((product) => product._id === item);
          totalAmount += itemInfo.price * cartItems[item];
        }
      } catch (error) {}
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    console.log("context foods: ", response.data.data);
    setFoodList(response.data.data);
  };

  const loadCartData = async () => {
    const response = await axios.get(`${url}/api/cart/`);
    console.log("context cart: ", response.data.data);
    setCartItems(response.data.cartData);
  };

  const getUser = async () => {
    try {
      const response = await axios.get(`${url}/api/user/profile`);
      console.log("context user: ", response.data.user);
      setUser(response.data.user);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      await loadCartData();
      await getUser();
    }
    loadData();
  }, []);

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
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
