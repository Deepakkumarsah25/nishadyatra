const express = require("express");
const router = express.Router();
const sankalpController = require("../controllers/sankalpmember");
const videoNewsController = require("../controllers/news/videoNewsController");
const rateLimit = require("../middleware/rateLimit");
const registrationRateLimit = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: "Too many registrations. Please try again shortly.",
});

router.get("/", sankalpController.form);
router.post("/register", registrationRateLimit, sankalpController.register);
router.get("/videos", videoNewsController.frontend);

module.exports = router;
