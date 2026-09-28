const express = require("express");

const router = express.Router();

const newsUpload = require("../../middleware/news/videoNewsUpload");
const authMiddleware = require("../../middleware/admin/authMiddleware");

const {
  adminList,
  addPage,
  create,
  delete: deleteNews,
  togglePublish,
  frontend,
} = require("../../controllers/news/videoNewsController");


/* =========================================
   FRONTEND
========================================= */

router.get("/news", frontend);


/* =========================================
   ADMIN
========================================= */

router.get("/admin/video_news", authMiddleware, adminList);

router.get(
  "/admin/video_news/add",
  authMiddleware, addPage
);

router.post(
  "/admin/video_news/add",
  authMiddleware, newsUpload.fields([
    {
      name: "video",
      maxCount: 1,
    },
    {
      name: "thumbnail",
      maxCount: 1,
    },
  ]),
  create
);

router.get("/admin/video_news/edit/:id", authMiddleware, addPage);
router.post("/admin/video_news/edit/:id", authMiddleware, newsUpload.fields([{ name: "video", maxCount: 1 }, { name: "thumbnail", maxCount: 1 }]), create);

router.post(
  "/admin/video_news/delete/:id",
  authMiddleware, deleteNews
);

router.post(
  "/admin/video_news/toggle/:id",
  authMiddleware, togglePublish
);


module.exports = router;
