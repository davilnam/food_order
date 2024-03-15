import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Layout from "./pages/Admin/Layout/Layout";
import CategoryManagement from "./pages/Admin/category/CategoryManagement";
import ProductManagement from "./pages/Admin/product/ProductManagement";
import DashBoard from "./pages/Admin/dashboard/DashBoard";
import OrderManagement from "./pages/Admin/order/OrderManagement";
import AccountManagement from "./pages/Admin/account/AccountManagement";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PageAbout from "./pages/PageAbout";
import PagePost from "./pages/PagePost";
import PageContact from "./pages/PageContact";
import PageMenu from "./pages/PageMenu";
import FoodDetail from "./components/detail_food/FoodDetail";
import Cart from "./components/cart/Cart";
import ThankYouPage from "./pages/ThankYouPage";
import Payment from "./components/payment/Payment";
import NotFound from "./components/NotFound";
import LayoutUser from "./pages/LayoutUser";

const App = () => {
  // Lấy giá trị isLoggedIn và isAdmin từ reducer
  let { isLoggedIn, isAdmin } = useSelector(state => state.app);
  // isAdmin = true;
  // isLoggedIn = true;

  return (
    <Routes>
      <Route path="/" element={<LayoutUser />}>
        <Route path="/" element={<Home />}></Route>
        <Route path="about" element={<PageAbout />}></Route>
        <Route path="blog" element={<PagePost />}></Route>
        <Route path="contact" element={<PageContact />}></Route>
        <Route path="menu" element={<PageMenu />}></Route>
        <Route path="cart" element={<Cart />}></Route>
        <Route path="payment" element={<Payment />}></Route>
        {/* Sử dụng Route param để truyền id vào FoodDetail */}
        <Route path="foodDetail/:id" element={<FoodDetail />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="thankYou" element={<ThankYouPage />}></Route>
        <Route path="register" element={<Register />}></Route>
        {/* Thêm một Route cuối cùng với path="*" để xử lý các trang không hợp lệ */}
        <Route path="*" element={<Navigate to="/not-found" />} />
      </Route>
      {isLoggedIn && isAdmin && (
        <Route path="/admin" element={<Layout />}>
          <Route path="dashboard" element={<DashBoard />}></Route>
          <Route path="managerOrder" element={<OrderManagement />}></Route>
          <Route path="managerAccount" element={<AccountManagement />}></Route>
          <Route path="category" element={<CategoryManagement />}></Route>
          <Route path="managerFood" element={<ProductManagement />}></Route>
          {/* Thêm một Route cuối cùng với path="*" để xử lý các trang không hợp lệ */}
          <Route path="*" element={<Navigate to="/not-found" />} />
        </Route>
      )}
      {/* Trang not found */}
      <Route path="not-found" element={<NotFound />} />
      {/* Chuyển hướng các đường dẫn không hợp lệ đến trang not found */}
      <Route path="*" element={<Navigate to="/not-found" />} />
    </Routes>
  );
};

export default App;
