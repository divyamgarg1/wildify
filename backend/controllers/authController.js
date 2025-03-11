const jwt = require("jsonwebtoken");
const User = require("../models/User");

const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    console.log("Signup attempt:", { name, email, password, role }); // Debug log
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      console.log("Email already in use:", email); // Debug log
      return res.status(400).json({ error: "Email already in use" });
    }

    const user = await User.create({
      name,
      email,
      password, // Plain text since you removed bcrypt
      role: role || "viewer",
    });

    res.status(201).json({ message: "User registered successfully", userId: user.id });
  } catch (error) {
    console.error("Signup error:", error); // Debug log
    res.status(500).json({ error: "Registration failed", details: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("Login attempt:", { email, password }); // Debug log
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log("User not found:", email); // Debug log
      return res.status(404).json({ error: "User not found" });
    }

    console.log("Stored user:", { email: user.email, password: user.password, role: user.role }); // Debug log
    if (password !== user.password) {
      console.log("Password mismatch:", { input: password, stored: user.password }); // Debug log
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, role: user.role });
  } catch (error) {
    console.error("Login error:", error); // Debug log
    res.status(500).json({ error: "Login failed", details: error.message });
  }
};

module.exports = { registerUser, loginUser };