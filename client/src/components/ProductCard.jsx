import "./ProductCard.css";

function ProductCard({ title, type, price }) {
  return (
    <div className="product-card">
      <img
        src="https://placehold.co/300x200"
        alt={title}
      />

      <h3>{title}</h3>

      <p>{type}</p>

      <h4>PKR {price}</h4>

      <button>View Details</button>
    </div>
  );
}

export default ProductCard;