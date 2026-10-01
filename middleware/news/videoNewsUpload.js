const multer = require("multer");
const storage = multer.memoryStorage();

module.exports = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024, files: 1 },
  fileFilter: (_req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp", "image/avif"];
    if (!allowed.includes(file.mimetype)) return cb(new Error("Choose a JPG, PNG, WebP or AVIF image."));
    cb(null, true);
  },
});
