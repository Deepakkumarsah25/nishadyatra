const express = require("express");
const router = express.Router();
const inquiryController = require("../../controllers/admin/inquiryController");

// List inquiries & filter
router.get("/", inquiryController.getInquiries);

// Update status
router.post("/status/:id", inquiryController.updateInquiryStatus);

// Delete inquiry
router.post("/delete/:id", inquiryController.deleteInquiry);

module.exports = router;
