import "./Home.css";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import FeaturedProducts from "../components/FeaturedProducts";

import {
  ShieldCheck,
  Users,
  Sparkles,
  Upload,
  BadgeCheck,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";

function Home() {
  return (
    <>
      <Navbar />

      <Hero />

      {/* TRUST STRIP */}
      <section className="trust-strip">
        <div className="trust-item">
          <ShieldCheck size={22} />
          <span>Student-focused marketplace</span>
        </div>

        <div className="trust-item">
          <BadgeCheck size={22} />
          <span>Admin-approved listings</span>
        </div>

        <div className="trust-item">
          <Users size={22} />
          <span>Built for the TMUC community</span>
        </div>
      </section>

      {/* WHY US */}
      <section className="why-us">
        <div className="section-heading">
          <span className="section-label">WHY OUR MARKETPLACE?</span>

          <h2>
            Everything students need,
            <br />
            in one marketplace.
          </h2>

          <p>
            Discover useful products, support student creators and turn your
            own skills and ideas into opportunities.
          </p>
        </div>

        <div className="why-grid">
          <div className="why-card">
            <div className="why-icon blue">
              <Users size={28} />
            </div>

            <h3>TMUC Community</h3>

            <p>
              A marketplace designed around students, creators and
              campus-based opportunities.
            </p>
          </div>

          <div className="why-card">
            <div className="why-icon green">
              <ShieldCheck size={28} />
            </div>

            <h3>Moderated Marketplace</h3>

            <p>
              New listings go through administrator approval before becoming
              publicly visible.
            </p>
          </div>

          <div className="why-card">
            <div className="why-icon purple">
              <Sparkles size={28} />
            </div>

            <h3>Student Creativity</h3>

            <p>
              Showcase software, notes, designs, fashion, artwork, electronics
              and original student work.
            </p>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <Categories />

      {/* FEATURED PRODUCTS */}
      <section className="featured-wrapper">
        <div className="section-heading">
          <span className="section-label">DISCOVER</span>

          <h2>Featured student listings</h2>

          <p>
            Explore products and creations recently added to the marketplace.
          </p>
        </div>

        <FeaturedProducts />
      </section>

      {/* HOW IT WORKS */}
      <section className="how-it-works">
        <div className="section-heading light-heading">
          <span className="section-label light-label">HOW IT WORKS</span>

          <h2>From an idea to the marketplace.</h2>

          <p>
            A simple and moderated process designed for student creators.
          </p>
        </div>

        <div className="steps-grid">
          <div className="step-card">
            <div className="step-number">01</div>

            <div className="step-icon">
              <Upload size={27} />
            </div>

            <h3>Create a Listing</h3>

            <p>
              Upload your product with its title, description, category,
              price and image.
            </p>
          </div>

          <div className="step-arrow">
            <ArrowRight size={28} />
          </div>

          <div className="step-card">
            <div className="step-number">02</div>

            <div className="step-icon">
              <BadgeCheck size={27} />
            </div>

            <h3>Admin Approval</h3>

            <p>
              Listings are reviewed before becoming visible to the wider
              marketplace.
            </p>
          </div>

          <div className="step-arrow">
            <ArrowRight size={28} />
          </div>

          <div className="step-card">
            <div className="step-number">03</div>

            <div className="step-icon">
              <ShoppingBag size={27} />
            </div>

            <h3>Buy & Sell</h3>

            <p>
              Students can discover, wishlist, review, message and purchase
              approved products.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="home-cta">
        <div>
          <span className="section-label">START CREATING</span>

          <h2>Have something worth sharing?</h2>

          <p>
            Turn your notes, projects, designs, products or ideas into a
            listing on the Student Marketplace.
          </p>
        </div>

        <a href="/upload-product" className="home-cta-btn">
          Create a Listing
          <ArrowRight size={20} />
        </a>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <div>
            <h3>🎓 Student Marketplace</h3>

            <p>
              Empowering TMUC students to buy, sell and showcase their
              creativity.
            </p>
          </div>

          <div className="footer-links">
            <a href="/">Home</a>
            <a href="/products">Marketplace</a>
            <a href="/dashboard">Dashboard</a>
          </div>
        </div>

        <div className="footer-bottom">
          © 2026 TMUC Student Marketplace
        </div>
      </footer>
    </>
  );
}

export default Home;