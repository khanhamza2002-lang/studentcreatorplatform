import "./Profile.css";
import Navbar from "../components/Navbar";

function Profile() {
  return (
    <>
      <Navbar />

      <div className="profile-container">
        <div className="profile-card">

          <img
            src="https://placehold.co/150x150"
            alt="Profile"
          />

          <h1>Hamza</h1>

          <p>TMUC Student</p>

          <button>Edit Profile</button>

        </div>

        <div className="profile-products">

          <h2>My Products</h2>

          <div className="product-box">
            Website Template — PKR 2500
          </div>

          <div className="product-box">
            Study Notes — PKR 800
          </div>

        </div>
      </div>
    </>
  );
}

export default Profile;