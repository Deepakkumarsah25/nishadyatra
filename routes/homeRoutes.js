const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");
const rateLimit = require("../middleware/rateLimit");
const submissionRateLimit = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: "Too many submissions. Please try again shortly.",
});

// Public Home
router.get("/", homeController.getHomePage);

// Form submissions
router.post("/api/submit-pledge", submissionRateLimit, homeController.submitPledge);
router.post("/api/submit-inquiry", submissionRateLimit, homeController.submitInitiativeInquiry);

module.exports = router;
