import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Search, ArrowRight, Plus } from "lucide-react";
import "./Hero.css";

function Hero() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    const value = search.trim();

    if (value) {
      navigate(`/products?search=${encodeURIComponent(value)}`);
    } else {
      navigate("/products");
    }
  };

  return (
    <section className="hero">
      <div className="hero-overlay">
        <div className="hero-content">
          <span className="hero-badge">
            🎓 Built exclusively for the TMUC community
          </span>

          <h1>
            Discover what
            <span> students create.</span>
          </h1>

          <p>
            Buy, sell and showcase student creations — from study notes and
            software to fashion, artwork, electronics and handmade products.
          </p>

          <form className="hero-search" onSubmit={handleSearch}>
            <Search size={20} />

            <input
              type="text"
              placeholder="Search notes, software, clothing, electronics..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button type="submit">
              Search
            </button>
          </form>

          <div className="hero-buttons">
            <button
              className="primary-btn"
              onClick={() => navigate("/products")}
            >
              Explore Marketplace
              <ArrowRight size={19} />
            </button>

            <button
              className="secondary-btn"
              onClick={() => navigate("/upload-product")}
            >
              <Plus size={19} />
              Sell Something
            </button>
          </div>

          <div className="hero-mini-stats">
            <div>
              <strong>Secure</strong>
              <span>Authenticated accounts</span>
            </div>

            <div>
              <strong>Moderated</strong>
              <span>Admin-approved listings</span>
            </div>

            <div>
              <strong>Student-led</strong>
              <span>Creators supporting creators</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;