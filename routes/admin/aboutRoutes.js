const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middleware/admin/authMiddleware");
const aboutController = require("../../controllers/admin/aboutController");
const aboutUpload = require("../../middleware/about/aboutUpload");

// All admin routes require authentication
router.use(authMiddleware);

// Main dashboard / tabbed interface
router.get("/", aboutController.getAboutManager);

// Section update routes (Only Vision, Activities, and Messages have imagery on UI)
router.post("/meta", aboutController.postUpdateMeta);
router.post("/objective", aboutController.postUpdateObjective);
router.post("/mission", aboutController.postUpdateMission);
router.post("/vision", aboutUpload.single("imageFile"), aboutController.postUpdateVision);
router.post("/background", aboutController.postUpdateBackground);
router.post("/reservation", aboutController.postUpdateReservation);
router.post("/activities", aboutUpload.any(), aboutController.postUpdateActivities);
router.post("/messages", aboutUpload.any(), aboutController.postUpdateMessages);

// Gallery management
router.post("/gallery/info", aboutController.postUpdateGalleryInfo);
router.post("/gallery/add", aboutUpload.single("photoFile"), aboutController.postAddGalleryPhoto);
router.post("/gallery/delete/:photoId", aboutController.postDeleteGalleryPhoto);

module.exports = router;
