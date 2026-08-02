import "./Dashboard.css";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <>
      <Navbar />

      <div className="dashboard">

        <div className="dashboard-header">

          <div>
            <h1>Seller Dashboard</h1>
            <p>Manage your products and marketplace activity.</p>
          </div>

          <Link to="/upload">
            <button className="upload-btn">
              + Upload Product
            </button>
          </Link>

        </div>

        <div className="stats">

          <div className="stat-card">
            <h2>12</h2>
            <p>Total Products</p>
          </div>

          <div className="stat-card">
            <h2>3</h2>
            <p>Pending</p>
          </div>

          <div className="stat-card">
            <h2>PKR 18,000</h2>
            <p>Total Sales</p>
          </div>

          <div className="stat-card">
            <h2>7</h2>
            <p>Messages</p>
          </div>

        </div>

        <div className="dashboard-products">

          <h2>My Products</h2>

          <table>

            <thead>

              <tr>

                <th>Product</th>

                <th>Category</th>

                <th>Price</th>

                <th>Status</th>

                <th>Action</th>

              </tr>

            </thead>

            <tbody>

              <tr>

                <td>Website Template</td>

                <td>Software</td>

                <td>PKR 2500</td>

                <td className="approved">Approved</td>

                <td><button>Edit</button></td>

              </tr>

              <tr>

                <td>Study Notes</td>

                <td>Notes</td>

                <td>PKR 800</td>

                <td className="pending">Pending</td>

                <td><button>Edit</button></td>

              </tr>

            </tbody>

          </table>

        </div>

      </div>
    </>
  );
}

export default Dashboard;