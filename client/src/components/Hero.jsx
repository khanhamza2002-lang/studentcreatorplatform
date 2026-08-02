import "./Hero.css";

function Hero() {
  return (
    <section className="hero">

      <div className="hero-content">

        <h1>Buy & Sell Student Creations</h1>

        <p>
          The exclusive marketplace for TMUC students to buy and sell
          digital and physical products.
        </p>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search for notes, clothing, software..."
          />

          <button>Search</button>
        </div>

      </div>

    </section>
  );
}

export default Hero;