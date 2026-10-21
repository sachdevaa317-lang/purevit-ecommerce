import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Product from "./pages/Product";
import Checkout from "./pages/Checkout";
import MyAccount from "./login/MyAccount";
import SendOtp from "./login/SendOtp";
import VerifyOtp from "./login/Verifyotp";
import Signup from "./login/signup";
import Login from "./login/Login";
import Forgot from "./login/ForgotPassword";
import AdminProduct from "./Admin/Adminproduct";
import Admin from "./Admin/Admin";
import Setpassword from "./login/Newpassword"
import Section from "./Admin/Section"
import AssignProducts from "./Admin/AssignProducts"
import Category from "./pages/ShowCategories"
import CouponMaster from "./Admin/CouponMaster"
import AdminPanelLogin from "./Admin/AdminPanelLogin"
import OrderConfirm from "./pages/OrderConfirm"
import { ToastContainer } from "react-toastify";
import Order from "./Admin/Orders";
import "react-toastify/dist/ReactToastify.css";
export default function App() {
  return (
    <BrowserRouter>

       <ToastContainer
                position="top-right"
                autoClose={3000}
            />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/myaccount" element={<MyAccount />} />
        <Route path="/sendotp" element={<SendOtp />} />
        <Route path="/verifyotp" element={<VerifyOtp />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<Forgot />} />
           <Route path="/newpassword" element={<Setpassword />} />
           <Route path="/adminproduct" element={<AdminProduct />} />
                      <Route path="/admin" element={<Admin />} />
                      <Route path="/section" element={<Section />} />
                      <Route path="/assign" element={<AssignProducts />} />
                      <Route path="/Category" element={<Category />} />
                      <Route path="/coupon" element={<CouponMaster />} />
                       <Route path="/orderconfirm" element={<OrderConfirm />} />
                      <Route path="/order" element={<Order />} />

                      <Route path="/adminpanellogin" element={<AdminPanelLogin />} />

      </Routes>
    </BrowserRouter>
  );
}

