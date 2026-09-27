const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();

// ========================================
// Environment Variables
// ========================================

const PORT = process.env.PORT || 9191;
const MONGODB_URI = process.env.MONGODB_URI;

// ========================================
// Validate Environment
// ========================================

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI is missing in .env");
  process.exit(1);
}

if (!process.env.SESSION_SECRET) {
  console.error("❌ SESSION_SECRET is missing in .env");
  process.exit(1);
}

// ========================================
// Config
// ========================================

const sessionConfig = require("./config/session");
const createDefaultAdmin = require("./config/createAdmin");

// ========================================
// Admin Routes
// ========================================

const adminAuthRoutes = require("./routes/admin/authRoutes");
const adminDashboardRoutes = require("./routes/admin/dashboardRoutes");

// ========================================
// View Engine
// ========================================

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ========================================
// Basic Security Headers
// ========================================

app.disable("x-powered-by");

// ========================================
// Body Parser
// ========================================

app.use(
  express.urlencoded({
    extended: true,
    limit: "1mb",
  })
);

app.use(
  express.json({
    limit: "1mb",
  })
);

// ========================================
// Static Files
// ========================================

app.use(express.static(path.join(__dirname, "public")));

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

// ========================================
// Session
// ========================================

app.use(sessionConfig);

// ========================================
// Admin Routes
// ========================================

app.use("/admin", adminAuthRoutes);

app.use("/admin", adminDashboardRoutes);

// ========================================
// Test API
// ========================================

app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "API is working",
  });
});

// ========================================
// Home
// ========================================

app.get("/video",(req,res)=>{
  res.render("videos/kalash-yatra.ejs")
})

app.get("/", (req, res) => {
  res.render("index", {
    title: "Home",
  });
});

// ========================================
// 404 Handler
// ========================================

app.use((req, res) => {
  res.status(404).render("error", {
    title: "404",
    message: "Page not found",
  });
});

// ========================================
// Error Handler
// ========================================

app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

// ========================================
// MongoDB + Server Start
// ========================================

const startServer = async () => {
  try {
    await mongoose.connect(MONGODB_URI);

    console.log("================================");
    console.log("✅ MongoDB Connected");
    console.log("================================");

    // Automatically create admin if not exists
    await createDefaultAdmin();

    app.listen(PORT, () => {
      console.log("================================");
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(
        `🔐 Admin Login: http://localhost:${PORT}/admin/login`
      );
      console.log(
        `📊 Admin Dashboard: http://localhost:${PORT}/admin/dashboard`
      );
      console.log("================================");
    });
  } catch (error) {
    console.error("❌ Server Startup Error:", error.message);
    process.exit(1);
  }
};

startServer();