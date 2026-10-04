const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { validatedUpload } = require("./validateUpload");

// Ensure upload directory exists
const uploadDir = path.join(__dirname, "..", "uploads", "gallery");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    const cleanBase = path
      .basename(file.originalname, ext)
      .replace(/[^a-zA-Z0-9_-]/g, "_")
      .substring(0, 30);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e6);
    cb(null, `sankalp-${cleanBase}-${uniqueSuffix}${ext || ".jpg"}`);
  },
});

// File filter: accept images only
const fileFilter = (req, file, cb) => {
  const allowedTypes = {
    ".jpg": ["image/jpeg", "image/jpg"],
    ".jpeg": ["image/jpeg", "image/jpg"],
    ".png": ["image/png"],
    ".webp": ["image/webp"],
    ".avif": ["image/avif"],
    ".gif": ["image/gif"],
  };
  const extension = path.extname(file.originalname).toLowerCase();
  if (allowedTypes[extension]?.includes(file.mimetype)) return cb(null, true);
  cb(new Error("Only images (JPG, PNG, WEBP, AVIF, GIF) can be uploaded!"));
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 8 * 1024 * 1024, // 8 MB limit per image
    files: 20,
  },
  fileFilter: fileFilter,
});

module.exports = {
  uploadSingle: validatedUpload(upload.single("photo")),
  uploadMultiple: validatedUpload(upload.array("photos", 20)),
  uploadDir,
};
