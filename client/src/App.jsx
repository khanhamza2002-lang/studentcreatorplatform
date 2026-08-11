import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Profile from "./pages/Profile";
import Messages from "./pages/Messages";
import Admin from "./pages/Admin";
import Dashboard from "./pages/Dashboard";
import UploadProduct from "./pages/UploadProduct";
import ProtectedRoute from "./components/ProtectedRoute";
import Wishlist from "./pages/Wishlist";
import EditProduct from "./pages/EditProduct";
import MyOrders from "./pages/MyOrders";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/messages/:sellerId?" element={<Messages />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route
  path="/checkout/:id"
  element={
    <ProtectedRoute>
      <Checkout />
    </ProtectedRoute>
  }
/>
        <Route
  path="/my-orders"
  element={
    <ProtectedRoute>
      <MyOrders />
    </ProtectedRoute>
  }
/>
        <Route
  path="/edit-product/:id"
  element={<EditProduct />}
/>
        <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
       <Route
  path="/upload-product"
  element={
    <ProtectedRoute>
      <UploadProduct />
    </ProtectedRoute>
  }
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;