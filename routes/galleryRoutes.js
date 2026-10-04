const express = require("express");
const router = express.Router();
const galleryController = require("../controllers/galleryController");
const rateLimit = require("../middleware/rateLimit");
const galleryApiRateLimit = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  message: "Too many gallery searches. Please try again shortly.",
});
const galleryPageRateLimit = rateLimit({
  windowMs: 60 * 1000,
  max: 120,
  message: "Too many gallery requests. Please try again shortly.",
});

// Public Gallery Page
router.get("/", galleryPageRateLimit, galleryController.getGalleryPage);

// API for live AJAX filtering
router.get("/api", galleryApiRateLimit, galleryController.getGalleryApi);

module.exports = router;
