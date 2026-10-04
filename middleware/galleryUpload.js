const multer = require("multer");
const path = require("path");
const { validatedUpload } = require("./validateUpload");

// File filter: accept images only
const fileFilter = (req, file, cb) => {
  const allowedTypes = {
    ".jpg": ["image/jpeg", "image/jpg"],
    ".jpeg": ["image/jpeg", "image/jpg"],
    ".png": ["image/png"],
    ".webp": ["image/webp"],
    ".avif": ["image/avif"],
    ".gif": ["image/gif"],
  };
  const extension = path.extname(file.originalname).toLowerCase();
  if (allowedTypes[extension]?.includes(file.mimetype)) return cb(null, true);
  cb(new Error("Only images (JPG, PNG, WEBP, AVIF, GIF) can be uploaded!"));
};

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 8 * 1024 * 1024, // 8 MB limit per image
    files: 20,
  },
  fileFilter: fileFilter,
});

module.exports = {
  uploadSingle: validatedUpload(upload.single("photo")),
  uploadMultiple: validatedUpload(upload.array("photos", 20)),
};
