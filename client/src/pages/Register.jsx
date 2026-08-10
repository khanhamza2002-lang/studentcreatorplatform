import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  UserRound,
  Mail,
  Lock,
  UserPlus,
  ShieldCheck,
  Sparkles,
  ShoppingBag,
} from "lucide-react";

import "./Register.css";

const API_URL =
  "https://extraordinary-embrace-production-5820.up.railway.app";

function Register() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!fullName || !email || !password || !confirmPassword) {
      alert("Please complete all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            full_name: fullName,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Registration Successful!");

        setFullName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");

        navigate("/login");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="register-page">

      {/* LEFT VISUAL */}
      <section className="register-showcase">

        <div className="register-showcase-content">

          <div className="register-brand">
            <ShoppingBag size={24} />
            Student Marketplace
          </div>

          <span className="register-eyebrow">
            JOIN THE COMMUNITY
          </span>

          <h1>
            Create.
            <br />
            Showcase.
            <br />
            <span>Grow.</span>
          </h1>

          <p>
            Join a marketplace built for student creators, buyers and
            entrepreneurs across the TMUC community.
          </p>


          <div className="register-benefits">

            <div>
              <ShieldCheck size={20} />
              <span>Moderated and approved listings</span>
            </div>

            <div>
              <Sparkles size={20} />
              <span>Showcase your creativity and ideas</span>
            </div>

          </div>

        </div>

      </section>


      {/* FORM */}
      <section className="register-panel">

        <div className="register-card">

          <span className="register-form-label">
            GET STARTED
          </span>

          <h2>Create your account</h2>

          <p className="register-description">
            Join the Student Creator Platform and start exploring.
          </p>


          <div className="register-form">

            <div className="register-field">

              <label>Full Name</label>

              <div className="register-input">

                <UserRound size={19} />

                <input
                  type="text"
                  placeholder="Your full name"
                  value={fullName}
                  onChange={(e) =>
                    setFullName(e.target.value)
                  }
                />

              </div>

            </div>


            <div className="register-field">

              <label>Email Address</label>

              <div className="register-input">

                <Mail size={19} />

                <input
                  type="email"
                  placeholder="student@example.com"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                />

              </div>

            </div>


            <div className="register-field">

              <label>Password</label>

              <div className="register-input">

                <Lock size={19} />

                <input
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                />

              </div>

            </div>


            <div className="register-field">

              <label>Confirm Password</label>

              <div className="register-input">

                <Lock size={19} />

                <input
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                />

              </div>

            </div>


            <button
              className="register-button"
              onClick={handleRegister}
              disabled={loading}
            >
              <UserPlus size={19} />

              {loading
                ? "Creating account..."
                : "Create Account"}
            </button>

          </div>


          <div className="register-divider">
            <span>Already registered?</span>
          </div>


          <p className="register-login">
            Already have an account?{" "}

            <Link to="/login">
              Sign in
            </Link>
          </p>

        </div>

      </section>

    </main>
  );
}

export default Register;