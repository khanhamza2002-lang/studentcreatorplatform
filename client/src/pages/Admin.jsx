import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

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

  // Load admin statistics
  const loadStats = async () => {
    try {
      const res = await fetch(
        "https://extraordinary-embrace-production-5820.up.railway.app/api/admin/stats",
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
      console.error("Failed to load stats:", error);
    }
  };

  // Load users
  const loadUsers = async () => {
    try {
      const res = await fetch(
        "https://extraordinary-embrace-production-5820.up.railway.app/api/admin/users",
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
      console.error("Failed to load users:", error);
    }
  };

  // Load products
  const loadProducts = async () => {
    try {
      const res = await fetch(
        "https://extraordinary-embrace-production-5820.up.railway.app/api/admin/products",
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
      console.error("Failed to load products:", error);
    }
  };

  // Delete product
  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      const res = await fetch(
        `https://extraordinary-embrace-production-5820.up.railway.app/api/admin/products/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (data.success) {
        alert("Product deleted.");

        setProducts((prev) =>
          prev.filter((product) => product.id !== id)
        );

        loadStats();
      } else {
        alert(data.message || "Failed to delete product.");
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  // Approve product
  const approveProduct = async (id) => {
    try {
      const res = await fetch(
        `https://extraordinary-embrace-production-5820.up.railway.app/api/admin/products/${id}/approve`,
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
              ? { ...product, approved: true }
              : product
          )
        );

        alert("Product approved successfully.");
      } else {
        alert(data.message || "Failed to approve product.");
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  // Delete user
  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      const res = await fetch(
        `https://extraordinary-embrace-production-5820.up.railway.app/api/admin/users/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (data.success) {
        alert("User deleted.");

        setUsers((prev) =>
          prev.filter((user) => user.id !== id)
        );

        loadStats();
      } else {
        alert(data.message || "Failed to delete user.");
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  if (!stats) {
    return (
      <>
        <Navbar />
        <h2 style={{ textAlign: "center", marginTop: "50px" }}>
          Loading...
        </h2>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div
        style={{
          maxWidth: "1200px",
          margin: "40px auto",
          padding: "20px",
        }}
      >
        <h1>Admin Dashboard</h1>

        {/* Statistics */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            margin: "30px 0 50px",
          }}
        >
          <div
            style={{
              flex: 1,
              background: "#2563eb",
              color: "white",
              padding: "25px",
              borderRadius: "10px",
            }}
          >
            <h2>{stats.users}</h2>
            <p>Total Users</p>
          </div>

          <div
            style={{
              flex: 1,
              background: "#16a34a",
              color: "white",
              padding: "25px",
              borderRadius: "10px",
            }}
          >
            <h2>{stats.products}</h2>
            <p>Total Products</p>
          </div>

          <div
            style={{
              flex: 1,
              background: "#dc2626",
              color: "white",
              padding: "25px",
              borderRadius: "10px",
            }}
          >
            <h2>{stats.messages}</h2>
            <p>Total Messages</p>
          </div>
        </div>

        {/* Users */}
        <h2>Users</h2>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "50px",
          }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.full_name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>

                <td>
                  <button
                    onClick={() => deleteUser(user.id)}
                    style={{
                      background: "#dc2626",
                      color: "white",
                      border: "none",
                      padding: "8px 14px",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Products */}
        <h2>Products</h2>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Seller</th>
              <th>Price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.title}</td>
                <td>{product.full_name}</td>
                <td>PKR {product.price}</td>

                <td>
                  {product.approved ? "Approved" : "Pending"}
                </td>

                <td>
                  {!product.approved && (
                    <button
                      onClick={() => approveProduct(product.id)}
                      style={{
                        background: "#16a34a",
                        color: "white",
                        border: "none",
                        padding: "8px 14px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        marginRight: "8px",
                      }}
                    >
                      Approve
                    </button>
                  )}

                  <button
                    onClick={() => deleteProduct(product.id)}
                    style={{
                      background: "#dc2626",
                      color: "white",
                      border: "none",
                      padding: "8px 14px",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Admin;