const cloudinary = require("cloudinary").v2;

const configured = Boolean(
  process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET,
);

if (configured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
}

function uploadBuffer(buffer, folder) {
  if (!configured) {
    throw new Error("Cloudinary is not configured. Add the CLOUDINARY_* values to .env.");
  }

  return new Promise((resolve, reject) => {
    const upload = cloudinary.uploader.upload_stream(
      { folder, resource_type: "image" },
      (error, result) => (error ? reject(error) : resolve(result)),
    );
    upload.end(buffer);
  });
}

async function removeImage(publicId) {
  if (!publicId || !configured) return;
  await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
}

module.exports = { configured, uploadBuffer, removeImage };
