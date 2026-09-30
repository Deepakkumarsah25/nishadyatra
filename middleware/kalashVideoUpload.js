const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure upload directory exists
const uploadDir = path.join(process.cwd(), "uploads", "videos");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Storage configuration
const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, uploadDir);
  },
  filename: function (_req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    const prefix = file.fieldname === "thumbnailFile" ? "thumb" : "video";
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e6);
    cb(null, `${prefix}-${uniqueSuffix}${ext}`);
  },
});

// File filter: accept videos for videoFile, and images for thumbnailFile
const fileFilter = (_req, file, cb) => {
  if (file.fieldname === "videoFile") {
    const allowedVideoExts = /mp4|webm|ogg|mov|mkv|avi|m4v|3gp|flv/;
    const ext = path.extname(file.originalname).toLowerCase().replace(".", "");
    if (file.mimetype.startsWith("video/") || allowedVideoExts.test(ext)) {
      return cb(null, true);
    }
    return cb(new Error("कृपया मान्य वीडियो फ़ाइल (MP4, WEBM, MOV, आदि) अपलोड करें।"));
  } else if (file.fieldname === "thumbnailFile") {
    const allowedImgExts = /jpg|jpeg|png|webp|avif/;
    const ext = path.extname(file.originalname).toLowerCase().replace(".", "");
    if (file.mimetype.startsWith("image/") || allowedImgExts.test(ext)) {
      return cb(null, true);
    }
    return cb(new Error("कृपया मान्य थंबनेल इमेज (JPG, PNG, WEBP) अपलोड करें।"));
  }
  cb(null, true);
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 300 * 1024 * 1024, // 300 MB limit for video files
  },
  fileFilter: fileFilter,
}).fields([
  { name: "videoFile", maxCount: 1 },
  { name: "thumbnailFile", maxCount: 1 },
]);

// Express middleware wrapper with error handling
const kalashVideoUpload = (req, res, next) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.error("Multer error in Kalash Video upload:", err);
      return res.redirect(
        "/admin/kalash-yatra?tab=videos&err=" +
          encodeURIComponent("अपलोड त्रुटि: " + err.message)
      );
    } else if (err) {
      console.error("Upload error in Kalash Video upload:", err);
      return res.redirect(
        "/admin/kalash-yatra?tab=videos&err=" +
          encodeURIComponent(err.message || "फ़ाइल अपलोड करने में समस्या आई।")
      );
    }
    next();
  });
};

module.exports = { kalashVideoUpload, uploadDir };
