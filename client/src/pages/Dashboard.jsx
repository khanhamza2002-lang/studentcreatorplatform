import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

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
        "http://localhost:5000/api/products/my-products",
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
        "http://localhost:5000/api/orders/my-sales",
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
    (p) => !p.sold
  ).length;

  const soldProducts = products.filter(
    (p) => p.sold
  ).length;

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100">

        <div className="max-w-7xl mx-auto px-8 py-10">

          <div className="flex justify-between items-center mb-10">

            <div>

              <h1 className="text-4xl font-bold">
                Welcome back,
                <span className="text-blue-600">
                  {" "}
                  {user.full_name}
                </span>
              </h1>

              <p className="text-gray-500 mt-2">
                Manage your products and monitor your sales.
              </p>

            </div>

            <Link to="/upload-product">

              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-lg transition">

                + Upload Product

              </button>

            </Link>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

            <div className="bg-white rounded-2xl shadow-lg p-6">

              <p className="text-gray-500">
                Total Products
              </p>

              <h2 className="text-4xl font-bold mt-2 text-blue-600">
                {products.length}
              </h2>

            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">

              <p className="text-gray-500">
                Total Sales
              </p>

              <h2 className="text-4xl font-bold mt-2 text-green-600">
                {sales.length}
              </h2>

            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">

              <p className="text-gray-500">
                Revenue
              </p>

              <h2 className="text-4xl font-bold mt-2 text-purple-600">
                PKR {revenue}
              </h2>

            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">

              <p className="text-gray-500">
                Active Listings
              </p>

              <h2 className="text-4xl font-bold mt-2 text-orange-500">
                {activeProducts}
              </h2>

            </div>

          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 mb-10">

            <h2 className="text-3xl font-bold mb-6">
              My Products
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

              {products.map((product) => (

                <div
                  key={product.id}
                  className="rounded-2xl overflow-hidden border hover:shadow-xl transition"
                >

                  <img
                    src={
                      product.image_url
                        ? `http://localhost:5000${product.image_url}`
                        : "https://placehold.co/600x400"
                    }
                    alt={product.title}
                    className="w-full h-56 object-cover"
                  />

                  <div className="p-5">

                    <div className="flex justify-between items-center">

                      <h3 className="text-xl font-bold">
                        {product.title}
                      </h3>

                      {product.sold ? (
                        <span className="bg-red-600 text-white text-xs px-3 py-1 rounded-full">
                          SOLD
                        </span>
                      ) : (
                        <span className="bg-green-600 text-white text-xs px-3 py-1 rounded-full">
                          ACTIVE
                        </span>
                      )}

                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6">

  <p className="text-gray-500">
    Sold Listings
  </p>

  <h2 className="text-4xl font-bold mt-2 text-red-600">
    {soldProducts}
  </h2>

</div>

                    <p className="text-blue-700 text-2xl font-bold mt-3">
                      PKR {product.price}
                    </p>

                    <div className="flex gap-3 mt-5">

                      <Link
                        to={`/edit-product/${product.id}`}
                      >
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">

                          Edit

                        </button>
                      </Link>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8">

  <h2 className="text-3xl font-bold mb-6">
    Recent Sales
  </h2>

  {sales.length === 0 ? (

    <div className="text-center py-16">

      <h3 className="text-2xl font-semibold text-gray-500">
        No sales yet
      </h3>

      <p className="text-gray-400 mt-2">
        Your sold products will appear here.
      </p>

    </div>

  ) : (

    <div className="space-y-5">

      {sales.map((sale) => (

        <div
          key={sale.id}
          className="flex items-center justify-between border rounded-xl p-5 hover:shadow-md transition"
        >

          <div className="flex items-center gap-5">

            <img
              src={
                sale.image_url
                  ? `http://localhost:5000${sale.image_url}`
                  : "https://placehold.co/120"
              }
              alt={sale.title}
              className="w-24 h-24 rounded-xl object-cover"
            />

            <div>

              <h3 className="text-xl font-bold">
                {sale.title}
              </h3>

              <p className="text-gray-600">
                Buyer:
                <strong> {sale.buyer_name}</strong>
              </p>

              <p className="text-gray-500">
                {new Date(sale.created_at).toLocaleDateString()}
              </p>

            </div>

          </div>

          <div className="text-right">

            <h2 className="text-2xl font-bold text-green-600">
              PKR {sale.price}
            </h2>

            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
              Completed
            </span>

          </div>

        </div>

      ))}

    </div>

  )}

</div>

</div>

</div>

</>

);
}

export default Dashboard;