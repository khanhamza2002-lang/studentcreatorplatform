import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        "https://extraordinary-embrace-production-5820.up.railway.app/api/orders/my-orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (data.success) {
        setOrders(data.orders);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />

      <div
        style={{
          maxWidth: "1100px",
          margin: "40px auto",
          padding: "20px",
        }}
      >
        <h1>🛒 My Orders</h1>

        {orders.length === 0 ? (
          <p>You haven't purchased anything yet.</p>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              style={{
                display: "flex",
                gap: "20px",
                padding: "20px",
                border: "1px solid #ddd",
                borderRadius: "10px",
                marginBottom: "20px",
              }}
            >
              <img
                src={
                  order.image_url
                    ? `https://extraordinary-embrace-production-5820.up.railway.app${order.image_url}`
                    : "https://placehold.co/150"
                }
                alt={order.title}
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />

              <div>
                <h2>{order.title}</h2>

                <h3>PKR {order.price}</h3>

                <p>
                  <strong>Seller:</strong> {order.seller_name}
                </p>

                <p>
                  Purchased on{" "}
                  {new Date(order.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default MyOrders;