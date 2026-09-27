const mongoose = require("mongoose");

const homeQuickInfoSchema = new mongoose.Schema(
  {
    sidebarTitle: {
      type: String,
      default: "निषाद संकल्प अभियान",
      trim: true,
    },
    sidebarSubtitle: {
      type: String,
      default: "त्वरित सेवा एवं सहायता केंद्र",
      trim: true,
    },
    pledgeBoxTitle: {
      type: String,
      default: "अभियान से संकल्पबद्ध जुड़ें",
      trim: true,
    },
    pledgeBoxDesc: {
      type: String,
      default: "समाज के उत्थान और सशक्तिकरण के लिए अपना ऑनलाइन संकल्प दर्ज करें।",
      trim: true,
    },
    helplineText: {
      type: String,
      default: "हेल्पलाइन: +91 99999 99999",
      trim: true,
    },
    helplineTel: {
      type: String,
      default: "+919999999999",
      trim: true,
    },
    email: {
      type: String,
      default: "info@nishadsankalp.org",
      trim: true,
    },
    sidebarFooterText: {
      type: String,
      default: "॥ जन-सेवा ही सच्चा संकल्प है ॥",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("HomeQuickInfo", homeQuickInfoSchema);
