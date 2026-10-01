const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDir = path.join(process.cwd(), "uploads", "home-about");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, uploadDir);
  },
  filename: function (_req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    const cleanBase = path
      .basename(file.originalname, ext)
      .replace(/[^a-zA-Z0-9_-]/g, "_")
      .substring(0, 35);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e6);
    cb(null, `home-about-${cleanBase}-${uniqueSuffix}${ext || ".jpg"}`);
  },
});

const fileFilter = (_req, file, cb) => {
  const allowedExtensions = /jpeg|jpg|png|webp|avif|gif/;
  const extName = allowedExtensions.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimeType =
    allowedExtensions.test(file.mimetype) || file.mimetype.startsWith("image/");

  if (extName || mimeType) {
    return cb(null, true);
  }
  cb(new Error("केवल इमेज फाइलें (JPG, PNG, WEBP, AVIF, GIF) ही अपलोड की जा सकती हैं!"));
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 20 * 1024 * 1024, // 20 MB max
  },
  fileFilter: fileFilter,
});

module.exports = {
  uploadHomeAboutImage: upload.any(),
  uploadHomeAboutImages: upload.array("imageFiles", 15),
  uploadDir,
};
