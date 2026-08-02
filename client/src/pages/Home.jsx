import "./Home.css";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import FeaturedProducts from "../components/FeaturedProducts";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />

      <section className="why-us">
        <h2>Why Choose TMUC Student Marketplace?</h2>

        <div className="why-grid">
          <div className="why-card">
            <h3>🎓 TMUC Exclusive</h3>
            <p>Only TMUC students can buy and sell.</p>
          </div>

          <div className="why-card">
            <h3>🛒 Safe Marketplace</h3>
            <p>Products are reviewed before approval.</p>
          </div>

          <div className="why-card">
            <h3>💡 Student Creativity</h3>
            <p>Support projects, notes, art and businesses.</p>
          </div>
        </div>
      </section>

      <Categories />

      <FeaturedProducts />
<section className="stats-section">

  <div className="stat">
    <h2>500+</h2>
    <p>TMUC Students</p>
  </div>

  <div className="stat">
    <h2>150+</h2>
    <p>Products Listed</p>
  </div>

  <div className="stat">
    <h2>75+</h2>
    <p>Successful Sales</p>
  </div>

  <div className="stat">
    <h2>20+</h2>
    <p>Student Creators</p>
  </div>

</section>
      <footer className="footer">
        <h3>TMUC Student Marketplace</h3>

        <p>
          Empowering TMUC students to buy, sell and showcase their creativity.
        </p>

        <small>© 2026 TMUC Student Marketplace</small>
      </footer>
    </>
  );
}

export default Home;