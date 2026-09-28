const express = require("express");
const router = express.Router();
const galleryController = require("../controllers/galleryController");

// Public Gallery Page
router.get("/", galleryController.getGalleryPage);

// API for live AJAX filtering
router.get("/api", galleryController.getGalleryApi);

module.exports = router;
