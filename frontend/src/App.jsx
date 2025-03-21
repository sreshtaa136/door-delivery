import { useContext, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import Footer from "./components/Footer/Footer";
import { StoreContext } from "./context/StoreContext";
import Cart from "./pages/Cart/Cart";
import MyOrders from "./pages/MyOrders/MyOrders";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";

function App() {
  const { showLogin } = useContext(StoreContext);

  return (
    <>
      <ToastContainer />
      {showLogin && <LoginPopup />}
      <div className={!showLogin ? "app" : "app popup"}>
        <div className="app-content">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/order" element={<PlaceOrder />} />
          </Routes>
        </div>
        {!showLogin && <Footer />}
      </div>
    </>
  );
}

export default App;
