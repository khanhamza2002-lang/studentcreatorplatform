import "./Login.css";

function Login() {
  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Welcome Back</h1>

        <p>Login to your Student Creator Platform account.</p>

        <input type="email" placeholder="Email Address" />

        <input type="password" placeholder="Password" />

        <button>Login</button>

        <span>
          Don't have an account? Register
        </span>
      </div>
    </div>
  );
}

export default Login;