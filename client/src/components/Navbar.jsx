import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        🎓 TMUC Student Marketplace
      </div>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/messages">Messages</Link></li>
      </ul>

      <div className="nav-right">
        <Link to="/login" className="login-btn">
          Login
        </Link>

        <Link to="/register" className="register-btn">
          Register
        </Link>

        <Link to="/profile" className="profile-btn">
          Profile
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;