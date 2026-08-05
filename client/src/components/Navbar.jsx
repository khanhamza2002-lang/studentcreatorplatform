import {
  Home,
  Package,
  MessageCircle,
  Heart,
  LayoutDashboard,
  LogOut,
  ShoppingBag,
  User,
} from "lucide-react";

import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const firstName = user.full_name
    ? user.full_name.split(" ")[0]
    : "User";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const navItem = (to, icon, text) => (
    <Link
      to={to}
      className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 ${
        location.pathname === to
          ? "bg-blue-600 text-white shadow-md"
          : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
      }`}
    >
      {icon}
      <span>{text}</span>
    </Link>
  );

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/90 border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">

        <Link
          to="/"
          className="text-3xl font-extrabold text-blue-700 tracking-tight"
        >
          🎓 TMUC Marketplace
        </Link>

        <div className="flex items-center gap-2">

          {navItem("/", <Home size={18} />, "Home")}

          {navItem("/products", <Package size={18} />, "Products")}

          {token && (
            <>
              {navItem(
                "/dashboard",
                <LayoutDashboard size={18} />,
                "Dashboard"
              )}

              {navItem(
                "/wishlist",
                <Heart size={18} />,
                "Wishlist"
              )}

              {navItem(
                "/my-orders",
                <ShoppingBag size={18} />,
                "Orders"
              )}

              {navItem(
                "/messages",
                <MessageCircle size={18} />,
                "Messages"
              )}

              {user.role === "admin" &&
                navItem("/admin", <User size={18} />, "Admin")}
            </>
          )}
        </div>

        <div className="flex items-center gap-3">

          {!token ? (
            <>
              <Link
                to="/login"
                className="font-semibold text-blue-700 hover:text-blue-900"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl transition"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/profile"
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-xl transition"
              >
                👋 Hi, {firstName}
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl transition"
              >
                <LogOut size={18} />
                Logout
              </button>
            </>
          )}
        </div>

      </div>
    </nav>
  );
}

export default Navbar;