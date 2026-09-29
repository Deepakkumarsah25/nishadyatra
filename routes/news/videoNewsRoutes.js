const express = require("express");

const router = express.Router();
const newsUpload = require("../../middleware/news/videoNewsUpload");
const authMiddleware = require("../../middleware/admin/authMiddleware");

const {
  adminList,
  saveHeroPoster,
  deleteHeroPoster,
  addPage,
  create,
  delete: deleteNews,
  togglePublish,
  frontend,
  detail,
} = require("../../controllers/news/videoNewsController");

function uploadThumbnail(req, res, next) {
  newsUpload.single("thumbnail")(req, res, (error) => {
    if (!error) return next();

    res.status(400).render("admin/news/editor", {
      title: req.params.id ? "Edit News" : "Create News",
      item: { ...req.body, _id: req.params.id },
      error: error.message,
      currentPath: "/admin/video_news",
    });
  });
}

function uploadHeroPoster(req, res, next) {
  newsUpload.single("heroPoster")(req, res, (error) => {
    if (error) {
      const params = new URLSearchParams({ posterError: error.message });
      return res.redirect(`/admin/video_news?${params.toString()}`);
    }
    next();
  });
}

// Public News & Press pages.
router.get("/news", frontend);
router.get("/news/:id", detail);

// Protected news management pages.
router.get("/admin/video_news", authMiddleware, adminList);
router.post("/admin/video_news/hero-poster", authMiddleware, uploadHeroPoster, saveHeroPoster);
router.post("/admin/video_news/hero-poster/delete", authMiddleware, deleteHeroPoster);
router.get("/admin/video_news/add", authMiddleware, addPage);
router.post(
  "/admin/video_news/add",
  authMiddleware,
  uploadThumbnail,
  create,
);
router.get("/admin/video_news/edit/:id", authMiddleware, addPage);
router.post(
  "/admin/video_news/edit/:id",
  authMiddleware,
  uploadThumbnail,
  create,
);
router.post("/admin/video_news/delete/:id", authMiddleware, deleteNews);
router.post("/admin/video_news/toggle/:id", authMiddleware, togglePublish);

module.exports = router;
