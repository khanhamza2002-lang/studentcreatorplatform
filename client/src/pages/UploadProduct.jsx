import "./UploadProduct.css";
import Navbar from "../components/Navbar";

function UploadProduct() {
  return (
    <>
      <Navbar />

      <div className="upload-container">
        <div className="upload-card">
          <h1>Upload a Product</h1>

          <input type="text" placeholder="Product Title" />

          <textarea
            placeholder="Product Description"
            rows="5"
          ></textarea>

          <input type="number" placeholder="Price (PKR)" />

          <select>
            <option>Select Category</option>
            <option>Software</option>
            <option>Fashion</option>
            <option>Notes</option>
            <option>Photography</option>
            <option>Art & Design</option>
            <option>Handmade Crafts</option>
          </select>

          <select>
            <option>Product Type</option>
            <option>Digital Product</option>
            <option>Physical Product</option>
          </select>

          <label>Upload Product Image</label>
          <input type="file" />

          <label>Upload Digital File (Optional)</label>
          <input type="file" />

          <button>Submit Product</button>
        </div>
      </div>
    </>
  );
}

export default UploadProduct;