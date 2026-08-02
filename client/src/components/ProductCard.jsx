import { Link } from "react-router-dom";
import "./ProductCard.css";

function ProductCard({ title, type, price }) {
  return (
    <div className="product-card">

      <img
        src="https://placehold.co/400x250"
        alt={title}
      />

      <div className="product-info">

        <span className="badge">{type}</span>

        <h3>{title}</h3>

        <p className="seller">
          Sold by TMUC Student
        </p>

        <h2>PKR {price}</h2>

        <Link to="/product/1">
          <button>View Details</button>
        </Link>

      </div>

    </div>
  );
}

export default ProductCard;