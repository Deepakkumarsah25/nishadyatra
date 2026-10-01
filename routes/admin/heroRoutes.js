const express = require("express");
const router = express.Router();
const heroController = require("../../controllers/admin/heroController");
const { uploadHeroImage } = require("../../middleware/heroUpload");

// List all slides
router.get("/", heroController.getHeroSlides);

// Create slide form & post
router.get("/new", heroController.getCreateHeroSlide);
router.post("/new", uploadHeroImage, heroController.postCreateHeroSlide);

// Edit slide form & post
router.get("/edit/:id", heroController.getEditHeroSlide);
router.post("/edit/:id", uploadHeroImage, heroController.postEditHeroSlide);

// Delete & status toggle & restore defaults
router.post("/delete/:id", heroController.deleteHeroSlide);
router.post("/toggle/:id", heroController.toggleHeroSlideStatus);
router.post("/restore-defaults", heroController.restoreDefaultSlides);

module.exports = router;
