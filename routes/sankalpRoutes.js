const express = require("express");
const router = express.Router();
const sankalpController = require("../controllers/sankalpmember");
const videoNewsController = require("../controllers/news/videoNewsController");

router.get("/", sankalpController.form);
router.post("/register", sankalpController.register);
router.get("/videos", videoNewsController.frontend);

module.exports = router;
