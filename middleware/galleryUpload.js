const multer = require("multer");
const path = require("path");
const fs = require("fs");

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
  const allowedExtensions = /jpeg|jpg|png|webp|avif|gif/;
  const extName = allowedExtensions.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimeType = allowedExtensions.test(file.mimetype);

  if (extName || mimeType || file.mimetype.startsWith("image/")) {
    return cb(null, true);
  }
  cb(new Error("केवल छवियां (JPG, PNG, WEBP) ही अपलोड की जा सकती हैं!"));
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 15 * 1024 * 1024, // 15 MB limit per image
  },
  fileFilter: fileFilter,
});

module.exports = {
  uploadSingle: upload.single("photo"),
  uploadMultiple: upload.array("photos", 50),
  uploadDir,
};
