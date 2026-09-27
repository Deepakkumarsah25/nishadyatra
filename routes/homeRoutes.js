const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");

// Public Home
router.get("/", homeController.getHomePage);

// Form submissions
router.post("/api/submit-pledge", homeController.submitPledge);
router.post("/api/submit-inquiry", homeController.submitInitiativeInquiry);

module.exports = router;
