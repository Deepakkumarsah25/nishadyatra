const fs = require("fs");
const path = require("path");

function hasImageSignature(buffer, extension) {
  if (extension === ".jpg" || extension === ".jpeg") {
    return buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
  }
  if (extension === ".png") return buffer.length >= 8 && buffer.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
  if (extension === ".gif") return buffer.length >= 6 && ["GIF87a", "GIF89a"].includes(buffer.toString("ascii", 0, 6));
  if (extension === ".webp") return buffer.length >= 12 && buffer.toString("ascii", 0, 4) === "RIFF" && buffer.toString("ascii", 8, 12) === "WEBP";
  if (extension === ".avif") {
    return buffer.length >= 16 && buffer.toString("ascii", 4, 8) === "ftyp" && /avif|avis/.test(buffer.toString("ascii", 8, Math.min(buffer.length, 64)));
  }
  return false;
}

function hasVideoSignature(buffer, extension) {
  if ([".mp4", ".mov"].includes(extension)) {
    return buffer.length >= 12 && buffer.toString("ascii", 4, 8) === "ftyp";
  }
  if ([".mkv", ".webm"].includes(extension)) {
    return buffer.length >= 4 && buffer.subarray(0, 4).equals(Buffer.from([0x1a, 0x45, 0xdf, 0xa3]));
  }
  if (extension === ".ogg") return buffer.length >= 4 && buffer.toString("ascii", 0, 4) === "OggS";
  return false;
}

function hasValidMediaSignature(buffer, originalname, fieldname = "") {
  const extension = path.extname(originalname || "").toLowerCase();
  const imageExtension = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".avif"].includes(extension);
  if (fieldname === "thumbnailFile" || fieldname === "thumbnail" || fieldname === "heroPoster" || imageExtension) {
    return hasImageSignature(buffer, extension);
  }
  return hasVideoSignature(buffer, extension);
}

async function filePrefix(file) {
  if (Buffer.isBuffer(file.buffer)) return file.buffer.subarray(0, 64);
  const handle = await fs.promises.open(file.path, "r");
  try {
    const prefix = Buffer.alloc(64);
    const { bytesRead } = await handle.read(prefix, 0, prefix.length, 0);
    return prefix.subarray(0, bytesRead);
  } finally {
    await handle.close();
  }
}

function collectFiles(req) {
  if (req.file) return [req.file];
  if (Array.isArray(req.files)) return req.files;
  if (req.files && typeof req.files === "object") return Object.values(req.files).flat();
  return [];
}

async function validateUploads(req, res, next) {
  const files = collectFiles(req);
  if (!files.length) return next();

  try {
    for (const file of files) {
      const prefix = await filePrefix(file);
      if (!hasValidMediaSignature(prefix, file.originalname, file.fieldname)) {
        await Promise.all(files.filter((entry) => entry.path).map((entry) => fs.promises.unlink(entry.path).catch(() => {})));
        return res.status(400).send("The uploaded file content does not match a supported media format.");
      }
    }
    next();
  } catch (error) {
    await Promise.all(files.filter((entry) => entry.path).map((entry) => fs.promises.unlink(entry.path).catch(() => {})));
    next(error);
  }
}

function validatedUpload(multerMiddleware) {
  return (req, res, next) => multerMiddleware(req, res, (error) => {
    if (error) return next(error);
    return validateUploads(req, res, next);
  });
}

module.exports = { hasValidMediaSignature, validateUploads, validatedUpload };
