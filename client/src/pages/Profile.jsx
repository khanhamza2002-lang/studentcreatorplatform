import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const token = localStorage.getItem("token");

  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchSales();
    fetchWishlist();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch(
      "http://localhost:5000/api/products/my-products",
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
  };

  const fetchSales = async () => {
    const res = await fetch(
      "http://localhost:5000/api/orders/my-sales",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    if (data.success) {
      setSales(data.sales);
    }
  };

  const fetchWishlist = async () => {
    const res = await fetch(
      "http://localhost:5000/api/wishlist",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    if (data.success) {
      setWishlist(data.products);
    }
  };

  const revenue = sales.reduce(
    (sum, sale) => sum + Number(sale.price),
    0
  );

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100">

        <div className="max-w-6xl mx-auto p-10">

          <div className="grid lg:grid-cols-3 gap-8">

            {/* Left Card */}

            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">

              <img
                src="https://placehold.co/180x180"
                alt="Profile"
                className="w-40 h-40 rounded-full mx-auto border-4 border-blue-500"
              />

              <h1 className="text-3xl font-bold mt-6">
                {user.full_name}
              </h1>

              <p className="text-gray-500 mt-2">
                {user.email}
              </p>

              <span className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded-full">

                {user.role}

              </span>

              <button className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl">

                Edit Profile

              </button>

            </div>

            {/* Right Side */}

            <div className="lg:col-span-2">

              <div className="grid md:grid-cols-2 gap-6 mb-8">

                <div className="bg-white rounded-2xl shadow-lg p-6">

                  <p className="text-gray-500">
                    Products Listed
                  </p>

                  <h2 className="text-4xl font-bold text-blue-600 mt-2">
                   {products.length}
                  </h2>

                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6">

                  <p className="text-gray-500">
                    Total Sales
                  </p>

                  <h2 className="text-4xl font-bold text-green-600 mt-2">
                     {sales.length}
                  </h2>

                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6">

                  <p className="text-gray-500">
                    Revenue
                  </p>

                  <h2 className="text-4xl font-bold text-purple-600 mt-2">
                    PKR {revenue}
                  </h2>

                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6">

                  <p className="text-gray-500">
                    Wishlist Items
                  </p>

                  <h2 className="text-4xl font-bold text-red-600 mt-2">
                    {wishlist.length}
                  </h2>

                </div>

              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8">

                <h2 className="text-2xl font-bold mb-5">
                  Account Information
                </h2>

                <div className="space-y-4">

                  <div>

                    <p className="text-gray-500">
                      Full Name
                    </p>

                    <h3 className="text-xl font-semibold">
                      {user.full_name}
                    </h3>

                  </div>

                  <div>

                    <p className="text-gray-500">
                      Email Address
                    </p>

                    <h3 className="text-xl font-semibold">
                      {user.email}
                    </h3>

                  </div>

                  <div>

                    <p className="text-gray-500">
                      Account Type
                    </p>

                    <h3 className="text-xl font-semibold capitalize">
                      {user.role}
                    </h3>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </>
  );
}

export default Profile;