import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        🎓 Student Creator Platform
      </div>

      <ul className="nav-links">
        <li>Home</li>
        <li>Products</li>
        <li>Categories</li>
      </ul>

      <div className="auth-buttons">
        <button className="login-btn">Login</button>
        <button className="register-btn">Register</button>
      </div>
    </nav>
  );
}

export default Navbar;