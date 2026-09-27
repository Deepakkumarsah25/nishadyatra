const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middleware/admin/authMiddleware");
const kalashYatraController = require("../../controllers/admin/kalashYatraController");

// Require authentication for all admin kalash-yatra routes
router.use(authMiddleware);

// Main dashboard / tabbed interface
router.get("/", kalashYatraController.getKalashYatraManager);

// Section update routes
router.post("/hero", kalashYatraController.postUpdateHero);
router.post("/milestones", kalashYatraController.postUpdateMilestones);
router.post("/videos/add", kalashYatraController.postAddVideo);
router.post("/videos/update/:videoId", kalashYatraController.postUpdateVideo);
router.post("/videos/delete/:videoId", kalashYatraController.postDeleteVideo);
router.post("/pillars", kalashYatraController.postUpdatePillars);

module.exports = router;
