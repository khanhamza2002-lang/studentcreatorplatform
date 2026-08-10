import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Search,
  SlidersHorizontal,
  ShoppingBag,
  Sparkles,
  X,
} from "lucide-react";

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

  const categories = [
    "Software",
    "Notes",
    "Fashion",
    "Photography",
    "Art & Design",
    "Handmade Crafts",
    "Electronics",
  ];

  useEffect(() => {
    setSearch(searchParams.get("search") || "");
    setCategory(searchParams.get("category") || "");
  }, [searchParams]);

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

  const updateParams = (newSearch, newCategory) => {
    const params = {};

    if (newSearch) {
      params.search = newSearch;
    }

    if (newCategory) {
      params.category = newCategory;
    }

    setSearchParams(params);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;

    setSearch(value);
    updateParams(value, category);
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;

    setCategory(value);
    updateParams(search, value);
  };

  const chooseCategory = (value) => {
    setCategory(value);
    updateParams(search, value);
  };

  const clearFilters = () => {
    setSearch("");
    setCategory("");
    setSearchParams({});
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50">

        {/* HERO HEADER */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-blue-700 text-white">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-blue-400 blur-3xl"></div>
            <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-indigo-400 blur-3xl"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-6 md:px-8 py-20">
            <div className="max-w-3xl">

              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-2 text-sm font-semibold mb-5">
                <Sparkles size={16} />
                Student Marketplace
              </div>

              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
                Discover student-made
                <span className="text-blue-300"> products and ideas.</span>
              </h1>

              <p className="text-slate-200 text-lg mt-6 leading-8 max-w-2xl">
                Browse approved listings from student creators across software,
                notes, fashion, design, electronics and more.
              </p>

            </div>
          </div>
        </section>


        <div className="max-w-7xl mx-auto px-6 md:px-8 py-10">

          {/* SEARCH / FILTER PANEL */}
          <section className="-mt-20 relative z-10 bg-white rounded-3xl shadow-xl border border-slate-200 p-6 md:p-7 mb-8">

            <div className="flex items-center gap-2 mb-5">
              <SlidersHorizontal size={20} className="text-blue-600" />

              <h2 className="font-bold text-slate-800 text-lg">
                Find what you're looking for
              </h2>
            </div>

            <div className="grid lg:grid-cols-[1fr_300px] gap-4">

              <div className="relative">
                <Search
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={search}
                  onChange={handleSearchChange}
                  placeholder="Search products, notes, software, designs..."
                  className="w-full border border-slate-200 bg-slate-50 rounded-2xl pl-12 pr-5 py-4 text-slate-700 outline-none transition focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <select
                value={category}
                onChange={handleCategoryChange}
                className="border border-slate-200 bg-slate-50 rounded-2xl px-5 py-4 text-slate-700 outline-none transition focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
              >
                <option value="">All Categories</option>

                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

            </div>


            {/* CATEGORY CHIPS */}
            <div className="flex flex-wrap gap-2 mt-5">

              <button
                onClick={() => chooseCategory("")}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                  category === ""
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                }`}
              >
                All
              </button>

              {categories.map((item) => (
                <button
                  key={item}
                  onClick={() => chooseCategory(item)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                    category === item
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                  }`}
                >
                  {item}
                </button>
              ))}

            </div>

          </section>


          {/* RESULT HEADER */}
          <section className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-8">

            <div>
              <span className="text-blue-600 font-bold text-sm tracking-wider uppercase">
                Marketplace
              </span>

              <h2 className="text-3xl font-extrabold text-slate-900 mt-2">

                {category
                  ? `${category} Products`
                  : search
                  ? "Search Results"
                  : "Explore All Products"}

              </h2>

              <p className="text-slate-500 mt-2">
                {category
                  ? `Showing approved listings in ${category}.`
                  : "Discover products created by student sellers."}
              </p>
            </div>


            <div className="flex items-center gap-3">

              <div className="inline-flex items-center gap-2 bg-white border border-slate-200 shadow-sm rounded-full px-4 py-2 text-slate-700 font-semibold">
                <ShoppingBag size={17} className="text-blue-600" />

                {products.length}

                <span className="text-slate-400 font-medium">
                  products
                </span>
              </div>


              {(search || category) && (
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-red-600 transition"
                >
                  <X size={16} />
                  Clear filters
                </button>
              )}

            </div>

          </section>


          {/* CONTENT */}
          {loading ? (

            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <div
                  key={item}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm animate-pulse"
                >
                  <div className="h-52 bg-slate-200"></div>

                  <div className="p-5">
                    <div className="h-4 bg-slate-200 rounded w-2/3 mb-4"></div>

                    <div className="h-3 bg-slate-100 rounded w-full mb-3"></div>

                    <div className="h-3 bg-slate-100 rounded w-1/2"></div>
                  </div>
                </div>
              ))}

            </div>

          ) : products.length === 0 ? (

            <div className="bg-white border border-slate-200 rounded-3xl shadow-sm py-20 px-8 text-center">

              <div className="w-20 h-20 mx-auto rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
                <ShoppingBag size={34} />
              </div>

              <h2 className="text-2xl font-bold text-slate-800">
                No products found
              </h2>

              <p className="text-slate-500 mt-3 max-w-md mx-auto leading-7">
                We couldn't find any approved products matching your current
                search or category.
              </p>

              <button
                onClick={clearFilters}
                className="mt-7 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition"
              >
                Browse All Products
              </button>

            </div>

          ) : (

            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

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
      </main>
    </>
  );
}

export default Products;