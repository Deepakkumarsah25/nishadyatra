const express = require("express");
const router = express.Router();
const galleryController = require("../../controllers/admin/galleryController");
const authMiddleware = require("../../middleware/admin/authMiddleware");
const { uploadSingle, uploadMultiple } = require("../../middleware/galleryUpload");

// All admin gallery routes require authentication
router.use(authMiddleware);

// Gallery list & management
router.get("/", galleryController.getGalleryList);

// Single upload & add
router.get("/new", galleryController.getCreatePhoto);
router.post("/new", uploadSingle, galleryController.postCreatePhoto);

// Bulk upload
router.get("/bulk", galleryController.getBulkUpload);
router.post("/bulk-upload", uploadMultiple, galleryController.postBulkUpload);

// Edit photo
router.get("/edit/:id", galleryController.getEditPhoto);
router.post("/edit/:id", uploadSingle, galleryController.postEditPhoto);

// Toggle publish/unpublish status
router.post("/toggle/:id", galleryController.togglePhotoPublish);

// Delete photo
router.post("/delete/:id", galleryController.deletePhoto);

module.exports = router;
