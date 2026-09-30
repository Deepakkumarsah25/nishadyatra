const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middleware/admin/authMiddleware");
const kalashYatraController = require("../../controllers/admin/kalashYatraController");
const { kalashVideoUpload } = require("../../middleware/kalashVideoUpload");

// Require authentication for all admin kalash-yatra routes
router.use(authMiddleware);

// Main dashboard / tabbed interface
router.get("/", kalashYatraController.getKalashYatraManager);

// Section update routes
router.post("/hero", kalashYatraController.postUpdateHero);
router.post("/milestones", kalashYatraController.postUpdateMilestones);
router.post("/videos/add", kalashVideoUpload, kalashYatraController.postAddVideo);
router.post("/videos/update/:videoId", kalashVideoUpload, kalashYatraController.postUpdateVideo);
router.post("/videos/delete/:videoId", kalashYatraController.postDeleteVideo);
router.post("/pillars", kalashYatraController.postUpdatePillars);
router.post("/pledge", kalashYatraController.postUpdatePledge);

module.exports = router;
