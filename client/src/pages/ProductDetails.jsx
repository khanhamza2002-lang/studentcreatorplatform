import Navbar from "../components/Navbar";

function ProductDetails() {
  return (
    <>
      <Navbar />

      <div
        style={{
          maxWidth: "1000px",
          margin: "40px auto",
          padding: "20px",
        }}
      >
        <img
          src="https://placehold.co/600x400"
          alt="Product"
          style={{
            width: "100%",
            borderRadius: "10px",
            marginBottom: "20px",
          }}
        />

        <h1>Website Template</h1>

        <h2 style={{ color: "#1e3a8a" }}>PKR 2,500</h2>

        <p>
          A modern, responsive website template created by a TMUC student.
          Perfect for portfolios, startups, and small businesses.
        </p>

        <p>
          <strong>Category:</strong> Digital Product
        </p>

        <p>
          <strong>Seller:</strong> Ali Khan
        </p>

        <button
          style={{
            marginTop: "20px",
            padding: "14px 30px",
            background: "#1e3a8a",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Message Seller
        </button>
      </div>
    </>
  );
}

export default ProductDetails;