import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState(
    searchParams.get("search") || ""
  );

  const [category, setCategory] = useState(
    searchParams.get("category") || ""
  );

  // Keep state synchronized when URL changes
  useEffect(() => {
    setSearch(searchParams.get("search") || "");
    setCategory(searchParams.get("category") || "");
  }, [searchParams]);

  // Load products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        const response = await fetch(
          `https://extraordinary-embrace-production-5820.up.railway.app/api/products/search?search=${encodeURIComponent(
            search
          )}&category=${encodeURIComponent(category)}`
        );

        const data = await response.json();

        if (data.success) {
          setProducts(data.products);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Failed to load products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [search, category]);

  // Search box
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    const params = {};

    if (value) {
      params.search = value;
    }

    if (category) {
      params.category = category;
    }

    setSearchParams(params);
  };

  // Category dropdown
  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setCategory(value);

    const params = {};

    if (search) {
      params.search = search;
    }

    if (value) {
      params.category = value;
    }

    setSearchParams(params);
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100">
        <div className="max-w-7xl mx-auto px-8 py-12">

          {/* HEADER */}

          <div className="text-center mb-12">
            <h1 className="text-5xl font-extrabold text-gray-800">
              Student Marketplace
            </h1>

            <p className="text-gray-600 mt-4 text-lg">
              Browse products created by talented TMUC students.
            </p>
          </div>

          {/* SEARCH + FILTER */}

          <div className="bg-white rounded-2xl shadow-lg p-6 mb-10">
            <div className="grid md:grid-cols-2 gap-5">

              <input
                type="text"
                placeholder="🔍 Search products..."
                value={search}
                onChange={handleSearchChange}
                className="border rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <select
                value={category}
                onChange={handleCategoryChange}
                className="border rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Categories</option>
                <option value="Software">Software</option>
                <option value="Notes">Notes</option>
                <option value="Fashion">Fashion</option>
                <option value="Photography">Photography</option>
                <option value="Art & Design">Art & Design</option>
                <option value="Handmade Crafts">
                  Handmade Crafts
                </option>
                <option value="Electronics">Electronics</option>
              </select>

            </div>
          </div>

          {/* PRODUCT COUNT */}

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {category || search
                ? "Search Results"
                : "All Products"}
            </h2>

            <span className="bg-blue-600 text-white px-4 py-2 rounded-full">
              {products.length} Products
            </span>
          </div>

          {/* PRODUCTS */}

          {loading ? (
            <div className="text-center py-20">
              <h2 className="text-xl font-semibold text-gray-600">
                Loading products...
              </h2>
            </div>
          ) : products.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm text-center py-20 px-6">
              <h2 className="text-2xl font-bold text-gray-700">
                No Products Found
              </h2>

              <p className="text-gray-500 mt-3">
                Try another search or category.
              </p>

              {(search || category) && (
                <button
                  onClick={() => {
                    setSearch("");
                    setCategory("");
                    setSearchParams({});
                  }}
                  className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700"
                >
                  View All Products
                </button>
              )}
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