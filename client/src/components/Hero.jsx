import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Hero.css";

function Hero() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    navigate(`/products?search=${encodeURIComponent(search)}`);
  };

  return (
    <section className="hero">
      <div className="hero-overlay">

        <div className="hero-content">

          <span className="hero-badge">
            🎓 TMUC Exclusive Marketplace
          </span>

          <h1>
            Buy, Sell & Showcase
            <br />
            Student Creations
          </h1>

          <p>
            Discover notes, software, fashion, artwork,
            electronics and much more — all created by
            talented TMUC students.
          </p>

          <div className="hero-search">

            <input
              type="text"
              placeholder="Search notes, software, clothing..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button onClick={handleSearch}>
              Search
            </button>

          </div>

          <div className="hero-buttons">

            <button
              className="primary-btn"
              onClick={() => navigate("/products")}
            >
              Explore Marketplace
            </button>

            <button
              className="secondary-btn"
              onClick={() => navigate("/register")}
            >
              Become a Seller
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;