const mongoose = require("mongoose");

const heroSlideSchema = new mongoose.Schema(
  {
    tag: {
      type: String,
      trim: true,
    },
    badgeText: {
      type: String,
      trim: true,
    },
    headingPrefix: {
      type: String,
      trim: true,
    },
    highlightText: {
      type: String,
      trim: true,
    },
    headingSuffix: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    imageUrl: {
      type: String,
      required: true,
      trim: true,
    },
    imagePublicId: {
      type: String,
      default: "",
      trim: true,
    },
    primaryBtnText: {
      type: String,
      trim: true,
    },
    primaryBtnLink: {
      type: String,
      trim: true,
    },
    primaryBtnInitiative: {
      type: String,
      default: "",
      trim: true,
    },
    secondaryBtnText: {
      type: String,
      trim: true,
    },
    secondaryBtnLink: {
      type: String,
      trim: true,
    },
    secondaryBtnInitiative: {
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

heroSlideSchema.index({ order: 1, createdAt: 1 });

module.exports = mongoose.model("HeroSlide", heroSlideSchema);
