const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middleware/admin/authMiddleware");

// Sub-controllers and sub-routers
const homeManagerController = require("../../controllers/admin/homeManagerController");
const heroRoutes = require("./heroRoutes");
const initiativeRoutes = require("./initiativeRoutes");
const whyChooseRoutes = require("./whyChooseRoutes");
const noticeRoutes = require("./noticeRoutes");
const inquiryRoutes = require("./inquiryRoutes");
const homeAboutRoutes = require("./homeAboutRoutes");

// All home management routes require authenticated admin session
router.use(authMiddleware);

// Hub Dashboard
router.get("/", homeManagerController.getHomeDashboard);

// Modular Sub-sections
router.use("/hero", heroRoutes);
router.use("/about", homeAboutRoutes);
router.use("/initiatives", initiativeRoutes);
router.use("/why-choose", whyChooseRoutes);
router.use("/notices", noticeRoutes);
router.use("/inquiries", inquiryRoutes);

module.exports = router;
