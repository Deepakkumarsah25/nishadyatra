const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const sankalpRoutes = require("./routes/sankalpRoutes");
const videoNewsRoutes = require("./routes/news/videoNewsRoutes");
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
  console.error("MONGODB_URI is missing in .env");
  process.exit(1);
}

if (!process.env.SESSION_SECRET) {
  console.error("SESSION_SECRET is missing in .env");
  process.exit(1);
}

// ========================================
// Config
// ========================================

const sessionConfig = require("./config/session");
const createDefaultAdmin = require("./config/createAdmin");
const { seedHomeData } = require("./scripts/seedHomeData");
const { seedGalleryData } = require("./scripts/seedGalleryData");

// ========================================
// Routes
// ========================================

const adminAuthRoutes = require("./routes/admin/authRoutes");
const adminDashboardRoutes = require("./routes/admin/dashboardRoutes");
const adminGalleryRoutes = require("./routes/admin/galleryRoutes");
const adminHomeRoutes = require("./routes/admin/homeRoutes");
const adminKalashYatraRoutes = require("./routes/admin/kalashYatraRoutes");
const KalashYatra = require("./models/KalashYatra");
const homeRoutes = require("./routes/homeRoutes");
const galleryRoutes = require("./routes/galleryRoutes");

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
app.use("/sankalp-yatra", sankalpRoutes);
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

// ================================
app.use(sessionConfig);
app.use(videoNewsRoutes);

// ========================================
// Admin Routes
// ========================================

app.use("/admin", adminAuthRoutes);
app.use("/admin", adminDashboardRoutes);
app.use("/admin/gallery", adminGalleryRoutes);
app.use("/admin/home", adminHomeRoutes);
app.use("/admin/kalash-yatra", adminKalashYatraRoutes);

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
// Public Video Page (Kalash Yatra)
// ========================================

app.get("/video", async (req, res) => {
  try {
    const kalash = await KalashYatra.getOrSeed();
    res.render("videos/kalash-yatra", {
      kalash,
      currentUrl: "/video",
    });
  } catch (error) {
    console.error("Fetch kalash yatra error:", error);
    res.render("videos/kalash-yatra", {
      kalash: KalashYatra.defaultData,
      currentUrl: "/video",
    });
  }
});

// ========================================
// Public Gallery & Home Routes
// ========================================

app.use("/gallery", galleryRoutes);
app.use("/sankalp-photos", (req, res) => res.redirect("/gallery"));
app.use("/", homeRoutes);

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
    error: err.message,
  });
});

// ========================================
// MongoDB + Server Start
// ========================================

const startServer = async () => {
  try {
    // Connect MongoDB
    await mongoose.connect(MONGODB_URI);

    // Automatically create admin if not exists
    await createDefaultAdmin();

    // Automatically seed default home page data if empty
    await seedHomeData();

    // Automatically seed default gallery photos if empty
    await seedGalleryData();

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Server Startup Error:", error.message);
    process.exit(1);
  }
};

// ========================================
// Start Application
// ========================================

startServer();
