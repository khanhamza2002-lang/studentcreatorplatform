const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { full_name, email, password } = req.body;

    // Check if all fields are provided
    if (!full_name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields.",
      });
    }

    // Check if email already exists
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Email already registered.",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    await pool.query(
      "INSERT INTO users (full_name, email, password) VALUES ($1, $2, $3)",
      [full_name, email, hashedPassword]
    );

    res.status(201).json({
      success: true,
      message: "User registered successfully!",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (user.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].password
    );

    if (!validPassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
  {
    id: user.rows[0].id,
    email: user.rows[0].email,
    role: user.rows[0].role,
  },
  "studentcreatorplatformsecret",
  {
    expiresIn: "7d",
  }
);

    res.json({
      success: true,
      token,
      user: {
  id: user.rows[0].id,
  full_name: user.rows[0].full_name,
  email: user.rows[0].email,
  role: user.rows[0].role,
},
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
module.exports = {
  registerUser,
  loginUser,
};