const express = require("express");
const router = express.Router();
const noticeController = require("../../controllers/admin/noticeController");

// View notices & quick info
router.get("/", noticeController.getNotices);

// Notice CRUD
router.post("/new", noticeController.postCreateNotice);
router.post("/edit/:id", noticeController.postEditNotice);
router.post("/delete/:id", noticeController.deleteNotice);
router.post("/toggle/:id", noticeController.toggleNoticeStatus);

// Quick contact info
router.post("/quick-info", noticeController.postUpdateQuickInfo);

module.exports = router;
