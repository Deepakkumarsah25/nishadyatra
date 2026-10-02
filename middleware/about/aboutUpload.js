const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { validatedUpload } = require("../validateUpload");

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

const upload = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024, files: 20, fieldSize: 256 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowedTypes = {
      ".jpg": ["image/jpeg", "image/jpg"],
      ".jpeg": ["image/jpeg", "image/jpg"],
      ".png": ["image/png"],
      ".webp": ["image/webp"],
      ".avif": ["image/avif"],
      ".gif": ["image/gif"],
    };
    const extension = path.extname(file.originalname).toLowerCase();
    if (!allowedTypes[extension]?.includes(file.mimetype)) {
      return cb(new Error("केवल इमेज फाइलें (JPG, PNG, WebP, AVIF) ही अपलोड की जा सकती हैं।"));
    }
    cb(null, true);
  },
});

const uploadSingle = upload.single.bind(upload);
const uploadAny = upload.any.bind(upload);
module.exports = Object.assign(upload, {
  single: (fieldName) => validatedUpload(uploadSingle(fieldName)),
  any: (...args) => validatedUpload(uploadAny(...args)),
});
