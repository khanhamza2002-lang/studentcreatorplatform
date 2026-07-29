import "./FeaturedProducts.css";
import ProductCard from "./ProductCard";

function FeaturedProducts() {
  return (
    <section className="featured">
      <h2>Featured Products</h2>

      <div className="product-grid">
        <ProductCard
          title="Website Template"
          type="Digital Product"
          price="2500"
        />

        <ProductCard
          title="Handmade Hoodie"
          type="Physical Product"
          price="3500"
        />

        <ProductCard
          title="Study Notes"
          type="Digital Product"
          price="800"
        />
      </div>
    </section>
  );
}

export default FeaturedProducts;