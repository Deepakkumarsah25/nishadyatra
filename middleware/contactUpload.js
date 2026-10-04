const multer = require("multer");
const path = require("path");
const { validatedUpload } = require("./validateUpload");

const allowedTypes = {
  ".jpg": ["image/jpeg", "image/jpg"],
  ".jpeg": ["image/jpeg", "image/jpg"],
  ".png": ["image/png"],
  ".webp": ["image/webp"],
  ".avif": ["image/avif"],
};

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024, files: 1 },
  fileFilter: (_req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();
    if (allowedTypes[extension]?.includes(file.mimetype)) return cb(null, true);
    cb(new Error("Only images (JPG, PNG, WebP, AVIF) are supported."));
  },
});

module.exports = validatedUpload(upload.single("bannerImageFile"));
