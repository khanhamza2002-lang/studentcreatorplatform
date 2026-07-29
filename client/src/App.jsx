import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Profile from "./pages/Profile";
import Messages from "./pages/Messages";
import Admin from "./pages/Admin";

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
        <Route path="/messages" element={<Messages />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;