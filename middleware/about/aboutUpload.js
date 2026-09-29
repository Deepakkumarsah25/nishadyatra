const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDir = path.join(process.cwd(), "uploads", "about");
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const cleanBase = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, "");
    cb(null, `${cleanBase || "about"}-${Date.now()}-${Math.round(Math.random() * 1e6)}${ext}`);
  },
});

module.exports = multer({
  storage,
  limits: { fileSize: 25 * 1024 * 1024 }, // 25MB max
  fileFilter: (_req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/jpg", "image/gif"];
    if (!allowed.includes(file.mimetype)) {
      return cb(new Error("केवल इमेज फाइलें (JPG, PNG, WebP, AVIF) ही अपलोड की जा सकती हैं।"));
    }
    cb(null, true);
  },
});
