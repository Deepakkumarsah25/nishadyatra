const multer = require("multer");
const path = require("path");
const storage = multer.memoryStorage();

module.exports = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024, files: 1 },
  fileFilter: (_req, file, cb) => {
    const allowedTypes = {
      ".jpg": ["image/jpeg", "image/jpg"],
      ".jpeg": ["image/jpeg", "image/jpg"],
      ".png": ["image/png"],
      ".webp": ["image/webp"],
      ".avif": ["image/avif"],
    };
    const extension = path.extname(file.originalname).toLowerCase();
    if (!allowedTypes[extension]?.includes(file.mimetype)) return cb(new Error("Choose a JPG, PNG, WebP or AVIF image."));
    cb(null, true);
  },
});
