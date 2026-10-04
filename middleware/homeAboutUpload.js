const multer = require("multer");
const path = require("path");
const { validatedUpload } = require("./validateUpload");

const fileFilter = (_req, file, cb) => {
  const allowedExtensions = /jpeg|jpg|png|webp|avif|gif/;
  const extension = path.extname(file.originalname).toLowerCase();
  if (allowedExtensions.test(extension) && file.mimetype.startsWith("image/")) {
    return cb(null, true);
  }
  cb(new Error("Only image files (JPG, PNG, WEBP, AVIF, GIF) are allowed."));
};

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024, files: 15 },
  fileFilter,
});

module.exports = {
  uploadHomeAboutImage: validatedUpload(upload.any()),
  uploadHomeAboutImages: validatedUpload(upload.array("imageFiles", 15)),
};
