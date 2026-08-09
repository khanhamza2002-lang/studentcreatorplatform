import { useState } from "react";
import Navbar from "../components/Navbar";
import "./UploadProduct.css";

function UploadProduct() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first.");
      return;
    }

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);

    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await fetch("https://extraordinary-embrace-production-5820.up.railway.app/api/products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        alert("Product uploaded successfully!");

        setTitle("");
        setDescription("");
        setPrice("");
        setCategory("");
        setImage(null);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Server Error");
    }
  };

  return (
    <>
      <Navbar />

      <div className="upload-container">
        <div className="upload-card">
          <h1>Upload a Product</h1>

          <input
            type="text"
            placeholder="Product Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Product Description"
            rows="5"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="number"
            placeholder="Price (PKR)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option>Software</option>
            <option>Fashion</option>
            <option>Notes</option>
            <option>Photography</option>
            <option>Art & Design</option>
            <option>Handmade Crafts</option>
          </select>

          <label>Upload Product Image</label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <button onClick={handleSubmit}>
            Submit Product
          </button>
        </div>
      </div>
    </>
  );
}

export default UploadProduct;