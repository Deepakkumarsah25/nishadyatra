const express = require("express");
const router = express.Router();
const heroController = require("../../controllers/admin/heroController");

// List all slides
router.get("/", heroController.getHeroSlides);

// Create slide form & post
router.get("/new", heroController.getCreateHeroSlide);
router.post("/new", heroController.postCreateHeroSlide);

// Edit slide form & post
router.get("/edit/:id", heroController.getEditHeroSlide);
router.post("/edit/:id", heroController.postEditHeroSlide);

// Delete & status toggle
router.post("/delete/:id", heroController.deleteHeroSlide);
router.post("/toggle/:id", heroController.toggleHeroSlideStatus);

module.exports = router;
