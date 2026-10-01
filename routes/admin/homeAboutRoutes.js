const express = require("express");
const router = express.Router();
const homeAboutController = require("../../controllers/admin/homeAboutController");
const { uploadHomeAboutImage } = require("../../middleware/homeAboutUpload");

// View & Edit Home About Highlight section
router.get("/", homeAboutController.getHomeAbout);
router.post("/update", uploadHomeAboutImage, homeAboutController.postUpdateHomeAbout);

module.exports = router;
