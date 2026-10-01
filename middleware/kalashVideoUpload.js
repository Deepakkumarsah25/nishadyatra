const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure upload directory exists: uploads/videos
const uploadDir = path.join(__dirname, "..", "uploads", "videos");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer disk storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    const cleanBase = path
      .basename(file.originalname, ext)
      .replace(/[^a-zA-Z0-9_-]/g, "_")
      .substring(0, 35);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e6);
    cb(null, `video-${cleanBase}-${uniqueSuffix}${ext || ".mp4"}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("video/") || file.mimetype.startsWith("image/")) {
    return cb(null, true);
  }
  const allowed = /\.(mp4|webm|ogg|mov|mkv|jpg|jpeg|png|webp|avif|gif)$/i;
  if (allowed.test(file.originalname)) {
    return cb(null, true);
  }
  return cb(null, true);
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 150 * 1024 * 1024, // 150 MB limit
  },
  fileFilter: fileFilter,
});

const kalashVideoUpload = upload.fields([
  { name: "videoFile", maxCount: 1 },
  { name: "thumbnailFile", maxCount: 1 },
]);

module.exports = {
  kalashVideoUpload,
  uploadDir,
};
