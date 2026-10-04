const multer = require("multer");
const path = require("path");
const { validatedUpload } = require("../validateUpload");

const allowedTypes = {
  ".jpg": ["image/jpeg", "image/jpg"],
  ".jpeg": ["image/jpeg", "image/jpg"],
  ".png": ["image/png"],
  ".webp": ["image/webp"],
  ".avif": ["image/avif"],
  ".gif": ["image/gif"],
};

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024, files: 20, fieldSize: 256 * 1024 },
  fileFilter: (_req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();
    if (allowedTypes[extension]?.includes(file.mimetype)) return cb(null, true);
    cb(new Error("Only images (JPG, PNG, WebP, AVIF, GIF) are supported."));
  },
});

const uploadSingle = upload.single.bind(upload);
const uploadAny = upload.any.bind(upload);
module.exports = Object.assign(upload, {
  single: (fieldName) => validatedUpload(uploadSingle(fieldName)),
  any: (...args) => validatedUpload(uploadAny(...args)),
});
