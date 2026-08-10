import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  Trash2,
  Eye,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";

import Navbar from "../components/Navbar";

const API_URL =
  "https://extraordinary-embrace-production-5820.up.railway.app";

function Wishlist() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        `${API_URL}/api/wishlist`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const removeWishlist = async (id) => {
    const token = localStorage.getItem("token");

    try {
      await fetch(
        `${API_URL}/api/wishlist/${id}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProducts((prev) =>
        prev.filter((product) => product.id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50">

        {/* HEADER */}
        <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-blue-700 text-white">

          <div className="max-w-7xl mx-auto px-6 md:px-8 py-14">

            <div className="inline-flex items-center gap-2 text-blue-300 text-xs font-extrabold tracking-[0.2em]">
              <Heart size={15} />
              SAVED PRODUCTS
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold mt-3">
              My Wishlist
            </h1>

            <p className="text-slate-300 text-lg mt-4">
              Keep track of products you might want to come back to later.
            </p>

          </div>

        </section>


        <section className="max-w-7xl mx-auto px-6 md:px-8 py-10">

          <div className="flex items-center justify-between mb-7">

            <div>

              <span className="text-blue-600 text-xs font-extrabold tracking-wider">
                COLLECTION
              </span>

              <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
                Saved Listings
              </h2>

            </div>

            <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-2 text-slate-600 font-semibold shadow-sm">
              <ShoppingBag size={16} className="text-blue-600" />
              {products.length} saved
            </div>

          </div>


          {loading ? (

            <div className="text-center py-20 text-slate-500">
              Loading wishlist...
            </div>

          ) : products.length === 0 ? (

            <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-12 md:p-16 text-center">

              <div className="w-20 h-20 mx-auto rounded-full bg-red-50 text-red-500 flex items-center justify-center">
                <Heart size={34} />
              </div>

              <h3 className="text-2xl font-extrabold text-slate-800 mt-6">
                Your wishlist is empty
              </h3>

              <p className="text-slate-500 mt-3">
                Save interesting products while browsing the marketplace.
              </p>

              <Link
                to="/products"
                className="inline-flex items-center gap-2 mt-7 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl transition"
              >
                Browse Marketplace
                <ArrowRight size={18} />
              </Link>

            </div>

          ) : (

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">

              {products.map((product) => (

                <article
                  key={product.id}
                  className="group bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >

                  <div className="relative overflow-hidden">

                    <img
                      src={
                        product.image_url
                          ? `${API_URL}${product.image_url}`
                          : "https://placehold.co/500x350"
                      }
                      alt={product.title}
                      className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    <button
                      onClick={() =>
                        removeWishlist(product.id)
                      }
                      title="Remove from wishlist"
                      className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/95 text-red-500 hover:bg-red-500 hover:text-white shadow-md flex items-center justify-center transition"
                    >
                      <Trash2 size={17} />
                    </button>

                  </div>


                  <div className="p-5">

                    <span className="text-blue-600 text-xs font-bold uppercase tracking-wide">
                      {product.category || "Marketplace"}
                    </span>

                    <h3 className="text-xl font-extrabold text-slate-900 mt-2 line-clamp-2">
                      {product.title}
                    </h3>

                    <p className="text-2xl font-extrabold text-blue-700 mt-4">
                      PKR {product.price}
                    </p>


                    <div className="border-t border-slate-100 my-5"></div>


                    <Link
                      to={`/product/${product.id}`}
                      className="inline-flex items-center gap-2 bg-slate-900 hover:bg-blue-700 text-white font-bold px-4 py-2.5 rounded-xl transition"
                    >
                      <Eye size={17} />
                      View Product
                    </Link>

                  </div>

                </article>

              ))}

            </div>

          )}

        </section>

      </main>
    </>
  );
}

export default Wishlist;