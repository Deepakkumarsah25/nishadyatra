const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");

// Public contact page
router.get("/", contactController.getContactPage);

// Contact form submission
router.post("/submit", contactController.submitContactForm);

module.exports = router;
