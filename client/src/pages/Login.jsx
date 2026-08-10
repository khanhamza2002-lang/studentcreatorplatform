import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  LogIn,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
} from "lucide-react";

import "./Login.css";

const API_URL =
  "https://extraordinary-embrace-production-5820.up.railway.app";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/api/auth/login`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("token", data.token);

        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

        alert("Login Successful!");

        navigate("/dashboard");
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

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <main className="login-page">

      {/* LEFT SIDE */}
      <section className="login-showcase">

        <div className="login-showcase-content">

          <div className="login-brand">
            <ShoppingBag size={24} />
            Student Marketplace
          </div>

          <span className="login-eyebrow">
            TMUC STUDENT COMMUNITY
          </span>

          <h1>
            Discover.
            <br />
            Create.
            <br />
            <span>Connect.</span>
          </h1>

          <p>
            Join a student marketplace built for discovering
            products, supporting creators and turning ideas into
            opportunities.
          </p>


          <div className="login-benefits">

            <div>
              <ShieldCheck size={20} />

              <span>
                Moderated and approved marketplace listings
              </span>
            </div>

            <div>
              <Sparkles size={20} />

              <span>
                Created around student talent and creativity
              </span>
            </div>

          </div>

        </div>

      </section>


      {/* LOGIN FORM */}
      <section className="login-panel">

        <div className="login-card">

          <span className="login-form-label">
            WELCOME BACK
          </span>

          <h2>Sign in to your account</h2>

          <p className="login-description">
            Continue to your Student Creator Platform dashboard.
          </p>


          <div className="login-form">

            <div className="login-field">

              <label>Email Address</label>

              <div className="login-input">

                <Mail size={19} />

                <input
                  type="email"
                  placeholder="student@example.com"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  onKeyDown={handleKeyDown}
                />

              </div>

            </div>


            <div className="login-field">

              <label>Password</label>

              <div className="login-input">

                <Lock size={19} />

                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  onKeyDown={handleKeyDown}
                />

              </div>

            </div>


            <button
              className="login-button"
              onClick={handleLogin}
              disabled={loading}
            >
              <LogIn size={19} />

              {loading
                ? "Signing in..."
                : "Sign In"}
            </button>

          </div>


          <div className="login-divider">
            <span>New to the marketplace?</span>
          </div>


          <p className="login-register">
            Don't have an account?{" "}

            <Link to="/register">
              Create an account
            </Link>
          </p>

        </div>

      </section>

    </main>
  );
}

export default Login;