import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

function ProductDetails() {
  const { id } = useParams();
  console.log("Product ID:", id);

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [average, setAverage] = useState(null);
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");

  useEffect(() => {
    fetchProduct();
    fetchReviews();
    fetchAverage();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await fetch(
        `https://extraordinary-embrace-production-5820.up.railway.app/api/products/${id}`
      );

      const data = await res.json();

      if (data.success) {
        setProduct(data.product);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await fetch(
        `https://extraordinary-embrace-production-5820.up.railway.app/api/reviews/${id}`
      );

      const data = await res.json();

      if (data.success) {
        setReviews(data.reviews);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAverage = async () => {
    try {
      const res = await fetch(
        `https://extraordinary-embrace-production-5820.up.railway.app/api/reviews/rating/${id}`
      );

      const data = await res.json();

      if (data.success) {
        setAverage(data.rating);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const buyProduct = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first.");
      return;
    }

    try {
      const res = await fetch(
        "https://extraordinary-embrace-production-5820.up.railway.app/api/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            product_id: product.id,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        alert("Purchase successful!");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Server Error");
    }
  };

  const addToWishlist = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first.");
      return;
    }

    const res = await fetch(
      "https://extraordinary-embrace-production-5820.up.railway.app/api/wishlist",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          product_id: product.id,
        }),
      }
    );

    const data = await res.json();

    if (data.success) {
      alert("❤️ Added to wishlist!");
    } else {
      alert(data.message);
    }
  };

  const submitReview = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first.");
      return;
    }

    const res = await fetch(
      "https://extraordinary-embrace-production-5820.up.railway.app/api/reviews",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          product_id: product.id,
          rating,
          review,
        }),
      }
    );

    const data = await res.json();

    if (data.success) {
      alert("Review submitted!");

      setReview("");
      setRating(5);

      fetchReviews();
      fetchAverage();
    } else {
      alert(data.message);
    }
  };

  if (!product) {
    return (
      <>
        <Navbar />
        <h2 style={{ textAlign: "center", marginTop: 50 }}>
          Loading...
        </h2>
      </>
    );
  }
    return (
    <>
      <Navbar />

     <div className="max-w-7xl mx-auto p-8">
        <div className="grid lg:grid-cols-2 gap-12 mb-12">

  <div>

    <img
      src={
        product.image_url
          ? `https://extraordinary-embrace-production-5820.up.railway.app${product.image_url}`
          : "https://placehold.co/600x400"
      }
      alt={product.title}
      className="w-full rounded-2xl shadow-xl"
    />

  </div>

  <div>

    <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm">

      {product.category}

    </span>

    <h1 className="text-5xl font-bold mt-5">

      {product.title}

    </h1>

    <h2 className="text-4xl text-blue-700 font-bold mt-6">

      PKR {product.price}

    </h2>

    <p className="text-gray-600 mt-6 leading-8">

      {product.description}

    </p>

    <div className="mt-8">

      <p>

        <strong>Seller:</strong> {product.full_name}

      </p>

      <p className="mt-2">

        <strong>Rating:</strong>{" "}
        {average
          ? `${average.average || "No ratings"} ⭐`
          : "Loading..."}

      </p>
      </div>
</div>

    </div>

        <div
          style={{
            display: "flex",
            gap: "15px",
            marginTop: "20px",
            marginBottom: "40px",
          }}
        >
          {product.sold ? (
  <button
    disabled
    style={{
      padding: "14px 30px",
      background: "#6b7280",
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "not-allowed",
    }}
  >
    SOLD
  </button>
) : (
  <button
    onClick={buyProduct}
    style={{
      padding: "14px 30px",
      background: "#16a34a",
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
    }}
  >
    Buy Now
  </button>
)}

          <button
            onClick={addToWishlist}
            style={{
              padding: "14px 30px",
              background: "#dc2626",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            ❤️ Add to Wishlist
          </button>
        </div>

        <hr style={{ margin: "40px 0" }} />

        <h2>⭐ Reviews</h2>

        <p>
          <strong>Average Rating:</strong>{" "}
          {average
            ? `${average.average || "No ratings"} (${average.total} reviews)`
            : "Loading..."}
        </p>

        <div style={{ marginTop: "20px", marginBottom: "40px" }}>
          <label>Rating</label>

          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            style={{
              display: "block",
              margin: "10px 0",
              padding: "10px",
              width: "120px",
            }}
          >
            <option value={5}>⭐⭐⭐⭐⭐</option>
            <option value={4}>⭐⭐⭐⭐</option>
            <option value={3}>⭐⭐⭐</option>
            <option value={2}>⭐⭐</option>
            <option value={1}>⭐</option>
          </select>

          <textarea
            placeholder="Write your review..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
            style={{
              width: "100%",
              height: "120px",
              padding: "10px",
              marginBottom: "15px",
            }}
          />

          <button
            onClick={submitReview}
            style={{
              background: "#2563eb",
              color: "white",
              border: "none",
              padding: "12px 24px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Submit Review
          </button>
        </div>

       {reviews.length === 0 ? (
  <div className="bg-gray-100 rounded-xl p-8 text-center">
    <h3 className="text-xl font-semibold">
      No reviews yet
    </h3>

    <p className="text-gray-500 mt-2">
      Be the first person to review this product.
    </p>
  </div>
) : (
  <div className="space-y-5">

    {reviews.map((item) => (

      <div
        key={item.id}
        className="bg-white rounded-2xl shadow-lg p-6"
      >

        <div className="flex justify-between items-center">

          <h3 className="font-bold text-xl">

            {item.full_name}

          </h3>

          <span className="text-yellow-500 text-lg">

            {"⭐".repeat(item.rating)}

          </span>

        </div>

        <p className="text-gray-600 mt-4">

          {item.review}

        </p>

      </div>

    ))}

  </div>
)}
      </div>
    </>
  );
}

export default ProductDetails;