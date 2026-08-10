import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  ShoppingBag,
  Wallet,
  Activity,
  Plus,
  Pencil,
  CheckCircle2,
  Clock3,
  UserRound,
} from "lucide-react";

import Navbar from "../components/Navbar";

const API_URL =
  "https://extraordinary-embrace-production-5820.up.railway.app";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    fetchProducts();
    fetchSales();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/products/my-products`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setProducts(data.products);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchSales = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/orders/my-sales`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setSales(data.sales);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const revenue = sales.reduce(
    (sum, sale) => sum + Number(sale.price),
    0
  );

  const activeProducts = products.filter(
    (product) => !product.sold
  ).length;

  const soldProducts = products.filter(
    (product) => product.sold
  ).length;

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50">

        {/* HERO */}
        <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-blue-700 text-white">
          <div className="max-w-7xl mx-auto px-6 md:px-8 py-14">

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

              <div>
                <span className="text-blue-300 text-xs font-extrabold tracking-[0.2em]">
                  SELLER DASHBOARD
                </span>

                <h1 className="text-4xl md:text-5xl font-extrabold mt-3">
                  Welcome back,{" "}
                  <span className="text-blue-300">
                    {user.full_name || "Seller"}
                  </span>
                </h1>

                <p className="text-slate-300 mt-4 text-lg">
                  Manage your listings and keep track of your marketplace activity.
                </p>
              </div>

              <Link to="/upload-product">
                <button className="inline-flex items-center gap-2 bg-white text-blue-800 hover:bg-blue-50 font-bold px-6 py-3.5 rounded-2xl shadow-lg transition">
                  <Plus size={19} />
                  Upload Product
                </button>
              </Link>

            </div>

          </div>
        </section>


        <div className="max-w-7xl mx-auto px-6 md:px-8 py-10">

          {/* STATS */}
          <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">

            <StatCard
              icon={Package}
              label="Total Products"
              value={products.length}
              tone="blue"
            />

            <StatCard
              icon={ShoppingBag}
              label="Total Sales"
              value={sales.length}
              tone="green"
            />

            <StatCard
              icon={Wallet}
              label="Revenue"
              value={`PKR ${revenue.toLocaleString()}`}
              tone="purple"
            />

            <StatCard
              icon={Activity}
              label="Active Listings"
              value={activeProducts}
              tone="orange"
            />

          </section>


          {/* PRODUCTS */}
          <section className="bg-white border border-slate-200 rounded-3xl shadow-sm p-7 md:p-8 mb-10">

            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-7">

              <div>
                <span className="text-blue-600 text-xs font-extrabold tracking-wider">
                  MY INVENTORY
                </span>

                <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
                  My Products
                </h2>

                <p className="text-slate-500 mt-2">
                  {activeProducts} active · {soldProducts} sold
                </p>
              </div>

              <Link
                to="/upload-product"
                className="text-blue-600 font-bold hover:text-blue-700"
              >
                + Add another product
              </Link>

            </div>


            {products.length === 0 ? (

              <div className="text-center py-16">

                <div className="w-16 h-16 mx-auto rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Package size={28} />
                </div>

                <h3 className="text-xl font-bold text-slate-800 mt-5">
                  No products yet
                </h3>

                <p className="text-slate-500 mt-2">
                  Upload your first listing to start selling.
                </p>

              </div>

            ) : (

              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

                {products.map((product) => (

                  <article
                    key={product.id}
                    className="group border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >

                    <div className="relative overflow-hidden">

                      <img
                        src={
                          product.image_url
                            ? `${API_URL}${product.image_url}`
                            : "https://placehold.co/600x400"
                        }
                        alt={product.title}
                        className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      <div className="absolute top-4 right-4">

                        {product.sold ? (
                          <span className="inline-flex items-center gap-1.5 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                            <CheckCircle2 size={13} />
                            SOLD
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                            <Activity size={13} />
                            ACTIVE
                          </span>
                        )}

                      </div>

                    </div>


                    <div className="p-5">

                      <div className="flex items-start justify-between gap-3">

                        <div>

                          <p className="text-xs font-bold uppercase tracking-wide text-blue-600">
                            {product.category}
                          </p>

                          <h3 className="text-xl font-extrabold text-slate-900 mt-1 line-clamp-2">
                            {product.title}
                          </h3>

                        </div>

                      </div>


                      <p className="text-2xl font-extrabold text-blue-700 mt-4">
                        PKR {product.price}
                      </p>


                      <div className="border-t border-slate-100 my-5"></div>


                      <Link to={`/edit-product/${product.id}`}>

                        <button className="inline-flex items-center gap-2 bg-slate-900 hover:bg-blue-700 text-white font-bold px-4 py-2.5 rounded-xl transition">
                          <Pencil size={16} />
                          Edit Product
                        </button>

                      </Link>

                    </div>

                  </article>

                ))}

              </div>

            )}

          </section>


          {/* SALES */}
          <section className="bg-white border border-slate-200 rounded-3xl shadow-sm p-7 md:p-8">

            <div className="mb-7">

              <span className="text-emerald-600 text-xs font-extrabold tracking-wider">
                SALES ACTIVITY
              </span>

              <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
                Recent Sales
              </h2>

              <p className="text-slate-500 mt-2">
                Track completed orders and buyers.
              </p>

            </div>


            {sales.length === 0 ? (

              <div className="text-center py-16">

                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <ShoppingBag size={27} />
                </div>

                <h3 className="text-xl font-bold text-slate-800 mt-5">
                  No sales yet
                </h3>

                <p className="text-slate-500 mt-2">
                  Your completed sales will appear here.
                </p>

              </div>

            ) : (

              <div className="space-y-4">

                {sales.map((sale) => (

                  <article
                    key={sale.id}
                    className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 border border-slate-200 rounded-2xl p-5 hover:shadow-md transition"
                  >

                    <div className="flex items-center gap-5">

                      <img
                        src={
                          sale.image_url
                            ? `${API_URL}${sale.image_url}`
                            : "https://placehold.co/120"
                        }
                        alt={sale.title}
                        className="w-20 h-20 rounded-xl object-cover"
                      />

                      <div>

                        <h3 className="text-lg font-extrabold text-slate-900">
                          {sale.title}
                        </h3>

                        <div className="flex items-center gap-2 text-slate-500 mt-2 text-sm">
                          <UserRound size={15} />
                          Buyer:{" "}
                          <span className="font-semibold text-slate-700">
                            {sale.buyer_name}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-slate-400 mt-1 text-sm">
                          <Clock3 size={14} />
                          {new Date(sale.created_at).toLocaleDateString()}
                        </div>

                      </div>

                    </div>


                    <div className="md:text-right">

                      <p className="text-2xl font-extrabold text-emerald-600">
                        PKR {sale.price}
                      </p>

                      <span className="inline-flex mt-2 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">
                        Completed
                      </span>

                    </div>

                  </article>

                ))}

              </div>

            )}

          </section>

        </div>

      </main>
    </>
  );
}


function StatCard({
  icon: Icon,
  label,
  value,
  tone,
}) {
  const themes = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-emerald-50 text-emerald-600",
    purple: "bg-violet-50 text-violet-600",
    orange: "bg-orange-50 text-orange-600",
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">

      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${themes[tone]}`}>
        <Icon size={22} />
      </div>

      <p className="text-slate-500 mt-5 font-medium">
        {label}
      </p>

      <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
        {value}
      </h2>

    </div>
  );
}

export default Dashboard;