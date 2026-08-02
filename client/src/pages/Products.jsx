import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import "./Products.css";

function Products() {
  return (
    <>
      <Navbar />

      <div className="products-page">

        <div className="products-header">

          <h1>Marketplace</h1>

          <p>Discover amazing creations from TMUC students.</p>

        </div>

        <div className="filters">

          <input
            type="text"
            placeholder="Search products..."
          />

          <select>
            <option>All Categories</option>
            <option>Software</option>
            <option>Notes</option>
            <option>Fashion</option>
            <option>Photography</option>
            <option>Art & Design</option>
          </select>

          <select>
            <option>Newest</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>

        </div>

        <div className="products-grid">

          <ProductCard
            title="Website Template"
            type="Digital Product"
            price="2500"
          />

          <ProductCard
            title="Study Notes"
            type="Digital Product"
            price="800"
          />

          <ProductCard
            title="Handmade Hoodie"
            type="Physical Product"
            price="3500"
          />

          <ProductCard
            title="Photography Presets"
            type="Digital Product"
            price="1200"
          />

          <ProductCard
            title="UI Design Kit"
            type="Digital Product"
            price="3000"
          />

          <ProductCard
            title="Canvas Painting"
            type="Physical Product"
            price="4500"
          />

        </div>

      </div>
    </>
  );
}

export default Products;