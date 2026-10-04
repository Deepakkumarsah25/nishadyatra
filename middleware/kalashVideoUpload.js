const multer = require("multer");
const path = require("path");
const { validatedUpload } = require("./validateUpload");

const fileFilter = (req, file, cb) => {
  const extension = path.extname(file.originalname).toLowerCase();
  const videoTypes = {
    ".mp4": ["video/mp4"],
    ".webm": ["video/webm"],
    ".ogg": ["video/ogg", "application/ogg"],
    ".mov": ["video/quicktime"],
    ".mkv": ["video/x-matroska", "video/mkv"],
  };
  const imageTypes = {
    ".jpg": ["image/jpeg", "image/jpg"],
    ".jpeg": ["image/jpeg", "image/jpg"],
    ".png": ["image/png"],
    ".webp": ["image/webp"],
    ".avif": ["image/avif"],
    ".gif": ["image/gif"],
  };
  const allowedTypes = file.fieldname === "thumbnailFile" ? imageTypes : videoTypes;
  if (allowedTypes[extension]?.includes(file.mimetype)) return cb(null, true);
  cb(new Error("Choose a supported video or image file."));
};

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 100 * 1024 * 1024, // 100 MB limit
    files: 2,
  },
  fileFilter: fileFilter,
});

const kalashVideoUpload = validatedUpload(upload.fields([
  { name: "videoFile", maxCount: 1 },
  { name: "thumbnailFile", maxCount: 1 },
]));

module.exports = {
  kalashVideoUpload,
};
