const mongoose = require("mongoose");

// The existing collection name is kept so previously saved news remains available.
const newsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 180 },
    summary: { type: String, trim: true, maxlength: 500, default: "" },
    content: { type: String, trim: true, required: true, maxlength: 30000 },
    source: { type: String, trim: true, maxlength: 120, default: "" },
    publicationDate: { type: Date, default: null },
    category: {
      type: String,
      enum: ["Digital Media", "Print Media", "समाचार"],
      default: "Digital Media",
    },
    externalUrl: { type: String, trim: true, maxlength: 1000, default: "" },
    featured: { type: Boolean, default: false },
    isHighlighted: { type: Boolean, default: false },
    // Retained for compatibility with the earlier demo and its existing records.
    state: { type: String, trim: true, default: "", maxlength: 80 },
    district: { type: String, trim: true, default: "", maxlength: 80 },
    mediaType: {
      type: String,
      enum: ["youtube", "upload", "article"],
      default: "article",
    },
    youtubeUrl: { type: String, trim: true, default: "" },
    videoPath: { type: String, default: "" },
    thumbnailPath: { type: String, default: "" },
    published: { type: Boolean, default: false },
    publishedAt: { type: Date, default: null },
    author: { type: String, default: "Admin" },
  },
  { timestamps: true },
);

newsSchema.index({ published: 1, publicationDate: -1, publishedAt: -1 });
newsSchema.index({ category: 1, featured: -1 });
newsSchema.index({ published: 1, isHighlighted: -1 });
newsSchema.index({ published: 1, state: 1, district: 1, publicationDate: -1 });

module.exports = mongoose.models.VideoNews || mongoose.model("VideoNews", newsSchema);
