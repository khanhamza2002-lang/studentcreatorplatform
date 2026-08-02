import "./Register.css";

function Register() {
  return (
    <div className="register-container">
      <div className="register-card">
        <h1>Create Account</h1>

        <p>Join the Student Creator Platform.</p>

        <input type="text" placeholder="Full Name" />

        <input type="email" placeholder="Email Address" />

        <input type="password" placeholder="Password" />

        <input type="password" placeholder="Confirm Password" />

        <button>Create Account</button>

        <span>
          Already have an account? Login
        </span>
      </div>
    </div>
  );
}

export default Register;