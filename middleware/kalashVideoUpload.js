const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { validatedUpload } = require("./validateUpload");

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
  const extension = path.extname(file.originalname).toLowerCase();
  const videoTypes = {
    ".mp4": ["video/mp4"],
    ".webm": ["video/webm"],
    ".ogg": ["video/ogg", "application/ogg"],
    ".mov": ["video/quicktime"],
    ".mkv": ["video/x-matroska", "video/mkv"],
  };
  const imageTypes = {
    ".jpg": ["image/jpeg", "image/jpg"],
    ".jpeg": ["image/jpeg", "image/jpg"],
    ".png": ["image/png"],
    ".webp": ["image/webp"],
    ".avif": ["image/avif"],
    ".gif": ["image/gif"],
  };
  const allowedTypes = file.fieldname === "thumbnailFile" ? imageTypes : videoTypes;
  if (allowedTypes[extension]?.includes(file.mimetype)) return cb(null, true);
  cb(new Error("Choose a supported video or image file."));
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100 MB limit
    files: 2,
  },
  fileFilter: fileFilter,
});

const kalashVideoUpload = validatedUpload(upload.fields([
  { name: "videoFile", maxCount: 1 },
  { name: "thumbnailFile", maxCount: 1 },
]));

module.exports = {
  kalashVideoUpload,
  uploadDir,
};
