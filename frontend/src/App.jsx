import { useContext, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import Footer from "./components/Footer/Footer";
import { StoreContext } from "./context/StoreContext";

function App() {
  const { showLogin } = useContext(StoreContext);

  return (
    <>
      <ToastContainer />
      {showLogin && <LoginPopup />}
      <div className={!showLogin ? "app" : "app popup"}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
      {!showLogin && <Footer />}
    </>
  );
}

export default App;
