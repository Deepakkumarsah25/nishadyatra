const mongoose = require("mongoose");

const contactInfoSchema = new mongoose.Schema(
  {
    bannerImage: {
      type: String,
            trim: true,
    },
    bannerImagePublicId: {
      type: String,
      default: "",
      trim: true,
    },
    pageBadge: {
      type: String,
            trim: true,
    },
    pageHeading: {
      type: String,
            trim: true,
    },
    pageSubheading: {
      type: String,
            trim: true,
    },
    heroChip1: {
      type: String,
      trim: true,
    },
    heroChip2: {
      type: String,
      trim: true,
    },
    heroChip3: {
      type: String,
      trim: true,
    },
    officeTitle: {
      type: String,
            trim: true,
    },
    officeAddress: {
      type: String,
            trim: true,
    },
    officeTiming: {
      type: String,
            trim: true,
    },
    mapDirectionsUrl: {
      type: String,
            trim: true,
    },
    mapEmbedUrl: {
      type: String,
            trim: true,
    },
    primaryPhone: {
      type: String,
            trim: true,
    },
    secondaryPhone: {
      type: String,
            trim: true,
    },
    primaryEmail: {
      type: String,
            trim: true,
    },
    secondaryEmail: {
      type: String,
            trim: true,
    },
    whatsappNumber: {
      type: String,
            trim: true,
    },
    whatsappMessage: {
      type: String,
            trim: true,
    },
    facebookUrl: {
      type: String,
            trim: true,
    },
    twitterUrl: {
      type: String,
            trim: true,
    },
    instagramUrl: {
      type: String,
            trim: true,
    },
    youtubeUrl: {
      type: String,
            trim: true,
    },
    telegramUrl: {
      type: String,
            trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ContactInfo", contactInfoSchema);
