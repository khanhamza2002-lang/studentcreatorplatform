import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Heart,
  MessageCircle,
  ShoppingBag,
  Star,
  UserRound,
  ShieldCheck,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";

import Navbar from "../components/Navbar";

const API_URL =
  "https://extraordinary-embrace-production-5820.up.railway.app";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [average, setAverage] = useState(null);

  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
    fetchReviews();
    fetchAverage();
  }, [id]);

  // ========================================
  // LOAD PRODUCT
  // ========================================

  const fetchProduct = async () => {
    try {
      const res = await fetch(
        `${API_URL}/api/products/${id}`
      );

      const data = await res.json();

      if (data.success) {
        setProduct(data.product);
      }
    } catch (err) {
      console.error("Product load error:", err);
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // LOAD REVIEWS
  // ========================================

  const fetchReviews = async () => {
    try {
      const res = await fetch(
        `${API_URL}/api/reviews/${id}`
      );

      const data = await res.json();

      if (data.success) {
        setReviews(data.reviews);
      }
    } catch (err) {
      console.error("Reviews load error:", err);
    }
  };

  // ========================================
  // LOAD AVERAGE RATING
  // ========================================

  const fetchAverage = async () => {
    try {
      const res = await fetch(
        `${API_URL}/api/reviews/rating/${id}`
      );

      const data = await res.json();

      if (data.success) {
        setAverage(data.rating);
      }
    } catch (err) {
      console.error("Rating load error:", err);
    }
  };

  // ========================================
  // BUY PRODUCT
  // ========================================

  const buyProduct = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first.");
      navigate("/login");
      return;
    }

    if (product.sold) {
      alert("This product has already been sold.");
      return;
    }

    try {
      const res = await fetch(
        `${API_URL}/api/orders`,
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

        // Refresh product so SOLD status updates
        fetchProduct();
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Server Error");
    }
  };

  // ========================================
  // WISHLIST
  // ========================================

  const addToWishlist = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first.");
      navigate("/login");
      return;
    }

    try {
      const res = await fetch(
        `${API_URL}/api/wishlist`,
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
    } catch (err) {
      console.error(err);
      alert("Server Error");
    }
  };

  // ========================================
  // MESSAGE SELLER
  // ========================================

  const messageSeller = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first.");
      navigate("/login");
      return;
    }

    navigate(
      `/messages/${product.seller_id}?product=${product.id}`
    );
  };

  // ========================================
  // SUBMIT REVIEW
  // ========================================

  const submitReview = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first.");
      navigate("/login");
      return;
    }

    if (!review.trim()) {
      alert("Please write a review.");
      return;
    }

    try {
      const res = await fetch(
        `${API_URL}/api/reviews`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            product_id: product.id,
            rating,
            review: review.trim(),
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
    } catch (err) {
      console.error(err);
      alert("Server Error");
    }
  };

  // ========================================
  // LOADING STATE
  // ========================================

  if (loading || !product) {
    return (
      <>
        <Navbar />

        <div className="min-h-[70vh] flex items-center justify-center bg-slate-50">
          <div className="text-center">

            <div className="w-14 h-14 mx-auto rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin"></div>

            <h2 className="text-xl font-semibold text-slate-700 mt-5">
              Loading product...
            </h2>

          </div>
        </div>
      </>
    );
  }

  const averageRating =
    Number(average?.average) || 0;

  const reviewTotal =
    Number(average?.total) || reviews.length || 0;

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50">

        {/* ==============================
            TOP BAR
        ============================== */}

        <div className="max-w-7xl mx-auto px-6 md:px-8 pt-8">

          <button
            onClick={() => navigate("/products")}
            className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-700 font-semibold transition"
          >
            <ArrowLeft size={18} />
            Back to Marketplace
          </button>

        </div>


        {/* ==============================
            PRODUCT SECTION
        ============================== */}

        <section className="max-w-7xl mx-auto px-6 md:px-8 py-8">

          <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">

            <div className="grid lg:grid-cols-2">

              {/* PRODUCT IMAGE */}

              <div className="relative min-h-[480px] bg-slate-100">

                <img
                  src={
                    product.image_url
                      ? `${API_URL}${product.image_url}`
                      : "https://placehold.co/800x650"
                  }
                  alt={product.title}
                  className="w-full h-full min-h-[480px] object-cover"
                />

                {product.sold && (
                  <div className="absolute top-6 left-6">

                    <span className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full font-bold shadow-lg">

                      <CheckCircle2 size={17} />

                      SOLD

                    </span>

                  </div>
                )}

              </div>


              {/* PRODUCT INFORMATION */}

              <div className="p-8 md:p-10 lg:p-12">

                <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-bold">

                  <ShoppingBag size={15} />

                  {product.category}

                </span>


                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mt-6">

                  {product.title}

                </h1>


                <div className="flex flex-wrap items-center gap-5 mt-6">

                  <div className="flex items-center gap-2 text-slate-600">

                    <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">

                      <UserRound size={17} />

                    </div>

                    <div>

                      <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide">
                        Seller
                      </p>

                      <p className="font-bold text-slate-700">
                        {product.full_name}
                      </p>

                    </div>

                  </div>


                  <div className="h-10 w-px bg-slate-200 hidden sm:block"></div>


                  <div>

                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide">
                      Rating
                    </p>

                    <div className="flex items-center gap-2 mt-1">

                      <Star
                        size={18}
                        className="fill-yellow-400 text-yellow-400"
                      />

                      <span className="font-bold text-slate-700">
                        {averageRating
                          ? averageRating.toFixed(1)
                          : "No ratings"}
                      </span>

                      {reviewTotal > 0 && (
                        <span className="text-sm text-slate-400">
                          ({reviewTotal})
                        </span>
                      )}

                    </div>

                  </div>

                </div>


                <div className="border-t border-slate-100 my-8"></div>


                <div>

                  <p className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                    Price
                  </p>

                  <h2 className="text-4xl font-extrabold text-blue-700 mt-2">

                    PKR {product.price}

                  </h2>

                </div>


                <div className="mt-8">

                  <h3 className="font-bold text-slate-800 text-lg mb-3">
                    About this product
                  </h3>

                  <p className="text-slate-600 leading-8">
                    {product.description}
                  </p>

                </div>


                {/* TRUST NOTE */}

                <div className="flex gap-3 bg-emerald-50 border border-emerald-100 rounded-2xl p-4 mt-8">

                  <ShieldCheck
                    size={22}
                    className="text-emerald-600 flex-shrink-0 mt-0.5"
                  />

                  <div>

                    <p className="font-bold text-emerald-900">
                      Approved Marketplace Listing
                    </p>

                    <p className="text-sm text-emerald-700 mt-1">
                      This listing has passed platform moderation
                      before becoming publicly visible.
                    </p>

                  </div>

                </div>


                {/* ACTION BUTTONS */}

                <div className="grid sm:grid-cols-2 gap-3 mt-8">

                  {product.sold ? (

                    <button
                      disabled
                      className="sm:col-span-2 bg-slate-300 text-slate-600 font-bold py-4 rounded-2xl cursor-not-allowed"
                    >
                      Product Sold
                    </button>

                  ) : (

                    <button
                      onClick={buyProduct}
                      className="sm:col-span-2 inline-flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-md shadow-blue-200 transition"
                    >

                      <ShoppingBag size={20} />

                      Buy Product

                    </button>

                  )}


                  <button
                    onClick={addToWishlist}
                    className="inline-flex justify-center items-center gap-2 border border-slate-200 bg-white hover:bg-red-50 hover:border-red-200 hover:text-red-600 text-slate-700 font-bold py-3.5 rounded-2xl transition"
                  >

                    <Heart size={19} />

                    Add to Wishlist

                  </button>


                  <button
                    onClick={messageSeller}
                    className="inline-flex justify-center items-center gap-2 border border-slate-200 bg-slate-900 hover:bg-blue-700 text-white font-bold py-3.5 rounded-2xl transition"
                  >

                    <MessageCircle size={19} />

                    Message Seller

                  </button>

                </div>

              </div>
            </div>

          </div>

        </section>


        {/* ==============================
            REVIEWS AREA
        ============================== */}

        <section className="max-w-7xl mx-auto px-6 md:px-8 pb-20">

          <div className="grid lg:grid-cols-[380px_1fr] gap-7">

            {/* WRITE REVIEW */}

            <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-7 h-fit">

              <span className="text-blue-600 text-xs font-extrabold tracking-wider">
                YOUR FEEDBACK
              </span>

              <h2 className="text-2xl font-extrabold text-slate-900 mt-2">
                Leave a review
              </h2>

              <p className="text-slate-500 text-sm leading-6 mt-2">
                Share your experience with other students.
              </p>


              <div className="mt-6">

                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Rating
                </label>

                <select
                  value={rating}
                  onChange={(e) =>
                    setRating(Number(e.target.value))
                  }
                  className="w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                >

                  <option value={5}>⭐⭐⭐⭐⭐ — Excellent</option>
                  <option value={4}>⭐⭐⭐⭐ — Very Good</option>
                  <option value={3}>⭐⭐⭐ — Good</option>
                  <option value={2}>⭐⭐ — Fair</option>
                  <option value={1}>⭐ — Poor</option>

                </select>

              </div>


              <div className="mt-5">

                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Review
                </label>

                <textarea
                  placeholder="What did you think about this product?"
                  value={review}
                  onChange={(e) =>
                    setReview(e.target.value)
                  }
                  className="w-full h-32 resize-none border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                />

              </div>


              <button
                onClick={submitReview}
                className="w-full mt-5 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition"
              >
                Submit Review
              </button>

            </div>


            {/* REVIEWS LIST */}

            <div>

              <div className="flex items-end justify-between mb-5">

                <div>

                  <span className="text-blue-600 text-xs font-extrabold tracking-wider">
                    COMMUNITY REVIEWS
                  </span>

                  <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
                    What students say
                  </h2>

                </div>


                <div className="hidden sm:flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-2 shadow-sm">

                  <Star
                    size={17}
                    className="fill-yellow-400 text-yellow-400"
                  />

                  <span className="font-bold text-slate-700">
                    {averageRating
                      ? averageRating.toFixed(1)
                      : "—"}
                  </span>

                  <span className="text-slate-400 text-sm">
                    ({reviewTotal})
                  </span>

                </div>

              </div>


              {reviews.length === 0 ? (

                <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-12 text-center">

                  <div className="w-16 h-16 mx-auto bg-yellow-50 text-yellow-500 rounded-full flex items-center justify-center">

                    <Star size={27} />

                  </div>

                  <h3 className="text-xl font-bold text-slate-800 mt-5">
                    No reviews yet
                  </h3>

                  <p className="text-slate-500 mt-2">
                    Be the first person to review this product.
                  </p>

                </div>

              ) : (

                <div className="space-y-4">

                  {reviews.map((item) => (

                    <article
                      key={item.id}
                      className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6"
                    >

                      <div className="flex justify-between gap-4">

                        <div className="flex items-center gap-3">

                          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center font-extrabold">

                            {item.full_name
                              ?.split(" ")
                              .map((word) => word[0])
                              .join("")
                              .slice(0, 2)
                              .toUpperCase()}

                          </div>

                          <div>

                            <h3 className="font-bold text-slate-800">
                              {item.full_name}
                            </h3>

                            <p className="text-xs text-slate-400">
                              Student reviewer
                            </p>

                          </div>

                        </div>


                        <div className="flex gap-1 text-yellow-400">

                          {"⭐".repeat(item.rating)}

                        </div>

                      </div>


                      <p className="text-slate-600 leading-7 mt-5">

                        {item.review}

                      </p>

                    </article>

                  ))}

                </div>

              )}

            </div>

          </div>

        </section>

      </main>
    </>
  );
}

export default ProductDetails;