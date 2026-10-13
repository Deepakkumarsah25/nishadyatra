const mongoose = require("mongoose");

const homeAboutSchema = new mongoose.Schema(
  {
    isActive: {
      type: Boolean,
      default: true,
    },
    badgeText: {
      type: String,
    },
    headingPrefix: {
      type: String,
    },
    highlightHeading: {
      type: String,
    },
    headingSuffix: {
      type: String,
    },
    tagline: {
      type: String,
    },
    description1: {
      type: String,
    },
    description2: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    images: {
      type: [String],
    },
    imageBadgeNumber: {
      type: String,
    },
    imageBadgeLabel: {
      type: String,
    },
    floatingBadgeText: {
      type: String,
    },
    points: [
      {
        title: { type: String, default: "" },
        description: { type: String, default: "" },
        iconKey: { type: String, default: "shield" },
      },
    ],
    stats: [
      {
        number: { type: String, default: "" },
        label: { type: String, default: "" },
      },
    ],
    quoteText: {
      type: String,
    },
    quoteAuthor: {
      type: String,
    },
    readMoreText: {
      type: String,
    },
    readMoreLink: {
      type: String,
    },
    primaryBtnText: {
      type: String,
    },
    primaryBtnLink: {
      type: String,
    },
    secondaryBtnText: {
      type: String,
    },
    secondaryBtnLink: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("HomeAbout", homeAboutSchema);
