const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();

// ================================
// Environment Variables
// ================================
const PORT = process.env.PORT || 6000;
const MONGODB_URI = process.env.MONGODB_URI;

// ================================
// View Engine
// ================================
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ================================
// Middleware
// ================================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Public folder
app.use(express.static(path.join(__dirname, "public")));

// Uploads folder
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

// ================================
// MongoDB Connection
// ================================
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((error) => {
    console.error("❌ MongoDB Connection Error:", error.message);
  });

// ================================
// Test API
// ================================
app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "API is working",
  });
});

// ================================
// Home
// ================================
app.get("/", (req, res) => {
  res.render("index", {
    title: "Home",
  });
});

// ================================
// 404 Handler
// ================================
app.use((req, res) => {
  res.status(404).render("error", {
    title: "404",
    message: "Page not found",
  });
});

// ================================
// Error Handler
// ================================
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: err.message,
  });
});

// ================================
// Start Server
// ================================
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});