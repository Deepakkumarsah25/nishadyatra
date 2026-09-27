const mongoose = require("mongoose");

const heroSlideSchema = new mongoose.Schema(
  {
    tag: {
      type: String,
      default: "राष्ट्र व समाज हित",
      trim: true,
    },
    badgeText: {
      type: String,
      default: "॥ जय निषादराज ॥ अखंड चेतना एवं सशक्तिकरण संकल्प",
      trim: true,
    },
    headingPrefix: {
      type: String,
      default: "एकता, स्वाभिमान और",
      trim: true,
    },
    highlightText: {
      type: String,
      default: "उज्ज्वल भविष्य",
      trim: true,
    },
    headingSuffix: {
      type: String,
      default: "की ओर एक मजबूत कदम",
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: true,
      trim: true,
    },
    primaryBtnText: {
      type: String,
      default: "अभियान से जुड़ें",
      trim: true,
    },
    primaryBtnLink: {
      type: String,
      default: "#quickActionSidebar",
      trim: true,
    },
    primaryBtnInitiative: {
      type: String,
      default: "",
      trim: true,
    },
    secondaryBtnText: {
      type: String,
      default: "हमारे मुख्य कार्य",
      trim: true,
    },
    secondaryBtnLink: {
      type: String,
      default: "#what-we-do",
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

module.exports = mongoose.model("HeroSlide", heroSlideSchema);
