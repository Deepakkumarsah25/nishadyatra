const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");
const rateLimit = require("../middleware/rateLimit");
const contactSubmissionRateLimit = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: "Too many messages. Please try again shortly.",
});

// Public contact page
router.get("/", contactController.getContactPage);

// Contact form submission
router.post("/submit", contactSubmissionRateLimit, contactController.submitContactForm);

module.exports = router;
