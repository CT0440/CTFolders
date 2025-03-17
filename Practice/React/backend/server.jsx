const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config(); // Load environment variables from .env file

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// ⬇️ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));

// ⬇️ User Schema
const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", UserSchema);

// ➤ SIGNUP API (Hash Password before saving)
app.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({ message: "User details are saved successfully" });
  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({ message: "❌ Server error during signup" });
  }
});

// ➤ SIGNIN API (Validate and generate JWT token)
app.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    return res.status(200).json({ message: "Signin successful", token });
  } catch (error) {
    console.error("Signin Error:", error);
    return res.status(500).json({ message: "❌ Server error during signin" });
  }
});

// ➤ FETCH ALL USERS API
app.get("/get", async (req, res) => {
  try {
    const users = await User.find({}, "email"); // Fetch only emails, excluding passwords
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ➤ Root Route
app.get("/", (req, res) => {
  res.send("Server is running successfully!");
});

// ➤ Start the Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
