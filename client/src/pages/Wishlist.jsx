import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Wishlist() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("https://extraordinary-embrace-production-5820.up.railway.app/api/wishlist", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (data.success) {
      setProducts(data.products);
    }
  };

  const removeWishlist = async (id) => {
    const token = localStorage.getItem("token");

    await fetch(`https://extraordinary-embrace-production-5820.up.railway.app/api/wishlist/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchWishlist();
  };

  return (
    <>
      <Navbar />

      <div
        style={{
          maxWidth: "1200px",
          margin: "40px auto",
          padding: "20px",
        }}
      >
        <h1>My Wishlist ❤️</h1>

        {products.length === 0 ? (
          <h3>No products in your wishlist.</h3>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
              gap: "20px",
            }}
          >
            {products.map((product) => (
              <div
                key={product.id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  padding: "15px",
                }}
              >
                <img
                  src={
                    product.image_url
                      ? `https://extraordinary-embrace-production-5820.up.railway.app${product.image_url}`
                      : "https://placehold.co/400x250"
                  }
                  alt={product.title}
                  style={{
                    width: "100%",
                    height: "220px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />

                <h3>{product.title}</h3>

                <p>PKR {product.price}</p>

                <Link to={`/products/${product.id}`}>
                  View Product
                </Link>

                <br />
                <br />

                <button
                  onClick={() => removeWishlist(product.id)}
                  style={{
                    background: "#dc2626",
                    color: "white",
                    border: "none",
                    padding: "10px 15px",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Wishlist;