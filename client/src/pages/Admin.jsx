import { useEffect, useState } from "react";
import {
  Users,
  Package,
  MessageCircle,
  ShieldCheck,
  Check,
  Trash2,
  UserRound,
  Clock3,
} from "lucide-react";

import Navbar from "../components/Navbar";

const API_URL =
  "https://extraordinary-embrace-production-5820.up.railway.app";

function Admin() {
  const token = localStorage.getItem("token");

  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadStats();
    loadUsers();
    loadProducts();
  }, []);


  // ========================================
  // LOAD DATA
  // ========================================

  const loadStats = async () => {
    try {
      const res = await fetch(
        `${API_URL}/api/admin/stats`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (data.success) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error(
        "Failed to load stats:",
        error
      );
    }
  };


  const loadUsers = async () => {
    try {
      const res = await fetch(
        `${API_URL}/api/admin/users`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (data.success) {
        setUsers(data.users);
      }
    } catch (error) {
      console.error(
        "Failed to load users:",
        error
      );
    }
  };


  const loadProducts = async () => {
    try {
      const res = await fetch(
        `${API_URL}/api/admin/products`,
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
      console.error(
        "Failed to load products:",
        error
      );
    }
  };


  // ========================================
  // ADMIN ACTIONS
  // ========================================

  const deleteProduct = async (id) => {
    if (
      !window.confirm(
        "Delete this product?"
      )
    ) {
      return;
    }

    try {
      const res = await fetch(
        `${API_URL}/api/admin/products/${id}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (data.success) {
        setProducts((prev) =>
          prev.filter(
            (product) =>
              product.id !== id
          )
        );

        loadStats();

        alert("Product deleted.");
      } else {
        alert(
          data.message ||
            "Failed to delete product."
        );
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };


  const approveProduct = async (id) => {
    try {
      const res = await fetch(
        `${API_URL}/api/admin/products/${id}/approve`,
        {
          method: "PUT",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (data.success) {
        setProducts((prev) =>
          prev.map((product) =>
            product.id === id
              ? {
                  ...product,
                  approved: true,
                }
              : product
          )
        );

        alert(
          "Product approved successfully."
        );
      } else {
        alert(
          data.message ||
            "Failed to approve product."
        );
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };


  const deleteUser = async (id) => {
    if (
      !window.confirm(
        "Delete this user?"
      )
    ) {
      return;
    }

    try {
      const res = await fetch(
        `${API_URL}/api/admin/users/${id}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (data.success) {
        setUsers((prev) =>
          prev.filter(
            (user) => user.id !== id
          )
        );

        loadStats();

        alert("User deleted.");
      } else {
        alert(
          data.message ||
            "Failed to delete user."
        );
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };


  // ========================================
  // LOADING
  // ========================================

  if (!stats) {
    return (
      <>
        <Navbar />

        <div className="min-h-[70vh] flex items-center justify-center bg-slate-50">

          <div className="text-center">

            <div className="w-14 h-14 mx-auto rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin"></div>

            <p className="text-slate-500 mt-5 font-semibold">
              Loading administrator dashboard...
            </p>

          </div>

        </div>
      </>
    );
  }


  const pendingProducts =
    products.filter(
      (product) => !product.approved
    ).length;


  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50">

        {/* HEADER */}

        <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-blue-700 text-white">

          <div className="max-w-7xl mx-auto px-6 md:px-8 py-14">

            <div className="flex items-center gap-3">

              <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center">
                <ShieldCheck size={25} />
              </div>

              <div>

                <span className="text-blue-300 text-xs font-extrabold tracking-[0.2em]">
                  PLATFORM MANAGEMENT
                </span>

                <h1 className="text-4xl md:text-5xl font-extrabold mt-2">
                  Admin Dashboard
                </h1>

              </div>

            </div>


            <p className="text-slate-300 text-lg mt-5 max-w-2xl">
              Manage marketplace users, moderate listings and
              monitor platform activity.
            </p>

          </div>

        </section>


        <div className="max-w-7xl mx-auto px-6 md:px-8 py-10">

          {/* STATS */}

          <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">

            <AdminStat
              icon={Users}
              label="Total Users"
              value={stats.users}
              tone="blue"
            />

            <AdminStat
              icon={Package}
              label="Total Products"
              value={stats.products}
              tone="green"
            />

            <AdminStat
              icon={MessageCircle}
              label="Messages"
              value={stats.messages}
              tone="purple"
            />

            <AdminStat
              icon={Clock3}
              label="Pending Approval"
              value={pendingProducts}
              tone="orange"
            />

          </section>


          {/* USERS */}

          <section className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden mb-10">

            <div className="p-7 border-b border-slate-100">

              <span className="text-blue-600 text-xs font-extrabold tracking-wider">
                USER MANAGEMENT
              </span>

              <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
                Registered Users
              </h2>

              <p className="text-slate-500 mt-2">
                Review and manage user accounts.
              </p>

            </div>


            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-slate-50 text-left">

                  <tr>
                    <th className="px-6 py-4 text-xs uppercase tracking-wider text-slate-500">
                      User
                    </th>

                    <th className="px-6 py-4 text-xs uppercase tracking-wider text-slate-500">
                      Email
                    </th>

                    <th className="px-6 py-4 text-xs uppercase tracking-wider text-slate-500">
                      Role
                    </th>

                    <th className="px-6 py-4 text-xs uppercase tracking-wider text-slate-500">
                      Action
                    </th>
                  </tr>

                </thead>


                <tbody className="divide-y divide-slate-100">

                  {users.map((user) => (

                    <tr
                      key={user.id}
                      className="hover:bg-slate-50 transition"
                    >

                      <td className="px-6 py-5">

                        <div className="flex items-center gap-3">

                          <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                            <UserRound size={18} />
                          </div>

                          <div>

                            <p className="font-bold text-slate-800">
                              {user.full_name}
                            </p>

                            <p className="text-xs text-slate-400 mt-1">
                              ID #{user.id}
                            </p>

                          </div>

                        </div>

                      </td>


                      <td className="px-6 py-5 text-slate-600">
                        {user.email}
                      </td>


                      <td className="px-6 py-5">

                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${
                            user.role === "admin"
                              ? "bg-violet-50 text-violet-700"
                              : "bg-blue-50 text-blue-700"
                          }`}
                        >
                          {user.role}
                        </span>

                      </td>


                      <td className="px-6 py-5">

                        <button
                          onClick={() =>
                            deleteUser(user.id)
                          }
                          className="inline-flex items-center gap-2 text-red-600 hover:bg-red-50 font-bold text-sm px-3 py-2 rounded-lg transition"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </section>


          {/* PRODUCTS */}

          <section className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">

            <div className="p-7 border-b border-slate-100">

              <span className="text-emerald-600 text-xs font-extrabold tracking-wider">
                MARKETPLACE MODERATION
              </span>

              <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
                Product Listings
              </h2>

              <p className="text-slate-500 mt-2">
                Approve pending listings or remove inappropriate products.
              </p>

            </div>


            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-slate-50 text-left">

                  <tr>

                    <th className="px-6 py-4 text-xs uppercase tracking-wider text-slate-500">
                      Product
                    </th>

                    <th className="px-6 py-4 text-xs uppercase tracking-wider text-slate-500">
                      Seller
                    </th>

                    <th className="px-6 py-4 text-xs uppercase tracking-wider text-slate-500">
                      Price
                    </th>

                    <th className="px-6 py-4 text-xs uppercase tracking-wider text-slate-500">
                      Status
                    </th>

                    <th className="px-6 py-4 text-xs uppercase tracking-wider text-slate-500">
                      Actions
                    </th>

                  </tr>

                </thead>


                <tbody className="divide-y divide-slate-100">

                  {products.map((product) => (

                    <tr
                      key={product.id}
                      className="hover:bg-slate-50 transition"
                    >

                      <td className="px-6 py-5">

                        <p className="font-bold text-slate-800">
                          {product.title}
                        </p>

                        <p className="text-xs text-slate-400 mt-1">
                          Product #{product.id}
                        </p>

                      </td>


                      <td className="px-6 py-5 text-slate-600">
                        {product.full_name}
                      </td>


                      <td className="px-6 py-5 font-extrabold text-blue-700">
                        PKR {product.price}
                      </td>


                      <td className="px-6 py-5">

                        {product.approved ? (

                          <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-xs font-bold">

                            <Check size={13} />

                            Approved

                          </span>

                        ) : (

                          <span className="inline-flex items-center gap-1.5 bg-orange-50 text-orange-700 px-3 py-1.5 rounded-full text-xs font-bold">

                            <Clock3 size={13} />

                            Pending

                          </span>

                        )}

                      </td>


                      <td className="px-6 py-5">

                        <div className="flex items-center gap-2">

                          {!product.approved && (

                            <button
                              onClick={() =>
                                approveProduct(
                                  product.id
                                )
                              }
                              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-3 py-2 rounded-lg transition"
                            >
                              <Check size={15} />
                              Approve
                            </button>

                          )}


                          <button
                            onClick={() =>
                              deleteProduct(
                                product.id
                              )
                            }
                            className="inline-flex items-center gap-2 text-red-600 hover:bg-red-50 font-bold text-sm px-3 py-2 rounded-lg transition"
                          >
                            <Trash2 size={15} />
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </section>

        </div>

      </main>
    </>
  );
}


function AdminStat({
  icon: Icon,
  label,
  value,
  tone,
}) {
  const themes = {
    blue:
      "bg-blue-50 text-blue-600",
    green:
      "bg-emerald-50 text-emerald-600",
    purple:
      "bg-violet-50 text-violet-600",
    orange:
      "bg-orange-50 text-orange-600",
  };

  return (
    <article className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">

      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center ${themes[tone]}`}
      >
        <Icon size={22} />
      </div>

      <p className="text-slate-500 mt-5 font-medium">
        {label}
      </p>

      <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
        {value}
      </h2>

    </article>
  );
}

export default Admin;