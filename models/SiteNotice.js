const mongoose = require("mongoose");

const siteNoticeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    dateText: {
      type: String,
      default: "",
      trim: true,
    },
    link: {
      type: String,
      default: "",
      trim: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

siteNoticeSchema.index({ order: 1, createdAt: -1 });

module.exports = mongoose.model("SiteNotice", siteNoticeSchema);
