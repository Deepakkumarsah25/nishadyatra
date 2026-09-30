const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure upload directory exists: uploads/hero
const uploadDir = path.join(__dirname, "..", "uploads", "hero");
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
    cb(null, `hero-${cleanBase}-${uniqueSuffix}${ext || ".jpg"}`);
  },
});

// File filter: accept image formats only
const fileFilter = (req, file, cb) => {
  const allowedExtensions = /jpeg|jpg|png|webp|avif|gif/;
  const extName = allowedExtensions.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimeType = allowedExtensions.test(file.mimetype) || file.mimetype.startsWith("image/");

  if (extName || mimeType) {
    return cb(null, true);
  }
  cb(new Error("Only images (JPG, PNG, WEBP, AVIF, GIF) can be uploaded!"));
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 15 * 1024 * 1024, // 15 MB limit
  },
  fileFilter: fileFilter,
});

module.exports = {
  uploadHeroImage: upload.single("imageFile"),
  uploadDir,
};
