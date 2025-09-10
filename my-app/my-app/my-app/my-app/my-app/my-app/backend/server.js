import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());
app.use(cors());

// 🔹 MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/smarteval", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error(err));

// 🔹 User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["student", "faculty"], required: true }
});

const User = mongoose.model("User", userSchema);

// 🔹 Register API
app.post("/register", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ email, password: hashedPassword, role });
    await user.save();

    res.json({ message: "✅ User registered successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🔹 Login API
app.post("/login", async (req, res) => {
  const { email, password, role } = req.body;

  const user = await User.findOne({ email, role });
  if (!user) return res.status(400).json({ error: "User not found" });

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return res.status(400).json({ error: "Invalid password" });

  const token = jwt.sign({ id: user._id, role: user.role }, "SECRET123", { expiresIn: "1h" });

  res.json({ message: "✅ Login successful", token });
});

app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
