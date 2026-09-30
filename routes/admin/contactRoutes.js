const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middleware/admin/authMiddleware");
const contactController = require("../../controllers/admin/contactController");
const contactUpload = require("../../middleware/contactUpload");

// All admin contact routes require authentication
router.use(authMiddleware);

// Contact Manager (Inbox & Settings tabs)
router.get("/", contactController.getContactManager);

// Update Page Settings (Supports file upload and URL)
router.post("/settings", contactUpload.single("bannerImageFile"), contactController.updateContactSettings);

// Update Message Status & Notes
router.post("/messages/status/:id", contactController.updateMessageStatus);

// Delete Message
router.post("/messages/delete/:id", contactController.deleteMessage);

module.exports = router;
