const mongoose = require("mongoose");

const videoNewsSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 180 },
  summary: { type: String, trim: true, maxlength: 320, default: "" },
  content: { type: String, trim: true, required: true, maxlength: 12000 },
  category: { type: String, trim: true, default: "समाचार", maxlength: 50 },
  state: { type: String, trim: true, default: "", maxlength: 80 },
  district: { type: String, trim: true, default: "", maxlength: 80 },
  mediaType: { type: String, enum: ["youtube", "upload", "article"], default: "article" },
  youtubeUrl: { type: String, trim: true, default: "" },
  videoPath: { type: String, default: "" },
  thumbnailPath: { type: String, default: "" },
  published: { type: Boolean, default: false },
  publishedAt: { type: Date, default: null },
  author: { type: String, default: "Admin" },
}, { timestamps: true });

module.exports = mongoose.models.VideoNews || mongoose.model("VideoNews", videoNewsSchema);
