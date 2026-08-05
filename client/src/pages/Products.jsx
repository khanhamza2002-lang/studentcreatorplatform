import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";

function Products() {
const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const fetchProducts = async () => {
  setLoading(true);
  

  try {
      const response = await fetch(
        `http://localhost:5000/api/products/search?search=${search}&category=${category}`
      );

      const data = await response.json();

     if (data.success) {
  setProducts(data.products);
}

setLoading(false);
    } catch (error) {
  console.error(error);
  setLoading(false);
}
  };

  useEffect(() => {
    fetchProducts();
  }, [search, category]);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100">

        <div className="max-w-7xl mx-auto px-8 py-12">

          <div className="text-center mb-12">

            <h1 className="text-5xl font-extrabold text-gray-800">
              Student Marketplace
            </h1>

            <p className="text-gray-600 mt-4 text-lg">
              Browse products created by talented TMUC students.
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 mb-10">

            <div className="grid md:grid-cols-2 gap-5">

              <input
                type="text"
                placeholder="🔍 Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Categories</option>
                <option>Software</option>
                <option>Notes</option>
                <option>Fashion</option>
                <option>Photography</option>
                <option>Art & Design</option>
                <option>Handmade Crafts</option>
                <option>Electronics</option>
              </select>

            </div>

          </div>

          <div className="flex justify-between items-center mb-6">

            <h2 className="text-2xl font-bold text-gray-800">
              Products
            </h2>

            <span className="bg-blue-600 text-white px-4 py-2 rounded-full">
              {products.length} Products
            </span>

          </div>

          {loading ? (

  <div className="bg-white rounded-2xl shadow p-16 text-center">
    <h2 className="text-2xl font-bold text-blue-600">
      Loading Products...
    </h2>
  </div>

) : products.length === 0 ? (
            <div className="bg-white rounded-2xl shadow p-16 text-center">

              <h2 className="text-2xl font-bold text-gray-700">
                No Products Found
              </h2>

              <p className="text-gray-500 mt-3">
                Try another search or category.
              </p>

            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  type={product.category}
                  price={product.price}
                  seller={product.full_name}
                  image={product.image_url}
                  sold={product.sold}
                />
              ))}

            </div>
          )}

        </div>

      </div>
    </>
  );
}

export default Products;